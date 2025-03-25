
import { MessageCircle, Smartphone, Facebook, Instagram, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    </div>
  );
};

export default PlatformIntegrations;
