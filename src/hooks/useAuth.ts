import { useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const { user, loading, isDemo, setUser, setDemoUser, setLoading, logout: storeLogout } = useAuthStore()

  useEffect(() => {
    // Se o usuário está no modo demo persistido, mantém
    if (isDemo && user) {
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário',
            photoURL: currentUser.photoURL,
            isDemo: false,
          })
        } else if (!isDemo) {
          setUser(null)
        }
        setLoading(false)
      })
      return unsubscribe
    } catch (err) {
      console.warn('Firebase Auth offline ou não configurado:', err)
      setLoading(false)
    }
  }, [setUser, setLoading, isDemo, user])

  const loginEmail = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass)
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        photoURL: cred.user.photoURL,
        isDemo: false,
      })
      return cred.user
    } catch (error: any) {
      // Se Firebase falhar por chave de exemplo, permitir login de demonstração se for o e-mail padrão
      if (email === 'demo@finup.com' || email.includes('demo')) {
        setDemoUser()
        return
      }
      throw error
    }
  }

  const registerEmail = async (email: string, pass: string, name?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: name || email.split('@')[0],
      photoURL: null,
      isDemo: false,
    })
    return cred.user
  }

  const loginGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        isDemo: false,
      })
      return cred.user
    } catch (err) {
      console.warn('Google popup error / cancelado:', err)
      throw err
    }
  }

  const loginDemo = () => {
    setDemoUser()
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.warn('SignOut error:', err)
    }
    storeLogout()
  }

  return {
    user,
    loading,
    isDemo,
    loginEmail,
    registerEmail,
    loginGoogle,
    loginDemo,
    logout,
  }
}
