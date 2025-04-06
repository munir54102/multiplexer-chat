
import React from "react";
import { Progress } from "@/components/ui/progress";

const ApiRateLimits = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="font-medium mb-4">API Usage & Limits</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Monthly Quota</div>
          <div className="text-xl font-bold">Unlimited</div>
          <div className="text-xs text-gray-500 mt-1">Free Tier</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Rate Limit</div>
          <div className="text-xl font-bold">100 reqs/min</div>
          <div className="flex items-center mt-2">
            <Progress value={35} className="h-2" />
            <span className="text-xs ml-2">35%</span>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Max Tokens</div>
          <div className="text-xl font-bold">4,096</div>
          <div className="text-xs text-gray-500 mt-1">Per Request</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium mb-1">Current Usage This Month</h5>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">API Calls</div>
                <div className="text-lg font-medium">1,253</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Tokens Used</div>
                <div className="text-lg font-medium">346,712</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h5 className="text-sm font-medium mb-1">Rate Limit Policy</h5>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-1">
            <li>Rate limits are applied per API key</li>
            <li>Exceeded limits will return a 429 Too Many Requests response</li>
            <li>Rate limits reset every minute</li>
          </ul>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-4">
        Need higher limits? <a href="#" className="text-primary font-medium">Contact us</a> for enterprise options.
      </p>
    </div>
  );
};

export default ApiRateLimits;
