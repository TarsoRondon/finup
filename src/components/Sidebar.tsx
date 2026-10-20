import React from 'react'
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Target,
  PieChart,
  Landmark,
  LogOut,
  Zap
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface SidebarProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, isDemo, logout } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'transactions', label: 'Extrato & Pix', icon: ArrowLeftRight },
    { id: 'investments', label: 'Investimentos', icon: TrendingUp },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'reports', label: 'Relatórios', icon: PieChart },
    { id: 'connect', label: 'Open Finance', icon: Landmark },
  ]

  return (
    <aside className="w-64 bg-[#1A2635] border-r border-[#2D4055] flex flex-col justify-between shrink-0">
      <div>
        <div className="p-6 border-b border-[#2D4055]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1B5E6C] to-[#2ECC71] flex items-center justify-center font-bold text-lg text-white shadow-lg">
              F
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">Fin<span className="text-[#2ECC71]">Up</span></span>
              <p className="text-[10px] text-[#8FA3B3] uppercase tracking-wider font-semibold">Organização & Futuro</p>
            </div>
          </div>
          {isDemo && (
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B5E6C]/30 border border-[#1B5E6C] text-[#2ECC71] text-xs font-semibold">
              <Zap size={13} />
              <span>Modo Demonstração</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = currentTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1B5E6C] text-white shadow-md font-semibold'
                    : 'text-[#8FA3B3] hover:bg-[#223040] hover:text-[#F0F4F8]'
                }`}
              >
                <Icon size={18} className={active ? 'text-[#2ECC71]' : 'text-[#8FA3B3]'} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#2D4055]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0F1923]/60 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center text-xs font-bold text-[#2ECC71]">
            {user?.displayName?.[0] || 'U'}
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-bold truncate text-[#F0F4F8]">{user?.displayName || 'Usuário'}</p>
            <p className="text-[10px] text-[#8FA3B3] truncate">{user?.email || 'conta@finup.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  )
}
