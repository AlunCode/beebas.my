import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Beebas — please read before using our service.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-extrabold text-[#1C1C1C]">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  )
}

export default function TermsPage() {
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
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1C1C1C] mb-3">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: 25 April 2026</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            These Terms of Service ("Terms") govern your use of Beebas ("the Service"), operated by an individual developer based in Malaysia. By creating an account or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
          </p>
        </div>

        <div className="space-y-10">

          <Section title="1. Description of service">
            <p>
              Beebas is a personal finance planning web application that helps users track debts, calculate payoff timelines using snowball and avalanche strategies, and plan debt repayment. The Service is available at <strong className="text-[#1C1C1C]">beebas.my</strong>.
            </p>
            <p>
              Beebas is a financial planning tool only. It is <strong className="text-[#1C1C1C]">not a licensed financial advisor, credit counsellor, or financial institution</strong>. Nothing on the Service constitutes financial advice. Always consult a licensed financial advisor before making significant financial decisions.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>You must be at least 18 years old and a resident of Malaysia to use the Service. By using Beebas, you confirm that you meet these requirements.</p>
          </Section>

          <Section title="3. User accounts">
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate and complete information when creating your account.</p>
            <p>You may not share your account with others or create accounts for the purpose of abuse, spam, or circumventing plan limits.</p>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </Section>

          <Section title="4. Free and paid plans">
            <p>Beebas offers a free tier and paid Pro plans (monthly and annual). The free tier is subject to limits including a maximum of 3 debts. Pro features are available only to subscribers with an active paid subscription.</p>
            <p>
              <strong className="text-[#1C1C1C]">Payments</strong> — All payments are processed by Stripe. By subscribing, you authorise Stripe to charge your payment method on a recurring basis according to your selected plan. Prices are in Malaysian Ringgit (MYR) and include applicable taxes.
            </p>
            <p>
              <strong className="text-[#1C1C1C]">Cancellation</strong> — You may cancel your subscription at any time via the billing portal. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused time in a billing period.
            </p>
            <p>
              <strong className="text-[#1C1C1C]">Refunds</strong> — We offer a 7-day refund on your first payment if you are not satisfied. Contact us at <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a> within 7 days of your first charge to request a refund.
            </p>
            <p>
              <strong className="text-[#1C1C1C]">Price changes</strong> — We reserve the right to change pricing with 30 days' notice to existing subscribers by email.
            </p>
          </Section>

          <Section title="5. Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the Service for any unlawful purpose or in violation of Malaysian law</li>
              <li>Attempt to gain unauthorised access to the Service or other users' accounts</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service</li>
              <li>Use automated tools (bots, scrapers) to access the Service</li>
              <li>Upload or transmit malware, viruses, or any malicious code</li>
              <li>Use the Service to harass, abuse, or harm others</li>
            </ul>
          </Section>

          <Section title="6. Your data">
            <p>
              You retain ownership of all financial data you enter into Beebas. We do not sell your data to third parties. Our use of your data is governed by our{' '}
              <Link href="/privacy" className="text-[#1C1C1C] underline hover:text-[#FFD000]">Privacy Policy</Link>.
            </p>
            <p>
              You can export or delete your data at any time by contacting us at <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a>.
            </p>
          </Section>

          <Section title="7. Intellectual property">
            <p>
              All content, design, code, and features of the Service are the intellectual property of Beebas. You may not reproduce, distribute, or create derivative works from any part of the Service without express written permission.
            </p>
            <p>
              The Beebas name, logo, and brand are trademarks of the Service operator. Unauthorised use is prohibited.
            </p>
          </Section>

          <Section title="8. Third-party services">
            <p>The Service integrates with third-party providers including Supabase (database), Stripe (payments), Google AdSense (advertising), and Google Analytics. Your use of these services is also subject to their respective terms of service.</p>
          </Section>

          <Section title="9. Disclaimer of warranties">
            <p>
              The Service is provided <strong className="text-[#1C1C1C]">"as is"</strong> without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. Financial calculations are mathematical projections — actual results may vary based on factors outside the Service's control.
            </p>
          </Section>

          <Section title="10. Limitation of liability">
            <p>
              To the fullest extent permitted by Malaysian law, Beebas shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits or financial losses, arising from your use of or inability to use the Service.
            </p>
            <p>
              Our total liability to you for any claims arising from use of the Service shall not exceed the amount you paid us in the 3 months preceding the claim.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>We may suspend or terminate your access to the Service at any time, with or without notice, if you violate these Terms or for any other reason at our discretion.</p>
            <p>You may terminate your account at any time by contacting us. Upon termination, your data will be deleted in accordance with our Privacy Policy.</p>
          </Section>

          <Section title="12. Governing law">
            <p>
              These Terms are governed by the laws of Malaysia. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.
            </p>
          </Section>

          <Section title="13. Changes to these terms">
            <p>We may update these Terms from time to time. We will notify registered users by email of material changes at least 14 days before they take effect. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="14. Contact">
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:hello@beebas.my" className="text-[#1C1C1C] underline hover:text-[#FFD000]">hello@beebas.my</a>.
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
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
