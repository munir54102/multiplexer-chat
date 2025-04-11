
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [botName, setBotName] = useState("");
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
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Navigate directly to the create tab with the 6-step guide
      navigate("/dashboard/create", { state: { botName, step: 'purpose' } });
    }, 1500);
  };
  
  const resetDialog = () => {
    setBotName("");
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
        <DialogHeader>
          <DialogTitle>Name Your New Chatbot</DialogTitle>
          <DialogDescription>
            Give your chatbot a name. You'll define its purpose and other details in the next steps.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
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
          
          <div className="flex items-center justify-center p-4">
            <Bot className="h-16 w-16 text-primary opacity-80" />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? "Creating..." : "Next: Define Purpose"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatbotButton;
