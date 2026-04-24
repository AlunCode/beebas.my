'use client'

import { useEffect } from 'react'

interface PublicAdBannerProps {
  /** Which ad slot env var to use. Defaults to NEXT_PUBLIC_ADSENSE_SLOT_PUBLIC. */
  slot?: 'public' | 'in-article'
  className?: string
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
const SLOTS: Record<string, string | undefined> = {
  public: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PUBLIC,
  'in-article': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
}

const PLACEHOLDERS = [
  { icon: '💳', text: 'Balance transfer at 0% for 12 months — compare Malaysia\'s best offers.' },
  { icon: '📊', text: 'Free credit score check — see where you stand in 60 seconds.' },
  { icon: '🏦', text: 'Personal loan rates from 5.99% p.a. — compare 10+ Malaysian banks.' },
  { icon: '💰', text: 'High-yield savings account — earn up to 4% p.a. with no lock-in.' },
]

let placeholderIndex = 0

export function PublicAdBanner({ slot = 'public', className = '' }: PublicAdBannerProps) {
  const adSlot = SLOTS[slot]
  const showReal = Boolean(PUBLISHER_ID && adSlot)

  useEffect(() => {
    if (!showReal) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {
      // safe to ignore
    }
  }, [showReal])

  const placeholder = PLACEHOLDERS[placeholderIndex++ % PLACEHOLDERS.length]

  return (
    <div className={`relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm ${className}`}>
      <span className="absolute top-2 right-3 text-[10px] font-medium text-gray-300 uppercase tracking-widest select-none z-10">
        Ad
      </span>

      {showReal ? (
        <div className="px-2 py-3 min-h-22.5 flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={PUBLISHER_ID}
            data-ad-slot={adSlot}
            data-ad-format={slot === 'in-article' ? 'fluid' : 'auto'}
            data-ad-layout={slot === 'in-article' ? 'in-article' : undefined}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 px-5 py-4 pr-12">
          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-lg shrink-0">
            {placeholder.icon}
          </div>
          <p className="text-sm text-muted-foreground leading-snug">
            <span className="font-semibold text-[#1C1C1C]">Sponsored · </span>
            {placeholder.text}
          </p>
        </div>
      )}
    </div>
  )
}
