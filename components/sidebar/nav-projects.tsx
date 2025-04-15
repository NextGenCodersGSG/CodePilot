"use client"

import { useState, useEffect } from "react"
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import LoadingSpinner from "../spinner/LoadingSpinner"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -5, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export function NavProjects({
  projects,
  loading,
}: {
  projects: {
    name: string
    url: string
  }[]
  loading: boolean
}) {
  const { isMobile } = useSidebar()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!mounted) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              className="flex justify-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LoadingSpinner className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1">
              {projects.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  custom={index}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                      >
                        <DropdownMenuItem>
                          <Folder className="text-muted-foreground" />
                          <span>View Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Forward className="text-muted-foreground" />
                          <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash2 className="text-muted-foreground" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </motion.div>
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMenu>
    </SidebarGroup>
  )
}
