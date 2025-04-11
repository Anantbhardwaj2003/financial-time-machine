
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetForm, AssetFormData } from "./assets/AssetForm";
import { DebtForm, DebtFormData } from "./assets/DebtForm";
import { Asset, Debt } from "./assets/types";

interface OnboardingAssetsProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingAssets({ userData, updateUserData, onNext, onBack }: OnboardingAssetsProps) {
  const [activeTab, setActiveTab] = useState("assets");
  
  // Get existing asset/debt or set defaults
  const getAssetValue = (type: string) => {
    const asset = userData.assets?.find((a: Asset) => a.type === type);
    return asset ? asset.value.toString() : "";
  };

  const getDebtValue = (type: string) => {
    const debt = userData.debts?.find((d: Debt) => d.type === type);
    return debt ? debt.value.toString() : "";
  };

  const assetInitialValues = {
    home: getAssetValue("home"),
    car: getAssetValue("car"),
    savings: getAssetValue("savings"),
    investments: getAssetValue("investments"),
  };

  const debtInitialValues = {
    mortgage: getDebtValue("mortgage"),
    carLoan: getDebtValue("carLoan"),
    studentLoans: getDebtValue("studentLoans"),
    creditCards: getDebtValue("creditCards"),
  };

  const submitAssets = (data: AssetFormData) => {
    const assets = [
      { type: "home", value: Number(data.home) || 0, icon: "Home" },
      { type: "car", value: Number(data.car) || 0, icon: "Car" },
      { type: "savings", value: Number(data.savings) || 0, icon: "Wallet" },
      { type: "investments", value: Number(data.investments) || 0, icon: "TrendingUp" },
    ].filter(asset => asset.value > 0);
    
    updateUserData({ assets });
    setActiveTab("debts");
  };

  const submitDebts = (data: DebtFormData) => {
    const debts = [
      { type: "mortgage", value: Number(data.mortgage) || 0, icon: "Home" },
      { type: "carLoan", value: Number(data.carLoan) || 0, icon: "Car" },
      { type: "studentLoans", value: Number(data.studentLoans) || 0, icon: "GraduationCap" },
      { type: "creditCards", value: Number(data.creditCards) || 0, icon: "CreditCard" },
    ].filter(debt => debt.value > 0);
    
    updateUserData({ debts });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Assets & Debts</h1>
        <p className="text-muted-foreground">
          Tell us about your assets and debts
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="debts">Debts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="mt-4">
          <AssetForm 
            initialValues={assetInitialValues} 
            onSubmit={submitAssets} 
            onBack={onBack} 
          />
        </TabsContent>
        
        <TabsContent value="debts" className="mt-4">
          <DebtForm 
            initialValues={debtInitialValues} 
            onSubmit={submitDebts} 
            onBack={() => setActiveTab("assets")} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
