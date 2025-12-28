"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

interface AlgorithmExplanationProps {
  onClose: () => void
}

export default function AlgorithmExplanation({ onClose }: AlgorithmExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-yellow-300 border-4 border-black p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto relative"
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-800 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2
          className="text-2xl font-bold mb-6 text-center text-gray-800"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          INSERTION SORT
        </h2>

        <div className="space-y-6 text-gray-800">
          <div className="bg-white/30 p-4 border-2 border-black">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem" }}
            >
              HOW IT WORKS
            </h3>
            <p className="mb-4">
              Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's
              much like sorting playing cards in your hand.
            </p>

            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  1
                </div>
                <p>Start with the second element (the first is already "sorted")</p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  2
                </div>
                <p>Compare it with the elements before it and shift those elements right to make space</p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  3
                </div>
                <p>Insert the element in its correct position in the sorted part</p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  4
                </div>
                <p>Repeat for all elements in the array</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 p-4 border-2 border-black">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem" }}
            >
              PSEUDOCODE
            </h3>
            <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm">
              {`for i = 1 to length(array) - 1
    key = array[i]
    j = i - 1
    
    while j >= 0 and array[j] > key
        array[j+1] = array[j]
        j = j - 1
    
    array[j+1] = key`}
            </pre>
          </div>

          <div className="bg-white/30 p-4 border-2 border-black">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem" }}
            >
              VISUALIZATION GUIDE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#57CC99] mr-2 border border-black"></div>
                <span>Sorted elements</span>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#FF4D6D] mr-2 border border-black"></div>
                <span>Current element</span>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#FFC857] mr-2 border border-black"></div>
                <span>Comparison element</span>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#4EA8DE] mr-2 border border-black"></div>
                <span>Unsorted elements</span>
              </div>
            </div>
          </div>

          <div className="bg-white/30 p-4 border-2 border-black">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem" }}
            >
              COMPLEXITY
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-bold">Time Complexity (Best):</span>
                <span className="font-mono">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Time Complexity (Average):</span>
                <span className="font-mono">O(n²)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Time Complexity (Worst):</span>
                <span className="font-mono">O(n²)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Space Complexity:</span>
                <span className="font-mono">O(1)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-black/80 p-4 border-2 border-yellow-400 text-center">
          <h3
            className="text-xl font-bold mb-2 text-yellow-300"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}
          >
            PROJECT BY
          </h3>
          <div className="grid grid-cols-3 gap-2 text-white text-xs">
            <div>
              SOHAM SHUKLA
              <br />
              16010123334
            </div>
            <div>
              SIDDHANT THAKUR
              <br />
              16010123332
            </div>
            <div>
              DISHA GAIKWAD
              <br />
              16010123335
            </div>
          </div>
          <div className="mt-2 text-yellow-300 font-bold text-sm">BATCH: E2</div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-500 text-white font-bold border-4 border-black hover:bg-blue-600 transition-colors"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
