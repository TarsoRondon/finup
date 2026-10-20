import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
  id: string
  title: string
  message?: string
  type: ToastType
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
})

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(({ title, message, type }: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
    setToasts((prev) => [...prev, { id, title, message, type }])
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }, [removeToast])

  const success = useCallback((title: string, message?: string) => {
    toast({ title, message, type: 'success' })
  }, [toast])

  const error = useCallback((title: string, message?: string) => {
    toast({ title, message, type: 'error' })
  }, [toast])

  const info = useCallback((title: string, message?: string) => {
    toast({ title, message, type: 'info' })
  }, [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const isSuccess = t.type === 'success'
          const isError = t.type === 'error'
          const isWarning = t.type === 'warning'

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all animate-fade-in ${
                isSuccess
                  ? 'bg-[#12241A]/95 border-[#00A878] text-white'
                  : isError
                  ? 'bg-[#291415]/95 border-[#E5484D] text-white'
                  : isWarning
                  ? 'bg-[#291F14]/95 border-[#F59E0B] text-white'
                  : 'bg-[#181816]/95 border-[#2D2D2A] text-white'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00A878]" />}
                {isError && <AlertTriangle className="w-5 h-5 text-[#E5484D]" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-[#3B82F6]" />}
              </div>

              <div className="flex-1 pr-2">
                <p className="text-xs font-black tracking-tight">{t.title}</p>
                {t.message && <p className="text-[11px] text-[#A3A39E] mt-0.5 leading-snug">{t.message}</p>}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 text-[#8A8A87] hover:text-white rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
