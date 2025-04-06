
import React from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DiscountSection from "./DiscountSection";

const GeneralSection = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">General Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Agent ID</h3>
          <div className="flex">
            <Input 
              type="text" 
              value="Dkkn7kDrggtcMDYtrHkP" 
              disabled
              className="flex-1 border border-gray-300 rounded-lg rounded-r-none p-2 bg-gray-50"
            />
            <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard("Dkkn7kDrggtcMDYtrHkP", "Agent ID copied to clipboard")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Size</h3>
          <p className="text-xl font-medium">68,715 characters</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Name</h3>
          <Input 
            type="text" 
            value="MultiplexAI Agent" 
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-700">Credit limit</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
              <div className="bg-blue-600 h-2.5 rounded-full w-[15%]"></div>
            </div>
            <span className="text-sm text-gray-600">15%</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Language</h3>
          <Select defaultValue="en-US">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Timezone</h3>
          <Select defaultValue="GMT-05:00">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GMT-05:00">(GMT-05:00) Eastern Time (US & Canada)</SelectItem>
              <SelectItem value="GMT+00:00">(GMT+00:00) UTC</SelectItem>
              <SelectItem value="GMT+01:00">(GMT+01:00) Central European Time</SelectItem>
              <SelectItem value="GMT+08:00">(GMT+08:00) China Standard Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Add the new Discount Section component */}
        <div className="border-t pt-6 mt-6">
          <DiscountSection />
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
