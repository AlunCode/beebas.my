import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col">
      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🐝</div>
          <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-4">404 — Page not found</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            This page flew away.
          </h1>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            The page you're looking for doesn't exist — or it might have moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="h-12 px-8 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none w-full sm:w-auto">
                Go home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="h-12 px-8 rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold text-base w-full sm:w-auto">
                Go to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
