
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  LayoutDashboard, 
  PiggyBank, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Clock, 
  ChevronLeft
} from "lucide-react";

const mainNavItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Scenario Simulator",
    path: "/simulator",
    icon: TrendingUp,
  },
  {
    title: "Goal Planner",
    path: "/goals",
    icon: PiggyBank,
  },
  {
    title: "Spending Analysis",
    path: "/spending",
    icon: BarChart3,
  },
  {
    title: "Past Decisions",
    path: "/past-decisions",
    icon: Clock,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar
      className={cn(
        "h-screen border-r",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
      defaultCollapsed={false}
      collapsed={isCollapsed}
    >
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold">Financial Time Machine</span>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto rounded-full p-1 hover:bg-secondary"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2",
                        location.pathname === item.path && "text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && "Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/ai-advisor"
                    className={cn(
                      "flex items-center gap-2",
                      location.pathname === "/ai-advisor" && "text-primary"
                    )}
                  >
                    <MessageSquare className="h-5 w-5" />
                    {!isCollapsed && <span>AI Advisor</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/settings"
                    className={cn(
                      "flex items-center gap-2",
                      location.pathname === "/settings" && "text-primary"
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    {!isCollapsed && <span>Settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            Financial Time Machine v1.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
