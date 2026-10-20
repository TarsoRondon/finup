import { onRequest } from 'firebase-functions/v2/https'
import axios from 'axios'

export const getStockPrices = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')

  const tickers = (req.query.tickers as string) || 'PETR4,VALE3,ITUB4,BBDC4'
  try {
    const { data } = await axios.get(`https://brapi.dev/api/quote/${tickers}`, {
      params: { token: process.env.BRAPI_TOKEN },
    })
    res.status(200).json(data.results || [])
  } catch (error: any) {
    console.error('Erro getStockPrices:', error.message)
    res.status(500).json({ error: 'Erro ao consultar cotações da B3.' })
  }
})
