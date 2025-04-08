
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Check, ExternalLink, ChevronRight, ArrowRight, Copy, Share2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MultiLanguageChatDemo from "@/components/MultiLanguageChatDemo";

interface SetupCompleteScreenProps {
  onBackToEmbed?: () => void;
  chatbotName?: string;
}

const SetupCompleteScreen = ({ onBackToEmbed, chatbotName = "Customer Support Bot" }: SetupCompleteScreenProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleCopy = (content: string, label: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`
    });
  };
  
  const chatbotEmbedCode = `<script>
  (function(d,t) {
    var g=d.createElement(t),
    s=d.getElementsByTagName(t)[0];
    g.src="https://multiplexai.com/widget/chat.js";
    g.defer=true;
    g.async=true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.multiplexAI.init({
        botId: "YOUR_BOT_ID"
      })
    }
  })(document,"script");
</script>`;

  const featuresList = [
    "Website Chat Integration",
    "Multi-Platform Support",
    "Lead Capture Forms",
    "Knowledge Base Integration", 
    "Multi-Language Support",
    "A/B Testing Capability",
    "Analytics Dashboard",
    "Team Collaboration",
    "Voice Input/Output",
    "Customizable Appearance"
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border-green-200 shadow-sm">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Setup Complete!</CardTitle>
              </div>
              <CardDescription>
                Your chatbot <span className="font-medium">{chatbotName}</span> is now live and ready to use.
              </CardDescription>
            </div>
            {onBackToEmbed && (
              <Button variant="outline" size="sm" onClick={onBackToEmbed}>
                Back to Embed
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="test">Test Chatbot</TabsTrigger>
              <TabsTrigger value="next">Next Steps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Chatbot Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Name</span>
                      <span className="font-medium">{chatbotName}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Status</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium">Customer Support</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Created</span>
                      <span className="font-medium">April 8, 2025</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Features Enabled</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featuresList.map((feature, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Embed Code</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                    <pre>{chatbotEmbedCode}</pre>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleCopy(chatbotEmbedCode, "Embed code")}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy Code
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setActiveTab("test")}
                    >
                      <Bot className="mr-2 h-4 w-4" /> Test Chatbot
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" /> Customize Appearance
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <Share2 className="mr-2 h-4 w-4" /> Share With Team
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" /> View Documentation
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="test">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Test Your Chatbot</h3>
                  <p className="text-gray-600 mb-4">
                    Interact with your chatbot to test its responses and behavior. Try asking about your products, services, or common questions.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium">Suggested Test Questions:</h4>
                    <ul className="space-y-2 ml-5 list-disc text-gray-600">
                      <li>What products do you offer?</li>
                      <li>How can I contact support?</li>
                      <li>What are your business hours?</li>
                      <li>Do you offer discounts?</li>
                      <li>How do I reset my password?</li>
                    </ul>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("next")}>
                    Continue to Next Steps <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <MultiLanguageChatDemo 
                  botName={chatbotName}
                  showLanguageSelector={true}
                  voiceEnabled={true}
                  customizable={true}
                  bubbleStyle="modern"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="next" className="space-y-6">
              <h3 className="text-lg font-medium mb-3">Recommended Next Steps</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Customize Your Chatbot</CardTitle>
                    <CardDescription>Personalize the look and feel to match your brand</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Open Settings <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Add More Knowledge</CardTitle>
                    <CardDescription>Expand your chatbot's knowledge base</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Sources <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Set Up Analytics</CardTitle>
                    <CardDescription>Track performance and user interactions</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Configure Analytics <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Create A/B Test</CardTitle>
                    <CardDescription>Test different versions of your chatbot</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start Testing <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Invite Team Members</CardTitle>
                    <CardDescription>Collaborate with your team</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Team <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Explore Integrations</CardTitle>
                    <CardDescription>Connect with other business tools</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Integrations <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button onClick={() => window.location.href = "/dashboard"}>
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupCompleteScreen;
