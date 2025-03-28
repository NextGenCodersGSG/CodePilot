"use client";

import { Code } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./components/signup-form";

export default function SignupPage() {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Code className="h-8 w-8 text-[#00406C]" />
          <span className="text-2xl font-bold text-[#F2F2F2]">CodePilot</span>
        </div>

        <Card className="border-[#002945] bg-[#001523] shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CardTitle className="text-2xl font-bold text-[#F2F2F2]">
                Create an account
              </CardTitle>
              <CardDescription className="text-[#B3B3B3]">
                Enter your information to create your account
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <Button className="cursor-pointer w-full bg-[#00406C] text-[#F2F2F2] hover:bg-[#003A61]">
                Create account
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="text-center text-sm text-[#B3B3B3]"
            >
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[#00406C] hover:text-[#003A61] transition-colors font-medium"
              >
                Sign in
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}