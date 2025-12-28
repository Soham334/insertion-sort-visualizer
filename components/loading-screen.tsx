"use client"

import { useEffect, useRef } from "react"

interface LoadingScreenProps {
  progress: number
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawLoadingAnimation()

    function drawLoadingAnimation() {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "#fcd34d")
      bgGradient.addColorStop(1, "#fbbf24")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid pattern for background
      ctx.strokeStyle = "rgba(0,0,0,0.1)"
      ctx.lineWidth = 1
      const gridSize = 20
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw title
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 5
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.fillStyle = "black"
      ctx.font = "20px 'Press Start 2P', monospace"
      ctx.textAlign = "center"
      ctx.fillText("INSERTION SORT VISUALIZER", canvas.width / 2, 50)

      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Simple bar animation that only moves up
      const barWidth = 30
      const spacing = 15
      const numBars = 10
      const maxHeight = 180
      const totalWidth = numBars * (barWidth + spacing) - spacing

      // Center the bars horizontally
      const startX = (canvas.width - totalWidth) / 2

      // Position bars in the middle of the canvas (above loading line)
      const baseY = 250 // Base position where bars start from

      // Draw the bars
      for (let i = 0; i < numBars; i++) {
        // Calculate height based on progress and position
        // This creates a wave-like effect that moves from left to right
        const phase = (progress / 100) * Math.PI * 2 // Full cycle based on progress
        const offset = (i / numBars) * Math.PI * 2 // Offset based on position

        // Calculate height - only positive values (only moving up)
        const heightPercent = 0.2 + 0.8 * Math.abs(Math.sin(phase + offset))
        const height = maxHeight * heightPercent

        const x = startX + i * (barWidth + spacing)
        const y = baseY - height // Bar grows upward from baseY

        // Determine bar color based on position and progress
        const hue = (i * 36 + progress * 2) % 360

        // Create gradient for bar
        const barGradient = ctx.createLinearGradient(x, y, x + barWidth, baseY)

        // Different colors for different bars
        if (i % 3 === 0) {
          barGradient.addColorStop(0, "#FF4D6D") // Pink
          barGradient.addColorStop(1, "#FF8FA3")
        } else if (i % 3 === 1) {
          barGradient.addColorStop(0, "#4EA8DE") // Blue
          barGradient.addColorStop(1, "#76C6FF")
        } else {
          barGradient.addColorStop(0, "#57CC99") // Green
          barGradient.addColorStop(1, "#80E0B7")
        }

        // Draw bar
        ctx.fillStyle = barGradient
        ctx.beginPath()
        ctx.moveTo(x + 5, y)
        ctx.lineTo(x + barWidth - 5, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + 5)
        ctx.lineTo(x + barWidth, baseY - 5)
        ctx.quadraticCurveTo(x + barWidth, baseY, x + barWidth - 5, baseY)
        ctx.lineTo(x + 5, baseY)
        ctx.quadraticCurveTo(x, baseY, x, baseY - 5)
        ctx.lineTo(x, y + 5)
        ctx.quadraticCurveTo(x, y, x + 5, y)
        ctx.closePath()
        ctx.fill()

        // Draw border
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.stroke()

        // Add shine effect
        ctx.beginPath()
        ctx.moveTo(x + 5, y + 5)
        ctx.lineTo(x + barWidth - 5, y + 5)
        ctx.strokeStyle = "rgba(255,255,255,0.7)"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw loading text and progress
      ctx.fillStyle = "black"
      ctx.font = "16px 'Press Start 2P', monospace"
      ctx.textAlign = "center"
      ctx.fillText(`LOADING... ${progress}%`, canvas.width / 2, 320)

      // Draw loading bar
      const loadingBarWidth = 300
      const loadingBarHeight = 20
      const loadingBarX = (canvas.width - loadingBarWidth) / 2
      const loadingBarY = 350

      // Bar background
      ctx.fillStyle = "rgba(0,0,0,0.2)"
      ctx.fillRect(loadingBarX, loadingBarY, loadingBarWidth, loadingBarHeight)

      // Bar progress
      const progressWidth = (progress / 100) * loadingBarWidth
      const progressGradient = ctx.createLinearGradient(loadingBarX, 0, loadingBarX + progressWidth, 0)
      progressGradient.addColorStop(0, "#57CC99")
      progressGradient.addColorStop(1, "#4EA8DE")
      ctx.fillStyle = progressGradient
      ctx.fillRect(loadingBarX, loadingBarY, progressWidth, loadingBarHeight)

      // Bar border
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.strokeRect(loadingBarX, loadingBarY, loadingBarWidth, loadingBarHeight)

      // Draw pixel art border
      ctx.strokeStyle = "black"
      ctx.lineWidth = 4
      ctx.strokeRect(0, 0, canvas.width, canvas.height)

      // Draw pixel corners
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 8, 8)
      ctx.fillRect(canvas.width - 8, 0, 8, 8)
      ctx.fillRect(0, canvas.height - 8, 8, 8)
      ctx.fillRect(canvas.width - 8, canvas.height - 8, 8, 8)
    }
  }, [progress])

  return (
    <div className="flex flex-col items-center justify-center bg-yellow-300 min-h-screen w-full">
      <div className="relative">
        <canvas ref={canvasRef} width={600} height={450} className="border-4 border-black shadow-lg" />
      </div>

      <div className="mt-8 text-center">
        <div
          className="text-3xl font-bold text-gray-800"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.5rem" }}
        >
          Loading...
        </div>
        <div
          className="mt-2 text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.2rem" }}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}
