
import { Code, Book, Server, FileJson, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const APIDocumentation = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`curl -X POST \\
  https://api.multiplexai.com/v1/conversation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bot_id": "your_bot_id",
    "message": "Hello, I have a question about your service",
    "session_id": "user123",
    "platform": "api"
  }'`);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Developer API</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Integrate MultiplexAI's powerful chatbot capabilities directly into your applications with our comprehensive API.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4">API Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-primary font-medium">
                <Book className="h-4 w-4 mr-2" /> 
                Getting Started
              </li>
              <li className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <Server className="h-4 w-4 mr-2" /> 
                Authentication
              </li>
              <li className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <Code className="h-4 w-4 mr-2" /> 
                Conversation API
              </li>
              <li className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <FileJson className="h-4 w-4 mr-2" /> 
                Webhooks
              </li>
              <li className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <Server className="h-4 w-4 mr-2" /> 
                Training API
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">API Reference</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">SDKs & Libraries</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Code Examples</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <div className="flex items-center">
                <Code className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-200 text-sm">Example API Request</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopy}
                className="h-8 text-gray-400 hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
            <div className="p-4 text-sm">
              <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`curl -X POST \\
  https://api.multiplexai.com/v1/conversation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bot_id": "your_bot_id",
    "message": "Hello, I have a question about your service",
    "session_id": "user123",
    "platform": "api"
  }'`}
              </pre>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Response</h3>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs font-mono overflow-x-auto text-gray-800">
{`{
  "id": "msg_123456789",
  "bot_id": "your_bot_id",
  "session_id": "user123",
  "message": "Hello, I have a question about your service",
  "response": "Hi there! I'd be happy to help with any questions about our service. What would you like to know?",
  "confidence": 0.92,
  "intent": "greeting",
  "entities": [],
  "timestamp": "2023-06-15T10:23:45Z"
}`}
            </pre>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">RESTful API</span>
                  <p className="text-sm text-gray-600">Simple, predictable URL structure with JSON-encoded responses</p>
                </div>
              </li>
              <li className="flex">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Webhooks</span>
                  <p className="text-sm text-gray-600">Get notified about bot interactions in real-time</p>
                </div>
              </li>
              <li className="flex">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Client Libraries</span>
                  <p className="text-sm text-gray-600">Official SDKs for JavaScript, Python, PHP, Ruby, and Java</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;
