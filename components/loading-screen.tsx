'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/images/iativa-logo.png"
              alt="Iativa Logo"
              width={128}
              height={128}
              className="mb-6 animate-pulse"
            />
            <h1 className="text-4xl font-bold mb-4">Palmira Market Analyzer</h1>
            <p className="text-lg mb-8">Cargando tu experiencia de análisis de mercado...</p>
            <Loader2 className="h-12 w-12 animate-spin" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
