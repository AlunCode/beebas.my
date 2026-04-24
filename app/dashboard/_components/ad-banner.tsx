'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AdBannerProps {
  slot: 'mid' | 'bottom'
}

/**
 * Rendered only for free-tier users. Replace the inner placeholder div
 * with a real Google AdSense unit:
 *
 *   <ins className="adsbygoogle"
 *     style={{ display: 'block' }}
 *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *     data-ad-slot="XXXXXXXXXX"
 *     data-ad-format="auto"
 *     data-full-width-responsive="true" />
 *
 * and add the AdSense <Script> tag to app/layout.tsx.
 */
export function AdBanner({ slot }: AdBannerProps) {
  if (slot === 'mid') {
    return (
      <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
        {/* Ad label */}
        <span className="absolute top-2 right-3 text-[10px] font-medium text-gray-300 uppercase tracking-widest select-none">
          Ad
        </span>

        {/* ── Replace this block with your AdSense <ins> tag ── */}
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
            <Button
              size="sm"
              className="rounded-lg bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none text-xs"
            >
              Learn more →
            </Button>
          </a>
        </div>
        {/* ── End ad block ── */}

        {/* Remove-ads nudge */}
        <div className="border-t border-gray-50 px-5 py-2 flex items-center justify-between bg-gray-50/60">
          <p className="text-[11px] text-muted-foreground">
            Ads support the free plan
          </p>
          <Link
            href="/pricing"
            className="text-[11px] font-semibold text-[#1C1C1C] hover:underline"
          >
            Remove ads — upgrade to Pro →
          </Link>
        </div>
      </div>
    )
  }

  // slot === 'bottom'
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <span className="absolute top-2 right-3 text-[10px] font-medium text-gray-300 uppercase tracking-widest select-none">
        Ad
      </span>

      {/* ── Replace this block with your AdSense <ins> tag ── */}
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
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg font-bold text-xs"
          >
            Compare now →
          </Button>
        </a>
      </div>
      {/* ── End ad block ── */}

      <div className="border-t border-gray-50 px-5 py-2 flex items-center justify-between bg-gray-50/60">
        <p className="text-[11px] text-muted-foreground">
          Ads support the free plan
        </p>
        <Link
          href="/pricing"
          className="text-[11px] font-semibold text-[#1C1C1C] hover:underline"
        >
          Remove ads — upgrade to Pro →
        </Link>
      </div>
    </div>
  )
}
