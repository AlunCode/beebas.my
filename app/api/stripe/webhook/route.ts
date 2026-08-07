import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { getResend, buildPaymentConfirmationHtml } from '@/lib/email'
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

      const isActive = ['active', 'trialing'].includes(subscription.status)

      // Determine if this is a planner subscription from metadata
      const planType = subscription.metadata?.plan_type
      let status: Database['public']['Enums']['subscription_status']
      let roleUpdate: { role?: Database['public']['Enums']['user_role'] } = {}

      if (isActive) {
        if (planType === 'planner_annual' || planType === 'planner_monthly') {
          status = planType as Database['public']['Enums']['subscription_status']
          roleUpdate = { role: 'planner' }
        } else {
          status = 'pro'
        }
      } else {
        status = 'free'
      }

      console.log(`[webhook] User ${userId} → subscription_status: ${status}, role: ${roleUpdate.role ?? 'unchanged'} (Stripe status: ${subscription.status})`)

      const { error: updateError } = await supabase
        .from('users')
        .update({ subscription_status: status, ...roleUpdate })
        .eq('id', userId)

      if (updateError) {
        console.error(`[webhook] Failed to update user ${userId}:`, updateError)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }

      // Send payment confirmation email when subscription becomes active
      if (isActive && subscription.status === 'active') {
        try {
          const { data: userData } = await supabase
            .from('users')
            .select('email')
            .eq('id', userId)
            .single()

          if (userData?.email) {
            const firstItem = subscription.items.data[0]
            const amount = firstItem?.price?.unit_amount
              ? firstItem.price.unit_amount / 100
              : 0

            const planName = firstItem?.price?.nickname || 'Pro'
            const nextBilling = new Date((subscription as any).current_period_end * 1000)
            const nextBillingDate = nextBilling.toLocaleDateString('en-MY', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

            const resend = getResend()
            await resend.emails.send({
              from: 'Beebas <noreply@beebas.my>',
              to: userData.email,
              subject: 'Payment Confirmation — Welcome to Beebas Pro!',
              html: buildPaymentConfirmationHtml({
                email: userData.email,
                amount,
                planName,
                planType: 'subscription',
                nextBillingDate
              })
            })
            console.log(`[webhook] Sent payment confirmation email to ${userData.email}`)
          }
        } catch (emailError) {
          console.error(`[webhook] Failed to send email for user ${userId}:`, emailError)
          // Don't fail the webhook if email fails
        }
      }
      break
    }

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id

      if (!userId) {
        console.warn(`[webhook] No user found in checkout session metadata for session ${session.id}`)
        break
      }

      // Only handle one-time payments; subscriptions are handled by customer.subscription.* events
      if (session.mode === 'payment') {
        console.log(`[webhook] One-time payment completed for user ${userId} → subscription_status: pro_lifetime`)
        const { error: paymentError } = await supabase
          .from('users')
          .update({ subscription_status: 'pro_lifetime' })
          .eq('id', userId)

        if (paymentError) {
          console.error(`[webhook] Failed to update user ${userId} after payment:`, paymentError)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        // Send payment confirmation email
        try {
          const { data: userData } = await supabase
            .from('users')
            .select('email')
            .eq('id', userId)
            .single()

          if (userData?.email) {
            const amount = session.amount_total ? session.amount_total / 100 : 0
            const planName = 'Lifetime Pro'

            const resend = getResend()
            await resend.emails.send({
              from: 'Beebas <noreply@beebas.my>',
              to: userData.email,
              subject: 'Payment Confirmation — Welcome to Beebas Pro!',
              html: buildPaymentConfirmationHtml({
                email: userData.email,
                amount,
                planName,
                planType: 'lifetime',
                nextBillingDate: 'Lifetime access'
              })
            })
            console.log(`[webhook] Sent payment confirmation email to ${userData.email}`)
          }
        } catch (emailError) {
          console.error(`[webhook] Failed to send email for user ${userId}:`, emailError)
          // Don't fail the webhook if email fails
        }
      }
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
      const { error: deleteError } = await supabase
        .from('users')
        .update({ subscription_status: 'cancelled' })
        .eq('id', userId)

      if (deleteError) {
        console.error(`[webhook] Failed to update user ${userId}:`, deleteError)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }
      break
    }

    default:
      // Unhandled event type — just acknowledge
      break
  }

  return NextResponse.json({ received: true })
}
