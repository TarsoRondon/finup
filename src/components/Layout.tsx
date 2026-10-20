import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions'
import { Investments } from '../pages/Investments'
import { Goals } from '../pages/Goals'
import { Reports } from '../pages/Reports'
import { ConnectBank } from '../pages/ConnectBank'

export const Layout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard')

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0F1923]">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 overflow-y-auto p-8">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'transactions' && <Transactions />}
        {currentTab === 'investments' && <Investments />}
        {currentTab === 'goals' && <Goals />}
        {currentTab === 'reports' && <Reports />}
        {currentTab === 'connect' && <ConnectBank />}
      </main>
    </div>
  )
}
