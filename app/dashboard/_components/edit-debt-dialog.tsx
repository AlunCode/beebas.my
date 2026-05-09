'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { updateDebt } from '@/app/actions/debts'
import { useToast } from './toast-provider'
import type { Database } from '@/types/database'

type DebtRow = Database['public']['Tables']['debts']['Row']

const DEBT_TYPES = [
  { value: 'credit_card',    label: 'Credit Card' },
  { value: 'personal_loan',  label: 'Personal Loan' },
  { value: 'ptptn',          label: 'PTPTN' },
  { value: 'car_loan',       label: 'Car Loan' },
  { value: 'home_loan',      label: 'Home Loan' },
  { value: 'bnpl',           label: 'BNPL' },
  { value: 'aeon_credit',    label: 'AEON Credit' },
  { value: 'other',          label: 'Other' },
]

interface Props {
  debt: DebtRow
  isPro: boolean
}

export function EditDebtDialog({ debt, isPro }: Props) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [debtType, setDebtType] = useState(debt.debt_type)
  const [customCategory, setCustomCategory] = useState(debt.custom_category ?? '')
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.set('debt_type', debtType)
    const result = await updateDebt(debt.id, formData)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setOpen(false)
      toast('Debt updated')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <button
          className="text-muted-foreground hover:text-[#1C1C1C] transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Edit debt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      } />

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold tracking-tight">Edit debt</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 mt-2">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Debt name</Label>
            <Input name="name" defaultValue={debt.name} required className="rounded-xl h-10" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Debt type</Label>
            <Select value={debtType} onValueChange={(v) => { if (v !== null) setDebtType(v as typeof debtType) }}>
              <SelectTrigger className="rounded-xl h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEBT_TYPES.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Balance (RM)</Label>
              <Input name="balance" type="number" min="0" step="0.01" defaultValue={debt.balance} required className="rounded-xl h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Interest rate (%)</Label>
              <Input name="interest_rate" type="number" min="0" max="100" step="0.01" defaultValue={debt.interest_rate} required className="rounded-xl h-10" />
              <p className="text-xs text-muted-foreground">e.g. credit card ~18%, car loan ~3–5%, PTPTN 1%</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Minimum monthly payment (RM)</Label>
            <Input name="minimum_payment" type="number" min="1" step="0.01" defaultValue={debt.minimum_payment} required className="rounded-xl h-10" />
          </div>

          {isPro && (
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">
                Custom label <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                name="custom_category"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                placeholder="e.g. Study loan, Wedding debt…"
                maxLength={50}
                className="rounded-xl h-10"
              />
              <p className="text-xs text-muted-foreground">Replaces the debt type badge label.</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving…
              </span>
            ) : 'Save changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
