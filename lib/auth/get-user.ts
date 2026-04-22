import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type UserRow = Database['public']['Tables']['users']['Row']

export async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: dbUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!dbUser) redirect('/login')

  return dbUser as UserRow
}

export function isPro(user: UserRow) {
  return user.subscription_status === 'pro'
}
