"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AnimatedDiagramProps {
  steps: Step[];
  title?: string;
}

export function AnimatedDiagram({ steps, title }: AnimatedDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  // Get scroll progress within the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create a smoother spring-based animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to step visibility
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      // Calculate which step should be active based on scroll position
      // We divide the scroll range into equal parts for each step
      const stepIndex = Math.min(
        Math.floor(value * (steps.length + 0.5)),
        steps.length - 1
      );

      if (stepIndex >= 0 && stepIndex !== activeStep) {
        setActiveStep(stepIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, steps.length, activeStep]);

  // Calculate line progress
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="my-16 py-10 relative">
      {title && (
        <motion.h3
          className="text-2xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
      )}

      <div className="relative max-w-4xl mx-auto">
        {/* Animated connecting line */}
        <div className="absolute left-[22px] top-4 h-[calc(100%-32px)] w-[3px] bg-muted md:left-1/2 md:-ml-[1.5px]">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-primary to-primary/60"
            style={{ scaleY: lineHeight }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-20 md:space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative grid md:grid-cols-2 md:items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-20% 0px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Step icon circle */}
              <motion.div
                className={`absolute z-10 left-0 md:left-1/2 md:-ml-[28px] flex h-14 w-14 items-center justify-center rounded-full border-4 border-background shadow-lg bg-gradient-to-br ${
                  index <= activeStep
                    ? "from-primary to-primary/80"
                    : "from-muted to-muted-foreground/20"
                } text-primary-foreground transition-all duration-500`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-30% 0px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {step.icon}
              </motion.div>

              {/* Content */}
              <motion.div
                className={`ml-20 md:ml-0 md:pl-8 md:pr-10 ${
                  index % 2 === 0
                    ? "md:col-start-2 md:text-left"
                    : "md:col-start-1 md:text-right md:row-start-1 md:pr-8 md:pl-10"
                }`}
                initial={{
                  x: index % 2 === 0 ? 50 : -50,
                  opacity: 0
                }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-20% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <h4
                  className={`text-xl font-semibold ${
                    index <= activeStep ? "text-primary" : "text-foreground"
                  } transition-colors duration-500`}
                >
                  {step.title}
                </h4>
                <p
                  className={`mt-2 ${
                    index <= activeStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  } transition-colors duration-500`}
                >
                  {step.description}
                </p>
              </motion.div>

              {/* Step number indicator */}
              <motion.div
                className={`hidden md:block absolute ${
                  index % 2 === 0 ? "right-1/2 mr-24" : "left-1/2 ml-24"
                } top-0 text-6xl font-black opacity-5`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: false, margin: "-20% 0px" }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
