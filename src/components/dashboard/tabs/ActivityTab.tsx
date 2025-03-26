
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Filter, Download } from "lucide-react";

const ActivityTab = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <h2 className="text-xl font-semibold">Chat logs</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No chats found</p>
      </div>
    </div>
  );
};

export default ActivityTab;
