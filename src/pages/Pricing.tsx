
import Layout from "@/components/Layout";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, HelpCircle } from "lucide-react";

const Pricing = () => {
  const enterpriseFeatures = [
    "Unlimited chatbots",
    "Unlimited users",
    "Custom AI model training",
    "Dedicated account manager",
    "24/7 premium support",
    "Custom integrations",
    "Advanced analytics",
    "On-premise deployment options",
    "SLA guarantees",
    "API quota increases"
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Transparent Pricing for Every Business</h1>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for your business needs. All plans include a 14-day free trial.
            </p>
          </div>

          <PricingTable />

          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Enterprise Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    Custom solutions for large organizations with complex requirements.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {enterpriseFeatures.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <Button size="lg" className="shadow-sm" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See a detailed breakdown of what's included in each plan.
            </p>
          </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="grid grid-cols-4 border-b">
              <div className="p-4 border-r font-medium">Features</div>
              <div className="p-4 border-r text-center font-medium">Starter</div>
              <div className="p-4 border-r text-center font-medium">Professional</div>
              <div className="p-4 text-center font-medium">Enterprise</div>
            </div>

            {[
              { name: "Number of chatbots", starter: "1", pro: "5", enterprise: "Unlimited" },
              { name: "Monthly message limit", starter: "1,000", pro: "10,000", enterprise: "50,000+" },
              { name: "Website integration", starter: "Yes", pro: "Yes", enterprise: "Yes" },
              { name: "WhatsApp integration", starter: "No", pro: "Yes", enterprise: "Yes" },
              { name: "Facebook & Instagram", starter: "No", pro: "Yes", enterprise: "Yes" },
              { name: "AI response accuracy", starter: "Standard", pro: "Enhanced", enterprise: "Custom-trained" },
              { name: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
              { name: "Live agent takeover", starter: "No", pro: "Yes", enterprise: "Yes" },
              { name: "Conversation flow builder", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
              { name: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
              { name: "API access", starter: "No", pro: "Limited", enterprise: "Full" },
              { name: "White labeling", starter: "No", pro: "No", enterprise: "Yes" }
            ].map((feature) => (
              <div key={feature.name} className="grid grid-cols-4 border-b">
                <div className="p-4 border-r">{feature.name}</div>
                <div className="p-4 border-r text-center">{feature.starter}</div>
                <div className="p-4 border-r text-center">{feature.pro}</div>
                <div className="p-4 text-center">{feature.enterprise}</div>
              </div>
            ))}

            <div className="grid grid-cols-4 p-4">
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <Button variant="outline" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </div>
              <div className="col-span-1 text-center">
                <Button asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </div>
              <div className="col-span-1 text-center">
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="flex items-center justify-center text-gray-600">
              <HelpCircle className="h-4 w-4 mr-2" />
              Need help choosing a plan? <a href="/contact" className="text-primary font-medium ml-2">Talk to our team</a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <FAQ />
        </div>
      </section>

      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required, no commitments.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
