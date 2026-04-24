import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Beebas collects, uses, and protects your personal data — in plain English.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-extrabold text-[#1C1C1C]">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1C1C1C] mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: 24 April 2026</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            This policy explains what personal data Beebas collects, why we collect it, how we use it, and your rights under Malaysia's <strong>Personal Data Protection Act 2010 (PDPA)</strong>. We have written it in plain English — not legalese.
          </p>
        </div>

        <div className="space-y-10">

          <Section title="1. Who we are">
            <p>
              Beebas is a financial planning web application operated by an individual developer based in Malaysia. Our website is <strong>beebas.my</strong>. For questions about this policy, email us at <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a>.
            </p>
          </Section>

          <Section title="2. Data we collect">
            <p><strong className="text-[#1C1C1C]">Account data</strong> — When you sign up, we collect your email address and a hashed password (we never store your password in plain text). This is managed by Supabase Auth.</p>
            <p><strong className="text-[#1C1C1C]">Debt data</strong> — The debts you enter (name, balance, interest rate, minimum payment, type). This data is stored in our database and is only accessible by you.</p>
            <p><strong className="text-[#1C1C1C]">Payment data</strong> — When you upgrade to Pro, your card details are entered directly on Stripe's secure payment page. Beebas never sees or stores your full card number, CVC, or expiry date. We store only your Stripe customer ID and subscription status.</p>
            <p><strong className="text-[#1C1C1C]">Usage data</strong> — Standard server logs (IP address, browser type, pages visited, timestamps) collected automatically when you use the service. We use this to monitor performance and fix bugs.</p>
          </Section>

          <Section title="3. How we use your data">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To provide and operate the Beebas service</li>
              <li>To process payments and manage your subscription via Stripe</li>
              <li>To send transactional emails (account confirmation, payment receipts, password reset)</li>
              <li>To send the monthly progress email digest (Pro plan — you can unsubscribe at any time)</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To improve the product based on aggregate usage patterns</li>
            </ul>
            <p>We do not sell your personal data to any third party. Ever.</p>
          </Section>

          <Section title="4. Cookies">
            <p>Beebas uses the following cookies:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[#1C1C1C]">Authentication cookies</strong> — Set by Supabase to keep you logged in. Essential for the service to function. These expire when you log out or after 7 days of inactivity.</li>
              <li><strong className="text-[#1C1C1C]">Google AdSense cookies</strong> (free plan only) — Used by Google to show relevant advertisements. These may include personalised ads based on your browsing history. You can opt out of personalised ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">adssettings.google.com</a>.</li>
              <li><strong className="text-[#1C1C1C]">Analytics cookies</strong> — Used by Google Analytics to help us understand how users interact with Beebas (page views, session length, features used). This data is aggregated and anonymised.</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling essential cookies will prevent you from logging in.</p>
          </Section>

          <Section title="5. Third-party services">
            <p>Beebas uses the following third-party services. Each has its own privacy policy:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#1C1C1C]">Supabase</strong> — Database and authentication hosting. Your account and debt data is stored on Supabase servers.{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">supabase.com/privacy</a>
              </li>
              <li>
                <strong className="text-[#1C1C1C]">Stripe</strong> — Payment processing. All payment data is handled directly by Stripe.{' '}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">stripe.com/privacy</a>
              </li>
              <li>
                <strong className="text-[#1C1C1C]">Google AdSense</strong> — Advertising shown to free-plan users. Google may use cookies to show personalised ads.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">policies.google.com/privacy</a>
              </li>
              <li>
                <strong className="text-[#1C1C1C]">Google Analytics</strong> — Website usage analytics (aggregated, anonymised).{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">policies.google.com/privacy</a>
              </li>
              <li>
                <strong className="text-[#1C1C1C]">Vercel</strong> — Website hosting and CDN.{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] underline hover:text-[#FFD000]">vercel.com/legal/privacy-policy</a>
              </li>
            </ul>
          </Section>

          <Section title="6. Data retention">
            <p>We keep your data for as long as your account is active. If you delete your account, we delete your personal data and all debt entries within 30 days. Anonymised usage analytics may be retained indefinitely. Payment records are retained for 7 years as required by Malaysian financial regulations.</p>
          </Section>

          <Section title="7. Your rights under Malaysia's PDPA">
            <p>Under the Personal Data Protection Act 2010, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[#1C1C1C]">Access</strong> — Request a copy of the personal data we hold about you</li>
              <li><strong className="text-[#1C1C1C]">Correction</strong> — Request correction of inaccurate data</li>
              <li><strong className="text-[#1C1C1C]">Withdraw consent</strong> — Withdraw consent for direct marketing communications at any time</li>
              <li><strong className="text-[#1C1C1C]">Deletion</strong> — Request deletion of your account and associated data</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a>. We will respond within 21 days.</p>
          </Section>

          <Section title="8. Children's privacy">
            <p>Beebas is not intended for users under 18 years of age. We do not knowingly collect personal data from children. If you believe a child has created an account, please contact us and we will delete it promptly.</p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>We may update this policy from time to time. We will notify registered users by email if we make material changes. The "Last updated" date at the top of this page reflects the most recent revision.</p>
          </Section>

          <Section title="10. Contact">
            <p>
              Questions about this policy? Contact us at:{' '}
              <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a>
            </p>
          </Section>

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
