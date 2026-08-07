'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Client-side transition component shown after Stripe checkout.
 *
 * The server component has already synced the subscription status to the
 * database, so by the time this component mounts the data is fresh.
 * We show a brief branded loading screen then navigate to the dashboard.
 */
export function CheckoutTransition() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/dashboard?upgraded=true')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-[#FFD000] flex items-center justify-center mx-auto mb-6 text-3xl">
          🐝
        </div>
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#FFD000] border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-[#1C1C1C] mb-2">Almost there!</h2>
        <p className="text-sm text-gray-500">Setting up your Pro account…</p>
      </div>
    </div>
  )
}
