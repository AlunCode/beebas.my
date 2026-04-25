'use client'

import { useTransition } from 'react'
import { setDigestOptOut } from '@/app/actions/digest'
import { useToast } from './toast-provider'

interface Props {
  optedOut: boolean
}

export function DigestSettings({ optedOut }: Props) {
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()

  function toggle() {
    startTransition(async () => {
      const result = await setDigestOptOut(!optedOut)
      if (result.error) {
        toast(result.error, 'error')
      } else {
        toast(optedOut ? 'Monthly digest re-enabled' : 'Monthly digest disabled')
      }
    })
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-bold text-[#1C1C1C] text-sm">📧 Monthly email digest</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {optedOut
            ? 'You are not receiving monthly progress emails.'
            : 'We send a progress summary on the 1st of each month.'}
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={pending}
        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${
          optedOut
            ? 'bg-[#1C1C1C] text-white hover:bg-black'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {pending ? '…' : optedOut ? 'Re-enable' : 'Disable'}
      </button>
    </div>
  )
}
