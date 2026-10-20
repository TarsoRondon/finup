import React, { useState, useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { useAppStore } from './store/appStore'

// Layout & Landing components
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/landing/Hero'
import { Features } from './components/landing/Features'
import { Security } from './components/landing/Security'
import { Pricing } from './components/landing/Pricing'
import { FAQ } from './components/landing/FAQ'
import { Footer } from './components/layout/Footer'
import { AuthModal } from './components/auth/AuthModal'

// App Interior
import { AppLayout } from './components/app/AppLayout'

// Icons for CTA
import { ArrowRight, Sparkles } from 'lucide-react'

export function App() {
  const { user } = useAuthStore()
  const { theme } = useAppStore()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  // Sync theme to HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  // If user is authenticated or demo mode is active, render full banking app
  if (user) {
    return <AppLayout />
  }

  // Otherwise, render full institutional landing page
  return (
    <div className="min-h-screen bg-[#0E0E0C] text-white selection:bg-[#00A878] selection:text-[#0E0E0C]">
      {/* Navbar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Hero */}
      <Hero onOpenAuth={handleOpenAuth} />

      {/* Core Features */}
      <Features />

      {/* Bank Grade Security */}
      <Security />

      {/* Transparent Pricing */}
      <Pricing onSelectPlan={() => handleOpenAuth('register')} />

      {/* FAQ */}
      <FAQ />

      {/* Final Conversion Banner */}
      <section className="py-20 bg-gradient-to-b from-[#0E0E0C] via-[#141412] to-[#0A0A09] border-t border-[#1C1C19] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A878]/10 border border-[#00A878]/30 text-xs font-black text-[#00A878] mb-6">
            <Sparkles className="w-4 h-4" /> Pronto para assumir o controle?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Sua vida financeira organizada em menos de 2 minutos.
          </h2>
          <p className="text-base text-[#9C9C98] max-w-xl mx-auto mb-10">
            Junte-se a milhares de investidores que utilizam a inteligência do FinUp para eliminar dívidas, controlar contas e investir com tranquilidade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#00A878]/25 hover:scale-[1.02]"
            >
              Criar Conta Gratuita <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => useAuthStore.getState().setDemoUser()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181816] hover:bg-[#22221F] text-white border border-[#2E2E2A] font-bold text-sm transition-colors"
            >
              Testar no Modo Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}

export default App
