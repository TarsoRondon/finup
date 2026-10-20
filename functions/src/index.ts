import { initializeApp } from 'firebase-admin/app'
initializeApp()

export { createPluggyToken } from './pluggy/createToken'
export { syncBankTransactions } from './pluggy/syncTransactions'
export { getCryptoPrices } from './market/getCrypto'
export { getStockPrices } from './market/getStocks'
export { getExchangeRates } from './market/getExchange'
