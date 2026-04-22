import type {
  CalculatorInput,
  Debt,
  DebtPayoffEvent,
  DebtPayoffSnapshot,
  MonthlySnapshot,
  PayoffResult,
  Strategy,
} from './types'

const MAX_MONTHS = 600 // 50-year safety cap

function formatMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + n)
  return d
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

function sortDebts(debts: Debt[], strategy: Strategy): Debt[] {
  const copy = [...debts]
  if (strategy === 'snowball') {
    // Smallest balance first
    copy.sort((a, b) => a.balance - b.balance)
  } else {
    // Highest interest rate first
    copy.sort((a, b) => b.interestRate - a.interestRate)
  }
  return copy
}

function runSimulation(
  input: CalculatorInput,
  referenceInterest?: number // total interest for minimum-only run, used for savings calc
): PayoffResult {
  const { strategy, extraPayment, startDate = new Date() } = input

  // Work with mutable copies
  let remaining = sortDebts(input.debts, strategy).map(d => ({ ...d, balance: d.balance }))

  const months: MonthlySnapshot[] = []
  const payoffOrder: DebtPayoffEvent[] = []
  let extraPool = extraPayment
  let totalInterestPaid = 0
  let totalAmountPaid = 0

  for (let month = 1; month <= MAX_MONTHS; month++) {
    if (remaining.length === 0) break

    const date = formatMonth(addMonths(startDate, month))
    const snapshots: DebtPayoffSnapshot[] = []
    let totalBalanceThisMonth = 0
    let totalInterestThisMonth = 0

    // Apply extra payment to the first debt in priority order
    let extraLeft = extraPool

    for (let i = 0; i < remaining.length; i++) {
      const debt = remaining[i]
      const monthlyRate = debt.interestRate / 100 / 12
      const interest = round2(debt.balance * monthlyRate)
      debt.balance = round2(debt.balance + interest)

      // Minimum payment (capped at remaining balance)
      let payment = Math.min(debt.minimumPayment, debt.balance)

      // Apply extra to the priority debt (index 0)
      if (i === 0 && extraLeft > 0) {
        const extra = Math.min(extraLeft, debt.balance - payment)
        payment = round2(payment + Math.max(extra, 0))
        extraLeft = round2(extraLeft - Math.max(extra, 0))
      }

      debt.balance = round2(Math.max(debt.balance - payment, 0))

      totalInterestPaid = round2(totalInterestPaid + interest)
      totalAmountPaid = round2(totalAmountPaid + payment)
      totalBalanceThisMonth = round2(totalBalanceThisMonth + debt.balance)
      totalInterestThisMonth = round2(totalInterestThisMonth + interest)

      snapshots.push({
        debtId: debt.id,
        name: debt.name,
        balance: debt.balance,
        interest,
        paid: payment,
      })
    }

    months.push({
      month,
      date,
      debts: snapshots,
      totalBalance: totalBalanceThisMonth,
      totalInterestThisMonth,
    })

    // Remove paid-off debts, roll their minimums into the extra pool
    const paidOff = remaining.filter(d => d.balance === 0)
    for (const d of paidOff) {
      payoffOrder.push({ debtId: d.id, name: d.name, month, date })
      extraPool = round2(extraPool + d.minimumPayment)
    }
    remaining = remaining.filter(d => d.balance > 0)
  }

  const debtFreeMonths = months.length
  const debtFreeDate = months[debtFreeMonths - 1]?.date ?? formatMonth(startDate)

  return {
    strategy,
    months,
    debtFreeDate,
    debtFreeMonths,
    totalInterestPaid,
    totalAmountPaid,
    interestSavedVsMinimum: referenceInterest !== undefined
      ? round2(referenceInterest - totalInterestPaid)
      : 0,
    payoffOrder,
  }
}

export function calculate(input: CalculatorInput): PayoffResult {
  // Run minimum-only baseline to compute interest savings
  const minimumOnly = runSimulation({ ...input, extraPayment: 0 })
  return runSimulation(input, minimumOnly.totalInterestPaid)
}

export function calculateBoth(input: Omit<CalculatorInput, 'strategy'>): {
  snowball: PayoffResult
  avalanche: PayoffResult
} {
  const minimumOnly = runSimulation({ ...input, extraPayment: 0, strategy: 'snowball' })
  const baseInterest = minimumOnly.totalInterestPaid

  return {
    snowball: runSimulation({ ...input, strategy: 'snowball' }, baseInterest),
    avalanche: runSimulation({ ...input, strategy: 'avalanche' }, baseInterest),
  }
}
