"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FileCode,
  Zap,
  Shield,
  BarChart,
  Lightbulb,
  CheckCircle,
  SquareChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AnimatedDiagram } from "@/components/documentation/animated-diagram";
import { useRef } from "react";

export function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const workflowSteps = [
    {
      title: "Submit Your Code",
      description: "Upload or paste your code snippet for analysis",
      icon: <FileCode className="h-6 w-6" />
    },
    {
      title: "AI Analysis",
      description:
        "Our AI engine analyzes your code for issues and improvements",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Review Results",
      description: "Get detailed feedback on bugs, performance, and security",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Apply Suggestions",
      description: "Implement the recommended fixes and improvements",
      icon: <Lightbulb className="h-6 w-6" />
    }
  ];

  const featureAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] // cubic-bezier equivalent of "easeOut"
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div ref={containerRef} className="docs-content relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -z-10" />

      {/* Workflow section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="pb-10"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 inline-block border-b-2 border-primary pb-2">
          How It Works
        </h2>
        <AnimatedDiagram steps={workflowSteps} />
      </motion.section>

      {/* Features section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-10"
      >
        <h2 className="text-3xl font-bold mb-8 inline-block border-b-2 border-primary pb-2">
          Key Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <motion.div custom={0} variants={featureAnimation}>
            <Card className="border-2 overflow-hidden group hover:border-primary/50 transition-all hover:shadow-lg h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Performance Analysis</CardTitle>
                <CardDescription className="text-base">
                  Identify bottlenecks and optimize your code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed insights on performance issues and
                  recommendations for improving execution speed and memory
                  usage.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Runtime optimization</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Memory usage analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={1} variants={featureAnimation}>
            <Card className="border-2 overflow-hidden group hover:border-primary/50 transition-all hover:shadow-lg h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Security Scanning</CardTitle>
                <CardDescription className="text-base">
                  Detect vulnerabilities and security risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identify potential security vulnerabilities like injection
                  flaws, authentication issues, and data exposure risks.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>OWASP compliance checks</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Dependency vulnerability scanning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={2} variants={featureAnimation}>
            <Card className="border-2 overflow-hidden group hover:border-primary/50 transition-all hover:shadow-lg h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <CardHeader className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Bug Detection</CardTitle>
                <CardDescription className="text-base">
                  Find and fix bugs before they cause problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically detect logical errors, edge cases, and potential
                  runtime exceptions in your code.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Static code analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Edge case detection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Languages section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="py-10"
      >
        <h2 className="text-3xl font-bold mb-8 inline-block border-b-2 border-primary pb-2">
          Supported Languages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            "Python",
            "TypeScript",
            "JavaScript",
            "Java",
            "C#",
            "React JSX",
            "Rust",
            "And many more..."
          ].map((lang, index) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <SquareChevronRight className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">{lang}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="py-16 mt-8 bg-gradient-to-br from-primary/10 to-background rounded-2xl"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Just paste your code in the chat box, and leave the rest to us!
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
          >
            <Link href="/code-analysis">
              Start Analyzing
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
