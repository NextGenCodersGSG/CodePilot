"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Github, Linkedin, Twitter, Zap, Shield, BarChart, Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import ThreeDImage from "@/components/3d-Image/ThreeDImage"
import { BackgroundBeamsWithCollision } from "@/components/ui/collision-beams"
import { ContainerTextFlip } from "@/components/ui/container-text-flip"

function useInView(threshold = 0.1) {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, threshold])

  return { ref, controls }
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

const MotionCard = motion(Card)

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuresSection = useInView()
  const testimonialsSection = useInView()
  const pricingSection = useInView()

  return (
    <div className="flex min-h-screen flex-col bg-[#00111C] text-[#F2F2F2]">
      <header className="px-6 sticky top-0 z-40 w-full border-b border-[#002945] bg-[#00111C]/95 backdrop-blur supports-[backdrop-filter]:bg-[#00111C]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-[#00406C]" />
            <span className="text-xl font-bold">CodePilot</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-[#00406C]">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-[#00406C]">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-[#00406C]">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#00406C]">
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex gap-4">
            <Link href="/sign-in" className=" transition duration-150 rounded-lg px-4 py-2 border-[#002945] bg-[#001A2C] hover:bg-[#002945] hover:text-[#F2F2F2]">
              Log in
            </Link>
            <Link href="/sign-up" className="transition duration-150  rounded-lg px-4 py-2 bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">
              Sign up
            </Link>
          </div>

          <button className="md:hidden text-[#F2F2F2]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col container py-4 border-t border-[#002945]">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-sm font-medium hover:text-[#00406C]">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-[#00406C]">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-[#00406C]">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-[#00406C]">
                Blog
              </Link>
              <div className="flex flex-col gap-4 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                >
                  Log in
                </Button>
                <Button size="sm" className="w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <BackgroundBeamsWithCollision>
        <section className="py-20 md:py-auto overflow-x-hidden min-h-screen rounded-b-2xl">
          <div className="container  min-w-screen rounded-b-2xl">
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
                >
                  <Badge className="transition duration-200 cursor-default mb-2 bg-[#003356] text-[#F2F2F2] hover:bg-[#003A61]">AI-Powered Code Review</Badge>
                </motion.div>
                <div>
                  <ContainerTextFlip words={["Write Better", "Write Smarter","Develop Faster"]} />
                  <TextGenerateEffect duration={0.6} className="text-4xl md:text-5xl font-bold tracking-tighter -mt-3" words="Code with AI-Driven Insights"/>
                </div>
                  <motion.p 
                    className="text-lg text-[#B3B3B3] md:text-xl"
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
                  <Button size="lg" className=" cursor-pointer w-full sm:w-auto bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">
                    Start for free
                  </Button>
                  <Button size="lg" className=" cursor-pointer w-full sm:w-auto border-[#002945] bg-[#001A2C] hover:bg-[#002945] text-[#F2F2F2]">
                    Learn more
                    </Button>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-[#B3B3B3]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4,delay:0.4, ease: "easeInOut" }}
                >
                  <CheckCircle className="h-4 w-4 text-[#00406C]" />
                  <span>No credit card required</span>
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
        <section id="features" className="py-20 bg-[#001A2C]">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Developers
              </h2>
              <p className="mt-4 text-lg text-[#B3B3B3] md:w-3/4 mx-auto">
                CodePilot helps you write code, find bugs faster, and ship with confidence.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              ref={featuresSection.ref}
              variants={containerVariants}
              initial="hidden"
              animate={featuresSection.controls}
            >
              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <Code className="h-10 w-10 text-[#00406C] mb-2" />
                    <CardTitle className="text-[#F2F2F2]">Syntax Analysis</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Identify syntax errors, code smells, and style issues before they cause problems.
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <Zap className="h-10 w-10 text-[#00406C] mb-2" />
                    <CardTitle className="text-[#F2F2F2]">Error Detection</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Catch runtime errors and logical bugs with AI-powered static analysis.
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-[#00406C] mb-2" />
                    <CardTitle className="text-[#F2F2F2]">Security Scanning</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Identify security vulnerabilities and get recommendations to fix them.
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <BarChart className="h-10 w-10 text-[#00406C] mb-2" />
                    <CardTitle className="text-[#F2F2F2]">Performance Insights</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Get suggestions to optimize your code for better performance and efficiency.
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[#00111C]">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#F2F2F2]">
                Loved by Developers
              </h2>
              <p className="mt-4 text-lg text-[#B3B3B3] md:w-3/4 mx-auto">
                See what our users have to say about how CodePilot has improved their development workflow.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              ref={testimonialsSection.ref}
              variants={containerVariants}
              initial="hidden"
              animate={testimonialsSection.controls}
            >
              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src="/profile.jpg"
                        width={60}
                        height={60}
                        alt="User avatar"
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-[#F2F2F2]">Sarah Johnson</h3>
                        <p className="text-sm text-[#B3B3B3]">Senior Developer at TechCorp</p>
                      </div>
                    </div>
                    <p className="text-[#B3B3B3]">
                      "CodePilot has cut our code review time in half. The AI catches issues I would have missed, and
                      the performance suggestions have made our app noticeably faster."
                    </p>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src="/profile.jpg"
                        width={60}
                        height={60}
                        alt="User avatar"
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-[#F2F2F2]">Michael Chen</h3>
                        <p className="text-sm text-[#B3B3B3]">Lead Engineer at StartupX</p>
                      </div>
                    </div>
                    <p className="text-[#B3B3B3]">
                      "As a startup, we don't have the resources for extensive QA. CodePilot acts like an extra team
                      member, catching bugs before they reach production."
                    </p>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945]">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src="/profile.jpg"
                        width={60}
                        height={60}
                        alt="User avatar"
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-[#F2F2F2]">Alex Rodriguez</h3>
                        <p className="text-sm text-[#B3B3B3]">Freelance Developer</p>
                      </div>
                    </div>
                    <p className="text-[#B3B3B3]">
                      "The security scanning feature has saved me multiple times. It found vulnerabilities I completely
                      overlooked and provided clear guidance on how to fix them."
                    </p>
                  </CardContent>
                </MotionCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-[#001A2C]">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#F2F2F2]">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-[#B3B3B3] md:w-3/4 mx-auto">
                Choose the plan that's right for you or your team. All plans include a 14-day free trial.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              ref={pricingSection.ref}
              variants={containerVariants}
              initial="hidden"
              animate={pricingSection.controls}
            >
              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945] h-full">
                  <CardHeader>
                    <CardTitle className="text-[#F2F2F2]">Starter</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#F2F2F2]">$0</span>
                      <span className="text-[#B3B3B3] ml-1">/month</span>
                    </div>
                    <CardDescription className="mt-2 text-[#B3B3B3]">
                      Perfect for individual developers and small projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Up to 5 projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Basic syntax analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Error detection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Community support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      variant="outline"
                      className="cursor-pointer w-full border-[#002945] hover:bg-[#002945] hover:text-[#F2F2F2]"
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#00406C] h-full">
                  <CardHeader>
                    <CardTitle className="text-[#F2F2F2]">Pro</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#F2F2F2]">$20</span>
                      <span className="text-[#B3B3B3] ml-1">/month</span>
                    </div>
                    <CardDescription className="mt-2 text-[#B3B3B3]">
                      For professional developers who need more power.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Unlimited projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Advanced syntax analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Error detection & fixes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Security scanning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Performance insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Email support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="cursor-pointer w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">Get started</Button>
                  </CardFooter>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard className="bg-[#001523] border-[#002945] h-full">
                  <CardHeader>
                    <CardTitle className="text-[#F2F2F2]">Team</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#F2F2F2]">$50</span>
                      <span className="text-[#B3B3B3] ml-1">/month</span>
                    </div>
                    <CardDescription className="mt-2 text-[#B3B3B3]">
                      For teams that need collaboration and advanced features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Everything in Pro</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Up to 10 team members</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Team collaboration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Custom rule sets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">API access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#00406C]" />
                        <span className="text-[#F2F2F2]">Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      variant="outline"
                      className="cursor-pointer w-full border-[#002945] hover:bg-[#002945] hover:text-[#F2F2F2]"
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </MotionCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className=" rounded-lg bg-[#001A2C] p-8 md:p-12 lg:p-16 relative overflow-hidden border border-[#002945]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#F2F2F2]">
                    Ready to write better code?
                  </h2>
                  <p className="text-lg text-[#B3B3B3]">
                    Join thousands of developers who are shipping better code faster with CodePilot.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="cursor-pointer w-full sm:w-auto bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">
                      Start your free trial
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="cursor-pointer w-full sm:w-auto border-[#002945] bg-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                    >
                      Schedule a demo
                    </Button>
                  </div>
                </div>
                <motion.div
                  className="relative hidden lg:block"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/profile.jpg"
                    width={600}
                    height={400}
                    alt="CodePilot in action"
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#00406C]/10 blur-3xl"></div>
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#00406C]/10 blur-3xl"></div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#002945] py-12 bg-[#00111C]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-[#00406C]" />
                <span className="text-xl font-bold text-[#F2F2F2]">CodePilot</span>
              </div>
              <p className="text-sm text-[#B3B3B3] mb-4">
                AI-powered code review and debugging to help developers ship better code faster.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F2F2F2]">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F2F2F2]">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F2F2F2]">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#002945] text-center text-sm text-[#B3B3B3]">
            <p>&copy; {new Date().getFullYear()} CodePilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

