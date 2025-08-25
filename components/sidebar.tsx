"use client"
import {
  Home,
  BarChart,
  Briefcase,
  Users,
  TrendingUp,
  MapPin,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IativaBranding } from "@/components/iativa-branding"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { state, toggleSidebar } = useSidebar()

  const navigationItems = [
    {
      id: "dashboard",
      label: "Panel de Control",
      icon: Home,
    },
    {
      id: "market-analysis",
      label: "Análisis de Mercado",
      icon: BarChart,
    },
    {
      id: "business-directory",
      label: "Directorio de Negocios",
      icon: Briefcase,
    },
    {
      id: "competitors",
      label: "Competidores",
      icon: Users,
    },
    {
      id: "trends",
      label: "Tendencias",
      icon: TrendingUp,
    },
    {
      id: "zones",
      label: "Análisis de Zonas",
      icon: MapPin,
    },
    {
      id: "interactive-map",
      label: "Mapa Interactivo",
      icon: MapPin, // Reusing MapPin for map module
    },
    {
      id: "reports",
      label: "Reportes",
      icon: FileText,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: Settings,
    },
  ]

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <IativaBranding className={state === "collapsed" ? "hidden" : ""} />
        <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" onClick={toggleSidebar}>
          {state === "expanded" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              tooltip="Configuración"
            >
              <Settings />
              <span>Configuración</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  )
}
