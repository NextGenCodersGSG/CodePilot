"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getUserData } from "@/app/(main)/code-analysis/utils/getUserId"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserData();
        setUserRole(user.userRole);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const shouldShowItem = (url: string) => {
    if (isLoading) return false;
    
    // Admin-only
    if (url === "/dashboard") {
      return userRole === "admin";
    }
    
    // Admins and Developers can see this (Admin's wont be able to see the whole page but it makes sense to give him this)
    if (url === "/code-analysis/developer-dashboard") {
      return userRole === "admin" || userRole === "developer";
    }
    
    // Only Visible for the user due to meetings booking.
    if (url === "/code-analysis/book-meeting" || url === "/code-analysis/scheduled-meetings") {
      return userRole === "user";
    }

    // All other links that hasn't been checked for are globally visible.
    return true;
  };

  const filteredItems = isLoading ? [] : items.filter(item => {
    if (!shouldShowItem(item.url)) {
      return false;
    }
    
    if (item.items && item.items.length > 0) {
      const visibleSubItems = item.items.filter(subItem => shouldShowItem(subItem.url));
      return visibleSubItems.length > 0;
    }
    
    return true;
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible cursor-pointer"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items
                      .filter(subItem => shouldShowItem(subItem.url))
                      .map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}