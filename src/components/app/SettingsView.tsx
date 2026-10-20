import React, { useState } from 'react'
import { Settings, Moon, Sun, Shield, User, Landmark, RotateCcw, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useAuthStore } from '../../store/authStore'

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme, resetToDefault } = useAppStore()
  const { user } = useAuthStore()
  const [successMsg, setSuccessMsg] = useState('')

  const handleReset = () => {
    if (confirm('Deseja restaurar os dados de demonstração para os valores iniciais de teste?')) {
      resetToDefault()
      setSuccessMsg('Dados restaurados com sucesso!')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#A3A39E] block mb-1">
          Preferências & Governança
        </span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#00A878]" /> Configurações do Sistema
        </h1>
        <p className="text-xs text-[#8A8A87] mt-1">
          Personalize a aparência, gerencie conexões do Open Finance e parâmetros de segurança.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-[#00A878]/10 border border-[#00A878]/40 rounded-2xl text-xs font-bold text-[#00A878] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A878]/10 text-[#00A878] flex items-center justify-center font-bold">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Tema da Interface</h3>
              <p className="text-xs text-[#8A8A87]">Alterne entre tema Escuro e Claro</p>
            </div>
          </div>

          <div className="p-4 bg-[#181816] rounded-2xl border border-[#262622] flex items-center justify-between">
            <span className="text-xs font-bold text-white">
              Modo Escuro Ativo (Dark Mode)
            </span>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                theme === 'dark' ? 'bg-[#00A878]' : 'bg-[#333]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Dados do Titular</h3>
              <p className="text-xs text-[#8A8A87]">Identificação cadastral da conta</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-[#1C1C19]">
              <span className="text-[#8A8A87]">Nome:</span>
              <strong className="text-white">{user?.displayName || 'Tarso Rondon'}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C1C19]">
              <span className="text-[#8A8A87]">E-mail:</span>
              <span className="text-white font-mono">{user?.email || 'tarso.rondon@ifro.edu.br'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#8A8A87]">Tipo de Conta:</span>
              <span className="text-[#00A878] font-bold">
                {user?.isDemo ? 'Modo Demonstração VIP' : 'Conta Pessoal Ativa'}
              </span>
            </div>
          </div>
        </div>

        {/* Connected Banks Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Conexões Open Finance</h3>
              <p className="text-xs text-[#8A8A87]">Instituições sincronizadas</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-[#181816] rounded-xl border border-[#262622] flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">🟣 Nubank</span>
              <span className="text-[10px] text-[#00A878] font-bold bg-[#00A878]/10 px-2 py-0.5 rounded">Sincronizado</span>
            </div>
            <div className="p-3 bg-[#181816] rounded-xl border border-[#262622] flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">🟠 Banco Inter</span>
              <span className="text-[10px] text-[#00A878] font-bold bg-[#00A878]/10 px-2 py-0.5 rounded">Sincronizado</span>
            </div>
            <div className="p-3 bg-[#181816] rounded-xl border border-[#262622] flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">🔵 Itaú Unibanco</span>
              <span className="text-[10px] text-[#00A878] font-bold bg-[#00A878]/10 px-2 py-0.5 rounded">Sincronizado</span>
            </div>
          </div>
        </div>

        {/* Security & Reset Card */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5484D]/10 text-[#E5484D] flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Manutenção & Dados</h3>
              <p className="text-xs text-[#8A8A87]">Segurança e reset do simulador</p>
            </div>
          </div>

          <p className="text-xs text-[#8A8A87] leading-relaxed">
            Se você fez muitos testes com transferências Pix e pagamento de contas e deseja retornar ao saldo inicial pré-configurado de R$ 8.420,50:
          </p>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-[#181816] hover:bg-[#22221F] text-[#E5484D] border border-[#E5484D]/30 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Restaurar Dados de Demonstração
          </button>
        </div>
      </div>
    </div>
  )
}
