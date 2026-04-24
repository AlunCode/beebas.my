import { redirect } from 'next/navigation'
import { getAuthUser, isPro } from '@/lib/auth/get-user'
import { createClient } from '@/lib/supabase/server'
import { calculate } from '@/lib/calculator/engine'
import type { Strategy } from '@/lib/calculator/types'
import type { Database } from '@/types/database'
import { PrintTrigger } from './_components/print-trigger'

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

function fmt(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtInt(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function monthLabel(yyyyMM: string) {
  const [y, m] = yyyyMM.split('-')
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-MY', { month: 'long', year: 'numeric' })
}

export default async function ExportPage({
  searchParams,
}: {
  searchParams: Promise<{ strategy?: string; extra?: string }>
}) {
  const user = await getAuthUser()
  if (!isPro(user)) redirect('/pricing')

  const params = await searchParams
  const strategy = (params.strategy === 'avalanche' ? 'avalanche' : 'snowball') as Strategy
  const extraPayment = Math.max(0, Number(params.extra) || 0)

  const supabase = await createClient()
  const { data: debts } = await supabase
    .from('debts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  const debtList = debts ?? []
  if (debtList.length === 0) redirect('/dashboard')

  const result = calculate({ debts: debtList.map(toCalcDebt), extraPayment, strategy })

  const generatedDate = new Date().toLocaleDateString('en-MY', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const tableMonths = result.months.slice(0, 36)
  const totalDebt = debtList.reduce((s, d) => s + d.balance, 0)

  return (
    <>
      <PrintTrigger />
      <style>{`
        @media print {
          @page { margin: 1.2cm; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="bg-white min-h-screen p-8 max-w-4xl mx-auto text-[#1C1C1C]" style={{ fontFamily: 'sans-serif' }}>

        {/* Back button — hidden when printing */}
        <div className="no-print mb-6">
          <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 underline">← Back to dashboard</a>
          <p className="text-xs text-gray-400 mt-1">Your browser print dialog will open automatically. Choose "Save as PDF".</p>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-[#1C1C1C] pb-5 mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FFD000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🐝</div>
              <span style={{ fontWeight: 800, fontSize: 20 }}>Beebas</span>
            </div>
            <p style={{ fontSize: 13, color: '#666' }}>Debt Payoff Plan</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 13, color: '#666' }}>
            <p>Generated: <strong style={{ color: '#1C1C1C' }}>{generatedDate}</strong></p>
            <p>Strategy: <strong style={{ color: '#1C1C1C', textTransform: 'capitalize' }}>{strategy}</strong></p>
            {extraPayment > 0 && <p>Extra payment: <strong style={{ color: '#1C1C1C' }}>{fmtInt(extraPayment)}/mo</strong></p>}
          </div>
        </div>

        {/* Summary cards */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: 12 }}>Summary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Total debt', value: fmtInt(totalDebt) },
              { label: 'Debt-free date', value: monthLabel(result.debtFreeDate) },
              { label: 'Months to freedom', value: `${result.debtFreeMonths} months` },
              { label: 'Total interest', value: fmtInt(result.totalInterestPaid) },
              { label: 'Interest saved', value: fmtInt(result.interestSavedVsMinimum), positive: true },
              { label: 'Total amount paid', value: fmtInt(result.totalAmountPaid) },
            ].map(({ label, value, positive }) => (
              <div key={label} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
                <p style={{ fontWeight: 800, fontSize: 15, color: positive ? '#059669' : '#1C1C1C' }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Debts table */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: 12 }}>Your Debts</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1C1C1C', color: '#fff' }}>
                {['#', 'Name', 'Type', 'Balance', 'Rate', 'Min Payment'].map((h, i) => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: i >= 3 ? 'right' : 'left', fontWeight: 700, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {debtList.map((d, i) => (
                <tr key={d.id} style={{ background: i % 2 === 0 ? '#f9fafb' : '#fff' }}>
                  <td style={{ padding: '8px 10px', color: '#999' }}>{i + 1}</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: '8px 10px', color: '#666', textTransform: 'capitalize' }}>{d.debt_type.replace(/_/g, ' ')}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>{fmtInt(d.balance)}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>{d.interest_rate.toFixed(2)}%</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>{fmtInt(d.minimum_payment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Payoff order */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: 12 }}>Payoff Order</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.payoffOrder.map((event, i) => (
              <div key={event.debtId} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#FFD000', color: '#1C1C1C', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{event.name}</span>
                <span style={{ marginLeft: 'auto', color: '#666', fontSize: 13 }}>{monthLabel(event.date)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly schedule */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: 12 }}>
            Monthly Schedule{result.months.length > 36 ? ' (first 36 months)' : ''}
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                {['Mo.', 'Date', 'Total Balance', 'Interest', 'Payment'].map((h, i) => (
                  <th key={h} style={{ padding: '7px 10px', textAlign: i >= 2 ? 'right' : 'left', fontWeight: 700, fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableMonths.map((m, i) => {
                const totalPaid = m.debts.reduce((s, d) => s + d.paid, 0)
                return (
                  <tr key={m.month} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '6px 10px', color: '#999' }}>{m.month}</td>
                    <td style={{ padding: '6px 10px' }}>{monthLabel(m.date)}</td>
                    <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 600 }}>{fmt(m.totalBalance)}</td>
                    <td style={{ padding: '6px 10px', textAlign: 'right', color: '#dc2626' }}>{fmt(m.totalInterestThisMonth)}</td>
                    <td style={{ padding: '6px 10px', textAlign: 'right', color: '#059669' }}>{fmt(totalPaid)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 16, textAlign: 'center', fontSize: 11, color: '#aaa' }}>
          <p>Generated by Beebas · beebas.my · {generatedDate}</p>
          <p style={{ marginTop: 4 }}>This is a financial planning tool and does not constitute financial advice. Consult a licensed financial advisor for professional guidance.</p>
        </div>

      </div>
    </>
  )
}
