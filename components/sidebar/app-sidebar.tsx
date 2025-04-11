"use client";

import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { useSidebar } from "@/providers/SidebarContext";
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  BrainCircuit,
  BookOpen,
  Video
} from "lucide-react";

export const data = {
  user: {
    name: "John Doe",
    email: "John@example.com",
    avatar: "/profile.jpg"
  },
  teams: [
    {
      name: "NextGen Coders",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    }
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
          url: "/dashboard"
        }
      ]
    },
    {
      title: "Developer Meetings",
      url: "#",
      icon: Video,
      isActive: true,
      items: [
        {
          title: "Meetings List",
          url: "/code-analysis/developer-dashboard"
        }
      ]
    },
    {
      title: "Meetings",
      url: "#",
      icon: Video,
      items: [
        {
          title: "Start Session",
          url: "/code-analysis/book-meeting"
        },
        {
          title: "Scheduled Meetings",
          url: "/code-analysis/scheduled-meetings"
        }
      ]
    },
    {
      title: "AI Models",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "Our Model",
          url: "https://platform.openai.com/docs/models/gpt-4-turbo"
        },
        {
          title: "OpenAi Docs",
          url: "https://platform.openai.com/docs/quickstart?api-mode=responses"
        }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Get Started",
          url: "/code-analysis/documentation"
        },
        {
          title: "Integration",
          url: "/code-analysis/documentation/integration"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarProjects, loading, userData } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={sidebarProjects} loading={loading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
