
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PlatformIntegrationProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  isConnected?: boolean;
  isVerified?: boolean;
  onConnect?: () => void;
}

const PlatformIntegration = ({
  name,
  description,
  icon,
  buttonText,
  isConnected = false,
  isVerified = false,
  onConnect,
}: PlatformIntegrationProps) => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(isConnected);
  const [verified, setVerified] = useState(isVerified);
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = () => {
    if (!apiKey || !apiSecret) {
      toast({
        title: "Error",
        description: "Please enter both API key and secret",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      setConnected(true);
      setVerified(true);
      setIsVerifying(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Connected!",
        description: `Successfully integrated with ${name}`,
      });
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setConnected(false);
    setVerified(false);
    setApiKey("");
    setApiSecret("");
    
    toast({
      title: "Disconnected",
      description: `${name} integration has been removed`,
    });
  };

  const handleDialogOpen = () => {
    // Call the onConnect prop if provided
    if (onConnect) {
      onConnect();
    }
    // Then open the dialog
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle>{name}</CardTitle>
          </div>
          {connected && (
            <Badge className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {connected && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              {verified ? (
                <Check className="h-4 w-4 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
              )}
              <span className="text-sm">
                {verified ? "Verified and active" : "Connected but not verified"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Last updated: April 6, 2025
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {connected ? (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(true)}>
              Configure
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDisconnect}>
              <X className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" onClick={handleDialogOpen}>{buttonText}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect to {name}</DialogTitle>
                <DialogDescription>
                  Enter your API credentials to integrate with {name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor={`${name}-api-key`}>API Key</Label>
                  <Input
                    id={`${name}-api-key`}
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`${name}-api-secret`}>API Secret</Label>
                  <Input
                    id={`${name}-api-secret`}
                    type="password"
                    placeholder="Enter your API secret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                  />
                </div>
                
                <p className="text-sm text-gray-500">
                  Your credentials are securely stored and encrypted. Learn how to
                  get your {name} API credentials.
                </p>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnect} disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Connect"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlatformIntegration;
