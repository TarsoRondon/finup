import React from 'react'
import { Printer, Download, TrendingUp, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useToast } from '../../contexts/ToastContext'

export const ReportsView: React.FC = () => {
  const { balance, transactions, investments } = useAppStore()
  const toast = useToast()

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense' || t.type === 'pix' || t.type === 'bill' || t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0)

  const netSavings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : '0.0'

  const totalInvested = investments.reduce((acc, i) => acc + i.currentPrice * i.quantity, 0)

  // Print function
  const handlePrint = () => {
    window.print()
  }

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Data', 'Descricao', 'Categoria', 'Tipo', 'Valor (R$)', 'Status']
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.type,
      t.amount.toFixed(2).replace('.', ','),
      t.status
    ])

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `finup_relatorio_mensal_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Relatório CSV Gerado!', 'Arquivo pronto para importação contábil.')
  }

  return (
    <div className="space-y-6 animate-fade-in print-area">
      {/* Header */}
      <div className="bg-[#141412] p-6 rounded-3xl border border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A878] block mb-1">
            Analytics & Inteligência Financeira
          </span>
          <h1 className="text-2xl font-black text-white">Relatório Financeiro Consolidado</h1>
          <p className="text-xs text-[#8A8A87] mt-1">
            Métricas de fluxo de caixa, taxa de poupança mensal e evolução patrimonial.
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#00A878] hover:bg-[#008f66] text-[#0E0E0C] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-[#00A878]/15"
          >
            <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#1C1C19] hover:bg-[#262622] text-white border border-[#2A2A26] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#00A878]" /> Baixar CSV
          </button>
        </div>
      </div>

      {/* 4 KPIs Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#141412] border border-[#262622] rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-[#8A8A87] block mb-1">Receitas Consolidadas</span>
          <div className="text-xl sm:text-2xl font-black text-[#2ECC71]">
            +R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-[#8A8A87]">Total de entradas</span>
        </div>

        <div className="p-5 bg-[#141412] border border-[#262622] rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-[#8A8A87] block mb-1">Despesas Consolidadas</span>
          <div className="text-xl sm:text-2xl font-black text-[#E5484D]">
            -R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-[#8A8A87]">Total de saídas</span>
        </div>

        <div className="p-5 bg-[#141412] border border-[#262622] rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-[#8A8A87] block mb-1">Saldo Líquido</span>
          <div className="text-xl sm:text-2xl font-black text-white">
            R$ {netSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-[#00A878]">Excedente operacional</span>
        </div>

        <div className="p-5 bg-[#141412] border border-[#262622] rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-[#8A8A87] block mb-1">Taxa de Poupança</span>
          <div className="text-xl sm:text-2xl font-black text-[#3B82F6]">
            {savingsRate}%
          </div>
          <span className="text-[10px] text-[#3B82F6]">Meta sugerida: &gt; 20%</span>
        </div>
      </div>

      {/* Visual Bar Comparison Chart (Pure CSS Modern Grid) */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-extrabold text-white mb-2">Histórico Semestral de Fluxo de Caixa</h3>
        <p className="text-xs text-[#8A8A87] mb-8">Comparativo mensal entre Receitas (Verde) e Despesas (Vermelho)</p>

        <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-64 border-b border-[#22221F] pb-4">
          {[
            { month: 'Mai', in: 5800, out: 3900 },
            { month: 'Jun', in: 6100, out: 4150 },
            { month: 'Jul', in: 6400, out: 4300 },
            { month: 'Ago', in: 6200, out: 3980 },
            { month: 'Set', in: 6500, out: 4100 },
            { month: 'Out', in: totalIncome, out: totalExpenses }
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1.5 h-48">
                {/* Income Bar */}
                <div
                  className="w-1/2 max-w-[24px] bg-[#2ECC71] rounded-t-lg transition-all"
                  style={{ height: `${Math.min(100, (bar.in / 7000) * 100)}%` }}
                  title={`Receitas: R$ ${bar.in}`}
                />
                {/* Expense Bar */}
                <div
                  className="w-1/2 max-w-[24px] bg-[#E5484D] rounded-t-lg transition-all"
                  style={{ height: `${Math.min(100, (bar.out / 7000) * 100)}%` }}
                  title={`Despesas: R$ ${bar.out}`}
                />
              </div>
              <span className="text-xs font-bold text-[#8A8A87]">{bar.month}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-bold">
          <div className="flex items-center gap-2 text-[#2ECC71]">
            <span className="w-3 h-3 rounded bg-[#2ECC71]" /> Receitas (Entradas)
          </div>
          <div className="flex items-center gap-2 text-[#E5484D]">
            <span className="w-3 h-3 rounded bg-[#E5484D]" /> Despesas (Saídas)
          </div>
        </div>
      </div>

      {/* Summary Table for Print */}
      <div className="bg-[#141412] border border-[#22221F] rounded-3xl p-6">
        <h3 className="text-base font-extrabold text-white mb-4">Síntese de Fechamento do Período</h3>
        <table className="w-full text-xs text-left">
          <thead className="text-[#8A8A87] border-b border-[#22221F] uppercase font-bold">
            <tr>
              <th className="py-2.5">Conta / Categoria</th>
              <th className="py-2.5">Entradas</th>
              <th className="py-2.5">Saídas</th>
              <th className="py-2.5 text-right">Saldo Parcial</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22221F] text-white">
            <tr>
              <td className="py-3 font-semibold">Conta Corrente FinUp</td>
              <td className="py-3 text-[#2ECC71]">+R$ {totalIncome.toFixed(2)}</td>
              <td className="py-3 text-[#E5484D]">-R$ {totalExpenses.toFixed(2)}</td>
              <td className="py-3 text-right font-black">R$ {balance.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold">Carteira de Investimentos (B3 + Cripto)</td>
              <td className="py-3 text-[#2ECC71]">+R$ 4.850,00 (Rentabilidade)</td>
              <td className="py-3 text-[#8A8A87]">R$ 0,00</td>
              <td className="py-3 text-right font-black">R$ {totalInvested.toFixed(2)}</td>
            </tr>
            <tr className="font-extrabold bg-[#181816]/50">
              <td className="py-3 pl-2">Total Consolidado Geral</td>
              <td className="py-3 text-[#2ECC71]">+R$ {(totalIncome + 4850).toFixed(2)}</td>
              <td className="py-3 text-[#E5484D]">-R$ {totalExpenses.toFixed(2)}</td>
              <td className="py-3 pr-2 text-right text-[#00A878] font-black text-sm">
                R$ {(balance + totalInvested).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
