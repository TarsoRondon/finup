import React from 'react'
import { useTransactionsStore } from '../store/transactionsStore'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Printer } from 'lucide-react'

export const Reports: React.FC = () => {
  const { transactions } = useTransactionsStore()

  const categoryTotals: Record<string, number> = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  const COLORS = ['#2ECC71', '#1B5E6C', '#F39C12', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C']

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Relatórios & Demonstrações</h2>
          <p className="text-xs text-[#8FA3B3]">Distribuição por categorias e relatórios prontos para impressão.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-[#1B5E6C] hover:bg-[#2ECC71] hover:text-black text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors no-print cursor-pointer"
        >
          <Printer size={16} />
          Imprimir Relatório (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <h3 className="font-bold text-sm text-white mb-4">Despesas por Categoria</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Gasto']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A2635] border border-[#2D4055]">
          <h3 className="font-bold text-sm text-white mb-4">Valores Absolutos por Categoria</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <XAxis dataKey="name" stroke="#5E7385" fontSize={10} />
                <YAxis stroke="#5E7385" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1923', borderColor: '#2D4055', borderRadius: 12 }}
                  formatter={(val: any) => [`R$ ${Number(val).toFixed(2)}`, 'Valor']}
                />
                <Bar dataKey="value" fill="#2ECC71" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
