'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { debt_type } from '@/types/database'

export async function addDebt(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('debts').insert({
    user_id: user.id,
    name: formData.get('name') as string,
    balance: parseFloat(formData.get('balance') as string),
    interest_rate: parseFloat(formData.get('interest_rate') as string),
    minimum_payment: parseFloat(formData.get('minimum_payment') as string),
    debt_type: (formData.get('debt_type') as debt_type) ?? 'other',
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
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
