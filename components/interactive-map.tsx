"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Building2, TrendingUp, Users, Maximize2, Filter } from "lucide-react"

interface MarketData {
  zone: string
  businesses: number
  growth: number
}

interface InteractiveMapProps {
  marketData?: MarketData[] // Hacer opcional con ?
}

// Exportar como default para que funcione con tu importación
export default function InteractiveMap({ marketData = [] }: InteractiveMapProps) {
  const [selectedZone, setSelectedZone] = useState<string>("all")
  const [mapView, setMapView] = useState<"satellite" | "roadmap">("roadmap")

  // Coordenadas específicas de las zonas de Palmira
  const zoneCoordinates = {
    Centro: { lat: 3.5394, lng: -76.3036, businesses: 485 },
    "La Carbonera": { lat: 3.5456, lng: -76.2987, businesses: 312 },
    "El Placer": { lat: 3.5321, lng: -76.3089, businesses: 398 },
    "Villa Gorgona": { lat: 3.5278, lng: -76.2945, businesses: 234 },
    Zamorano: { lat: 3.5467, lng: -76.3123, businesses: 356 },
    "Prado Alto": { lat: 3.5389, lng: -76.3156, businesses: 289 },
    "Los Ángeles": { lat: 3.5234, lng: -76.3067, businesses: 267 },
    Industrial: { lat: 3.5512, lng: -76.2876, businesses: 506 },
  }

  const getZoneColor = (businesses: number) => {
    if (businesses > 400) return "bg-red-500"
    if (businesses > 300) return "bg-orange-500"
    if (businesses > 200) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getZoneIntensity = (businesses: number) => {
    if (businesses > 400) return "Alta densidad"
    if (businesses > 300) return "Densidad media-alta"
    if (businesses > 200) return "Densidad media"
    return "Densidad baja"
  }

  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                Mapa Interactivo de Palmira
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Explora la distribución de negocios por zonas en Palmira, Valle del Cauca
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={mapView} onValueChange={(value: "satellite" | "roadmap") => setMapView(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roadmap">Mapa</SelectItem>
                  <SelectItem value="satellite">Satélite</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Zone Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las zonas</SelectItem>
                  {Object.keys(zoneCoordinates).map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Baja densidad</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Media</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Alta</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Muy alta</span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Zone Statistics */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Estadísticas por Zona</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Object.entries(zoneCoordinates)
                  .filter(([zone]) => selectedZone === "all" || selectedZone === zone)
                  .sort(([, a], [, b]) => b.businesses - a.businesses)
                  .map(([zone, data]) => (
                    <div
                      key={zone}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => setSelectedZone(zone)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{zone}</h4>
                        <div className={`w-3 h-3 ${getZoneColor(data.businesses)} rounded-full`}></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Negocios:</span>
                          <span className="font-semibold">{data.businesses}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Densidad:</span>
                          <Badge variant="outline" className="text-xs">
                            {getZoneIntensity(data.businesses)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Coordenadas:</span>
                          <span className="text-xs text-gray-500">
                            {data.lat.toFixed(4)}, {data.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="lg:col-span-3">
              <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31811.79566342339!2d-76.32!3d3.5394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a0c1f3b1e3f3f%3A0x3f3f3f3f3f3f3f3f!2sPalmira%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1ses!2sco!4v1691170000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Interactivo de Palmira"
                />
              </div>

              {/* Map Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedZone("all")}>
                    Ver todas las zonas
                  </Button>
                  <Button variant="outline" size="sm">
                    Centrar en Palmira
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {selectedZone === "all"
                      ? `${Object.keys(zoneCoordinates).length} zonas activas`
                      : `Zona: ${selectedZone}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Zone Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {Object.values(zoneCoordinates).reduce((sum, zone) => sum + zone.businesses, 0)}
                </p>
                <p className="text-sm text-blue-700">Total Negocios</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{Object.keys(zoneCoordinates).length}</p>
                <p className="text-sm text-green-700">Zonas Activas</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">
                  {Math.max(...Object.values(zoneCoordinates).map((z) => z.businesses))}
                </p>
                <p className="text-sm text-purple-700">Mayor Densidad</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round(
                    Object.values(zoneCoordinates).reduce((sum, zone) => sum + zone.businesses, 0) /
                      Object.keys(zoneCoordinates).length,
                  )}
                </p>
                <p className="text-sm text-orange-700">Promedio/Zona</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center space-x-4 pt-4 border-t">
            <Button variant="outline" className="flex items-center bg-transparent">
              <MapPin className="h-4 w-4 mr-2" />
              Agregar Marcador
            </Button>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Building2 className="h-4 w-4 mr-2" />
              Analizar Zona
            </Button>
            <Button variant="outline" className="flex items-center bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Tendencias
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}