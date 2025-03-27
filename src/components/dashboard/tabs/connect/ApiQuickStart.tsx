
import React from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const ApiQuickStart = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="font-medium mb-2">Quick Start</h4>
      <p className="text-sm text-gray-600 mb-3">
        Make a request to our conversation API to interact with your agent:
      </p>
      <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto mb-3">
        {`curl -X POST \\
  https://api.multiplexai.com/v1/conversation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bot_id": "YOUR_BOT_ID",
    "message": "Hello",
    "session_id": "user123"
  }'`}
      </pre>
      <Button variant="outline" size="sm">
        <Code className="h-4 w-4 mr-2" /> View Full API Documentation
      </Button>
    </div>
  );
};

export default ApiQuickStart;
