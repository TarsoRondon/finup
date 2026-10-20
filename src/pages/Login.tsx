import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ArrowRight, ShieldCheck, Zap, Lock, Mail } from 'lucide-react'

export const Login: React.FC = () => {
  const { loginEmail, registerEmail, loginGoogle, loginDemo } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await registerEmail(email, password, name)
      } else {
        await loginEmail(email, password)
      }
    } catch (err: any) {
      setError(err?.message || 'Falha ao autenticar. Tente novamente ou use o Modo Demo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-[#0F1923] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A2635] border border-[#2D4055] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1B5E6C] to-[#2ECC71] items-center justify-center text-white text-2xl font-black shadow-lg mb-3">
            F
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Fin<span className="text-[#2ECC71]">Up</span>
          </h1>
          <p className="text-sm text-[#8FA3B3] mt-1 font-medium">
            Gestão Financeira Pessoal, Open Finance & Investimentos
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-[#5E7385]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="seu.email@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8FA3B3] mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-[#5E7385]" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] text-white text-sm focus:outline-none focus:border-[#2ECC71]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg disabled:opacity-50"
          >
            {loading ? 'Processando...' : isRegister ? 'Criar Conta Gratuita' : 'Entrar na Plataforma'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#2D4055]"></div>
          <span className="text-[11px] font-semibold text-[#5E7385] uppercase">ou acesse com</span>
          <div className="h-px flex-1 bg-[#2D4055]"></div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => loginGoogle()}
            type="button"
            className="w-full py-3 rounded-xl bg-[#0F1923] border border-[#2D4055] hover:border-gray-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Continuar com Google
          </button>

          <button
            onClick={loginDemo}
            type="button"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1B5E6C] to-[#0D3D4A] border border-[#2ECC71]/40 text-[#2ECC71] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Zap size={15} />
            Entrar como Convidado (Modo Demonstração 1-Clique)
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#8FA3B3] hover:text-[#2ECC71] font-semibold cursor-pointer"
          >
            {isRegister ? 'Já possui conta? Clique para entrar' : 'Não tem cadastro? Crie sua conta grátis'}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#2D4055] flex items-center justify-center gap-2 text-[10px] text-[#5E7385]">
          <ShieldCheck size={14} className="text-[#2ECC71]" />
          <span>Criptografia TLS 256-bit & Proteção LGPD</span>
        </div>
      </div>
    </div>
  )
}
