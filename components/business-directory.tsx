'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, XCircle, Star, MapPin, Phone, Globe, Info } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockBusinesses } from '@/data/business-data'
import type { Business } from '@/types/business'
import { palmiraZonesData } from '@/data/zones-data'

export function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedZone, setSelectedZone] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockBusinesses.map(b => b.category))
    return ['all', ...Array.from(uniqueCategories)].sort()
  }, [])

  const zones = useMemo(() => {
    return ['all', ...palmiraZonesData.map(z => z.id)].sort((a, b) => {
      if (a === 'all') return -1
      if (b === 'all') return 1
      return (palmiraZonesData.find(z => z.id === a)?.name || '').localeCompare((palmiraZonesData.find(z => z.id === b)?.name || ''))
    })
  }, [])

  const ratings = ['all', '4.5+', '4.0+', '3.5+']

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            business.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            business.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory

      const matchesZone = selectedZone === 'all' || business.zoneId === selectedZone

      const matchesRating = selectedRating === 'all' ||
                            (selectedRating === '4.5+' && business.rating >= 4.5) ||
                            (selectedRating === '4.0+' && business.rating >= 4.0) ||
                            (selectedRating === '3.5+' && business.rating >= 3.5)

      return matchesSearch && matchesCategory && matchesZone && matchesRating
    })
  }, [searchTerm, selectedCategory, selectedZone, selectedRating])

  const getZoneName = (zoneId: string) => {
    return palmiraZonesData.find(z => z.id === zoneId)?.name || zoneId
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Directorio de Negocios</h1>
      <p className="text-center text-gray-600 mb-8">
        Explora y encuentra negocios en Palmira por categoría, zona o calificación.
      </p>

      {/* Filters and Search */}
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar negocio por nombre, descripción o tags..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'Todas las Categorías' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger>
              <SelectValue placeholder="Zona" />
            </SelectTrigger>
            <SelectContent>
              {zones.map(zoneId => (
                <SelectItem key={zoneId} value={zoneId}>
                  {zoneId === 'all' ? 'Todas las Zonas' : getZoneName(zoneId)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger>
              <SelectValue placeholder="Calificación" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map(rating => (
                <SelectItem key={rating} value={rating}>
                  {rating === 'all' ? 'Cualquier Calificación' : rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchTerm || selectedCategory !== 'all' || selectedZone !== 'all' || selectedRating !== 'all') && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedZone('all')
                setSelectedRating('all')
              }}
              className="md:col-span-4"
            >
              <XCircle className="h-4 w-4 mr-2" /> Limpiar Filtros
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Business List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map(business => (
            <Card key={business.id}>
              <CardHeader>
                <CardTitle className="text-xl font-bold">{business.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {business.address} ({getZoneName(business.zoneId)})
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-gray-700">{business.description}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>Calificación: <span className="font-semibold">{business.rating.toFixed(1)}</span> ({business.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{business.phone}</span>
                </div>
                {business.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Visitar sitio web
                    </a>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{business.category}</Badge>
                  {business.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            <Info className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg">No se encontraron negocios que coincidan con los criterios de búsqueda.</p>
            <p className="text-sm">Intenta ajustar tus filtros.</p>
          </div>
        )}
      </div>
    </div>
  )
}
