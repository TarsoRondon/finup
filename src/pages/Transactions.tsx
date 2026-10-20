import React, { useState } from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { Plus, Search, ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react'
import type { TransactionCategory, TransactionType } from '../types/transaction.types'

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
          className="px-4 py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
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
          className="px-4 py-2.5 rounded-xl bg-[#1A2635] border border-[#2D4055] text-white text-xs focus:outline-none cursor-pointer"
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
                    className="text-[#5E7385] hover:text-rose-400 transition-colors cursor-pointer"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none cursor-pointer"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-xs focus:outline-none cursor-pointer"
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
                  className="flex-1 py-2.5 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2ECC71] text-black font-bold text-xs cursor-pointer"
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
