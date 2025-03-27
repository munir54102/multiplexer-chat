
import React from "react";
import { Database, Mail, MessageSquare, Zap, Bot } from "lucide-react";
import IntegrationCard from "./IntegrationCard";

const BusinessTools = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Business Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IntegrationCard
          icon={<Database className="h-5 w-5 text-blue-500 mr-2" />}
          title="Salesforce"
          description="Sync contacts and conversations with your Salesforce CRM."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<Mail className="h-5 w-5 text-blue-500 mr-2" />}
          title="Mailchimp"
          description="Add contacts to your Mailchimp lists for email marketing."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<MessageSquare className="h-5 w-5 text-purple-500 mr-2" />}
          title="Slack"
          description="Get notifications in Slack when users engage with your bot."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<Database className="h-5 w-5 text-blue-500 mr-2" />}
          title="HubSpot"
          description="Sync contacts and conversations with your HubSpot CRM."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<Zap className="h-5 w-5 text-orange-500 mr-2" />}
          title="Zapier"
          description="Connect to over 5,000 apps via Zapier automations."
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<Bot className="h-5 w-5 text-gray-500 mr-2" />}
          title="Custom Integration"
          description="Need to connect to a different service? Build a custom integration."
          buttonText="Create"
        />
      </div>
    </div>
  );
};

export default BusinessTools;
