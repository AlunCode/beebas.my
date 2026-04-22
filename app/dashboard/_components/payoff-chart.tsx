'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import type { PayoffResult } from '@/lib/calculator/types'

const COLORS = [
  '#FFD000', '#1C1C1C', '#6366f1', '#10b981',
  '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4',
]

interface Props {
  result: PayoffResult
}

function sampleMonths(months: PayoffResult['months'], maxPoints = 60) {
  if (months.length <= maxPoints) return months
  const step = Math.ceil(months.length / maxPoints)
  const sampled = months.filter((_, i) => i % step === 0)
  // Always include the last month
  if (sampled[sampled.length - 1] !== months[months.length - 1]) {
    sampled.push(months[months.length - 1])
  }
  return sampled
}

function formatRM(value: number) {
  if (value >= 1000) return `RM ${(value / 1000).toFixed(0)}k`
  return `RM ${value.toFixed(0)}`
}

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-')
  const d = new Date(Number(year), Number(month) - 1)
  return d.toLocaleDateString('en-MY', { month: 'short', year: '2-digit' })
}

export function PayoffChart({ result }: Props) {
  const sampled = sampleMonths(result.months)

  // Build chart data: one object per month with each debt's balance as a key
  const debtIds = result.months[0]?.debts.map(d => d.debtId) ?? []
  const debtNames: Record<string, string> = {}
  result.months[0]?.debts.forEach(d => { debtNames[d.debtId] = d.name })

  const chartData = sampled.map(month => {
    const point: Record<string, string | number> = { date: formatDate(month.date) }
    for (const d of month.debts) {
      point[d.debtId] = d.balance
    }
    // Fill zeros for debts already paid off
    for (const id of debtIds) {
      if (!(id in point)) point[id] = 0
    }
    return point
  })

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          {debtIds.map((id, i) => (
            <linearGradient key={id} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={formatRM}
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value, name) => [
            `RM ${Number(value ?? 0).toLocaleString('en-MY', { minimumFractionDigits: 2 })}`,
            debtNames[String(name)] ?? name,
          ]}
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        />
        <Legend
          formatter={(value) => debtNames[value] ?? value}
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
        />
        {debtIds.map((id, i) => (
          <Area
            key={id}
            type="monotone"
            dataKey={id}
            stackId="1"
            stroke={COLORS[i % COLORS.length]}
            fill={`url(#grad-${i})`}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
