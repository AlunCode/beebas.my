import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { UpgradeButton } from './_components/upgrade-button'
import { BillingPortalButton } from './_components/billing-portal-button'

const MONTHLY_PRICE_ID = process.env.STRIPE_PRO_MONTHLY_PRICE_ID!
const ANNUAL_PRICE_ID = process.env.STRIPE_PRO_ANNUAL_PRICE_ID!

const FREE_FEATURES = [
  'Up to 3 debts',
  'Snowball & avalanche calculator',
  'Payoff timeline chart',
  'Debt-free date countdown',
  'Extra payment simulator',
]

const PRO_FEATURES = [
  'Unlimited debts',
  'Everything in Free',
  'PDF payoff plan export',
  'Couple / family mode',
  'Monthly progress email digest',
  'Milestone badges',
  'Custom debt categories',
  'Priority support',
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let subscriptionStatus = 'free'
  if (user) {
    const { data } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', user.id)
      .single<{ subscription_status: string }>()
    subscriptionStatus = data?.subscription_status ?? 'free'
  }

  const isPro = subscriptionStatus === 'pro'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isPro && <BillingPortalButton />}
              <Link href="/dashboard">
                <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
              <Link href="/signup">
                <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
                  Get started free
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1C1C1C] mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you're ready to go all in on becoming debt-free.
          </p>
          {isPro && (
            <div className="inline-flex items-center gap-2 mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              You're on Pro — thanks for supporting Beebas!
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Free */}
          <PlanCard
            name="Free"
            price="RM 0"
            period="forever"
            description="Enough to get started and see the plan."
            features={FREE_FEATURES}
            cta={
              user
                ? isPro
                  ? <Button disabled className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 font-bold border-0 shadow-none">Your previous plan</Button>
                  : <Button disabled className="w-full h-11 rounded-xl bg-gray-100 text-gray-500 font-bold border-0 shadow-none">Current plan</Button>
                : <Link href="/signup" className="block">
                    <Button className="w-full h-11 rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0 shadow-none">
                      Get started free
                    </Button>
                  </Link>
            }
          />

          {/* Pro Monthly — featured */}
          <PlanCard
            name="Pro"
            price="RM 19"
            period="per month"
            description="For Malaysians serious about getting debt-free."
            features={PRO_FEATURES}
            featured
            badge="Most popular"
            cta={
              isPro ? (
                <BillingPortalButton />
              ) : user ? (
                <UpgradeButton priceId={MONTHLY_PRICE_ID} label="Upgrade to Pro" />
              ) : (
                <Link href="/signup" className="block">
                  <Button className="w-full h-11 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none">
                    Start free, then upgrade
                  </Button>
                </Link>
              )
            }
          />

          {/* Annual */}
          <PlanCard
            name="Pro Annual"
            price="RM 149"
            period="per year"
            description="Best value — 2+ months free vs monthly."
            features={PRO_FEATURES}
            badge="Save 35%"
            savingsBadge
            cta={
              isPro ? (
                <BillingPortalButton />
              ) : user ? (
                <UpgradeButton priceId={ANNUAL_PRICE_ID} label="Get annual plan" variant="outline" />
              ) : (
                <Link href="/signup" className="block">
                  <Button variant="outline" className="w-full h-11 rounded-xl font-bold shadow-none">
                    Start free, then upgrade
                  </Button>
                </Link>
              )
            }
          />
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-10 max-w-lg mx-auto">
          Beebas is a financial planning tool and does not constitute financial advice.
          Please consult a licensed financial advisor for professional guidance.
          Prices in Malaysian Ringgit (MYR). Stripe processes all payments securely.
        </p>
      </main>
    </div>
  )
}

function PlanCard({
  name, price, period, description, features, featured = false,
  badge, savingsBadge = false, cta,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  featured?: boolean
  badge?: string
  savingsBadge?: boolean
  cta: React.ReactNode
}) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col gap-6 ${
      featured
        ? 'bg-[#1C1C1C] text-white shadow-xl ring-2 ring-[#FFD000]'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
          savingsBadge
            ? 'bg-emerald-500 text-white'
            : 'bg-[#FFD000] text-[#1C1C1C]'
        }`}>
          {badge}
        </div>
      )}

      <div>
        <p className={`text-sm font-semibold mb-1 ${featured ? 'text-[#FFD000]/70' : 'text-muted-foreground'}`}>
          {name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          <span className={`text-sm ${featured ? 'text-white/50' : 'text-muted-foreground'}`}>/{period}</span>
        </div>
        <p className={`text-sm mt-2 ${featured ? 'text-white/60' : 'text-muted-foreground'}`}>{description}</p>
      </div>

      <ul className="space-y-2 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 shrink-0 ${featured ? 'text-[#FFD000]' : 'text-emerald-500'}`}>✓</span>
            <span className={featured ? 'text-white/80' : 'text-[#1C1C1C]'}>{f}</span>
          </li>
        ))}
      </ul>

      {cta}
    </div>
  )
}
