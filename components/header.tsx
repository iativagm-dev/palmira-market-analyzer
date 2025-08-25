'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bell, Settings, Menu, X } from 'lucide-react'
import { SmartNotifications } from '@/components/smart-notifications'
import { AIAssistant } from '@/components/ai-assistant'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle mobile menu</span>
      </Button>

      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <SmartNotifications />
        <AIAssistant />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Configuración</span>
        </Button>
      </div>
    </header>
  )
}
