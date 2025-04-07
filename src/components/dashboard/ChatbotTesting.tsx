
import { useState } from "react";
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

const ChatbotTesting = ({ botName }: ChatbotTestingProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("test");

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
      
      // Simulate a smart response based on the input
      let botResponse = "I understand your question. Let me help you with that!";
      
      const lowercaseInput = inputText.toLowerCase();
      
      if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("price")) {
        botResponse = "Our pricing starts at $29/month for the Basic plan, $79/month for the Professional plan, and custom pricing for Enterprise solutions.";
      } else if (lowercaseInput.includes("help") || lowercaseInput.includes("support")) {
        botResponse = "I'm here to help! You can ask me about our products, services, pricing, or any other questions you might have.";
      } else if (lowercaseInput.includes("feature") || lowercaseInput.includes("can you")) {
        botResponse = "I can help with product information, customer support, lead generation, appointment scheduling, and much more!";
      } else if (lowercaseInput.match(/hi|hello|hey|greetings/i)) {
        botResponse = `Hello there! I'm ${botName}. How can I assist you today?`;
      } 
      
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
