import { onRequest } from 'firebase-functions/v2/https'
import axios from 'axios'

export const getCryptoPrices = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')

  try {
    let apiKey = process.env.COINGECKO_API_KEY || ''
    // Extrai se foi salvo como URL ou como chave direta
    if (apiKey.includes('x_cg_demo_api_key=')) {
      apiKey = apiKey.split('x_cg_demo_api_key=')[1].split('&')[0]
    }

    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,solana,binancecoin',
        vs_currencies: 'brl,usd',
        include_24hr_change: true,
      },
      headers: apiKey ? {
        'x-cg-demo-api-key': apiKey,
      } : undefined,
    })
    res.status(200).json(data)
  } catch (error: any) {
    console.error('Erro getCryptoPrices:', error.message)
    res.status(500).json({ error: 'Erro ao consultar cotações de criptomoedas.' })
  }
})
