import React, { useState } from 'react'
import { X, Sparkles, ShieldCheck, ArrowRight, Lock, Mail, User } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [step, setStep] = useState(1) // For multi-step register
  const [forgotSent, setForgotSent] = useState(false)

  const { setUser, setDemoUser } = useAuthStore()

  if (!isOpen) return null

  const handleDemoClick = () => {
    setDemoUser()
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'forgot') {
      setForgotSent(true)
      return
    }
    if (mode === 'login') {
      setUser({
        uid: 'user-' + Date.now(),
        email: email || 'usuario@finup.ai',
        displayName: email ? email.split('@')[0] : 'Investidor FinUp',
        isDemo: false
      })
      onClose()
    } else {
      if (step < 2) {
        setStep(2)
      } else {
        setUser({
          uid: 'user-' + Date.now(),
          email: email || 'novo@finup.ai',
          displayName: name || 'Novo Usuário',
          isDemo: false
        })
        onClose()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#141412] border border-[#2E2E2A] rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8A8A87] hover:text-white hover:bg-[#22221F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00A878] to-[#2ECC71] mx-auto flex items-center justify-center font-black text-[#0E0E0C] text-xl shadow-lg shadow-[#00A878]/20 mb-3">
            F↑
          </div>
          <h3 className="text-xl font-black text-white">
            {mode === 'login' ? 'Bem-vindo de volta ao FinUp' : mode === 'register' ? 'Criar sua conta no FinUp' : 'Recuperar Acesso à Conta'}
          </h3>
          <p className="text-xs text-[#8A8A87] mt-1">
            {mode === 'login' ? 'Acesse seu painel financeiro e investimentos' : mode === 'register' ? 'Junte-se à revolução do Open Finance e IA' : 'Enviaremos instruções de redefinição para seu e-mail'}
          </p>
        </div>

        {/* 1-Click Demo Shortcut Highlight Box */}
        {mode !== 'forgot' && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#1A2621] to-[#16201B] border border-[#00A878]/40 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-extrabold text-[#00A878] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Quer apenas testar o sistema?
              </span>
              <p className="text-[11px] text-[#A3A39E] mt-0.5">Acesso completo pré-carregado em 1 clique</p>
            </div>
            <button
              onClick={handleDemoClick}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-black text-xs transition-transform active:scale-95 shadow-md"
            >
              Acesso Demo
            </button>
          </div>
        )}

        {/* Mode Tabs */}
        {mode !== 'forgot' ? (
          <div className="grid grid-cols-2 p-1 bg-[#1C1C19] border border-[#2A2A26] rounded-xl mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('login'); setStep(1) }}
              className={`py-2 rounded-lg transition-all ${mode === 'login' ? 'bg-[#00A878] text-[#0E0E0C] shadow-sm' : 'text-[#8A8A87] hover:text-white'}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setStep(1) }}
              className={`py-2 rounded-lg transition-all ${mode === 'register' ? 'bg-[#00A878] text-[#0E0E0C] shadow-sm' : 'text-[#8A8A87] hover:text-white'}`}
            >
              Criar Conta
            </button>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <button
              type="button"
              onClick={() => { setMode('login'); setForgotSent(false) }}
              className="text-xs text-[#00A878] hover:underline font-bold"
            >
              ← Voltar para o Login
            </button>
          </div>
        )}

        {/* Form */}
        {mode === 'forgot' && forgotSent ? (
          <div className="p-6 bg-[#181816] rounded-2xl border border-[#00A878]/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#00A878]/15 text-[#00A878] flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-sm font-black text-white">E-mail de Recuperação Enviado!</h4>
            <p className="text-xs text-[#8A8A87]">
              Enviamos um link seguro para <strong className="text-white">{email}</strong> com as orientações para criar uma nova senha.
            </p>
            <button
              type="button"
              onClick={() => { setMode('login'); setForgotSent(false) }}
              className="w-full mt-2 py-3 rounded-xl bg-[#00A878] text-[#0E0E0C] font-extrabold text-xs"
            >
              Ir para Tela de Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && step === 1 && (
              <div>
                <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Seu Nome Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tarso Rondon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#A3A39E] mb-1.5">Endereço de E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#A3A39E]">Sua Senha</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[#00A878] hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#181816] border border-[#2E2E2A] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#00A878]"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="p-3 bg-[#181816] rounded-xl border border-[#262622] text-[11px] text-[#8A8A87] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${password.length >= 6 ? 'bg-[#00A878]' : 'bg-[#666]'}`} />
                  <span>Mínimo de 6 caracteres</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-[#00A878]' : 'bg-[#666]'}`} />
                  <span>Pelo menos um número</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#00A878]/20"
            >
              {mode === 'login' ? 'Entrar na Conta' : mode === 'register' ? (step === 1 ? 'Continuar Cadastro' : 'Finalizar e Acessar') : 'Enviar Link de Recuperação'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Security badge at bottom */}
        <div className="mt-6 pt-4 border-t border-[#22221F] text-center flex items-center justify-center gap-2 text-[11px] text-[#8A8A87]">
          <ShieldCheck className="w-4 h-4 text-[#00A878]" />
          Conexão Segura com Criptografia 256-bit
        </div>
      </div>
    </div>
  )
}
