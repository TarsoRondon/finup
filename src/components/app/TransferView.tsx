import React, { useState } from 'react'
import { ArrowRightLeft, CheckCircle2, AlertCircle, Send, Printer, Copy } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

const BANKS = [
  '001 — Banco do Brasil S.A.',
  '033 — Banco Santander Brasil S.A.',
  '104 — Caixa Econômica Federal',
  '237 — Banco Bradesco S.A.',
  '260 — Nubank (Nu Pagamentos S.A.)',
  '077 — Banco Inter S.A.',
  '341 — Itaú Unibanco S.A.',
  '102 — XP Investimentos Corretora',
  '212 — Banco Original S.A.',
  '336 — C6 Bank S.A.'
]

export const TransferView: React.FC = () => {
  const { balance, makeTransfer } = useAppStore()
  const toast = useToast()

  const [step, setStep] = useState(1)
  const [recipientName, setRecipientName] = useState('')
  const [bank, setBank] = useState(BANKS[4])
  const [agency, setAgency] = useState('')
  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [receipt, setReceipt] = useState<string | null>(null)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (step === 1) {
      if (!recipientName || !agency || !account) {
        setErrorMsg('Por favor, preencha todos os dados bancários.')
        toast.error('Dados Incompletos', 'Informe o favorecido, agência e conta.')
        return
      }
      setStep(2)
    } else if (step === 2) {
      const num = parseFloat(amount.replace(',', '.'))
      if (isNaN(num) || num <= 0) {
        setErrorMsg('Informe um valor válido.')
        toast.error('Valor Inválido', 'Digite uma quantia maior que zero.')
        return
      }
      if (num > balance) {
        setErrorMsg('Saldo insuficiente para esta transferência.')
        toast.error('Saldo Insuficiente', `Disponível em conta: R$ ${balance.toFixed(2)}.`)
        return
      }
      setStep(3)
    } else if (step === 3) {
      const num = parseFloat(amount.replace(',', '.'))
      const res = makeTransfer(num, recipientName, bank, agency, account)
      if (res.success) {
        setReceipt(res.receiptId!)
        setStep(4)
        const formatted = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        toast.success('TED Realizada com Sucesso! 💸', `${formatted} transferido para ${recipientName}.`)
      } else {
        setErrorMsg(res.error || 'Erro na transferência.')
        toast.error('Falha na Transferência', res.error || 'Erro bancário.')
      }
    }
  }

  const handleReset = () => {
    setStep(1)
    setRecipientName('')
    setAgency('')
    setAccount('')
    setAmount('')
    setReceipt(null)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] block mb-1">
            Transferências Interbancárias
          </span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-[#3B82F6]" /> TED & DOC Eletrônico
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Envie recursos para qualquer instituição financeira sem tarifas.
          </p>
        </div>

        <div className="bg-[#181816] p-3.5 rounded-2xl border border-[#262622] text-right">
          <span className="text-[10px] text-[#8A8A87] font-semibold block">Saldo Disponível</span>
          <span className="text-xl font-black text-white">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Progress Steps Header */}
      {step < 4 && (
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className={`p-2.5 rounded-xl border ${step >= 1 ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#181816] border-[#222] text-[#666]'}`}>
            1. Favorecido
          </div>
          <div className={`p-2.5 rounded-xl border ${step >= 2 ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#181816] border-[#222] text-[#666]'}`}>
            2. Valor
          </div>
          <div className={`p-2.5 rounded-xl border ${step >= 3 ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#181816] border-[#222] text-[#666]'}`}>
            3. Confirmação
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-[#E5484D]/10 border border-[#E5484D]/40 rounded-2xl text-xs font-bold text-[#E5484D] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-8">
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Banco de Destino</label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              >
                {BANKS.map((b, i) => (
                  <option key={i} value={b} className="bg-[#181816] text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Nome Completo do Favorecido</label>
              <input
                type="text"
                required
                placeholder="Ex: Beatriz Lima e Silva"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Agência (sem dígito)</label>
                <input
                  type="text"
                  required
                  placeholder="0001"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Conta com Dígito</label>
                <input
                  type="text"
                  required
                  placeholder="1234567-8"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-xs transition-colors mt-4"
            >
              Avançar para Escolha de Valor →
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <span className="text-xs text-[#8A8A87] block mb-1">Destinatário selecionado:</span>
              <p className="text-sm font-extrabold text-white">{recipientName} • {bank.split('—')[1] || bank}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Valor da Transferência (R$)</label>
              <input
                type="text"
                required
                autoFocus
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-4 px-4 text-2xl font-black text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl bg-[#181816] text-[#A3A39E] font-bold text-xs"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-2 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-xs"
              >
                Revisar Transferência
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNext} className="space-y-4">
            <h3 className="text-sm font-extrabold text-white mb-2">Confirmação dos Dados</h3>
            <div className="bg-[#181816] p-4 rounded-2xl border border-[#2A2A26] space-y-2 text-xs">
              <div className="flex justify-between text-[#8A8A87]">
                <span>Favorecido:</span> <strong className="text-white">{recipientName}</strong>
              </div>
              <div className="flex justify-between text-[#8A8A87]">
                <span>Instituição:</span> <strong className="text-white">{bank}</strong>
              </div>
              <div className="flex justify-between text-[#8A8A87]">
                <span>Agência / Conta:</span> <strong className="text-white">{agency} / {account}</strong>
              </div>
              <div className="flex justify-between text-[#8A8A87] pt-2 border-t border-[#262622]">
                <span>Valor a debitar:</span>
                <strong className="text-lg font-black text-[#3B82F6]">
                  R$ {parseFloat(amount.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-xl bg-[#181816] text-[#A3A39E] font-bold text-xs"
              >
                Corrigir
              </button>
              <button
                type="submit"
                className="flex-2 py-3.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs shadow-lg shadow-[#00A878]/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Efetuar Transferência TED
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#00A878]/15 text-[#00A878] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-white">Transferência Realizada com Sucesso!</h3>
            <p className="text-xs text-[#8A8A87] max-w-sm mx-auto">
              O valor foi debitado da sua conta corrente e o comprovante autenticado foi registrado no seu extrato.
            </p>
            <div className="p-3 bg-[#181816] rounded-xl border border-[#2E2E2A] inline-block font-mono text-xs text-[#00A878]">
              Autenticação: {receipt}
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-[#22221F] hover:bg-[#2A2A26] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#00A878]" /> Imprimir Comprovante
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`COMPROVANTE TED FINUP\nAutenticação: ${receipt}\nFavorecido: ${recipientName}\nBanco: ${bank}\nAg: ${agency} Cc: ${account}\nValor: R$ ${amount}`)
                  toast.success('Comprovante Copiado!')
                }}
                className="px-4 py-2.5 rounded-xl bg-[#22221F] hover:bg-[#2A2A26] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors"
              >
                Nova Transferência
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
