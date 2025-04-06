
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCcw, Code, Download, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ApiKeySection from "./ApiKeySection";
import ApiQuickStart from "./ApiQuickStart";
import ApiRateLimits from "./ApiRateLimits";
import ApiEndpoints from "./ApiEndpoints";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PlatformApiKeys from "./PlatformApiKeys";

const ApiTab = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("ak_1234567890abcdefghijklmnopqrstuv");
  const [showKey, setShowKey] = useState(false);
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    });
  };

  const regenerateApiKey = () => {
    // In a real implementation, this would call an API to regenerate the key
    const newKey = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. The old key is no longer valid.",
    });
  };

  const downloadSDK = (language: string) => {
    toast({
      title: "Download Started",
      description: `The ${language} SDK download has been initiated.`,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">API Integration</h3>
      <p className="text-gray-600 mb-6">
        Connect your agent to custom applications or third-party services using our API.
      </p>
      
      <Tabs defaultValue="keys" className="mb-6">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keys">
          <div className="space-y-6">
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Your Primary API Key</h4>
              <div className="flex">
                <Input 
                  type={showKey ? "text" : "password"} 
                  value={apiKey} 
                  readOnly
                  className="rounded-r-none font-mono" 
                />
                <Button variant="outline" className="rounded-l-none border-l-0" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showKey ? "Hide" : "Show"}
                </Button>
                <Button variant="outline" className="ml-2" onClick={() => copyToClipboard(apiKey, "API key copied to clipboard")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" className="ml-2" onClick={regenerateApiKey}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Keep your API key secret. Do not share it in publicly accessible areas such as GitHub, client-side code, etc.
              </p>
            </div>
            
            <PlatformApiKeys />
          </div>
        </TabsContent>
        
        <TabsContent value="docs">
          <ApiQuickStart />
          <ApiEndpoints />
        </TabsContent>
        
        <TabsContent value="sdks">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {["JavaScript", "Python", "PHP", "Ruby", "Java", "Go"].map((language) => (
              <div key={language} className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{language} SDK</h4>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">v1.2.0</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Official {language} SDK for the MultiplexAI API.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => downloadSDK(language)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Example Usage (JavaScript)</h4>
            <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto mb-3">
{`import { MultiplexAI } from 'multiplexai';

// Initialize the client
const client = new MultiplexAI({
  apiKey: 'YOUR_API_KEY',
});

// Send a message to your agent
async function sendMessage() {
  try {
    const response = await client.conversations.create({
      botId: 'YOUR_BOT_ID',
      message: 'Hello',
      sessionId: 'user123',
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}`}
            </pre>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard("import { MultiplexAI } from 'multiplexai';...", "Code snippet copied to clipboard")}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="border rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-50 border-b p-3 font-medium text-sm">
              Recent API Requests
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3 font-medium">Timestamp</th>
                  <th className="p-3 font-medium">Method</th>
                  <th className="p-3 font-medium">Endpoint</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">IP Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">2025-04-06 14:23:45</td>
                  <td className="p-3"><Badge variant="outline">POST</Badge></td>
                  <td className="p-3">/v1/conversation</td>
                  <td className="p-3"><Badge className="bg-green-50 text-green-700">200 OK</Badge></td>
                  <td className="p-3">192.168.1.1</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">2025-04-06 14:22:37</td>
                  <td className="p-3"><Badge variant="outline">GET</Badge></td>
                  <td className="p-3">/v1/bots</td>
                  <td className="p-3"><Badge className="bg-green-50 text-green-700">200 OK</Badge></td>
                  <td className="p-3">192.168.1.1</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">2025-04-06 14:21:12</td>
                  <td className="p-3"><Badge variant="outline">POST</Badge></td>
                  <td className="p-3">/v1/conversation</td>
                  <td className="p-3"><Badge className="bg-red-50 text-red-700">401 Unauthorized</Badge></td>
                  <td className="p-3">192.168.1.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Full Logs
          </Button>
        </TabsContent>
      </Tabs>
      
      <ApiRateLimits />
    </div>
  );
};

export default ApiTab;
