'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateInviteCode, leaveCouple } from '@/app/actions/couple'
import { useToast } from './toast-provider'

interface Props {
  isPro: boolean
  partnerId: string | null
  partnerEmail: string | null
  existingCode: string | null
}

export function CoupleModeCard({ isPro, partnerId, partnerEmail, existingCode }: Props) {
  const [code, setCode] = useState(existingCode)
  const [linked, setLinked] = useState(!!partnerId)
  const [currentPartnerEmail, setCurrentPartnerEmail] = useState(partnerEmail)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const { toast } = useToast()

  const inviteUrl = code
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://beebas.my'}/invite/${code}`
    : null

  function handleGenerate() {
    setError(null)
    startTransition(async () => {
      const result = await generateInviteCode()
      if (result.error) {
        setError(result.error)
      } else if (result.code) {
        setCode(result.code)
      }
    })
  }

  function handleLeave() {
    setError(null)
    startTransition(async () => {
      const result = await leaveCouple()
      if (result.error) {
        setError(result.error)
      } else {
        setLinked(false)
        setCurrentPartnerEmail(null)
        toast('Left couple mode')
      }
    })
  }

  function copyLink() {
    if (!inviteUrl) return
    navigator.clipboard.writeText(inviteUrl)
    toast('Invite link copied')
  }

  if (!isPro) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-[#1C1C1C]">👫 Couple Mode</p>
          <p className="text-sm text-muted-foreground mt-0.5">Track debts together with your partner or family.</p>
        </div>
        <Link href="/pricing" className="shrink-0">
          <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none text-sm h-9">
            Upgrade →
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[#1C1C1C]">👫 Couple Mode</p>
        {linked && (
          <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full">Linked</span>
        )}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}

      {linked ? (
        <div className="space-y-3">
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Partner</p>
            <p className="text-sm font-semibold text-[#1C1C1C]">{currentPartnerEmail}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            You can see each other's debts and manage them together.
          </p>
          {confirmLeave ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Leave couple mode?</span>
              <button
                onClick={() => setConfirmLeave(false)}
                className="text-xs text-muted-foreground hover:text-[#1C1C1C] font-medium underline underline-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLeave}
                disabled={pending}
                className="text-xs text-red-500 hover:text-red-700 font-semibold disabled:opacity-50 transition-colors"
              >
                {pending ? 'Leaving…' : 'Yes, leave'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmLeave(true)}
              className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
            >
              Leave couple mode
            </button>
          )}
        </div>
      ) : inviteUrl ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Share this link with your partner. It expires once accepted.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0 rounded-xl bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs font-mono text-muted-foreground truncate">
              {inviteUrl}
            </div>
            <Button
              onClick={copyLink}
              className="shrink-0 rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none text-xs h-9 px-3"
            >
              Copy
            </Button>
          </div>
          <button
            onClick={handleGenerate}
            disabled={pending}
            className="text-xs text-muted-foreground hover:text-[#1C1C1C] font-medium disabled:opacity-50 transition-colors"
          >
            {pending ? 'Generating…' : 'Generate new link'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Invite your partner or family member to share your debt plan. Both of you will see and manage debts together.
          </p>
          <Button
            onClick={handleGenerate}
            disabled={pending}
            className="rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none text-sm h-9"
          >
            {pending ? 'Generating…' : 'Generate invite link'}
          </Button>
        </div>
      )}
    </div>
  )
}
