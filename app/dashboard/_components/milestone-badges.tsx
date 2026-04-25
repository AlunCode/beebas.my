import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { milestone_type } from '@/types/database'

const BADGES: { type: milestone_type; emoji: string; name: string; desc: string; streakOnly?: boolean }[] = [
  { type: 'first_debt_paid',  emoji: '🎯', name: 'First Victory',   desc: 'Paid off your first debt' },
  { type: 'halfway_point',    emoji: '⚡', name: 'Halfway There',   desc: 'Cleared 50% of total debt' },
  { type: 'all_debts_paid',   emoji: '🏆', name: 'Debt Free!',      desc: 'Paid off every last ringgit' },
  { type: 'streak_3_months',  emoji: '🔥', name: 'Hot Streak',      desc: '3 months of payments', streakOnly: true },
  { type: 'streak_6_months',  emoji: '🌟', name: 'On a Roll',       desc: '6 months of payments', streakOnly: true },
  { type: 'streak_12_months', emoji: '👑', name: 'Unstoppable',     desc: '12 months of payments', streakOnly: true },
]

interface Props {
  earned: milestone_type[]
  isPro: boolean
}

export function MilestoneBadges({ earned, isPro }: Props) {
  const earnedSet = new Set(earned)

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-[#1C1C1C]">🏅 Milestone Badges</p>
        {!isPro && (
          <Link href="/pricing">
            <span className="text-xs font-bold text-[#8B6000] bg-[#FFF8DC] px-2.5 py-1 rounded-full">Pro</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BADGES.map(badge => {
          const isEarned = isPro && earnedSet.has(badge.type)
          const isLocked = !isPro || badge.streakOnly

          return (
            <div
              key={badge.type}
              className={`relative rounded-xl p-3.5 flex flex-col gap-1.5 transition-all ${
                isEarned
                  ? 'bg-[#1C1C1C]'
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              {isLocked && !isEarned && (
                <span className="absolute top-2 right-2 text-gray-300 text-xs">🔒</span>
              )}
              <span className={`text-2xl ${!isEarned ? 'grayscale opacity-40' : ''}`}>
                {badge.emoji}
              </span>
              <p className={`text-xs font-bold leading-tight ${isEarned ? 'text-[#FFD000]' : 'text-gray-400'}`}>
                {badge.name}
              </p>
              <p className={`text-xs leading-tight ${isEarned ? 'text-white/50' : 'text-gray-300'}`}>
                {badge.streakOnly && isPro ? 'Needs payment tracking' : badge.desc}
              </p>
            </div>
          )
        })}
      </div>

      {!isPro && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Earn badges by paying off your debts. Pro only.</p>
          <Link href="/pricing" className="shrink-0">
            <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none text-xs h-8 px-3">
              Upgrade →
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
