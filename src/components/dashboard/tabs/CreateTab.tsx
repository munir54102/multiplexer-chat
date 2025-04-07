
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bot, Database, Link, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Progress } from "@/components/ui/progress";

const CreateTab = () => {
  const { toast } = useToast();
  
  const handleNavigate = (section: string) => {
    toast({
      title: "Navigating",
      description: `Moving to the ${section} section`
    });
    // Navigation logic would go here
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Your Chatbot</h2>
        <p className="text-gray-600 mb-6">Start building your AI chatbot in three simple steps</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>1. Create</CardTitle>
              <CardDescription>Give your chatbot a name and purpose</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">Start by creating a new chatbot with a descriptive name. Your chatbot will be ready for customization.</p>
            </CardContent>
            <CardFooter>
              <CreateChatbotButton variant="outline" fullWidth={true} />
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>2. Build</CardTitle>
              <CardDescription>Add knowledge from various sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">Import knowledge from files, websites, Q&A pairs, or write custom text to train your chatbot.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleNavigate('sources')}>
                Build Knowledge Base
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Link className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>3. Connect</CardTitle>
              <CardDescription>Deploy your chatbot across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">Add your chatbot to your website, connect it to WhatsApp, Facebook, or use our API.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleNavigate('connect')}>
                Manage Connections
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Popular Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Customer Support",
              description: "Handle common questions and reduce support tickets",
              icon: <MessageSquare className="h-5 w-5 text-blue-500" />
            },
            {
              title: "Lead Generation",
              description: "Capture and qualify leads from website visitors",
              icon: <Bot className="h-5 w-5 text-green-500" />
            },
            {
              title: "FAQ Assistant",
              description: "Answer frequently asked questions instantly",
              icon: <Zap className="h-5 w-5 text-amber-500" />
            }
          ].map((useCase, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  {useCase.icon}
                  <CardTitle className="text-base ml-2">{useCase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </CardContent>
              <CardFooter>
                <CreateChatbotButton size="sm" variant="ghost" fullWidth={true} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTab;
