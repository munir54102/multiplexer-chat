
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What platforms does MultiplexAI support?",
      answer: "MultiplexAI supports WhatsApp, Facebook Messenger, Instagram, and website chat widgets. We're constantly adding new platforms based on customer demand."
    },
    {
      question: "How does the AI training work?",
      answer: "Our AI models can be trained using your existing customer service data, FAQs, product information, and custom responses. The system learns from each interaction to continuously improve accuracy and relevance."
    },
    {
      question: "Can I customize the chatbot's appearance?",
      answer: "Yes, you can fully customize the chat widget to match your brand's colors, fonts, and style. For messaging platforms like WhatsApp, you can customize the bot's responses and personality."
    },
    {
      question: "What happens when the AI can't answer a question?",
      answer: "You can configure custom fallback responses and escalation paths. The system can automatically transfer complex conversations to human agents, either immediately or after a certain number of unsuccessful responses."
    },
    {
      question: "Is MultiplexAI compliant with privacy regulations?",
      answer: "Yes, MultiplexAI is fully compliant with GDPR, CCPA, and other privacy regulations. We implement end-to-end encryption, data minimization practices, and provide tools for managing user consent and data deletion requests."
    },
    {
      question: "How long does it take to set up a chatbot?",
      answer: "Basic setup can be completed in as little as 15 minutes. More comprehensive implementations with custom training and integrations typically take 1-3 days, depending on the complexity of your requirements."
    },
    {
      question: "Do I need technical knowledge to use MultiplexAI?",
      answer: "No technical knowledge is required for standard implementations. Our platform features a user-friendly interface with drag-and-drop tools for creating conversation flows. For advanced customizations, we offer developer tools and APIs."
    },
    {
      question: "What analytics and reporting features are available?",
      answer: "Our platform provides comprehensive analytics including conversation volumes, resolution rates, common queries, sentiment analysis, and conversion tracking. You can create custom dashboards and export reports in various formats."
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about MultiplexAI's features, pricing, and implementation.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Still have questions? We're here to help.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">View Documentation</Button>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
