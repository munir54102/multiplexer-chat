
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AppearanceTab: React.FC = () => {
  return (
    <CardContent>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Theme Colors</h3>
          <div className="flex space-x-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            <div className="w-8 h-8 rounded-full bg-white border"></div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Chat Window Style</h3>
          <p className="text-sm text-gray-600">
            Modern, rounded corners, with subtle shadows and brand colors
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Avatar</h3>
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 p-1 bg-primary text-white rounded-full" />
            <span className="text-sm text-gray-600">Default robot avatar</span>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default AppearanceTab;
