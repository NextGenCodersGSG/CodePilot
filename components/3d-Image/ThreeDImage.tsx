"use client"

import Image from "next/image"
import { CardBody, CardContainer } from "@/components/ui/3d-card"

export default function ThreeDImage() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="transition duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.2] dark:bg-black w-auto h-auto rounded-3xl  border-2 dark:border-blue-950 dark:hover:border-emerald-900 ">
          <Image
            src="/Ai.jpg"
            width={1000}
            height={1000}
            alt="CodePilot dashboard preview"
            className="rounded-3xl h-auto w-full object-cover "
            priority
          />
      </CardBody>
    </CardContainer>
  )
}

