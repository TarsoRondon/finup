import React from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { usePortfolioStore } from '../store/portfolioStore'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export const Dashboard: React.FC = () => {
  const { balance, totalIncome, totalExpense } = useTransactionsStore()
  const { totalCurrentValue, investments } = usePortfolioStore()

  const netWorth = balance + totalCurrentValue

  const chartData = [
    { month: 'Jan', saldo: 4200 },
    { month: 'Fev', saldo: 5100 },
    { month: 'Mar', saldo: 4900 },
    { month: 'Abr', saldo: 6300 },
    { month: 'Mai', saldo: 7200 },
    { month: 'Jun', saldo: balance },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Visão Geral Consolidada</h2>
        <p className="text-xs text-[#8FA3B3]">Acompanhamento de liquidez diária, patrimônio e fluxo de caixa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Patrimônio Total</span>
            <Layers size={16} className="text-[#2ECC71]" />
          </div>
          <p className="text-2xl font-black text-white">
            {netWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#2ECC71] font-semibold">Conta + Investimentos</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Saldo em Conta</span>
            <Wallet size={16} className="text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-blue-400 font-semibold">Disponível imediato</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Receitas do Mês</span>
            <ArrowUpRight size={16} className="text-[#2ECC71]" />
          </div>
          <p className="text-2xl font-black text-[#2ECC71]">
            +{totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Entradas registradas</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Despesas do Mês</span>
            <ArrowDownRight size={16} className="text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">
            -{totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Saídas e faturas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Activity size={16} className="text-[#2ECC71]" />
              Evolução Patrimonial
            </h3>
            <span className="text-xs text-[#8FA3B3]">Últimos 6 meses</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5E7385" fontSize={11} />
                <YAxis stroke="#5E7385" fontSize={11} tickFormatter={(v) => `R$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Saldo']}
                />
                <Area type="monotone" dataKey="saldo" stroke="#2ECC71" strokeWidth={3} fill="url(#colorSaldo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#2ECC71]" />
              Ativos em Destaque
            </h3>
            <div className="space-y-3">
              {investments.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1923] border border-[#2D4055]">
                  <div>
                    <span className="font-bold text-xs text-white">{item.ticker}</span>
                    <p className="text-[10px] text-[#8FA3B3]">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-white">
                      {item.currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <p className={`text-[10px] font-bold ${(item.change24h || 0) >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}`}>
                      {(item.change24h || 0) >= 0 ? '+' : ''}{item.change24h}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
