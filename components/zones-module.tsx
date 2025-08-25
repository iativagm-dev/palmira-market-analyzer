'use client'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { MapPin, Users, DollarSign, Lightbulb, ShieldAlert, GraduationCap, Home, Building, TrendingUp } from 'lucide-react'

// Datos de ejemplo para las zonas
const zonesData = [
  {
    id: 'centro-historico',
    name: 'Centro Histórico',
    type: 'Comercial',
    businesses: 145,
    density: 85,
    avgIncome: 2500000,
    growth: 12,
    demographics: {
      age18_30: 25,
      age31_45: 35,
      age46_60: 30,
      age60plus: 10
    },
    sectors: [
      { name: 'Retail', value: 40, color: '#8884d8' },
      { name: 'Servicios', value: 30, color: '#82ca9d' },
      { name: 'Restaurantes', value: 20, color: '#ffc658' },
      { name: 'Otros', value: 10, color: '#ff7300' }
    ]
  },
  {
    id: 'zona-industrial',
    name: 'Zona Industrial',
    type: 'Industrial',
    businesses: 78,
    density: 45,
    avgIncome: 3200000,
    growth: 8,
    demographics: {
      age18_30: 30,
      age31_45: 40,
      age46_60: 25,
      age60plus: 5
    },
    sectors: [
      { name: 'Manufactura', value: 50, color: '#8884d8' },
      { name: 'Logística', value: 25, color: '#82ca9d' },
      { name: 'Servicios', value: 15, color: '#ffc658' },
      { name: 'Otros', value: 10, color: '#ff7300' }
    ]
  },
  {
    id: 'centros-comerciales',
    name: 'Centros Comerciales',
    type: 'Retail',
    businesses: 220,
    density: 95,
    avgIncome: 2800000,
    growth: 15,
    demographics: {
      age18_30: 35,
      age31_45: 30,
      age46_60: 25,
      age60plus: 10
    },
    sectors: [
      { name: 'Retail', value: 60, color: '#8884d8' },
      { name: 'Entretenimiento', value: 20, color: '#82ca9d' },
      { name: 'Alimentación', value: 15, color: '#ffc658' },
      { name: 'Otros', value: 5, color: '#ff7300' }
    ]
  }
]

export const ZonesModule = () => {
  const [selectedZone, setSelectedZone] = useState('centro-historico')

  const currentZone = useMemo(() => {
    return zonesData.find(zone => zone.id === selectedZone) || zonesData[0]
  }, [selectedZone])

  const demographicsData = useMemo(() => [
    { name: '18-30', value: currentZone.demographics.age18_30 },
    { name: '31-45', value: currentZone.demographics.age31_45 },
    { name: '46-60', value: currentZone.demographics.age46_60 },
    { name: '60+', value: currentZone.demographics.age60plus }
  ], [currentZone])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análisis de Zonas</h1>
          <p className="text-gray-600 mt-1">Análisis detallado por zonas comerciales de Palmira</p>
        </div>
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent>
            {zonesData.map((zone) => (
              <SelectItem key={zone.id} value={zone.id}>
                {zone.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Negocios</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentZone.businesses}</div>
            <p className="text-xs text-muted-foreground">
              +{currentZone.growth}% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Densidad Comercial</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentZone.density}%</div>
            <Progress value={currentZone.density} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingreso Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(currentZone.avgIncome / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              COP por mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{currentZone.growth}%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 12 meses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Sectores</CardTitle>
            <CardDescription>
              Composición de negocios en {currentZone.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentZone.sectors}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {currentZone.sectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demografía por Edad</CardTitle>
            <CardDescription>
              Distribución etaria en {currentZone.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Características de la Zona</CardTitle>
          <CardDescription>Información detallada sobre {currentZone.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Tipo de Zona</span>
              </div>
              <p className="text-sm text-gray-600">{currentZone.type}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="font-medium">Actividad Principal</span>
              </div>
              <p className="text-sm text-gray-600">
                {currentZone.sectors[0].name} ({currentZone.sectors[0].value}%)
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Oportunidad</span>
              </div>
              <p className="text-sm text-gray-600">
                {currentZone.growth > 10 ? 'Alta' : currentZone.growth > 5 ? 'Media' : 'Baja'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}