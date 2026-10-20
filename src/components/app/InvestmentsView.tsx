import React, { useState } from 'react'
import { TrendingUp, Plus, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

export const InvestmentsView: React.FC = () => {
  const { investments, balance } = useAppStore()
  const [filterType, setFilterType] = useState<string>('all')

  const totalInvested = investments.reduce((acc, i) => acc + i.currentPrice * i.quantity, 0)
  const totalCost = investments.reduce((acc, i) => acc + i.avgPrice * i.quantity, 0)
  const totalProfit = totalInvested - totalCost
  const profitPercentage = ((totalProfit / (totalCost || 1)) * 100).toFixed(2)

  const filtered = investments.filter((i) => {
    if (filterType === 'all') return true
    return i.type === filterType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2ECC71] block mb-1">
            Gestão Patrimonial & Ativos
          </span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-[#2ECC71]" /> Minha Carteira de Investimentos
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Ações da B3, Fundos Imobiliários e Criptomoedas com rentabilidade consolidada.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#181816] p-4 rounded-2xl border border-[#2E2E2A] text-right">
            <span className="text-[11px] text-[#8A8A87] font-semibold block">Total Aplicado</span>
            <span className="text-2xl font-black text-white">
              R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-[#181816] p-4 rounded-2xl border border-[#2E2E2A] text-right">
            <span className="text-[11px] text-[#8A8A87] font-semibold block">Rentabilidade Geral</span>
            <span className="text-2xl font-black text-[#2ECC71]">
              +{profitPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Asset Allocation Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'Todos os Ativos' },
          { key: 'stock', label: 'Ações B3' },
          { key: 'fii', label: 'Fundos Imobiliários (FIIs)' },
          { key: 'crypto', label: 'Criptomoedas' },
          { key: 'fixed', label: 'Renda Fixa / Tesouro' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === tab.key
                ? 'bg-[#2ECC71] text-[#0E0E0C]'
                : 'bg-[#141412] text-[#8A8A87] hover:text-white border border-[#22221F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((asset) => {
          const totalAssetVal = asset.currentPrice * asset.quantity
          const assetProfit = totalAssetVal - asset.avgPrice * asset.quantity
          const isPositive = asset.change24h >= 0

          return (
            <div
              key={asset.id}
              className="bg-[#141412] border border-[#262622] hover:border-[#2ECC71]/40 rounded-3xl p-6 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-white block">{asset.ticker}</span>
                  <span className="text-xs text-[#8A8A87]">{asset.name}</span>
                </div>
                <div
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5 ${
                    isPositive ? 'bg-[#2ECC71]/10 text-[#2ECC71]' : 'bg-[#E5484D]/10 text-[#E5484D]'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {isPositive ? '+' : ''}{asset.change24h}%
                </div>
              </div>

              <div className="pt-2 border-t border-[#1C1C19] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A8A87]">
                  <span>Quantidade custodiada:</span>
                  <strong className="text-white">{asset.quantity} cotas</strong>
                </div>
                <div className="flex justify-between text-[#8A8A87]">
                  <span>Preço Médio de Compra:</span>
                  <span className="text-white font-mono">
                    R$ {asset.avgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#8A8A87]">
                  <span>Cotação Atual de Mercado:</span>
                  <span className="text-white font-mono font-bold">
                    R$ {asset.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#22221F] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A8A87] block uppercase font-bold">Posição Total</span>
                  <span className="text-base font-black text-white">
                    R$ {totalAssetVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8A8A87] block uppercase font-bold">Ganho / Perda</span>
                  <span className={`text-xs font-extrabold ${assetProfit >= 0 ? 'text-[#2ECC71]' : 'text-[#E5484D]'}`}>
                    {assetProfit >= 0 ? '+' : ''}R$ {assetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
