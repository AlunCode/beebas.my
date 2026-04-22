import { getAuthUser, isPro } from '@/lib/auth/get-user'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const user = await getAuthUser()
  const pro = isPro(user)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40 hidden sm:block">{user.email}</span>
          {pro ? (
            <span className="text-xs bg-[#FFD000] text-[#1C1C1C] font-bold px-2.5 py-1 rounded-full">
              Pro
            </span>
          ) : (
            <span className="text-xs bg-white/10 text-white/60 font-medium px-2.5 py-1 rounded-full">
              Free
            </span>
          )}
          <form action={logout}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="rounded-lg border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
            >
              Log out
            </Button>
          </form>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1C1C]">Your Debts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pro
              ? 'Pro plan — unlimited debts'
              : 'Free plan — up to 3 debts · '
            }
            {!pro && (
              <span className="text-[#1C1C1C] font-semibold underline underline-offset-2 cursor-pointer">
                Upgrade to Pro
              </span>
            )}
          </p>
        </div>

        {/* Empty state */}
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-4">
            🐝
          </div>
          <p className="font-bold text-[#1C1C1C] text-lg mb-1">No debts yet</p>
          <p className="text-sm text-muted-foreground">Add your first debt to start your payoff plan.</p>
          <Button className="mt-6 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-6">
            + Add debt
          </Button>
        </div>
      </main>
    </div>
  )
}
