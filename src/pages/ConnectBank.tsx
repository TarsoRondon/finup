import React, { useState } from 'react'
import { Landmark, ShieldCheck, Zap, RefreshCw } from 'lucide-react'

export const ConnectBank: React.FC = () => {
  const [connecting, setConnecting] = useState(false)

  const handleOpenPluggy = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      alert('Conector Pluggy Open Finance: Conexão simulada com sucesso! Transações sincronizadas.')
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Open Finance Conector</h2>
        <p className="text-xs text-[#8FA3B3]">Integração oficial com instituições bancárias via API Pluggy.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#1A2635] border border-[#2D4055] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1B5E6C]/30 border border-[#1B5E6C] flex items-center justify-center text-[#2ECC71]">
            <Landmark size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Conexão Bancária Automatizada</h3>
            <p className="text-xs text-[#8FA3B3]">Sincronize extratos do Nubank, Itaú, Banco Inter, Bradesco e outros.</p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-2xl bg-[#0F1923] border border-[#2D4055] text-xs text-[#8FA3B3]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#2ECC71]" />
            <span>Autorização de leitura segura com token efêmero emitido pelo BFF.</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#2ECC71]" />
            <span>Classificação automática de categorias para cada compra registrada.</span>
          </div>
        </div>

        <button
          onClick={handleOpenPluggy}
          disabled={connecting}
          className="w-full py-4 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          {connecting ? <RefreshCw className="animate-spin" size={18} /> : <Landmark size={18} />}
          {connecting ? 'Conectando ao Pluggy...' : 'Iniciar Conexão Open Finance'}
        </button>
      </div>
    </div>
  )
}
