"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Code, CheckCircle, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const plan = searchParams.get('plan');
  
  useEffect(() => {
    const  changeUserPlan = async () => {
      console.log(userId, plan);
      const response = await fetch(`/api/users/update-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, plan: plan}),
      });
      const result = (await response).json();
      
      const message = (await result).message;
      console.log(message);
      
      console.log(userId, plan);
    }
    changeUserPlan()
  },[userId, plan]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse"
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const spinVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      }
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <motion.div
        className="w-full max-w-md text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Icon with Animations */}
        <motion.div className="relative mx-auto mb-8 flex justify-center">
          <motion.div
            className="absolute -inset-10 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl"
            variants={pulseVariants as Variants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="relative"
            variants={floatVariants as Variants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-md"
              variants={spinVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <PartyPopper className="h-10 w-10 text-foreground" />
            </div>
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div variants={itemVariants}>
          <div className="mb-2 flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">
              Payment Successful!
            </h2>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">Yaaay! 🎉</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-accent bg-sidebar shadow-lg">
            <CardContent className="p-6">
              <TextGenerateEffect
                words="Welcome to the CodePilot family! We're thrilled to have you on board. Your journey to better code starts now."
                className="mb-6 text-muted-foreground"
              />

              <div className="mb-6 rounded-lg bg-muted p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-500/20 p-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      Your subscription is now active
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You now have full access to all CodePilot features
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-secondary text-foreground"
                >
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center gap-2"
                  >
                    Go to Login
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-accent hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <Code className="h-5 w-5 text-primary" />
          <span className="text-lg font-medium">CodePilot</span>
        </motion.div>
      </motion.div>

      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  i % 3 === 0 ? "primary" : i % 3 === 1 ? "foreground" : "secondary",
                top: `${Math.random() * -10}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                y: `${100 + Math.random() * 20}vh`,
                x:
                  Math.random() > 0.5
                    ? Math.random() * 100
                    : Math.random() * -100,
                rotate: Math.random() * 360,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 0.5
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
