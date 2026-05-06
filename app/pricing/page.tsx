import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { UpgradeButton } from './_components/upgrade-button'
import { BillingPortalButton } from './_components/billing-portal-button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'Pricing — Beebas',
  description: 'Start free. Upgrade to Pro for unlimited debts, PDF export, couple mode, and more. RM 19/month or RM 149/year.',
}

const PRICING_FAQS = [
  {
    q: 'Is there a free trial for Pro?',
    a: 'Yes — Pro comes with a 14-day free trial. No credit card required to start. If you don\'t upgrade at the end of the trial, you automatically stay on the free plan. No charge, no hassle.',
  },
  {
    q: 'What\'s included in the free plan?',
    a: 'Up to 3 debts, snowball and avalanche calculator, payoff timeline chart, debt-free date countdown, and extra payment simulator. No credit card required.',
  },
  {
    q: 'Can I upgrade or cancel anytime?',
    a: 'Yes — upgrade at any time and cancel whenever you want. If you cancel, you keep Pro access until the end of your billing period. No lock-in, no penalty.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. If you\'re not satisfied with your first payment, contact us within 7 days for a full refund. After that, refunds are at our discretion.',
  },
  {
    q: 'Do you charge in Malaysian Ringgit?',
    a: 'Yes. All prices are in MYR (Malaysian Ringgit). Stripe handles payment processing securely.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Visa, Mastercard, and other major cards via Stripe. FPX bank transfer is not currently supported.',
  },
  {
    q: 'Will ads show on Pro?',
    a: 'No. Pro users see no ads — inside the dashboard or anywhere else on Beebas.',
  },
]

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
  '14-day free trial — no credit card needed',
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
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Blog</Link>
          <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Contact</Link>
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
            trialText="14-day free trial, then RM 19/month"
            features={PRO_FEATURES}
            featured
            badge="Most popular"
            cta={
              isPro ? (
                <BillingPortalButton />
              ) : user ? (
                <UpgradeButton priceId={MONTHLY_PRICE_ID} label="Start 14-day free trial" />
              ) : (
                <Link href="/signup" className="block">
                  <Button className="w-full h-11 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none">
                    Start 14-day free trial
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] tracking-tight mb-2">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">Everything about plans, billing, and features.</p>
          </div>
          <div className="space-y-3">
            {PRICING_FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-gray-100 bg-white shadow-sm px-6 py-5">
                <p className="font-bold text-[#1C1C1C] mb-1.5">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad — above disclaimer */}
        <div className="max-w-3xl mx-auto px-4 sm:px-0 mt-10">
          <PublicAdBanner />
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
  badge, savingsBadge = false, trialText, cta,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  featured?: boolean
  badge?: string
  savingsBadge?: boolean
  trialText?: string
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
        {trialText && (
          <p className="text-xs font-semibold text-[#FFD000] mt-1.5">{trialText}</p>
        )}
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
