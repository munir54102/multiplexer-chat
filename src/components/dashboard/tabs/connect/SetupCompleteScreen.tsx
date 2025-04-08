
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check, CheckCircle, MessageSquare, Bot, Zap, Globe, Upload,
  Copy, ChevronLeft, Share2, Download, Settings, BarChart3, Users,
  FileText, Headphones, Languages, Mic, Volume2, PieChart, 
  Shield, BarChart, Bell, Briefcase, Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SetupCompleteScreenProps {
  onBackToEmbed?: () => void;
}

const SetupCompleteScreen = ({ onBackToEmbed }: SetupCompleteScreenProps) => {
  const { toast } = useToast();
  
  const handlePublish = () => {
    toast({
      title: "Publishing chatbot",
      description: "Your chatbot is being published. This may take a few moments."
    });
    
    // Simulate publishing process
    setTimeout(() => {
      toast({
        title: "Chatbot published!",
        description: "Your chatbot is now live and ready to use."
      });
    }, 2000);
  };

  const handleShareChatbot = () => {
    navigator.clipboard.writeText("https://multiplexai.com/chat/YOUR_BOT_ID");
    toast({
      title: "Link copied!",
      description: "Shareable link has been copied to clipboard"
    });
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      {onBackToEmbed && (
        <Button 
          variant="ghost" 
          onClick={onBackToEmbed} 
          className="mb-4"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Embed Options
        </Button>
      )}
      
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Chatbot Setup is Complete!</h2>
        <p className="text-gray-600 max-w-md">
          Congratulations! Your AI chatbot has been successfully configured and is ready to be published.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Setup Progress</span>
          <span className="text-sm font-medium">100%</span>
        </div>
        <Progress value={100} className="h-2" />
        <div className="flex justify-between mt-4 text-sm">
          {["Create", "Build", "Connect"].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <span className="mt-1">{step}</span>
            </div>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Create",
                description: "Name your chatbot and define its purpose",
                icon: Bot,
                status: "Complete"
              },
              {
                title: "Build",
                description: "Add knowledge from files, websites, or custom text",
                icon: Zap,
                status: "Complete"
              },
              {
                title: "Connect",
                description: "Deploy your chatbot to your website or other platforms",
                icon: Globe,
                status: "Complete"
              }
            ].map((step, index) => (
              <Card key={index} className="bg-gray-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="flex items-center text-base">
                    {index + 1}. {step.title}
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {step.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" size="sm">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="share">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Share Your Chatbot</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Direct Link</h4>
                <div className="flex gap-2">
                  <Input value="https://multiplexai.com/chat/YOUR_BOT_ID" readOnly className="flex-1" />
                  <Button variant="outline" onClick={handleShareChatbot}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Share on Social Media</h4>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" /> Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" /> Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" /> LinkedIn
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">QR Code</h4>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    QR Code
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Download QR Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { 
                title: "Analytics Dashboard", 
                description: "Track chatbot performance and user engagement", 
                icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
                status: "Available"
              },
              { 
                title: "Multi-language Support", 
                description: "Communicate with users in their preferred language", 
                icon: <Languages className="h-5 w-5 text-purple-500" />,
                status: "Available"
              },
              { 
                title: "Voice Capabilities", 
                description: "Enable speech input and output for your chatbot", 
                icon: <Mic className="h-5 w-5 text-green-500" />,
                status: "Available"
              },
              { 
                title: "Sentiment Analysis", 
                description: "Understand the emotional tone of user messages", 
                icon: <PieChart className="h-5 w-5 text-amber-500" />,
                status: "Available"
              },
              { 
                title: "A/B Testing", 
                description: "Test different responses to optimize effectiveness", 
                icon: <BarChart className="h-5 w-5 text-indigo-500" />,
                status: "Available"
              },
              { 
                title: "Document Processing", 
                description: "Extract information from uploaded documents", 
                icon: <FileText className="h-5 w-5 text-red-500" />,
                status: "Available"
              },
              { 
                title: "Custom Domain", 
                description: "Host your chatbot on your own domain", 
                icon: <Globe className="h-5 w-5 text-blue-600" />,
                status: "Premium"
              },
              { 
                title: "Team Collaboration", 
                description: "Work together with your team on chatbot development", 
                icon: <Users className="h-5 w-5 text-green-600" />,
                status: "Premium"
              },
              { 
                title: "Advanced Security", 
                description: "Enterprise-grade security for sensitive data", 
                icon: <Shield className="h-5 w-5 text-purple-600" />,
                status: "Premium"
              },
              { 
                title: "Scheduling", 
                description: "Allow users to book appointments through your chatbot", 
                icon: <Calendar className="h-5 w-5 text-orange-500" />,
                status: "Premium"
              },
              { 
                title: "CRM Integration", 
                description: "Connect your chatbot to your CRM system", 
                icon: <Briefcase className="h-5 w-5 text-gray-700" />,
                status: "Premium"
              },
              { 
                title: "Custom Notifications", 
                description: "Set up alerts for important chatbot events", 
                icon: <Bell className="h-5 w-5 text-yellow-600" />,
                status: "Premium"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    {feature.icon}
                    <CardTitle className="text-base ml-2">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge 
                    variant={feature.status === "Available" ? "outline" : "secondary"}
                    className={feature.status === "Available" ? "border-green-500 text-green-700" : ""}
                  >
                    {feature.status}
                  </Badge>
                  <Button size="sm" variant={feature.status === "Available" ? "default" : "outline"}>
                    {feature.status === "Available" ? "Access" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="next-steps">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Recommended Next Steps</h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "Publish Your Chatbot",
                  description: "Make your chatbot live and accessible to users",
                  action: "Publish Now",
                  icon: <Upload className="h-5 w-5 text-green-600" />
                },
                {
                  title: "Configure Analytics",
                  description: "Set up tracking to monitor your chatbot's performance",
                  action: "Set Up Analytics",
                  icon: <BarChart3 className="h-5 w-5 text-blue-600" />
                },
                {
                  title: "Test with Real Users",
                  description: "Share your chatbot with a small group to gather feedback",
                  action: "Create Test Group",
                  icon: <Users className="h-5 w-5 text-purple-600" />
                },
                {
                  title: "Enable Multi-language Support",
                  description: "Allow your chatbot to communicate in different languages",
                  action: "Add Languages",
                  icon: <Languages className="h-5 w-5 text-indigo-600" />
                },
                {
                  title: "Set Up Voice Capabilities",
                  description: "Enable voice input and output for your chatbot",
                  action: "Configure Voice",
                  icon: <Volume2 className="h-5 w-5 text-orange-600" />
                },
                {
                  title: "Create A/B Tests",
                  description: "Test different responses to optimize your chatbot",
                  action: "Start Testing",
                  icon: <BarChart className="h-5 w-5 text-red-600" />
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base mb-1">{step.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                    <Button size="sm">{step.action}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col items-center mt-8">
        <h3 className="text-xl font-semibold mb-4">Ready to Go Live?</h3>
        <Button size="lg" onClick={handlePublish} className="px-8 bg-green-600 hover:bg-green-700">
          <Upload className="mr-2 h-5 w-5" />
          Publish Your Chatbot
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Publishing will make your chatbot available on all configured platforms.
        </p>
      </div>
    </div>
  );
};

export default SetupCompleteScreen;
