
import React from "react";
import { Button } from "@/components/ui/button";

const PlaygroundTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Playground</h2>
        <Button variant="outline" size="sm">Compare</Button>
      </div>
      <div className="mt-6 border border-gray-200 rounded-lg p-6 min-h-[400px] bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 mb-auto mt-16">
          <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
            Hi! What can I help you with?
          </div>
          <div className="flex mt-auto">
            <input 
              type="text" 
              placeholder="Message..." 
              className="flex-1 p-2 border border-gray-200 rounded-l-lg focus:outline-none" 
            />
            <button className="bg-primary text-white p-2 rounded-r-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundTab;
