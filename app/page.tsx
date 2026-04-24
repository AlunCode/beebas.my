import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InterestCalculator } from './_components/interest-calculator'
import { PublicAdBanner } from './_components/public-ad-banner'

const STATS = [
  { value: 'RM 847', label: 'avg monthly interest saved' },
  { value: '14 mo', label: 'faster debt-free on average' },
  { value: '3 min', label: 'to see your payoff plan' },
  { value: '100%', label: 'free to start' },
]

const FEATURES = [
  {
    icon: '🧮',
    title: 'Snowball & Avalanche',
    desc: 'Compare both strategies side-by-side. Pick the one that saves you more money or keeps you more motivated.',
  },
  {
    icon: '📅',
    title: 'Your Debt-Free Date',
    desc: 'See the exact month and year you\'ll be debt-free. Countdown makes it real.',
  },
  {
    icon: '💸',
    title: 'Extra Payment Simulator',
    desc: 'Drag a slider to see how much RM 100, RM 300, or RM 500 extra per month accelerates your freedom.',
  },
  {
    icon: '📊',
    title: 'Visual Payoff Chart',
    desc: 'Watch your debt balances shrink month by month in a beautiful stacked area chart.',
  },
  {
    icon: '🎯',
    title: 'Milestone Badges',
    desc: 'Celebrate paying off your first debt, hitting 50% paid, and crossing the finish line. (Pro)',
  },
  {
    icon: '📄',
    title: 'PDF Payoff Plan',
    desc: 'Export a printable plan to stick on your fridge or share with your partner. (Pro)',
  },
]

const COMPARISON = [
  { feature: 'Snowball & Avalanche calculator', beebas: true, spreadsheet: false, others: false },
  { feature: 'Visual payoff chart', beebas: true, spreadsheet: false, others: true },
  { feature: 'Extra payment simulator', beebas: true, spreadsheet: false, others: false },
  { feature: 'Malaysian Ringgit (RM)', beebas: true, spreadsheet: true, others: false },
  { feature: 'Couple / family mode', beebas: true, spreadsheet: false, others: false },
  { feature: 'Mobile-friendly', beebas: true, spreadsheet: false, others: true },
  { feature: 'Free tier available', beebas: true, spreadsheet: true, others: false },
]

