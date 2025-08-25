'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  message: string
  details?: string
  timestamp: Date
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Nueva tendencia detectada: "Comida Saludable"',
    details: 'Se ha observado un aumento del 15% en la demanda de productos orgánicos en la Zona Centro.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: '2',
    type: 'warning',
    message: 'Competidor "La Granja" ha lanzado una nueva promoción agresiva.',
    details: 'Ofrecen un 20% de descuento en todos sus productos durante el próximo mes. Podría afectar tu cuota de mercado.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: '3',
    type: 'success',
    message: 'Análisis de zona "La Italia" completado con éxito.',
    details: 'Los datos demográficos y de negocios están actualizados y listos para revisión.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '4',
    type: 'error',
    message: 'Error al cargar datos del mapa interactivo.',
    details: 'No se pudo conectar con el servicio de mapas. Inténtalo de nuevo más tarde.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
]

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Bell className="h-5 w-5 text-blue-500" />
      case 'warning': return <Bell className="h-5 w-5 text-yellow-500" />
      case 'success': return <Bell className="h-5 w-5 text-green-500" />
      case 'error': return <Bell className="h-5 w-5 text-red-500" />
      default: return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'border-blue-300 bg-blue-50'
      case 'warning': return 'border-yellow-300 bg-yellow-50'
      case 'success': return 'border-green-300 bg-green-50'
      case 'error': return 'border-red-300 bg-red-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {notifications.length}
          </span>
        )}
        <span className="sr-only">Notificaciones</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 md:w-96 z-50"
          >
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Notificaciones</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-muted-foreground">No hay notificaciones nuevas.</p>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 border-b last:border-b-0 ${getNotificationColor(notification.type)}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{notification.message}</p>
                          {notification.details && (
                            <p className="text-xs text-muted-foreground mt-1">{notification.details}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Descartar notificación</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
