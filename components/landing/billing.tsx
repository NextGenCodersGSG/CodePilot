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
import { toast } from "../ui/sonner";
import { getUserData } from "@/app/(main)/code-analysis/utils/getUserId";

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

export default function BillingSection() {
  const pricingSection = useInView();
  const [isLoading, setIsLoading] = useState<LoadingState>(
    INITIAL_LOADING_STATE
  );
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{email:string,
    exp:number,
    iat: number,
    name: string,
    userId: string,
    userRole: string
  }>();
  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("/api/auth/token");
      const data = await response.json();
      setToken(data.token);

      const user = await getUserData();
      console.log(user);
      setUser(user);
    }

    fetchToken();
  }, []);

  const handleCheckout = async (planId: PlanId) => {
    if (!token) {
      console.log("user must be logged in to subscribe!");
      toast.warning("You must be logged in to subscribe!");
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
          planId,
          userId: user?.userId,
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
      className="py-20 bg-gradient-to-b from-muted via-muted/95 to-foreground"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:w-3/4 mx-auto">
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
            <MotionCard className="bg-card border-accent h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2 text-muted-foreground">
                  Perfect for individual developers and small projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Up to 5 projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">
                      Basic syntax analysis
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Error detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Community support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  onClick={() => handleCheckout("starter")}
                  disabled={isLoading.starter}
                  className="cursor-pointer w-full border-accent hover:bg-accent hover:text-foreground"
                >
                  {isLoading.starter ? <LoadingSpinner /> : "Get started"}
                </Button>
              </CardFooter>
            </MotionCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <MotionCard className="bg-card border-primary h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">$20</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2 text-muted-foreground">
                  For professional developers who need more power.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Unlimited projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">
                      Advanced syntax analysis
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">
                      Error detection & fixes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Security scanning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Performance insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  onClick={() => handleCheckout("pro")}
                  disabled={isLoading.pro}
                  className="cursor-pointer w-full bg-primary hover:bg-secondary text-foreground"
                >
                  {isLoading.starter ? <LoadingSpinner /> : "Get started"}
                </Button>
              </CardFooter>
            </MotionCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <MotionCard className="bg-card border-accent h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Team</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">$50</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2 text-muted-foreground">
                  For teams that need collaboration and advanced features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">
                      Up to 10 team members
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Custom rule sets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  className="cursor-pointer w-full border-accent hover:bg-accent hover:text-foreground"
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
