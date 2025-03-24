"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Code } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4">
      <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Code className="h-8 w-8 text-[#00406C]" />
          <span className="text-2xl font-bold text-[#F2F2F2]">CodePilot</span>
        </div>

        <Card className="border-[#002945] bg-[#001523] shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div
              initial ={{opacity:0, y:20}}
              animate= {{opacity: 1, y:0}}
              transition = {{duration: 0.4, ease: "easeOut"}}
            >
              <CardTitle className="text-2xl font-bold text-[#F2F2F2]">Create an account</CardTitle>
              <CardDescription className="text-[#B3B3B3]">Enter your information to create your account</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form action="" className="space-y-4">
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.1, ease: "easeOut"}}
                className="space-y-2">
                <Label htmlFor="name" className="text-[#F2F2F2]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                />
              </motion.div>
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.1, ease: "easeOut"}}
                className="space-y-2">
                <Label htmlFor="email" className="text-[#F2F2F2]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                />
              </motion.div>
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.2, ease: "easeOut"}}
                className="space-y-2">
                <Label htmlFor="password" className="text-[#F2F2F2]">
                  Password
                </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                  />
              </motion.div>
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.3, ease: "easeOut"}}
                className="space-y-2">
                <Label htmlFor="confirm-password" className="text-[#F2F2F2]">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-[#B3B3B3] hover:text-[#F2F2F2] hover:bg-transparent"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword)
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.5,delay:0.4, ease: "easeOut"}}
                className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  className="cursor-pointer border-[#002945] data-[state=checked]:bg-[#00406C] data-[state=checked]:text-[#F2F2F2] mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-[#B3B3B3] cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#00406C] hover:text-[#003A61] transition-colors font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#00406C] hover:text-[#003A61] transition-colors font-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <motion.div
              initial ={{opacity:0, y:20}}
              animate= {{opacity: 1, y:0}}
              transition = {{duration: 0.4,delay:0.3, ease: "easeOut"}}
              className="w-full"
            >
              <Button className="cursor-pointer w-full bg-[#00406C] text-[#F2F2F2] hover:bg-[#003A61]">Create account</Button>
              </motion.div>
            <motion.div
              initial ={{opacity:0, y:20}}
              animate= {{opacity: 1, y:0}}
              transition = {{duration: 0.4,delay:0.4, ease: "easeOut"}}
              className="text-center text-sm text-[#B3B3B3]">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#00406C] hover:text-[#003A61] transition-colors font-medium">
                Sign in
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

