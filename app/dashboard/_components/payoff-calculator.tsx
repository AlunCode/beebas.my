'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { PayoffChart } from './payoff-chart'
import { calculateBoth } from '@/lib/calculator/engine'
import type { Debt, Strategy } from '@/lib/calculator/types'
import type { Database } from '@/types/database'

type DebtRow = Database['public']['Tables']['debts']['Row']

function toCalcDebt(row: DebtRow): Debt {
  return {
    id: row.id,
    name: row.name,
    balance: Number(row.balance),
    interestRate: Number(row.interest_rate),
    minimumPayment: Number(row.minimum_payment),
  }
}

function fmt(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function fmtExact(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function monthsToDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toLocaleDateString('en-MY', { month: 'long', year: 'numeric' })
}

interface Props {
  debts: DebtRow[]
  isPro?: boolean
}

export function PayoffCalculator({ debts, isPro = false }: Props) {
  const [extraPayment, setExtraPayment] = useState(0)
  const [strategy, setStrategy] = useState<Strategy>('snowball')

  const baseline = useMemo(() => {
    if (debts.length === 0) return null
    return calculateBoth({ debts: debts.map(toCalcDebt), extraPayment: 0 })
  }, [debts])

  const results = useMemo(() => {
    if (debts.length === 0) return null
    return calculateBoth({
      debts: debts.map(toCalcDebt),
      extraPayment,
    })
  }, [debts, extraPayment])

  if (debts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-4">📊</div>
        <p className="font-bold text-[#1C1C1C] mb-1">No payoff plan yet</p>
        <p className="text-sm text-muted-foreground mb-5">Add your first debt and we'll calculate your exact debt-free date.</p>
        <a
          href="#"
          onClick={e => { e.preventDefault(); document.querySelector<HTMLButtonElement>('[data-debt-form-trigger]')?.click() }}
          className="inline-block rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-sm px-5 h-10 leading-10 transition-colors"
        >
          + Add your first debt
        </a>
      </div>
    )
  }

  const active = results![strategy]
  const other = results![strategy === 'snowball' ? 'avalanche' : 'snowball']
  const monthsDiff = other.debtFreeMonths - active.debtFreeMonths
  const interestDiff = other.totalInterestPaid - active.totalInterestPaid

  return (
    <div className="space-y-5">
      {/* Strategy toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payoff strategy</p>
          {isPro ? (
            <a
              href={`/dashboard/export?strategy=${strategy}&extra=${extraPayment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#1C1C1C] bg-[#FFD000] hover:bg-[#f0c400] px-3 py-1.5 rounded-lg transition-colors"
            >
              📄 Export PDF
            </a>
          ) : (
            <a
              href="/pricing"
              className="text-xs font-medium text-muted-foreground bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              📄 Export PDF · Pro
            </a>
          )}
        </div>
        <div className="flex gap-2">
          {(['snowball', 'avalanche'] as Strategy[]).map(s => (
            <button
              key={s}
              onClick={() => setStrategy(s)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                strategy === s
                  ? 'bg-[#1C1C1C] text-[#FFD000]'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {s === 'snowball' ? '❄️ Snowball' : '🌊 Avalanche'}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2.5">
          {strategy === 'snowball'
            ? 'Smallest balance first — quick wins to keep you motivated.'
            : 'Highest interest first — saves the most money overall.'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Debt-free date"
          value={monthsToDate(active.debtFreeMonths)}
          sub={`${active.debtFreeMonths} months`}
          accent
        />
        <StatCard
          label="Total interest"
          value={fmt(active.totalInterestPaid)}
          sub="total cost of debt"
        />
        <StatCard
          label="Interest saved"
          value={fmt(active.interestSavedVsMinimum)}
          sub="vs minimum payments"
          positive={active.interestSavedVsMinimum > 0}
        />
        <StatCard
          label="vs Avalanche"
          value={monthsDiff === 0 ? 'Same!' : `${Math.abs(monthsDiff)} mo ${monthsDiff > 0 ? 'faster' : 'slower'}`}
          sub={interestDiff === 0 ? '—' : `${interestDiff > 0 ? 'save' : 'cost'} ${fmt(Math.abs(interestDiff))} more`}
        />
      </div>

      {/* Extra payment slider */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Extra monthly payment</p>
          <span className="font-extrabold text-[#1C1C1C] text-lg">{fmt(extraPayment)}</span>
        </div>
        <Slider
          min={0}
          max={2000}
          step={50}
          value={[extraPayment]}
          onValueChange={(v) => setExtraPayment(Array.isArray(v) ? v[0] : v)}
          className="**:data-[slot=slider-thumb]:bg-[#FFD000] **:data-[slot=slider-thumb]:border-[#FFD000] **:data-[slot=track-range]:bg-[#FFD000]"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>RM 0</span>
          <span>RM 2,000</span>
        </div>
        {extraPayment > 0 && baseline && (() => {
          const monthsSaved = baseline[strategy].debtFreeMonths - active.debtFreeMonths
          const interestSaved = baseline[strategy].totalInterestPaid - active.totalInterestPaid
          return (
            <p className="text-xs text-emerald-600 font-medium mt-2">
              ✓ {monthsSaved > 0 ? `Debt-free ${monthsSaved} month${monthsSaved > 1 ? 's' : ''} sooner` : 'On track'}{interestSaved > 0 ? ` · saves ${fmtExact(interestSaved)} in interest` : ''}.
            </p>
          )
        })()}
      </div>

      {/* Payoff order */}
      {active.payoffOrder.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Payoff order</p>
          <div className="space-y-2">
            {active.payoffOrder.map((event, i) => (
              <div key={event.debtId} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD000] text-[#1C1C1C] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="font-semibold text-sm text-[#1C1C1C]">{event.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Balance over time</p>
        <PayoffChart result={active} />
      </div>
    </div>
  )
}

function StatCard({
  label, value, sub, accent = false, positive = false,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
  positive?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'bg-[#1C1C1C] border-[#1C1C1C]' : 'bg-white border-gray-100 shadow-sm'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${accent ? 'text-[#FFD000]/70' : 'text-muted-foreground'}`}>
        {label}
      </p>
      <p className={`font-extrabold text-base leading-tight ${accent ? 'text-[#FFD000]' : positive ? 'text-emerald-600' : 'text-[#1C1C1C]'}`}>
        {value}
      </p>
      <p className={`text-xs mt-0.5 ${accent ? 'text-white/40' : 'text-muted-foreground'}`}>{sub}</p>
    </div>
  )
}
