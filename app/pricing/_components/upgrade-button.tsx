'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  priceId: string
  mode?: string
  label?: string
  className?: string
  variant?: 'primary' | 'outline'
}

export function UpgradeButton({
  priceId,
  label = 'Upgrade to Pro',
  className = '',
  variant = 'primary',
  mode = 'subscription'
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`)
      }
      if (data.error) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      console.error('[checkout] Client error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const base = 'h-11 rounded-xl font-bold text-base border-0 shadow-none w-full'
  const styles =
    variant === 'primary'
      ? `${base} bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C]`
      : `${base} bg-white hover:bg-gray-50 text-[#1C1C1C] border border-gray-200`

  return (
    <div className="w-full">
      {error && (
        <p className="text-sm text-red-600 mb-2 text-center">{error}</p>
      )}
      <Button onClick={handleClick} disabled={loading} className={`${styles} ${className}`}>
        {loading ? 'Redirecting…' : label}
      </Button>
    </div>
  )
}