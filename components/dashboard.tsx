"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { TrendingUp, Users, Info, Loader2, XCircle } from "lucide-react"
import { mockBusinesses } from "@/data/business-data"
import { palmiraZonesData } from "@/data/zones-data"
import { mockTrends } from "@/data/trends-data"
import { mockCompetitors } from "@/data/competitors-data"

interface MarketStats {
  totalBusinesses: number
  newBusinessesLastMonth: number
  closedBusinessesLastMonth: number
  averageGrowthRate: number
  topCategories: string[]
  marketSentiment: "positive" | "neutral" | "negative"
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function Dashboard() {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [errorStats, setErrorStats] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketStats = async () => {
      try {
        const response = await fetch("/api/market/stats")
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data: MarketStats = await response.json()
        setMarketStats(data)
      } catch (err: any) {
        console.error("Failed to fetch market stats:", err)
        setErrorStats(err.message || "No se pudieron cargar las estadísticas del mercado.")
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchMarketStats()
  }, [])

  // Derived data for charts
  const businessCategoryData = useMemo(() => {
    const counts: { [key: string]: number } = {}
    mockBusinesses.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [])

  const zonePopulationData = useMemo(() => {
    return palmiraZonesData.map((z) => ({
      name: z.name,
      population: z.demographics.population,
    }))
  }, [])

  const trendImpactData = useMemo(() => {
    const impactCounts: { [key: string]: number } = {
      low: 0,
      medium: 0,
      high: 0,
    }
    mockTrends.forEach((t) => {
      impactCounts[t.impactLevel] = (impactCounts[t.impactLevel] || 0) + 1
    })
    return Object.entries(impactCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }))
  }, [])

  const competitorRatingData = useMemo(() => {
    const ratingCounts: { [key: string]: number } = {}
    mockCompetitors.forEach((c) => {
      const roundedRating = Math.floor(c.rating) // Group by integer rating
      ratingCounts[`${roundedRating} Estrellas`] = (ratingCounts[`${roundedRating} Estrellas`] || 0) + 1
    })
    return Object.entries(ratingCounts).map(([name, value]) => ({ name, value }))
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Panel de Control</h1>
      <p className="text-center text-gray-600 mb-8">Una visión general de las métricas clave del mercado en Palmira.</p>

      {isLoadingStats ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-gray-600">Cargando estadísticas del mercado...</p>
        </div>
      ) : errorStats ? (
        <Card className="w-full max-w-4xl mx-auto border-red-400 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error al cargar datos</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600">
            <p>{errorStats}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Negocios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{marketStats?.totalBusinesses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{marketStats?.newBusinessesLastMonth} nuevos el último mes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crecimiento Promedio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(marketStats?.averageGrowthRate * 100).toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {marketStats?.marketSentiment === "positive" ? "Tendencia positiva" : "Tendencia neutral"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negocios Cerrados</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{marketStats?.closedBusinessesLastMonth}</div>
                <p className="text-xs text-muted-foreground">Último mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categorías Principales</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{marketStats?.topCategories[0]}</div>
                <p className="text-xs text-muted-foreground">
                  {marketStats?.topCategories[1]}, {marketStats?.topCategories[2]}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Negocios por Categoría</CardTitle>
                <CardDescription>Distribución de negocios en Palmira.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={businessCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {businessCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Población por Zona</CardTitle>
                <CardDescription>Distribución demográfica en las zonas de Palmira.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={zonePopulationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="population" fill="#82ca9d" name="Población" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto de Tendencias</CardTitle>
                <CardDescription>Nivel de impacto de las tendencias actuales.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trendImpactData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#FFBB28"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {trendImpactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calificaciones de Competidores</CardTitle>
                <CardDescription>Distribución de calificaciones promedio de competidores.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitorRatingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#FF8042" name="Número de Competidores" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
