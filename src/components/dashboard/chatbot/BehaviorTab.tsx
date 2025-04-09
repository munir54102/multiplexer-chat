
import React from "react";
import { CardContent } from "@/components/ui/card";

const BehaviorTab: React.FC = () => {
  return (
    <CardContent>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Chatbot Personality</h3>
          <p className="text-sm text-gray-600">
            This chatbot is configured to be professional, helpful, and knowledgeable about your business.
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Knowledge Base</h3>
          <p className="text-sm text-gray-600">
            Connected to 3 sources: Website content, Product documentation, FAQ section
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Response Style</h3>
          <p className="text-sm text-gray-600">
            Responses are concise, informative, and tailored to your brand voice.
          </p>
        </div>
      </div>
    </CardContent>
  );
};

export default BehaviorTab;
