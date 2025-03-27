
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Code, Eye, RefreshCcw, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WebhookEndpoint from "./WebhookEndpoint";

const WebhooksTab = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Webhooks</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Webhooks allow you to receive real-time notifications when specific events happen in your account.
      </p>
      
      <div className="space-y-4">
        <WebhookEndpoint 
          title="New Conversation Webhook" 
          description="Triggered when a new conversation starts"
          endpoint="https://your-server.com/webhooks/new-conversation"
        />
        
        <WebhookEndpoint 
          title="Lead Captured Webhook" 
          description="Triggered when a lead is captured"
          endpoint="https://your-server.com/webhooks/lead-captured"
        />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Webhook Security</CardTitle>
            <CardDescription>Verify webhook authenticity with a signature</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label htmlFor="webhook-secret" className="mb-1 block text-sm font-medium">Webhook Secret</label>
              <div className="flex">
                <Input 
                  type="password" 
                  id="webhook-secret" 
                  value="••••••••••••••••••" 
                  disabled 
                  className="rounded-r-none" 
                />
                <Button variant="outline" className="rounded-l-none border-l-0">
                  <Eye className="h-4 w-4 mr-2" />
                  Show
                </Button>
                <Button variant="outline" className="ml-2">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use this secret to verify webhook signatures. Each webhook request includes a X-Webhook-Signature header.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebhooksTab;
