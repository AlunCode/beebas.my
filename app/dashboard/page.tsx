import { getAuthUser, isPro } from '@/lib/auth/get-user'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'
import { DebtForm } from './_components/debt-form'
import { DebtList } from './_components/debt-list'
import { PayoffCalculator } from './_components/payoff-calculator'

export default async function DashboardPage() {
  const user = await getAuthUser()
  const pro = isPro(user)

  const supabase = await createClient()
  const { data: debts } = await supabase
    .from('debts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  const debtList = debts ?? []

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
            <span className="text-xs bg-[#FFD000] text-[#1C1C1C] font-bold px-2.5 py-1 rounded-full">Pro</span>
          ) : (
            <span className="text-xs bg-white/10 text-white/60 font-medium px-2.5 py-1 rounded-full">Free</span>
          )}
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm"
              className="rounded-lg border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs">
              Log out
            </Button>
          </form>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1C1C]">Your Debts</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {debtList.length === 0
                ? 'Add your first debt to get started.'
                : `${debtList.length} debt${debtList.length > 1 ? 's' : ''} · ${
                    !pro ? `${debtList.length}/3 free plan` : 'Pro plan'
                  }`}
            </p>
          </div>
          <DebtForm debtCount={debtList.length} isPro={pro} />
        </div>

        {/* Debt list */}
        {debtList.length > 0 && (
          <DebtList debts={debtList} isPro={pro} />
        )}

        {/* Empty state */}
        {debtList.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-4">🐝</div>
            <p className="font-bold text-[#1C1C1C] text-lg mb-1">No debts yet</p>
            <p className="text-sm text-muted-foreground">Hit "Add debt" above and we'll calculate your path to freedom.</p>
          </div>
        )}

        {/* Payoff calculator — always rendered, shows placeholder when no debts */}
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-[#1C1C1C] mb-4">Payoff Plan</h2>
          <PayoffCalculator debts={debtList} />
        </div>
      </main>
    </div>
  )
}
