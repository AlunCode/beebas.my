'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="outline"
      size="sm"
      className="rounded-lg text-xs border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent"
    >
      {loading ? 'Opening…' : 'Manage billing'}
    </Button>
  )
}
