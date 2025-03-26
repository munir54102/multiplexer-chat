
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Key } from "lucide-react";

const SecuritySection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Security</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Access Control</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="content-control" className="mb-1 block">Content Filtering</Label>
            <select id="content-control" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="standard">Standard (Recommended)</option>
              <option value="strict">Strict</option>
              <option value="minimal">Minimal</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="profanity-filter" defaultChecked />
            <Label htmlFor="profanity-filter">Enable profanity filter</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="pii-redaction" defaultChecked />
            <Label htmlFor="pii-redaction">Automatically redact PII</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Privacy</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="data-retention" defaultChecked />
            <Label htmlFor="data-retention">Store conversation history</Label>
          </div>
          
          <div>
            <Label htmlFor="retention-period" className="mb-1 block">Data Retention Period</Label>
            <select id="retention-period" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="forever">Forever</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="anonymize-ips" defaultChecked />
            <Label htmlFor="anonymize-ips">Anonymize IP addresses</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">SSL Encryption Enabled</span>
          </div>
          
          <div>
            <Label htmlFor="domain-restriction" className="mb-1 block">Domain Restriction</Label>
            <Textarea 
              id="domain-restriction"
              placeholder="Enter allowed domains separated by commas (leave empty for no restrictions)"
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Restrict chat widget to only appear on specific domains
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="api-key-rotation" />
            <Label htmlFor="api-key-rotation">Auto-rotate API keys every 90 days</Label>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" className="flex items-center">
              <Key className="h-4 w-4 mr-2" /> Manage API Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
