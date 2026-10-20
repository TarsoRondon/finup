import { onCall, HttpsError } from 'firebase-functions/v2/https'
import axios from 'axios'

export const createPluggyToken = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'É necessário estar logado no sistema para conectar contas.')
  }

  const clientId = process.env.PLUGGY_CLIENT_ID
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new HttpsError('internal', 'Configurações de integração com a Pluggy ausentes no servidor.')
  }

  try {
    // 1. Obter API Key da Pluggy
    const authResponse = await axios.post('https://api.pluggy.ai/auth', {
      clientId,
      clientSecret,
    })
    const apiKey = authResponse.data.apiKey

    // 2. Gerar Token efêmero de conexão
    const tokenResponse = await axios.post(
      'https://api.pluggy.ai/connect_token',
      {},
      { headers: { 'X-API-KEY': apiKey } }
    )

    return { connectToken: tokenResponse.data.accessToken }
  } catch (error: any) {
    console.error('Erro na autenticação Pluggy:', error.response?.data || error.message)
    throw new HttpsError('internal', 'Falha ao comunicar com a rede do Open Finance.')
  }
})
