import React from 'react'
import { Zap, Landmark, Sparkles, PieChart, CreditCard, TrendingUp } from 'lucide-react'

export const Features: React.FC = () => {
  return (
    <section id="recursos" className="py-24 bg-[#0E0E0C] border-t border-[#1C1C19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A878] mb-3 block">
            01 — O Sistema Completo
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Mais que um banco. <br />
            Seu <span className="text-[#00A878]">Financial Operating System</span>.
          </h2>
          <p className="text-base text-[#9C9C98] leading-relaxed">
            Elimine planilhas manuais e a necessidade de abrir 5 apps diferentes. O FinUp centraliza suas operações financeiras diárias com inteligência preditiva.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Banking & Pix */}
          <div className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/50 rounded-3xl p-8 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#00A878]/10 text-[#00A878] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Pix & Banking Instantâneo</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Envie e receba Pix com validação de saldo, recibos automáticos com autenticação criptográfica e gestão completa de chaves.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ Débito automático real na conta</li>
              <li className="flex items-center gap-2">✓ QR Code estático e dinâmico</li>
              <li className="flex items-center gap-2">✓ Histórico categorizado de transferências</li>
            </ul>
          </div>

          {/* Card 2: Open Finance */}
          <div id="open-finance" className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/50 rounded-3xl p-8 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Open Finance Unificado</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Conecte suas contas do Nubank, Itaú, Inter e corretoras em segundos com consentimento regulado pelo Banco Central.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ Saldo consolidado multi-banco</li>
              <li className="flex items-center gap-2">✓ Sem expor suas senhas bancárias</li>
              <li className="flex items-center gap-2">✓ Sincronização periódica de extratos</li>
            </ul>
          </div>

          {/* Card 3: FinUp IA */}
          <div id="ia" className="bg-[#141412] border border-[#00A878]/30 hover:border-[#00A878] rounded-3xl p-8 transition-all hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#00A878] text-[#0E0E0C] text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Diferencial
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#00A878]/10 text-[#00A878] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">FinUp IA Contextual</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Assistente inteligente que não inventa dados: ele consulta seus saldos, contas a vencer e faturas para dar diagnósticos precisos.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ "Onde posso economizar R$ 200 este mês?"</li>
              <li className="flex items-center gap-2">✓ Alertas antes de contas vencerem</li>
              <li className="flex items-center gap-2">✓ Insights práticos sem jargões contábeis</li>
            </ul>
          </div>

          {/* Card 4: Boletos & Pagamentos */}
          <div className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/50 rounded-3xl p-8 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Gestão de Boletos & Faturas</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Listagem clara de contas a vencer com alerta de urgência, baixa imediata no saldo e histórico arquivado de comprovantes.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ Leitor simulado de código de barras</li>
              <li className="flex items-center gap-2">✓ Alerta amarelo para vencimentos em 3 dias</li>
              <li className="flex items-center gap-2">✓ Nunca mais pague multas ou juros</li>
            </ul>
          </div>

          {/* Card 5: Investimentos B3 & Cripto */}
          <div className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/50 rounded-3xl p-8 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Investimentos & Cotações</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Acompanhe suas ações da Bolsa (B3), Fundos Imobiliários e Criptomoedas com rentabilidade global consolidada.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ PETR4, VALE3, FIIs e Cripto (BTC)</li>
              <li className="flex items-center gap-2">✓ Preço médio vs. cotação de mercado</li>
              <li className="flex items-center gap-2">✓ Visão de patrimônio total em tempo real</li>
            </ul>
          </div>

          {/* Card 6: Cartões & Limites */}
          <div className="bg-[#141412] border border-[#262622] hover:border-[#00A878]/50 rounded-3xl p-8 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Cartões Físicos & Virtuais</h3>
            <p className="text-sm text-[#8A8A87] leading-relaxed mb-6">
              Controle de limite em tempo real, visualização de faturas em aberto e bloqueio/desbloqueio instantâneo pelo app.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-[#A3A39E]">
              <li className="flex items-center gap-2">✓ Cartões virtuais para compras online</li>
              <li className="flex items-center gap-2">✓ Barra de limite disponível e utilizado</li>
              <li className="flex items-center gap-2">✓ Bloqueio emergencial com 1 clique</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
