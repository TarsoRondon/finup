import React, { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

interface PricingProps {
  onSelectPlan: (plan: string) => void
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  return (
    <section id="planos" className="py-24 bg-[#0E0E0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A878] mb-3 block">
            03 — Planos Transparentes
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Invista na sua paz financeira.
          </h2>
          <p className="text-base text-[#9C9C98] leading-relaxed mb-8">
            Comece gratuitamente ou desbloqueie o poder total da IA preditiva e sincronizações bancárias ilimitadas.
          </p>

          {/* Billing Cycle Pill Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#181816] border border-[#262622]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#2A2A26] text-white shadow-sm'
                  : 'text-[#8A8A87] hover:text-white'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-[#00A878] text-[#0E0E0C] shadow-sm'
                  : 'text-[#8A8A87] hover:text-white'
              }`}
            >
              Anual <span className="text-[10px] bg-[#0E0E0C]/30 px-2 py-0.5 rounded-full font-black">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plano Básico */}
          <div className="bg-[#141412] border border-[#262622] rounded-3xl p-8 flex flex-col justify-between hover:border-[#333] transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87] block mb-2">Iniciante</span>
              <h3 className="text-2xl font-black text-white mb-2">FinUp Free</h3>
              <p className="text-xs text-[#8A8A87] mb-6">Tudo o que você precisa para começar a organizar sua conta e fazer Pix.</p>

              <div className="text-4xl font-black text-white mb-8">
                R$ 0<span className="text-sm font-normal text-[#8A8A87]"> /mês para sempre</span>
              </div>

              <ul className="space-y-3.5 text-xs text-[#A3A39E] mb-8">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Conta corrente virtual com Pix 24/7</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Pagamento manual de boletos</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Até 2 bancos no Open Finance</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> 5 consultas diárias à FinUp IA</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Cartão virtual de débito</li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Free')}
              className="w-full py-3.5 rounded-full bg-[#1C1C19] hover:bg-[#262622] text-white font-bold text-xs transition-colors"
            >
              Criar Conta Gratuita
            </button>
          </div>

          {/* Plano Pro (Destaque) */}
          <div className="bg-[#181816] border-2 border-[#00A878] rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-[#00A878]/10 hover:scale-[1.01] transition-transform">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00A878] to-[#2ECC71] text-[#0E0E0C] text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              Mais Escolhido
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-2">Completo</span>
              <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                FinUp Pro <Sparkles className="w-5 h-5 text-[#00A878]" />
              </h3>
              <p className="text-xs text-[#8A8A87] mb-6">Automação financeira total, IA preditiva ilimitada e gestão de investimentos.</p>

              <div className="text-4xl font-black text-white mb-8">
                {billingCycle === 'annual' ? 'R$ 19,90' : 'R$ 24,90'}
                <span className="text-sm font-normal text-[#8A8A87]"> /mês</span>
              </div>

              <ul className="space-y-3.5 text-xs text-[#DCDCD8] mb-8 font-medium">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> <strong>Tudo do plano Free</strong></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> <strong>Bancos Ilimitados no Open Finance</strong></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> <strong>Consultas ilimitadas à FinUp IA</strong></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Acompanhamento de Ações B3, FIIs e Cripto</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Exportação de relatórios em CSV e PDF</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Alertas preditivos no WhatsApp e e-mail</li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Pro')}
              className="w-full py-4 rounded-full bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-sm transition-all shadow-lg shadow-[#00A878]/30 hover:scale-[1.02]"
            >
              Começar Teste Pro de 14 Dias
            </button>
          </div>

          {/* Plano Enterprise / Family */}
          <div className="bg-[#141412] border border-[#262622] rounded-3xl p-8 flex flex-col justify-between hover:border-[#333] transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A87] block mb-2">Família / Empresas</span>
              <h3 className="text-2xl font-black text-white mb-2">FinUp Family & PJ</h3>
              <p className="text-xs text-[#8A8A87] mb-6">Gestão patrimonial unificada para casais, famílias ou pequenos negócios.</p>

              <div className="text-4xl font-black text-white mb-8">
                {billingCycle === 'annual' ? 'R$ 39,90' : 'R$ 49,90'}
                <span className="text-sm font-normal text-[#8A8A87]"> /mês</span>
              </div>

              <ul className="space-y-3.5 text-xs text-[#A3A39E] mb-8">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Até 5 contas e perfis de acesso</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Orçamento compartilhado e metas conjuntas</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Conciliação bancária automática PJ</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Suporte prioritário via WhatsApp</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#00A878]" /> Módulo fiscal e de IR automático</li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Family')}
              className="w-full py-3.5 rounded-full bg-[#1C1C19] hover:bg-[#262622] text-white font-bold text-xs transition-colors"
            >
              Contratar Family
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
