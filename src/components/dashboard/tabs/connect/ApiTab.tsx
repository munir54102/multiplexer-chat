
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, RefreshCcw, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ApiKeySection from "./ApiKeySection";
import ApiQuickStart from "./ApiQuickStart";
import ApiRateLimits from "./ApiRateLimits";
import ApiEndpoints from "./ApiEndpoints";

const ApiTab = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">API Integration</h3>
      <p className="text-gray-600 mb-4">
        Connect your agent to custom applications or third-party services using our API.
      </p>
      
      <ApiKeySection />
      <ApiQuickStart />
      <ApiRateLimits />
      <ApiEndpoints />
    </div>
  );
};

export default ApiTab;
