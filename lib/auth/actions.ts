'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  const redirectTo = formData.get('redirect') as string
  redirect(redirectTo || '/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
    },
  })

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  // If email confirmation is disabled, session is returned immediately
  if (data.session) {
    const redirectTo = formData.get('redirect') as string
    redirect(redirectTo || '/dashboard')
  }

  // If email confirmation required, store redirect in cookie and pass via query param
  const redirectTo = formData.get('redirect') as string
  if (redirectTo && redirectTo !== '/dashboard') {
    const cookieStore = await cookies()
    cookieStore.set('beebas_post_signup_redirect', redirectTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    redirect(`/login?message=Check your email to confirm your account&redirect=${encodeURIComponent(redirectTo)}`)
  }

  redirect('/login?message=Check your email to confirm your account')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
