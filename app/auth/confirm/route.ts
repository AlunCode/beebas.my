import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get('next') ?? '/dashboard'
  
  // Check for stored redirect from signup flow (e.g., invite link)
  const cookieStore = await cookies()
  const storedRedirect = cookieStore.get('beebas_post_signup_redirect')?.value
  const redirectPath = storedRedirect || next
  const redirectTo = new URL(redirectPath, origin)
  const errorRedirect = new URL('/login', origin)

  const supabase = await createClient()

  // Token hash flow (production email template) — no PKCE required
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      // Clear the redirect cookie
      cookieStore.delete('beebas_post_signup_redirect')
      return NextResponse.redirect(redirectTo)
    }
    errorRedirect.searchParams.set('error', error.message)
    return NextResponse.redirect(errorRedirect)
  }

  // PKCE code flow (fallback for local dev / Supabase default template)
  const code = searchParams.get('code')
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Clear the redirect cookie
      cookieStore.delete('beebas_post_signup_redirect')
      return NextResponse.redirect(redirectTo)
    }
    errorRedirect.searchParams.set('error', error.message)
    return NextResponse.redirect(errorRedirect)
  }

  errorRedirect.searchParams.set('error', 'Missing confirmation parameters')
  return NextResponse.redirect(errorRedirect)
}
