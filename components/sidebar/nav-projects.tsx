"use client"

import { useState, useEffect } from "react"
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

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
import Link from "next/link"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
  }[]
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
        <SidebarMenu>
          {/* Loading placeholder */}
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu >
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className="hover:bg-muted rounded-lg p-2 ">
            <Link href={item.url}>
              <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</span>
            </Link>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70 cursor-pointer">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
