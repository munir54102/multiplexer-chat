
import React from "react";
import { Smartphone, MessageSquare, Instagram, Slack, Twitter } from "lucide-react";
import PlatformIntegration from "./PlatformIntegration";

const MessagingPlatforms = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Messaging Platforms</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlatformIntegration
          icon={<Smartphone className="h-5 w-5 text-green-600" />}
          name="WhatsApp"
          description="Connect your WhatsApp Business account to chat with customers directly."
          buttonText="Configure"
          isConnected={true}
          isVerified={true}
        />
        
        <PlatformIntegration
          icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
          name="Facebook Messenger"
          description="Engage with your Facebook audience through Messenger bots."
          buttonText="Connect"
        />
        
        <PlatformIntegration
          icon={<Instagram className="h-5 w-5 text-purple-600" />}
          name="Instagram"
          description="Respond to Instagram DMs and comments with intelligent automation."
          buttonText="Connect"
        />
        
        <PlatformIntegration
          icon={<Slack className="h-5 w-5 text-amber-600" />}
          name="Slack"
          description="Integrate with your Slack workspace for seamless team collaboration."
          buttonText="Connect"
        />
        
        <PlatformIntegration
          icon={<Twitter className="h-5 w-5 text-blue-400" />}
          name="Twitter"
          description="Automate responses to mentions and direct messages on Twitter."
          buttonText="Connect"
        />
      </div>
    </div>
  );
};

export default MessagingPlatforms;
