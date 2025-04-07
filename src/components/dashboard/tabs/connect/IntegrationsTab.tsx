
import React, { useState } from "react";
import MessagingPlatforms from "./integrations/MessagingPlatforms";
import BusinessTools from "./integrations/BusinessTools";
import KnowledgeBases from "./integrations/KnowledgeBases";
import EcommerceIntegrations from "./integrations/EcommerceIntegrations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const IntegrationsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllIntegrations, setShowAllIntegrations] = useState(false);
  
  const categories = [
    { id: "messaging", label: "Messaging" },
    { id: "crm", label: "CRM & Sales" },
    { id: "marketing", label: "Marketing" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "knowledge", label: "Knowledge Base" },
    { id: "automation", label: "Automation" },
    { id: "custom", label: "Custom" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogDescription>
                  Select a category and integration to add to your agent.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Tabs defaultValue="messaging">
                  <TabsList className="mb-4 flex justify-start w-full overflow-x-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="messaging" className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {["WhatsApp", "Facebook", "Instagram", "Telegram", "Slack", "Line"].map((platform) => (
                        <div key={platform} className="border rounded-lg p-3 hover:border-primary hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">{platform}</h4>
                          <p className="text-sm text-gray-500">Connect to {platform}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crm" className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive", "Microsoft Dynamics", "Close"].map((platform) => (
                        <div key={platform} className="border rounded-lg p-3 hover:border-primary hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">{platform}</h4>
                          <p className="text-sm text-gray-500">Connect to {platform}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ecommerce" className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {["WooCommerce", "Shopify", "Magento", "BigCommerce", "Etsy", "Amazon"].map((platform) => (
                        <div key={platform} className="border rounded-lg p-3 hover:border-primary hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">{platform}</h4>
                          <p className="text-sm text-gray-500">Connect to {platform}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Similar content for other tabs */}
                </Tabs>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Selected Integration</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <MessagingPlatforms />
      <EcommerceIntegrations />
      <BusinessTools />
      <KnowledgeBases />
      
      {showAllIntegrations ? (
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">All Available Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* This would be populated with all integrations */}
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                  <h4 className="font-medium">Integration {index + 1}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">Connect to this service to enhance your agent.</p>
                <Button variant="outline" size="sm" className="w-full">
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAllIntegrations(true)}>
            Show All Integrations
          </Button>
        </div>
      )}
    </div>
  );
};

export default IntegrationsTab;
