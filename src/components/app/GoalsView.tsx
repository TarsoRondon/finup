import React, { useState } from 'react'
import { Target, Plus, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react'
import { useAppStore, type Goal } from '../../store/appStore'

export const GoalsView: React.FC = () => {
  const { goals, contributeToGoal, balance } = useAppStore()
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [aporteAmount, setAporteAmount] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleAporte = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGoal) return
    setErrorMsg('')
    setSuccessMsg('')

    const val = parseFloat(aporteAmount.replace(',', '.'))
    if (isNaN(val) || val <= 0) {
      setErrorMsg('Informe um valor válido.')
      return
    }

    const res = contributeToGoal(selectedGoal.id, val)
    if (!res.success) {
      setErrorMsg(res.error || 'Erro ao realizar aporte.')
    } else {
      setSuccessMsg(`Aporte de R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} na meta "${selectedGoal.title}" realizado com sucesso!`)
      setSelectedGoal(null)
      setAporteAmount('')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-1">
            Planejamento & Poupança
          </span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Target className="w-7 h-7 text-[#00A878]" /> Metas Financeiras & Orçamento
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Estipule metas de economia e acompanhe o progresso percentual até a conquista.
          </p>
        </div>

        <div className="bg-[#181816] p-4 rounded-2xl border border-[#2E2E2A] text-right">
          <span className="text-[11px] text-[#8A8A87] font-semibold block">Saldo em Conta para Aportes</span>
          <span className="text-2xl font-black text-white">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-4 bg-[#E5484D]/10 border border-[#E5484D]/40 rounded-2xl text-xs font-bold text-[#E5484D] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-[#00A878]/10 border border-[#00A878]/40 rounded-2xl text-xs font-bold text-[#00A878] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
          return (
            <div
              key={goal.id}
              className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/40 rounded-3xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{goal.categoryIcon}</span>
                  <span className="text-xs font-extrabold text-[#00A878] bg-[#00A878]/10 px-2.5 py-1 rounded-full">
                    {pct}% Concluído
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{goal.title}</h3>
                <p className="text-xs text-[#8A8A87] mb-6">Prazo estimado: {goal.deadline}</p>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <div className="w-full h-3 bg-[#1C1C19] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00A878] to-[#2ECC71] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white">
                      R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[#8A8A87]">
                      Meta: R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedGoal(goal)}
                className="w-full py-3 rounded-xl bg-[#1C1C19] hover:bg-[#00A878] hover:text-[#0E0E0C] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Realizar Aporte
              </button>
            </div>
          )
        })}
      </div>

      {/* Orçamento por Categoria Section */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg font-black text-white mb-2">Teto de Gastos & Orçamento Mensal</h3>
        <p className="text-xs text-[#8A8A87] mb-6">Acompanhe se suas despesas estão dentro dos limites planejados</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#181816] rounded-2xl border border-[#262622]">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white">🍔 Alimentação & Supermercado</span>
              <span className="text-[#00A878]">R$ 607,40 / R$ 900,00 (67%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#22221F] rounded-full overflow-hidden">
              <div className="h-full bg-[#00A878] w-[67%]" />
            </div>
          </div>

          <div className="p-4 bg-[#181816] rounded-2xl border border-[#262622]">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white">🏠 Moradia & Contas Fixas</span>
              <span className="text-[#3B82F6]">R$ 1.200,00 / R$ 1.500,00 (80%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#22221F] rounded-full overflow-hidden">
              <div className="h-full bg-[#3B82F6] w-[80%]" />
            </div>
          </div>

          <div className="p-4 bg-[#181816] rounded-2xl border border-[#262622]">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white">🚗 Transporte & Combustível</span>
              <span className="text-[#2ECC71]">R$ 210,00 / R$ 400,00 (52%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#22221F] rounded-full overflow-hidden">
              <div className="h-full bg-[#2ECC71] w-[52%]" />
            </div>
          </div>

          <div className="p-4 bg-[#181816] rounded-2xl border border-[#262622]">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white">🎮 Lazer & Streaming</span>
              <span className="text-[#F59E0B]">R$ 180,80 / R$ 250,00 (72%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#22221F] rounded-full overflow-hidden">
              <div className="h-full bg-[#F59E0B] w-[72%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Aporte */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#141412] border border-[#2E2E2A] rounded-3xl p-6 text-white">
            <h3 className="text-base font-black text-white mb-1">
              Aporte na meta: {selectedGoal.title}
            </h3>
            <p className="text-xs text-[#8A8A87] mb-4">
              O valor será debitado do seu saldo em conta (R$ {balance.toFixed(2)}) e somado a esta meta.
            </p>

            <form onSubmit={handleAporte} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1">Valor do Aporte (R$)</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="0,00"
                  value={aporteAmount}
                  onChange={(e) => setAporteAmount(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xl font-black text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGoal(null)}
                  className="flex-1 py-3 rounded-xl bg-[#1C1C19] text-[#A3A39E] font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-black text-xs"
                >
                  Confirmar Aporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
