'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { addDebt } from '@/app/actions/debts'
import { useToast } from './toast-provider'

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
  debtCount: number
  isPro: boolean
}

export function DebtForm({ debtCount, isPro }: Props) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [debtType, setDebtType] = useState('other')
  const [customCategory, setCustomCategory] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const atLimit = !isPro && debtCount >= 3

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.set('debt_type', debtType)
    const result = await addDebt(formData)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setOpen(false)
      formRef.current?.reset()
      setDebtType('other')
      setCustomCategory('')
      toast('Debt added')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            disabled={atLimit}
            data-debt-form-trigger
            className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none"
            title={atLimit ? 'Upgrade to Pro for unlimited debts' : undefined}
          />
        }
      >
        + Add debt
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold tracking-tight">Add a debt</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={handleSubmit} className="space-y-4 mt-2">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Debt name</Label>
            <Input name="name" placeholder="e.g. Maybank Credit Card" required className="rounded-xl h-10" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Debt type</Label>
            <Select value={debtType} onValueChange={(v) => { if (v !== null) setDebtType(v) }}>
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
              <Input name="balance" type="number" min="1" step="0.01" placeholder="5000" required className="rounded-xl h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Interest rate (%)</Label>
              <Input name="interest_rate" type="number" min="0" max="100" step="0.01" placeholder="18" required className="rounded-xl h-10" />
              <p className="text-xs text-muted-foreground">e.g. credit card ~18%, car loan ~3–5%, PTPTN 1%</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Minimum monthly payment (RM)</Label>
            <Input name="minimum_payment" type="number" min="1" step="0.01" placeholder="150" required className="rounded-xl h-10" />
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
                Adding…
              </span>
            ) : 'Add debt'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
