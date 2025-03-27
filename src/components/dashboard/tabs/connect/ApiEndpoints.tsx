
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

const ApiEndpoints = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium mb-2">API Endpoints</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div>
            <Badge variant="outline">POST</Badge>
            <span className="ml-2">/v1/conversation</span>
          </div>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div>
            <Badge variant="outline">GET</Badge>
            <span className="ml-2">/v1/bots</span>
          </div>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div>
            <Badge variant="outline">GET</Badge>
            <span className="ml-2">/v1/conversations</span>
          </div>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiEndpoints;
