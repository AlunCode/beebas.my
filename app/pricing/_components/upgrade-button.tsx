'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  priceId: string
  label?: string
  className?: string
  variant?: 'primary' | 'outline'
}

export function UpgradeButton({
  priceId,
  label = 'Upgrade to Pro',
  className = '',
  variant = 'primary',
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const base = 'h-11 rounded-xl font-bold text-base border-0 shadow-none w-full'
  const styles =
    variant === 'primary'
      ? `${base} bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C]`
      : `${base} bg-white hover:bg-gray-50 text-[#1C1C1C] border border-gray-200`

  return (
    <Button onClick={handleClick} disabled={loading} className={`${styles} ${className}`}>
      {loading ? 'Redirecting…' : label}
    </Button>
  )
}
