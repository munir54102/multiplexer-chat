
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PlatformIntegration from "./PlatformIntegration";
import { ShoppingCart, Store, ShoppingBag, CreditCard, Box, BarChart, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EcommerceIntegrations = () => {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnectStore = () => {
    if (!storeUrl || !apiKey) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setSyncInProgress(true);
    
    // Simulate API call
    setTimeout(() => {
      setSyncInProgress(false);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: `Your ${selectedPlatform} store has been connected successfully.`,
      });
    }, 2000);
  };

  const ecommercePlatforms = [
    {
      name: "WooCommerce",
      icon: <ShoppingCart className="h-6 w-6 text-purple-600" />,
      description: "Connect your WooCommerce store to create product-aware chatbots and automate customer service.",
      buttonText: "Connect WooCommerce"
    },
    {
      name: "Shopify",
      icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
      description: "Integrate with Shopify to provide order status updates, product recommendations, and sales support.",
      buttonText: "Connect Shopify"
    },
    {
      name: "Magento",
      icon: <Store className="h-6 w-6 text-orange-600" />,
      description: "Link your Magento store to offer personalized shopping experiences and inventory checks.",
      buttonText: "Connect Magento"
    },
    {
      name: "BigCommerce",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      description: "Integrate with BigCommerce to handle order inquiries and provide product information.",
      buttonText: "Connect BigCommerce"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">E-commerce Integrations</h3>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Sync Products
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ecommercePlatforms.map((platform) => (
          <PlatformIntegration
            key={platform.name}
            name={platform.name}
            description={platform.description}
            icon={platform.icon}
            buttonText={platform.buttonText}
            isConnected={false}
          />
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Supercharge your e-commerce with AI</h4>
            <p className="text-sm text-gray-600">
              Connect your store to enable automated order tracking, product recommendations,
              cart recovery, and personalized customer support.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect E-commerce Store</DialogTitle>
            <DialogDescription>
              Enter your store URL and API credentials to connect your e-commerce platform.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Select Platform</Label>
              <select
                id="platform"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">Select platform...</option>
                {ecommercePlatforms.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-url">Store URL</Label>
              <Input
                id="store-url"
                placeholder="https://yourstore.com"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key/Secret</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                You can find this in your store's developer or API settings.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectStore} disabled={syncInProgress}>
              {syncInProgress ? "Connecting..." : "Connect Store"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcommerceIntegrations;
