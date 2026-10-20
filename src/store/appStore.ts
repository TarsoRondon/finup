import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'pix' | 'transfer' | 'bill'
  category: string
  date: string
  status: 'completed' | 'pending'
  recipient?: string
  receiptId?: string
}

export interface Bill {
  id: string
  title: string
  amount: number
  dueDate: string
  status: 'pending' | 'paid'
  barcode: string
  category: string
  paidAt?: string
}

export interface Investment {
  id: string
  ticker: string
  name: string
  type: 'stock' | 'fii' | 'crypto' | 'fixed'
  quantity: number
  avgPrice: number
  currentPrice: number
  change24h: number
}

export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  categoryIcon: string
}

export interface CardItem {
  id: string
  type: 'virtual' | 'physical'
  holderName: string
  lastFour: string
  expiry: string
  limit: number
  usedLimit: number
  isBlocked: boolean
}

export interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
}

interface AppState {
  balance: number
  theme: 'dark' | 'light'
  transactions: Transaction[]
  bills: Bill[]
  investments: Investment[]
  goals: Goal[]
  cards: CardItem[]
  chatMessages: ChatMessage[]
  pixKeys: { type: string; key: string }[]
  
  // Actions
  toggleTheme: () => void
  sendPix: (amount: number, key: string, description?: string) => { success: boolean; error?: string; receiptId?: string }
  receivePix: (amount: number, senderName: string) => void
  payBill: (billId: string) => { success: boolean; error?: string }
  makeTransfer: (amount: number, recipientName: string, bank: string, agency: string, account: string) => { success: boolean; error?: string; receiptId?: string }
  addTransaction: (tx: Omit<Transaction, 'id' | 'status' | 'date'>) => void
  contributeToGoal: (goalId: string, amount: number) => { success: boolean; error?: string }
  toggleCardBlock: (cardId: string) => void
  sendChatMessage: (userText: string) => void
  resetToDefault: () => void
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', description: 'Salário Mensal — Tech Corp', amount: 6850.00, type: 'income', category: 'Salário', date: '2026-10-01', status: 'completed' },
  { id: 'tx-2', description: 'Pix para Maria Santos (Aluguel)', amount: 1200.00, type: 'pix', category: 'Moradia', date: '2026-10-05', status: 'completed', recipient: 'Maria Santos', receiptId: 'PIX-982103' },
  { id: 'tx-3', description: 'Supermercado Pão de Açúcar', amount: 482.50, type: 'expense', category: 'Alimentação', date: '2026-10-06', status: 'completed' },
  { id: 'tx-4', description: 'Posto Shell — Combustível', amount: 210.00, type: 'expense', category: 'Transporte', date: '2026-10-07', status: 'completed' },
  { id: 'tx-5', description: 'Pix recebido de João Silva', amount: 250.00, type: 'income', category: 'Outros', date: '2026-10-08', status: 'completed', recipient: 'João Silva', receiptId: 'PIX-109234' },
  { id: 'tx-6', description: 'Netflix Assinatura Premium', amount: 55.90, type: 'bill', category: 'Lazer', date: '2026-10-08', status: 'completed' },
  { id: 'tx-7', description: 'iFood — Jantar Família', amount: 124.90, type: 'expense', category: 'Alimentação', date: '2026-10-09', status: 'completed' }
]

const INITIAL_BILLS: Bill[] = [
  { id: 'bill-1', title: 'Internet Fibra Óptica 600MB', amount: 99.90, dueDate: '2026-10-15', status: 'pending', barcode: '34191.79001 01043.510047 91020.150008 1 98760000009990', category: 'Moradia' },
  { id: 'bill-2', title: 'Condomínio Residencial Park', amount: 480.00, dueDate: '2026-10-18', status: 'pending', barcode: '23793.38128 60000.123456 12345.678901 2 98790000048000', category: 'Moradia' },
  { id: 'bill-3', title: 'Fatura Cartão de Crédito FinUp', amount: 1720.40, dueDate: '2026-10-20', status: 'pending', barcode: '03399.12345 67890.123456 78901.234567 3 98810000172040', category: 'Cartão' },
  { id: 'bill-4', title: 'Energia Elétrica (Energisa)', amount: 215.30, dueDate: '2026-10-25', status: 'pending', barcode: '83620.00000 21530.012345 67890.123456 4 98860000021530', category: 'Moradia' }
]

const INITIAL_INVESTMENTS: Investment[] = [
  { id: 'inv-1', ticker: 'PETR4', name: 'Petrobras PN', type: 'stock', quantity: 200, avgPrice: 34.50, currentPrice: 38.20, change24h: 1.85 },
  { id: 'inv-2', ticker: 'VALE3', name: 'Vale S.A.', type: 'stock', quantity: 150, avgPrice: 62.00, currentPrice: 65.40, change24h: -0.45 },
  { id: 'inv-3', ticker: 'KNRI11', name: 'Kinea Renda Imobiliária', type: 'fii', quantity: 80, avgPrice: 142.00, currentPrice: 151.30, change24h: 0.60 },
  { id: 'inv-4', ticker: 'BTC', name: 'Bitcoin (Cripto)', type: 'crypto', quantity: 0.12, avgPrice: 310000.00, currentPrice: 385400.00, change24h: 3.40 },
  { id: 'inv-5', ticker: 'SELIC 2029', name: 'Tesouro Selic Pós-fixado', type: 'fixed', quantity: 1, avgPrice: 15000.00, currentPrice: 16120.00, change24h: 0.04 }
]

