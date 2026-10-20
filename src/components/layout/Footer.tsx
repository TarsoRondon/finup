import React from 'react'
import { ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0A0A09] border-t border-[#1C1C19] text-[#8A8A87] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00A878] flex items-center justify-center font-black text-[#0E0E0C] text-sm">
                F↑
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">FinUp Enterprise</span>
            </div>
            <p className="text-xs text-[#7A7A75] max-w-sm leading-relaxed mb-6">
              A plataforma definitiva de Open Finance, banco digital e inteligência artificial para controle patrimonial e financeiro pessoal.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#00A878] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
              Sistemas Operando com 99.98% de Uptime
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Produto</h4>
            <ul className="space-y-2.5">
              <li><a href="#recursos" className="hover:text-white transition-colors">Área Pix 24/7</a></li>
              <li><a href="#recursos" className="hover:text-white transition-colors">Open Finance</a></li>
              <li><a href="#recursos" className="hover:text-white transition-colors">Investimentos B3</a></li>
              <li><a href="#recursos" className="hover:text-white transition-colors">Gestão de Boletos</a></li>
              <li><a href="#ia" className="hover:text-white transition-colors">FinUp IA</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Segurança</h4>
            <ul className="space-y-2.5">
              <li><a href="#seguranca" className="hover:text-white transition-colors">Criptografia 256-bit</a></li>
              <li><a href="#seguranca" className="hover:text-white transition-colors">Regulação Bacen</a></li>
              <li><a href="#seguranca" className="hover:text-white transition-colors">Privacidade LGPD</a></li>
              <li><a href="#seguranca" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#seguranca" className="hover:text-white transition-colors">Auditoria de Segurança</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">Sobre o FinUp</a></li>
              <li><a href="#planos" className="hover:text-white transition-colors">Planos & Preços</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato & Suporte</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#181816] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FinUp Finance Inc. Todos os direitos reservados. CNPJ 00.000.000/0001-00.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#00A878] p-2 rounded-lg bg-[#141412] border border-[#22221F] transition-colors"
          >
            Voltar ao topo <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
