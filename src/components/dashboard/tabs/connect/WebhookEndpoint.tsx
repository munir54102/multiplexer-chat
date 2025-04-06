
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Code, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface WebhookEndpointProps {
  title: string;
  description: string;
  endpoint: string;
  enabled?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
}

const WebhookEndpoint = ({ 
  title, 
  description, 
  endpoint,
  enabled = true,
  onToggle,
  onDelete
}: WebhookEndpointProps) => {
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(endpoint);
    toast({
      title: "Copied!",
      description: "Endpoint URL copied to clipboard."
    });
  };
  
  const handleTest = () => {
    toast({
      title: "Testing Webhook",
      description: "A test request has been sent to your endpoint."
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {onDelete && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {onToggle && (
            <Switch checked={enabled} onCheckedChange={onToggle} />
          )}
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Endpoint URL</span>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex">
          <Input value={endpoint} readOnly className="bg-white rounded-r-none" />
          <Button variant="outline" className="rounded-l-none" onClick={handleTest}>
            <Code className="h-4 w-4 mr-2" />
            Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebhookEndpoint;
