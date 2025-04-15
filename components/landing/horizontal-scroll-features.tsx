"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion"
import { Code, Zap, Shield, BarChart, Sparkles, Database, Lock, Cpu, Feather } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Feature data with icons, titles, and descriptions
const features = [
  {
    icon: Feather,
    title: "Features",
    description: "What does Code Pilot bring to the table? Scroll to see!",
  },
  {
    icon: Code,
    title: "Syntax Analysis",
    description: "Identify syntax errors, code smells, and style issues before they cause problems.",
  },
  {
    icon: Zap,
    title: "Error Detection",
    description: "Catch runtime errors and logical bugs with AI-powered static analysis.",
  },
  {
    icon: Shield,
    title: "Security Scanning",
    description: "Identify security vulnerabilities and get recommendations to fix them.",
  },
  {
    icon: BarChart,
    title: "Performance Insights",
    description: "Get suggestions to optimize your code for better performance and efficiency.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Receive intelligent code suggestions based on best practices and your coding style.",
  },
  {
    icon: Database,
    title: "Database Optimization",
    description: "Analyze and optimize your database queries for better performance.",
  },
  {
    icon: Cpu,
    title: "Resource Usage",
    description: "Monitor and optimize CPU and memory usage in your applications.",
  },
]

export function HorizontalScrollFeatures() {
  // Reference to the container element
  const targetRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const controls = useAnimationControls()
  const numFeatures = features.length

  // Get scroll progress within the target element
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Create snap effect
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Calculate which feature should be active based on scroll position
      const rawIndex = latest * numFeatures
      const nearestIndex = Math.round(rawIndex)
      const clampedIndex = Math.max(0, Math.min(nearestIndex, numFeatures - 1))
      
      // Set active feature for visual highlighting
      setActiveFeature(clampedIndex)
      
      // Animate to the correct position
      controls.start({
        x: `-${clampedIndex * 100}%`,
        transition: { type: "spring", stiffness: 200, damping: 30 }
      })
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, controls, numFeatures])

  return (
    <div
      ref={targetRef}
      className="relative h-[400vh]"
    >
      {/* Create section dividers for each feature */}
      {Array.from({ length: numFeatures }).map((_, index) => (
        <div 
          key={`section-${index}`}
          className="absolute h-[50vh]" 
          style={{ top: `${(index * 400) / numFeatures}vh` }}
        />
      ))}
      
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-b from-accent via-accent/95 to-background">
        <div className="w-full h-full flex flex-col">
          {/* Full-screen horizontal scrolling features */}
          <div className="flex-1 overflow-hidden w-full">
            <motion.div 
              className="flex w-full h-full "
              animate={controls}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="w-full flex-shrink-0 flex items-center justify-center px-4 mt-auto"
                  animate={{
                    opacity: activeFeature === index ? 1 : 0.3,
                    scale: activeFeature === index ? 1 : 0.85
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-card border-accent w-full h-4/5 max-w-4xl mx-auto flex flex-col justify-center">
                    <CardHeader className="flex flex-col items-center text-center p-12">
                      <feature.icon className="h-24 w-24 text-primary mb-8" />
                      <CardTitle className="text-4xl mb-4 text-foreground">{feature.title}</CardTitle>
                      <CardDescription className="text-muted-foreground text-xl max-w-2xl">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer with counter and navigation dots */}
          <div className="container px-4 md:px-6 mx-auto py-8">
            <div className="flex justify-between items-center">
              <div className="text-foreground font-mono">
                <span className="font-bold">{activeFeature + 1}</span>
                <span className="text-muted-foreground"> / {features.length}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}