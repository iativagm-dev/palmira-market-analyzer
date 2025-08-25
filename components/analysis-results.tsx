'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { CheckCircle, XCircle, Info, TrendingUp, Users, DollarSign, MapPin, Lightbulb, ShieldAlert } from 'lucide-react'
import type { MarketAnalysisResult } from '@/types/market'

interface AnalysisResultsProps {
  results: MarketAnalysisResult
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const {
    summary,
    marketSize,
    growthRate,
    targetAudienceInsights,
    competitionAnalysis,
    swotAnalysis,
    recommendations,
    keyTrends,
    demographics,
    pricingStrategy,
  } = results

  const marketSizeData = [
    { name: 'Tamaño Actual', value: marketSize.currentValue },
    { name: 'Proyección (5 años)', value: marketSize.projectedValue },
  ]

  const competitionData = [
    { name: 'Competencia Directa', value: competitionAnalysis.directCompetitors },
    { name: 'Competencia Indirecta', value: competitionAnalysis.indirectCompetitors },
  ]

  const demographicAgeData = demographics.ageDistribution.map(d => ({ name: d.range, value: d.percentage }));
  const demographicIncomeData = demographics.incomeLevels.map(d => ({ name: d.range, value: d.percentage }));

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Resultados del Análisis de Mercado</CardTitle>
        <CardDescription>
          Aquí tienes un análisis detallado basado en tus criterios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-blue-600" /> Resumen Ejecutivo</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>

        <Separator />

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> Panorama del Mercado</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">Tamaño del Mercado</CardTitle></CardHeader>
                <CardContent className="text-3xl font-bold text-center text-blue-600">
                  ${marketSize.currentValue.toLocaleString()}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Tasa de Crecimiento</CardTitle></CardHeader>
                <CardContent className="text-3xl font-bold text-center text-green-600">
                  {(growthRate * 100).toFixed(1)}%
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Proyección de Tamaño de Mercado:</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={marketSizeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographics */}
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-purple-600" /> Demografía Clave</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Distribución por Edad:</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={demographicAgeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {demographicAgeData.map((entry, index) => (
                        <Cell key={`cell-age-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Niveles de Ingreso:</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={demographicIncomeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#82ca9d"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {demographicIncomeData.map((entry, index) => (
                        <Cell key={`cell-income-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Target Audience Insights */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-orange-600" /> Insights de la Audiencia Objetivo</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {targetAudienceInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Competition Analysis */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-red-600" /> Análisis de Competencia</h3>
          <p className="text-muted-foreground">{competitionAnalysis.summary}</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Distribución de Competidores:</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={competitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Principales Competidores:</h4>
            <ul className="list-disc pl-5 text-muted-foreground">
              {competitionAnalysis.topCompetitors.map((comp, index) => (
                <li key={index}>{comp.name} ({comp.strength})</li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* SWOT Analysis */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-600" /> Análisis FODA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Card><CardHeader><CardTitle className="text-base text-green-600">Fortalezas</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5">{swotAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base text-red-600">Debilidades</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5">{swotAnalysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base text-yellow-600">Oportunidades</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5">{swotAnalysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}</ul></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base text-orange-600">Amenazas</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5">{swotAnalysis.threats.map((t, i) => <li key={i}>{t}</li>)}</ul></CardContent></Card>
          </div>
        </div>

        <Separator />

        {/* Key Trends */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600" /> Tendencias Clave</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {keyTrends.map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Pricing Strategy */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><DollarSign className="h-5 w-5 text-green-600" /> Estrategia de Precios Sugerida</h3>
          <p className="text-muted-foreground">{pricingStrategy.description}</p>
          <p className="mt-2"><strong>Nivel de Precios Recomendado:</strong> <Badge>{pricingStrategy.recommendedLevel}</Badge></p>
        </div>

        <Separator />

        {/* Recommendations */}
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" /> Recomendaciones Estratégicas</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
