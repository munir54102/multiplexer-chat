
import React from "react";
import { Link, Database } from "lucide-react";
import IntegrationCard from "./IntegrationCard";

const KnowledgeBases = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Knowledge Bases</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IntegrationCard
          icon={<Link className="h-5 w-5 text-blue-500 mr-2" />}
          title="Website Crawler"
          description="Index your website content to improve AI responses."
          buttonText="Configure"
        />
        
        <IntegrationCard
          icon={<Database className="h-5 w-5 text-blue-500 mr-2" />}
          title="Google Drive"
          description="Train your AI on documents stored in Google Drive."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<Database className="h-5 w-5 text-blue-500 mr-2" />}
          title="SharePoint"
          description="Connect to Microsoft SharePoint to train your AI."
          buttonText="Connect"
        />
      </div>
    </div>
  );
};

export default KnowledgeBases;
