
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PricingTable = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const { toast } = useToast();

  const tiers = [
    {
      name: "Monthly",
      originalPrice: "$10",
      price: "$10",
      period: "per month",
      description: "Perfect for small businesses just getting started with chatbots.",
      features: [
        "10 chatbots",
        "Unlimited messages",
        "All platform integrations",
        "Custom AI training",
        "Advanced analytics",
        "API access",
        "Website integration",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Semi-Annual",
      originalPrice: "$45",
      price: "$45",
      period: "for six months",
      description: "For growing businesses ready to scale their customer engagement.",
      features: [
        "10 chatbots",
        "Unlimited messages",
        "All platform integrations",
        "Custom AI training",
        "Advanced analytics",
        "API access",
        "Website & WhatsApp integration",
        "Live agent takeover",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Annual",
      originalPrice: "$80",
      price: "$80",
      period: "per year",
      description: "Custom solutions for large businesses with complex requirements.",
      features: [
        "10 chatbots",
        "Unlimited messages",
        "All platform integrations",
        "Custom AI training",
        "Advanced analytics",
        "API access",
        "Dedicated support manager",
        "Custom integrations",
        "SLA guarantees"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const applyDiscount = () => {
    // Check for valid discount codes
    if (discountCode.toLowerCase() === "munir70") {
      const newTiers = tiers.map(tier => {
        const originalPrice = parseInt(tier.originalPrice.substring(1));
        const discountedPrice = originalPrice * 0.3; // 70% off
        return {
          ...tier,
          price: `$${discountedPrice}`
        };
      });
      
      // Update state
      setDiscountApplied(true);
      setDiscountPercentage(70);
      
      // Show toast notification
      toast({
        title: "Discount applied!",
        description: "Your 70% discount has been applied to all plans.",
      });
    } else {
      // Invalid discount code
      toast({
        variant: "destructive",
        title: "Invalid discount code",
        description: "Please enter a valid discount code.",
      });
    }
  };

  return (
    <div className="relative">
      {!discountApplied && (
        <div className="absolute -top-14 left-0 right-0 bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center font-medium">
          Use code <span className="font-bold">MUNIR70</span> for 70% OFF any plan!
        </div>
      )}
      
      {discountApplied && (
        <div className="absolute -top-14 left-0 right-0 bg-green-100 text-green-800 p-3 rounded-lg text-center font-medium">
          Your {discountPercentage}% discount has been applied!
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={applyDiscount} disabled={discountApplied}>
            Apply
          </Button>
        </div>
      </div>
      
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
              {discountApplied && (
                <span className="line-through text-gray-400 text-lg mr-2">{tier.originalPrice}</span>
              )}
              <span className="text-3xl font-bold">{discountApplied ? tier.price : tier.originalPrice}</span>
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
    </div>
  );
};

export default PricingTable;
