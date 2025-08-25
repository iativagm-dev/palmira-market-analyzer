'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, XCircle, Star, MapPin, DollarSign, Users, TrendingUp, Lightbulb, ShieldAlert } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { mockCompetitors } from '@/data/competitors-data'
import { mockBusinesses } from '@/data/business-data' // Assuming this is 'our' business data
import type { Competitor } from '@/types/competitors'
import type { Business } from '@/types/business'

export function CompetitorsModule() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | null>(null)

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockCompetitors.map(c => c.category))
    return ['all', ...Array.from(uniqueCategories)].sort()
  }, [])

  const statuses = ['all', 'active', 'new', 'closed']

  const filteredCompetitors = useMemo(() => {
    return mockCompetitors.filter(competitor => {
      const matchesSearch = competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            competitor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            competitor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            competitor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || competitor.category === selectedCategory

      const matchesStatus = selectedStatus === 'all' || competitor.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const selectedCompetitor = useMemo(() => {
    return mockCompetitors.find(c => c.id === selectedCompetitorId)
  }, [selectedCompetitorId])

  const ourBusiness = useMemo(() => {
    // For demonstration, let's assume 'our' business is the first one in mockBusinesses
    // In a real app, this would come from user's profile or specific configuration
    return mockBusinesses[0] as Business | undefined;
  }, []);

  // Data for charts
  const pricingStrategyData = useMemo(() => {
    const strategyCounts = mockCompetitors.reduce((acc, comp) => {
      if (comp.pricingStrategy) {
        acc[comp.pricingStrategy] = (acc[comp.pricingStrategy] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(strategyCounts).map(([name, value]) => ({ name, value }));
  }, []);

  const customerSatisfactionData = useMemo(() => {
    const satisfactionLevels = mockCompetitors.reduce((acc, comp) => {
      if (comp.customerSatisfactionScore) {
        const level = Math.floor(comp.customerSatisfactionScore); // Group by integer score
        acc[level] = (acc[level] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
    return Object.entries(satisfactionLevels).map(([name, value]) => ({ name: `${name} Estrellas`, value: value }));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Análisis de Competidores</h1>
      <p className="text-center text-gray-600 mb-8">
        Identifica, analiza y compara a tus competidores clave en el mercado de Palmira.
      </p>

      {/* Filters and Search */}
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar competidor por nombre o descripción..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'Todas las Categorías' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Estado" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'Todos los Estados' : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="md:col-span-3"
            >
              <XCircle className="h-4 w-4 mr-2" /> Limpiar Filtros
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Competitors List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lista de Competidores</CardTitle>
            <CardDescription>Selecciona un competidor para ver su perfil detallado.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {filteredCompetitors.length > 0 ? (
                  filteredCompetitors.map(competitor => (
                    <Button
                      key={competitor.id}
                      variant={selectedCompetitorId === competitor.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedCompetitorId(competitor.id)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{competitor.name}</span>
                        <span className="text-xs text-muted-foreground">{competitor.category}</span>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {competitor.rating.toFixed(1)} ({competitor.reviews})
                        </div>
                      </div>
                    </Button>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground p-4">
                    No se encontraron competidores que coincidan.
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedCompetitor ? `Perfil de ${selectedCompetitor.name}` : 'Selecciona un Competidor'}
            </CardTitle>
            <CardDescription>
              {selectedCompetitor ? selectedCompetitor.description : 'Información detallada del competidor seleccionado.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedCompetitor ? (
              <div className="text-center text-muted-foreground p-8">
                <p>Por favor, selecciona un competidor de la lista para ver su perfil.</p>
              </div>
            ) : (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="analysis">Análisis</TabsTrigger>
                  <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Ubicación</h3>
                      <p>{selectedCompetitor.address}</p>
                      <p>{selectedCompetitor.phone}</p>
                      <a href={selectedCompetitor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {selectedCompetitor.website}
                      </a>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2"><Star className="h-4 w-4" /> Calificación</h3>
                      <Badge variant="secondary" className="text-base">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {selectedCompetitor.rating.toFixed(1)} ({selectedCompetitor.reviews} reseñas)
                      </Badge>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCompetitor.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="analysis" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Estrategia y Posicionamiento</h3>
                    <p><strong>Cuota de Mercado Estimada:</strong> {selectedCompetitor.marketShare ? `${(selectedCompetitor.marketShare * 100).toFixed(1)}%` : 'N/A'}</p>
                    <p><strong>Estrategia de Precios:</strong> <Badge>{selectedCompetitor.pricingStrategy?.charAt(0).toUpperCase() + selectedCompetitor.pricingStrategy?.slice(1) || 'N/A'}</Badge></p>
                    <p><strong>Puntuación de Satisfacción del Cliente:</strong> {selectedCompetitor.customerSatisfactionScore ? `${selectedCompetitor.customerSatisfactionScore}/5` : 'N/A'}</p>
                    <div>
                      <h4 className="font-medium mt-2">Propuestas de Venta Únicas:</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {selectedCompetitor.uniqueSellingPropositions?.map((usp, index) => (
                          <li key={index}>{usp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mt-2">Canales de Marketing:</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {selectedCompetitor.marketingChannels?.map((channel, index) => (
                          <li key={index}>{channel}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Análisis de Proximidad</h3>
                    <p><strong>Negocios Cercanos:</strong> {selectedCompetitor.nearbyBusinesses || 'N/A'}</p>
                    <p><strong>Densidad Residencial Cercana:</strong> <Badge>{selectedCompetitor.nearbyResidentialDensity?.charAt(0).toUpperCase() + selectedCompetitor.nearbyResidentialDensity?.slice(1) || 'N/A'}</Badge></p>
                  </div>
                </TabsContent>
                <TabsContent value="benchmarking" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><BarChart className="h-4 w-4" /> Datos de Rendimiento</h3>
                    <p><strong>Ingresos Anuales Estimados:</strong> {selectedCompetitor.annualRevenue ? `$${selectedCompetitor.annualRevenue.toLocaleString()}` : 'N/A'}</p>
                    <p><strong>Número de Empleados:</strong> {selectedCompetitor.employeeCount || 'N/A'}</p>
                    <p><strong>Tasa de Crecimiento (Último Año):</strong> {selectedCompetitor.growthRateLastYear || 'N/A'}</p>
                  </div>
                  {ourBusiness && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Comparación con Tu Negocio ({ourBusiness.name})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader><CardTitle className="text-lg">Ingresos Anuales</CardTitle></CardHeader>
                          <CardContent>
                            <p className="text-sm">Tu Negocio: ${ourBusiness.annualRevenue?.toLocaleString() || 'N/A'}</p>
                            <p className="text-sm">Competidor: ${selectedCompetitor.annualRevenue?.toLocaleString() || 'N/A'}</p>
                            <ResponsiveContainer width="100%" height={100}>
                              <BarChart data={[{ name: 'Tu Negocio', value: ourBusiness.annualRevenue || 0 }, { name: selectedCompetitor.name, value: selectedCompetitor.annualRevenue || 0 }]}>
                                <XAxis dataKey="name" />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader><CardTitle className="text-lg">Calificación Promedio</CardTitle></CardHeader>
                          <CardContent>
                            <p className="text-sm">Tu Negocio: {ourBusiness.rating.toFixed(1)}</p>
                            <p className="text-sm">Competidor: {selectedCompetitor.rating.toFixed(1)}</p>
                            <ResponsiveContainer width="100%" height={100}>
                              <BarChart data={[{ name: 'Tu Negocio', value: ourBusiness.rating }, { name: selectedCompetitor.name, value: selectedCompetitor.rating }]}>
                                <XAxis dataKey="name" />
                                <YAxis hide domain={[0, 5]} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
