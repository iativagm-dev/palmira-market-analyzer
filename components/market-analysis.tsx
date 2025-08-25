'use client'

import { useState } from 'react'
import { MarketAnalysisForm } from '@/components/market-analysis-form'
import { AnalysisResults } from '@/components/analysis-results'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { MarketAnalysisRequest, MarketAnalysisResult } from '@/types/market'

export function MarketAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<MarketAnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateAnalysis = async (data: MarketAnalysisRequest) => {
    setIsLoading(true)
    setError(null)
    setAnalysisResult(null) // Clear previous results

    try {
      const response = await fetch('/api/market/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const result: MarketAnalysisResult = await response.json()
      setAnalysisResult(result)
    } catch (err: any) {
      console.error('Failed to fetch market analysis:', err)
      setError(err.message || 'Ocurrió un error al generar el análisis. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Análisis de Mercado</h1>
      <p className="text-center text-gray-600 mb-8">
        Obtén insights profundos sobre tu mercado objetivo en Palmira.
      </p>

      <MarketAnalysisForm onSubmit={handleGenerateAnalysis} isLoading={isLoading} />

      {isLoading && (
        <div className="flex flex-col items-center justify-center mt-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-gray-600">Generando tu análisis de mercado...</p>
          <p className="text-sm text-muted-foreground">Esto puede tardar unos segundos.</p>
        </div>
      )}

      {error && (
        <Card className="w-full max-w-2xl mx-auto mt-8 border-red-400 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {analysisResult && !isLoading && !error && (
        <AnalysisResults results={analysisResult} />
      )}
    </div>
  )
}
