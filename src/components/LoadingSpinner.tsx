import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#0F1923] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-[#1B5E6C] border-t-[#2ECC71] rounded-full animate-spin"></div>
      <p className="text-xs text-[#8FA3B3] font-semibold tracking-wider">CARREGANDO FINUP...</p>
    </div>
  )
}
