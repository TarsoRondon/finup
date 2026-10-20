export interface MarketQuote {
  ticker: string
  name: string
  price: number
  change24h: number
  category: 'crypto' | 'currency' | 'stock'
}

export const FALLBACK_MARKET_QUOTES: MarketQuote[] = [
  { ticker: 'BTC', name: 'Bitcoin', price: 382450.00, change24h: 2.84, category: 'crypto' },
  { ticker: 'ETH', name: 'Ethereum', price: 16890.00, change24h: 1.45, category: 'crypto' },
  { ticker: 'USD', name: 'Dólar Comercial', price: 5.58, change24h: -0.32, category: 'currency' },
  { ticker: 'EUR', name: 'Euro', price: 6.08, change24h: 0.12, category: 'currency' },
  { ticker: 'PETR4', name: 'Petrobras PN', price: 37.85, change24h: 1.15, category: 'stock' },
  { ticker: 'VALE3', name: 'Vale S.A.', price: 63.40, change24h: -0.80, category: 'stock' },
  { ticker: 'ITUB4', name: 'Itaú Unibanco', price: 35.10, change24h: 0.65, category: 'stock' }
]

export async function fetchLiveMarketQuotes(): Promise<MarketQuote[]> {
  const results: MarketQuote[] = [...FALLBACK_MARKET_QUOTES]

  try {
    // 1. AwesomeAPI (Dólar, Euro, Bitcoin) - Alta disponibilidade e gratuita
    const resCurrencies = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
    if (resCurrencies.ok) {
      const data = await resCurrencies.json()

      if (data.USDBRL) {
        const usdIndex = results.findIndex(r => r.ticker === 'USD')
        if (usdIndex >= 0) {
          results[usdIndex] = {
            ...results[usdIndex],
            price: parseFloat(data.USDBRL.bid),
            change24h: parseFloat(data.USDBRL.pctChange)
          }
        }
      }

      if (data.EURBRL) {
        const eurIndex = results.findIndex(r => r.ticker === 'EUR')
        if (eurIndex >= 0) {
          results[eurIndex] = {
            ...results[eurIndex],
            price: parseFloat(data.EURBRL.bid),
            change24h: parseFloat(data.EURBRL.pctChange)
          }
        }
      }

      if (data.BTCBRL) {
        const btcIndex = results.findIndex(r => r.ticker === 'BTC')
        if (btcIndex >= 0) {
          results[btcIndex] = {
            ...results[btcIndex],
            price: parseFloat(data.BTCBRL.bid),
            change24h: parseFloat(data.BTCBRL.pctChange)
          }
        }
      }
    }
  } catch (err) {
    console.warn('Cotações de moedas offline, utilizando cache inteligente:', err)
  }

  try {
    // 2. CoinGecko para Ethereum
    const resEth = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl&include_24hr_change=true')
    if (resEth.ok) {
      const data = await resEth.json()
      if (data.ethereum) {
        const ethIndex = results.findIndex(r => r.ticker === 'ETH')
        if (ethIndex >= 0) {
          results[ethIndex] = {
            ...results[ethIndex],
            price: data.ethereum.brl,
            change24h: parseFloat(data.ethereum.brl_24h_change?.toFixed(2) || '0')
          }
        }
      }
    }
  } catch (err) {
    console.warn('CoinGecko offline, utilizando fallback:', err)
  }

  return results
}
