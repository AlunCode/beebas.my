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

  // Check if there's already an existing invite code
  const { data: existingUser } = await supabase
    .from('users')
    .select('couple_invite_code')
    .eq('id', user.id)
    .single()

  // If there's an existing code, the invite may have been accepted or is pending
  // Clear any existing code before generating a new one
  if (existingUser?.couple_invite_code) {
    await supabase.from('users').update({ couple_invite_code: null }).eq('id', user.id)
  }

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

  // Resolve the inviter by code (SECURITY DEFINER function).
  const { data: inviterRows } = await supabase
    .rpc('lookup_inviter', { invite_code: code })

  const inviter = inviterRows?.[0] ?? null

  if (!inviter) return { error: 'Invalid or expired invite link' }
  if (inviter.id === user.id) return { error: 'You cannot accept your own invite' }
  if (user.partner_id) return { error: 'You are already linked with a partner' }
  if (inviter.partner_id) return { error: 'This person is already linked with a partner' }

  // Link both users atomically. This is a SECURITY DEFINER function so it can
  // update the inviter's row too (the invitee's own RLS policy cannot).
  const { data: partnerEmail, error } = await supabase
    .rpc('link_couple', { inviter_id: inviter.id })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true, partnerEmail }
}

export async function leaveCouple() {
  const user = await getAuthUser()
  if (!user.partner_id) return { error: 'You are not in couple mode' }

  const supabase = await createClient()
  const { error } = await supabase.rpc('unlink_couple')
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}
