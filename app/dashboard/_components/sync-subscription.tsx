'use client'

import { useEffect, useState } from 'react'

/**
 * Invisible component that syncs the user's Stripe subscription status
 * with the database when they land on /dashboard?upgraded=true.
 *
 * This is a safety net for when the Stripe webhook fails or is
 * misconfigured — the user still gets their Pro access.
 */
export function SyncSubscription() {
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    if (synced) return

    const params = new URLSearchParams(window.location.search)
    if (params.get('upgraded') !== 'true') return

    setSynced(true)

    fetch('/api/stripe/sync', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.status !== 'no_customer') {
          // Reload the page so the server re-renders with fresh DB data
          window.location.replace('/dashboard')
        }
      })
      .catch((err) => {
        console.error('[SyncSubscription] Failed to sync:', err)
      })
  }, [synced])

  return null
}