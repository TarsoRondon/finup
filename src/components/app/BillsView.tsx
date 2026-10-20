import React, { useState } from 'react'
import { FileText, CheckCircle2, AlertTriangle, Barcode, DollarSign } from 'lucide-react'
import { useAppStore, type Bill } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

export const BillsView: React.FC = () => {
  const { balance, bills, payBill } = useAppStore()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState<'pending' | 'paid'>('pending')
  const [, setSelectedBill] = useState<Bill | null>(null)
  const [manualBarcode, setManualBarcode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const pendingBills = bills.filter((b) => b.status === 'pending')
  const paidBills = bills.filter((b) => b.status === 'paid')

  const totalPendingAmount = pendingBills.reduce((acc, b) => acc + b.amount, 0)

  const handlePay = (bill: Bill) => {
    setErrorMsg('')
    setSuccessMsg('')
    const res = payBill(bill.id)
    if (!res.success) {
      setErrorMsg(res.error || 'Erro ao pagar boleto.')
      toast.error('Erro no Pagamento', res.error || 'Saldo insuficiente para liquidar este boleto.')
    } else {
      const formatted = bill.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      setSuccessMsg(`Boleto "${bill.title}" no valor de ${formatted} foi pago com sucesso!`)
      toast.success('Boleto Liquidado! 📄', `Conta "${bill.title}" de ${formatted} paga com sucesso.`)
      setSelectedBill(null)
    }
  }

  const handleSimulateBarcode = () => {
    if (manualBarcode.trim().length >= 10) {
      setSuccessMsg('Código de barras reconhecido: Concessionária de Água & Saneamento — R$ 84,50. Boleto pronto para pagamento.')
      setManualBarcode('')
    } else {
      setErrorMsg('Digite um código de barras válido com 44 ou 48 dígitos.')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] block mb-1">
            Gestão & Liquidação de Contas
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-[#F59E0B]" /> Pagamentos & Boletos
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Pague contas de consumo, tributos e faturas com baixa imediata no saldo.
          </p>
        </div>

        <div className="bg-[#181816] p-4 rounded-2xl border border-[#2E2E2A] text-right">
          <span className="text-[11px] text-[#8A8A87] font-semibold block">Total a Pagar Este Mês</span>
          <span className="text-2xl font-black text-[#F59E0B]">
            R$ {totalPendingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-4 bg-[#E5484D]/10 border border-[#E5484D]/40 rounded-2xl text-xs font-bold text-[#E5484D] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-[#00A878]/10 border border-[#00A878]/40 rounded-2xl text-xs font-bold text-[#00A878] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Barcode scanner simulator box */}
      <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold">
            <Barcode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Leitor de Linha Digitável / Código de Barras</h2>
            <p className="text-xs text-[#8A8A87]">Cole o código de qualquer boleto bancário ou conta de consumo</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Digite ou cole os números do código de barras (44 ou 48 dígitos)..."
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            className="flex-1 bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#F59E0B] font-mono"
          />
          <button
            onClick={handleSimulateBarcode}
            className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#d98207] text-[#0E0E0C] font-extrabold text-xs transition-colors shrink-0"
          >
            Validar Boleto
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#22221F] pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-[#F59E0B] text-[#0E0E0C]'
              : 'text-[#8A8A87] hover:text-white'
          }`}
        >
          Pendentes ({pendingBills.length})
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'paid'
              ? 'bg-[#00A878] text-[#0E0E0C]'
              : 'text-[#8A8A87] hover:text-white'
          }`}
        >
          Pagos Recentemente ({paidBills.length})
        </button>
      </div>

      {/* Bills List */}
      {activeTab === 'pending' ? (
        <div className="space-y-4">
          {pendingBills.length === 0 ? (
            <div className="p-12 text-center bg-[#141412] rounded-3xl border border-[#22221F]">
              <CheckCircle2 className="w-12 h-12 text-[#00A878] mx-auto mb-3" />
              <h3 className="text-base font-extrabold text-white">Parabéns! Nenhuma conta pendente</h3>
              <p className="text-xs text-[#8A8A87] mt-1">Todas as suas faturas deste mês foram liquidadas.</p>
            </div>
          ) : (
            pendingBills.map((bill) => (
              <div
                key={bill.id}
                className="bg-[#141412] border border-[#262622] hover:border-[#F59E0B]/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-extrabold text-white">{bill.title}</span>
                    <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Vence em {bill.dueDate}
                    </span>
                  </div>
                  <span className="text-xs text-[#8A8A87] block mb-2">{bill.category}</span>
                  <p className="text-[11px] font-mono text-[#666] bg-[#181816] px-2.5 py-1 rounded inline-block">
                    {bill.barcode}
                  </p>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-3 shrink-0">
                  <div className="text-xl sm:text-2xl font-black text-white">
                    R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>

                  <button
                    onClick={() => handlePay(bill)}
                    disabled={bill.amount > balance}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                      bill.amount > balance
                        ? 'bg-[#22221F] text-[#666] cursor-not-allowed'
                        : 'bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] shadow-lg shadow-[#00A878]/15 hover:scale-[1.02]'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    {bill.amount > balance ? 'Saldo Insuficiente' : 'Pagar Boleto'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {paidBills.length === 0 ? (
            <p className="text-xs text-[#8A8A87] text-center py-10">Nenhum boleto pago no histórico.</p>
          ) : (
            paidBills.map((bill) => (
              <div
                key={bill.id}
                className="bg-[#141412] border border-[#22221F] rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white line-through opacity-75">{bill.title}</span>
                    <span className="text-[10px] font-bold text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Pago
                    </span>
                  </div>
                  <span className="text-xs text-[#8A8A87]">{bill.category}</span>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-[#8A8A87] line-through block">
                    R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-[#00A878]">Comprovante arquivado</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
