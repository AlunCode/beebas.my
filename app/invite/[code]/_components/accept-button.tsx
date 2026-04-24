'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { acceptInvite } from '@/app/actions/couple'

export function AcceptButton({ code }: { code: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleAccept() {
    startTransition(async () => {
      const result = await acceptInvite(code)
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/dashboard?coupled=true')
      }
    })
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}
      <Button
        onClick={handleAccept}
        disabled={pending}
        className="w-full h-11 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none"
      >
        {pending ? 'Linking accounts…' : 'Accept & link accounts'}
      </Button>
    </div>
  )
}
