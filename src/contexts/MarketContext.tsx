import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchLiveMarketQuotes, FALLBACK_MARKET_QUOTES, type MarketQuote } from '../services/marketService'

interface MarketContextType {
  quotes: MarketQuote[]
  loading: boolean
  lastUpdated: Date
  refresh: () => Promise<void>
}

const MarketContext = createContext<MarketContextType>({
  quotes: FALLBACK_MARKET_QUOTES,
  loading: false,
  lastUpdated: new Date(),
  refresh: async () => {}
})

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<MarketQuote[]>(FALLBACK_MARKET_QUOTES)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await fetchLiveMarketQuotes()
      setQuotes(data)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // Atualização a cada 2 minutos
    const interval = setInterval(refresh, 120000)
    return () => clearInterval(interval)
  }, [])

  return (
    <MarketContext.Provider value={{ quotes, loading, lastUpdated, refresh }}>
      {children}
    </MarketContext.Provider>
  )
}

export const useMarket = () => useContext(MarketContext)
