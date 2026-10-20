import React from 'react'
import { ArrowUpRight, ArrowDownLeft, Zap, FileText, ArrowRightLeft, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

interface DashboardViewProps {
  onNavigate: (tab: string) => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { balance, transactions, bills, investments, payBill } = useAppStore()

  // Calculate totals
  const totalInvested = investments.reduce((acc, i) => acc + i.currentPrice * i.quantity, 0)
  const totalPatrimony = balance + totalInvested

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense' || t.type === 'pix' || t.type === 'bill' || t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0)

  const pendingBills = bills.filter((b) => b.status === 'pending')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141412] p-6 rounded-3xl border border-[#22221F]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-1">
            Painel Consolidado Open Finance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Bom dia, <span className="text-[#00A878]">Tarso Rondon 👋</span>
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Aqui está a síntese de todas as suas contas, faturas e investimentos hoje.
          </p>
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('pix')}
            className="px-4 py-2 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-[#00A878]/15"
          >
            <Zap className="w-4 h-4" /> Enviar Pix
          </button>
          <button
            onClick={() => onNavigate('bills')}
            className="px-4 py-2 rounded-xl bg-[#1C1C19] hover:bg-[#262622] text-white border border-[#2A2A26] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-[#F59E0B]" /> Pagar Boleto
          </button>
          <button
            onClick={() => onNavigate('transfer')}
            className="px-4 py-2 rounded-xl bg-[#1C1C19] hover:bg-[#262622] text-white border border-[#2A2A26] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-4 h-4 text-[#3B82F6]" /> TED/DOC
          </button>
        </div>
      </div>

      {/* Main KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 relative overflow-hidden group hover:border-[#00A878]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87]">Saldo Disponível</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A878] animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#00A878] font-bold bg-[#00A878]/10 px-2.5 py-0.5 rounded-full inline-block">
            Conta Corrente FinUp
          </span>
        </div>

        {/* Patrimony Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 relative overflow-hidden group hover:border-[#3B82F6]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87]">Patrimônio Total</span>
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            R$ {totalPatrimony.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#3B82F6] font-bold bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full inline-block">
            Saldo + Investimentos
          </span>
        </div>

        {/* Incomes Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87]">Receitas do Mês</span>
            <ArrowDownLeft className="w-4 h-4 text-[#2ECC71]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2ECC71] tracking-tight mb-2">
            +R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#8A8A87]">Entradas confirmadas</span>
        </div>

        {/* Expenses Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87]">Despesas do Mês</span>
            <ArrowUpRight className="w-4 h-4 text-[#E5484D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#E5484D] tracking-tight mb-2">
            -R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#8A8A87]">Saídas e pagamentos</span>
        </div>
      </div>

      {/* Grid: AI Card & Pending Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FinUp AI Insight Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#17241E] to-[#141412] border border-[#00A878]/30 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00A878] text-[#0E0E0C] font-black flex items-center justify-center text-sm shadow-md">
                  IA
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">FinUp Intelligence — Diagnóstico Ativo</h3>
                  <p className="text-[11px] text-[#00A878]">Contexto em tempo real da sua conta</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#8A8A87]">v2.4 Context-Engine</span>
            </div>

            <div className="bg-[#181816]/90 p-4 rounded-2xl border border-[#2E2E2A] text-sm text-[#E2E2DE] leading-relaxed mb-4">
              "Você tem <strong className="text-white">{pendingBills.length} contas a vencer</strong> neste mês somando R$ {pendingBills.reduce((acc, b) => acc + b.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Seu saldo líquido cobre todas com folga de R$ {(balance - pendingBills.reduce((acc, b) => acc + b.amount, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, permitindo destinar o excedente para suas metas."
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#8A8A87]">Quer conselhos sobre onde cortar gastos?</span>
            <button
              onClick={() => onNavigate('ai')}
              className="px-4 py-2 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Conversar com a IA
            </button>
          </div>
        </div>

        {/* Pending Bills Widget */}
        <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" /> Contas a Pagar ({pendingBills.length})
              </h3>
              <button onClick={() => onNavigate('bills')} className="text-xs text-[#00A878] hover:underline font-bold">
                Ver todas
              </button>
            </div>

            <div className="space-y-3">
              {pendingBills.slice(0, 3).map((bill) => (
                <div key={bill.id} className="p-3 bg-[#181816] rounded-xl border border-[#262622] flex items-center justify-between">
                  <div className="overflow-hidden pr-2">
                    <span className="text-xs font-bold text-white block truncate">{bill.title}</span>
                    <span className="text-[10px] text-[#F59E0B]">Vence {bill.dueDate}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-white block">
                      R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => payBill(bill.id)}
                      className="text-[10px] font-extrabold text-[#00A878] hover:underline"
                    >
                      Pagar agora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('bills')}
            className="w-full mt-4 py-2.5 rounded-xl bg-[#1C1C19] hover:bg-[#22221F] text-xs font-bold text-white transition-colors"
          >
            Gerenciar Boletos
          </button>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-extrabold text-white">Últimas Movimentações em Conta</h3>
            <p className="text-xs text-[#8A8A87]">Extrato em tempo real com categorização automática</p>
          </div>
          <button
            onClick={() => onNavigate('transactions')}
            className="text-xs font-bold text-[#00A878] hover:underline"
          >
            Ver Extrato Completo →
          </button>
        </div>

        <div className="divide-y divide-[#22221F]">
          {transactions.slice(0, 5).map((tx) => {
            const isPositive = tx.type === 'income'
            return (
              <div key={tx.id} className="py-3.5 flex items-center justify-between hover:bg-[#181816]/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isPositive
                        ? 'bg-[#2ECC71]/10 text-[#2ECC71]'
                        : tx.type === 'pix'
                        ? 'bg-[#00A878]/10 text-[#00A878]'
                        : 'bg-[#E5484D]/10 text-[#E5484D]'
                    }`}
                  >
                    {isPositive ? '↓' : tx.type === 'pix' ? '⚡' : '↑'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{tx.description}</span>
                    <span className="text-[10px] text-[#8A8A87]">{tx.category} • {tx.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-black ${isPositive ? 'text-[#2ECC71]' : 'text-white'}`}>
                    {isPositive ? '+' : '-'}R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-[#8A8A87] block flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00A878]" /> Concluído
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
