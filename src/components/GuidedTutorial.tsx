import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Info, X, ArrowRight, ArrowLeft, Bot, Database, Link, 
  Zap, Settings, BookOpen, Globe, PenTool, MessageSquare,
  BarChart3, CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const tutorialSteps = [
  {
    title: "Welcome to MultiplexAI",
    description: "Let's get you started with creating your first AI chatbot. This guided tutorial will walk you through the key features of our platform.",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: []
  },
  {
    title: "Create Your First Chatbot",
    description: "Start by naming your chatbot and defining its primary purpose.",
    icon: <Bot className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Name Your Chatbot",
        description: "Choose a name that represents your brand or its function."
      },
      {
        title: "Select a Template",
        description: "Choose from pre-built templates for customer support, lead generation, or sales."
      },
      {
        title: "Define Purpose",
        description: "Specify what your chatbot will help your customers with."
      }
    ]
  },
  {
    title: "Build Knowledge Base",
    description: "Teach your AI chatbot by adding information it can use to answer questions.",
    icon: <Database className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Upload Documents",
        description: "Add PDFs, DOCs, or text files containing your product information."
      },
      {
        title: "Connect Website",
        description: "Let your chatbot learn from your existing website content."
      },
      {
        title: "Create Q&A Pairs",
        description: "Add specific questions and answers for common inquiries."
      },
      {
        title: "Add Custom Text",
        description: "Enter important information directly into the knowledge base."
      }
    ]
  },
  {
    title: "Design Conversation Flows",
    description: "Create structured conversation paths to guide users through complex interactions.",
    icon: <PenTool className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Welcome Message",
        description: "Craft the first message users will see when they interact with your chatbot."
      },
      {
        title: "Decision Trees",
        description: "Create branching conversations based on user responses."
      },
      {
        title: "Fallback Responses",
        description: "Define what happens when your chatbot doesn't know the answer."
      }
    ]
  },
  {
    title: "Customize Appearance",
    description: "Make your chatbot match your brand by customizing its look and feel.",
    icon: <Settings className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Brand Colors",
        description: "Set primary and secondary colors to match your brand identity."
      },
      {
        title: "Chat Bubble Style",
        description: "Choose between different chat bubble shapes and designs."
      },
      {
        title: "Avatar Selection",
        description: "Pick an avatar or upload your own custom image."
      },
      {
        title: "Widget Position",
        description: "Decide where the chat widget appears on your website."
      }
    ]
  },
  {
    title: "Deploy & Connect",
    description: "Make your chatbot available to your customers across multiple platforms.",
    icon: <Link className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Website Integration",
        description: "Add a single line of code to your website to embed the chatbot."
      },
      {
        title: "WhatsApp Connection",
        description: "Connect to WhatsApp Business API to engage customers via messaging."
      },
      {
        title: "Facebook Integration",
        description: "Link your Facebook business page to handle Messenger conversations."
      },
      {
        title: "Instagram Setup",
        description: "Connect to Instagram direct messages for seamless customer engagement."
      }
    ]
  },
  {
    title: "Test Your Chatbot",
    description: "Ensure your chatbot is working correctly before going live.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    action: "Next",
    substeps: [
      {
        title: "Preview Mode",
        description: "Test your chatbot in a sandbox environment to see how it responds."
      },
      {
        title: "Common Questions",
        description: "Try asking frequently asked questions to verify correct responses."
      },
      {
        title: "Edge Cases",
        description: "Test unusual questions to see how your chatbot handles them."
      }
    ]
  },
  {
    title: "Monitor & Improve",
    description: "Track performance metrics and optimize your chatbot over time.",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    action: "Finish",
    substeps: [
      {
        title: "Analytics Dashboard",
        description: "View key metrics like engagement rate, satisfaction score, and conversion rate."
      },
      {
        title: "Conversation Review",
        description: "Browse through actual conversations to identify improvement areas."
      },
      {
        title: "A/B Testing",
        description: "Compare different versions of your chatbot to see which performs better."
      },
      {
        title: "Continuous Learning",
        description: "Enable your chatbot to improve automatically based on interactions."
      }
    ]
  }
];

