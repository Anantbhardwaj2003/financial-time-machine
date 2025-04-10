
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingSignup } from "@/components/onboarding/OnboardingSignup";
import { OnboardingIntro } from "@/components/onboarding/OnboardingIntro";
import { OnboardingIncome } from "@/components/onboarding/OnboardingIncome";
import { OnboardingExpenses } from "@/components/onboarding/OnboardingExpenses";
import { OnboardingAssets } from "@/components/onboarding/OnboardingAssets";
import { OnboardingGoals } from "@/components/onboarding/OnboardingGoals";
import { OnboardingUpload } from "@/components/onboarding/OnboardingUpload";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    income: 0,
    jobTitle: "",
    location: "",
    expenses: [],
    assets: [],
    debts: [],
    goals: [],
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 7;

  const updateUserData = (newData: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const completeOnboarding = () => {
    // In a real app, we would save the user data to a database or local storage
    console.log("User data collected:", userData);
    
    // Show success toast
    toast({
      title: "Onboarding Complete!",
      description: "Welcome to your Financial Time Machine!",
    });
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingSignup userData={userData} updateUserData={updateUserData} onNext={nextStep} />;
      case 2:
        return <OnboardingIntro onNext={nextStep} />;
      case 3:
        return <OnboardingIncome userData={userData} updateUserData={updateUserData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <OnboardingExpenses userData={userData} updateUserData={updateUserData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <OnboardingAssets userData={userData} updateUserData={updateUserData} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <OnboardingGoals userData={userData} updateUserData={updateUserData} onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <OnboardingUpload userData={userData} updateUserData={updateUserData} onNext={completeOnboarding} onBack={prevStep} />;
      default:
        return <OnboardingSignup userData={userData} updateUserData={updateUserData} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="pt-6">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
