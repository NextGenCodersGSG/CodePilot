"use client"

import Image from "next/image"
import { CardBody, CardContainer } from "@/components/ui/3d-card"

export default function ThreeDImage() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="transition duration-200 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.2] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl  border ">
          <Image
            src="/Ai.jpg"
            width={1000}
            height={1000}
            alt="CodePilot dashboard preview"
            className="rounded-lg h-auto w-full object-cover "
            priority
          />
      </CardBody>
    </CardContainer>
  )
}

