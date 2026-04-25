'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthUser } from '@/lib/auth/get-user'

export async function setDigestOptOut(optOut: boolean) {
  const user = await getAuthUser()
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ digest_opted_out: optOut })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// Called from the public unsubscribe page — no auth required.
export async function unsubscribeByUid(uid: string) {
  if (!uid || uid.length < 10) return { error: 'Invalid link' }

  // Import admin client here to avoid bundling service key into client builds
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('users')
    .update({ digest_opted_out: true })
    .eq('id', uid)

  if (error) return { error: error.message }
  return { success: true }
}
