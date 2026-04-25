'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { debt_type, milestone_type } from '@/types/database'

export async function addDebt(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const balance = parseFloat(formData.get('balance') as string)

  const { error } = await supabase.from('debts').insert({
    user_id: user.id,
    name: formData.get('name') as string,
    balance,
    original_balance: balance,
    interest_rate: parseFloat(formData.get('interest_rate') as string),
    minimum_payment: parseFloat(formData.get('minimum_payment') as string),
    debt_type: (formData.get('debt_type') as debt_type) ?? 'other',
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function markDebtPaid(debtId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated', milestones: [] as milestone_type[] }

  // Fetch all user's debts (inc. partner's) before deletion so we can calculate milestones
  const { data: { subscription_status, partner_id } = {} } = await supabase
    .from('users').select('subscription_status, partner_id').eq('id', user.id).single() as any

  const userIds = partner_id ? [user.id, partner_id] : [user.id]
  const { data: allDebts } = await supabase
    .from('debts').select('id, user_id, balance, original_balance').in('user_id', userIds)

  if (!allDebts) return { error: 'Could not fetch debts', milestones: [] as milestone_type[] }

  // Delete the debt
  const { error: delError } = await supabase
    .from('debts').delete().eq('id', debtId).eq('user_id', user.id)
  if (delError) return { error: delError.message, milestones: [] as milestone_type[] }

  revalidatePath('/dashboard')

  // Only award milestones to Pro users
  if (subscription_status !== 'pro') return { success: true, milestones: [] as milestone_type[] }

  const remaining = allDebts.filter(d => d.id !== debtId)
  const totalOriginal = allDebts.reduce((s, d) => s + (d.original_balance ?? d.balance), 0)
  const totalRemaining = remaining.reduce((s, d) => s + d.balance, 0)

  // Fetch already-earned milestones to avoid duplicates
  const { data: earned } = await supabase
    .from('milestones').select('type').eq('user_id', user.id)
  const earnedSet = new Set((earned ?? []).map(m => m.type))

  const toAward: milestone_type[] = []

  if (!earnedSet.has('first_debt_paid')) {
    toAward.push('first_debt_paid')
  }
  if (!earnedSet.has('halfway_point') && totalOriginal > 0 && totalRemaining <= totalOriginal * 0.5) {
    toAward.push('halfway_point')
  }
  if (!earnedSet.has('all_debts_paid') && remaining.length === 0) {
    toAward.push('all_debts_paid')
  }

  if (toAward.length > 0) {
    await supabase.from('milestones').insert(
      toAward.map(type => ({ user_id: user.id, type, debt_id: type === 'first_debt_paid' ? debtId : null }))
    )
  }

  return { success: true, milestones: toAward }
}

export async function deleteDebt(debtId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('debts')
    .delete()
    .eq('id', debtId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}
