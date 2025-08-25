import { NextResponse } from 'next/server'
import type { MarketAnalysisRequest, MarketAnalysisResult } from '@/types/market'

export async function POST(req: Request) {
  const { businessType, location, targetAudience, specificQuestions }: MarketAnalysisRequest = await req.json()

  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Generate mock analysis result based on input
  const mockResult: MarketAnalysisResult = {
    summary: `Análisis de mercado para un negocio de ${businessType} en ${location}, dirigido a ${targetAudience}.`,
    marketSize: {
      currentValue: 1500000 + Math.floor(Math.random() * 500000), // Random value
      projectedValue: 2000000 + Math.floor(Math.random() * 700000), // Random value
      unit: 'USD',
    },
    growthRate: 0.05 + Math.random() * 0.03, // 5-8% growth
    targetAudienceInsights: [
      `La audiencia en ${location} muestra una alta afinidad por ${businessType.toLowerCase()} de calidad.`,
      `Hay una creciente demanda de opciones personalizadas para ${targetAudience.toLowerCase()}.`,
      `El poder adquisitivo en esta zona es adecuado para el rango de precios medio-alto.`,
    ],
    competitionAnalysis: {
      summary: `La competencia en el sector de ${businessType} en ${location} es moderada, con algunos actores establecidos y oportunidades para diferenciación.`,
      directCompetitors: 3 + Math.floor(Math.random() * 3),
      indirectCompetitors: 5 + Math.floor(Math.random() * 5),
      topCompetitors: [
        { name: 'Competidor A', strength: 'Marca fuerte' },
        { name: 'Competidor B', strength: 'Precios bajos' },
      ],
    },
    swotAnalysis: {
      strengths: ['Ubicación estratégica', 'Producto innovador', 'Equipo experimentado'],
      weaknesses: ['Reconocimiento de marca limitado', 'Presupuesto de marketing inicial', 'Dependencia de proveedores'],
      opportunities: ['Crecimiento demográfico en la zona', 'Tendencia de consumo favorable', 'Alianzas estratégicas'],
      threats: ['Nueva competencia', 'Cambios regulatorios', 'Fluctuaciones económicas'],
    },
    recommendations: [
      'Enfocarse en una estrategia de marketing digital para aumentar la visibilidad.',
      'Desarrollar un programa de fidelización de clientes.',
      'Considerar alianzas con negocios complementarios en la zona.',
      'Monitorear de cerca las tendencias de precios de la competencia.',
    ],
    keyTrends: [
      'Aumento del consumo local y de productos artesanales.',
      'Digitalización de servicios y ventas online.',
      'Mayor conciencia sobre la sostenibilidad y el impacto social.',
    ],
    demographics: {
      population: 50000 + Math.floor(Math.random() * 20000),
      ageDistribution: [
        { range: '0-17', percentage: 20 + Math.floor(Math.random() * 5) },
        { range: '18-35', percentage: 30 + Math.floor(Math.random() * 10) },
        { range: '36-55', percentage: 25 + Math.floor(Math.random() * 5) },
        { range: '55+', percentage: 15 + Math.floor(Math.random() * 5) },
      ].sort((a, b) => a.range.localeCompare(b.range)), // Ensure percentages sum to ~100
      incomeLevels: [
        { range: 'Bajo', percentage: 15 + Math.floor(Math.random() * 5) },
        { range: 'Medio', percentage: 60 + Math.floor(Math.random() * 10) },
        { range: 'Alto', percentage: 10 + Math.floor(Math.random() * 5) },
      ].sort((a, b) => a.range.localeCompare(b.range)), // Ensure percentages sum to ~100
    },
    pricingStrategy: {
      recommendedLevel: 'Medio', // Can be dynamic based on analysis
      description: 'Una estrategia de precios competitiva pero que refleje la calidad y el valor añadido del producto/servicio.',
    },
  }

  // Add specific questions to summary if provided
  if (specificQuestions) {
    mockResult.summary += ` Se han abordado las preguntas específicas: "${specificQuestions}".`
  }

  return NextResponse.json(mockResult)
}
