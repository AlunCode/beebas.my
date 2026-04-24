import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How to Negotiate With Your Bank in Malaysia (Scripts Included)',
  description: 'Most Malaysians never think to call their bank and ask for better terms. Many who do get them. Here is exactly what to say — with scripts you can use today.',
  openGraph: {
    type: 'article',
    title: 'How to Negotiate With Your Bank in Malaysia (Scripts Included)',
    description: 'Most Malaysians never ask their bank for better terms. Many who do, get them.',
  },
}

function Script({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-6 py-5 my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
      <p className="text-sm text-[#1C1C1C] leading-relaxed italic">{children}</p>
    </div>
  )
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
          <span>Banking</span>
        </div>

        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Banking</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            How to Negotiate With Your Bank in Malaysia (Scripts Included)
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>10 April 2026</span>
            <span>·</span>
            <span>6 min read</span>
            <span>·</span>
            <span>By Beebas</span>
          </div>
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Malaysians rarely negotiate with their banks. We treat whatever rate is printed on our statement as fixed — a fact of life, like the weather.
          </p>
          <p>
            It isn't. Banks negotiate. Rates get reduced. Fees get waived. Repayment plans get restructured. The only thing standing between you and better terms is a phone call most people are too hesitant to make.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        <div className="space-y-12 text-[#1C1C1C]">

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Why banks negotiate at all</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A bank's worst outcome isn't a customer who asks for a lower rate. It's a customer who defaults, closes their account, or transfers their debt to a competitor. Banks have significant financial incentive to keep you as a paying customer — even if that means slightly less profit.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you call and ask for a rate reduction, the customer service officer weighs two options: lose your business or retain it at a reduced margin. If you're a good customer with a clean payment history, keeping you is usually worth it.
            </p>
            <Callout icon="📊" title="The bank's calculation">
              A customer paying 15% p.a. for 3 more years generates more revenue than a customer who transfers their balance to a competitor at 0% for 12 months and never comes back. Banks know this math.
            </Callout>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Negotiation 1: Interest rate reduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The most straightforward ask. Call your credit card's customer service line and request a lower interest rate. Best done when:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You've been a customer for at least 1–2 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You have a clean payment history (no missed or late payments)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>You have a reasonable balance (shows you're a profitable customer)</span>
              </li>
            </ul>

            <Script title="Script — Rate reduction request">
              "Hi, I've been a customer for [X] years and have always paid on time. I'm currently working to pay off my balance faster and I've seen other banks offering lower rates to their customers. I'd like to ask if there's any way to reduce my interest rate temporarily — even for 6 months — to help me clear this balance. Is that something you can help me with?"
            </Script>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Expect one of three responses:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong className="text-[#1C1C1C]">Yes, approved immediately</strong> — happens more often than people expect, especially at branches versus call centres</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Refer to a supervisor</strong> — ask to speak to a senior officer or apply to the Relationship Management team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                <span><strong className="text-[#1C1C1C]">No</strong> — thank them, hang up, try again in 3 months or try a different channel (branch vs phone vs app)</span>
              </li>
            </ul>
            <Tip>
              Going to the branch in person often gets better results than calling. A human sitting across a desk from you is harder to say no to than a call centre rep with a script.
            </Tip>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Negotiation 2: Annual fee waiver</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Malaysian credit card annual fees range from RM 100 to RM 800 per year. Most banks will waive them if you ask — this is the easiest negotiation there is.
            </p>

            <Script title="Script — Annual fee waiver">
              "Hi, I just noticed my annual fee of RM [amount] has been charged. I've been a customer for [X] years and I spend about RM [rough monthly spend] on this card. I'd like to request a waiver for this year — can you help me with that?"
            </Script>

            <p className="text-muted-foreground leading-relaxed">
              Success rate is very high — banks know that losing a customer over an annual fee is terrible economics. If they say they can't waive it fully, ask for a partial waiver or a credit of equivalent value (reward points, cashback).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Negotiation 3: Late payment fee waiver</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Miss a payment for the first time in years? Call and ask for the late fee to be waived. Banks frequently accommodate this for customers with strong payment history — it costs them almost nothing and retains goodwill.
            </p>

            <Script title="Script — Late fee waiver">
              "Hi, I have a late payment fee of RM [amount] on my account this month. I've been with you for [X] years and this is the first time I've missed a payment — I was travelling and the payment slipped through. Is there any way you can waive this fee as a goodwill gesture? I'd really appreciate it."
            </Script>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Negotiation 4: Hardship restructuring</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you're facing genuine financial difficulty — job loss, medical emergency, salary cut — contact your bank's <strong className="text-[#1C1C1C]">Financial Assistance Programme</strong> or hardship team. Every major Malaysian bank has one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What they can offer:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Reduced monthly instalment for 6–12 months</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Temporarily frozen interest rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Convert outstanding credit card balance to a fixed-rate instalment plan (usually at a much lower rate)</span>
              </li>
            </ul>
            <Callout icon="⚡" title="The nuclear option: AKPK">
              If your debt situation is beyond what the bank's hardship programme can handle, AKPK (Agensi Kaunseling dan Pengurusan Kredit) can intervene directly on your behalf. AKPK is a government agency that negotiates with multiple banks simultaneously, consolidates your payments into one, and freezes interest accumulation. It's free. Your credit rating takes a temporary hit, but you get a structured path out. Website: akpk.org.my
            </Callout>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">Negotiation 5: Balance conversion to instalment plan</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many Malaysian banks offer the option to convert your revolving credit card balance into a fixed-term instalment plan — often at <strong className="text-[#1C1C1C]">0% interest for 6–24 months</strong>, or at a significantly reduced rate.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This is different from a balance transfer (which moves to a new card). This converts your existing balance into a loan repaid in equal monthly instalments on the same card.
            </p>

            <Script title="Script — Balance conversion">
              "I have an outstanding balance of RM [amount] on my card. I'd like to convert it into an instalment plan to pay it off faster at a lower rate. What instalment plan options do you currently have available?"
            </Script>

            <p className="text-muted-foreground leading-relaxed">
              Common pitfall: some plans charge an upfront processing fee (1–3%) or a "monthly flat rate" that sounds low but is actually equivalent to a high effective annual rate. Always ask for the <em>effective annual interest rate (EIR)</em>, not just the monthly rate, before agreeing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4">General rules for negotiating with Malaysian banks</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">1.</span>
                <span><strong className="text-[#1C1C1C]">Always be polite.</strong> You're asking for a favour. Customer service staff who like you will fight harder for approval.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">2.</span>
                <span><strong className="text-[#1C1C1C]">Know your leverage.</strong> Mention your loyalty, payment history, and spending volume. These are real factors in their decision.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">3.</span>
                <span><strong className="text-[#1C1C1C]">Ask for a supervisor if the first rep says no.</strong> Front-line agents have limited authority. Escalation often unlocks more options.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">4.</span>
                <span><strong className="text-[#1C1C1C]">Try different channels.</strong> Branch, phone, and app/online chat have different approval rates and discretion levels.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">5.</span>
                <span><strong className="text-[#1C1C1C]">If they say no, try again in 3 months.</strong> Bank policies change. A different representative may have different authority.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD000] font-bold mt-0.5 shrink-0">6.</span>
                <span><strong className="text-[#1C1C1C]">Get everything in writing.</strong> If a rate reduction or payment plan is agreed, ask for confirmation via SMS, email, or letter before acting on it.</span>
              </li>
            </ul>
          </section>

        </div>

        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Know exactly how much a lower rate saves you</h3>
          <p className="text-white/50 text-sm mb-5">
            Before you call your bank, use Beebas to calculate how much interest you'd save if they reduce your rate by even 1–2%. Then walk into the call with the numbers in hand.
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
