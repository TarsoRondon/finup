import { onRequest } from 'firebase-functions/v2/https'
import axios from 'axios'

export const getExchangeRates = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')

  try {
    const { data } = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL')
    res.status(200).json(data)
  } catch (error: any) {
    console.error('Erro getExchangeRates:', error.message)
    res.status(500).json({ error: 'Erro ao obter taxas de câmbio.' })
  }
})
