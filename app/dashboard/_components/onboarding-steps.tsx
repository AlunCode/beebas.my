'use client'

import { DebtForm } from './debt-form'

const STEPS = [
  {
    number: '1',
    title: 'Add your first debt',
    desc: 'Enter any debt — credit card, car loan, PTPTN, personal loan. You\'ll need the balance, interest rate, and minimum monthly payment.',
  },
  {
    number: '2',
    title: 'Pick your strategy',
    desc: 'Snowball pays the smallest balance first for quick wins. Avalanche kills the highest interest rate first to save more money. We calculate both.',
  },
  {
    number: '3',
    title: 'See your debt-free date',
    desc: 'Your exact payoff date appears instantly. Drag the extra payment slider to watch it get closer.',
  },
]

interface Props {
  isPro: boolean
}

export function OnboardingSteps({ isPro }: Props) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-[#1C1C1C] px-6 py-5">
        <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-1">Welcome to Beebas 🐝</p>
        <p className="text-white/60 text-sm">3 steps to your debt-free date</p>
      </div>

      <div className="divide-y divide-gray-100">
        {STEPS.map((step, i) => {
          const isActive = i === 0
          return (
            <div key={step.number} className="px-6 py-5 flex items-start gap-4">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 mt-0.5 ${
                isActive ? 'bg-[#FFD000] text-[#1C1C1C]' : 'bg-gray-100 text-gray-300'
              }`}>
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-bold text-sm ${isActive ? 'text-[#1C1C1C]' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  {!isActive && (
                    <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest">After step {i}</span>
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-muted-foreground' : 'text-gray-300'}`}>{step.desc}</p>
                {isActive && (
                  <div className="mt-4">
                    <DebtForm debtCount={0} isPro={isPro} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
