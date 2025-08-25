'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { MarketAnalysisRequest } from '@/types/market'

interface MarketAnalysisFormProps {
  onSubmit: (data: MarketAnalysisRequest) => void
  isLoading: boolean
}

export function MarketAnalysisForm({ onSubmit, isLoading }: MarketAnalysisFormProps) {
  const [businessType, setBusinessType] = useState('')
  const [location, setLocation] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [specificQuestions, setSpecificQuestions] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      businessType,
      location,
      targetAudience,
      specificQuestions,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generar Nuevo Análisis de Mercado</CardTitle>
        <CardDescription>
          Introduce los detalles para obtener un análisis personalizado de tu mercado objetivo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="businessType">Tipo de Negocio</Label>
            <Input
              id="businessType"
              placeholder="Ej. Restaurante, Tienda de ropa, Consultoría"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Ubicación (Zona o Barrio en Palmira)</Label>
            <Input
              id="location"
              placeholder="Ej. Zona Centro, La Italia, Barrio Obrero"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="targetAudience">Audiencia Objetivo</Label>
            <Textarea
              id="targetAudience"
              placeholder="Ej. Familias jóvenes con ingresos medios, Estudiantes universitarios, Profesionales de 30-45 años"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="specificQuestions">Preguntas Específicas (Opcional)</Label>
            <Textarea
              id="specificQuestions"
              placeholder="Ej. ¿Cuál es la competencia principal en esta zona? ¿Qué tendencias de consumo son relevantes?"
              value={specificQuestions}
              onChange={(e) => setSpecificQuestions(e.target.value)}
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando Análisis...
              </>
            ) : (
              'Generar Análisis'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
