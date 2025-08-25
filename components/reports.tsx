'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Download, FileText, TrendingUp, Users, DollarSign, MapPin, Calendar } from 'lucide-react'

interface ReportData {
  id: string;
  name: string;
  description: string;
  type: 'summary' | 'detailed' | 'trend' | 'comparison';
  dateGenerated: string;
  data: any; // Flexible for different report types
}

const mockReports: ReportData[] = [
  {
    id: 'rep1',
    name: 'Resumen Mensual de Mercado (Julio)',
    description: 'Visión general de las métricas clave del mercado en Julio.',
    type: 'summary',
    dateGenerated: '2024-08-01',
    data: {
      totalBusinesses: 1250,
      newBusinesses: 45,
      closedBusinesses: 12,
      marketGrowth: 0.07, // 7%
      topCategories: [
        { name: 'Alimentos', value: 300 },
        { name: 'Retail', value: 250 },
        { name: 'Servicios', value: 200 },
        { name: 'Salud', value: 150 },
      ],
      sentiment: 'positive',
    },
  },
  {
    id: 'rep2',
    name: 'Análisis de Tendencia: E-commerce Local',
    description: 'Reporte detallado sobre el crecimiento y el impacto del e-commerce en Palmira.',
    type: 'trend',
    dateGenerated: '2024-07-25',
    data: {
      trendName: 'E-commerce Local',
      growthOverTime: [
        { month: 'Ene', value: 100 },
        { month: 'Feb', value: 120 },
        { month: 'Mar', value: 150 },
        { month: 'Abr', value: 180 },
        { month: 'May', value: 220 },
        { month: 'Jun', value: 250 },
        { month: 'Jul', value: 280 },
      ],
      keyDrivers: ['Conveniencia', 'Logística mejorada', 'Adopción digital'],
      recommendations: ['Invertir en plataformas móviles', 'Optimizar la logística de última milla'],
    },
  },
  {
    id: 'rep3',
    name: 'Comparación de Competidores: Panaderías',
    description: 'Análisis comparativo entre las principales panaderías de la Zona Centro.',
    type: 'comparison',
    dateGenerated: '2024-07-20',
    data: {
      category: 'Panaderías',
      competitors: [
        { name: 'La Espiga Dorada', marketShare: 35, rating: 4.5, priceLevel: 'Medio' },
        { name: 'Pan Caliente', marketShare: 28, rating: 4.2, priceLevel: 'Económico' },
        { name: 'Dulce Tentación', marketShare: 20, rating: 4.7, priceLevel: 'Alto' },
      ],
      insights: 'La Espiga Dorada lidera por calidad, Pan Caliente por precio, y Dulce Tentación por productos premium.',
    },
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function Reports() {
  const [selectedReportId, setSelectedReportId] = useState(mockReports[0]?.id || '')

  const selectedReport = useMemo(() => {
    return mockReports.find(report => report.id === selectedReportId)
  }, [selectedReportId])

  const handleDownloadReport = () => {
    if (selectedReport) {
      alert(`Descargando reporte: ${selectedReport.name}`)
      // In a real application, you would trigger a file download here
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Generación de Reportes</h1>
      <p className="text-center text-gray-600 mb-8">
        Accede a reportes predefinidos y personalizados para obtener insights rápidos.
      </p>

      {/* Report Selection */}
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <Select value={selectedReportId} onValueChange={setSelectedReportId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Reporte" />
            </SelectTrigger>
            <SelectContent>
              {mockReports.map(report => (
                <SelectItem key={report.id} value={report.id}>
                  {report.name} ({report.dateGenerated})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport} disabled={!selectedReport}>
            <Download className="h-4 w-4 mr-2" /> Descargar Reporte
          </Button>
        </CardContent>
      </Card>

      {/* Report Display */}
      {selectedReport ? (
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{selectedReport.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Generado el: {selectedReport.dateGenerated}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedReport.description}</p>

            {selectedReport.type === 'summary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600" /> Métricas Clave del Mercado</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <Card><CardHeader><CardTitle className="text-lg">Total Negocios</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-center">{selectedReport.data.totalBusinesses}</CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-lg">Nuevos Negocios</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-center text-green-600">+{selectedReport.data.newBusinesses}</CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-lg">Negocios Cerrados</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-center text-red-600">-{selectedReport.data.closedBusinesses}</CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-lg">Crecimiento Mercado</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-center text-purple-600">{(selectedReport.data.marketGrowth * 100).toFixed(1)}%</CardContent></Card>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-orange-600" /> Categorías Principales</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={selectedReport.data.topCategories}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {selectedReport.data.topCategories.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedReport.type === 'trend' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> Crecimiento de la Tendencia: {selectedReport.data.trendName}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedReport.data.growthOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Valor de la Tendencia" />
                  </BarChart>
                </ResponsiveContainer>
                <h4 className="font-semibold mt-4">Motores Clave:</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {selectedReport.data.keyDrivers.map((driver: string, i: number) => <li key={i}>{driver}</li>)}
                </ul>
                <h4 className="font-semibold mt-4">Recomendaciones:</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {selectedReport.data.recommendations.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                </ul>
              </div>
            )}

            {selectedReport.type === 'comparison' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-purple-600" /> Comparación de Competidores en {selectedReport.data.category}</h3>
                <p className="text-muted-foreground">{selectedReport.data.insights}</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedReport.data.competitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marketShare" fill="#0088FE" name="Cuota de Mercado (%)" />
                    <Bar dataKey="rating" fill="#FFBB28" name="Calificación" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {selectedReport.data.competitors.map((comp: any, i: number) => (
                    <Card key={i}>
                      <CardHeader><CardTitle className="text-lg">{comp.name}</CardTitle></CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p>Cuota de Mercado: <Badge>{comp.marketShare}%</Badge></p>
                        <p>Calificación: <Badge variant="secondary">{comp.rating.toFixed(1)}</Badge></p>
                        <p>Nivel de Precios: <Badge variant="outline">{comp.priceLevel}</Badge></p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <FileText className="mx-auto h-12 w-12 mb-4" />
          <p className="text-lg">Selecciona un reporte de la lista para visualizarlo.</p>
        </div>
      )}
    </div>
  )
}
