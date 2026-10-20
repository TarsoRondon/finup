import React, { useState } from 'react'
import { CreditCard, Lock, Unlock, Eye, EyeOff, Copy, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

export const CardsView: React.FC = () => {
  const { cards, toggleCardBlock, balance } = useAppStore()
  const toast = useToast()
  const [showNumbers, setShowNumbers] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '')
  const [copied, setCopied] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0]

  const handleCopyCard = () => {
    if (activeCard) {
      navigator.clipboard.writeText(`5502 4819 0921 ${activeCard.lastFour}`)
      setCopied(true)
      toast.success('Número do Cartão Copiado!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePayInvoice = () => {
    if (!activeCard) return
    if (balance < activeCard.usedLimit) {
      toast.error('Saldo Insuficiente', 'Você não possui saldo para liquidar esta fatura.')
      return
    }
    // Simulate paying invoice
    useAppStore.setState((s) => ({
      balance: s.balance - activeCard.usedLimit,
      cards: s.cards.map((c) => (c.id === activeCard.id ? { ...c, usedLimit: 0 } : c)),
      transactions: [
        {
          id: `tx-${Date.now()}`,
          description: `Pagamento de Fatura Cartão FinUp (Final ${activeCard.lastFour})`,
          amount: activeCard.usedLimit,
          type: 'bill',
          category: 'Cartão',
          date: new Date().toISOString().split('T')[0],
          status: 'completed'
        },
        ...s.transactions
      ]
    }))
    setSuccessMsg('Fatura liquidada com sucesso! O limite foi restabelecido integralmente.')
    toast.success('Fatura Liquidada! 💳', 'Seu limite de crédito foi restaurado instantaneamente.')
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block mb-1">
            Meios de Pagamento
          </span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-[#8B5CF6]" /> Cartões FinUp Mastercard
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Gerencie cartões físicos e virtuais com controle total de limites e faturas.
          </p>
        </div>

        {/* Card selector buttons */}
        <div className="flex gap-2">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCardId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCardId === c.id
                  ? 'bg-[#8B5CF6] text-white shadow-md'
                  : 'bg-[#1C1C19] text-[#8A8A87] hover:text-white border border-[#262622]'
              }`}
            >
              {c.type === 'virtual' ? '⚡ Virtual' : '💳 Físico'} (•{c.lastFour})
            </button>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-[#00A878]/10 border border-[#00A878]/40 rounded-2xl text-xs font-bold text-[#00A878] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {activeCard && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Virtual Card Visual */}
          <div className="space-y-4">
            <div
              className={`relative h-56 rounded-3xl p-6 text-white flex flex-col justify-between overflow-hidden shadow-2xl transition-all ${
                activeCard.isBlocked
                  ? 'bg-[#22221F] opacity-75 border border-[#E5484D]/50'
                  : 'bg-gradient-to-tr from-[#0E0E0C] via-[#1A2621] to-[#0D3D4A] border border-[#00A878]/40 shadow-[#00A878]/10'
              }`}
            >
              {/* Chip and Brand */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-7 rounded bg-[#F59E0B]/80 flex items-center justify-center text-[10px] font-black text-[#0E0E0C]">
                    CHIP
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded">
                    {activeCard.type === 'virtual' ? 'Virtual Platinum' : 'Black Contactless'}
                  </span>
                </div>
                <span className="font-black text-xl tracking-tight text-white flex items-center gap-1">
                  FinUp <span className="text-[#00A878]">F↑</span>
                </span>
              </div>

              {/* Number and CVV */}
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#E2E2DE] mb-1">
                  {showNumbers ? `5502 4819 0921 ${activeCard.lastFour}` : `•••• •••• •••• ${activeCard.lastFour}`}
                </div>
                <div className="flex gap-4 text-[10px] text-[#8A8A87] font-mono">
                  <span>VALIDADE: {activeCard.expiry}</span>
                  <span>CVV: {showNumbers ? '892' : '•••'}</span>
                </div>
              </div>

              {/* Holder Name & Status */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {activeCard.holderName}
                </span>
                <span className="text-[10px] font-extrabold text-[#F59E0B] flex items-center gap-1">
                  {activeCard.isBlocked ? 'BLOQUEADO' : '● ATIVO'}
                </span>
              </div>
            </div>

            {/* Quick Card Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowNumbers(!showNumbers)}
                className="flex-1 py-2.5 rounded-xl bg-[#141412] border border-[#22221F] hover:bg-[#181816] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                {showNumbers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showNumbers ? 'Ocultar Dados' : 'Ver Dados'}
              </button>

              <button
                onClick={handleCopyCard}
                className="flex-1 py-2.5 rounded-xl bg-[#141412] border border-[#22221F] hover:bg-[#181816] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Número'}
              </button>

              <button
                onClick={() => toggleCardBlock(activeCard.id)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  activeCard.isBlocked
                    ? 'bg-[#2ECC71]/10 border-[#2ECC71]/40 text-[#2ECC71] hover:bg-[#2ECC71]/20'
                    : 'bg-[#E5484D]/10 border-[#E5484D]/40 text-[#E5484D] hover:bg-[#E5484D]/20'
                }`}
              >
                {activeCard.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {activeCard.isBlocked ? 'Desbloquear' : 'Bloquear'}
              </button>
            </div>
          </div>

          {/* Invoice and Limit Details */}
          <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87] block mb-1">
                Fatura Atual em Aberto
              </span>
              <div className="text-3xl font-black text-white">
                R$ {activeCard.usedLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-[#8A8A87] mt-1">Vencimento em 20/10 • Melhor dia de compra: 13/10</p>
            </div>

            {/* Progress bar of limit */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-[#8A8A87]">Limite Utilizado</span>
                <span className="text-white">
                  R$ {(activeCard.limit - activeCard.usedLimit).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} disponível
                </span>
              </div>
              <div className="w-full h-3 bg-[#1C1C19] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00A878] to-[#2ECC71] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (activeCard.usedLimit / activeCard.limit) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#666] mt-1 font-mono">
                <span>R$ 0,00</span>
                <span>Limite Total: R$ {activeCard.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {activeCard.usedLimit > 0 && (
              <button
                onClick={handlePayInvoice}
                className="w-full py-3.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors shadow-lg shadow-[#00A878]/15"
              >
                Pagar Fatura com Saldo em Conta
              </button>
            )}

            {/* Simulated Purchases */}
            <div className="pt-4 border-t border-[#22221F]">
              <span className="text-xs font-bold text-white block mb-3">Últimas Compras no Cartão</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#181816]">
                  <span className="text-[#A3A39E]">Amazon Brasil (Livros)</span>
                  <span className="font-bold text-white">R$ 89,90</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#181816]">
                  <span className="text-[#A3A39E]">Uber Viagens</span>
                  <span className="font-bold text-white">R$ 28,40</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A3A39E]">Netflix Assinatura</span>
                  <span className="font-bold text-white">R$ 55,90</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
