"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Zap, Shield, BarChart, Feather } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useMediaQuery } from "usehooks-ts"

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
]

export function HorizontalScrollFeatures() {
  const targetRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["40%", `-${(features.length - 1) * 10}%`])

  if (isMobile) {
    // Mobile fallback: stacked cards
    return (
      <div className="space-y-6 px-4 py-10">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card border-accent">
            <CardHeader className="flex flex-col items-center text-center p-8">
              <feature.icon className="h-16 w-16 text-primary mb-6" />
              <CardTitle className="text-2xl mb-2 text-foreground">{feature.title}</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div ref={targetRef} className="relative h-[400vh]">
      {/* Fake vertical scroll sections */}
      {Array.from({ length: features.length }).map((_, index) => (
        <div
          key={`section-${index}`}
          className="absolute h-[50vh] w-full"
          style={{ top: `${(index * 400) / features.length}vh` }}
        />
      ))}

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-accent via-accent/95 to-background">
        <motion.div
          style={{ x }}
          className="flex w-[800vw] h-full items-center px-8 gap-8"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="min-w-[80vw] max-w-4xl h-4/5 flex flex-col justify-center bg-card border-accent"
            >
              <CardHeader className="flex flex-col items-center text-center p-12">
                <feature.icon className="h-24 w-24 text-primary mb-8" />
                <CardTitle className="text-4xl mb-4 text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-xl max-w-2xl">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
