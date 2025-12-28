"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AlgorithmControls from "@/components/algorithm-controls"
import AlgorithmExplanation from "@/components/algorithm-explanation"
import { ArrowDownIcon } from "lucide-react"

// Constants for visualization
const MIN_VALUE = 10
const MAX_VALUE = 100
const DEFAULT_ARRAY_SIZE = 15
const DEFAULT_SPEED = 100 // Higher is slower

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [displayArray, setDisplayArray] = useState<number[]>([]) // Separate array for display
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [compareIndex, setCompareIndex] = useState<number | null>(null)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [sortingComplete, setSortingComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [operationType, setOperationType] = useState<string>("")

  // Refs for animation control
  const sortingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sortingStepsRef = useRef<Array<{ type: string; indices: number[]; values?: number[] }>>([])
  const currentStepRef = useRef(0)
  const originalArrayRef = useRef<number[]>([])

  // Generate a new random array
  const generateArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
    )
    setArray(newArray)
    setDisplayArray(newArray) // Set display array to match actual array
    originalArrayRef.current = [...newArray] // Store a copy of the original array
    setSortedIndices([])
    setCurrentIndex(null)
    setCompareIndex(null)
    setOperationType("")
    setSortingComplete(false)
    setCurrentStep(0)
    setTotalSteps(0)
    sortingStepsRef.current = []
    currentStepRef.current = 0
  }

  // Initialize array on component mount and when array size changes
  useEffect(() => {
    generateArray()
  }, [arraySize])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (sortingTimeoutRef.current) {
        clearTimeout(sortingTimeoutRef.current)
      }
    }
  }, [])

  // Insertion Sort Algorithm with visualization steps
  const insertionSort = () => {
    const steps: Array<{ type: string; indices: number[]; values?: number[] }> = []
    const arrayCopy = [...originalArrayRef.current] // Use the original array values
    const n = arrayCopy.length

    // First element is already sorted
    steps.push({ type: "sorted", indices: [0], values: [...arrayCopy] })

    for (let i = 1; i < n; i++) {
      // Current element to be compared
      steps.push({ type: "current", indices: [i], values: [...arrayCopy] })

      let j = i - 1
      const key = arrayCopy[i]

      // Compare with each element on the left until finding the correct position
      while (j >= 0 && arrayCopy[j] > key) {
        steps.push({ type: "compare", indices: [j, i], values: [...arrayCopy] })

        // Move elements to the right
        arrayCopy[j + 1] = arrayCopy[j]
        steps.push({ type: "swap", indices: [j, j + 1], values: [...arrayCopy] })

        j--
      }

      // Place the key at its correct position
      arrayCopy[j + 1] = key
      steps.push({ type: "insert", indices: [j + 1], values: [...arrayCopy] })

      // Mark elements as sorted
      const sortedSoFar = Array.from({ length: i + 1 }, (_, idx) => idx)
      steps.push({ type: "sorted", indices: sortedSoFar, values: [...arrayCopy] })
    }

    // Final step - all sorted
    steps.push({ type: "complete", indices: Array.from({ length: n }, (_, i) => i), values: [...arrayCopy] })

    return steps
  }

  // Start the sorting visualization
  const startSorting = () => {
    if (isSorting && !isPaused) return

    if (!isSorting) {
      // Generate the sorting steps
      const steps = insertionSort()
      sortingStepsRef.current = steps
      currentStepRef.current = 0
      setTotalSteps(steps.length)

      // Reset the array to its original state before starting
      setArray([...originalArrayRef.current])
      setDisplayArray([...originalArrayRef.current])
    }

    setIsSorting(true)
    setIsPaused(false)

    // Start or resume the animation
    animateSort()
  }

  // Pause the sorting visualization
  const pauseSorting = () => {
    setIsPaused(true)
    if (sortingTimeoutRef.current) {
      clearTimeout(sortingTimeoutRef.current)
    }
  }

  // Reset the sorting visualization
  const resetSorting = () => {
    if (sortingTimeoutRef.current) {
      clearTimeout(sortingTimeoutRef.current)
    }
    setIsSorting(false)
    setIsPaused(false)
    setSortingComplete(false)
    setSortedIndices([])
    setCurrentIndex(null)
    setCompareIndex(null)
    setOperationType("")
    setCurrentStep(0)
    setArray([...originalArrayRef.current]) // Reset to original array
    setDisplayArray([...originalArrayRef.current]) // Reset display array too
  }

  // Animate the sorting process step by step
  const animateSort = () => {
    if (currentStepRef.current >= sortingStepsRef.current.length) {
      setSortingComplete(true)
      setIsSorting(false)
      setOperationType("complete")

      // Sort the array for the final display
      const sortedArray = [...originalArrayRef.current].sort((a, b) => a - b)
      setArray(sortedArray)
      setDisplayArray(sortedArray)

      return
    }

    const step = sortingStepsRef.current[currentStepRef.current]
    setCurrentStep(currentStepRef.current + 1)

    switch (step.type) {
      case "current":
        setCurrentIndex(step.indices[0])
        setCompareIndex(null)
        setOperationType("current")
        break
      case "compare":
        setCompareIndex(step.indices[0])
        setOperationType("compare")
        break
      case "swap":
        // Update the array for visualization
        setArray((prevArray) => {
          const newArray = [...prevArray]
          const [from, to] = step.indices
          newArray[to] = prevArray[from]
          return newArray
        })
        setOperationType("swap")
        break
      case "insert":
        setOperationType("insert")
        break
      case "sorted":
        setSortedIndices(step.indices)
        setOperationType("sorted")
        break
      case "complete":
        setSortedIndices(step.indices)
        setCurrentIndex(null)
        setCompareIndex(null)
        setOperationType("complete")
        break
    }

    // Update the display array with the correct values from the step
    if (step.values) {
      setDisplayArray(step.values)
    }

    currentStepRef.current++

    // Schedule the next step
    if (!isPaused) {
      sortingTimeoutRef.current = setTimeout(animateSort, speed)
    }
  }

  // Calculate the maximum bar height
  const maxBarHeight = 350

  // Calculate bar width based on array size
  const barWidth = Math.max(20, Math.min(50, 700 / arraySize))
  const barSpacing = Math.max(2, Math.min(10, 20 / (arraySize / 10)))

  // Get operation description
  const getOperationDescription = () => {
    if (!isSorting && !sortingComplete) return "Ready to sort"
    if (sortingComplete) return "Sorting Complete!"

    switch (operationType) {
      case "current":
        return `Selecting element at position ${currentIndex}`
      case "compare":
        return `Comparing elements at positions ${compareIndex} and ${currentIndex}`
      case "swap":
        return `Moving elements`
      case "insert":
        return "Inserting element at its correct position"
      case "sorted":
        return `Elements at positions ${sortedIndices.join(", ")} are sorted`
      default:
        return "Processing..."
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-yellow-300 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        INSERTION SORT
      </h1>

      {/* Operation Description */}
      <div className="w-full max-w-5xl mb-4 bg-black/80 text-white p-3 border-2 border-yellow-400 text-center">
        <p className="font-bold" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}>
          {getOperationDescription()}
        </p>
      </div>

      {/* Visualization Container */}
      <div className="relative w-full max-w-5xl h-[500px] bg-white/20 border-4 border-black mb-8 flex items-end justify-center p-4 pt-12">
        {/* Pixel corners */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-black"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-black"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-black"></div>

        {/* Array Bars */}
        <div className="flex items-end justify-center h-full w-full">
          {array.map((value, index) => {
            // Calculate bar height as a percentage of the maximum value
            const height = (value / MAX_VALUE) * maxBarHeight

            // Determine bar color based on its state
            let barColor = "#4EA8DE" // Default blue

            if (sortedIndices.includes(index)) {
              barColor = "#57CC99" // Green for sorted elements
            }
            if (index === currentIndex) {
              barColor = "#FF4D6D" // Pink for current element
            }
            if (index === compareIndex) {
              barColor = "#FFC857" // Yellow for comparison element
            }

            // Get the display value for this index
            const displayValue = displayArray[index] || value

            return (
              <motion.div
                key={index}
                className="border-2 border-black relative"
                style={{
                  height: `${height}px`,
                  width: `${barWidth}px`,
                  marginLeft: `${barSpacing}px`,
                  marginRight: `${barSpacing}px`,
                  backgroundColor: barColor,
                  boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.3)",
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {/* Pointer for current element */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowDownIcon className="w-6 h-6 text-red-500" />
                  </motion.div>
                )}

                {/* Pointer for compare element */}
                {index === compareIndex && (
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowDownIcon className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                )}

                <div
                  className="absolute bottom-[-45px] left-1/2 transform -translate-x-1/2 text-sm font-mono font-bold bg-black/10 px-1 rounded"
                  style={{ minWidth: `${barWidth}px`, textAlign: "center" }}
                >
                  {displayValue}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sorting Complete Overlay */}
        <AnimatePresence>
          {sortingComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-white text-3xl font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                SORTING COMPLETE!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-5xl h-8 bg-gray-200 border-2 border-black mb-8">
        <div
          className="h-full bg-pink-500 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Controls */}
      <AlgorithmControls
        isSorting={isSorting}
        isPaused={isPaused}
        onStart={startSorting}
        onPause={pauseSorting}
        onReset={resetSorting}
        onGenerate={generateArray}
        speed={speed}
        onSpeedChange={setSpeed}
        arraySize={arraySize}
        onArraySizeChange={setArraySize}
        onShowExplanation={() => setShowExplanation(true)}
      />

      {/* Algorithm Explanation Modal */}
      <AnimatePresence>
        {showExplanation && <AlgorithmExplanation onClose={() => setShowExplanation(false)} />}
      </AnimatePresence>

      {/* Group Members Section - Original Design */}
      <div className="w-full max-w-5xl mt-8 bg-black/80 border-4 border-yellow-400 p-6 text-center">
        <h2
          className="text-2xl font-bold mb-4 text-yellow-300"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.2rem" }}
        >
          GROUP MEMBERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="bg-yellow-300/20 p-3 border-2 border-yellow-400">
            <p className="font-bold text-yellow-300">SOHAM SHUKLA</p>
            <p className="text-sm mt-1">ROLL NO: 16010123334</p>
          </div>
          <div className="bg-yellow-300/20 p-3 border-2 border-yellow-400">
            <p className="font-bold text-yellow-300">SIDDHANT THAKUR</p>
            <p className="text-sm mt-1">ROLL NO: 16010123332</p>
          </div>
          <div className="bg-yellow-300/20 p-3 border-2 border-yellow-400">
            <p className="font-bold text-yellow-300">DISHA GAIKWAD</p>
            <p className="text-sm mt-1">ROLL NO: 16010123335</p>
          </div>
        </div>
        <div className="mt-4 bg-yellow-300 text-black py-2 px-4 inline-block border-2 border-yellow-400">
          <p className="font-bold" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}>
            BATCH: E2
          </p>
        </div>
      </div>
    </div>
  )
}
