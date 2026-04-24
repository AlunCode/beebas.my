'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AdBannerProps {
  slot: 'mid' | 'bottom'
  /**
   * Your AdSense ad unit slot ID for this placement.
   * Get it from AdSense dashboard → Ads → By ad unit → your unit → slot ID.
   * Example: "1234567890"
   */
  adSlot?: string
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

/**
 * When NEXT_PUBLIC_ADSENSE_PUBLISHER_ID and adSlot are both set,
 * renders a real Google AdSense <ins> unit.
 *
 * Otherwise renders a tasteful house-ad placeholder so the layout
 * never breaks in development or before AdSense approval.
 *
 * To enable Auto Ads instead of manual units:
 *   - Add the AdSense <Script> to layout.tsx (already done)
 *   - Enable Auto Ads in your AdSense dashboard
 *   - Remove this component entirely — Google handles placement
 */
export function AdBanner({ slot, adSlot }: AdBannerProps) {
  const showReal = Boolean(PUBLISHER_ID && adSlot)

  useEffect(() => {
    if (!showReal) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {
      // adsbygoogle not loaded yet — safe to ignore
    }
  }, [showReal])

  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      {/* Required disclosure label */}
      <span className="absolute top-2 right-3 text-[10px] font-medium text-gray-300 uppercase tracking-widest select-none z-10">
        Ad
      </span>

      {showReal ? (
        /* ── Real AdSense unit ── */
        <div className="px-2 py-3 min-h-22.5 flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={PUBLISHER_ID}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : slot === 'mid' ? (
        /* ── Placeholder: mid banner ── */
        <div className="flex flex-col sm:flex-row items-center gap-4 px-5 py-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF8DC] flex items-center justify-center text-xl shrink-0">
            💳
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="font-bold text-[#1C1C1C] text-sm">
              Balance transfer at 0% for 12 months
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Move your credit card debt and pay zero interest while you pay it down.
            </p>
          </div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0"
          >
            <Button size="sm" className="rounded-lg bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none text-xs">
              Learn more →
            </Button>
          </a>
        </div>
      ) : (
        /* ── Placeholder: bottom banner ── */
        <div className="flex flex-col sm:flex-row items-center gap-4 px-5 py-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl shrink-0">
            📈
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="font-bold text-[#1C1C1C] text-sm">
              Grow your emergency fund while paying debt
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              High-yield savings accounts with up to 4% p.a. — no lock-in period.
            </p>
          </div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0"
          >
            <Button size="sm" variant="outline" className="rounded-lg font-bold text-xs">
              Compare now →
            </Button>
          </a>
        </div>
      )}

      {/* Remove-ads nudge */}
      <div className="border-t border-gray-50 px-5 py-2 flex items-center justify-between bg-gray-50/60">
        <p className="text-[11px] text-muted-foreground">Ads support the free plan</p>
        <Link href="/pricing" className="text-[11px] font-semibold text-[#1C1C1C] hover:underline">
          Remove ads — upgrade to Pro →
        </Link>
      </div>
    </div>
  )
}
