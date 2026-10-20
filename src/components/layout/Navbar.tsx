import React, { useState } from 'react'
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'register') => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const setDemoUser = useAuthStore((s) => s.setDemoUser)

  const handleDemoAccess = () => {
    setDemoUser()
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0E0E0C]/85 border-b border-[#22221F] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00A878] to-[#2ECC71] flex items-center justify-center font-black text-[#0E0E0C] text-xl shadow-lg shadow-[#00A878]/20">
            F↑
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              FinUp <span className="text-[#00A878] font-black text-xs px-2 py-0.5 rounded-full bg-[#00A878]/10 border border-[#00A878]/30">ENTERPRISE</span>
            </span>
            <p className="text-[10px] text-[#8A8A87] font-medium tracking-wider uppercase -mt-0.5">Banking & AI Financial OS</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#A3A39E]">
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#open-finance" className="hover:text-white transition-colors">Open Finance</a>
          <a href="#ia" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00A878]" /> FinUp IA
          </a>
          <a href="#seguranca" className="hover:text-white transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2ECC71]" /> Segurança
          </a>
          <a href="#planos" className="hover:text-white transition-colors">Planos</a>
          <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-sm font-bold text-white hover:text-[#00A878] px-4 py-2.5 transition-colors"
          >
            Entrar
          </button>

          {/* Quick 1-click Demo */}
          <button
            onClick={handleDemoAccess}
            className="text-xs font-extrabold bg-[#1A2635] hover:bg-[#223040] text-[#00A878] border border-[#00A878]/40 px-3.5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
            title="Acessar painel completo instantaneamente sem cadastro"
          >
            <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
            Acesso Demo
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="text-xs sm:text-sm font-extrabold bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-[#00A878]/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            Abrir Conta <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#A3A39E] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141412] border-b border-[#22221F] px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-semibold text-[#A3A39E]">
            <a href="#recursos" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Recursos</a>
            <a href="#open-finance" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Open Finance</a>
            <a href="#ia" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">FinUp IA</a>
            <a href="#seguranca" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Segurança</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Planos</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">FAQ</a>
          </div>
          <div className="pt-4 border-t border-[#22221F] flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); handleDemoAccess() }}
              className="w-full text-center py-2.5 font-bold text-[#00A878] bg-[#1A2635] border border-[#00A878]/40 rounded-xl"
            >
              Entrar como Demo (1 Clique)
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth('login') }}
              className="w-full text-center py-2.5 font-bold text-white bg-[#22221F] rounded-xl"
            >
              Fazer Login
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth('register') }}
              className="w-full text-center py-2.5 font-extrabold text-[#0E0E0C] bg-[#00A878] rounded-xl"
            >
              Abrir Minha Conta
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
