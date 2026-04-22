'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { calculate } from '@/lib/calculator/engine'

function fmt(n: number) {
  return `RM ${Math.round(n).toLocaleString('en-MY')}`
}

function months2str(m: number) {
  const y = Math.floor(m / 12)
  const mo = m % 12
  if (y === 0) return `${mo} month${mo !== 1 ? 's' : ''}`
  if (mo === 0) return `${y} year${y !== 1 ? 's' : ''}`
  return `${y}yr ${mo}mo`
}

export function InterestCalculator() {
  const [balance, setBalance] = useState('')
  const [rate, setRate] = useState('')
  const [minPayment, setMinPayment] = useState('')
  const [extra, setExtra] = useState(0)
  const [calculated, setCalculated] = useState(false)

  const debt = useMemo(() => {
    const b = parseFloat(balance)
    const r = parseFloat(rate)
    const m = parseFloat(minPayment)
    if (!b || !r || !m || b <= 0 || r <= 0 || m <= 0) return null
    if (m <= b * (r / 100 / 12)) return null // payment doesn't cover interest
    return { id: 'd1', name: 'My debt', balance: b, interestRate: r, minimumPayment: m }
  }, [balance, rate, minPayment])

  const baseResult = useMemo(() => {
    if (!debt) return null
    return calculate({ debts: [debt], extraPayment: 0, strategy: 'snowball' })
  }, [debt])

  const extraResult = useMemo(() => {
    if (!debt || extra === 0) return null
    return calculate({ debts: [debt], extraPayment: extra, strategy: 'snowball' })
  }, [debt, extra])

  const active = extraResult ?? baseResult

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-[#1C1C1C] px-6 py-5">
        <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-1">Free Calculator</p>
        <h3 className="text-white text-xl font-extrabold tracking-tight">
          How much is your debt really costing you?
        </h3>
      </div>

      <div className="p-6 space-y-5">
        {/* Inputs */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Current balance (RM)
            </Label>
            <Input
              type="number"
              min="1"
              placeholder="10,000"
              value={balance}
              onChange={e => { setBalance(e.target.value); setCalculated(false) }}
              className="h-11 rounded-xl text-base font-semibold"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Interest rate (% p.a.)
            </Label>
            <Input
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              placeholder="18"
              value={rate}
              onChange={e => { setRate(e.target.value); setCalculated(false) }}
              className="h-11 rounded-xl text-base font-semibold"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Min. monthly payment (RM)
            </Label>
            <Input
              type="number"
              min="1"
              placeholder="300"
              value={minPayment}
              onChange={e => { setMinPayment(e.target.value); setCalculated(false) }}
              className="h-11 rounded-xl text-base font-semibold"
            />
          </div>
        </div>

        {!calculated ? (
          <Button
            onClick={() => { if (debt) setCalculated(true) }}
            disabled={!debt}
            className="w-full h-12 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none"
          >
            Calculate my interest cost →
          </Button>
        ) : baseResult && active ? (
          <div className="space-y-5">
            {/* Results */}
            <div className="grid sm:grid-cols-2 gap-3">
              <ResultCard
                label="Total interest (minimums only)"
                value={fmt(baseResult.totalInterestPaid)}
                sub={`Paid off in ${months2str(baseResult.debtFreeMonths)}`}
                danger
              />
              {extraResult ? (
                <ResultCard
                  label="Interest with extra payment"
                  value={fmt(extraResult.totalInterestPaid)}
                  sub={`Paid off in ${months2str(extraResult.debtFreeMonths)}`}
                  positive
                />
              ) : (
                <div className="rounded-2xl bg-gray-50 border border-dashed border-gray-200 p-4 flex items-center justify-center text-sm text-muted-foreground text-center">
                  Use the slider below to see your savings
                </div>
              )}
            </div>

            {extraResult && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4">
                <p className="text-emerald-800 font-extrabold text-lg">
                  You'd save {fmt(baseResult.totalInterestPaid - extraResult.totalInterestPaid)} in interest
                </p>
                <p className="text-emerald-700 text-sm mt-0.5">
                  and be debt-free {months2str(baseResult.debtFreeMonths - extraResult.debtFreeMonths)} sooner.
                </p>
              </div>
            )}

            {/* Extra payment slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  What if I paid extra each month?
                </p>
                <span className="font-extrabold text-[#1C1C1C]">{fmt(extra)}/mo</span>
              </div>
              <Slider
                min={0}
                max={Math.min(5000, Math.round(parseFloat(balance) / 2) || 2000)}
                step={50}
                value={[extra]}
                onValueChange={(v) => setExtra(Array.isArray(v) ? v[0] : v)}
                className="**:data-[slot=slider-thumb]:bg-[#FFD000] **:data-[slot=slider-thumb]:border-[#FFD000] **:data-[slot=track-range]:bg-[#FFD000]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                <span>RM 0</span>
                <span>RM {Math.min(5000, Math.round(parseFloat(balance) / 2) || 2000).toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#1C1C1C] px-5 py-5 text-center">
              <p className="text-white font-bold mb-1">
                Ready to track all your debts in one place?
              </p>
              <p className="text-white/50 text-sm mb-4">
                Add all your debts, pick snowball or avalanche, and see your exact debt-free date.
              </p>
              <Link href="/signup">
                <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                  Get your free payoff plan →
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-2">
            {!debt && balance && rate && minPayment
              ? 'Your minimum payment doesn\'t cover the monthly interest — increase the minimum payment.'
              : 'Fill in all three fields above.'}
          </div>
        )}
      </div>
    </div>
  )
}

function ResultCard({
  label, value, sub, danger = false, positive = false,
}: {
  label: string; value: string; sub: string; danger?: boolean; positive?: boolean
}) {
  return (
    <div className={`rounded-2xl p-4 ${danger ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${danger ? 'text-red-400' : 'text-emerald-500'}`}>
        {label}
      </p>
      <p className={`text-2xl font-extrabold tracking-tight ${danger ? 'text-red-700' : 'text-emerald-700'}`}>
        {value}
      </p>
      <p className={`text-xs mt-1 ${danger ? 'text-red-500' : 'text-emerald-600'}`}>{sub}</p>
    </div>
  )
}
