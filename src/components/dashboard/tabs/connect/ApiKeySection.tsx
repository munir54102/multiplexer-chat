
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, RefreshCcw } from "lucide-react";

const ApiKeySection = () => {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Your API Key</h4>
      <div className="flex">
        <Input 
          type="password" 
          value="••••••••••••••••••••••••••••••" 
          disabled 
          className="rounded-r-none" 
        />
        <Button variant="outline" className="rounded-l-none border-l-0">
          <Eye className="h-4 w-4 mr-2" />
          Show
        </Button>
        <Button variant="outline" className="ml-2">
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
