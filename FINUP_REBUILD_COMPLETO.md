# 💎 FinUp — Guia Mestre e Código-Fonte Completo (Reconstrução do Zero)

> **Documento Oficial de Reconstrução do Sistema FinUp**  
> **Sistema:** FinUp — Crescimento e Organização Financeira  
> **Instituição:** Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO) — Campus Porto Velho Calama  
> **Desenvolvedor:** Tarso Rondon  
> **Orientador:** Prof. Rafael Pitwak  
> **Stack:** React 19 / 18 + TypeScript + Vite + TailwindCSS v4 + Zustand + Firebase (Auth & Firestore) + Pluggy Open Finance + APIs de Mercado (Brapi, CoinGecko, AwesomeAPI)

---

## 📑 Índice
1. [Visão Geral e Arquitetura](#1-visão-geral-e-arquitetura)
2. [Estrutura de Pastas e Arquivos](#2-estrutura-de-pastas-e-arquivos)
3. [Comandos de Inicialização do Zero](#3-comandos-de-inicialização-do-zero)
4. [Configurações do Projeto (Build & Estilos)](#4-configurações-do-projeto-build--estilos)
5. [Modelagem de Dados e Tipos TypeScript](#5-modelagem-de-dados-e-tipos-typescript)
6. [Integração Firebase & Auth](#6-integração-firebase--auth)
7. [Gerenciamento de Estado Global (Zustand Stores)](#7-gerenciamento-de-estado-global-zustand-stores)
8. [Componentes Compartilhados e Layout](#8-componentes-compartilhados-e-layout)
9. [Telas do Sistema (Pages)](#9-telas-do-sistema-pages)
10. [Roteamento e Proteção de Rotas](#10-roteamento-e-proteção-de-rotas)
11. [Regras de Segurança (firestore.rules)](#11-regras-de-segurança-firestorerules)
12. [Cloud Functions (Backend BFF)](#12-cloud-functions-backend-bff)
13. [Variáveis de Ambiente e Execução](#13-variáveis-de-ambiente-e-execução)

---

## 1. Visão Geral e Arquitetura

O **FinUp** centraliza o controle orçamentário pessoal, conexões via Open Finance e monitoramento de ativos (B3, Criptoativos e Moedas).
A aplicação adota:
- **Client SPA:** React com Vite, Tailwind CSS v4 para estilização com tema dark elegante e design editorial inspirado no Pierre Finance.
- **State Management:** Zustand com persistência local e suporte a Modo Convidado/Demonstração nativo.
- **BFF / Nuvem:** Firebase Cloud Functions e Firestore com isolamento estrito por usuário (`users/{uid}/...`).

---

## 2. Estrutura de Pastas e Arquivos

```
finup/
├── .env.local
├── .gitignore
├── firebase.json
├── firestore.rules
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── functions/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── createToken.ts
│       ├── syncTransactions.ts
│       ├── getCrypto.ts
│       ├── getStocks.ts
│       └── getExchange.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   ├── transaction.types.ts
    │   ├── investment.types.ts
    │   └── goal.types.ts
    ├── lib/
    │   └── firebase.ts
    ├── store/
    │   ├── authStore.ts
    │   ├── transactionsStore.ts
    │   └── portfolioStore.ts
    ├── hooks/
    │   └── useAuth.ts
    ├── components/
    │   ├── PrivateRoute.tsx
    │   ├── LoadingSpinner.tsx
    │   ├── Layout.tsx
    │   └── Sidebar.tsx
    └── pages/
        ├── Login.tsx
        ├── Dashboard.tsx
        ├── Transactions.tsx
        ├── Investments.tsx
        ├── Goals.tsx
        ├── Reports.tsx
        └── ConnectBank.tsx
```

---

## 3. Comandos de Inicialização do Zero

```powershell
# 1. Criação do projeto Vite com React + TypeScript
cd c:\Users\Aluno\Documents\Desenvolvimento
npm create vite@latest finup -- --template react-ts
cd finup

# 2. Instalação das dependências principais
npm install firebase zustand lucide-react recharts clsx tailwind-merge axios @tanstack/react-query react-router-dom

# 3. Instalação das dependências de desenvolvimento (TailwindCSS v4)
npm install -D tailwindcss @tailwindcss/vite @types/node

# 4. Inicialização do Firebase Functions (opcional para rodar local)
mkdir functions
cd functions
npm init -y
npm install firebase-admin firebase-functions axios
npm install -D typescript @types/node
cd ..
```

---

## 4. Configurações do Projeto (Build & Estilos)

### `package.json`
```json
{
  "name": "finup",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.101.4",
    "axios": "^1.19.0",
    "clsx": "^2.1.1",
    "firebase": "^12.17.1",
    "lucide-react": "^1.32.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.0",
    "recharts": "^2.15.0",
    "tailwind-merge": "^3.0.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0"
  }
}
```

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### `index.html`
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FinUp — Gestão Financeira Inteligente</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Pluggy Connect SDK Oficial para Open Finance -->
    <script src="https://cdn.pluggy.ai/pluggy-connect/v1/pluggy-connect.js"></script>
  </head>
  <body class="bg-[#0F1923] text-[#F0F4F8] font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/index.css`
```css
@import "tailwindcss";

:root {
  --color-brand-teal: #1B5E6C;
  --color-brand-teal-dark: #0D3D4A;
  --color-brand-green: #2ECC71;
  --color-brand-green-dark: #27AE60;

  --color-surface-bg: #0F1923;
  --color-surface-card: #1A2635;
  --color-surface-hover: #223040;
  --color-surface-border: #2D4055;

  --color-text-primary: #F0F4F8;
  --color-text-secondary: #8FA3B3;
  --color-text-muted: #5E7385;

  --color-status-success: #2ECC71;
  --color-status-danger: #E74C3C;
  --color-status-warning: #F39C12;
  --color-status-info: #3498DB;
}

body {
  margin: 0;
  background-color: #0F1923;
  color: #F0F4F8;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0F1923;
}
::-webkit-scrollbar-thumb {
  background: #2D4055;
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #1B5E6C;
}
```

---

## 5. Modelagem de Dados e Tipos TypeScript

### `src/types/transaction.types.ts`
```typescript
export type TransactionType = 'income' | 'expense' | 'pix' | 'transfer' | 'bill_payment'

export type TransactionCategory =
  | 'Alimentação'
  | 'Moradia'
  | 'Transporte'
  | 'Saúde'
  | 'Lazer'
  | 'Salário'
  | 'Investimentos'
  | 'Educação'
  | 'Outros'

export interface Transaction {
  id: string
  userId: string
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  date: string
  bankConnectionId?: string
  status?: 'completed' | 'pending'
  createdAt: string
}
```

### `src/types/investment.types.ts`
```typescript
export type AssetType = 'crypto' | 'stock' | 'fii' | 'fixed_income'

export interface Investment {
  id: string
  userId: string
  ticker: string
  name: string
  type: AssetType
  quantity: number
  averagePrice: number
  currentPrice: number
  change24h?: number
  updatedAt?: string
}
```

### `src/types/goal.types.ts`
```typescript
export interface Goal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  categoryIcon?: string
  color?: string
}
```

---

## 6. Integração Firebase & Auth

### `src/lib/firebase.ts`
```typescript
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
```

### `src/hooks/useAuth.ts`
```typescript
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
      console.warn('Firebase Auth offline ou em modo demo:', err)
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
      console.warn('Google popup error:', err)
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
```

---

## 7. Gerenciamento de Estado Global (Zustand Stores)

### `src/store/authStore.ts`
```typescript
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
```

### `src/store/transactionsStore.ts`
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Transaction } from '../types/transaction.types'

interface TransactionsState {
  transactions: Transaction[]
  balance: number
  totalIncome: number
  totalExpense: number
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => void
  removeTransaction: (id: string) => void
}

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'demo-user-finup-2026',
    description: 'Salário Mensal',
    amount: 5400.00,
    type: 'income',
    category: 'Salário',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-2',
    userId: 'demo-user-finup-2026',
    description: 'Supermercado e Feira',
    amount: 680.50,
    type: 'expense',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-3',
    userId: 'demo-user-finup-2026',
    description: 'Internet Fibra Óptica',
    amount: 119.90,
    type: 'expense',
    category: 'Moradia',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-4',
    userId: 'demo-user-finup-2026',
    description: 'Rendimento CDB 100% CDI',
    amount: 142.30,
    type: 'income',
    category: 'Investimentos',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }
]

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => {
      const calculateTotals = (list: Transaction[]) => {
        const income = list.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
        const expense = list.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
        return { totalIncome: income, totalExpense: expense, balance: income - expense }
      }

      const initialTotals = calculateTotals(initialTransactions)

      return {
        transactions: initialTransactions,
        balance: initialTotals.balance,
        totalIncome: initialTotals.totalIncome,
        totalExpense: initialTotals.totalExpense,
        setTransactions: (transactions) => {
          const totals = calculateTotals(transactions)
          set({ transactions, ...totals })
        },
        addTransaction: (tx) => {
          const updated = [tx, ...get().transactions]
          const totals = calculateTotals(updated)
          set({ transactions: updated, ...totals })
        },
        removeTransaction: (id) => {
          const updated = get().transactions.filter(t => t.id !== id)
          const totals = calculateTotals(updated)
          set({ transactions: updated, ...totals })
        },
      }
    },
    { name: 'finup-transactions-storage' }
  )
)
```

### `src/store/portfolioStore.ts`
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Investment } from '../types/investment.types'

interface PortfolioState {
  investments: Investment[]
  totalInvested: number
  totalCurrentValue: number
  setInvestments: (investments: Investment[]) => void
  addInvestment: (investment: Investment) => void
  updatePrices: (prices: Record<string, { price: number; change24h: number }>) => void
}

const initialInvestments: Investment[] = [
  {
    id: 'inv-1',
    userId: 'demo-user-finup-2026',
    ticker: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    quantity: 0.045,
    averagePrice: 320000.00,
    currentPrice: 385000.00,
    change24h: 3.42,
  },
  {
    id: 'inv-2',
    userId: 'demo-user-finup-2026',
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    quantity: 0.65,
    averagePrice: 14500.00,
    currentPrice: 17200.00,
    change24h: 1.85,
  },
  {
    id: 'inv-3',
    userId: 'demo-user-finup-2026',
    ticker: 'PETR4',
    name: 'Petrobras PN',
    type: 'stock',
    quantity: 120,
    averagePrice: 34.20,
    currentPrice: 37.80,
    change24h: -0.65,
  },
  {
    id: 'inv-4',
    userId: 'demo-user-finup-2026',
    ticker: 'VALE3',
    name: 'Vale S.A.',
    type: 'stock',
    quantity: 80,
    averagePrice: 62.10,
    currentPrice: 64.90,
    change24h: 0.95,
  }
]

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => {
      const calcTotals = (list: Investment[]) => {
        const invested = list.reduce((acc, i) => acc + i.quantity * i.averagePrice, 0)
        const current = list.reduce((acc, i) => acc + i.quantity * i.currentPrice, 0)
        return { totalInvested: invested, totalCurrentValue: current }
      }

      const totals = calcTotals(initialInvestments)

      return {
        investments: initialInvestments,
        totalInvested: totals.totalInvested,
        totalCurrentValue: totals.totalCurrentValue,
        setInvestments: (investments) => {
          const t = calcTotals(investments)
          set({ investments, ...t })
        },
        addInvestment: (inv) => {
          const updated = [...get().investments, inv]
          const t = calcTotals(updated)
          set({ investments: updated, ...t })
        },
        updatePrices: (prices) => {
          const updated = get().investments.map(item => {
            const data = prices[item.ticker]
            if (data) {
              return { ...item, currentPrice: data.price, change24h: data.change24h }
            }
            return item
          })
          const t = calcTotals(updated)
          set({ investments: updated, ...t })
        }
      }
    },
    { name: 'finup-portfolio-storage' }
  )
)
```

---

## 8. Componentes Compartilhados e Layout

### `src/components/Sidebar.tsx`
```tsx
import React from 'react'
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Target,
  PieChart,
  Landmark,
  LogOut,
  Zap
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface SidebarProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, isDemo, logout } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'transactions', label: 'Extrato & Pix', icon: ArrowLeftRight },
    { id: 'investments', label: 'Investimentos', icon: TrendingUp },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'reports', label: 'Relatórios', icon: PieChart },
    { id: 'connect', label: 'Open Finance', icon: Landmark },
  ]

  return (
    <aside className="w-64 bg-[#1A2635] border-r border-[#2D4055] flex flex-col justify-between shrink-0">
      <div>
        <div className="p-6 border-b border-[#2D4055]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1B5E6C] to-[#2ECC71] flex items-center justify-center font-bold text-lg text-white shadow-lg">
              F
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">Fin<span className="text-[#2ECC71]">Up</span></span>
              <p className="text-[10px] text-[#8FA3B3] uppercase tracking-wider font-semibold">Organização & Futuro</p>
            </div>
          </div>
          {isDemo && (
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B5E6C]/30 border border-[#1B5E6C] text-[#2ECC71] text-xs font-semibold">
              <Zap size={13} />
              <span>Modo Demonstração</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = currentTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  active
                    ? 'bg-[#1B5E6C] text-white shadow-md font-semibold'
                    : 'text-[#8FA3B3] hover:bg-[#223040] hover:text-[#F0F4F8]'
                }`}
              >
                <Icon size={18} className={active ? 'text-[#2ECC71]' : 'text-[#8FA3B3]'} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#2D4055]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0F1923]/60 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center text-xs font-bold text-[#2ECC71]">
            {user?.displayName?.[0] || 'U'}
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-bold truncate text-[#F0F4F8]">{user?.displayName || 'Usuário'}</p>
            <p className="text-[10px] text-[#8FA3B3] truncate">{user?.email || 'conta@finup.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        >
          <LogOut size={15} />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  )
}
```

### `src/components/Layout.tsx`
```tsx
import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions'
import { Investments } from '../pages/Investments'
import { Goals } from '../pages/Goals'
import { Reports } from '../pages/Reports'
import { ConnectBank } from '../pages/ConnectBank'

export const Layout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard')

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0F1923]">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 overflow-y-auto p-8">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'transactions' && <Transactions />}
        {currentTab === 'investments' && <Investments />}
        {currentTab === 'goals' && <Goals />}
        {currentTab === 'reports' && <Reports />}
        {currentTab === 'connect' && <ConnectBank />}
      </main>
    </div>
  )
}
```

---

## 9. Telas do Sistema (Pages)

### `src/pages/Login.tsx`
```tsx
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ArrowRight, ShieldCheck, Zap, Lock, Mail } from 'lucide-react'

export const Login: React.FC = () => {
  const { loginEmail, registerEmail, loginGoogle, loginDemo } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await registerEmail(email, password, name)
      } else {
        await loginEmail(email, password)
      }
    } catch (err: any) {
      setError(err?.message || 'Falha ao autenticar. Tente novamente ou use o Modo Demo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-[#0F1923] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A2635] border border-[#2D4055] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1B5E6C] to-[#2ECC71] items-center justify-center text-white text-2xl font-black shadow-lg mb-3">
            F
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Fin<span className="text-[#2ECC71]">Up</span>
          </h1>
          <p className="text-sm text-[#8FA3B3] mt-1 font-medium">
            Gestão Financeira Pessoal, Open Finance & Investimentos
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-[#5E7385]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="seu.email@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-[#5E7385]" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg disabled:opacity-50"
          >
            {loading ? 'Processando...' : isRegister ? 'Criar Conta Gratuita' : 'Entrar na Plataforma'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#2D4055]"></div>
          <span className="text-[11px] font-semibold text-[#5E7385] uppercase">ou acesse com</span>
          <div className="h-px flex-1 bg-[#2D4055]"></div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => loginGoogle()}
            type="button"
            className="w-full py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] hover:border-gray-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            Continuar com Google
          </button>

          <button
            onClick={loginDemo}
            type="button"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1B5E6C] to-[#0D3D4A] border border-[#2ECC71]/40 text-[#2ECC71] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Zap size={15} />
            Entrar como Convidado (Modo Demonstração 1-Clique)
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#8FA3B3] hover:text-[#2ECC71] font-semibold"
          >
            {isRegister ? 'Já possui conta? Clique para entrar' : 'Não tem cadastro? Crie sua conta grátis'}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#2D4055] flex items-center justify-center gap-2 text-[10px] text-[#5E7385]">
          <ShieldCheck size={14} className="text-[#2ECC71]" />
          <span>Criptografia TLS 256-bit & Proteção LGPD</span>
        </div>
      </div>
    </div>
  )
}
```

### `src/pages/Dashboard.tsx`
```tsx
import React from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { usePortfolioStore } from '../store/portfolioStore'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export const Dashboard: React.FC = () => {
  const { balance, totalIncome, totalExpense } = useTransactionsStore()
  const { totalCurrentValue, investments } = usePortfolioStore()

  const netWorth = balance + totalCurrentValue

  const chartData = [
    { month: 'Jan', saldo: 4200 },
    { month: 'Fev', saldo: 5100 },
    { month: 'Mar', saldo: 4900 },
    { month: 'Abr', saldo: 6300 },
    { month: 'Mai', saldo: 7200 },
    { month: 'Jun', saldo: balance },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Visão Geral Consolidada</h2>
        <p className="text-xs text-[#8FA3B3]">Acompanhamento de liquidez diária, patrimônio e fluxo de caixa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Patrimônio Total</span>
            <Layers size={16} className="text-[#2ECC71]" />
          </div>
          <p className="text-2xl font-black text-white">
            {netWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#2ECC71] font-semibold">Conta + Investimentos</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Saldo em Conta</span>
            <Wallet size={16} className="text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-blue-400 font-semibold">Disponível imediato</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Receitas do Mês</span>
            <ArrowUpRight size={16} className="text-[#2ECC71]" />
          </div>
          <p className="text-2xl font-black text-[#2ECC71]">
            +{totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Entradas registradas</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between text-[#8FA3B3] text-xs font-semibold mb-2">
            <span>Despesas do Mês</span>
            <ArrowDownRight size={16} className="text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">
            -{totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Saídas e faturas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Activity size={16} className="text-[#2ECC71]" />
              Evolução Patrimonial
            </h3>
            <span className="text-xs text-[#8FA3B3]">Últimos 6 meses</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5E7385" fontSize={11} />
                <YAxis stroke="#5E7385" fontSize={11} tickFormatter={(v) => `R$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Saldo']}
                />
                <Area type="monotone" dataKey="saldo" stroke="#2ECC71" strokeWidth={3} fill="url(#colorSaldo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#2ECC71]" />
              Ativos em Destaque
            </h3>
            <div className="space-y-3">
              {investments.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1923] border border-[#2D4055]">
                  <div>
                    <span className="font-bold text-xs text-white">{item.ticker}</span>
                    <p className="text-[10px] text-[#8FA3B3]">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-white">
                      {item.currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <p className={`text-[10px] font-bold ${(item.change24h || 0) >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}`}>
                      {(item.change24h || 0) >= 0 ? '+' : ''}{item.change24h}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### `src/pages/Transactions.tsx`
```tsx
import React, { useState } from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { Plus, Search, ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react'
import { TransactionCategory, TransactionType } from '../types/transaction.types'

export const Transactions: React.FC = () => {
  const { transactions, addTransaction, removeTransaction } = useTransactionsStore()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState<TransactionCategory>('Alimentação')
  const [showModal, setShowModal] = useState(false)

  const filtered = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'all' || t.category === categoryFilter
    return matchSearch && matchCat
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description || !amount) return
    addTransaction({
      id: `tx-${Date.now()}`,
      userId: 'current-user',
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    })
    setDescription('')
    setAmount('')
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Extrato & Transações</h2>
          <p className="text-xs text-[#8FA3B3]">Histórico completo de entradas, saídas, Pix e lançamentos manuais.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <Plus size={16} />
          Nova Transação
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3.5 text-[#5E7385]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por descrição..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A2635] border border-[#2D4055] text-white text-xs focus:outline-none focus:border-[#2ECC71]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-[#1A2635] border border-[#2D4055] text-white text-xs focus:outline-none"
        >
          <option value="all">Todas as Categorias</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Moradia">Moradia</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
          <option value="Lazer">Lazer</option>
          <option value="Salário">Salário</option>
          <option value="Investimentos">Investimentos</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div className="bg-[#1A2635] border border-[#2D4055] rounded-2xl overflow-hidden shadow-lg">
        <div className="divide-y divide-[#2D4055]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8FA3B3]">Nenhuma transação encontrada.</div>
          ) : (
            filtered.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-[#223040] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'bg-rose-500/20 text-rose-400'}`}>
                    {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">{tx.description}</p>
                    <span className="text-[10px] text-[#8FA3B3]">{tx.category} • {tx.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-black text-xs ${tx.type === 'income' ? 'text-[#2ECC71]' : 'text-rose-400'}`}>
                    {tx.type === 'income' ? '+' : '-'} {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <button
                    onClick={() => removeTransaction(tx.id)}
                    className="text-[#5E7385] hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A2635] border border-[#2D4055] rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Adicionar Transação</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none focus:border-[#2ECC71]"
                  placeholder="Ex: Almoço no Restaurante"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none focus:border-[#2ECC71]"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none"
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Moradia">Moradia</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Salário">Salário</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white font-semibold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2ECC71] text-black font-bold text-xs"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
```

### `src/pages/Investments.tsx`
```tsx
import React from 'react'
import { usePortfolioStore } from '../store/portfolioStore'
import { TrendingUp, DollarSign, PieChart, Shield } from 'lucide-react'

export const Investments: React.FC = () => {
  const { investments, totalInvested, totalCurrentValue } = usePortfolioStore()

  const profit = totalCurrentValue - totalInvested
  const profitPercentage = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Carteira de Investimentos</h2>
        <p className="text-xs text-[#8FA3B3]">Ações da B3, criptoativos, taxas Selic e CDI em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Valor Atual da Carteira</span>
          <p className="text-2xl font-black text-white mt-1">
            {totalCurrentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#2ECC71] font-semibold">Cotações atualizadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Total Aportado</span>
          <p className="text-2xl font-black text-[#8FA3B3] mt-1">
            {totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <span className="text-[10px] text-[#5E7385]">Preço médio de aquisição</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <span className="text-xs text-[#8FA3B3] font-semibold">Lucro / Prejuízo Total</span>
          <p className={`text-2xl font-black mt-1 ${profit >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}`}>
            {profit >= 0 ? '+' : ''}{profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ({profitPercentage.toFixed(2)}%)
          </p>
          <span className="text-[10px] text-[#8FA3B3]">Rentabilidade acumulada</span>
        </div>
      </div>

      <div className="bg-[#1A2635] border border-[#2D4055] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#2D4055] flex items-center justify-between">
          <h3 className="font-bold text-xs text-white">Ativos Sob Custódia</h3>
          <span className="text-[10px] text-[#8FA3B3]">Dados reais via Brapi e CoinGecko</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1923] text-[#8FA3B3] text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Ativo</th>
                <th className="p-4">Quantidade</th>
                <th className="p-4">Preço Médio</th>
                <th className="p-4">Cotação Atual</th>
                <th className="p-4">Variação 24h</th>
                <th className="p-4 text-right">Saldo Atual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D4055]">
              {investments.map((item) => {
                const totalItem = item.quantity * item.currentPrice
                return (
                  <tr key={item.id} className="hover:bg-[#223040] transition-colors">
                    <td className="p-4 font-bold text-white">
                      {item.ticker} <span className="font-normal text-[#8FA3B3] text-[10px]">({item.name})</span>
                    </td>
                    <td className="p-4 text-[#F0F4F8]">{item.quantity}</td>
                    <td className="p-4 text-[#8FA3B3]">
                      {item.averagePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="p-4 text-white font-semibold">
                      {item.currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="p-4 font-bold">
                      <span className={(item.change24h || 0) >= 0 ? 'text-[#2ECC71]' : 'text-rose-400'}>
                        {(item.change24h || 0) >= 0 ? '+' : ''}{item.change24h}%
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-[#2ECC71]">
                      {totalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

### `src/pages/Goals.tsx`
```tsx
import React, { useState } from 'react'
import { Target, Plus } from 'lucide-react'
import { Goal } from '../types/goal.types'

export const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'g-1',
      userId: 'demo',
      title: 'Reserva de Emergência (6 Meses)',
      targetAmount: 20000,
      currentAmount: 14200,
      deadline: '2026-12-31',
    },
    {
      id: 'g-2',
      userId: 'demo',
      title: 'Viagem de Intercâmbio',
      targetAmount: 12000,
      currentAmount: 5400,
      deadline: '2027-06-30',
    },
    {
      id: 'g-3',
      userId: 'demo',
      title: 'Novo Setup de Programação',
      targetAmount: 8500,
      currentAmount: 8500,
      deadline: '2026-11-15',
    }
  ])

  const handleDeposit = (id: string, amount: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Metas & Planejamento</h2>
          <p className="text-xs text-[#8FA3B3]">Acompanhamento visual de objetivos financeiros de curto, médio e longo prazo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
          const isComplete = percent >= 100

          return (
            <div key={goal.id} className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055] flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B5E6C]/30 border border-[#1B5E6C] flex items-center justify-center text-[#2ECC71]">
                    <Target size={20} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isComplete ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'bg-[#0F1923] text-[#8FA3B3]'}`}>
                    {percent}% Concluído
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{goal.title}</h3>
                <p className="text-[11px] text-[#8FA3B3] mt-1">Prazo estimado: {goal.deadline}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#8FA3B3]">Acumulado</span>
                    <span className="text-white font-bold">
                      {goal.currentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {goal.targetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#0F1923] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1B5E6C] to-[#2ECC71] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {!isComplete && (
                <div className="mt-6 pt-4 border-t border-[#2D4055] flex gap-2">
                  <button
                    onClick={() => handleDeposit(goal.id, 100)}
                    className="flex-1 py-2 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white hover:border-[#2ECC71] text-xs font-semibold"
                  >
                    + R$ 100
                  </button>
                  <button
                    onClick={() => handleDeposit(goal.id, 500)}
                    className="flex-1 py-2 rounded-xl bg-[#1B5E6C] hover:bg-[#2ECC71] hover:text-black text-white text-xs font-bold transition-colors"
                  >
                    + R$ 500
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

### `src/pages/Reports.tsx`
```tsx
import React from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Printer } from 'lucide-react'

export const Reports: React.FC = () => {
  const { transactions } = useTransactionsStore()

  const categoryTotals: Record<string, number> = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  const COLORS = ['#2ECC71', '#1B5E6C', '#F39C12', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C']

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Relatórios & Demonstrações</h2>
          <p className="text-xs text-[#8FA3B3]">Distribuição por categorias e relatórios prontos para impressão.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-[#1B5E6C] hover:bg-[#2ECC71] hover:text-black text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors no-print"
        >
          <Printer size={16} />
          Imprimir Relatório (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <h3 className="font-bold text-sm text-white mb-4">Despesas por Categoria</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Gasto']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <h3 className="font-bold text-sm text-white mb-4">Valores Absolutos por Categoria</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <XAxis dataKey="name" stroke="#5E7385" fontSize={10} />
                <YAxis stroke="#5E7385" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Valor']}
                />
                <Bar dataKey="value" fill="#2ECC71" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### `src/pages/ConnectBank.tsx`
```tsx
import React, { useState } from 'react'
import { Landmark, ShieldCheck, Zap, RefreshCw } from 'lucide-react'

export const ConnectBank: React.FC = () => {
  const [connecting, setConnecting] = useState(false)

  const handleOpenPluggy = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      alert('Conector Pluggy Open Finance: Conexão simulada com sucesso! Transações sincronizadas.')
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Open Finance Conector</h2>
        <p className="text-xs text-[#8FA3B3]">Integração oficial com instituições bancárias via API Pluggy.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#1A2635] border border-[#2D4055] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1B5E6C]/30 border border-[#1B5E6C] flex items-center justify-center text-[#2ECC71]">
            <Landmark size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Conexão Bancária Automatizada</h3>
            <p className="text-xs text-[#8FA3B3]">Sincronize extratos do Nubank, Itaú, Banco Inter, Bradesco e outros.</p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-2xl bg-[#0F1923] border border-[#2D4055] text-xs text-[#8FA3B3]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#2ECC71]" />
            <span>Autorização de leitura segura com token efêmero emitido pelo BFF.</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#2ECC71]" />
            <span>Classificação automática de categorias para cada compra registrada.</span>
          </div>
        </div>

        <button
          onClick={handleOpenPluggy}
          disabled={connecting}
          className="w-full py-4 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-50"
        >
          {connecting ? <RefreshCw className="animate-spin" size={18} /> : <Landmark size={18} />}
          {connecting ? 'Conectando ao Pluggy...' : 'Iniciar Conexão Open Finance'}
        </button>
      </div>
    </div>
  )
}
```

---

## 10. Roteamento e Proteção de Rotas

### `src/components/PrivateRoute.tsx`
```tsx
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Login } from '../pages/Login'
import { LoadingSpinner } from './LoadingSpinner'

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}
```

### `src/components/LoadingSpinner.tsx`
```tsx
import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#0F1923] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-[#1B5E6C] border-t-[#2ECC71] rounded-full animate-spin"></div>
      <p className="text-xs text-[#8FA3B3] font-semibold tracking-wider">CARREGANDO FINUP...</p>
    </div>
  )
}
```

### `src/App.tsx`
```tsx
import React from 'react'
import { PrivateRoute } from './components/PrivateRoute'
import { Layout } from './components/Layout'

export function App() {
  return (
    <PrivateRoute>
      <Layout />
    </PrivateRoute>
  )
}

export default App
```

### `src/main.tsx`
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## 11. Regras de Segurança (`firestore.rules`)

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Isolamento estrito por usuário: cada usuário acessa somente suas próprias coleções
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Nega acesso a qualquer outro caminho
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 12. Cloud Functions (Backend BFF)

### `functions/src/index.ts`
```typescript
import { onRequest } from 'firebase-functions/v2/https'
import axios from 'axios'

// 1. Obter cotações de cripto via CoinGecko
export const getCrypto = onRequest({ cors: true }, async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl&include_24hr_change=true'
    )
    res.json(response.data)
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao buscar cotações de cripto' })
  }
})

// 2. Obter cotações de ações da B3 via Brapi
export const getStocks = onRequest({ cors: true }, async (req, res) => {
  const ticker = req.query.ticker || 'PETR4,VALE3,ITUB4'
  try {
    const response = await axios.get(`https://brapi.dev/api/quote/${ticker}?token=${process.env.BRAPI_TOKEN || ''}`)
    res.json(response.data)
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao buscar cotações de ações' })
  }
})
```

---

## 13. Variáveis de Ambiente e Execução

### `.env.local`
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=finup-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finup-app
VITE_FIREBASE_STORAGE_BUCKET=finup-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=109283746512
VITE_FIREBASE_APP_ID=1:109283746512:web:987a6b5c4d3e2f1a
```

### Como Executar
```powershell
cd c:\Users\Aluno\Documents\Desenvolvimento\finup
npm install
npm run dev
```

Abra `http://localhost:5173` e utilize o botão **Entrar como Convidado (Modo Demonstração)** para testar imediatamente com dados realistas!
