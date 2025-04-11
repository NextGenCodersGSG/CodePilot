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
import { AnimatePresence, motion } from "framer-motion"

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
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

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
    
    // Initialize open state based on active items
    const initialOpenState: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.isActive) {
        initialOpenState[item.title] = true;
      }
    });
    setOpenItems(initialOpenState);
  }, [items]);

  const shouldShowItem = (url: string) => {
    if (isLoading) return false;
    
    // Admin-only
    if (url === "/dashboard") {
      return userRole === "admin";
    }
    
    // Admins and Developers can see this
    if (url === "/code-analysis/developer-dashboard") {
      return userRole === "admin" || userRole === "developer";
    }
    
    // Only Visible for the user due to meetings booking
    if (url === "/code-analysis/book-meeting" || url === "/code-analysis/scheduled-meetings") {
      return userRole === "user";
    }

    // All other links that haven't been checked are globally visible
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

  const handleToggleCollapsible = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={openItems[item.title]}
            onOpenChange={() => handleToggleCollapsible(item.title)}
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
                  <AnimatePresence mode="wait">
                    {openItems[item.title] && (
                      <motion.div
                        key={`content-${item.title}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <SidebarMenuSub>
                          {item.items
                            .filter((subItem) => shouldShowItem(subItem.url))
                            .map((subItem, index) => (
                              <motion.div
                                key={subItem.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{
                                  delay: openItems[item.title] ? index * 0.1 : 0,
                                  duration: 0.2,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 24,
                                }}
                              >
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton asChild>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </motion.div>
                            ))}
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}