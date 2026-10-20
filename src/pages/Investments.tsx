import React from 'react'
import { usePortfolioStore } from '../store/portfolioStore'

export const Investments: React.FC = () => {
  const { investments, totalInvested, totalCurrentValue } = usePortfolioStore()

  const profit = totalCurrentValue - totalInvested
  const profitPercentage = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Carteira de Investimentos</h2>
        <p className="text-xs text-[#8FA3B3]">Ações da B3, criptoativos, taxas Selic e CDI em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Valor Atual da Carteira</span>
          <p className="text-2xl font-black text-white mt-1">
            {totalCurrentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#2ECC71] font-semibold">Cotações atualizadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Total Aportado</span>
          <p className="text-2xl font-black text-[#8FA3B3] mt-1">
            {totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#5E7385]">Preço médio de aquisição</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Lucro / Prejuízo Total</span>
          <p className={`text-2xl font-black mt-1 ${profit >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}`}>
            {profit >= 0 ? '+' : ''}{profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ({profitPercentage.toFixed(2)}%)
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Rentabilidade acumulada</span>
        </div>
      </div>

      <div className="bg-[#1A2635] border border-[#2D4055] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#2D4055] flex items-center justify-between">
          <h3 className="font-bold text-xs text-white">Ativos Sob Custódia</h3>
          <span className="text-[10px] text-[#8FA3B3]">Dados reais via Brapi e CoinGecko</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1923] text-[#8FA3B3] text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Ativo</th>
                <th className="p-4">Quantidade</th>
                <th className="p-4">Preço Médio</th>
                <th className="p-4">Cotação Atual</th>
                <th className="p-4">Variação 24h</th>
                <th className="p-4 text-right">Saldo Atual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D4055]">
              {investments.map((item) => {
                const totalItem = item.quantity * item.currentPrice
                return (
                  <tr key={item.id} className="hover:bg-[#223040] transition-colors">
                    <td className="p-4 font-bold text-white">
                      {item.ticker} <span className="font-normal text-[#8FA3B3] text-[10px]">({item.name})</span>
                    </td>
                    <td className="p-4 text-[#F0F4F8]">{item.quantity}</td>
                    <td className="p-4 text-[#8FA3B3]">
                      {item.averagePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="p-4 text-white font-semibold">
                      {item.currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="p-4 font-bold">
                      <span className={(item.change24h || 0) >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}>
                        {(item.change24h || 0) >= 0 ? '+' : ''}{item.change24h}%
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-[#2ECC71]">
                      {totalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
