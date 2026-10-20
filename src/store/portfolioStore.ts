import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Investment } from '../types/investment.types'

interface PortfolioState {
  investments: Investment[]
  totalInvested: number
  totalCurrentValue: number
  setInvestments: (investments: Investment[]) => void
  addInvestment: (investment: Investment) => void
  updatePrices: (prices: Record<string, { price: number; change24h: number }>) => void
}

const initialInvestments: Investment[] = [
  {
    id: 'inv-1',
    userId: 'demo-user-finup-2026',
    ticker: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    quantity: 0.045,
    averagePrice: 320000.00,
    currentPrice: 385000.00,
    change24h: 3.42,
  },
  {
    id: 'inv-2',
    userId: 'demo-user-finup-2026',
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    quantity: 0.65,
    averagePrice: 14500.00,
    currentPrice: 17200.00,
    change24h: 1.85,
  },
  {
    id: 'inv-3',
    userId: 'demo-user-finup-2026',
    ticker: 'PETR4',
    name: 'Petrobras PN',
    type: 'stock',
    quantity: 120,
    averagePrice: 34.20,
    currentPrice: 37.80,
    change24h: -0.65,
  },
  {
    id: 'inv-4',
    userId: 'demo-user-finup-2026',
    ticker: 'VALE3',
    name: 'Vale S.A.',
    type: 'stock',
    quantity: 80,
    averagePrice: 62.10,
    currentPrice: 64.90,
    change24h: 0.95,
  }
]

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => {
      const calcTotals = (list: Investment[]) => {
        const invested = list.reduce((acc, i) => acc + i.quantity * i.averagePrice, 0)
        const current = list.reduce((acc, i) => acc + i.quantity * i.currentPrice, 0)
        return { totalInvested: invested, totalCurrentValue: current }
      }

      const totals = calcTotals(initialInvestments)

      return {
        investments: initialInvestments,
        totalInvested: totals.totalInvested,
        totalCurrentValue: totals.totalCurrentValue,
        setInvestments: (investments) => {
          const t = calcTotals(investments)
          set({ investments, ...t })
        },
        addInvestment: (inv) => {
          const updated = [...get().investments, inv]
          const t = calcTotals(updated)
          set({ investments: updated, ...t })
        },
        updatePrices: (prices) => {
          const updated = get().investments.map(item => {
            const data = prices[item.ticker]
            if (data) {
              return { ...item, currentPrice: data.price, change24h: data.change24h }
            }
            return item
          })
          const t = calcTotals(updated)
          set({ investments: updated, ...t })
        }
      }
    },
    { name: 'finup-portfolio-storage' }
  )
)
