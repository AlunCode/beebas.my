import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    // --- Validate environment variables ---
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[checkout] STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Server misconfiguration: missing Stripe secret key.' },
        { status: 500 }
      )
    }

    // Derive base URL from request headers so success/cancel URLs always
    // point back to the actual host (works for localhost, staging, and production).
    const host = request.headers.get('host') || process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
    const appUrl = `${protocol}://${host}`

    // --- Auth ---
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // --- Parse body ---
    let priceId: string | undefined
    let mode: 'subscription' | 'payment' = 'subscription'
    try {
      const body = await request.json()
      priceId = body?.priceId
      if (body?.mode === 'payment' || body?.mode === 'subscription') {
        mode = body.mode
      }
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 })
    }

    // --- Look up existing Stripe customer ---
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    // If the user row doesn't exist yet, create it (edge case: trigger missed)
    if (dbError && dbError.code === 'PGRST116') {
      console.warn(`[checkout] User ${user.id} not found in public.users, creating row`)
      await supabase
        .from('users')
        .insert({ id: user.id, email: user.email ?? '' })
    }

    let customerId = dbUser?.stripe_customer_id

    // --- Create Stripe customer if none exists ---
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // --- Create Checkout Session ---
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      mode,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { supabase_user_id: user.id },
    }

    // Subscriptions get a 14-day trial; one-time payments do not
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        trial_period_days: 14,
        metadata: { supabase_user_id: user.id },
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    // Stripe errors have useful details
    if (error instanceof Stripe.errors.StripeError) {
      console.error('[checkout] Stripe error:', {
        type: error.type,
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
      })
      return NextResponse.json(
        { error: error.message || 'Stripe error', code: error.code },
        { status: error.statusCode ?? 500 }
      )
    }

    console.error('[checkout] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}