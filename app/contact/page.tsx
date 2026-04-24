import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Beebas team. We read every message.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1C1C1C] mb-3">We read every message</h1>
          <p className="text-muted-foreground text-lg">
            Bug report, feature idea, feedback — or just want to say hi. Send it over.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="mailto:hello@beebas.my"
            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF8DC] flex items-center justify-center text-xl shrink-0">📧</div>
            <div>
              <p className="font-bold text-[#1C1C1C] text-sm mb-0.5">Email us</p>
              <p className="text-xs text-muted-foreground">hello@beebas.my</p>
              <p className="text-xs text-muted-foreground mt-1">Typical reply within 24 hours</p>
            </div>
          </a>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8DC] flex items-center justify-center text-xl shrink-0">🐛</div>
            <div>
              <p className="font-bold text-[#1C1C1C] text-sm mb-0.5">Reporting a bug?</p>
              <p className="text-xs text-muted-foreground">Include your browser, device, and what you were doing when it happened.</p>
            </div>
          </div>
        </div>

        {/* Contact form — posts via mailto */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="font-extrabold text-[#1C1C1C] text-lg mb-6">Send a message</h2>
          <form
            action="mailto:hello@beebas.my"
            method="POST"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Your name
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Ahmad"
                  required
                  className="h-11 rounded-xl text-base"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email address
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-11 rounded-xl text-base"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Subject
              </Label>
              <Input
                name="subject"
                type="text"
                placeholder="Feature request / Bug / General question"
                required
                className="h-11 rounded-xl text-base"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Message
              </Label>
              <textarea
                name="body"
                rows={5}
                placeholder="Tell us what's on your mind..."
                required
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none"
            >
              Send message →
            </Button>
          </form>
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
