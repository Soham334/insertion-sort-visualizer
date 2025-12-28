"use client"

import { Slider } from "@/components/ui/slider"
import TetorisButton from "@/components/tetoris-button"

interface AlgorithmControlsProps {
  isSorting: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onGenerate: () => void
  speed: number
  onSpeedChange: (value: number) => void
  arraySize: number
  onArraySizeChange: (value: number) => void
  onShowExplanation: () => void
}

export default function AlgorithmControls({
  isSorting,
  isPaused,
  onStart,
  onPause,
  onReset,
  onGenerate,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  onShowExplanation,
}: AlgorithmControlsProps) {
  return (
    <div className="w-full max-w-5xl bg-yellow-300 border-4 border-black p-6 rounded-none relative">
      {/* Pixel corners */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-black"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-6">
          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                className="text-gray-800 font-bold"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}
              >
                SPEED
              </label>
              <span className="font-mono">{Math.round(100 - speed / 5)}%</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              min={10}
              max={500}
              step={10}
              className="w-full"
              disabled={isSorting && !isPaused}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          {/* Array Size Control */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                className="text-gray-800 font-bold"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}
              >
                ARRAY SIZE
              </label>
              <span className="font-mono">{arraySize}</span>
            </div>
            <Slider
              value={[arraySize]}
              onValueChange={(value) => onArraySizeChange(value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
              disabled={isSorting}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 justify-center">
          <div className="grid grid-cols-2 gap-4">
            {isSorting && !isPaused ? (
              <TetorisButton label="PAUSE" onClick={onPause} color="yellow" />
            ) : (
              <TetorisButton label="START" onClick={onStart} color="blue" />
            )}
            <TetorisButton label="RESET" onClick={onReset} color="pink" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TetorisButton label="NEW ARRAY" onClick={onGenerate} color="purple" />
            <TetorisButton label="HOW IT WORKS" onClick={onShowExplanation} color="yellow" />
          </div>
        </div>
      </div>
    </div>
  )
}
