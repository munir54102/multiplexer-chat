
import { BrainCircuit, MessageSquare, BarChart3, Webhook, Languages, Shield } from "lucide-react";

const AIFeatures = () => {
  const features = [
    {
      title: "Natural Language Processing",
      description: "Our advanced NLP technology enables your chatbot to understand customer intent, even when queries are complex or ambiguous.",
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    },
    {
      title: "Contextual Understanding",
      description: "Maintain conversation context over multiple messages, allowing for natural multi-turn conversations that feel human-like.",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "Sentiment Analysis",
      description: "Detect customer emotions in real-time and adapt responses accordingly, escalating to human agents when necessary.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Custom AI Training",
      description: "Train your AI with your specific product information, FAQs, and brand voice to deliver consistent and accurate responses.",
      icon: <Webhook className="h-10 w-10 text-primary" />,
    },
    {
      title: "Multilingual Support",
      description: "Communicate with customers in over 50 languages with natural translations that preserve meaning and context.",
      icon: <Languages className="h-10 w-10 text-primary" />,
    },
    {
      title: "Privacy & Security",
      description: "Enterprise-grade security ensures customer data is protected, with full GDPR compliance and data encryption.",
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Advanced AI Capabilities</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          MultiplexAI leverages cutting-edge artificial intelligence to create intelligent, helpful, and human-like conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="p-6 border border-gray-200 rounded-xl bg-white/80 hover:shadow-md transition-shadow">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Continuous Learning & Improvement</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our AI models continuously learn from interactions to improve response accuracy over time. With each conversation, your chatbot becomes more effective at understanding your customers' needs and providing helpful solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
