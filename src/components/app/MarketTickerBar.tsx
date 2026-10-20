import React from 'react'
import { TrendingUp, RefreshCw } from 'lucide-react'
import { useMarket } from '../../contexts/MarketContext'
import type { MarketQuote } from '../../services/marketService'

export const MarketTickerBar: React.FC = () => {
  const { quotes, loading, refresh } = useMarket()

  return (
    <div className="bg-[#111110] border-b border-[#22221F] px-4 py-2 flex items-center justify-between overflow-x-auto text-xs no-scrollbar select-none">
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-1.5 text-[#00A878] font-black text-[11px] tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
          Mercado em Tempo Real:
        </div>

        {quotes.map((q: MarketQuote) => {
          const isPositive = q.change24h >= 0
          return (
            <div key={q.ticker} className="flex items-center gap-2 font-mono text-xs">
              <span className="font-extrabold text-[#D5D5D0]">{q.ticker}</span>
              <span className="text-white font-bold">
                {q.category === 'currency'
                  ? `R$ ${q.price.toFixed(2)}`
                  : q.category === 'crypto'
                  ? `R$ ${q.price.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                  : `R$ ${q.price.toFixed(2)}`}
              </span>
              <span
                className={`text-[10px] font-bold px-1 py-0.5 rounded ${
                  isPositive ? 'text-[#2ECC71] bg-[#2ECC71]/10' : 'text-[#E5484D] bg-[#E5484D]/10'
                }`}
              >
                {isPositive ? '+' : ''}{q.change24h.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => refresh()}
        disabled={loading}
        className="ml-4 shrink-0 text-[#8A8A87] hover:text-white p-1 rounded transition-colors"
        title="Atualizar cotações"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#00A878]' : ''}`} />
      </button>
    </div>
  )
}
