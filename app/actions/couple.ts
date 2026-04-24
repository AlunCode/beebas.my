'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthUser, isPro } from '@/lib/auth/get-user'

function randomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function generateInviteCode() {
  const user = await getAuthUser()
  if (!isPro(user)) return { error: 'Couple mode requires a Pro plan' }
  if (user.partner_id) return { error: 'You are already linked with a partner' }

  const supabase = await createClient()

  // Find a unique code (collision rate is negligible, but guard anyway)
  let code = randomCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data } = await supabase.from('users').select('id').eq('couple_invite_code', code).maybeSingle()
    if (!data) break
    code = randomCode()
  }

  const { error } = await supabase.from('users').update({ couple_invite_code: code }).eq('id', user.id)
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { code }
}

export async function acceptInvite(code: string) {
  const user = await getAuthUser()
  const supabase = await createClient()

  const { data: inviter } = await supabase
    .from('users')
    .select('id, email, partner_id')
    .eq('couple_invite_code', code)
    .maybeSingle()

  if (!inviter) return { error: 'Invalid or expired invite link' }
  if (inviter.id === user.id) return { error: 'You cannot accept your own invite' }
  if (user.partner_id) return { error: 'You are already linked with a partner' }
  if (inviter.partner_id) return { error: 'This person is already linked with a partner' }

  const [{ error: e1 }, { error: e2 }] = await Promise.all([
    supabase.from('users').update({ partner_id: inviter.id, couple_invite_code: null }).eq('id', user.id),
    supabase.from('users').update({ partner_id: user.id, couple_invite_code: null }).eq('id', inviter.id),
  ])

  if (e1 || e2) return { error: 'Failed to link accounts — please try again' }

  revalidatePath('/dashboard')
  return { success: true, partnerEmail: inviter.email }
}

export async function leaveCouple() {
  const user = await getAuthUser()
  if (!user.partner_id) return { error: 'You are not in couple mode' }

  const supabase = await createClient()
  const partnerId = user.partner_id

  const [{ error: e1 }, { error: e2 }] = await Promise.all([
    supabase.from('users').update({ partner_id: null }).eq('id', user.id),
    supabase.from('users').update({ partner_id: null }).eq('id', partnerId),
  ])

  if (e1 || e2) return { error: 'Failed to leave couple mode — please try again' }

  revalidatePath('/dashboard')
  return { success: true }
}
