export type AssetType = 'crypto' | 'stock' | 'fii' | 'fixed_income'

export interface Investment {
  id: string
  userId: string
  ticker: string
  name: string
  type: AssetType
  quantity: number
  averagePrice: number
  currentPrice: number
  change24h?: number
  updatedAt?: string
}
