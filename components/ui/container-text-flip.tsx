"use client"

import React, { useState, useEffect, useId } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[]
  /** Time in milliseconds between word transitions */
  interval?: number
  /** Additional CSS classes to apply to the container */
  className?: string
  /** Additional CSS classes to apply to the text */
  textClassName?: string
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 1500,
}: ContainerTextFlipProps) {
  const id = useId()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [width, setWidth] = useState("auto")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLDivElement>(null)

  // Update width whenever the word changes
  useEffect(() => {
    if (textRef.current) {
      // Force a reflow to ensure accurate measurement
      void textRef.current.offsetWidth

      // Get the actual width of the text content
      const textWidth = textRef.current.scrollWidth

      // Add a small buffer to prevent any potential wrapping (5px)
      setWidth(`${textWidth + 5}px`)
    }
  }, [currentWordIndex, words])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(intervalId)
  }, [words, interval])

  return (
    <div ref={containerRef} className="inline-block" style={{ minHeight: "1.5em", whiteSpace: "nowrap" }}>
      <motion.div
        layout
        layoutId={`words-here-${id}`}
        style={{ width, display: "inline-block", whiteSpace: "nowrap" }}
        transition={{ duration: animationDuration / 2000 }}
        className={cn("rounded-lg pt-2 text-4xl lg:text-6xl font-bold text-black dark:text-white", "bg-transparent", className)}
      >
        <motion.div
          transition={{
            duration: animationDuration / 1000,
            ease: "easeInOut",
          }}
          className={cn("inline-block whitespace-nowrap", textClassName)}
          ref={textRef}
          layoutId={`word-div-${words[currentWordIndex]}-${id}`}
          key={words[currentWordIndex]}
        >
          <motion.div className="inline-block whitespace-nowrap">
            {words[currentWordIndex].split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: index * 0.02,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

