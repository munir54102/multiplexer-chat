
import React from "react";
import { Copy } from "lucide-react";

const GeneralSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">General Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Agent ID</h3>
          <div className="flex">
            <input 
              type="text" 
              value="Dkkn7kDrggtcMDYtrHkP" 
              disabled
              className="flex-1 border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
            <button className="ml-2 p-2 border border-gray-300 rounded-lg">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Size</h3>
          <p className="text-xl font-medium">68,715 characters</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Name</h3>
          <input 
            type="text" 
            value="MultiplexAI Agent" 
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese (Simplified)</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Timezone</h3>
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>(GMT-05:00) Eastern Time (US & Canada)</option>
            <option>(GMT+00:00) UTC</option>
            <option>(GMT+01:00) Central European Time</option>
            <option>(GMT+08:00) China Standard Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
