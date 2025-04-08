
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Info, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Knowledge base for the MultiplexAI Assistant
const knowledgeBase = {
  // Website & Services
  website: {
    about: "MultiplexAI is a leading AI-powered chatbot platform that helps businesses connect with customers across multiple channels including websites, WhatsApp, Facebook, and Instagram.",
    features: "Our platform offers multi-platform integration, AI-powered responses, visual flow builder, analytics dashboard, live agent takeover, and enterprise-grade security.",
    benefits: "With MultiplexAI, you can increase customer engagement, reduce support costs, generate leads 24/7, and provide consistent customer experiences across all platforms."
  },
  
  // Pricing Information
  pricing: {
    starter: "The Starter plan costs $29/month and includes 1,000 messages, 1 chatbot, website integration, and email support.",
    professional: "The Professional plan costs $79/month and includes 5,000 messages, 3 chatbots, all integrations, analytics, and priority support.",
    enterprise: "The Enterprise plan has custom pricing based on your needs and includes unlimited messages, unlimited chatbots, dedicated support, custom integrations, and advanced analytics.",
    trial: "We offer a 14-day free trial for all plans with no credit card required."
  },
  
  // Integrations
  integrations: {
    website: "Our website integration is simple with just a code snippet to add to your site. It works with all major platforms including WordPress, Shopify, Wix, and custom websites.",
    whatsapp: "Connect your WhatsApp Business account to respond to customer messages automatically. Our platform is an official WhatsApp Business Solution Provider.",
    facebook: "Integrate with Facebook Messenger to handle customer inquiries through your Facebook business page.",
    instagram: "Connect to Instagram DMs to automate responses and engage with customers through Instagram direct messages.",
    zapier: "Connect to 3,000+ apps through our Zapier integration to automate workflows and data syncing."
  },
  
  // FAQ
  faq: {
    setup: "Getting started is easy. Sign up, create your first chatbot, add your knowledge base, and connect to your preferred platforms. Our onboarding wizard will guide you through each step.",
    dataPrivacy: "We take data privacy seriously. All data is encrypted, and we are compliant with GDPR, CCPA, and other privacy regulations. Your data belongs to you and is never shared.",
    customization: "Yes, you can fully customize the appearance of your chatbot to match your brand, including colors, fonts, and chat bubble style.",
    languages: "MultiplexAI supports over 50 languages, allowing you to serve customers worldwide with multilingual chatbots.",
    training: "Training your AI is simple using our intuitive interface. Upload documents, connect to your website, or create Q&A pairs to build your chatbot's knowledge base."
  },
  
  // Support
  support: {
    contact: "Our support team is available via email at support@multiplexai.com. Professional and Enterprise plans include priority support.",
    hours: "Support hours are Monday to Friday, 9am to 6pm EST. Enterprise customers get 24/7 support.",
    documentation: "Comprehensive documentation is available at docs.multiplexai.com with step-by-step guides and video tutorials."
  }
};

