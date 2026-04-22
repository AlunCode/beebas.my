import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { signup } from '@/lib/auth/actions'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-105 bg-[#1C1C1C] p-12 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFD000] flex items-center justify-center text-xl">🐝</div>
          <span className="text-[#FFD000] font-bold text-xl tracking-tight">Beebas</span>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Join the hive.<br />
            <span className="text-[#FFD000]">Start for free.</span>
          </p>
          <div className="space-y-3 mt-6">
            {[
              { icon: '📊', text: 'Snowball & avalanche calculator' },
              { icon: '📅', text: 'See your exact debt-free date' },
              { icon: '🇲🇾', text: 'Built for Malaysia — PTPTN, AEON & more' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="text-white/60 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/20 text-xs">© 2026 Beebas</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
            <span className="font-bold text-lg tracking-tight">Beebas</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1C1C] mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-8">Free forever. No credit card needed.</p>

          {params.error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-5">
              {params.error}
            </div>
          )}

          <form action={signup} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold text-[#1C1C1C]">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-11 rounded-xl border-gray-200 focus:border-[#FFD000] focus:ring-[#FFD000]/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-semibold text-[#1C1C1C]">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                minLength={8}
                required
                autoComplete="new-password"
                className="h-11 rounded-xl border-gray-200 focus:border-[#FFD000] focus:ring-[#FFD000]/30"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base shadow-none border-0"
            >
              Create free account
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Free plan includes up to 3 debts.{' '}
            <Link href="/pricing" className="underline underline-offset-2">See all plans.</Link>
          </p>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#1C1C1C] underline underline-offset-2">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
