import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bot, Database, Link, MessageSquare, Zap, ArrowRight, CheckCircle, Palette, Play, Upload, BarChart3, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuidedTutorial from "@/components/GuidedTutorial";

const CreateTab = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [botName, setBotName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [showPurposeSelection, setShowPurposeSelection] = useState(false);
  
  useEffect(() => {
    if (location.state) {
      const { botName, step } = location.state as { botName: string; step: string };
      if (botName) {
        setBotName(botName);
        if (step === 'purpose') {
          setShowPurposeSelection(true);
        }
      }
    }
  }, [location]);

  const handleNavigate = (section: string) => {
    let nextStep = activeStep;
    
    if (section === 'build' || section === 'sources') {
      nextStep = 2;
      navigate("/dashboard/build", { state: { botName, purpose } });
    } else if (section === 'design') {
      nextStep = 3;
      navigate("/dashboard/design", { state: { botName, purpose } });
    } else if (section === 'test' || section === 'playground') {
      nextStep = 4;
      navigate("/dashboard/test", { state: { botName, purpose } });
    } else if (section === 'deploy' || section === 'connect') {
      nextStep = 5;
      navigate("/dashboard/deploy", { state: { botName, purpose } });
    } else if (section === 'analyze' || section === 'analytics') {
      nextStep = 6;
      navigate("/dashboard/analyze", { state: { botName, purpose } });
    }
    
    setActiveStep(nextStep);
    
    toast({
      title: `Moving to ${section} phase`,
      description: `Now you can ${section === 'build' ? 'add knowledge to' : 
                    section === 'design' ? 'customize' : 
                    section === 'test' ? 'test' : 
                    section === 'deploy' ? 'deploy' : 
                    'analyze'} your chatbot`
    });
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
  };

  const handleEdit = (stepIndex: number) => {
    setActiveStep(stepIndex);
    
    toast({
      title: "Editing step",
      description: `Now editing step ${stepIndex + 1}`
    });

    switch(stepIndex) {
      case 0: // Create
        navigate("/dashboard/create", { state: { botName, purpose } });
        break;
      case 1: // Build
        navigate("/dashboard/build", { state: { botName, purpose } });
        break;
      case 2: // Design
        navigate("/dashboard/design", { state: { botName, purpose } });
        break;
      case 3: // Test
        navigate("/dashboard/test", { state: { botName, purpose } });
        break;
      case 4: // Deploy
        navigate("/dashboard/deploy", { state: { botName, purpose } });
        break;
      case 5: // Analyze
        navigate("/dashboard/analyze", { state: { botName, purpose } });
        break;
      default:
        break;
    }
  };

  const handleSelectPurpose = (selectedPurpose: string) => {
    setPurpose(selectedPurpose);
    setShowPurposeSelection(false);
    setActiveStep(1);
    
    toast({
      title: "Purpose selected",
      description: `Your chatbot is now configured as a ${selectedPurpose} assistant.`
    });
    
    navigate("/dashboard/build", { state: { botName, purpose: selectedPurpose } });
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
            handleNavigate('build');
          }}
        >
          Start Building Knowledge Base
        </Button>
      ),
      isComplete: activeStep > 1
    },
    {
      title: "Design",
      description: "Customize appearance and conversation flows",
      icon: Palette,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('design');
          }}
        >
          Customize Appearance
        </Button>
      ),
      isComplete: activeStep > 2
    },
    {
      title: "Test",
      description: "Preview and test your chatbot's responses",
      icon: Play,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('test');
          }}
        >
          Test Your Chatbot
        </Button>
      ),
      isComplete: activeStep > 3
    },
    {
      title: "Deploy",
      description: "Deploy to your website and other platforms",
      icon: Upload,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('deploy');
          }}
        >
          Deploy & Connect
        </Button>
      ),
      isComplete: activeStep > 4
    },
    {
      title: "Analyze",
      description: "Monitor and improve performance",
      icon: BarChart3,
      action: (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            handleNavigate('analyze');
          }}
        >
          View Analytics
        </Button>
      ),
      isComplete: activeStep > 5
    }
  ];
  
  const progressPercentage = Math.min(activeStep / (steps.length) * 100, 100);
  
  if (showPurposeSelection) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tell Us What Your Chatbot Will Do</h2>
          <p className="text-gray-600 mb-6">Select the primary purpose for "{botName}"</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card 
              className="border hover:border-primary hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelectPurpose('Customer Support')}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Customer Support</h3>
                    <p className="text-gray-600 text-sm">Handle FAQs and support requests automatically</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="border hover:border-primary hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelectPurpose('Lead Generation')}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Lead Generation</h3>
                    <p className="text-gray-600 text-sm">Capture and qualify leads from website visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="border hover:border-primary hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelectPurpose('Knowledge Base')}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Knowledge Base</h3>
                    <p className="text-gray-600 text-sm">Answer questions from your documents and content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="border hover:border-primary hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelectPurpose('Website Assistant')}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Website Assistant</h3>
                    <p className="text-gray-600 text-sm">Guide users through your website and content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button onClick={() => handleSelectPurpose('Custom')}>
              Custom Purpose <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {showTutorial && <GuidedTutorial onComplete={() => setShowTutorial(false)} initialStep={0} />}
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Your Chatbot</h2>
          <Button variant="outline" onClick={handleStartTutorial}>
            Open Guided Tutorial
          </Button>
        </div>
        <p className="text-gray-600 mb-6">Complete these steps to build and deploy your AI chatbot</p>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <ScrollArea className="w-full">
            <div className="flex justify-between mt-4 text-sm py-2">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col items-center px-2 ${index <= activeStep ? 'text-primary' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < activeStep ? 'bg-primary/20' : 'bg-gray-100'}`}>
                    {index < activeStep ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="mt-1 text-center whitespace-nowrap">{step.title}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                     index === 1 ? "Knowledge base configured. Now customize appearance." : 
                     index === 2 ? "Design customized. Test your chatbot's functionality." :
                     index === 3 ? "Testing completed. Ready to deploy to platforms." :
                     index === 4 ? "Chatbot deployed. Now monitor performance." :
                     "All steps completed. Your chatbot is live and optimized!"}
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
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    onClick={() => handleEdit(index)}
                  >
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
