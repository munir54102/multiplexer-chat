
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Play, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ZapierIntegration = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [webhooks, setWebhooks] = useState([
    { id: "zap1", name: "New Contact Notification", url: "https://hooks.zapier.com/hooks/catch/12345/abcdef/" },
    { id: "zap2", name: "Message Alert", url: "https://hooks.zapier.com/hooks/catch/67890/ghijkl/" }
  ]);
  const [newWebhookName, setNewWebhookName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleTrigger = async (url: string) => {
    setIsLoading(true);
    
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          test: true
        }),
      });

      toast({
        title: "Webhook Triggered",
        description: "The test request was sent to Zapier. Check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addWebhook = () => {
    if (!newWebhookName || !webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter both a name and a webhook URL",
        variant: "destructive",
      });
      return;
    }

    setWebhooks([
      ...webhooks, 
      { 
        id: `zap${Date.now()}`, 
        name: newWebhookName, 
        url: webhookUrl 
      }
    ]);

    setNewWebhookName("");
    setWebhookUrl("");
    setIsAdding(false);

    toast({
      title: "Webhook Added",
      description: "Your Zapier webhook has been added successfully."
    });
  };

  const removeWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast({
      title: "Webhook Removed",
      description: "Your Zapier webhook has been removed."
    });
  };

  return (
    <Card className="border border-gray-200 mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-orange-500 mr-2" />
            <CardTitle>Zapier Integration</CardTitle>
          </div>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </Button>
        </div>
        <CardDescription>
          Connect your agent to thousands of apps with Zapier webhooks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="border rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-2">Add New Webhook</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Webhook Name</label>
                <Input 
                  placeholder="e.g., New Contact Alert" 
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Webhook URL from Zapier</label>
                <Input 
                  placeholder="https://hooks.zapier.com/hooks/catch/..." 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create a Zap in Zapier with a Webhook trigger to get this URL
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={addWebhook}>
                  Add Webhook
                </Button>
              </div>
            </div>
          </div>
        )}

        {webhooks.length > 0 ? (
          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{webhook.name}</h4>
                  <p className="text-sm text-gray-500 truncate max-w-md">{webhook.url}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTrigger(webhook.url)}
                    disabled={isLoading}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeWebhook(webhook.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-lg">
            <Zap className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h4 className="font-medium text-gray-700">No Zapier Webhooks Yet</h4>
            <p className="text-sm text-gray-500 mb-3">
              Connect your agent to other apps by adding Zapier webhook integrations
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Webhook
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ZapierIntegration;
