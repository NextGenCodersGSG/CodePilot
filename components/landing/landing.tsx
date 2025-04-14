"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Zap, Shield, BarChart} from "lucide-react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import ThreeDImage from "@/components/3d-Image/ThreeDImage"
import { BackgroundBeamsWithCollision } from "@/components/ui/collision-beams"
import { ContainerTextFlip } from "@/components/ui/container-text-flip"
import ShinyText from "@/components/ui/ShinyText/shiny-text"
import BillingSection from "./billing"
import Header from "@/components/header/Header"
import Link from "next/link"
import { InfiniteTestimonialScroll } from "./infinite-testimonial-scroll"
import CTASection from "./cta-section"
import { HorizontalScrollFeatures } from "./horizontal-scroll-features"

export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header/>
      <main className="flex-1">
        {/* Hero Section */}
        <BackgroundBeamsWithCollision>
        <section className="py-20 md:py-auto overflow-x-hidden min-h-screen rounded-b-2xl">
          <div className="container min-w-screen rounded-b-2xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center overflow-hidden ">
              <motion.div
                className="space-y-6 px-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mb-1"
                >
                  <Badge className="transition duration-200 cursor-default mb-2 bg-[#003356] text-foreground hover:bg-secondary">AI-Powered Code Review</Badge>
                </motion.div>
                <div>
                  <ContainerTextFlip words={["Write Better", "Write Smarter","Develop Faster"]} />
                  <TextGenerateEffect duration={0.6} className="text-4xl md:text-5xl font-bold tracking-tighter -mt-3" words="Code with AI-Driven Insights"/>
                </div>
                  <motion.p 
                    className="text-lg text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6,delay:0.2, ease: "easeInOut" }}
                  >
                    CodePilot analyzes your code, detects errors, suggests optimizations, and helps you ship faster with
                    confidence.
                  </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6,delay:0.2, ease: "easeInOut" }}
                >
                  <Link href="/sign-in">
                    <Button size="lg" className=" cursor-pointer w-full sm:w-auto bg-primary hover:bg-secondary text-foreground">
                      Start for free
                    </Button>
                  </Link>
                  <Link href="/code-analysis/documentation">
                    <Button size="lg" className=" cursor-pointer w-full sm:w-auto border-accent bg-muted hover:bg-accent text-foreground">
                      Learn more
                    </Button>
                  </Link>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4,delay:0.4, ease: "easeInOut" }}
                >
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <ShinyText text="No credit card required" disabled={false} speed={5} className='' />
                </motion.div>
              </motion.div>
              <motion.div
                className="relative hidden lg:block rounded-lg mr-15"
                initial={{ opacity: 0, scale: 0.9, x:100, y: 100 }}
                animate={{ opacity: 1, scale: 1,x :0, y:0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                  <ThreeDImage/>
              </motion.div>
            </div>
          </div>
        </section>
        </BackgroundBeamsWithCollision>
        {/* Features Section */}
        <HorizontalScrollFeatures/>

        {/* Testimonials Section */}
        <InfiniteTestimonialScroll/>
        {/* Pricing Section */}
        <BillingSection/>
        {/* CTA Section */}
        <CTASection/>
      </main>
    </div>
  )
}

