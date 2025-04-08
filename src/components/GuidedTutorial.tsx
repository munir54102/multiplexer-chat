
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, X, ArrowRight, ArrowLeft, Bot, Database, Link, Zap, Settings, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const tutorialSteps = [
  {
    title: "Welcome to MultiplexAI",
    description: "Let's get you started with creating your first AI chatbot. This guided tutorial will walk you through the key features of our platform.",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    action: "Next"
  },
  {
    title: "Create Your First Chatbot",
    description: "Start by naming your chatbot and defining its primary purpose. You can choose from templates designed for customer support, lead generation, or knowledge base assistance.",
    icon: <Bot className="h-8 w-8 text-primary" />,
    action: "Next"
  },
  {
    title: "Build Knowledge Base",
    description: "Add information to your chatbot by uploading files, connecting to websites, or creating Q&A pairs. This helps your chatbot answer questions accurately.",
    icon: <Database className="h-8 w-8 text-primary" />,
    action: "Next"
  },
  {
    title: "Customize Appearance",
    description: "Make your chatbot match your brand by customizing colors, chat bubble style, and avatar. You can also configure the chat interface layout.",
    icon: <Settings className="h-8 w-8 text-primary" />,
    action: "Next"
  },
  {
    title: "Deploy & Connect",
    description: "Deploy your chatbot to your website, WhatsApp, Facebook, Instagram, or other platforms with our one-click integration options.",
    icon: <Link className="h-8 w-8 text-primary" />,
    action: "Next"
  },
  {
    title: "Monitor & Improve",
    description: "Track performance metrics, analyze user interactions, and use A/B testing to continuously optimize your chatbot's effectiveness.",
    icon: <Zap className="h-8 w-8 text-primary" />,
    action: "Finish"
  }
];

interface GuidedTutorialProps {
  onComplete?: () => void;
  initialStep?: number;
}

const GuidedTutorial = ({ onComplete, initialStep = 0 }: GuidedTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('guidedTutorialCompleted');
    if (tutorialCompleted === 'true') {
      setIsVisible(false);
    }
  }, []);
  
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  
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
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="flex items-center justify-center md:w-1/4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {currentStep > 0 ? (
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
            {step.action} {step.action === "Next" && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuidedTutorial;
