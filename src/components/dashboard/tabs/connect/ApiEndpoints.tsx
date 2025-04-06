
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpointProps {
  method: string;
  path: string;
  description: string;
  requestExample: string;
  responseExample: string;
}

const ApiEndpoints = () => {
  const { toast } = useToast();
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  
  const endpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: "/v1/conversation",
      description: "Send a message to your agent and get a response",
      requestExample: `{
  "bot_id": "YOUR_BOT_ID",
  "message": "Hello, I have a question about your product",
  "session_id": "user123",
  "context": {
    "user_name": "John Doe",
    "user_email": "john@example.com"
  }
}`,
      responseExample: `{
  "id": "conv_1234567890",
  "bot_id": "YOUR_BOT_ID",
  "response": "Hello John! I'd be happy to help with your product questions. What would you like to know?",
  "session_id": "user123",
  "created_at": "2025-04-06T14:23:45Z"
}`
    },
    {
      method: "GET",
      path: "/v1/bots",
      description: "Get a list of all your bots",
      requestExample: `// No request body needed
// Headers:
// Authorization: Bearer YOUR_API_KEY`,
      responseExample: `{
  "bots": [
    {
      "id": "bot_12345",
      "name": "Customer Support Bot",
      "status": "active",
      "created_at": "2025-03-15T10:30:00Z"
    },
    {
      "id": "bot_67890",
      "name": "Sales Assistant",
      "status": "active",
      "created_at": "2025-04-01T08:45:00Z"
    }
  ]
}`
    },
    {
      method: "GET",
      path: "/v1/conversations",
      description: "Get a list of conversations for a specific bot",
      requestExample: `// Query parameters:
// bot_id=YOUR_BOT_ID
// limit=10
// offset=0`,
      responseExample: `{
  "conversations": [
    {
      "id": "conv_12345",
      "bot_id": "YOUR_BOT_ID",
      "session_id": "user123",
      "message_count": 5,
      "created_at": "2025-04-06T14:23:45Z",
      "updated_at": "2025-04-06T14:30:22Z"
    },
    {
      "id": "conv_67890",
      "bot_id": "YOUR_BOT_ID",
      "session_id": "user456",
      "message_count": 3,
      "created_at": "2025-04-06T13:10:15Z",
      "updated_at": "2025-04-06T13:15:42Z"
    }
  ],
  "total": 42,
  "offset": 0,
  "limit": 10
}`
    },
    {
      method: "POST",
      path: "/v1/webhooks",
      description: "Create a new webhook subscription",
      requestExample: `{
  "url": "https://your-server.com/webhook",
  "event_types": ["conversation.created", "message.created"],
  "description": "Notification webhook for new conversations"
}`,
      responseExample: `{
  "id": "wh_12345",
  "url": "https://your-server.com/webhook",
  "event_types": ["conversation.created", "message.created"],
  "description": "Notification webhook for new conversations",
  "created_at": "2025-04-06T15:00:00Z"
}`
    },
    {
      method: "POST",
      path: "/v1/train",
      description: "Add training data to your bot",
      requestExample: `{
  "bot_id": "YOUR_BOT_ID",
  "type": "qa_pair",
  "data": {
    "question": "What are your business hours?",
    "answer": "We are open Monday through Friday from 9am to 5pm Eastern Time."
  }
}`,
      responseExample: `{
  "id": "train_12345",
  "bot_id": "YOUR_BOT_ID",
  "status": "pending",
  "created_at": "2025-04-06T15:05:00Z",
  "estimated_completion": "2025-04-06T15:10:00Z"
}`
    }
  ];
  
  const toggleEndpoint = (path: string) => {
    if (expandedEndpoint === path) {
      setExpandedEndpoint(null);
    } else {
      setExpandedEndpoint(path);
    }
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`
    });
  };
  
  const getBadgeColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "POST":
        return "bg-green-50 text-green-700 border-green-200";
      case "PUT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "DELETE":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium mb-4">API Endpoints</h4>
      <div className="space-y-3">
        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleEndpoint(endpoint.path)}
            >
              <div className="flex items-center">
                <Badge variant="outline" className={getBadgeColor(endpoint.method)}>
                  {endpoint.method}
                </Badge>
                <span className="ml-2 font-mono text-sm">{endpoint.path}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2 hidden md:inline">{endpoint.description}</span>
                {expandedEndpoint === endpoint.path ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
            
            {expandedEndpoint === endpoint.path && (
              <div className="p-3 border-t">
                <p className="text-sm text-gray-600 mb-3">{endpoint.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-sm font-medium">Request</h5>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(endpoint.requestExample, "Request example")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
                      {endpoint.requestExample}
                    </pre>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-sm font-medium">Response</h5>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(endpoint.responseExample, "Response example")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
                      {endpoint.responseExample}
                    </pre>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="mt-3">
                  <Code className="h-4 w-4 mr-2" />
                  Try It
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiEndpoints;
