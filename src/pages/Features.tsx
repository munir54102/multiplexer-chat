
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Check, MessageSquare, Code, Bot, Smartphone, Database, Lock, Gauge, Globe, Zap } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
      <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const CheckItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 rounded-full bg-green-100 p-1">
        <Check className="h-4 w-4 text-green-600" />
      </div>
      <span>{children}</span>
    </div>
  );
};

const Features = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Intelligent Conversations</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Our AI-powered platform offers everything you need to create engaging chatbots that work across multiple channels.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/signup">Start Building Your Chatbot</Link>
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a comprehensive set of features to help you build, deploy, and manage intelligent chatbots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="h-6 w-6 text-primary" />}
              title="AI-Powered Conversations"
              description="Advanced natural language processing for human-like conversations that understand context and intent."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-primary" />}
              title="Multi-Channel Support"
              description="Deploy your chatbot across WhatsApp, Facebook, Instagram, and your website with a unified experience."
            />
            <FeatureCard
              icon={<Code className="h-6 w-6 text-primary" />}
              title="No-Code Builder"
              description="Create complex conversation flows with our intuitive visual builder - no coding required."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-primary" />}
              title="Knowledge Base Integration"
              description="Connect your existing documentation, FAQs, and resources to train your chatbot."
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6 text-primary" />}
              title="Enterprise Security"
              description="SOC 2 compliant with end-to-end encryption and advanced data protection measures."
            />
            <FeatureCard
              icon={<Gauge className="h-6 w-6 text-primary" />}
              title="Analytics Dashboard"
              description="Track performance, measure engagement, and gain insights into customer interactions."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Connect to Any Platform</h2>
              <p className="text-gray-600 mb-8">
                Reach your customers wherever they are with seamless integrations across all major messaging platforms and business tools.
              </p>
              
              <div className="space-y-4 mb-8">
                <CheckItem>WhatsApp Business integration</CheckItem>
                <CheckItem>Facebook Messenger & Instagram DMs</CheckItem>
                <CheckItem>Website chat widget customization</CheckItem>
                <CheckItem>Slack, Microsoft Teams, and Discord</CheckItem>
                <CheckItem>Salesforce, HubSpot, and Zendesk</CheckItem>
                <CheckItem>Custom API integrations</CheckItem>
              </div>
              
              <Button asChild>
                <Link to="/dashboard">Explore Integrations</Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-green-100 p-2 mr-3">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp Business</h3>
                    <p className="text-sm text-gray-500">Connect your WhatsApp Business account</p>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Active
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {["Facebook Messenger", "Instagram", "Website Widget", "Slack"].map((platform, index) => (
                    <div key={index} className="flex items-center py-2 border-t border-gray-100">
                      <div className="rounded-full bg-gray-100 p-2 mr-3">
                        <div className="h-5 w-5"></div>
                      </div>
                      <div>
                        <h3 className="font-medium">{platform}</h3>
                        <p className="text-sm text-gray-500">Connect to {platform}</p>
                      </div>
                      <div className="ml-auto">
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Create your first chatbot in minutes and start connecting with your customers in a whole new way.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/signup">Create Your Chatbot</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
