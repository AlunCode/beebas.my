import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Beebas — built by a Malaysian who was drowning in debt and needed a better way out.',
}

export default function AboutPage() {
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
          <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Contact</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-3">Our story</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1C1C1C] mb-6 leading-tight">
            Built by someone who was drowning in debt.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beebas started as a personal spreadsheet. It became a product when I realised thousands of Malaysians were fighting the same battle — alone, in the dark, with no clear picture of when it would end.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-gray max-w-none space-y-6 text-[#1C1C1C]">
          <div className="rounded-2xl bg-[#FFF8DC] border border-[#FFD000]/30 px-6 py-5">
            <p className="font-bold text-[#1C1C1C] mb-2">The honest version</p>
            <p className="text-sm text-[#8B6000] leading-relaxed">
              I had three credit cards, a car loan, and a personal loan. Every month I paid the minimums and watched the balances barely move. After two years of this I realised I'd paid more in interest than I'd reduced the principal — and I still had no idea when I'd actually be free.
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            I built a spreadsheet to model the snowball and avalanche strategies. Seeing the exact month my last debt would be paid off was life-changing. For the first time, the debt felt finite. Manageable. Beatable.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            I shared the spreadsheet with friends. Word spread. People wanted something simpler — something they could update on their phone in five minutes, not fiddle with formulas. So I built Beebas.
          </p>

          <h2 className="text-xl font-extrabold text-[#1C1C1C] pt-4">Why "Beebas"?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bees are relentless, organised, and purposeful — they work their plan and never stop. That's the mindset we want every user to have about their debt. The name stuck.
          </p>

          <h2 className="text-xl font-extrabold text-[#1C1C1C] pt-4">What we believe</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">→</span>
              <span>Debt is not a moral failure. It's a math problem — and math problems have solutions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">→</span>
              <span>Seeing your debt-free date makes the whole journey feel real and achievable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">→</span>
              <span>Every extra ringgit you throw at debt compounds in your favour — most people just don't know by how much.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">→</span>
              <span>Financial tools should be built for the country you live in — Malaysian loans, Malaysian rates, Malaysian Ringgit.</span>
            </li>
          </ul>

          <h2 className="text-xl font-extrabold text-[#1C1C1C] pt-4">The team</h2>
          <p className="text-muted-foreground leading-relaxed">
            Beebas is a solo-founded product, built and maintained in Malaysia. We're a small operation that moves fast, listens to users, and ships real features — not vaporware. Every piece of feedback goes directly to the person who writes the code.
          </p>

          <h2 className="text-xl font-extrabold text-[#1C1C1C] pt-4">Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Beebas is a financial planning tool — it is not a licensed financial advisor and does not constitute financial advice. The calculations are mathematical projections based on the data you enter. Please consult a licensed financial advisor for advice tailored to your personal situation.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Ready to see your debt-free date?</h3>
          <p className="text-white/50 text-sm mb-5">Free to start. Takes 3 minutes.</p>
          <Link href="/signup">
            <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
              Get your free payoff plan →
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] px-6 py-8 mt-16">
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
