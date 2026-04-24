import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How to Pay Off PTPTN Faster — Strategies Every Malaysian Graduate Should Know',
  description: 'PTPTN feels like it will follow you forever. It does not have to. Here are the most effective strategies Malaysian graduates can use to clear PTPTN faster and avoid the blacklist.',
  openGraph: {
    type: 'article',
    title: 'How to Pay Off PTPTN Faster — Strategies Every Malaysian Graduate Should Know',
    description: 'The most effective strategies to clear your PTPTN loan faster and avoid the blacklist.',
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

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 my-4 text-sm text-red-800 leading-relaxed">
      <span className="font-bold">Warning: </span>{children}
    </div>
  )
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
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
          <span>PTPTN</span>
        </div>

        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">PTPTN</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            How to Pay Off PTPTN Faster — Strategies Every Malaysian Graduate Should Know
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>20 April 2026</span>
            <span>·</span>
            <span>7 min read</span>
            <span>·</span>
            <span>By Beebas</span>
          </div>
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Over 1.2 million Malaysians are currently blacklisted by PTPTN. Most of them didn't intend to default — they just didn't have a plan.
          </p>
          <p>
            Whether you're fresh out of university or still carrying PTPTN five years into your career, this guide covers everything you need to know to pay it off faster, stay off the blacklist, and move on with your financial life.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        <div className="space-y-12 text-[#1C1C1C]">

          <section>
            <h2 className="text-2xl font-extrabold mb-4">First: understand how PTPTN actually charges you</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN is <em>not</em> a conventional interest-bearing loan. It operates under an Islamic financing concept called <strong className="text-[#1C1C1C]">Kafalah</strong>, where you pay a service fee of <strong className="text-[#1C1C1C]">1% per annum</strong> on the outstanding balance.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For conventional loans: 1% p.a. sounds cheap — and it is, compared to credit cards at 18%. But many graduates take years to even start repaying, and the outstanding balance keeps accumulating that 1% the whole time.
            </p>
            <Callout icon="📊" title="Example">
              A RM 30,000 PTPTN loan at 1% p.a. accumulates RM 300 per year in service charges. Doesn't sound like much — but if you delay repayment for 5 years, that's RM 1,500 in charges before you've paid a single ringgit of principal.
            </Callout>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">The blacklist: what it actually means</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Miss your PTPTN payments and you can be listed in the <strong className="text-[#1C1C1C]">National Higher Education Fund Corporation (PTPTN) blacklist</strong>, which means:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                <span>You cannot renew your passport at Immigration (travel ban)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                <span>Government job applications may be rejected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                <span>Some employers conduct PTPTN checks during hiring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                <span>Your CCRIS/CTOS credit record may be affected</span>
              </li>
            </ul>
            <Warning>
              The blacklist is imposed once you miss 3 consecutive monthly payments. Getting removed requires settling arrears and requesting removal — it doesn't happen automatically.
            </Warning>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Strategy 1: The lump sum discount (easiest money you'll ever save)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN periodically offers discounts for lump sum settlements — historically ranging from <strong className="text-[#1C1C1C]">10% to 20% off</strong> the total outstanding balance. These campaigns usually run for a few months and are announced on the PTPTN website and social media.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have savings or can borrow from family at 0% interest, a lump sum settlement during a discount campaign can be one of the best financial decisions you make. A 10% discount on a RM 25,000 balance is RM 2,500 saved instantly.
            </p>
            <Tip>
              Follow PTPTN's official social media and sign up for their email notifications. These campaigns are announced with limited windows — sometimes only 3 months. You want to know the moment it's live.
            </Tip>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Strategy 2: Auto-deduction from salary (and why it helps)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN's <strong className="text-[#1C1C1C]">Skim Potongan Gaji (SPG)</strong> automatically deducts your monthly repayment from your salary before it hits your account. You can enroll through your employer's HR department.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Why this is better than manual payment:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You never miss a payment — no late fees, no blacklist risk</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You qualify for a <strong className="text-[#1C1C1C]">1% discount on the service fee</strong> when paying via SPG consistently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You mentally adjust to your reduced take-home pay — the money is gone before you spend it</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Strategy 3: Pay above your minimum monthly instalment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN's minimum monthly repayment is calculated to clear your loan over the full tenure (typically 10–15 years for most graduates). If you pay <em>more</em> than the minimum, the excess goes directly to reducing principal — shortening your loan tenure significantly.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At 1% p.a., the math is gentle — but the discipline matters. If your minimum is RM 150/month and you pay RM 250, you're cutting 4–5 years off a standard tenure.
            </p>
            <Tip>
              Add your PTPTN to Beebas alongside your other debts. Since the rate is low (1%), the snowball or avalanche calculator will likely tell you to pay minimums on PTPTN while attacking your high-interest credit cards first — which is correct.
            </Tip>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Strategy 4: Apply for a repayment holiday if you genuinely can't pay</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN offers a <strong className="text-[#1C1C1C]">repayment moratorium</strong> for borrowers facing genuine financial hardship — job loss, medical emergency, salary reduction. You can apply at any PTPTN branch or via their online portal.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              During a moratorium, payments are paused and you won't be blacklisted. Service charges still accumulate on the outstanding balance, but it protects your passport and credit record while you get back on your feet.
            </p>
            <Warning>
              A moratorium is not the same as forgiveness. The balance doesn't disappear — it just pauses. Use this as a bridge, not a solution.
            </Warning>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Strategy 5: Restructure if you're already defaulting</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you're already on the blacklist or in arrears, contact PTPTN directly to request a <strong className="text-[#1C1C1C]">repayment restructuring</strong>. They will typically:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Recalculate your monthly instalment based on your current income</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Extend your loan tenure to reduce monthly obligations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Remove you from the blacklist once arrears are settled and a new repayment plan is in place</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              PTPTN staff are generally cooperative — they prefer repayment over default. Don't avoid the conversation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">The smart priority order</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because PTPTN's service fee (1%) is so much lower than consumer debt (credit cards at 18%, personal loans at 8–12%), the mathematically correct approach is:
            </p>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs font-bold text-[#1C1C1C] shrink-0 mt-0.5">1</span>
                <span>Pay PTPTN minimums consistently via auto-deduction (avoid blacklist, earn the 1% discount)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs font-bold text-[#1C1C1C] shrink-0 mt-0.5">2</span>
                <span>Attack all high-interest debt first (credit cards, personal loans)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs font-bold text-[#1C1C1C] shrink-0 mt-0.5">3</span>
                <span>Watch for lump sum discount campaigns — clear PTPTN entirely when a 10%+ discount is offered</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs font-bold text-[#1C1C1C] shrink-0 mt-0.5">4</span>
                <span>If no campaign, redirect freed-up cash from cleared debts to accelerate PTPTN payoff</span>
              </li>
            </ol>
          </section>

        </div>

        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Add PTPTN to your payoff plan</h3>
          <p className="text-white/50 text-sm mb-5">
            Track PTPTN alongside your other debts. Beebas shows you exactly when each one clears and how much interest you'll save.
          </p>
          <Link href="/signup">
            <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
              Get your free payoff plan →
            </Button>
          </Link>
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
            <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
