'use client'

import { useState, useTransition } from 'react'
import { logout } from '@/lib/auth/actions'

export function LogoutButton() {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await logout()
    })
  }

  if (isPending) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-white/50">
        <svg className="animate-spin size-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Logging out…
      </span>
    )
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40 hidden sm:block">Log out?</span>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold px-2.5 py-1 rounded-lg transition-colors"
        >
          Yes, log out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors px-2.5 py-1 rounded-lg"
    >
      Log out
    </button>
  )
}
