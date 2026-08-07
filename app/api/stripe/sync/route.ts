import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/stripe'
import type { Database } from '@/types/database'

/**
 * POST /api/stripe/sync
 *
 * Fallback endpoint that manually syncs the user's Stripe subscription
 * status into the database.  Called when the user lands on
 * /dashboard?upgraded=true to cover the case where the webhook didn't
 * fire or was misconfigured.
 */
export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // Look up the user's Stripe customer ID
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single<{ stripe_customer_id: string | null }>()

    if (dbError || !dbUser?.stripe_customer_id) {
      console.warn('[sync] No Stripe customer found for user', user.id)
      return NextResponse.json({ status: 'no_customer' })
    }

    // Fetch active subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: dbUser.stripe_customer_id,
      status: 'all',
      limit: 10,
    })

    // Determine the correct status — preserve lifetime and planner statuses
    const activeOrTrialing = subscriptions.data.find(
      (sub) => sub.status === 'active' || sub.status === 'trialing'
    )

    let newStatus: Database['public']['Enums']['subscription_status'] = 'free'
    let roleUpdate: { role?: Database['public']['Enums']['user_role'] } = {}

    if (activeOrTrialing) {
      const planType = activeOrTrialing.metadata?.plan_type
      if (planType === 'planner_annual' || planType === 'planner_monthly') {
        newStatus = planType as Database['public']['Enums']['subscription_status']
        roleUpdate = { role: 'planner' }
      } else {
        newStatus = 'pro'
      }
    }

    // Update via admin client to bypass RLS
    const admin = createAdminClient()
    await admin
      .from('users')
      .update({ subscription_status: newStatus, ...roleUpdate })
      .eq('id', user.id)

    console.log(`[sync] User ${user.id} subscription_status → ${newStatus}`)

    return NextResponse.json({ status: newStatus })
  } catch (error) {
    console.error('[sync] Error:', error)
    return NextResponse.json(
      { error: 'Failed to sync subscription' },
      { status: 500 }
    )
  }
}