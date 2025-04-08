
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Check as CheckIcon, CheckCircle, MessageSquare, Bot, Zap, Globe, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SetupCompleteScreen = () => {
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
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
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
                <CheckIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="mt-1">{step}</span>
            </div>
          ))}
        </div>
      </div>
      
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
              <CardTitle className="flex items-center">
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
              <Button variant="secondary" className="w-full">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4">Ready to Go Live?</h3>
        <Button size="lg" onClick={handlePublish} className="px-8">
          <Upload className="mr-2 h-5 w-5" />
          Publish Your Chatbot
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Publishing will make your chatbot available on all configured platforms.
        </p>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Popular Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Button className="w-full" variant="outline" size="sm">
                  Create New Chatbot
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetupCompleteScreen;
