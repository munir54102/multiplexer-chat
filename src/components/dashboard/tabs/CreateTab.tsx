
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bot, Database, Link, MessageSquare, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const CreateTab = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNavigate = (section: string) => {
    if (section === 'sources') {
      toast({
        title: "Moving to Build phase",
        description: "Now you can add knowledge to your chatbot"
      });
      navigate("/dashboard");
    } else if (section === 'connect') {
      toast({
        title: "Moving to Connect phase",
        description: "Now you can integrate your chatbot with different platforms"
      });
      navigate("/dashboard");
    }
  };

  const steps = [
    {
      title: "Create",
      description: "Name your chatbot and define its purpose",
      icon: Bot,
      action: (
        <CreateChatbotButton 
          variant="outline" 
          fullWidth={true} 
          onSuccess={() => setActiveStep(1)}
        />
      ),
      isComplete: activeStep > 0
    },
    {
      title: "Build",
      description: "Add knowledge from files, websites, or custom text",
      icon: Database,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('sources');
            setActiveStep(2);
          }}
        >
          Start Building Knowledge Base
        </Button>
      ),
      isComplete: activeStep > 1
    },
    {
      title: "Connect",
      description: "Deploy your chatbot to your website or other platforms",
      icon: Link,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('connect');
            setActiveStep(3);
          }}
        >
          Set Up Connections
        </Button>
      ),
      isComplete: activeStep > 2
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Your Chatbot</h2>
        <p className="text-gray-600 mb-6">Start building your AI chatbot in three simple steps</p>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm font-medium">{activeStep * 33}%</span>
          </div>
          <Progress value={activeStep * 33} className="h-2" />
          <div className="flex justify-between mt-4 text-sm">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index <= activeStep ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < activeStep ? 'bg-primary/20' : 'bg-gray-100'}`}>
                  {index < activeStep ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="mt-1">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className={`
                transition-all duration-200
                ${index === activeStep ? 'ring-2 ring-primary ring-offset-2' : ''}
                ${step.isComplete ? 'bg-gray-50' : ''}
              `}
            >
              <CardHeader>
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2
                  ${step.isComplete ? 'bg-primary/20' : 'bg-primary/10'}
                `}>
                  {step.isComplete ? (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  ) : (
                    <step.icon className="h-6 w-6 text-primary" />
                  )}
                </div>
                <CardTitle className="flex items-center">
                  {index + 1}. {step.title}
                  {step.isComplete && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Complete
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {index < activeStep ? (
                  <p className="text-sm text-gray-500">
                    {index === 0 ? "Chatbot created successfully! Now add knowledge to it." : 
                     index === 1 ? "Knowledge base configured. Now set up platform connections." : 
                     "Setup complete. Your chatbot is ready to use!"}
                  </p>
                ) : index === activeStep ? (
                  <p className="text-sm text-primary">Current step - complete this to continue</p>
                ) : (
                  <p className="text-sm text-gray-400">Complete previous steps first</p>
                )}
              </CardContent>
              <CardFooter>
                {index === activeStep ? (
                  step.action
                ) : index < activeStep ? (
                  <Button variant="secondary" className="w-full" onClick={() => setActiveStep(index)}>
                    Edit
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Locked
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
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
