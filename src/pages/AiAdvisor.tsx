
import { AppLayout } from "@/components/layout/AppLayout";
import { AiAdvisor } from "@/components/ai-advisor/AiAdvisor";

const AiAdvisorPage = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Financial Advisor</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized financial advice and insights from your AI assistant.
        </p>
      </div>
      
      <div className="h-[calc(100vh-12rem)]">
        <AiAdvisor className="h-full" />
      </div>
    </AppLayout>
  );
};

export default AiAdvisorPage;
