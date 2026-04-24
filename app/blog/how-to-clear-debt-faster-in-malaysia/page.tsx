import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: '7 Proven Techniques to Clear Your Debt Faster in Malaysia',
  description: 'From snowball and avalanche to 0% balance transfers and rate renegotiation — every debt repayment strategy Malaysians can use right now to pay less interest and get free sooner.',
  openGraph: {
    type: 'article',
    title: '7 Proven Techniques to Clear Your Debt Faster in Malaysia',
    description: 'Every strategy Malaysians can use to pay less interest and get debt-free sooner.',
  },
}

function Callout({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#FFF8DC] border border-[#FFD000]/30 px-6 py-5 my-6">
      <p className="font-bold text-[#1C1C1C] mb-2">{icon} {title}</p>
      <div className="text-sm text-[#8B6000] leading-relaxed">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 my-4 text-sm text-emerald-800 leading-relaxed">
      <span className="font-bold">Pro tip: </span>{children}
    </div>
  )
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Blog</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-[#1C1C1C] transition-colors">Blog</Link>
          <span>›</span>
          <span>Debt Strategy</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Strategy</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            7 Proven Techniques to Clear Your Debt Faster in Malaysia
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>24 April 2026</span>
            <span>·</span>
            <span>6 min read</span>
            <span>·</span>
            <span>By Beebas</span>
          </div>
        </div>

        {/* Intro */}
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Most Malaysians know they should pay off debt faster. Very few know the specific techniques that can cut years off the timeline and save thousands in interest.
          </p>
          <p>
            This guide covers every practical strategy — from the well-known to the ones your bank definitely won't tell you about. No jargon, no fluff. Just the techniques that work.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. The Debt Snowball</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pay the minimum on all your debts every month. Then take every extra ringgit you have and throw it at your <strong className="text-[#1C1C1C]">smallest balance</strong> first — regardless of interest rate. When that debt is gone, roll its payment into the next smallest.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The logic isn't mathematical — it's psychological. Each debt you eliminate gives you a win, and wins build momentum. Dave Ramsey popularised this in the US; it works just as well here.
            </p>
            <Callout icon="📌" title="Example">
              You have three debts: RM 1,500 personal loan, RM 4,200 credit card, RM 18,000 car loan. Attack the RM 1,500 first. When it's paid off in 3 months, take that payment and add it to the credit card attack. Then roll both into the car loan.
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">Best for:</strong> People who need quick wins to stay motivated.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. The Debt Avalanche</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Same mechanic as snowball — pay minimums on everything, direct extra cash at one target — but you attack the <strong className="text-[#1C1C1C]">highest interest rate</strong> first instead of the smallest balance.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Mathematically, avalanche saves you more money. A credit card at 18% p.a. is costing you significantly more than a car loan at 3.5% p.a. Eliminating the 18% debt first stops that bleeding.
            </p>
            <Tip>
              Use Beebas to compare snowball vs avalanche side by side. Enter your debts once and see exactly how much interest each strategy saves you — and which pays you off sooner.
            </Tip>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">Best for:</strong> Disciplined people who can stay the course without quick wins.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Debt Consolidation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Combine multiple debts into a single loan at a <strong className="text-[#1C1C1C]">lower interest rate</strong>. In Malaysia, this typically means:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Personal loan consolidation</strong> — banks like CIMB, Maybank, and RHB offer personal loans at 6–12% p.a. If your credit cards are at 18%, consolidating into a personal loan immediately halves your interest rate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">AKPK Debt Management Programme</strong> — If you're seriously struggling, AKPK (Agensi Kaunseling dan Pengurusan Kredit) helps Malaysians restructure debt directly with banks at reduced rates. It's free, government-backed, and doesn't require a lawyer.</span>
              </li>
            </ul>
            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-800">
              <strong>Warning:</strong> Consolidation only works if you stop using the credit cards you just cleared. Many people consolidate, then re-rack the cards and end up with more debt than before.
            </div>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. The 0% Balance Transfer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Move your credit card balance to a new card offering <strong className="text-[#1C1C1C]">0% interest for a promotional period</strong> — typically 6 to 24 months. Malaysian banks (Maybank, CIMB, Hong Leong, HSBC) regularly offer these deals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              During the 0% window, every ringgit you pay goes directly to reducing principal — not to interest. This can dramatically accelerate payoff.
            </p>
            <Callout icon="⚠️" title="Watch out for">
              <ul className="space-y-1">
                <li>• <strong>Transfer fee</strong> — usually 1–5% of the balance transferred</li>
                <li>• <strong>The rate cliff</strong> — interest spikes (often to 18%+) the moment the promo period ends</li>
                <li>• <strong>Minimum payments</strong> — missing even one can void the 0% rate</li>
              </ul>
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">The rule:</strong> Only do a balance transfer if you're confident you can pay off most or all of the balance before the promo period ends.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. Debt Snowflaking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This is a habit, not a strategy — but it compounds powerfully. The idea: any time you receive unexpected money, put it directly onto your debt <em>immediately</em>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bonus from work? Sold something on Carousell? Received duit raya? Got a tax refund? Instead of spending it, throw it at your target debt the same day before you get used to having it.
            </p>
            <Tip>
              Even RM 50 extra against a 18% credit card debt saves you significantly more in the long run. The earlier you pay, the more interest you avoid.
            </Tip>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. Biweekly Payments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instead of paying your monthly instalment once a month, pay <strong className="text-[#1C1C1C]">half the amount every two weeks</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The maths: there are 52 weeks in a year, so biweekly payments give you 26 half-payments — which equals 13 full monthly payments instead of 12. You make one extra full payment per year without even noticing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On a RM 50,000 car loan at 4.5% over 7 years, this simple trick alone can save you 6–8 months and thousands in interest. Works especially well for personal loans and mortgages.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">7. Rate Renegotiation (The One Malaysians Never Try)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This is the most underused technique in Malaysia. Call your bank and simply ask for a lower interest rate on your credit card.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              It sounds too simple. It works because:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Banks prefer a loyal customer at a reduced rate over a customer who defaults or transfers elsewhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>If you've been a customer for 2+ years with a clean payment history, you have leverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>The worst they can say is no — nothing changes</span>
              </li>
            </ul>
            <Callout icon="📞" title="Script to use">
              "I've been a customer for [X] years and have always paid on time. I'm working to pay off my balance faster. Is there anything you can do to temporarily reduce my interest rate to help me do that?"
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              Even a reduction from 18% to 15% p.a. on a RM 10,000 balance saves you RM 300 per year in interest.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Summary table */}
          <section>
            <h2 className="text-2xl font-extrabold mb-6">Quick reference</h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Technique</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Effort</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Impact</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Snowball', effort: 'Low', impact: 'High', best: 'Motivation' },
                    { name: 'Avalanche', effort: 'Low', impact: 'Highest', best: 'Max savings' },
                    { name: 'Consolidation', effort: 'Medium', impact: 'High', best: 'Multiple debts' },
                    { name: '0% balance transfer', effort: 'Medium', impact: 'High', best: 'Credit card debt' },
                    { name: 'Snowflaking', effort: 'Low', impact: 'Medium', best: 'Windfalls' },
                    { name: 'Biweekly payments', effort: 'Low', impact: 'Medium', best: 'Loans' },
                    { name: 'Rate renegotiation', effort: 'Low', impact: 'Medium', best: 'Credit cards' },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.name}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.effort}</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-600">{row.impact}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">The most important thing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              None of these techniques work unless you know exactly where you stand. Most Malaysians in debt don't know their total balance, their combined interest rate, or how long it will take to be free if they only pay minimums.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That's where Beebas comes in. Enter all your debts, pick a strategy, and see your exact debt-free date — for free.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">See which strategy works best for your debts</h3>
          <p className="text-white/50 text-sm mb-5">
            Enter your debts once. Beebas compares snowball vs avalanche and shows you your exact debt-free date.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                Get your free payoff plan →
              </Button>
            </Link>
            <Link href="/#calculator">
              <Button variant="outline" className="rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold h-11 px-8">
                Try the free calculator
              </Button>
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-[#1C1C1C] transition-colors">
            ← Back to all articles
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] px-6 py-8 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs">🐝</div>
            <span className="text-[#FFD000] font-bold text-sm">Beebas</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
