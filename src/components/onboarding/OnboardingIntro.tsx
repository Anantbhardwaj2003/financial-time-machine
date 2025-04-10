
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OnboardingIntroProps {
  onNext: () => void;
}

export function OnboardingIntro({ onNext }: OnboardingIntroProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to Your Financial Time Machine!</h1>
        <p className="text-muted-foreground">
          This tool will help you visualize your financial journey and plan for a better future.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">What You'll Get:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Personalized financial dashboard</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>AI-powered spending analysis</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Goal tracking and projections</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Financial decision simulator</span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">What We'll Need:</h3>
          <p className="text-sm text-muted-foreground">
            We'll ask you a few questions about your income, expenses, assets, and financial goals.
            All your data is stored securely and never shared with third parties.
          </p>
        </div>
      </div>

      <Button onClick={onNext} className="w-full">
        Let's Get Started <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
