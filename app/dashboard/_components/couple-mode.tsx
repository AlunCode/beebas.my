'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LinkButton } from '@/components/ui/link-button'
import { Button } from '@/components/ui/button'
import { generateInviteCode, leaveCouple } from '@/app/actions/couple'
import { useToast } from './toast-provider'

interface Props {
  isPro: boolean
  partnerId: string | null
  partnerEmail: string | null
  existingCode: string | null
  origin: string
}

export function CoupleModeCard({ isPro, partnerId, partnerEmail, existingCode, origin }: Props) {
  const linked = !!partnerId
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const inviteUrl = existingCode && origin ? `${origin}/invite/${existingCode}` : null

  function handleGenerate() {
    setError(null)
    startTransition(async () => {
      const result = await generateInviteCode()
      if (result.error) {
        setError(result.error)
      } else {
        // Refresh the server component so the new invite code is reflected
        // from props without keeping stale local state.
        router.refresh()
        toast('Invite link generated')
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
        setConfirmLeave(false)
        toast('Left couple mode')
      }
    })
  }

  function copyLink() {
    if (!inviteUrl) return
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    toast('Invite link copied')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isPro) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF8DC] flex items-center justify-center shrink-0 text-lg">👫</div>
          <div>
            <p className="font-bold text-[#1C1C1C]">Couple Mode</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Track debts together with your partner or family.
            </p>
          </div>
        </div>
        <LinkButton href="/pricing" className="shrink-0 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none text-sm h-9 px-4">
            Upgrade →
          </LinkButton>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#FFF8DC] flex items-center justify-center text-base">👫</div>
          <p className="font-bold text-[#1C1C1C]">Couple Mode</p>
        </div>
        {linked && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-full border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Connected
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* LINKED STATE */}
      {linked ? (
        <div className="space-y-5">
          {/* Partner connection visual */}
          <div className="rounded-2xl bg-gradient-to-b from-emerald-50/60 to-white border border-emerald-100/60 p-5">
            <div className="flex items-center justify-center gap-3">
              {/* Current user */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#1C1C1C] flex items-center justify-center text-xl shadow-sm ring-4 ring-white">
                  🐝
                </div>
                <span className="text-xs font-semibold text-[#1C1C1C]">You</span>
              </div>

              {/* Connection line */}
              <div className="flex flex-col items-center gap-1 px-2">
                <div className="flex items-center gap-1">
                  <span className="h-0.5 w-4 bg-emerald-300 rounded-full"></span>
                  <span className="h-0.5 w-5 bg-emerald-400 rounded-full"></span>
                  <span className="h-0.5 w-4 bg-emerald-300 rounded-full"></span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Linked</span>
              </div>

              {/* Partner */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-xl shadow-sm ring-4 ring-white">
                  👤
                </div>
                <span className="text-xs font-semibold text-[#1C1C1C]">Partner</span>
              </div>
            </div>
          </div>

          {/* Partner details */}
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-[#1C1C1C] truncate max-w-[260px] mx-auto" title={partnerEmail ?? undefined}>
              {partnerEmail}
            </p>
            <p className="text-xs text-muted-foreground">
              You can see each other&apos;s debts and manage them together.
            </p>
          </div>

          {/* Leave action */}
          {confirmLeave ? (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="text-center space-y-0.5">
                <p className="text-sm font-semibold text-red-700">Leave couple mode?</p>
                <p className="text-xs text-red-600/80">
                  You will no longer see your partner&apos;s debts and vice versa.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmLeave(false)}
                  disabled={pending}
                  className="flex-1 rounded-xl text-xs font-semibold h-9 border-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLeave}
                  disabled={pending}
                  className="flex-1 rounded-xl text-xs font-bold h-9"
                >
                  {pending ? 'Leaving…' : 'Yes, leave'}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setConfirmLeave(true)}
              className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold h-10 text-sm"
            >
              Leave Couple Mode
            </Button>
          )}
        </div>
      ) : inviteUrl ? (
        /* INVITE LINK GENERATED STATE */
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Share this link with your partner. It expires once they accept.
          </p>

          {/* URL + Copy */}
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0 rounded-xl bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs font-mono text-muted-foreground truncate">
              {inviteUrl}
            </div>
            <Button
              onClick={copyLink}
              variant={copied ? 'secondary' : 'default'}
              className={`shrink-0 rounded-xl font-bold border-0 shadow-none text-xs h-9 px-3 transition-colors ${
                copied
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-[#1C1C1C] hover:bg-black text-white'
              }`}
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={pending}
              className="text-xs text-muted-foreground hover:text-[#1C1C1C] font-medium disabled:opacity-50 transition-colors"
            >
              {pending ? 'Generating…' : '🔄 Generate new link'}
            </button>
          </div>
        </div>
      ) : (
        /* INITIAL / NO INVITE STATE */
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#FFF8DC]/40 border border-[#FFD000]/20 p-4">
            <p className="text-sm text-[#8B6000] leading-relaxed">
              Invite your partner or family member to share your debt plan.
              Both of you will see and manage all debts together in one unified dashboard.
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={pending}
            className="w-full sm:w-auto rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none text-sm h-10 px-5"
          >
            {pending ? 'Generating…' : '✨ Generate invite link'}
          </Button>
        </div>
      )}
    </div>
  )
}
