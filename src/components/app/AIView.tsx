import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, Bot, User, HelpCircle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

export const AIView: React.FC = () => {
  const { chatMessages, sendChatMessage, balance, bills, investments } = useAppStore()
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    sendChatMessage(inputText)
    setInputText('')
  }

  const handleQuickPrompt = (prompt: string) => {
    sendChatMessage(prompt)
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-[#141412] border border-[#22221F] rounded-3xl overflow-hidden animate-fade-in">
      {/* Chat Header */}
      <div className="p-5 border-b border-[#22221F] bg-[#181816] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00A878] text-[#0E0E0C] font-black flex items-center justify-center text-base shadow-md shadow-[#00A878]/20">
            IA
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              FinUp Intelligence <Sparkles className="w-4 h-4 text-[#00A878]" />
            </h2>
            <p className="text-xs text-[#00A878] flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
              Conectada aos seus dados em tempo real
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-[#8A8A87] font-mono bg-[#141412] px-3 py-1.5 rounded-xl border border-[#262622]">
          <span>Saldo Lido: R$ {balance.toFixed(2)}</span>
          <span>•</span>
          <span>Boletos: {bills.filter((b) => b.status === 'pending').length}</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isAI = msg.sender === 'ai'
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-2xl ${isAI ? '' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isAI
                    ? 'bg-[#00A878] text-[#0E0E0C]'
                    : 'bg-[#22221F] text-white border border-[#2A2A26]'
                }`}
              >
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAI
                    ? 'bg-[#181816] border border-[#262622] text-[#E2E2DE] rounded-tl-sm'
                    : 'bg-[#00A878] text-[#0E0E0C] font-semibold rounded-tr-sm shadow-md'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[10px] mt-1.5 block ${
                    isAI ? 'text-[#8A8A87]' : 'text-[#0E0E0C]/60'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2.5 bg-[#181816] border-t border-[#22221F] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[#8A8A87] font-bold text-[11px] shrink-0">Sugestões:</span>
        <button
          onClick={() => handleQuickPrompt('Quanto tenho de saldo e investimentos?')}
          className="px-3 py-1.5 rounded-lg bg-[#141412] hover:bg-[#222] text-[#A3A39E] hover:text-white border border-[#262622] shrink-0 transition-colors"
        >
          💰 Meu Saldo & Patrimônio
        </button>
        <button
          onClick={() => handleQuickPrompt('Quais contas vencem este mês?')}
          className="px-3 py-1.5 rounded-lg bg-[#141412] hover:bg-[#222] text-[#A3A39E] hover:text-white border border-[#262622] shrink-0 transition-colors"
        >
          ⚠️ Boletos a Vencer
        </button>
        <button
          onClick={() => handleQuickPrompt('Onde posso economizar esse mês?')}
          className="px-3 py-1.5 rounded-lg bg-[#141412] hover:bg-[#222] text-[#A3A39E] hover:text-white border border-[#262622] shrink-0 transition-colors"
        >
          💡 Dicas de Economia
        </button>
        <button
          onClick={() => handleQuickPrompt('Como estão meus investimentos de Bitcoin e Ações?')}
          className="px-3 py-1.5 rounded-lg bg-[#141412] hover:bg-[#222] text-[#A3A39E] hover:text-white border border-[#262622] shrink-0 transition-colors"
        >
          📈 Minha Carteira
        </button>
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleSend} className="p-4 bg-[#141412] border-t border-[#22221F] flex gap-3">
        <input
          type="text"
          placeholder="Pergunte sobre suas finanças, boletos, gastos ou metas..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#181816] border border-[#2E2E2A] rounded-2xl py-3 px-4 text-xs sm:text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-2xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-[#00A878]/20 shrink-0"
        >
          <Send className="w-4 h-4" /> Enviar
        </button>
      </form>
    </div>
  )
}
