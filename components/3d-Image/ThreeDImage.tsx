"use client"

import Image from "next/image"
import { CardBody, CardContainer, useMouseEnter } from "@/components/ui/3d-card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ThreeDImage() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  
  return (
    <div className="relative w-full h-full">
      <motion.div 
        className="fixed inset-0 bg-background/95 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOverlayVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="flex flex-row items-center relative z-20 ">
        <CardContainer className="inter-var relative">
          <CardBody className="transition duration-300 ml-15 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.2] dark:bg-black w-auto h-auto rounded-3xl border-2 dark:border-blue-950 dark:hover:border-emerald-900">
            <HoverDetector setOverlayVisible={setIsOverlayVisible} />
              <Image
                src="/CodePilot.png"
                width={1000}
                height={1000}
                alt="CodePilot dashboard preview"
                className="rounded-3xl h-auto w-full  object-cover z-30 relative"
                priority
              />
          </CardBody>
        </CardContainer>
        
        {isOverlayVisible && (
          <DescriptionSidePanels />
        )}
      </div>
    </div>
  )
}

function HoverDetector({ setOverlayVisible }: { setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isMouseEntered] = useMouseEnter();
  
  useEffect(() => {
    setOverlayVisible(isMouseEntered);
  }, [isMouseEntered, setOverlayVisible]);
  
  return null; // This component doesn't render anything
}

function DescriptionSidePanels() {
  return (
<div className="absolute right-full mr-8 h-full w-[90%] flex flex-col justify-center space-y-6 z-30">
      <motion.h1 
        initial={{ y: "-50px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}
        className="text-4xl mb-2 font-bold text-primary"
      >
        About Us
        </motion.h1>
      <motion.div
        className="mb-2 p-6 bg-gradient-to-r from-card to-muted rounded-xl text-foreground w-80"
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-primary">NextGenCoders</h3>
        <p className="text-sm text-muted-foreground">
          A team of passionate developers, dedicated to revolutionizing the way
          developers write and review code through innovative AI solutions.
        </p>
      </motion.div>

      <motion.div
        className="mb-2 p-6 bg-gradient-to-r from-card to-muted rounded-xl text-foreground w-80"
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-primary">Our Mission</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;re on a mission to empower developers of all skill levels to write better, more secure code through
          accessible AI tools that integrate seamlessly into existing workflows.
        </p>
      </motion.div>

      <motion.div
        className="mb-2 p-6 bg-gradient-to-r from-card to-muted rounded-xl text-foreground w-80"
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-primary">Our Expertise</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Full-stack development</li>
          <li>Developer experience design</li>
        </ul>
      </motion.div>
    </div>
  )
}