interface GuidedTutorialProps {
  onComplete?: () => void;
  initialStep?: number;
}

const GuidedTutorial = ({ onComplete, initialStep = 0 }: GuidedTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [currentSubstep, setCurrentSubstep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [expandedSubsteps, setExpandedSubsteps] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('guidedTutorialCompleted');
    if (tutorialCompleted === 'true') {
      setIsVisible(false);
    }
  }, []);
  
  const handleNext = () => {
    const currentStepData = tutorialSteps[currentStep];
    
    if (currentStepData.substeps.length > 0 && expandedSubsteps && currentSubstep < currentStepData.substeps.length - 1) {
      setCurrentSubstep(currentSubstep + 1);
    } 
    else {
      if (currentStep < tutorialSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentSubstep(0);
        setExpandedSubsteps(false);
      } else {
        handleComplete();
      }
    }
  };
  
  const handlePrevious = () => {
    if (expandedSubsteps && currentSubstep > 0) {
      setCurrentSubstep(currentSubstep - 1);
    } 
    else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevStepHasSubsteps = tutorialSteps[currentStep - 1].substeps.length > 0;
      if (prevStepHasSubsteps && expandedSubsteps) {
        setCurrentSubstep(tutorialSteps[currentStep - 1].substeps.length - 1);
      } else {
        setCurrentSubstep(0);
      }
    }
  };
  
  const toggleSubsteps = () => {
    setExpandedSubsteps(!expandedSubsteps);
  };
  
  const handleComplete = () => {
    localStorage.setItem('guidedTutorialCompleted', 'true');
    setIsVisible(false);
    
    toast({
      title: "Tutorial completed!",
      description: "You can always access help resources from the dashboard.",
    });
    
    if (onComplete) {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    toast({
      title: "Tutorial skipped",
      description: "You can access it anytime from the help menu.",
    });
    setIsVisible(false);
    
    if (onComplete) {
      onComplete();
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  const step = tutorialSteps[currentStep];
  const hasSubsteps = step.substeps.length > 0;
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  
  const currentTitle = expandedSubsteps && hasSubsteps 
    ? step.substeps[currentSubstep].title 
    : step.title;
    
  const currentDescription = expandedSubsteps && hasSubsteps 
    ? step.substeps[currentSubstep].description 
    : step.description;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <Info className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Guided Tutorial</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSkip}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between mt-6 mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            {tutorialSteps.map((_, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative
                  ${index < currentStep 
                    ? 'bg-primary text-white' 
                    : index === currentStep 
                    ? 'bg-primary/20 border-2 border-primary text-primary font-medium' 
                    : 'bg-gray-100 text-gray-400'}`
                }
              >
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="flex items-center justify-center md:w-1/4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">{currentTitle}</h3>
              <p className="text-gray-600 mb-4">{currentDescription}</p>
              
              {hasSubsteps && !expandedSubsteps && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleSubsteps} 
                  className="mt-2"
                >
                  View detailed steps
                </Button>
              )}
              
              {expandedSubsteps && hasSubsteps && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Substep {currentSubstep + 1} of {step.substeps.length}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleSubsteps}
                    >
                      Back to overview
                    </Button>
                  </div>
                  <Progress 
                    value={((currentSubstep + 1) / step.substeps.length) * 100} 
                    className="h-1 mb-4" 
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {currentStep > 0 || (expandedSubsteps && currentSubstep > 0) ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Skip Tutorial
              </Button>
            )}
          </div>
          <Button onClick={handleNext}>
            {currentStep === tutorialSteps.length - 1 && (!expandedSubsteps || currentSubstep === step.substeps.length - 1)
              ? "Finish" 
              : "Next"} 
            {(currentStep < tutorialSteps.length - 1 || (expandedSubsteps && currentSubstep < step.substeps.length - 1)) && 
              <ArrowRight className="ml-2 h-4 w-4" />
            }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuidedTutorial;
