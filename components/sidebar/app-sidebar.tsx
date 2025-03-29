"use client"

import * as React from "react"


import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/providers/SidebarContext"
import { GalleryVerticalEnd, LayoutDashboard, BugPlay, BrainCircuit, BookOpen } from "lucide-react"

export const data = {
  user: {
    name: "John Doe",
    email: "John@example.com",
    avatar: "/profile.jpg",
  },
  teams: [
    {
      name: "NextGen Coders",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "User Statistics",
          url: "/code-analysis/dashboard",
        },
      ]
    },
    {
      title: "Live Debugging",
      url: "#",
      icon: BugPlay,
      items: [
        {
          title: "Start Session",
          url: "#",
        },
        {
          title: "History Log",
          url: "#",
        },
      ],
    },
    {
      title: "AI Models",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "API Reference",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {sidebarProjects} = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={sidebarProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
