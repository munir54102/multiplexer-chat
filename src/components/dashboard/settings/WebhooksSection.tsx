
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Eye, RefreshCcw } from "lucide-react";

const WebhooksSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Webhooks</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Send data to your systems when events occur in MultiplexAI</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Webhook
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Available Events</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="convo-started" className="rounded" />
            <Label htmlFor="convo-started">conversation.started</Label>
            <span className="text-sm text-gray-500">When a new conversation begins</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="message-received" className="rounded" />
            <Label htmlFor="message-received">message.received</Label>
            <span className="text-sm text-gray-500">When a user sends a message</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="message-sent" className="rounded" />
            <Label htmlFor="message-sent">message.sent</Label>
            <span className="text-sm text-gray-500">When the AI sends a message</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="convo-ended" className="rounded" />
            <Label htmlFor="convo-ended">conversation.ended</Label>
            <span className="text-sm text-gray-500">When a conversation is completed</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="lead-captured" className="rounded" />
            <Label htmlFor="lead-captured">lead.captured</Label>
            <span className="text-sm text-gray-500">When user contact info is collected</span>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Endpoint Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url" className="mb-1 block">Webhook URL</Label>
            <Input 
              id="webhook-url"
              placeholder="https://your-server.com/webhook" 
            />
          </div>
          
          <div>
            <Label htmlFor="secret-key" className="mb-1 block">Secret Key</Label>
            <div className="flex">
              <Input 
                id="secret-key"
                type="password" 
                value="••••••••••••••••••••••" 
                className="rounded-r-none"
              />
              <Button variant="outline" className="rounded-l-none border-l-0">
                <Eye className="h-4 w-4 mr-2" /> Show
              </Button>
              <Button variant="outline" className="ml-2">
                <RefreshCcw className="h-4 w-4 mr-2" /> Generate
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used to verify webhook payloads are coming from MultiplexAI
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <Button className="mr-3">Save Webhook</Button>
            <Button variant="outline">Test Webhook</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksSection;
