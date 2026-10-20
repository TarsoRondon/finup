import React, { useState } from 'react'
import { Zap, Send, ArrowDownToLine, Key, Copy, CheckCircle2, AlertCircle, Printer, Download } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

export const PixView: React.FC = () => {
  const { balance, pixKeys, sendPix, receivePix, transactions } = useAppStore()
  const toast = useToast()

  // Form states
  const [pixKey, setPixKey] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [recipientName, setRecipientName] = useState('João Pedro Oliveira')

  // Simulation states
  const [lastReceipt, setLastReceipt] = useState<{ id: string; amount: number; key: string; date: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Simulator receive states
  const [simAmount, setSimAmount] = useState('150.00')
  const [simSender, setSimSender] = useState('Mariana Costa')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setLastReceipt(null)

    const numAmount = parseFloat(amount.replace(',', '.'))
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Informe um valor válido para o Pix.')
      toast.error('Valor Inválido', 'Digite uma quantia maior que zero.')
      return
    }

    const res = sendPix(numAmount, pixKey || recipientName, description)
    if (!res.success) {
      setErrorMsg(res.error || 'Erro ao processar Pix.')
      toast.error('Falha no Envio Pix', res.error || 'Saldo insuficiente ou erro bancário.')
    } else {
      const formatted = numAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      setLastReceipt({
        id: res.receiptId!,
        amount: numAmount,
        key: pixKey || recipientName,
        date: new Date().toLocaleString('pt-BR')
      })
      setSuccessMsg(`Pix de ${formatted} enviado com sucesso!`)
      toast.success('Pix Enviado com Sucesso! ⚡', `Transferência de ${formatted} debitada em conta.`)
      setAmount('')
      setPixKey('')
      setDescription('')
    }
  }

  const handleSimulateReceive = () => {
    const val = parseFloat(simAmount)
    if (val > 0) {
      receivePix(val, simSender)
      const formatted = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      setSuccessMsg(`Você recebeu um Pix de ${formatted} de ${simSender}!`)
      toast.success('Pix Recebido em Conta! 💰', `${simSender} transferiu ${formatted} via Pix.`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(text)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const pixTransactions = transactions.filter((t) => t.type === 'pix')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-1">
            Banking Instantâneo 24/7
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Zap className="w-7 h-7 text-[#00A878]" /> Área Pix FinUp
          </h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Envios e recebimentos instantâneos gratuitos sem limite de horário.
          </p>
        </div>

        {/* Current Balance Pill */}
        <div className="bg-[#181816] p-4 rounded-2xl border border-[#2E2E2A] text-right">
          <span className="text-[11px] text-[#8A8A87] font-semibold block">Saldo Disponível para Pix</span>
          <span className="text-2xl font-black text-white">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-4 bg-[#E5484D]/10 border border-[#E5484D]/40 rounded-2xl text-xs font-bold text-[#E5484D] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-[#00A878]/10 border border-[#00A878]/40 rounded-2xl text-xs font-bold text-[#00A878] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Grid: Send Form & Receive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enviar Pix */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#00A878]/10 text-[#00A878] flex items-center justify-center font-bold">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Enviar Pix Instantâneo</h2>
              <p className="text-xs text-[#8A8A87]">Débito automático em conta com comprovante</p>
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Chave Pix do Favorecido</label>
              <input
                type="text"
                required
                placeholder="CPF, E-mail, Celular ou Chave Aleatória"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Valor (R$)</label>
                <input
                  type="text"
                  required
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878] font-bold text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Nome do Destinatário</label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Silva"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Descrição Opcional</label>
              <input
                type="text"
                placeholder="Ex: Pagamento almoço de sexta"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 px-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-sm transition-all shadow-lg shadow-[#00A878]/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" /> Confirmar Envio Pix
            </button>
          </form>

          {/* Receipt Box after successful send */}
          {lastReceipt && (
            <div className="mt-6 p-5 bg-[#181816] border border-[#00A878]/40 rounded-2xl animate-fade-in space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-[#00A878] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Comprovante Autenticado Bacen
                </span>
                <span className="text-[10px] font-mono text-[#8A8A87] bg-[#111110] px-2 py-0.5 rounded border border-[#22221F]">
                  {lastReceipt.id}
                </span>
              </div>
              <div className="text-xl font-black text-white">
                R$ {lastReceipt.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-[#8A8A87] space-y-1 pt-1 border-t border-[#262622]">
                <div className="flex justify-between">
                  <span>Destinatário:</span>
                  <span className="text-white font-bold">{lastReceipt.key}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data e Hora:</span>
                  <span className="text-[#A3A39E] font-mono">{lastReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instituição:</span>
                  <span className="text-white font-semibold">FinUp Pagamentos S.A. (IP 992)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#22221F] hover:bg-[#2A2A26] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#00A878]" /> Imprimir Recibo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`COMPROVANTE FINUP PIX\nID: ${lastReceipt.id}\nValor: R$ ${lastReceipt.amount}\nData: ${lastReceipt.date}\nDestinatário: ${lastReceipt.key}`)
                    toast.success('Comprovante Copiado!', 'Texto formatado na área de transferência.')
                  }}
                  className="py-2 px-3 rounded-xl bg-[#22221F] hover:bg-[#2A2A26] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="Copiar texto do comprovante"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Simulador de Recebimento & Minhas Chaves */}
        <div className="space-y-6">
          {/* Receber / Simulador */}
          <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center font-bold">
                <ArrowDownToLine className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white">Simulador de Recebimento</h2>
                <p className="text-xs text-[#8A8A87]">Simule uma transferência Pix entrando na sua conta</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Valor do Pix (R$)</label>
                <input
                  type="number"
                  value={simAmount}
                  onChange={(e) => setSimAmount(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-2.5 px-3.5 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Nome de Quem Envia</label>
                <input
                  type="text"
                  value={simSender}
                  onChange={(e) => setSimSender(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-2.5 px-3.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={handleSimulateReceive}
              className="w-full py-3 rounded-xl bg-[#1C1C19] hover:bg-[#262622] text-[#2ECC71] border border-[#2ECC71]/30 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              Simular Recebimento Imediato
            </button>
          </div>

          {/* Minhas Chaves Pix */}
          <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Minhas Chaves Cadastradas</h3>
                <p className="text-xs text-[#8A8A87]">Compartilhe com quem precisa te enviar Pix</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {pixKeys.map((k, idx) => (
                <div key={idx} className="p-3 bg-[#181816] rounded-xl border border-[#262622] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A8A87] block">{k.type}</span>
                    <span className="text-xs font-mono text-white">{k.key}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(k.key)}
                    className="p-2 rounded-lg bg-[#22221F] hover:bg-[#2A2A26] text-[#A3A39E] hover:text-white transition-colors"
                    title="Copiar Chave"
                  >
                    {copiedKey === k.key ? <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Histórico Pix */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6">
        <h3 className="text-base font-extrabold text-white mb-1">Histórico de Transações Pix</h3>
        <p className="text-xs text-[#8A8A87] mb-6">Todas as movimentações via Pix realizadas na sua conta</p>

        {pixTransactions.length === 0 ? (
          <p className="text-xs text-[#8A8A87] text-center py-6">Nenhum Pix enviado recentemente.</p>
        ) : (
          <div className="divide-y divide-[#22221F]">
            {pixTransactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{tx.description}</span>
                  <span className="text-[10px] text-[#8A8A87] font-mono">ID: {tx.receiptId || 'N/A'} • {tx.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#E5484D]">
                    -R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-[#00A878] block">Confirmado</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
