'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { deleteDebt } from '@/app/actions/debts'
import { useToast } from './toast-provider'
import type { Database } from '@/types/database'

type DebtRow = Database['public']['Tables']['debts']['Row']

const TYPE_LABELS: Record<string, string> = {
  credit_card:   'Credit Card',
  personal_loan: 'Personal Loan',
  ptptn:         'PTPTN',
  car_loan:      'Car Loan',
  home_loan:     'Home Loan',
  bnpl:          'BNPL',
  aeon_credit:   'AEON Credit',
  other:         'Other',
}

function fmt(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

interface Props {
  debts: DebtRow[]
  isPro: boolean
}

export function DebtList({ debts, isPro }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  async function handleDelete(id: string, name: string) {
    setDeleting(id)
    const result = await deleteDebt(id)
    setDeleting(null)
    if (result?.error) {
      toast(result.error, 'error')
    } else {
      toast(`"${name}" removed`)
    }
  }

  if (debts.length === 0) return null

  return (
    <div className="space-y-3">
      {debts.map(debt => (
        <div
          key={debt.id}
          className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[#1C1C1C] truncate">{debt.name}</span>
              <Badge
                variant="secondary"
                className="text-xs shrink-0 bg-[#FFF8DC] text-[#8B6000] border-[#FFD000]/30 rounded-full"
              >
                {TYPE_LABELS[debt.debt_type] ?? 'Other'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-muted-foreground">
              <span className="font-semibold text-[#1C1C1C]">{fmt(debt.balance)}</span>
              <span>{debt.interest_rate}% p.a.</span>
              <span>Min. {fmt(debt.minimum_payment)}/mo</span>
            </div>
          </div>

          <button
            onClick={() => handleDelete(debt.id, debt.name)}
            disabled={deleting === debt.id}
            className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 shrink-0 disabled:opacity-40"
            aria-label="Delete debt"
          >
            {deleting === debt.id ? (
              <span className="text-xs">…</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            )}
          </button>
        </div>
      ))}

      {!isPro && (
        <p className="text-xs text-center text-muted-foreground pt-1">
          {debts.length}/3 debts used on free plan.{' '}
          {debts.length >= 3 && (
            <span className="font-semibold text-[#1C1C1C]">Upgrade for unlimited.</span>
          )}
        </p>
      )}
    </div>
  )
}
