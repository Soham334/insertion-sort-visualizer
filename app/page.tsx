"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import SortingVisualizer from "@/components/sorting-visualizer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Preload image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/placeholder.svg?height=300&width=300"

    // When assets are loaded
    Promise.all([
      new Promise((resolve) => {
        img.onload = resolve
      }),
    ]).then(() => {
      setAssetsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!assetsLoaded) return

    // Simulate loading process
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Add a small delay before showing the visualizer
          setTimeout(() => {
            setIsLoading(false)
          }, 500)

          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [assetsLoaded])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-yellow-300">
      {isLoading ? <LoadingScreen progress={loadingProgress} /> : <SortingVisualizer />}
    </main>
  )
}
