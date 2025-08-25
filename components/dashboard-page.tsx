'use client'

import { useState } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Dashboard } from '@/components/dashboard'
import { MarketAnalysis } from '@/components/market-analysis'
import { ZonesModule } from '@/components/zones-module'
import { TrendsModule } from '@/components/trends-module'
import { CompetitorsModule } from '@/components/competitors-module'
import { BusinessDirectory } from '@/components/business-directory'
import  InteractiveMap from "@/components/interactive-map";
import { Reports } from '@/components/reports'
import { Settings } from '@/components/settings'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard') // Default active tab

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'market-analysis':
        return <MarketAnalysis />
      case 'zones':
        return <ZonesModule />
      case 'trends':
        return <TrendsModule />
      case 'competitors':
        return <CompetitorsModule />
      case 'business-directory':
        return <BusinessDirectory />
      case 'interactive-map':
        return <InteractiveMap />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-gray-600">
            <h2 className="text-2xl font-bold mb-4">Contenido no encontrado</h2>
            <p>El módulo seleccionado no está disponible.</p>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
