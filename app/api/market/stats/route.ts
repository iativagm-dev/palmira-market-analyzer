import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate fetching market statistics
  await new Promise(resolve => setTimeout(resolve, 1000))

  const marketStats = {
    totalBusinesses: 1250,
    newBusinessesLastMonth: 45,
    closedBusinessesLastMonth: 12,
    averageGrowthRate: 0.07, // 7%
    topCategories: ['Alimentos y Bebidas', 'Retail', 'Servicios Profesionales'],
    marketSentiment: 'positive',
  }

  return NextResponse.json(marketStats)
}
