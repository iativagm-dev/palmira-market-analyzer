'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Bot, Send, X, Loader2, Lightbulb, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { usePathname } from 'next/navigation'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: '¡Hola! Soy tu asistente de Palmira Market Analyzer. ¿En qué puedo ayudarte hoy?',
    sender: 'ai',
    timestamp: new Date(),
  },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getContextualPrompt = (currentPath: string) => {
    switch (currentPath) {
      case '/dashboard':
        return 'El usuario está en el Dashboard. Ofrece ayuda relacionada con métricas generales, resumen de datos o navegación rápida.'
      case '/market-analysis':
        return 'El usuario está en el módulo de Análisis de Mercado. Ofrece ayuda sobre cómo interpretar los datos, generar nuevos análisis o entender las tendencias.'
      case '/zones':
        return 'El usuario está en el módulo de Zonas. Ofrece ayuda sobre cómo explorar zonas, entender datos demográficos o identificar oportunidades geográficas.'
      case '/trends':
        return 'El usuario está en el módulo de Tendencias. Ofrece ayuda sobre cómo identificar nuevas tendencias, entender su impacto o buscar tendencias específicas.'
      case '/competitors':
        return 'El usuario está en el módulo de Competidores. Ofrece ayuda sobre cómo analizar competidores, comparar estrategias o buscar información de un competidor específico.'
      case '/business-directory':
        return 'El usuario está en el Directorio de Negocios. Ofrece ayuda sobre cómo buscar negocios, filtrar por categoría o ver detalles de un negocio.'
      case '/interactive-map':
        return 'El usuario está en el Mapa Interactivo. Ofrece ayuda sobre cómo usar el mapa, buscar ubicaciones o visualizar datos geográficos.'
      case '/reports':
        return 'El usuario está en el módulo de Reportes. Ofrece ayuda sobre cómo generar reportes, personalizar informes o exportar datos.'
      case '/settings':
        return 'El usuario está en Configuración. Ofrece ayuda sobre cómo ajustar preferencias, gestionar la cuenta o cambiar la configuración de la aplicación.'
      default:
        return 'El usuario está en una página general. Ofrece ayuda general sobre la aplicación Palmira Market Analyzer.'
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '' || isSending) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsSending(true)

    try {
      const contextualPrompt = getContextualPrompt(pathname)
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt: `Eres un asistente de IA para una aplicación de análisis de mercado llamada "Palmira Market Analyzer". Tu objetivo es ayudar al usuario a navegar y entender los datos de la aplicación. Responde de manera concisa y útil, enfocándote en la funcionalidad de la aplicación.
        Contexto actual del usuario: ${contextualPrompt}
        Mensaje del usuario: ${newUserMessage.text}`,
      })

      const aiResponse: Message = {
        id: Date.now().toString() + '-ai',
        text: text,
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error generating AI response:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-error',
          text: 'Lo siento, no pude procesar tu solicitud en este momento. Por favor, inténtalo de nuevo.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="default"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        <span className="sr-only">Toggle AI Assistant</span>
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col"
        >
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" /> Asistente de IA
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar asistente</span>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <span className="block text-right text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isSending}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isSending}>
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Enviar mensaje</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
