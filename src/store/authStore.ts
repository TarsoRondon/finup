import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL?: string | null
  isDemo?: boolean
}

interface AuthState {
  user: UserProfile | null
  loading: boolean
  isDemo: boolean
  setUser: (user: UserProfile | null) => void
  setDemoUser: () => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      isDemo: false,
      setUser: (user) => set({ user, isDemo: user?.isDemo || false, loading: false }),
      setDemoUser: () =>
        set({
          user: {
            uid: 'demo-user-finup-2026',
            email: 'tarso.rondon@ifro.edu.br',
            displayName: 'Tarso Rondon',
            photoURL: null,
            isDemo: true,
          },
          isDemo: true,
          loading: false,
        }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, isDemo: false, loading: false }),
    }),
    {
      name: 'finup-auth-storage',
      partialize: (state) => ({ user: state.user, isDemo: state.isDemo }),
    }
  )
)
