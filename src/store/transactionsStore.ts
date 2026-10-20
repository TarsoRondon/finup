import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '../types/transaction.types'

interface TransactionsState {
  transactions: Transaction[]
  balance: number
  totalIncome: number
  totalExpense: number
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => void
  removeTransaction: (id: string) => void
}

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'demo-user-finup-2026',
    description: 'Salário Mensal',
    amount: 5400.00,
    type: 'income',
    category: 'Salário',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-2',
    userId: 'demo-user-finup-2026',
    description: 'Supermercado e Feira',
    amount: 680.50,
    type: 'expense',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-3',
    userId: 'demo-user-finup-2026',
    description: 'Internet Fibra Óptica',
    amount: 119.90,
    type: 'expense',
    category: 'Moradia',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-4',
    userId: 'demo-user-finup-2026',
    description: 'Rendimento CDB 100% CDI',
    amount: 142.30,
    type: 'income',
    category: 'Investimentos',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }
]

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => {
      const calculateTotals = (list: Transaction[]) => {
        const income = list.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
        const expense = list.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
        return { totalIncome: income, totalExpense: expense, balance: income - expense }
      }

      const initialTotals = calculateTotals(initialTransactions)

      return {
        transactions: initialTransactions,
        balance: initialTotals.balance,
        totalIncome: initialTotals.totalIncome,
        totalExpense: initialTotals.totalExpense,
        setTransactions: (transactions) => {
          const totals = calculateTotals(transactions)
          set({ transactions, ...totals })
        },
        addTransaction: (tx) => {
          const updated = [tx, ...get().transactions]
          const totals = calculateTotals(updated)
          set({ transactions: updated, ...totals })
        },
        removeTransaction: (id) => {
          const updated = get().transactions.filter(t => t.id !== id)
          const totals = calculateTotals(updated)
          set({ transactions: updated, ...totals })
        },
      }
    },
    { name: 'finup-transactions-storage' }
  )
)
