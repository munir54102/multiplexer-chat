
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCcw, Copy, Key, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const ApiKeySection = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("ak_1234567890abcdefghijklmnopqrstuv");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creationDate] = useState("2025-03-15");
  const [lastUsed] = useState("2025-04-05");
  
  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };
  
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard."
    });
  };
  
  const regenerateApiKey = () => {
    setIsLoading(true);
    // In a real implementation, this would call an API to regenerate the key
    setTimeout(() => {
      const newKey = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      setIsLoading(false);
      toast({
        title: "API Key Regenerated",
        description: "Your new API key has been generated. The old key is no longer valid.",
      });
    }, 800);
  };
  
  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Your API Key</h4>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
      </div>
      
      <div className="flex">
        <Input 
          type={showApiKey ? "text" : "password"} 
          value={apiKey} 
          readOnly
          className="rounded-r-none font-mono" 
        />
        <Button variant="outline" className="rounded-l-none border-l-0" onClick={toggleApiKeyVisibility}>
          {showApiKey ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showApiKey ? "Hide" : "Show"}
        </Button>
        <Button variant="outline" className="ml-2" onClick={copyApiKey}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" className="ml-2" onClick={regenerateApiKey} disabled={isLoading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Regenerating..." : "Regenerate"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="text-sm">
          <span className="text-gray-500">Created:</span> {creationDate}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Last used:</span> {lastUsed}
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start">
        <Key className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="text-sm text-amber-800">
            Keep your API key secret. Do not share it in publicly accessible areas such as GitHub, client-side code, etc.
          </p>
          <p className="text-xs text-amber-700 mt-1">
            This key provides full access to your account. If compromised, regenerate immediately.
          </p>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center cursor-help text-sm text-blue-600">
              <Info className="h-4 w-4 mr-1" />
              <span>How to use this API key</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <p>Use this key in your API requests with the Authorization header:</p>
            <code className="text-xs bg-gray-100 p-1 rounded block mt-1">
              Authorization: Bearer {showApiKey ? apiKey : "YOUR_API_KEY"}
            </code>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ApiKeySection;
