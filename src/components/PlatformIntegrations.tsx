
import { MessageCircle, Smartphone, Facebook, Instagram, Globe, ArrowRight, Bot, Code, Database, Link, Zap, Webhook, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlatformConnectionTutorial from "./PlatformConnectionTutorial";

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

  const eCommerceIntegrations = [
    {
      name: "WooCommerce",
      icon: <ShoppingCart className="h-10 w-10 text-purple-600" />,
      description: "Sell products directly through your chatbot with WooCommerce integration.",
      features: ["Product catalog sync", "Inventory management", "Order processing", "Payment collection", "Shopping cart recovery"]
    },
    {
      name: "Shopify",
      icon: <ShoppingCart className="h-10 w-10 text-green-600" />,
      description: "Connect your Shopify store for seamless e-commerce capabilities.",
      features: ["Product recommendations", "Abandoned cart recovery", "Order tracking", "Upsell opportunities", "Customer reengagement"]
    },
    {
      name: "Magento",
      icon: <ShoppingCart className="h-10 w-10 text-orange-600" />,
      description: "Integrate with Magento to create powerful e-commerce chatbots.",
      features: ["B2B capabilities", "Enterprise features", "Complex catalog management", "Custom pricing rules", "Multi-store support"]
    },
    {
      name: "BigCommerce",
      icon: <ShoppingCart className="h-10 w-10 text-blue-600" />,
      description: "Link your BigCommerce store for advanced selling features.",
      features: ["Omnichannel selling", "Inventory sync", "Customer data import", "Custom checkout experiences", "Headless commerce"]
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

      <Tabs defaultValue="messaging" className="mb-16">
        <TabsList className="w-full flex justify-center mb-8">
          <TabsTrigger value="messaging">Messaging Platforms</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Integrations</TabsTrigger>
          <TabsTrigger value="tutorial">Integration Tutorial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messaging">
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
        </TabsContent>
        
        <TabsContent value="ecommerce">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Sell Products Through Your Chatbot</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect your e-commerce platform to enable AI-powered product recommendations, 
                order tracking, and seamless checkout experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eCommerceIntegrations.map((platform) => (
                <Card key={platform.name} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 bg-gray-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg">
                        {platform.icon}
                      </div>
                      <CardTitle>{platform.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 mb-4">{platform.description}</p>
                    <h4 className="font-medium mb-2">Features</h4>
                    <div className="space-y-2">
                      {platform.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4">
                      Connect {platform.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg mb-2">Boost Sales with AI-Powered Conversations</h4>
                  <p className="text-gray-700 mb-4">
                    Our e-commerce integrations go beyond basic product listings. The AI can understand 
                    customer preferences, make personalized recommendations, and guide users through the 
                    entire buying process.
                  </p>
                  <Button>
                    Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
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
        </TabsContent>
        
        <TabsContent value="tutorial">
          <PlatformConnectionTutorial />
        </TabsContent>
      </Tabs>

      <div className="text-center mt-12">
        <Button size="lg" className="px-8">
          Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PlatformIntegrations;
