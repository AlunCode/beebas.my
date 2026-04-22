import { describe, it, expect } from 'vitest'
import { calculate, calculateBoth } from '../engine'
import type { Debt, CalculatorInput } from '../types'

// Fixed start date so test output is deterministic
const START = new Date('2026-01-01')

const sampleDebts: Debt[] = [
  { id: 'cc1',    name: 'Credit Card',  balance: 5000,  interestRate: 18,  minimumPayment: 150 },
  { id: 'ptptn', name: 'PTPTN',         balance: 20000, interestRate: 1,   minimumPayment: 200 },
  { id: 'car',   name: 'Car Loan',      balance: 15000, interestRate: 3.5, minimumPayment: 350 },
]

const baseInput: CalculatorInput = {
  debts: sampleDebts,
  extraPayment: 200,
  strategy: 'snowball',
  startDate: START,
}

// ─── Snowball order ───────────────────────────────────────────────────────────

describe('snowball strategy', () => {
  it('pays off smallest balance first', () => {
    const result = calculate(baseInput)
    // Credit Card (5000) should be paid off before PTPTN (20000) and Car (15000)
    expect(result.payoffOrder[0].debtId).toBe('cc1')
  })

  it('rolls paid-off minimums into extra pool', () => {
    const result = calculate(baseInput)
    // After cc1 is paid, its RM150 minimum rolls into the pool
    // So subsequent debts are cleared faster — total months < minimum-only months
    const minimumOnly = calculate({ ...baseInput, extraPayment: 0 })
    expect(result.debtFreeMonths).toBeLessThan(minimumOnly.debtFreeMonths)
  })

  it('all debts reach zero balance', () => {
    const result = calculate(baseInput)
    const lastMonth = result.months[result.months.length - 1]
    expect(lastMonth.totalBalance).toBe(0)
  })

  it('debt-free date matches last month snapshot date', () => {
    const result = calculate(baseInput)
    expect(result.debtFreeDate).toBe(result.months[result.months.length - 1].date)
  })
})

// ─── Avalanche order ──────────────────────────────────────────────────────────

describe('avalanche strategy', () => {
  it('pays off highest interest rate first', () => {
    const result = calculate({ ...baseInput, strategy: 'avalanche' })
    // Credit Card (18%) should be first
    expect(result.payoffOrder[0].debtId).toBe('cc1')
  })

  it('saves more interest than snowball when rates differ significantly', () => {
    const { snowball, avalanche } = calculateBoth({ ...baseInput })
    // Avalanche minimises interest; snowball may pay equal or more
    expect(avalanche.totalInterestPaid).toBeLessThanOrEqual(snowball.totalInterestPaid)
  })
})

// ─── Interest savings ─────────────────────────────────────────────────────────

describe('interest savings vs minimum-only', () => {
  it('extra payment always reduces total interest paid', () => {
    const withExtra = calculate(baseInput)
    const minimumOnly = calculate({ ...baseInput, extraPayment: 0 })
    expect(withExtra.totalInterestPaid).toBeLessThan(minimumOnly.totalInterestPaid)
  })

  it('interestSavedVsMinimum is positive when extra payment > 0', () => {
    const result = calculate(baseInput)
    expect(result.interestSavedVsMinimum).toBeGreaterThan(0)
  })

  it('interestSavedVsMinimum is 0 when no extra payment', () => {
    const result = calculate({ ...baseInput, extraPayment: 0 })
    expect(result.interestSavedVsMinimum).toBe(0)
  })
})

// ─── Single debt ──────────────────────────────────────────────────────────────

describe('single debt', () => {
  const singleDebt: Debt = { id: 'd1', name: 'Personal Loan', balance: 10000, interestRate: 12, minimumPayment: 300 }

  it('correctly amortises a single debt', () => {
    const result = calculate({ debts: [singleDebt], extraPayment: 0, strategy: 'snowball', startDate: START })
    expect(result.debtFreeMonths).toBeGreaterThan(0)
    expect(result.totalInterestPaid).toBeGreaterThan(0)
    const lastMonth = result.months[result.months.length - 1]
    expect(lastMonth.totalBalance).toBe(0)
  })

  it('extra payment shortens payoff time', () => {
    const withExtra = calculate({ debts: [singleDebt], extraPayment: 200, strategy: 'snowball', startDate: START })
    const noExtra = calculate({ debts: [singleDebt], extraPayment: 0, strategy: 'snowball', startDate: START })
    expect(withExtra.debtFreeMonths).toBeLessThan(noExtra.debtFreeMonths)
  })

  it('never produces a negative balance', () => {
    const result = calculate({ debts: [singleDebt], extraPayment: 50000, strategy: 'snowball', startDate: START })
    for (const month of result.months) {
      for (const debt of month.debts) {
        expect(debt.balance).toBeGreaterThanOrEqual(0)
      }
    }
  })
})

// ─── Zero interest debt ───────────────────────────────────────────────────────

describe('zero interest debt (PTPTN-style)', () => {
  const zeroInterest: Debt = { id: 'ptptn', name: 'PTPTN', balance: 10000, interestRate: 0, minimumPayment: 200 }

  it('pays correct amount with 0% interest', () => {
    const result = calculate({ debts: [zeroInterest], extraPayment: 0, strategy: 'snowball', startDate: START })
    // 10000 / 200 = 50 months exactly
    expect(result.debtFreeMonths).toBe(50)
    expect(result.totalInterestPaid).toBe(0)
  })
})

// ─── Monthly snapshots ────────────────────────────────────────────────────────

describe('monthly snapshot structure', () => {
  it('month numbers are sequential from 1', () => {
    const result = calculate(baseInput)
    result.months.forEach((m, i) => {
      expect(m.month).toBe(i + 1)
    })
  })

  it('dates progress month by month from startDate', () => {
    const result = calculate({ ...baseInput, startDate: new Date('2026-01-01') })
    expect(result.months[0].date).toBe('2026-02')
    expect(result.months[1].date).toBe('2026-03')
    expect(result.months[11].date).toBe('2027-01')
  })

  it('totalBalance in snapshot equals sum of individual debt balances', () => {
    const result = calculate(baseInput)
    for (const month of result.months) {
      const sum = month.debts.reduce((acc, d) => acc + d.balance, 0)
      expect(Math.round(sum * 100)).toBe(Math.round(month.totalBalance * 100))
    }
  })
})

// ─── calculateBoth ────────────────────────────────────────────────────────────

describe('calculateBoth', () => {
  it('returns both strategies', () => {
    const result = calculateBoth({ debts: sampleDebts, extraPayment: 200, startDate: START })
    expect(result.snowball.strategy).toBe('snowball')
    expect(result.avalanche.strategy).toBe('avalanche')
  })

  it('both strategies clear all debt', () => {
    const { snowball, avalanche } = calculateBoth({ debts: sampleDebts, extraPayment: 200, startDate: START })
    expect(snowball.months[snowball.months.length - 1].totalBalance).toBe(0)
    expect(avalanche.months[avalanche.months.length - 1].totalBalance).toBe(0)
  })
})
