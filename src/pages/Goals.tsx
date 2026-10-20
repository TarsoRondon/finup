import React, { useState } from 'react'
import { Target } from 'lucide-react'
import type { Goal } from '../types/goal.types'

export const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'g-1',
      userId: 'demo',
      title: 'Reserva de Emergência (6 Meses)',
      targetAmount: 20000,
      currentAmount: 14200,
      deadline: '2026-12-31',
    },
    {
      id: 'g-2',
      userId: 'demo',
      title: 'Viagem de Intercâmbio',
      targetAmount: 12000,
      currentAmount: 5400,
      deadline: '2027-06-30',
    },
    {
      id: 'g-3',
      userId: 'demo',
      title: 'Novo Setup de Programação',
      targetAmount: 8500,
      currentAmount: 8500,
      deadline: '2026-11-15',
    }
  ])

  const handleDeposit = (id: string, amount: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Metas & Planejamento</h2>
          <p className="text-xs text-[#8FA3B3]">Acompanhamento visual de objetivos financeiros de curto, médio e longo prazo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
          const isComplete = percent >= 100

          return (
            <div key={goal.id} className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055] flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B5E6C]/30 border border-[#1B5E6C] flex items-center justify-center text-[#2ECC71]">
                    <Target size={20} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isComplete ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'bg-[#0F1923] text-[#8FA3B3]'}`}>
                    {percent}% Concluído
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{goal.title}</h3>
                <p className="text-[11px] text-[#8FA3B3] mt-1">Prazo estimado: {goal.deadline}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#8FA3B3]">Acumulado</span>
                    <span className="text-white font-bold">
                      {goal.currentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {goal.targetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#0F1923] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1B5E6C] to-[#2ECC71] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {!isComplete && (
                <div className="mt-6 pt-4 border-t border-[#2D4055] flex gap-2">
                  <button
                    onClick={() => handleDeposit(goal.id, 100)}
                    className="flex-1 py-2 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white hover:border-[#2ECC71] text-xs font-semibold cursor-pointer"
                  >
                    + R$ 100
                  </button>
                  <button
                    onClick={() => handleDeposit(goal.id, 500)}
                    className="flex-1 py-2 rounded-xl bg-[#1B5E6C] hover:bg-[#2ECC71] hover:text-black text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    + R$ 500
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
