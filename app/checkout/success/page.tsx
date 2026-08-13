import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAuthUser } from '@/lib/auth/get-user'
import { getResend, buildPaymentConfirmationHtml } from '@/lib/email'
import { CheckoutTransition } from './_components/checkout-transition'

/**
 * Checkout Success / Transition Page
 *
 * This page sits between Stripe's checkout redirect and the dashboard.
 * It eagerly syncs the user's Stripe subscription status into the database
 * *before* the dashboard is ever rendered, so the user never sees the
 * free-plan state while the webhook catches up.
 *
 * Stripe sends us here with `?session_id={CHECKOUT_SESSION_ID}`.
 * We verify that session, then sync the subscription, then show a
 * brief loading screen that navigates to /dashboard once ready.
 */
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const user = await getAuthUser()
  const params = await searchParams

  // --- Verify the checkout session ---
  let sessionMode: string | null = null

  if (params.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(params.session_id)

      if (session.payment_status !== 'paid') {
        // Payment didn't go through — send them back to pricing
        redirect('/pricing')
      }

      sessionMode = session.mode as 'subscription' | 'payment'
    } catch (err) {
      console.error('[checkout-success] Failed to verify session:', err)
      // Session not found or invalid — redirect to dashboard
      redirect('/dashboard')
    }
  }

  const admin = createAdminClient()

  // --- Eagerly sync subscription status into the DB ---
  // For one-time payments there is no subscription — we can determine
  // 'pro' directly from the verified session.
  // For subscriptions, we query Stripe for the actual subscription status.
  if (user.stripe_customer_id) {
    try {
      let newStatus: 'pro' | 'free' = 'free'

      if (sessionMode === 'payment') {
        // One-time payment (lifetime Pro) — payment_status already verified 'paid'
        newStatus = 'pro'
      } else if (sessionMode === 'subscription') {
        // Subscription checkout — check the actual subscription status
        const subscriptions = await stripe.subscriptions.list({
          customer: user.stripe_customer_id,
          status: 'all',
          limit: 10,
        })

        const activeOrTrialing = subscriptions.data.find(
          (sub) => sub.status === 'active' || sub.status === 'trialing'
        )

        newStatus = activeOrTrialing ? 'pro' : 'free'
      }

      await admin
        .from('users')
        .update({ subscription_status: newStatus })
        .eq('id', user.id)

      console.log(`[checkout-success] Synced user ${user.id} → ${newStatus}`)
    } catch (err) {
      console.error('[checkout-success] Sync error:', err)
      // Non-fatal: the webhook will still update the DB eventually
    }
  }

  // --- Send payment confirmation email directly (fallback for webhook issues) ---
  try {
    const { data: userEmail } = await admin
      .from('users')
      .select('email')
      .eq('id', user.id)
      .single()

    if (userEmail?.email) {
      let amount = 0
      let planName = 'Pro'
      let planType: 'subscription' | 'lifetime' = 'subscription'

      if (params.session_id && sessionMode === 'payment') {
        const session = await stripe.checkout.sessions.retrieve(params.session_id)
        amount = session.amount_total ? session.amount_total / 100 : 0
        planName = 'Lifetime Pro'
        planType = 'lifetime'
      } else if (params.session_id && sessionMode === 'subscription' && user.stripe_customer_id) {
        // const session = await stripe.checkout.sessions.retrieve(params.session_id)
        const subscription = await stripe.subscriptions.list({
          customer: user.stripe_customer_id,
          status: 'all',
          limit: 1,
        })
        const sub = subscription.data[0]
        if (sub) {
          const firstItem = sub.items.data[0]
          amount = firstItem?.price?.unit_amount ? firstItem.price.unit_amount / 100 : 0
          planName = firstItem?.price?.nickname || 'Pro'
        }
      }

      const resend = getResend()
      await resend.emails.send({
        from: 'Beebas <noreply@beebas.my>',
        to: userEmail.email,
        subject: 'Payment Confirmation — Welcome to Beebas Pro!',
        html: buildPaymentConfirmationHtml({
          email: userEmail.email,
          amount,
          planName,
          planType,
          nextBillingDate: planType === 'lifetime' ? 'Lifetime access' : '',
        }),
      })
      console.log(`[checkout-success] Sent payment confirmation email to ${userEmail.email}`)
    }
  } catch (emailError) {
    console.error('[checkout-success] Failed to send email:', emailError)
    // Non-fatal: webhook may still send it
  }

  // --- Render transition UI; client component redirects to /dashboard ---
  return <CheckoutTransition />
}
