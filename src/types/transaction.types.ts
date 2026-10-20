export type TransactionType = 'income' | 'expense' | 'pix' | 'transfer' | 'bill_payment'

export type TransactionCategory =
  | 'Alimentação'
  | 'Moradia'
  | 'Transporte'
  | 'Saúde'
  | 'Lazer'
  | 'Salário'
  | 'Investimentos'
  | 'Educação'
  | 'Outros'

export interface Transaction {
  id: string
  userId: string
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  date: string
  bankConnectionId?: string
  status?: 'completed' | 'pending'
  createdAt: string
}
