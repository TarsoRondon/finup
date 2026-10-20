import React, { useState } from 'react'
import {
  LayoutDashboard,
  Zap,
  ArrowRightLeft,
  FileText,
  CreditCard,
  Receipt,
  TrendingUp,
  Target,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'

// Views
import { MarketTickerBar } from './MarketTickerBar'
import { DashboardView } from './DashboardView'
import { PixView } from './PixView'
import { TransferView } from './TransferView'
import { BillsView } from './BillsView'
import { CardsView } from './CardsView'
import { TransactionsView } from './TransactionsView'
import { InvestmentsView } from './InvestmentsView'
import { GoalsView } from './GoalsView'
import { AIView } from './AIView'
import { ReportsView } from './ReportsView'
import { SettingsView } from './SettingsView'

export const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { user, isDemo, logout } = useAuthStore()
  const { balance, theme, toggleTheme } = useAppStore()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pix', label: 'Área Pix 24/7', icon: Zap },
    { id: 'transfer', label: 'Transferências TED', icon: ArrowRightLeft },
    { id: 'bills', label: 'Pagamentos / Boletos', icon: FileText },
    { id: 'cards', label: 'Cartões & Faturas', icon: CreditCard },
    { id: 'transactions', label: 'Extrato & Transações', icon: Receipt },
    { id: 'investments', label: 'Investimentos B3', icon: TrendingUp },
    { id: 'goals', label: 'Metas & Orçamento', icon: Target },
    { id: 'ai', label: 'FinUp IA Assistente', icon: Sparkles, badge: 'IA' },
    { id: 'reports', label: 'Relatórios & PDF', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
      case 'pix':
        return <PixView />
      case 'transfer':
        return <TransferView />
      case 'bills':
        return <BillsView />
      case 'cards':
        return <CardsView />
      case 'transactions':
        return <TransactionsView />
      case 'investments':
        return <InvestmentsView />
      case 'goals':
        return <GoalsView />
      case 'ai':
        return <AIView />
      case 'reports':
        return <ReportsView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0E0C] text-white flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#141412] border-r border-[#22221F] p-4 shrink-0 justify-between select-none">
        <div>
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 px-3 py-3 rounded-2xl cursor-pointer hover:bg-[#181816] transition-colors mb-6"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A878] to-[#2ECC71] flex items-center justify-center font-black text-[#0E0E0C] text-base shadow-md shadow-[#00A878]/20">
              F↑
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight block">
                FinUp
              </span>
              <span className="text-[10px] text-[#00A878] font-bold tracking-wider uppercase block -mt-1">
                {isDemo ? '● Modo Demonstração' : '● Conta Oficial'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#00A878] text-[#0E0E0C] shadow-md shadow-[#00A878]/20 font-black'
                      : 'text-[#A3A39E] hover:text-white hover:bg-[#181816]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0E0E0C]' : 'text-[#8A8A87]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-[#0E0E0C] text-[#00A878]' : 'bg-[#00A878]/15 text-[#00A878]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="pt-4 border-t border-[#22221F] space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-[#181816] rounded-xl border border-[#262622]">
            <div className="overflow-hidden pr-2">
              <span className="text-xs font-bold text-white block truncate">{user?.displayName || 'Tarso Rondon'}</span>
              <span className="text-[10px] text-[#8A8A87] font-mono truncate block">{user?.email || 'tarso.rondon@ifro.edu.br'}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-[#8A8A87] hover:text-white hover:bg-[#22221F]"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#3B82F6]" />}
            </button>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#E5484D] hover:bg-[#E5484D]/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Real-Time Market Ticker */}
        <MarketTickerBar />

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#0E0E0C]/90 backdrop-blur-md border-b border-[#22221F] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#8A8A87] hover:text-white hover:bg-[#181816]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#8A8A87] block">Sistema Ativo</span>
              <h2 className="text-sm font-black text-white capitalize">{activeTab}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Balance indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#141412] border border-[#22221F] rounded-xl text-xs">
              <span className="text-[#8A8A87]">Saldo:</span>
              <span className="font-extrabold text-[#00A878]">
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {isDemo && (
              <span className="text-[11px] font-black bg-[#00A878]/10 text-[#00A878] border border-[#00A878]/30 px-2.5 py-1 rounded-full">
                DEMO VIP
              </span>
            )}

            <button
              onClick={() => logout()}
              className="text-xs font-bold text-[#8A8A87] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#181816] transition-colors"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141412] border-b border-[#22221F] p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold ${
                  activeTab === item.id ? 'bg-[#00A878] text-[#0E0E0C]' : 'text-[#8A8A87]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>
    </div>
  )
}
