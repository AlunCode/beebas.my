import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST() {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[portal] STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Server misconfiguration: missing Stripe secret key.' },
        { status: 500 }
      )
    }
    if (!appUrl) {
      console.error('[portal] NEXT_PUBLIC_APP_URL is not set')
      return NextResponse.json(
        { error: 'Server misconfiguration: missing app URL.' },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single<{ stripe_customer_id: string | null }>()

    if (!dbUser?.stripe_customer_id) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripe_customer_id,
      return_url: `${appUrl}/dashboard?subscription=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error('[portal] Stripe error:', {
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

    console.error('[portal] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}