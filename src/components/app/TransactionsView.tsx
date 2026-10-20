import React, { useState } from 'react'
import { Download, Search, Plus, Filter, CheckCircle2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useAppStore, type Transaction } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

export const TransactionsView: React.FC = () => {
  const { transactions, addTransaction } = useAppStore()
  const toast = useToast()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // New transaction form
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Alimentação')
  const [txType, setTxType] = useState<'income' | 'expense'>('expense')

  // Filtered list
  const filtered = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchTerm.toLowerCase())
    if (!matchesSearch) return false

    if (filterType === 'all') return true
    if (filterType === 'income') return t.type === 'income'
    if (filterType === 'expense') return t.type === 'expense'
    if (filterType === 'pix') return t.type === 'pix'
    if (filterType === 'bill') return t.type === 'bill'
    return true
  })

  // Export to real CSV with UTF-8 BOM
  const handleExportCSV = () => {
    const headers = ['ID', 'Data', 'Descricao', 'Categoria', 'Tipo', 'Valor (R$)', 'Status']
    const rows = filtered.map((t) => [
      t.id,
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.type,
      t.amount.toFixed(2).replace('.', ','),
      t.status
    ])

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `finup_extrato_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Extrato CSV Exportado!', `${filtered.length} transações salvas com formato compatível com Excel.`)
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseFloat(amount.replace(',', '.'))
    if (isNaN(num) || num <= 0) {
      toast.error('Valor Inválido', 'Digite uma quantia válida.')
      return
    }

    addTransaction({
      description: desc || 'Lançamento Manual',
      amount: num,
      category,
      type: txType
    })

    const formatted = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    toast.success('Transação Cadastrada!', `${desc || 'Lançamento'} de ${formatted} adicionado ao extrato.`)

    setDesc('')
    setAmount('')
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-1">
            Controle Financeiro
          </span>
          <h1 className="text-2xl font-black text-white">Extrato & Transações</h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Histórico completo de entradas, saídas, Pix e pagamentos com categorização.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-[#00A878]/15"
          >
            <Plus className="w-4 h-4" /> Nova Movimentação
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#1C1C19] hover:bg-[#262622] text-white border border-[#2A2A26] font-bold text-xs transition-colors flex items-center gap-1.5"
            title="Download de planilha CSV com UTF-8 BOM compatível com Excel"
          >
            <Download className="w-4 h-4 text-[#00A878]" /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por descrição ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141412] border border-[#22221F] rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'income', 'expense', 'pix', 'bill'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterType === t
                  ? 'bg-[#00A878] text-[#0E0E0C]'
                  : 'bg-[#141412] text-[#8A8A87] hover:text-white border border-[#22221F]'
              }`}
            >
              {t === 'all' && 'Todos'}
              {t === 'income' && 'Entradas'}
              {t === 'expense' && 'Saídas'}
              {t === 'pix' && 'Pix'}
              {t === 'bill' && 'Boletos'}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-xs text-[#8A8A87] text-center py-12">Nenhuma transação encontrada com os filtros atuais.</p>
        ) : (
          <div className="divide-y divide-[#22221F]">
            {filtered.map((t) => {
              const isPositive = t.type === 'income'
              return (
                <div key={t.id} className="py-4 flex items-center justify-between hover:bg-[#181816]/40 px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isPositive
                          ? 'bg-[#2ECC71]/10 text-[#2ECC71]'
                          : t.type === 'pix'
                          ? 'bg-[#00A878]/10 text-[#00A878]'
                          : 'bg-[#E5484D]/10 text-[#E5484D]'
                      }`}
                    >
                      {isPositive ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block">{t.description}</span>
                      <span className="text-[10px] text-[#8A8A87]">
                        {t.category} • {t.date} {t.receiptId && `• ${t.receiptId}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs sm:text-sm font-black ${isPositive ? 'text-[#2ECC71]' : 'text-white'}`}>
                      {isPositive ? '+' : '-'}R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-[#00A878] block">Concluído</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal for manual transaction */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141412] border border-[#2E2E2A] rounded-3xl p-6 sm:p-8 text-white">
            <h3 className="text-lg font-black text-white mb-4">Adicionar Lançamento Manual</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 p-1 bg-[#1C1C19] border border-[#2A2A26] rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTxType('expense')}
                  className={`py-2 rounded-lg ${txType === 'expense' ? 'bg-[#E5484D] text-white' : 'text-[#8A8A87]'}`}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  onClick={() => setTxType('income')}
                  className={`py-2 rounded-lg ${txType === 'income' ? 'bg-[#2ECC71] text-[#0E0E0C]' : 'text-[#8A8A87]'}`}
                >
                  Receita
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Almoço restaurante"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-2.5 px-3.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1">Valor (R$)</label>
                <input
                  type="text"
                  required
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-2.5 px-3.5 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-2.5 px-3.5 text-xs text-white"
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Moradia">Moradia</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Salário">Salário</option>
                  <option value="Investimentos">Investimentos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#1C1C19] text-[#A3A39E] font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-black text-xs"
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
