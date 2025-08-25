'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Loader2, Save, Bell, Palette, Globe, User } from 'lucide-react'

export function Settings() {
  const [userName, setUserName] = useState('Usuario Palmira')
  const [userEmail, setUserEmail] = useState('usuario.palmira@example.com')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('es')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Settings saved:', { userName, userEmail, notificationsEnabled, theme, language })
    setIsSaving(false)
    alert('Configuración guardada exitosamente!')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Configuración de la Aplicación</h1>
      <p className="text-center text-gray-600 mb-8">
        Personaliza tu experiencia en Palmira Market Analyzer.
      </p>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Ajustes Generales</CardTitle>
          <CardDescription>Gestiona la información de tu perfil y las preferencias de la aplicación.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="grid gap-6">
            {/* Account Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5 text-blue-600" /> Información de Cuenta</h3>
              <div className="grid gap-2">
                <Label htmlFor="userName">Nombre de Usuario</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userEmail">Correo Electrónico</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="tu.correo@example.com"
                  disabled // Email usually not editable directly
                />
              </div>
            </div>

            <Separator />

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="h-5 w-5 text-orange-600" /> Notificaciones</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="notificationsEnabled">Habilitar Notificaciones</Label>
                <Switch
                  id="notificationsEnabled"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recibe alertas sobre nuevas tendencias, movimientos de competidores y actualizaciones importantes.
              </p>
            </div>

            <Separator />

            {/* Appearance Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Palette className="h-5 w-5 text-purple-600" /> Apariencia</h3>
              <div className="grid gap-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Seleccionar tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Cambia el tema visual de la aplicación.
              </p>
            </div>

            <Separator />

            {/* Language Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Globe className="h-5 w-5 text-green-600" /> Idioma</h3>
              <div className="grid gap-2">
                <Label htmlFor="language">Idioma de la Aplicación</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Cambia el idioma de la interfaz de usuario.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
