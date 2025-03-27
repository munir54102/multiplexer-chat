
import { MessageCircle, Smartphone, Facebook, Instagram, Globe, ArrowRight, Bot, Code, Database, Link, Zap, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlatformIntegrations = () => {
  const platforms = [
    {
      name: "WhatsApp",
      icon: <Smartphone className="h-12 w-12 text-green-500" />,
      description: "Connect with the 2 billion+ users on WhatsApp. Send rich media, automated responses, and provide personalized customer support.",
      features: ["Rich media messages", "End-to-end encryption", "Business verified account", "Quick replies", "Customer segmentation"],
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700"
    },
    {
      name: "Facebook Messenger",
      icon: <Facebook className="h-12 w-12 text-blue-600" />,
      description: "Engage with your Facebook audience through Messenger bots that can answer questions, collect leads, and drive sales conversions.",
      features: ["Automated responses", "Comment-to-message", "Customer targeting", "Retargeting campaigns", "Lead generation"],
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700"
    },
    {
      name: "Instagram DM",
      icon: <Instagram className="h-12 w-12 text-purple-600" />,
      description: "Respond to Instagram DMs and comments with intelligent automation that maintains your brand voice and aesthetic.",
      features: ["Story mentions", "Comment replies", "Post interactions", "Influencer management", "Visual product showcase"],
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700"
    },
    {
      name: "Website Chat",
      icon: <MessageCircle className="h-12 w-12 text-indigo-600" />,
      description: "Add a customizable chat widget to your website that intelligently routes conversations and provides instant answers.",
      features: ["Custom styling", "Targeted messages", "Visitor analytics", "Form integration", "Live chat handover"],
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-700"
    }
  ];

  const advancedIntegrations = [
    {
      name: "CRM Connections",
      icon: <Database className="h-10 w-10 text-blue-600" />,
      description: "Integrate with popular CRM systems to sync contacts, conversations, and leads.",
      items: ["Salesforce", "HubSpot", "Zoho", "Microsoft Dynamics", "Pipedrive"]
    },
    {
      name: "AI Enhancement",
      icon: <Bot className="h-10 w-10 text-purple-600" />,
      description: "Connect with external AI services to enhance your bot's capabilities.",
      items: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Custom Models", "Voice Analysis"]
    },
    {
      name: "Marketing Tools",
      icon: <Zap className="h-10 w-10 text-orange-600" />,
      description: "Connect with marketing platforms to streamline your campaigns.",
      items: ["Mailchimp", "SendGrid", "Marketo", "Constant Contact", "Campaign Monitor"]
    },
    {
      name: "Knowledge Sources",
      icon: <Link className="h-10 w-10 text-green-600" />,
      description: "Import knowledge from various sources to train your AI.",
      items: ["SharePoint", "Google Drive", "Notion", "Confluence", "Website Crawler"]
    },
    {
      name: "Workflow Automation",
      icon: <Webhook className="h-10 w-10 text-indigo-600" />,
      description: "Create powerful automations with webhooks and integrations.",
      items: ["Zapier", "Make (Integromat)", "n8n", "Tray.io", "Custom Webhooks"]
    },
    {
      name: "Developer APIs",
      icon: <Code className="h-10 w-10 text-gray-600" />,
      description: "Build custom integrations with our comprehensive API.",
      items: ["REST API", "WebSockets", "SDKs", "Authentication", "Rate Limits"]
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Connect Across Every Channel</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Detailed breakdown of our platform integrations and how they can transform your customer engagement strategy.
        </p>
      </div>

      <div className="space-y-8">
        {platforms.map((platform, index) => (
          <div 
            key={platform.name} 
            className={`rounded-xl border p-6 ${platform.color} flex flex-col md:flex-row gap-6`}
          >
            <div className="md:w-1/3">
              <div className="flex items-center mb-4">
                {platform.icon}
                <h3 className={`text-xl font-bold ml-3 ${platform.textColor}`}>{platform.name}</h3>
              </div>
              <p className="text-gray-700">{platform.description}</p>
              <Button variant="outline" className="mt-4 group">
                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-semibold mb-4">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platform.features.map((feature) => (
                  <div key={feature} className="bg-white/80 rounded-lg p-3 border border-gray-100">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Advanced Integration Ecosystem</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect with your existing tech stack to create a seamless workflow and enhance your AI capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedIntegrations.map((integration) => (
            <Card key={integration.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {integration.icon}
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{integration.description}</p>
                <div className="flex flex-wrap gap-2">
                  {integration.items.map((item) => (
                    <span key={item} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformIntegrations;
