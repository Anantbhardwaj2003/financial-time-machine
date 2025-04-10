
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      <AppSidebar />
      <main className={cn(
        "flex-1 overflow-auto",
        isMobile ? "pt-0" : "pt-0"
      )}>
        <div className="container py-6 px-4 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
