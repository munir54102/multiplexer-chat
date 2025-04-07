
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ButtonVariant = "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface CreateChatbotButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const CreateChatbotButton = ({ 
  size = "default",
  variant = "default",
  fullWidth = false 
}: CreateChatbotButtonProps) => {
  const { toast } = useToast();
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
          <DialogTitle>Create a New Chatbot</DialogTitle>
          <DialogDescription>
            Enter a name for your chatbot. You can customize it further in the next steps.
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
            
          <div className="flex items-center justify-center p-4">
            <Bot className="h-16 w-16 text-primary opacity-80" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Chatbot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatbotButton;
