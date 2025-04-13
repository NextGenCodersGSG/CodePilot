"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimationControls } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer at TechCorp",
    content:
      "CodePilot has cut our code review time in half. The AI catches issues I would have missed, and the performance suggestions have made our app noticeably faster.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Engineer at StartupX",
    content:
      "As a startup, we don't have the resources for extensive QA. CodePilot acts like an extra team member, catching bugs before they reach production.",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Freelance Developer",
    content:
      "The security scanning feature has saved me multiple times. It found vulnerabilities I completely overlooked and provided clear guidance on how to fix them.",
  },
  {
    id: 4,
    name: "Emily Zhang",
    role: "CTO at HealthTech",
    content:
      "Our team's code quality has improved dramatically since we started using CodePilot. The AI suggestions are like having a senior developer review every line of code.",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Full Stack Developer",
    content:
      "I was skeptical at first, but CodePilot has become an essential part of my workflow. It's like having a pair programmer who never gets tired.",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    role: "Mobile App Developer",
    content:
      "The performance optimization suggestions have made our React Native app run 30% faster. Our users have definitely noticed the difference.",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "DevOps Engineer",
    content:
      "CodePilot has helped us identify security vulnerabilities in our CI/CD pipeline that we would have missed. It's been a game-changer for our security posture.",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    role: "Backend Developer",
    content:
      "The API suggestions and best practices have helped standardize our codebase. New team members can get up to speed much faster now.",
  },
]

const doubledTestimonials = [...testimonials, ...testimonials]

export function InfiniteTestimonialScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    const scrollWidth = scrollRef.current?.scrollWidth || 0
    const viewportWidth = scrollRef.current?.offsetWidth || 0

    // Only animate if there are enough testimonials to scroll
    if (scrollWidth > viewportWidth) {
      const animate = async () => {
        // Calculate the distance to scroll (width of the first set of testimonials)
        const scrollDistance = scrollWidth / 2

        // Set initial position
        await controls.set({ x: 0 })

        // Animate to the end of the first set of testimonials
        await controls.start({
          x: -scrollDistance,
          transition: {
            duration: scrollDistance / 25, // Adjust speed here (lower number = faster)
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        })
      }

      animate()
    }

    return () => {
      controls.stop()
    }
  }, [controls])

  return (
    <div className="relative w-full h-[50vh] mt-15 bg-gradient-to-b from-[#00111C] to-[#001A2C]">
      {/* Left fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" />

      {/* Right fade effect */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="overflow-hidden">
        <motion.div ref={scrollRef} className="flex gap-6 py-4" animate={controls}>
          {doubledTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px]">
              <Card className="h-full bg-[#001523] border-[#002945] hover:border-[#00406C] transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={"/profile.jpg"}
                      width={60}
                      height={60}
                      alt={`${testimonial.name} avatar`}
                      className="rounded-3xl bg-[#00406C]/20"
                    />
                    <div>
                      <h3 className="font-semibold text-[#F2F2F2]">{testimonial.name}</h3>
                      <p className="text-sm text-[#B3B3B3]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[#B3B3B3] line-clamp-4">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
