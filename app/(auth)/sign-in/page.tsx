"use client";

import Link from "next/link";
import { Code } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./components/signin-form";
import Logo from "@/components/logo/Logo";

export default function LoginPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Logo className="-mt-5"/>
        <Card className="border-accent bg-card shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CardTitle className="text-2xl font-bold text-foreground">
                Login
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your account
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="text-center text-sm text-muted-foreground"
            >
              Don&apos;t have an account?{" "}
              <Link
                href="sign-up"
                className="text-primary hover:text-secondary transition-colors font-medium"
              >
                Sign up
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
