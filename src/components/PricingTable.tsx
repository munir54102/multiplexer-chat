
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingTable = () => {
  const tiers = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small businesses just getting started with chatbots.",
      features: [
        "1 chatbot",
        "1,000 messages/month",
        "Website integration",
        "Basic AI responses",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "For growing businesses ready to scale their customer engagement.",
      features: [
        "5 chatbots",
        "10,000 messages/month",
        "Website & WhatsApp integration",
        "Advanced AI with training",
        "Live agent takeover",
        "Analytics dashboard",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "Custom solutions for large businesses with complex requirements.",
      features: [
        "Unlimited chatbots",
        "50,000 messages/month",
        "All platform integrations",
        "Custom AI training",
        "Advanced analytics",
        "API access",
        "Dedicated support manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {tiers.map((tier) => (
        <div 
          key={tier.name} 
          className={`relative rounded-xl border p-6 ${
            tier.popular 
              ? "border-primary shadow-lg scale-105 z-10 bg-white" 
              : "border-gray-200 bg-white/50"
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <h3 className="text-lg font-semibold">{tier.name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="ml-1 text-sm text-gray-500">{tier.period}</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
          <ul className="mt-6 space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="ml-2 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button 
              className={`w-full ${tier.popular ? "bg-primary" : ""}`} 
              variant={tier.popular ? "default" : "outline"}
              asChild
            >
              <Link to={tier.cta === "Contact Sales" ? "/contact" : "/signup"}>{tier.cta}</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
