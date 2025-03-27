
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import IntegrationCard from "./IntegrationCard";

const MessagingPlatforms = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Messaging Platforms</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IntegrationCard
          icon={<Smartphone className="h-5 w-5 text-green-600 mr-2" />}
          title="WhatsApp"
          description="Connect your WhatsApp Business account to chat with customers directly."
          status="Active"
          statusColor="green"
          buttonText="Configure"
        />
        
        <IntegrationCard
          icon={<MessageSquare className="h-5 w-5 text-blue-600 mr-2" />}
          title="Facebook Messenger"
          description="Engage with your Facebook audience through Messenger bots."
          status="Not Connected"
          statusColor="gray"
          buttonText="Connect"
        />
        
        <IntegrationCard
          icon={<MessageSquare className="h-5 w-5 text-purple-600 mr-2" />}
          title="Instagram"
          description="Respond to Instagram DMs and comments with intelligent automation."
          status="Not Connected"
          statusColor="gray"
          buttonText="Connect"
        />
      </div>
    </div>
  );
};

export default MessagingPlatforms;
