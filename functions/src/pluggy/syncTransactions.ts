import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import axios from 'axios'

export const syncBankTransactions = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Acesso negado: autenticação requerida.')
  }

  const { itemId } = request.data
  const uid = request.auth.uid
  const db = getFirestore()

  try {
    // 1. Autenticar na Pluggy
    const authRes = await axios.post('https://api.pluggy.ai/auth', {
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    })
    const apiKey = authRes.data.apiKey

    // 2. Obter lista de contas do banco selecionado
    const accountsRes = await axios.get(`https://api.pluggy.ai/accounts?itemId=${itemId}`, {
      headers: { 'X-API-KEY': apiKey },
    })

    const accounts = accountsRes.data.results || []
    const batch = db.batch()

    for (const account of accounts) {
      // Salva a conta
      const accountRef = db.collection('users').doc(uid).collection('accounts').doc(account.id)
      batch.set(accountRef, {
        itemId,
        bankName: account.name || 'Conta Bancária',
        type: account.type || 'checking',
        balance: account.balance || 0,
        lastSyncAt: Timestamp.now(),
      }, { merge: true })

      // 3. Buscar últimas 50 movimentações da conta
      const txRes = await axios.get(`https://api.pluggy.ai/transactions?accountId=${account.id}&pageSize=50`, {
        headers: { 'X-API-KEY': apiKey },
      })

      const transactions = txRes.data.results || []
      for (const tx of transactions) {
        const txRef = db.collection('users').doc(uid).collection('transactions').doc(tx.id)
        batch.set(txRef, {
          description: tx.description,
          amount: tx.type === 'DEBIT' ? -Math.abs(tx.amount) : Math.abs(tx.amount),
          category: tx.category || 'Outros',
          date: Timestamp.fromDate(new Date(tx.date)),
          accountId: account.id,
          source: 'pluggy',
        }, { merge: true })
      }
    }

    await batch.commit()
    return { success: true, accountsProcessed: accounts.length }
  } catch (err: any) {
    console.error('Erro ao sincronizar transações:', err.response?.data || err.message)
    throw new HttpsError('internal', 'Não foi possível completar a sincronização do banco.')
  }
})
