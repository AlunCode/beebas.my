import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import type Stripe from 'stripe'

// Use service role to bypass RLS in webhook context
function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Look up the Supabase user ID for a Stripe customer.
 * Tries subscription metadata first, then falls back to
 * querying the `users` table by `stripe_customer_id`.
 */
async function resolveUserId(
  sub: Stripe.Subscription,
  supabase: ReturnType<typeof getAdminClient>
): Promise<string | null> {
  // 1. Try subscription metadata
  if (sub.metadata.supabase_user_id) {
    return sub.metadata.supabase_user_id
  }

  // 2. Fall back: look up by customer ID
  const customerId =
    typeof sub.customer === 'string' ? sub.customer : sub.customer?.id

  if (!customerId) return null

  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single<{ id: string }>()

  return data?.id ?? null
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.warn('[webhook] Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[webhook] Received event: ${event.type} (${event.id})`)

  const supabase = getAdminClient()

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = await resolveUserId(subscription, supabase)

      if (!userId) {
        console.warn(`[webhook] No user found for subscription ${subscription.id} (customer: ${subscription.customer})`)
        break
      }

      const status = ['active', 'trialing'].includes(subscription.status) ? 'pro' : 'free'
      console.log(`[webhook] User ${userId} → subscription_status: ${status} (Stripe status: ${subscription.status})`)

      await supabase
        .from('users')
        .update({ subscription_status: status })
        .eq('id', userId)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = await resolveUserId(subscription, supabase)

      if (!userId) {
        console.warn(`[webhook] No user found for deleted subscription ${subscription.id}`)
        break
      }

      console.log(`[webhook] User ${userId} → subscription_status: cancelled`)
      await supabase
        .from('users')
        .update({ subscription_status: 'cancelled' })
        .eq('id', userId)
      break
    }

    default:
      // Unhandled event type — just acknowledge
      break
  }

  return NextResponse.json({ received: true })
}