const INITIAL_GOALS: Goal[] = [
  { id: 'goal-1', title: 'Reserva de Emergência', targetAmount: 20000.00, currentAmount: 14500.00, deadline: 'Dez 2026', categoryIcon: '🛡️' },
  { id: 'goal-2', title: 'Viagem de Férias para Europa', targetAmount: 15000.00, currentAmount: 6200.00, deadline: 'Jul 2027', categoryIcon: '✈️' },
  { id: 'goal-3', title: 'Troca de Notebook (MacBook M3)', targetAmount: 9000.00, currentAmount: 4800.00, deadline: 'Mar 2027', categoryIcon: '💻' }
]

const INITIAL_CARDS: CardItem[] = [
  { id: 'card-1', type: 'virtual', holderName: 'TARSO RONDON', lastFour: '4921', expiry: '09/29', limit: 8000.00, usedLimit: 1720.40, isBlocked: false },
  { id: 'card-2', type: 'physical', holderName: 'TARSO RONDON', lastFour: '8834', expiry: '11/30', limit: 12000.00, usedLimit: 3450.00, isBlocked: false }
]

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Olá, Tarso! Eu sou a FinUp IA. Analisei suas finanças: seu saldo disponível é de R$ 8.420,50 e você tem 4 contas a vencer até o final do mês (totalizando R$ 2.515,60). Seu rendimento de investimentos subiu +12,4% este mês. Como posso te ajudar hoje?',
    timestamp: '10:00'
  }
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      balance: 8420.50,
      theme: 'dark',
      transactions: INITIAL_TRANSACTIONS,
      bills: INITIAL_BILLS,
      investments: INITIAL_INVESTMENTS,
      goals: INITIAL_GOALS,
      cards: INITIAL_CARDS,
      chatMessages: INITIAL_MESSAGES,
      pixKeys: [
        { type: 'CPF', key: '***.482.918-**' },
        { type: 'E-mail', key: 'tarso.rondon@ifro.edu.br' },
        { type: 'Telefone', key: '(69) 99234-****' },
        { type: 'Aleatória', key: '8a91c2e4-98bf-42a1-a0c3-f09d82138a01' }
      ],

      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark'
        if (typeof document !== 'undefined') {
          if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        set({ theme: nextTheme })
      },

      sendPix: (amount: number, key: string, description?: string) => {
        const currentBalance = get().balance
        if (amount <= 0) return { success: false, error: 'O valor deve ser maior que zero.' }
        if (amount > currentBalance) return { success: false, error: 'Saldo insuficiente para esta transação.' }

        const receiptId = `PIX-${Math.floor(100000 + Math.random() * 900000)}`
        const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          description: description ? `Pix: ${description}` : `Pix para ${key}`,
          amount,
          type: 'pix',
          category: 'Transferências',
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
          recipient: key,
          receiptId
        }

        set((state) => ({
          balance: state.balance - amount,
          transactions: [newTx, ...state.transactions]
        }))

        return { success: true, receiptId }
      },

      receivePix: (amount: number, senderName: string) => {
        const receiptId = `PIX-${Math.floor(100000 + Math.random() * 900000)}`
        const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          description: `Pix recebido de ${senderName}`,
          amount,
          type: 'income',
          category: 'Receitas',
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
          recipient: senderName,
          receiptId
        }

        set((state) => ({
          balance: state.balance + amount,
          transactions: [newTx, ...state.transactions]
        }))
      },

      payBill: (billId: string) => {
        const bill = get().bills.find((b) => b.id === billId)
        if (!bill) return { success: false, error: 'Boleto não encontrado.' }
        if (bill.status === 'paid') return { success: false, error: 'Boleto já consta como pago.' }
        if (bill.amount > get().balance) return { success: false, error: 'Saldo insuficiente para pagar este boleto.' }

        const receiptId = `BOL-${Math.floor(100000 + Math.random() * 900000)}`
        const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          description: `Pagamento: ${bill.title}`,
          amount: bill.amount,
          type: 'bill',
          category: bill.category,
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
          receiptId
        }

        set((state) => ({
          balance: state.balance - bill.amount,
          transactions: [newTx, ...state.transactions],
          bills: state.bills.map((b) =>
            b.id === billId ? { ...b, status: 'paid', paidAt: new Date().toISOString() } : b
          )
        }))

        return { success: true }
      },

      makeTransfer: (amount: number, recipientName: string, bank: string, agency: string, account: string) => {
        if (amount <= 0) return { success: false, error: 'Valor inválido.' }
        if (amount > get().balance) return { success: false, error: 'Saldo insuficiente.' }

        const receiptId = `TED-${Math.floor(100000 + Math.random() * 900000)}`
        const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          description: `TED para ${recipientName} (${bank} Ag: ${agency} Cc: ${account})`,
          amount,
          type: 'transfer',
          category: 'Transferências',
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
          recipient: recipientName,
          receiptId
        }

        set((state) => ({
          balance: state.balance - amount,
          transactions: [newTx, ...state.transactions]
        }))

        return { success: true, receiptId }
      },

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: `tx-${Date.now()}`,
          status: 'completed',
          date: new Date().toISOString().split('T')[0]
        }
        set((state) => ({
          balance: tx.type === 'income' ? state.balance + tx.amount : state.balance - tx.amount,
          transactions: [newTx, ...state.transactions]
        }))
      },

      contributeToGoal: (goalId: string, amount: number) => {
        if (amount <= 0) return { success: false, error: 'Valor inválido.' }
        if (amount > get().balance) return { success: false, error: 'Saldo insuficiente para este aporte.' }

        set((state) => ({
          balance: state.balance - amount,
          goals: state.goals.map((g) =>
            g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g
          ),
          transactions: [
            {
              id: `tx-${Date.now()}`,
              description: `Aporte na meta: ${state.goals.find((g) => g.id === goalId)?.title || 'Meta'}`,
              amount,
              type: 'expense',
              category: 'Investimentos',
              date: new Date().toISOString().split('T')[0],
              status: 'completed'
            },
            ...state.transactions
          ]
        }))

        return { success: true }
      },

      toggleCardBlock: (cardId: string) => {
        set((state) => ({
          cards: state.cards.map((c) => (c.id === cardId ? { ...c, isBlocked: !c.isBlocked } : c))
        }))
      },

      sendChatMessage: (userText: string) => {
        const userMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: 'user',
          text: userText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        set((state) => ({
          chatMessages: [...state.chatMessages, userMsg]
        }))

        // Intelligent contextual reply based on real state
        setTimeout(() => {
          const state = get()
          const text = userText.toLowerCase()
          let reply = ''

          if (text.includes('saldo') || text.includes('dinheiro') || text.includes('quanto tenho')) {
            reply = `Seu saldo líquido disponível em conta agora é de R$ ${state.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Além disso, você tem R$ ${(state.investments.reduce((acc, i) => acc + i.currentPrice * i.quantity, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} aplicados em investimentos.`
          } else if (text.includes('conta') || text.includes('boleto') || text.includes('pagar') || text.includes('vencer')) {
            const pending = state.bills.filter((b) => b.status === 'pending')
            const total = pending.reduce((acc, b) => acc + b.amount, 0)
            reply = `Você possui ${pending.length} conta(s) pendente(s) totalizando R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. A conta mais urgente é "${pending[0]?.title || 'Nenhuma'}" no valor de R$ ${pending[0]?.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`
          } else if (text.includes('economizar') || text.includes('gasto') || text.includes('onde')) {
            reply = `Analisando seu extrato recente, sua maior categoria de despesas do mês foi Alimentação (R$ 607,40) e Moradia. Recomendo fixar um limite de R$ 500 no orçamento de Delivery e direcionar a diferença de R$ 107 para sua meta de Reserva de Emergência!`
          } else if (text.includes('invest') || text.includes('rend') || text.includes('ação') || text.includes('cripto') || text.includes('btc')) {
            const btc = state.investments.find(i => i.ticker === 'BTC')
            reply = `Sua carteira de investimentos está com rentabilidade geral de +11,8% no mês. O destaque positivo é o Bitcoin (+${btc?.change24h || 3.4}%), cotado a R$ 385.400. Sua alocação está dividida em Renda Fixa (42%), Ações B3 (38%), FIIs (12%) e Cripto (8%).`
          } else if (text.includes('pix') || text.includes('transfer')) {
            reply = `Você pode enviar ou receber Pix instantaneamente pela aba Área Pix. Seu saldo atual de R$ ${state.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} permite transações 24/7 sem taxas.`
          } else {
            reply = `Entendido! Estou monitorando sua saúde financeira em tempo real. Você pode me perguntar sobre saldo, contas a vencer, sugestões de economia, detalhes da fatura do cartão ou simulações de metas.`
          }

          const aiMsg: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: 'ai',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }

          set((s) => ({
            chatMessages: [...s.chatMessages, aiMsg]
          }))
        }, 600)
      },

      resetToDefault: () => {
        set({
          balance: 8420.50,
          transactions: INITIAL_TRANSACTIONS,
          bills: INITIAL_BILLS,
          investments: INITIAL_INVESTMENTS,
          goals: INITIAL_GOALS,
          cards: INITIAL_CARDS,
          chatMessages: INITIAL_MESSAGES
        })
      }
    }),
    {
      name: 'finup_enterprise_store_v2',
      partialize: (state) => ({
        balance: state.balance,
        theme: state.theme,
        transactions: state.transactions,
        bills: state.bills,
        investments: state.investments,
        goals: state.goals,
        cards: state.cards,
        chatMessages: state.chatMessages,
        pixKeys: state.pixKeys
      })
    }
  )
)
