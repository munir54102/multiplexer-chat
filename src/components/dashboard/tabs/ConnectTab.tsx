
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmbedTab from "./connect/EmbedTab";
import ApiTab from "./connect/ApiTab";
import IntegrationsTab from "./connect/IntegrationsTab";
import WebhooksTab from "./connect/WebhooksTab";

const ConnectTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Connect</h2>
      
      <Tabs defaultValue="embed" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="embed">Embed</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="embed">
          <EmbedTab />
        </TabsContent>
        
        <TabsContent value="api">
          <ApiTab />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
        
        <TabsContent value="webhooks">
          <WebhooksTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectTab;
