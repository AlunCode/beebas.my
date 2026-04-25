import Link from 'next/link'
import { getAuthUser, isPro } from '@/lib/auth/get-user'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'
import { DebtForm } from './_components/debt-form'
import { DebtList } from './_components/debt-list'
import { PayoffCalculator } from './_components/payoff-calculator'
import { BillingPortalButton } from '@/app/pricing/_components/billing-portal-button'
import { AdBanner } from './_components/ad-banner'
import { ToastProvider } from './_components/toast-provider'
import { CoupleModeCard } from './_components/couple-mode'
import { DigestSettings } from './_components/digest-settings'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string; coupled?: string }>
}) {
  const user = await getAuthUser()
  const pro = isPro(user)
  const params = await searchParams
  const justUpgraded = params.upgraded === 'true'
  const justCoupled = params.coupled === 'true'

  const supabase = await createClient()

  // Fetch partner email when in couple mode
  let partnerEmail: string | null = null
  if (user.partner_id) {
    const { data: partner } = await supabase
      .from('users')
      .select('email')
      .eq('id', user.partner_id)
      .single()
    partnerEmail = partner?.email ?? null
  }

  // Fetch debts for current user + partner (if linked)
  const userIds = user.partner_id ? [user.id, user.partner_id] : [user.id]
  const { data: debts } = await supabase
    .from('debts')
    .select('*')
    .in('user_id', userIds)
    .order('created_at', { ascending: true })

  const debtList = debts ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40 hidden sm:block">{user.email}</span>
          {pro ? (
            <span className="text-xs bg-[#FFD000] text-[#1C1C1C] font-bold px-2.5 py-1 rounded-full">Pro</span>
          ) : (
            <Link href="/pricing">
              <span className="text-xs bg-white/10 text-white/60 font-medium px-2.5 py-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                Free · Upgrade
              </span>
            </Link>
          )}
          {pro && <BillingPortalButton />}
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm"
              className="rounded-lg border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs">
              Log out
            </Button>
          </form>
        </div>
      </nav>

      <ToastProvider>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Upgrade success banner */}
        {justUpgraded && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold text-emerald-800">You're on Pro!</p>
              <p className="text-sm text-emerald-700">Unlimited debts and all features are now unlocked. Let's get you debt-free.</p>
            </div>
          </div>
        )}

        {/* Couple mode linked banner */}
        {justCoupled && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 flex items-center gap-3">
            <span className="text-2xl">👫</span>
            <div>
              <p className="font-bold text-emerald-800">Couple mode active!</p>
              <p className="text-sm text-emerald-700">You and your partner are now sharing a debt plan. You can both see and manage debts together.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1C1C]">Your Debts</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {debtList.length === 0
                ? 'Add your first debt to get started.'
                : `${debtList.length} debt${debtList.length > 1 ? 's' : ''} · ${
                    !pro ? `${debtList.length}/3 free plan` : user.partner_id ? 'Couple mode · Pro' : 'Pro plan · unlimited'
                  }`}
            </p>
          </div>
          <DebtForm debtCount={debtList.length} isPro={pro} />
        </div>

        {/* Free plan limit banner */}
        {!pro && debtList.length >= 3 && (
          <div className="rounded-2xl bg-[#FFF8DC] border border-[#FFD000]/40 px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#1C1C1C] text-sm">You've hit the 3-debt free plan limit</p>
              <p className="text-xs text-[#8B6000] mt-0.5">Upgrade to Pro for unlimited debts, PDF exports, couple mode and more.</p>
            </div>
            <Link href="/pricing" className="shrink-0">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none text-sm h-9">
                Upgrade →
              </Button>
            </Link>
          </div>
        )}

        {/* Debt list */}
        {debtList.length > 0 && <DebtList debts={debtList} isPro={pro} />}

        {/* Empty state */}
        {debtList.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-4">🐝</div>
            <p className="font-bold text-[#1C1C1C] text-lg mb-1">No debts yet</p>
            <p className="text-sm text-muted-foreground">Hit "Add debt" above and we'll calculate your path to freedom.</p>
          </div>
        )}

        {/* Ad — between debt list and payoff plan (free users only) */}
        {!pro && debtList.length > 0 && (
          <AdBanner slot="mid" adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID} />
        )}

        {/* Payoff plan */}
        {debtList.length > 0 && (
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-[#1C1C1C] mb-4">Payoff Plan</h2>
            <PayoffCalculator debts={debtList} isPro={pro} />
          </div>
        )}

        {/* Ad — bottom of page (free users with debts) */}
        {!pro && debtList.length > 0 && (
          <AdBanner slot="bottom" adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />
        )}

        {/* Couple mode card */}
        <CoupleModeCard
          isPro={pro}
          partnerId={user.partner_id}
          partnerEmail={partnerEmail}
          existingCode={user.couple_invite_code}
        />

        {/* Email digest settings — Pro only */}
        {pro && <DigestSettings optedOut={user.digest_opted_out ?? false} />}

        {/* Soft upsell for free users with debts */}
        {!pro && debtList.length > 0 && debtList.length < 3 && (
          <div className="rounded-2xl bg-[#1C1C1C] px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">Unlock the full hive 🐝</p>
              <p className="text-xs text-white/50 mt-0.5">PDF exports, couple mode, milestone badges, monthly digest — all in Pro.</p>
            </div>
            <Link href="/pricing" className="shrink-0">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none text-sm h-9">
                See plans
              </Button>
            </Link>
          </div>
        )}
      </main>
      </ToastProvider>
    </div>
  )
}
