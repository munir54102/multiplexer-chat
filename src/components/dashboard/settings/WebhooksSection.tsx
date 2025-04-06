
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Code, Webhook } from "lucide-react";

const WebhooksSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Webhooks Settings</h2>
      
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Webhooks allow external services to be notified when certain events happen in your account.
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Active Webhooks</h3>
        
        <div className="space-y-4">
          {/* Sample webhook item */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Webhook className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">New Conversation</h4>
              </div>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Triggered when a new conversation is started with your chatbot.
            </p>
            <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
              <code className="text-sm">https://example.com/webhooks/new-conversation</code>
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-1" />
                Test
              </Button>
            </div>
          </div>
          
          {/* Sample webhook item */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Webhook className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Lead Captured</h4>
              </div>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Triggered when a lead is captured through your chatbot.
            </p>
            <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
              <code className="text-sm">https://example.com/webhooks/lead-captured</code>
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-1" />
                Test
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Webhook Security</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-secret" className="mb-1 block">Webhook Secret</Label>
            <div className="flex">
              <Input 
                type="password" 
                id="webhook-secret" 
                value="••••••••••••••••••••••••••••••••" 
                readOnly
                className="rounded-r-none" 
              />
              <Button variant="outline" className="rounded-l-none">
                Show
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use this secret to verify the authenticity of webhook requests.
            </p>
          </div>
          
          <div>
            <Label htmlFor="webhook-docs" className="mb-1 block">Documentation</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm mb-2">
                To verify webhook signatures, check the 'X-Webhook-Signature' header on incoming webhook requests.
              </p>
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksSection;
