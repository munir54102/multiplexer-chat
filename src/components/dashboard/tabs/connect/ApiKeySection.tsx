
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiKeySection = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("ak_1234567890abcdefghijklmnopqrstuv");
  const [showApiKey, setShowApiKey] = useState(false);
  
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
    // In a real implementation, this would call an API to regenerate the key
    const newKey = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. The old key is no longer valid.",
    });
  };
  
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Your API Key</h4>
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
        <Button variant="outline" className="ml-2" onClick={regenerateApiKey}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Keep your API key secret. Do not share it in publicly accessible areas such as GitHub, client-side code, etc.
      </p>
    </div>
  );
};

export default ApiKeySection;
