
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PlatformIntegration from "./PlatformIntegration";
import { MessageCircle, Facebook, Instagram, Slack, Telegram } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MessagingPlatforms = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (!apiKey) {
      toast({
        title: "Missing API Key",
        description: "Please enter an API key to connect.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Connected Successfully",
        description: `Your chatbot is now connected to ${selectedPlatform}.`,
      });
      
      // Reset form
      setApiKey("");
      setPhoneNumber("");
    }, 1500);
  };

  const messagingPlatforms = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-6 w-6 text-green-600" />,
      description: "Connect WhatsApp Business API to reach over 2 billion users with rich, interactive messaging.",
      buttonText: "Connect WhatsApp"
    },
    {
      name: "Facebook Messenger",
      icon: <Facebook className="h-6 w-6 text-blue-600" />,
      description: "Integrate with Messenger to engage customers where they already spend their time.",
      buttonText: "Connect Messenger"
    },
    {
      name: "Instagram DM",
      icon: <Instagram className="h-6 w-6 text-pink-600" />,
      description: "Enable automated Instagram Direct Message responses for your followers and customers.",
      buttonText: "Connect Instagram"
    },
    {
      name: "Slack",
      icon: <Slack className="h-6 w-6 text-purple-600" />,
      description: "Build Slack apps and bots for team productivity and customer service workflows.",
      buttonText: "Connect Slack"
    }
  ];

  const handlePlatformConnect = (platformName: string) => {
    setSelectedPlatform(platformName);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Messaging Platforms</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messagingPlatforms.map((platform) => (
          <PlatformIntegration
            key={platform.name}
            name={platform.name}
            description={platform.description}
            icon={platform.icon}
            buttonText={platform.buttonText}
            isConnected={false}
            onConnect={() => handlePlatformConnect(platform.name)}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {selectedPlatform}</DialogTitle>
            <DialogDescription>
              Enter your API credentials to connect your chatbot to {selectedPlatform}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedPlatform === "WhatsApp" && (
              <div className="space-y-2">
                <Label htmlFor="phone-number">Business Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="api-key">{selectedPlatform} API Key/Token</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                You can find this in your {selectedPlatform} developer dashboard.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagingPlatforms;
