'use client'

import { useState } from 'react'
import { calculate } from '@/lib/calculator/engine'
import type { Strategy } from '@/lib/calculator/types'
import type { Database } from '@/types/database'

type DebtRow = Database['public']['Tables']['debts']['Row']

function toCalcDebt(row: DebtRow) {
  return {
    id: row.id,
    name: row.name,
    balance: row.balance,
    interestRate: row.interest_rate,
    minimumPayment: row.minimum_payment,
  }
}

function escapeCSV(value: string | number): string {
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function monthLabel(yyyyMM: string): string {
  const [y, m] = yyyyMM.split('-')
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-MY', { month: 'long', year: 'numeric' })
}

function fmt(n: number): string {
  return n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function today(): string {
  return new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

function downloadCSV(rows: string[][], filename: string) {
  const csv = rows.map(row => row.map(escapeCSV).join(',')).join('\n')
  const bom = '\uFEFF' // UTF-8 BOM for Excel compatibility
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function generateDebtSummaryCSV(debts: DebtRow[]): string[][] {
  const rows: string[][] = []
  rows.push(['Beebas Debt Summary'])
  rows.push(['Generated', today()])
  rows.push([])
  rows.push(['Name', 'Type', 'Balance (RM)', 'Interest Rate (%)', 'Min Payment (RM)', 'Custom Category'])
  for (const d of debts) {
    rows.push([
      d.name,
      d.debt_type.replace(/_/g, ' '),
      fmt(d.balance),
      d.interest_rate.toFixed(2),
      fmt(d.minimum_payment),
      d.custom_category ?? '',
    ])
  }
  rows.push([])
  const totalBalance = debts.reduce((s, d) => s + d.balance, 0)
  const totalMinPayment = debts.reduce((s, d) => s + d.minimum_payment, 0)
  rows.push(['Total', '', fmt(totalBalance), '', fmt(totalMinPayment), ''])
  rows.push([])
  rows.push(['This is a financial planning tool and does not constitute financial advice.'])
  return rows
}

function generatePayoffScheduleCSV(
  debts: DebtRow[],
  strategy: Strategy,
  extraPayment: number,
) {
  const result = calculate({ debts: debts.map(toCalcDebt), extraPayment, strategy })
  const rows: string[][] = []
  rows.push(['Beebas Payoff Schedule'])
  rows.push(['Generated', today()])
  rows.push(['Strategy', strategy.charAt(0).toUpperCase() + strategy.slice(1)])
  if (extraPayment > 0) rows.push(['Extra Payment', `RM ${fmt(extraPayment)}/mo`])
  rows.push([])

  // Summary
  const totalBalance = debts.reduce((s, d) => s + d.balance, 0)
  rows.push(['--- Summary ---'])
  rows.push(['Total Debt', `RM ${fmt(totalBalance)}`])
  rows.push(['Debt-Free Date', monthLabel(result.debtFreeDate)])
  rows.push(['Months to Freedom', `${result.debtFreeMonths}`])
  rows.push(['Total Interest Paid', `RM ${fmt(result.totalInterestPaid)}`])
  rows.push(['Interest Saved vs Minimum', `RM ${fmt(result.interestSavedVsMinimum)}`])
  rows.push(['Total Amount Paid', `RM ${fmt(result.totalAmountPaid)}`])
  rows.push([])

  // Monthly schedule
  rows.push(['--- Monthly Schedule ---'])
  rows.push(['Month', 'Date', 'Total Balance (RM)', 'Interest This Month (RM)', 'Total Payment (RM)'])
  for (const m of result.months) {
    const totalPaid = m.debts.reduce((s, d) => s + d.paid, 0)
    rows.push([
      String(m.month),
      monthLabel(m.date),
      fmt(m.totalBalance),
      fmt(m.totalInterestThisMonth),
      fmt(totalPaid),
    ])
  }
  rows.push([])
  rows.push(['This is a financial planning tool and does not constitute financial advice.'])
  return rows
}

function generateFullPlanCSV(
  debts: DebtRow[],
  strategy: Strategy,
  extraPayment: number,
) {
  const result = calculate({ debts: debts.map(toCalcDebt), extraPayment, strategy })
  const rows: string[][] = []
  const totalBalance = debts.reduce((s, d) => s + d.balance, 0)

  // Header
  rows.push(['Beebas — Debt Payoff Plan'])
  rows.push(['Generated', today()])
  rows.push(['Strategy', strategy.charAt(0).toUpperCase() + strategy.slice(1)])
  if (extraPayment > 0) rows.push(['Extra Payment', `RM ${fmt(extraPayment)}/mo`])
  rows.push([])

  // Summary
  rows.push(['--- Summary ---'])
  rows.push(['Total Debt', `RM ${fmt(totalBalance)}`])
  rows.push(['Debt-Free Date', monthLabel(result.debtFreeDate)])
  rows.push(['Months to Freedom', `${result.debtFreeMonths}`])
  rows.push(['Total Interest Paid', `RM ${fmt(result.totalInterestPaid)}`])
  rows.push(['Interest Saved vs Minimum', `RM ${fmt(result.interestSavedVsMinimum)}`])
  rows.push(['Total Amount Paid', `RM ${fmt(result.totalAmountPaid)}`])
  rows.push([])

  // Debts
  rows.push(['--- Your Debts ---'])
  rows.push(['#', 'Name', 'Type', 'Balance (RM)', 'Interest Rate (%)', 'Min Payment (RM)', 'Custom Category'])
  for (let i = 0; i < debts.length; i++) {
    const d = debts[i]
    rows.push([
      String(i + 1),
      d.name,
      d.debt_type.replace(/_/g, ' '),
      fmt(d.balance),
      d.interest_rate.toFixed(2),
      fmt(d.minimum_payment),
      d.custom_category ?? '',
    ])
  }
  rows.push([])

  // Payoff order
  rows.push(['--- Payoff Order ---'])
  rows.push(['#', 'Debt Name', 'Paid Off Date'])
  for (let i = 0; i < result.payoffOrder.length; i++) {
    const event = result.payoffOrder[i]
    rows.push([String(i + 1), event.name, monthLabel(event.date)])
  }
  rows.push([])

  // Monthly schedule
  rows.push(['--- Monthly Schedule ---'])
  rows.push(['Month', 'Date', 'Total Balance (RM)', 'Interest This Month (RM)', 'Total Payment (RM)'])
  for (const m of result.months) {
    const totalPaid = m.debts.reduce((s, d) => s + d.paid, 0)
    rows.push([
      String(m.month),
      monthLabel(m.date),
      fmt(m.totalBalance),
      fmt(m.totalInterestThisMonth),
      fmt(totalPaid),
    ])
  }
  rows.push([])
  rows.push(['Generated by Beebas · beebas.my · ' + today()])
  rows.push(['This is a financial planning tool and does not constitute financial advice. Consult a licensed financial advisor for professional guidance.'])
  return rows
}

interface Props {
  debts: DebtRow[]
  strategy: Strategy
  extraPayment: number
}

export function CsvExportButton({ debts, strategy, extraPayment }: Props) {
  const [open, setOpen] = useState(false)

  function handleExport(type: 'summary' | 'schedule' | 'full') {
    const date = new Date().toISOString().slice(0, 10)
    let rows: string[][]
    let filename: string

    switch (type) {
      case 'summary':
        rows = generateDebtSummaryCSV(debts)
        filename = `beebas-debt-summary-${date}.csv`
        break
      case 'schedule':
        rows = generatePayoffScheduleCSV(debts, strategy, extraPayment)
        filename = `beebas-payoff-schedule-${date}.csv`
        break
      case 'full':
        rows = generateFullPlanCSV(debts, strategy, extraPayment)
        filename = `beebas-payoff-plan-${date}.csv`
        break
    }

    downloadCSV(rows, filename)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-bold text-[#1C1C1C] bg-[#FFD000] hover:bg-[#f0c400] px-3 py-1.5 rounded-lg transition-colors"
      >
        📊 Export CSV
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl border border-gray-200 shadow-lg py-1 min-w-[200px]">
            <button
              onClick={() => handleExport('summary')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1C1C1C] hover:bg-gray-50 transition-colors"
            >
              📋 Debt Summary
              <span className="block text-xs text-muted-foreground mt-0.5">Current debts list</span>
            </button>
            <button
              onClick={() => handleExport('schedule')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1C1C1C] hover:bg-gray-50 transition-colors"
            >
              📅 Payoff Schedule
              <span className="block text-xs text-muted-foreground mt-0.5">Month-by-month plan</span>
            </button>
            <div className="h-px bg-gray-100 mx-2" />
            <button
              onClick={() => handleExport('full')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1C1C1C] hover:bg-gray-50 transition-colors"
            >
              📊 Full Payoff Plan
              <span className="block text-xs text-muted-foreground mt-0.5">Summary + debts + schedule</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}