const LiveChatDemo = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm the MultiplexAI Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputText, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputText("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Process the message to find a relevant response
      const botResponse = generateResponse(inputText);
      
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const generateResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    // Website & company information
    if (lowercaseInput.includes("what is multiplexai") || lowercaseInput.includes("about your company") || lowercaseInput.includes("about multiplexai")) {
      return knowledgeBase.website.about;
    }
    
    // Features
    if (lowercaseInput.includes("features") || lowercaseInput.includes("what can you do") || lowercaseInput.includes("capabilities")) {
      return knowledgeBase.website.features;
    }
    
    // Benefits
    if (lowercaseInput.includes("benefits") || lowercaseInput.includes("why should i use") || lowercaseInput.includes("advantages")) {
      return knowledgeBase.website.benefits;
    }
    
    // Pricing - general
    if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("how much") || lowercaseInput.includes("price")) {
      if (lowercaseInput.includes("starter") || lowercaseInput.includes("basic")) {
        return knowledgeBase.pricing.starter;
      } else if (lowercaseInput.includes("professional") || lowercaseInput.includes("pro")) {
        return knowledgeBase.pricing.professional;
      } else if (lowercaseInput.includes("enterprise") || lowercaseInput.includes("business")) {
        return knowledgeBase.pricing.enterprise;
      } else {
        return `We offer three plans: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). All plans come with a 14-day free trial. Would you like more details about a specific plan?`;
      }
    }
    
    // Free trial
    if (lowercaseInput.includes("free trial") || lowercaseInput.includes("try before") || (lowercaseInput.includes("try") && lowercaseInput.includes("free"))) {
      return knowledgeBase.pricing.trial;
    }
    
    // Integrations - general
    if (lowercaseInput.includes("integration") || lowercaseInput.includes("connect") || lowercaseInput.includes("platform")) {
      if (lowercaseInput.includes("website")) {
        return knowledgeBase.integrations.website;
      } else if (lowercaseInput.includes("whatsapp")) {
        return knowledgeBase.integrations.whatsapp;
      } else if (lowercaseInput.includes("facebook") || lowercaseInput.includes("messenger")) {
        return knowledgeBase.integrations.facebook;
      } else if (lowercaseInput.includes("instagram") || lowercaseInput.includes("ig")) {
        return knowledgeBase.integrations.instagram;
      } else if (lowercaseInput.includes("zapier")) {
        return knowledgeBase.integrations.zapier;
      } else {
        return `MultiplexAI integrates with websites, WhatsApp, Facebook Messenger, Instagram, and 3,000+ apps via Zapier. Which integration would you like to know more about?`;
      }
    }
    
    // FAQ
    if (lowercaseInput.includes("how to start") || lowercaseInput.includes("getting started") || lowercaseInput.includes("setup") || lowercaseInput.includes("set up")) {
      return knowledgeBase.faq.setup;
    }
    
    if (lowercaseInput.includes("data") && (lowercaseInput.includes("privacy") || lowercaseInput.includes("secure") || lowercaseInput.includes("protection"))) {
      return knowledgeBase.faq.dataPrivacy;
    }
    
    if (lowercaseInput.includes("customize") || lowercaseInput.includes("customization") || lowercaseInput.includes("brand") || lowercaseInput.includes("design")) {
      return knowledgeBase.faq.customization;
    }
    
    if (lowercaseInput.includes("language") || lowercaseInput.includes("multilingual") || lowercaseInput.includes("translate")) {
      return knowledgeBase.faq.languages;
    }
    
    if (lowercaseInput.includes("train") || lowercaseInput.includes("learning") || lowercaseInput.includes("teach") || 
        (lowercaseInput.includes("improve") && lowercaseInput.includes("ai"))) {
      return knowledgeBase.faq.training;
    }
    
    // Support
    if (lowercaseInput.includes("support") || lowercaseInput.includes("help") || lowercaseInput.includes("contact") || lowercaseInput.includes("assistance")) {
      if (lowercaseInput.includes("contact") || lowercaseInput.includes("email") || lowercaseInput.includes("phone")) {
        return knowledgeBase.support.contact;
      } else if (lowercaseInput.includes("hours") || lowercaseInput.includes("available") || lowercaseInput.includes("when")) {
        return knowledgeBase.support.hours;
      } else if (lowercaseInput.includes("documentation") || lowercaseInput.includes("docs") || lowercaseInput.includes("guides")) {
        return knowledgeBase.support.documentation;
      } else {
        return `Our support team is available via email at support@multiplexai.com. You can also check our documentation at docs.multiplexai.com for self-help resources. How can we assist you today?`;
      }
    }
    
    // Greetings
    if (lowercaseInput.match(/hi|hello|hey|greetings/i)) {
      return "Hello there! I'm the MultiplexAI Assistant. I can help you with information about our services, pricing, integrations, and more. What would you like to know?";
    }
    
    // Farewell
    if (lowercaseInput.match(/bye|goodbye|see you|farewell/i)) {
      return "Thank you for chatting with me today! If you have any more questions, feel free to return anytime. Have a great day!";
    }
    
    // Thank you
    if (lowercaseInput.match(/thank you|thanks|appreciate it/i)) {
      return "You're welcome! I'm happy to help. Is there anything else you'd like to know about MultiplexAI?";
    }
    
    // Default fallback response
    return "I understand you're asking about " + input.split(' ').slice(0, 3).join(' ') + "... To give you the most accurate information, could you please rephrase your question or specify what aspect you're interested in? I can provide details about our features, pricing, integrations, or getting started.";
  };

  const resetConversation = () => {
    setMessages([
      { id: 1, text: "Hello! I'm the MultiplexAI Assistant. How can I help you today?", sender: "bot" }
    ]);
  };

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white flex flex-col h-[500px]">
      <div className="bg-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-medium">MultiplexAI Demo Bot</h3>
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-primary-700" onClick={resetConversation}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-primary-700">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ask about pricing, features, integrations, or getting started</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`
              max-w-[80%] rounded-lg p-3 
              ${message.sender === 'bot' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-primary text-white'
              }
            `}>
              <div className="flex items-start">
                {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-1" />}
                <p>{message.text}</p>
                {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-1" />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 flex gap-2">
        <Input
          placeholder="Ask about our features, pricing, integrations..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LiveChatDemo;
