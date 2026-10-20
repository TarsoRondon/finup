import React from 'react'
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface HeroProps {
  onOpenAuth: (mode?: 'login' | 'register') => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  const setDemoUser = useAuthStore((s) => s.setDemoUser)

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-radial from-[#1A1A18] via-[#0E0E0C] to-[#0E0E0C]">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00A878]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[350px] h-[350px] bg-[#2ECC71]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1A17] border border-[#2A2A26] text-xs font-semibold text-[#A3A39E] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#00A878] animate-ping" />
            <span className="text-white font-bold">Open Finance & IA 2.0</span>
            <span className="text-[#666]">•</span>
            <span className="text-[#00A878]">Simples por fora, sofisticado por dentro</span>
          </div>
        </div>

        {/* Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
            Uma IA que cuida da sua grana enquanto você <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A878] via-[#2ECC71] to-[#34D399]">cuida da sua vida.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9C9C98] max-w-2xl mx-auto leading-relaxed">
            O super app financeiro definitivo que unifica sua conta digital, transferências Pix instantâneas, carteira de investimentos e inteligência conversacional em um único painel calmo e sem burocracia.
          </p>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#00A878]/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            Começar Grátis Agora <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setDemoUser()}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#181816] hover:bg-[#22221F] text-white border border-[#2E2E2A] font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:border-[#00A878]/50"
          >
            <Sparkles className="w-4 h-4 text-[#00A878]" />
            Explorar Modo Demonstração
          </button>
        </div>

        {/* Micro Trust Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-[#8A8A87] mb-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> Sem taxa de manutenção
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00A878]" /> Criptografia Ponta a Ponta 256-bit
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> Compatível com Open Finance
          </div>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-[#141412] border border-[#2E2E2A] shadow-2xl p-4 sm:p-8 backdrop-blur-md overflow-hidden">
          {/* Mockup Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#22221F] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E5484D]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#2ECC71]" />
              <span className="ml-3 text-xs font-mono text-[#666]">app.finup.finance/dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00A878] bg-[#00A878]/10 px-3 py-1 rounded-full border border-[#00A878]/20">
              <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
              Sincronizado via Open Finance
            </div>
          </div>

          {/* Grid Mock Inside */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Balance Box */}
            <div className="md:col-span-2 bg-[#1C1C19] border border-[#2E2E2A] rounded-2xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#8A8A87]">Saldo Disponível em Conta</span>
                <span className="text-xs font-bold text-[#00A878] bg-[#00A878]/10 px-2.5 py-1 rounded-md">Conta Corrente Ativa</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
                R$ 8.420<span className="text-2xl text-[#8A8A87]">,50</span>
              </div>

              {/* KPIs Row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2A2A26]">
                <div className="bg-[#141412] p-3 rounded-xl border border-[#262622]">
                  <span className="text-[10px] uppercase font-bold text-[#8A8A87] block">Receitas Mês</span>
                  <span className="text-sm sm:text-base font-extrabold text-[#2ECC71]">+R$ 6.850</span>
                </div>
                <div className="bg-[#141412] p-3 rounded-xl border border-[#262622]">
                  <span className="text-[10px] uppercase font-bold text-[#8A8A87] block">Despesas Mês</span>
                  <span className="text-sm sm:text-base font-extrabold text-[#E5484D]">-R$ 4.230</span>
                </div>
                <div className="bg-[#141412] p-3 rounded-xl border border-[#262622]">
                  <span className="text-[10px] uppercase font-bold text-[#8A8A87] block">Saldo Mês</span>
                  <span className="text-sm sm:text-base font-extrabold text-white">R$ 2.620</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Insight Bubble */}
            <div className="bg-gradient-to-b from-[#1C2621] to-[#141412] border border-[#00A878]/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-[#00A878]/5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00A878] text-[#0E0E0C] font-black flex items-center justify-center text-sm">
                    IA
                  </div>
                  <div>
                    <h2 className="text-xs font-extrabold text-white">FinUp Intelligence</h2>
                    <p className="text-[10px] text-[#00A878]">Análise em tempo real</p>
                  </div>
                </div>
                <div className="bg-[#181816] p-3.5 rounded-xl border border-[#262622] text-xs text-[#DCDCD8] leading-relaxed mb-4">
                  "Você tem <strong className="text-white">4 contas pendentes</strong> (R$ 2.515,60). Deseja quitar a Internet Claro (R$ 99,90) agora e economizar juros?"
                </div>
              </div>

              <button
                onClick={() => setDemoUser()}
                className="w-full py-2.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Abrir FinUp IA <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Floating Cards Mock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-[#181816] border border-[#262622] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00A878]/10 text-[#00A878] flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Pix Instantâneo 24/7</span>
                  <span className="text-[10px] text-[#8A8A87]">Maria Santos (Aluguel)</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#E5484D]">-R$ 1.200,00</span>
            </div>

            <div className="bg-[#181816] border border-[#262622] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold text-xs">
                  ₿
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Bitcoin (Cripto)</span>
                  <span className="text-[10px] text-[#8A8A87]">R$ 385.400,00</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#2ECC71] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +3.4%
              </span>
            </div>

            <div className="bg-[#181816] border border-[#262622] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold text-xs">
                  🛡️
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Meta Emergência</span>
                  <span className="text-[10px] text-[#8A8A87]">R$ 14.500 / 20.000</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#00A878]">72.5%</span>
            </div>
          </div>
        </div>

        {/* Connected Banks Badges */}
        <div className="mt-16 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8A8A87] mb-6">
            Conecte suas instituições favoritas com autorização oficial Open Finance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-75">
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">🟣 Nubank</span>
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">🟠 Banco Inter</span>
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">🔵 Itaú Unibanco</span>
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">🔴 Bradesco</span>
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">🟡 Banco do Brasil</span>
            <span className="text-sm font-bold text-[#A3A39E] flex items-center gap-2">⚪ XP Investimentos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
