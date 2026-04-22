export type Strategy = 'snowball' | 'avalanche'

export interface Debt {
  id: string
  name: string
  balance: number        // current balance in RM
  interestRate: number   // annual rate, e.g. 18 for 18%
  minimumPayment: number // monthly minimum in RM
}

export interface DebtPayoffSnapshot {
  debtId: string
  name: string
  balance: number    // remaining balance after this month's payment
  interest: number   // interest charged this month
  paid: number       // total amount paid this month (interest + principal)
}

export interface MonthlySnapshot {
  month: number              // 1-indexed months from today
  date: string               // "YYYY-MM"
  debts: DebtPayoffSnapshot[]
  totalBalance: number
  totalInterestThisMonth: number
}

export interface DebtPayoffEvent {
  debtId: string
  name: string
  month: number
  date: string
}

export interface PayoffResult {
  strategy: Strategy
  months: MonthlySnapshot[]
  debtFreeDate: string        // "YYYY-MM"
  debtFreeMonths: number      // total months until debt-free
  totalInterestPaid: number
  totalAmountPaid: number
  interestSavedVsMinimum: number  // vs paying minimums only
  payoffOrder: DebtPayoffEvent[]
}

export interface CalculatorInput {
  debts: Debt[]
  extraPayment: number   // additional monthly payment on top of minimums
  strategy: Strategy
  startDate?: Date       // defaults to today
}
