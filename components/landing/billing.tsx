"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";

import { loadStripe } from "@stripe/stripe-js";
import LoadingSpinner from "../spinner/LoadingSpinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);
type PlanId = "starter" | "pro" | "team";

interface LoadingState {
  starter: boolean;
  pro: boolean;
  team: boolean;
}
function useInView(threshold = 0.1) {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold]);

  return { ref, controls };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const MotionCard = motion(Card);
const INITIAL_LOADING_STATE = {
  starter: false,
  pro: false,
  team: false
};
export default function BillnigSection() {
  const pricingSection = useInView();
  const [isLoading, setIsLoading] = useState<LoadingState>(
    INITIAL_LOADING_STATE
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("/api/auth/token");
      const data = await response.json();
      setToken(data.token);
    }

    fetchToken();
  }, []);

  const handleCheckout = async (planId: PlanId) => {
    if (!token) {
      console.log("user must be logged in to subscribe!");
      return;
    }
    setIsLoading((prev) => ({ ...prev, [planId]: true }));
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planId
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const session = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      }
      setIsLoading(INITIAL_LOADING_STATE);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [planId]: false }));
    }
  };

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-[#001A2C] via-[#001A2C]/95 to-[#00111C]"
    >
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
            Choose the plan that's right for you or your team. All plans include
            a 14-day free trial.
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
                    <span className="text-[#F2F2F2]">
                      Basic syntax analysis
                    </span>
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
                  onClick={() => handleCheckout("starter")}
                  disabled={isLoading.starter}
                  className="cursor-pointer w-full border-[#002945] hover:bg-[#002945] hover:text-[#F2F2F2]"
                >
                  {isLoading.starter ? <LoadingSpinner /> : "Get started"}
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
                    <span className="text-[#F2F2F2]">
                      Advanced syntax analysis
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00406C]" />
                    <span className="text-[#F2F2F2]">
                      Error detection & fixes
                    </span>
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
                <Button
                  onClick={() => handleCheckout("pro")}
                  disabled={isLoading.pro}
                  className="cursor-pointer w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]"
                >
                  {isLoading.starter ? <LoadingSpinner /> : "Get started"}
                </Button>
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
                    <span className="text-[#F2F2F2]">
                      Up to 10 team members
                    </span>
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
                  onClick={() => handleCheckout("team")}
                  disabled={isLoading.team}
                >
                  {isLoading.starter ? <LoadingSpinner /> : "Get started"}
                </Button>
              </CardFooter>
            </MotionCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
