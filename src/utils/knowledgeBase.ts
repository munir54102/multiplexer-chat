
// Mock knowledge base that would be populated from the crawler
export const knowledgeBase = {
  pricing: [
    {
      plan: "Basic",
      price: "$29",
      period: "month",
      features: ["1 chatbot", "1,000 messages/month", "Basic integrations", "Email support"]
    },
    {
      plan: "Professional",
      price: "$79",
      period: "month",
      features: ["3 chatbots", "10,000 messages/month", "All integrations", "Priority support"]
    },
    {
      plan: "Enterprise",
      price: "Custom",
      features: ["Unlimited chatbots", "Unlimited messages", "Custom integrations", "Dedicated support"]
    }
  ],
  features: [
    "Multi-Platform Integration with WhatsApp, Facebook, Instagram, and your website",
    "AI-Powered Responses with context-aware message handling",
    "Visual Flow Builder with drag-and-drop interface",
    "Analytics Dashboard for performance tracking",
    "Live Agent Takeover for complex customer issues",
    "Enterprise-grade security and compliance"
  ],
  faqs: [
    {
      question: "How do I get started?",
      answer: "Sign up for a free account, create your first chatbot, and connect it to your preferred platform."
    },
    {
      question: "Can I customize the chatbot appearance?",
      answer: "Yes, you can fully customize the look and feel of your chatbot to match your brand."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, all plans include a 14-day free trial with no credit card required."
    }
  ]
};
