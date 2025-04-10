
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, Send, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AiAdvisorProps {
  className?: string;
}

export function AiAdvisor({ className }: AiAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI financial advisor. How can I help you plan your financial future today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "";

      // Simple pattern matching for demo
      if (input.toLowerCase().includes("retire")) {
        responseContent = "Based on your current savings rate and income, you could retire by age 62. To retire earlier, consider increasing your monthly contributions to your retirement accounts by at least 15%.";
      } else if (input.toLowerCase().includes("freelance") || input.toLowerCase().includes("freelancing")) {
        responseContent = "Switching to freelancing could increase your income potential by 20-30%, but you'll need to account for self-employment taxes and healthcare costs. I recommend building a 6-month emergency fund before making the switch.";
      } else if (input.toLowerCase().includes("house") || input.toLowerCase().includes("home")) {
        responseContent = "With current interest rates and your savings, you could afford a home in the $350,000-$400,000 range. I recommend saving for a 20% down payment to avoid PMI and keeping your monthly payment below 28% of your gross income.";
      } else if (input.toLowerCase().includes("debt")) {
        responseContent = "I recommend tackling your highest interest debt first while making minimum payments on lower interest debt. Based on your current income, you could be debt-free in approximately 24 months.";
      } else {
        responseContent = "I'd need more details about your current financial situation to provide specific advice. Could you share information about your income, expenses, savings, and financial goals?";
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader>
        <CardTitle>AI Financial Advisor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div 
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your financial future... (e.g., 'Help me retire by 50')"
            className="min-h-[60px]"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