const TESTIMONIALS = [
  {
    quote: 'Finally understood why my minimum payments were going nowhere. Beebas showed me I was paying RM 4,200 in interest on a RM 8,000 card debt.',
    name: 'Azri M.',
    location: 'Kuala Lumpur',
    savings: 'Saving RM 1,100/yr',
  },
  {
    quote: 'Used to track 4 debts in Excel. Now I just open Beebas, move the slider, and instantly see my debt-free date move closer.',
    name: 'Priya S.',
    location: 'Petaling Jaya',
    savings: 'Paid off 1 card already',
  },
  {
    quote: 'Me and my wife use couple mode to track our car loan and PTPTN together. Game changer.',
    name: 'Hafizuddin R.',
    location: 'Shah Alam',
    savings: 'RM 2,400 saved',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Beebas',
  description: "Malaysia's #1 debt snowball and avalanche tracker. See exactly when you'll be debt-free.",
  url: 'https://beebas.my',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'MYR',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Debt snowball calculator',
    'Debt avalanche calculator',
    'Payoff chart visualization',
    'Extra payment simulator',
    'Debt-free date countdown',
    'PDF export',
    'Couple mode',
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Blog</Link>
          <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Contact</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1C1C1C] px-6 py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#FFD000]/10 border border-[#FFD000]/30 text-[#FFD000] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            🐝 Malaysia's #1 Debt Tracker
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Stop guessing.<br />
            <span className="text-[#FFD000]">See your debt-free date.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Beebas calculates the fastest way to pay off all your debts — credit cards, car loans, PTPTN — and shows you exactly when you'll be free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="h-13 px-8 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none w-full sm:w-auto">
                Get your free payoff plan →
              </Button>
            </Link>
            <a href="#calculator">
              <Button variant="outline" className="h-13 px-8 rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold text-base w-full sm:w-auto">
                Try the free calculator
              </Button>
            </a>
          </div>
          <p className="text-white/30 text-xs mt-4">No credit card required · Free forever tier available</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#FFD000] px-6 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-[#1C1C1C] tracking-tight">{s.value}</p>
              <p className="text-sm text-[#1C1C1C]/60 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free calculator */}
      <section id="calculator" className="bg-gray-50 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-2">No sign-up needed</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-3">
              How much is your debt really costing you?
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Enter one debt below and see the true cost — then drag the slider to find your savings.
            </p>
          </div>
          <InterestCalculator />
        </div>
      </section>

      {/* Ad — between stats and features */}
      <section className="bg-white px-6 pt-8 pb-0">
        <div className="max-w-5xl mx-auto">
          <PublicAdBanner />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-3">
              Everything you need to get debt-free
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Built specifically for Malaysians — RM, ringgit, and all the debts Malaysians actually have.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#FFF8DC] flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-[#1C1C1C] mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-3">
              Up and running in 3 minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Add your debts', desc: 'Enter each debt: credit cards, car loan, PTPTN, personal loans. Balance, interest rate, minimum payment.' },
              { step: '2', title: 'Pick your strategy', desc: 'Snowball (smallest balance first) or Avalanche (highest interest first). Beebas shows you the math on both.' },
              { step: '3', title: 'See your date', desc: 'Your exact debt-free date appears instantly. Move the extra payment slider to watch it get closer.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#FFD000] flex items-center justify-center text-2xl font-extrabold text-[#1C1C1C] mx-auto mb-4">{s.step}</div>
                <h3 className="font-bold text-[#1C1C1C] text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1C1C1C] px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Malaysians are taking control
            </h2>
            <p className="text-white/50 text-lg">Real stories from real users.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-white/80 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location}</p>
                  </div>
                  <span className="text-xs bg-[#FFD000]/10 text-[#FFD000] font-bold px-2.5 py-1 rounded-full">{t.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-3">
              Why Beebas beats a spreadsheet
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground">Feature</th>
                  <th className="px-5 py-3.5 font-bold text-[#1C1C1C] text-center">
                    <span className="inline-flex items-center gap-1.5">🐝 Beebas</span>
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-muted-foreground text-center">Spreadsheet</th>
                  <th className="px-5 py-3.5 font-semibold text-muted-foreground text-center">Others</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-5 py-3.5 text-[#1C1C1C]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {row.beebas ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-gray-300">–</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {row.spreadsheet ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-gray-300">–</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {row.others ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-gray-300">–</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ad — between comparison table and pricing teaser */}
      <section className="bg-white px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <PublicAdBanner />
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-4">
            Start free. Upgrade when you're ready.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            The free tier gives you 3 debts, the snowball & avalanche calculator, and your debt-free date — no credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-sm text-[#1C1C1C]">
              <span className="text-emerald-500 font-bold">✓</span> Up to 3 debts free
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1C1C1C]">
              <span className="text-emerald-500 font-bold">✓</span> Full calculator
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1C1C1C]">
              <span className="text-emerald-500 font-bold">✓</span> No credit card
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="h-12 px-10 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none">
                Get started free →
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-10 rounded-xl font-bold text-base">
                See all plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FFD000] px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🐝</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-4">
            Your debt-free date is waiting.
          </h2>
          <p className="text-[#1C1C1C]/60 text-lg mb-8">
            Join Malaysians who switched from guessing to knowing exactly when they'll be free.
          </p>
          <Link href="/signup">
            <Button className="h-13 px-10 rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold text-base border-0 shadow-none">
              Start for free — takes 3 minutes
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FFD000] flex items-center justify-center text-sm">🐝</div>
              <span className="text-[#FFD000] font-bold tracking-tight">Beebas</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
              <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
              <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
              <Link href="/login" className="hover:text-white/70 transition-colors">Log in</Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Beebas. A financial planning tool — not financial advice.
              Consult a licensed advisor for professional guidance. Prices in MYR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
