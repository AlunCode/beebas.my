import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { calculate } from '@/lib/calculator/engine'
import { getResend, buildDigestHtml } from '@/lib/email'
import type { Strategy } from '@/lib/calculator/types'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://beebas.my'

function monthLabel(yyyyMM: string) {
  const [y, m] = yyyyMM.split('-')
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-MY', { month: 'long', year: 'numeric' })
}

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export async function GET(request: NextRequest) {
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const supabase = createAdminClient()
  const thisMonth = currentMonth()

  // Fetch all Pro users who haven't opted out and haven't been sent this month
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email, partner_id, digest_last_sent')
    .eq('subscription_status', 'pro')
    .eq('digest_opted_out', false)

  if (error) {
    console.error('[digest] fetch users error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  let sent = 0
  let skipped = 0
  const errors: string[] = []

  for (const user of users ?? []) {
    // Skip if already sent this month (idempotent re-runs)
    if (user.digest_last_sent) {
      const lastMonth = user.digest_last_sent.slice(0, 7) // "YYYY-MM"
      if (lastMonth === thisMonth) { skipped++; continue }
    }

    // Fetch debts (own + partner's)
    const userIds = user.partner_id ? [user.id, user.partner_id] : [user.id]
    const { data: debts } = await supabase
      .from('debts')
      .select('id, name, balance, interest_rate, minimum_payment')
      .in('user_id', userIds)

    if (!debts || debts.length === 0) { skipped++; continue }

    const calcDebts = debts.map(d => ({
      id: d.id,
      name: d.name,
      balance: d.balance,
      interestRate: d.interest_rate,
      minimumPayment: d.minimum_payment,
    }))

    // Default to avalanche (saves more money)
    const strategy: Strategy = 'avalanche'
    const result = calculate({ debts: calcDebts, extraPayment: 0, strategy })

    const now = new Date()
    const month = now.toLocaleDateString('en-MY', { month: 'long', year: 'numeric' })
    const unsubscribeUrl = `${BASE_URL}/unsubscribe?uid=${user.id}`

    const html = buildDigestHtml({
      to: user.email,
      month,
      debtFreeDate: monthLabel(result.debtFreeDate),
      debtFreeMonths: result.debtFreeMonths,
      totalBalance: debts.reduce((s, d) => s + d.balance, 0),
      totalInterestPaid: result.totalInterestPaid,
      interestSavedVsMinimum: result.interestSavedVsMinimum,
      strategy,
      debts: debts.map(d => ({ name: d.name, balance: d.balance, interestRate: d.interest_rate })),
      unsubscribeUrl,
    })

    const { error: sendError } = await getResend().emails.send({
      from: 'Beebas <digest@beebas.my>',
      to: user.email,
      subject: `Your ${month} debt progress — Beebas 🐝`,
      html,
    })

    if (sendError) {
      console.error(`[digest] send error for ${user.id}:`, sendError)
      errors.push(user.id)
      continue
    }

    await supabase
      .from('users')
      .update({ digest_last_sent: new Date().toISOString() })
      .eq('id', user.id)

    sent++
  }

  return NextResponse.json({ sent, skipped, errors })
}
