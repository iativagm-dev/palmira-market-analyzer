'use client'

import { useState, useEffect } from 'react'
import DashboardPage from '@/components/dashboard-page'
import { LoadingScreen } from '@/components/loading-screen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust loading time as needed

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && <DashboardPage />}
    </>
  )
}
