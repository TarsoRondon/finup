import React from 'react'
import { ShieldCheck, Lock, KeyRound, FileCheck, CheckCircle2 } from 'lucide-react'

export const Security: React.FC = () => {
  return (
    <section id="seguranca" className="py-24 bg-[#111111] border-y border-[#22221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A878]/10 border border-[#00A878]/30 text-xs font-extrabold text-[#00A878] mb-6">
              <ShieldCheck className="w-4 h-4" /> Segurança de Nível Bancário
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              O FinUp nunca mexe no seu dinheiro sem sua ordem expressa.
            </h2>
            <p className="text-base text-[#9C9C98] leading-relaxed mb-8">
              Adotamos os padrões mais rigorosos do ecossistema financeiro internacional para proteger seus dados, conexões bancárias e privacidade de ponta a ponta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#181816] p-5 rounded-2xl border border-[#262622]">
                <Lock className="w-6 h-6 text-[#00A878] mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Criptografia SSL 256-bit</h3>
                <p className="text-xs text-[#8A8A87]">Seus dados trafegam exclusivamente por túneis seguros com chaves assimétricas.</p>
              </div>

              <div className="bg-[#181816] p-5 rounded-2xl border border-[#262622]">
                <KeyRound className="w-6 h-6 text-[#2ECC71] mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Senhas Criptografadas</h3>
                <p className="text-xs text-[#8A8A87]">Nem nós temos acesso à sua senha. Armazenamento com hash seguro via Firebase Auth.</p>
              </div>

              <div className="bg-[#181816] p-5 rounded-2xl border border-[#262622]">
                <FileCheck className="w-6 h-6 text-[#3B82F6] mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Regulação Open Finance</h3>
                <p className="text-xs text-[#8A8A87]">Conectores oficiais homologados em conformidade com as diretrizes do Banco Central.</p>
              </div>

              <div className="bg-[#181816] p-5 rounded-2xl border border-[#262622]">
                <ShieldCheck className="w-6 h-6 text-[#F59E0B] mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Privacidade LGPD</h3>
                <p className="text-xs text-[#8A8A87]">Seus dados não são vendidos para terceiros nem usados para publicidade invasiva.</p>
              </div>
            </div>
          </div>

          {/* Visual Security Box */}
          <div className="bg-[#181816] border border-[#2E2E2A] rounded-3xl p-8 relative shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#262622] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A878]/10 text-[#00A878] flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Status de Proteção Ativa</h4>
                  <p className="text-xs text-[#00A878] font-semibold">● Todos os sistemas operando com segurança</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#8A8A87]">TLS 1.3</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-[#141412] rounded-xl border border-[#22221F]">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> Isolamento Multi-Tenant Firestore
                </span>
                <span className="text-[10px] font-bold text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded">Ativo</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#141412] rounded-xl border border-[#22221F]">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> Validação de 2 Fatores (2FA)
                </span>
                <span className="text-[10px] font-bold text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded">Habilitado</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#141412] rounded-xl border border-[#22221F]">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878]" /> Consentimento Revogável de Bancos
                </span>
                <span className="text-[10px] font-bold text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded">Controlado</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#262622] text-center">
              <p className="text-xs text-[#8A8A87]">
                Seus dados bancários são lidos exclusivamente no modo leitura protegida. O FinUp não possui acesso de movimentação direta sem sua senha ou token de autorização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
