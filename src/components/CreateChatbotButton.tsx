
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Upload, Globe, FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ButtonVariant = "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface CreateChatbotButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  onSuccess?: () => void;
}

const CreateChatbotButton = ({ 
  size = "default",
  variant = "default",
  fullWidth = false,
  onSuccess 
}: CreateChatbotButtonProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [botName, setBotName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("customer-support");
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
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setOpen(false);
      
      toast({
        title: "Chatbot created!",
        description: `${botName} has been created successfully. Continue with the setup steps.`,
      });
      
      // Reset form
      setBotName("");
      setDescription("");
      setIndustry("");
      setPurpose("customer-support");
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Navigate to build step
      navigate("/dashboard");
    }, 1500);
  };
  
  const resetDialog = () => {
    setBotName("");
    setDescription("");
    setIndustry("");
    setPurpose("customer-support");
    setActiveTab("basic");
  };

  const industryOptions = [
    "E-commerce",
    "Education",
    "Finance",
    "Healthcare",
    "Real Estate",
    "Technology",
    "Travel",
    "Other"
  ];

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a New Chatbot</DialogTitle>
          <DialogDescription>
            Give your chatbot a name and customize basic settings. You can add knowledge sources in the next steps.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="purpose">Purpose & Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bot-name">Chatbot Name <span className="text-red-500">*</span></Label>
              <Input 
                id="bot-name" 
                placeholder="e.g., Support Assistant, Sales Bot" 
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
              <p className="text-xs text-gray-500">This name will be visible to your users</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what this chatbot will do" 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="purpose" className="py-4">
            <div className="space-y-2 mb-4">
              <Label>Primary Purpose</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${purpose === 'customer-support' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setPurpose('customer-support')}
                >
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <h3 className="font-medium">Customer Support</h3>
                      <p className="text-sm text-gray-500">Handle FAQs and support requests</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${purpose === 'lead-generation' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setPurpose('lead-generation')}
                >
                  <div className="flex items-start">
                    <Upload className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <h3 className="font-medium">Lead Generation</h3>
                      <p className="text-sm text-gray-500">Capture and qualify leads</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${purpose === 'knowledge-base' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setPurpose('knowledge-base')}
                >
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <h3 className="font-medium">Knowledge Base</h3>
                      <p className="text-sm text-gray-500">Answer questions from documents</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${purpose === 'website-assistant' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setPurpose('website-assistant')}
                >
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <h3 className="font-medium">Website Assistant</h3>
                      <p className="text-sm text-gray-500">Guide users through your site</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <Bot className="h-16 w-16 text-primary opacity-80" />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          {activeTab === "basic" ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("purpose")}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Chatbot"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatbotButton;
