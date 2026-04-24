import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'The Minimum Payment Trap: Why Your Credit Card Debt Never Seems to Go Down',
  description: "Paying the minimum on your credit card feels responsible. It isn't. Here's the brutal math of what minimum payments actually cost Malaysians — and what to do instead.",
  openGraph: {
    type: 'article',
    title: 'The Minimum Payment Trap: Why Your Credit Card Debt Never Seems to Go Down',
    description: "The brutal math of minimum payments — and what to do instead.",
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Minimum Payment Trap: Why Your Credit Card Debt Never Seems to Go Down',
  description: "Paying the minimum on your credit card feels responsible. It isn't. Here's the brutal math of what minimum payments actually cost Malaysians — and what to do instead.",
  datePublished: '2026-04-15',
  dateModified: '2026-04-15',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/credit-card-minimum-payment-trap-malaysia',
  mainEntityOfPage: 'https://beebas.my/blog/credit-card-minimum-payment-trap-malaysia',
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Blog</Link>
          <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Contact</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-[#1C1C1C] transition-colors">Blog</Link>
          <span>›</span>
          <span>Credit Cards</span>
        </div>

        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Credit Cards</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            The Minimum Payment Trap: Why Your Credit Card Debt Never Seems to Go Down
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>15 April 2026</span>
            <span>·</span>
            <span>5 min read</span>
            <span>·</span>
            <span>By Beebas</span>
          </div>
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Paying the minimum every month feels responsible. The statement says "Minimum Payment Due: RM 150" and you pay RM 150. On time. Every month. And yet the balance barely moves.
          </p>
          <p>
            This is not a coincidence. It is by design. Here's what's really happening — and what you should do instead.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        <div className="space-y-12 text-[#1C1C1C]">

          <section>
            <h2 className="text-2xl font-extrabold mb-4">How Malaysian banks calculate your minimum payment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bank Negara Malaysia requires credit card issuers to set a minimum payment of at least <strong className="text-[#1C1C1C]">5% of the outstanding balance or RM 50, whichever is higher</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              On a RM 10,000 balance, your minimum is RM 500. Sounds like a decent chunk — until you realise how much of that goes to interest.
            </p>
            <Callout icon="🔢" title="The brutal breakdown on RM 10,000 at 18% p.a.">
              <p className="mb-2">Monthly interest charge: RM 10,000 × (18% ÷ 12) = <strong>RM 150</strong></p>
              <p className="mb-2">Minimum payment: <strong>RM 500</strong></p>
              <p className="mb-2">Amount going to principal: RM 500 − RM 150 = <strong>RM 350</strong></p>
              <p>New balance after payment: RM 10,000 − RM 350 = <strong>RM 9,650</strong></p>
              <p className="mt-3 text-[#8B6000]">You paid RM 500 and your balance only dropped by RM 350. RM 150 — 30% of your payment — went straight to the bank as profit.</p>
            </Callout>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">The compounding trap — how long minimum payments actually take</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here's the part banks don't put in big bold letters on your statement. If you make only the minimum payment every month on a RM 10,000 balance at 18% p.a.:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Payment amount</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Time to clear</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Total interest paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-50">
                    <td className="px-4 py-3 text-muted-foreground">Minimum only (5%)</td>
                    <td className="px-4 py-3 text-center font-bold text-red-600">~14 years</td>
                    <td className="px-4 py-3 text-center font-bold text-red-600">RM 8,200+</td>
                  </tr>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <td className="px-4 py-3 text-muted-foreground">RM 300/month fixed</td>
                    <td className="px-4 py-3 text-center font-semibold text-amber-600">4.5 years</td>
                    <td className="px-4 py-3 text-center font-semibold text-amber-600">RM 5,900</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-50">
                    <td className="px-4 py-3 text-muted-foreground">RM 500/month fixed</td>
                    <td className="px-4 py-3 text-center font-semibold text-emerald-600">2.3 years</td>
                    <td className="px-4 py-3 text-center font-semibold text-emerald-600">RM 2,800</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 text-muted-foreground">RM 1,000/month fixed</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-700">1.1 years</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-700">RM 1,100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Paying minimums on a RM 10,000 balance costs you <strong className="text-[#1C1C1C]">RM 8,200 in interest alone</strong> — meaning you pay RM 18,200 in total for a RM 10,000 debt. That's 82% extra.
            </p>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Why the minimum keeps shrinking (making it worse)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because the minimum is calculated as 5% of your <em>current</em> outstanding balance, it decreases as you pay down the debt. This feels like progress but it actually slows your payoff dramatically.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When your balance drops to RM 5,000, your minimum drops to RM 250. When it drops to RM 2,000, your minimum drops to RM 100. Meanwhile, interest at 18% is still compounding. The gap between "minimum due" and "interest charged" shrinks — but it takes years.
            </p>
            <Callout icon="💡" title="The fix">
              Never let your payment shrink with your balance. Pick a fixed amount you can sustain — say RM 500 — and pay that every month regardless of what the minimum says. As the balance drops, more and more of your RM 500 goes to principal and your payoff accelerates exponentially.
            </Callout>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Why banks design it this way</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A credit card customer who pays minimums for 14 years on a RM 10,000 balance generates far more revenue than one who clears it in 12 months. Banks set the minimum low enough that you can afford it — ensuring you stay in debt as long as possible without defaulting.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bank Negara has actually increased the minimum required from 2% (the old rule) to 5% in recent years specifically to protect consumers. The old 2% minimum could leave borrowers paying for <em>decades</em>. The 5% rule is better — but still far too slow if you're paying only the minimum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">What to do instead — the 3-step escape</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-extrabold text-[#1C1C1C] shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Know your actual interest charge</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Take your outstanding balance and multiply by (interest rate ÷ 12). That's what you're paying in interest this month. Anything above that reduces principal. Anything below that means your balance grows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-extrabold text-[#1C1C1C] shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Set a fixed monthly payment — not percentage-based</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Decide on a number you can afford and commit to it. RM 300, RM 500, RM 800 — whatever is sustainable. Set up an auto-payment so it happens without thinking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-extrabold text-[#1C1C1C] shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Stop using the card while paying it down</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every new purchase resets your progress. While you're in payoff mode, put the card in a drawer (or cancel it if you can't resist). You cannot drain a bathtub with the tap still running.
                  </p>
                </div>
              </div>
            </div>

            <Tip>
              Use Beebas to enter your credit card balance and see exactly when you'll be debt-free at different payment levels. Drag the extra payment slider and watch the payoff date move. Most people are shocked by how much a RM 100 increase changes the timeline.
            </Tip>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">One more thing: the cash advance trap</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you've ever used your credit card to withdraw cash from an ATM, you've been hit with cash advance charges — typically <strong className="text-[#1C1C1C]">18% p.a. interest with no grace period</strong>, plus an upfront fee of 5% on the withdrawn amount.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Unlike purchases (which have a 20-day grace period if you pay in full), cash advance interest starts the moment you withdraw. Never use a credit card for cash withdrawals unless it is a genuine emergency.
            </p>
          </section>

        </div>

        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">See how fast you can really clear your credit card</h3>
          <p className="text-white/50 text-sm mb-5">
            Enter your balance and rate. Drag the slider. Watch your debt-free date move. It's free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#calculator">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                Try the free calculator →
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold h-11 px-8">
                Get your full payoff plan
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-[#1C1C1C] transition-colors">
            ← Back to all articles
          </Link>
        </div>
      </main>

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
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
