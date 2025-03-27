
import React from "react";

const ApiRateLimits = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="font-medium mb-2">Rate Limits</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Monthly Quota</div>
          <div className="text-xl font-bold">Unlimited</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Rate Limit</div>
          <div className="text-xl font-bold">100 reqs/min</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-500">Max Tokens</div>
          <div className="text-xl font-bold">4,096</div>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Need higher limits? <a href="#" className="text-primary font-medium">Contact us</a> for enterprise options.
      </p>
    </div>
  );
};

export default ApiRateLimits;
