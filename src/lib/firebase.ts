import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'finup-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'finup-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'finup-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '109283746512',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:109283746512:web:987a6b5c4d3e2f1a',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app, 'southamerica-east1')
export const googleProvider = new GoogleAuthProvider()

export default app
