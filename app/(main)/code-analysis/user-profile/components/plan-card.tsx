"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanCardProps {
  plan: {
    id: string
    name: string
    description: string
    price: string
    features: string[]
    color: string
    borderColor: string
    recommended: boolean
  }
  currentPlan: string
}

export function PlanCard({ plan, currentPlan }: PlanCardProps) {
  const isCurrentPlan = currentPlan === plan.id

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
      <Card className={`${plan.color} ${plan.borderColor} relative overflow-hidden h-full`}>
        {plan.recommended && (
          <div className="absolute top-8 right-3">
            <div className="bg-[#00406C] text-[#F2F2F2] text-xs font-bold px-5 py-1 transform rotate-45 translate-x-[30%] translate-y-[-30%] shadow-blue-500/10 shadow-lg">
              RECOMMENDED
            </div>
          </div>
        )}

        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription className="text-[#B3B3B3]">{plan.description}</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-[#B3B3B3] ml-1">/month</span>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-[#00406C] mt-0.5 flex-shrink-0" />
                <span className="text-[#F2F2F2]">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className={`cursor-pointer ${plan.recommended
              ? "w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]"
              : "w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"}`}
            variant={plan.recommended ? "default" : "outline"}
          >
            {isCurrentPlan ? "Current Plan" : "Upgrade"}
            {!isCurrentPlan && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
