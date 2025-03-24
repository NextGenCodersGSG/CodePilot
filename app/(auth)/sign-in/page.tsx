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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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
              <CardTitle className="text-2xl font-bold text-[#F2F2F2]">Login</CardTitle>
              <CardDescription className="text-[#B3B3B3]">Enter your credentials to access your account</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent >
            <form action="" className="space-y-4">
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.1, ease: "easeOut"}}
                className="space-y-2"
              >
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
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#F2F2F2]">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-[#00406C] hover:text-[#003A61] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-[#B3B3B3] hover:text-[#F2F2F2] hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial ={{opacity:0, y:20}}
                animate= {{opacity: 1, y:0}}
                transition = {{duration: 0.4,delay:0.3, ease: "easeOut"}}
                className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="cursor-pointer border-[#002945] data-[state=checked]:bg-[#00406C] data-[state=checked]:text-[#F2F2F2]"
                />
                <Label htmlFor="remember" className="text-sm text-[#B3B3B3] cursor-pointer">
                  Remember me for 30 days
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
              <Button className="cursor-pointer w-full bg-[#00406C] text-[#F2F2F2] hover:bg-[#003A61]">Sign in</Button>
            </motion.div>
            <motion.div 
              initial ={{opacity:0, y:20}}
              animate= {{opacity: 1, y:0}}
              transition = {{duration: 0.4,delay:0.4, ease: "easeOut"}}
              className="text-center text-sm text-[#B3B3B3]"
            >
              Don&apos;t have an account?{" "}
              <Link href="sign-up" className="text-[#00406C] hover:text-[#003A61] transition-colors font-medium">
                Sign up
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

