
import { useState, useEffect } from "react";
import { Bot, Send, User, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatbotTestingProps {
  botName: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
}

// Mock knowledge base that would be populated from the crawler
const knowledgeBase = {
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

const ChatbotTesting = ({ botName }: ChatbotTestingProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("test");

  const generateResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for pricing related queries
    if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("price") || 
        lowercaseInput.includes("plan") || lowercaseInput.includes("subscription")) {
      let response = "We offer the following plans:\n\n";
      
      knowledgeBase.pricing.forEach(plan => {
        response += `• ${plan.plan}: ${plan.price}${plan.period ? '/' + plan.period : ''}\n`;
        response += `  Top features: ${plan.features.slice(0, 2).join(", ")}\n\n`;
      });
      
      response += "Would you like more details about a specific plan?";
      return response;
    }
    
    // Check for feature related queries
    if (lowercaseInput.includes("feature") || lowercaseInput.includes("capability") || 
        lowercaseInput.includes("can you") || lowercaseInput.includes("what can")) {
      let response = "Our platform offers these key features:\n\n";
      
      knowledgeBase.features.slice(0, 4).forEach(feature => {
        response += `• ${feature}\n`;
      });
      
      if (knowledgeBase.features.length > 4) {
        response += "And more! Which feature would you like to learn more about?";
      }
      
      return response;
    }

    // Check for specific feature inquiries
    if (lowercaseInput.includes("whatsapp") || lowercaseInput.includes("facebook") || 
        lowercaseInput.includes("instagram") || lowercaseInput.includes("integration")) {
      return "Our Multi-Platform Integration allows you to connect your chatbot to WhatsApp, Facebook Messenger, Instagram, and your website with seamless integration. This means your customers can reach you on their preferred platform while you manage all conversations from a single dashboard.";
    }
    
    if (lowercaseInput.includes("analytics") || lowercaseInput.includes("dashboard") || 
        lowercaseInput.includes("tracking") || lowercaseInput.includes("report")) {
      return "Our Analytics Dashboard provides comprehensive insights into your chatbot's performance. You can track metrics like conversation volume, resolution rate, popular topics, user satisfaction, and conversion rates. This data helps you optimize your chatbot for better customer engagement and business outcomes.";
    }
    
    // Check for FAQ related queries
    if (lowercaseInput.includes("faq") || lowercaseInput.includes("question") || 
        lowercaseInput.includes("how do i") || lowercaseInput.includes("trial")) {
      // Find a relevant FAQ
      for (const faq of knowledgeBase.faqs) {
        const questionLower = faq.question.toLowerCase();
        if (lowercaseInput.includes(questionLower.substring(0, 5)) || 
            questionLower.includes(lowercaseInput.substring(0, 5))) {
          return faq.answer;
        }
      }
    }
    
    // Greetings
    if (lowercaseInput.match(/hi|hello|hey|greetings/i)) {
      return `Hello there! I'm ${botName}. How can I assist you today?`;
    }
    
    // Help or support
    if (lowercaseInput.includes("help") || lowercaseInput.includes("support")) {
      return "I'm here to help! You can ask me about our products, pricing plans, features, or how to get started. What would you like to know?";
    }
    
    // Default response
    return "I understand you're asking about " + userInput + ". Could you please provide more details so I can give you the most accurate information?";
  };

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
      const botResponse = generateResponse(inputText);
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, sender: "bot" }]);
    }, 1500);
  };

  const resetConversation = () => {
    setMessages([
      { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot" }
    ]);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Test Your Chatbot</CardTitle>
            <CardDescription>See how your chatbot will respond to user queries</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Active
          </Badge>
        </div>
      </CardHeader>
      <Tabs defaultValue="test" value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-4 pb-0">
          <TabsList className="mb-4">
            <TabsTrigger value="test">Test Chat</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
        </CardContent>
        
        <TabsContent value="test">
          <CardContent className="py-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">{botName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={resetConversation}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
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
                        {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />}
                        <p>{message.text}</p>
                        {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0" />}
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
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask a question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="behavior">
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Chatbot Personality</h3>
                <p className="text-sm text-gray-600">
                  This chatbot is configured to be professional, helpful, and knowledgeable about your business.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Knowledge Base</h3>
                <p className="text-sm text-gray-600">
                  Connected to 3 sources: Website content, Product documentation, FAQ section
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Response Style</h3>
                <p className="text-sm text-gray-600">
                  Responses are concise, informative, and tailored to your brand voice.
                </p>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="appearance">
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Theme Colors</h3>
                <div className="flex space-x-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                  <div className="w-8 h-8 rounded-full bg-white border"></div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Chat Window Style</h3>
                <p className="text-sm text-gray-600">
                  Modern, rounded corners, with subtle shadows and brand colors
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Avatar</h3>
                <div className="flex items-center space-x-3">
                  <Bot className="h-8 w-8 p-1 bg-primary text-white rounded-full" />
                  <span className="text-sm text-gray-600">Default robot avatar</span>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ChatbotTesting;
