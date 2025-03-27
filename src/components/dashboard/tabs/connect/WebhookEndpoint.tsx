
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Code } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WebhookEndpointProps {
  title: string;
  description: string;
  endpoint: string;
}

const WebhookEndpoint = ({ title, description, endpoint }: WebhookEndpointProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Endpoint URL</span>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex">
          <Input value={endpoint} readOnly className="bg-white" />
          <Button variant="outline" className="ml-2">
            <Code className="h-4 w-4 mr-2" />
            Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebhookEndpoint;
