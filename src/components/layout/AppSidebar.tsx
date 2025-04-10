
import { useState, useEffect } from "react";
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
  ChevronLeft,
  Menu
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

const toolsNavItems = [
  {
    title: "AI Advisor",
    path: "/ai-advisor",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Main navigation renderer function for reuse in both desktop and mobile
  const renderNavLinks = (items, groupTitle) => (
    <SidebarGroup>
      <SidebarGroupLabel>
        {!isCollapsed && groupTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
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
  );

  // Mobile navigation using Sheet component
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="ml-2 font-semibold">Financial Time Machine</span>
        </div>
        <div className="py-4">
          {renderNavLinks(mainNavItems, "Navigation")}
          {renderNavLinks(toolsNavItems, "Tools")}
        </div>
        <div className="border-t p-4">
          <div className="text-xs text-muted-foreground">
            Financial Time Machine v1.0
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <Sidebar
      className={cn(
        "h-screen border-r hidden md:block",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
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
        {renderNavLinks(mainNavItems, "Navigation")}
        {renderNavLinks(toolsNavItems, "Tools")}
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

  return (
    <>
      {isMobile ? (
        <div className="sticky top-0 z-40 bg-background border-b">
          <div className="flex h-16 items-center px-4">
            <MobileNav />
            <div className="ml-3 flex items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="ml-2 font-semibold">Financial Time Machine</span>
            </div>
          </div>
        </div>
      ) : (
        <DesktopSidebar />
      )}
    </>
  );
}
