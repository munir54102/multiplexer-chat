
import React from "react";

const AnalyticsTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Total Conversations</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Avg. Response Time</h3>
          <p className="text-2xl font-bold">0s</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Resolution Rate</h3>
          <p className="text-2xl font-bold">0%</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500">No analytics data available yet</p>
      </div>
    </div>
  );
};

export default AnalyticsTab;
