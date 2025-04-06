
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Code, Eye, EyeOff, RefreshCcw, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WebhookEndpoint from "./WebhookEndpoint";
import ZapierIntegration from "./ZapierIntegration";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const WebhooksTab = () => {
  const { toast } = useToast();
  const [webhookSecret, setWebhookSecret] = useState("whsec_1234567890abcdefghijklmnopqrstuvwxyz");
  const [showSecret, setShowSecret] = useState(false);
  const [endpoints, setEndpoints] = useState([
    { 
      id: "wh1",
      title: "New Conversation Webhook", 
      description: "Triggered when a new conversation starts",
      endpoint: "https://your-server.com/webhooks/new-conversation",
      enabled: true
    },
    { 
      id: "wh2",
      title: "Lead Captured Webhook", 
      description: "Triggered when a lead is captured",
      endpoint: "https://your-server.com/webhooks/lead-captured",
      enabled: true
    }
  ]);

  const [newWebhook, setNewWebhook] = useState({
    title: "",
    description: "",
    endpoint: "",
    eventType: "conversation.created"
  });

  const eventTypes = [
    { value: "conversation.created", label: "New Conversation" },
    { value: "message.created", label: "New Message" },
    { value: "lead.captured", label: "Lead Captured" },
    { value: "rating.submitted", label: "Rating Submitted" },
    { value: "bot.trained", label: "Bot Training Completed" }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Webhook secret copied to clipboard.",
    });
  };

  const regenerateSecret = () => {
    // In a real implementation, this would call an API to regenerate the secret
    const newSecret = `whsec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setWebhookSecret(newSecret);
    toast({
      title: "Secret Regenerated",
      description: "Your new webhook secret has been generated. Update your server to use this new secret.",
    });
  };

  const toggleEndpoint = (id: string) => {
    setEndpoints(
      endpoints.map(endpoint => 
        endpoint.id === id 
          ? { ...endpoint, enabled: !endpoint.enabled } 
          : endpoint
      )
    );
    
    const endpoint = endpoints.find(e => e.id === id);
    if (endpoint) {
      toast({
        title: endpoint.enabled ? "Webhook Disabled" : "Webhook Enabled",
        description: `${endpoint.title} is now ${endpoint.enabled ? "disabled" : "enabled"}.`
      });
    }
  };

  const deleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
    toast({
      title: "Webhook Deleted",
      description: "The webhook endpoint has been deleted."
    });
  };

  const handleAddWebhook = () => {
    if (!newWebhook.title || !newWebhook.endpoint) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and endpoint URL.",
        variant: "destructive"
      });
      return;
    }
    
    const eventType = eventTypes.find(type => type.value === newWebhook.eventType);
    
    setEndpoints([
      ...endpoints,
      {
        id: `wh${Date.now()}`,
        title: newWebhook.title,
        description: newWebhook.description || `Triggered on ${eventType?.label || "event"}`,
        endpoint: newWebhook.endpoint,
        enabled: true
      }
    ]);
    
    setNewWebhook({
      title: "",
      description: "",
      endpoint: "",
      eventType: "conversation.created"
    });
    
    toast({
      title: "Webhook Added",
      description: "The new webhook endpoint has been added."
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Webhooks</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Webhook</DialogTitle>
              <DialogDescription>
                Create a new webhook endpoint to receive events from your agent.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-title">Webhook Name</Label>
                <Input
                  id="webhook-title"
                  placeholder="E.g., Customer Message Alert"
                  value={newWebhook.title}
                  onChange={(e) => setNewWebhook({...newWebhook, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-event">Event Type</Label>
                <Select 
                  value={newWebhook.eventType}
                  onValueChange={(value) => setNewWebhook({...newWebhook, eventType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((event) => (
                      <SelectItem key={event.value} value={event.value}>
                        {event.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-description">Description (Optional)</Label>
                <Input
                  id="webhook-description"
                  placeholder="What does this webhook do?"
                  value={newWebhook.description}
                  onChange={(e) => setNewWebhook({...newWebhook, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-server.com/webhook"
                  value={newWebhook.endpoint}
                  onChange={(e) => setNewWebhook({...newWebhook, endpoint: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  The URL where webhook events will be sent via HTTP POST.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewWebhook({
                title: "",
                description: "",
                endpoint: "",
                eventType: "conversation.created"
              })}>
                Cancel
              </Button>
              <Button onClick={handleAddWebhook}>Add Webhook</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-gray-600 mb-6">
        Webhooks allow you to receive real-time notifications when specific events happen in your account.
      </p>
      
      <div className="space-y-4 mb-6">
        {endpoints.length > 0 ? (
          endpoints.map((endpoint) => (
            <div key={endpoint.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{endpoint.title}</h4>
                  <p className="text-sm text-gray-600">{endpoint.description}</p>
                </div>
                <Switch checked={endpoint.enabled} onCheckedChange={() => toggleEndpoint(endpoint.id)} />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Endpoint URL</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => copyToClipboard(endpoint.endpoint)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => deleteEndpoint(endpoint.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex">
                  <Input value={endpoint.endpoint} readOnly className="bg-white rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">
                    <Code className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Code className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h4 className="font-medium text-gray-700">No Webhooks Configured</h4>
            <p className="text-sm text-gray-500 mb-3">
              Create webhooks to receive notifications when events occur in your account.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* Same dialog content as above */}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      
      <ZapierIntegration />
      
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
                type={showSecret ? "text" : "password"} 
                id="webhook-secret" 
                value={webhookSecret} 
                readOnly
                className="rounded-r-none font-mono text-sm" 
              />
              <Button variant="outline" className="rounded-l-none border-l-0" onClick={() => setShowSecret(!showSecret)}>
                {showSecret ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showSecret ? "Hide" : "Show"}
              </Button>
              <Button variant="outline" className="ml-2" onClick={() => copyToClipboard(webhookSecret)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" className="ml-2" onClick={regenerateSecret}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Use this secret to verify webhook signatures. Each webhook request includes a X-Webhook-Signature header.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mt-4">
              <h5 className="text-sm font-medium mb-2">Verification Code Sample</h5>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
{`// Node.js example
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest, 'hex'),
    Buffer.from(signature, 'hex')
  );
}`}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                This example shows how to verify the signature in Node.js. Similar approaches work in other languages.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhooksTab;
