
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Laptop, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateChatbotButton = ({ size = "default", variant = "default", fullWidth = false }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [botName, setBotName] = useState("");
  const [botType, setBotType] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!botName.trim()) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter a name for your chatbot",
      });
      return;
    }
    
    if (!botType) {
      toast({
        variant: "destructive",
        title: "Type required",
        description: "Please select a type for your chatbot",
      });
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setOpen(false);
      
      toast({
        title: "Chatbot created!",
        description: `${botName} has been created successfully.`,
      });
      
      // Reset form
      setBotName("");
      setBotType("");
      setStep(1);
      
      // Navigate to dashboard or editing page
      // window.location.href = "/dashboard";
    }, 1500);
  };
  
  const resetDialog = () => {
    setBotName("");
    setBotType("");
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={fullWidth ? "w-full" : ""}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Chatbot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Create a New Chatbot</DialogTitle>
              <DialogDescription>
                Give your chatbot a name and choose its primary focus.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Chatbot Name</Label>
                <Input 
                  id="bot-name" 
                  placeholder="e.g., Support Assistant, Sales Bot" 
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Chatbot Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "customer-support", title: "Customer Support", icon: <MessageSquare className="h-10 w-10 mb-2 text-blue-600" />, description: "Answer customer questions and provide assistance" },
                    { id: "sales", title: "Sales", icon: <Laptop className="h-10 w-10 mb-2 text-green-600" />, description: "Generate leads and guide purchase decisions" },
                  ].map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer text-center hover:border-primary transition-colors ${botType === type.id ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setBotType(type.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          {type.icon}
                          <CardTitle className="text-base mb-1">{type.title}</CardTitle>
                          <CardDescription className="text-xs">{type.description}</CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)}>
                Next
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Customize Your Chatbot</DialogTitle>
              <DialogDescription>
                Confirm your settings and create your chatbot.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <h3 className="font-medium">{botName || "Unnamed Bot"}</h3>
                    <p className="text-sm text-gray-500">
                      {botType === "customer-support" ? "Customer Support" : "Sales"} Bot
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Initial Training:</span>
                    <span className="font-medium">Default {botType === "customer-support" ? "Support" : "Sales"} Knowledge</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Language:</span>
                    <span className="font-medium">English (US)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">AI Model:</span>
                    <span className="font-medium">GPT-4</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                You can customize all settings, connect data sources, and integrate with platforms after creation.
              </p>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Chatbot"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatbotButton;
