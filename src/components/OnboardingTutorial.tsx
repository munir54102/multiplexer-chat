
import { useState } from "react";
import { MessageSquare, Database, Zap, Settings, ArrowRight, ArrowLeft, Globe, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const OnboardingTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  
  const steps = [
    {
      title: "Create Your First Chatbot",
      description: "Getting started is easy. Simply name your chatbot, choose a primary platform, and set your business goals.",
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      image: "/onboarding-1.png"
    },
    {
      title: "Build Your Knowledge Base",
      description: "Import your FAQs, product information, and support documentation to train your AI on your specific business.",
      icon: <Database className="h-12 w-12 text-primary" />,
      image: "/onboarding-2.png"
    },
    {
      title: "Connect Your Platforms",
      description: "Integrate with WhatsApp, Facebook, Instagram, or add our chat widget to your website with just a few clicks.",
      icon: <Zap className="h-12 w-12 text-primary" />,
      image: "/onboarding-3.png"
    },
    {
      title: "Customize & Launch",
      description: "Personalize your chatbot's appearance and behavior, then launch it to start engaging with customers instantly.",
      icon: <Settings className="h-12 w-12 text-primary" />,
      image: "/onboarding-4.png"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowTutorial(false);
      // Save to localStorage that tutorial has been completed
      localStorage.setItem('tutorialCompleted', 'true');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };

  // Check if tutorial should be shown (first time users)
  if (!showTutorial || localStorage.getItem('tutorialCompleted') === 'true') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="font-medium">Getting Started Tutorial</span>
          </div>
          <Button variant="ghost" className="text-white hover:bg-primary/80" onClick={handleSkip}>
            Skip Tutorial
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">{currentStep + 1} of {steps.length}</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">{steps[currentStep].icon}</div>
              <h3 className="text-xl font-bold mb-4">{steps[currentStep].title}</h3>
              <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrev} 
                  disabled={currentStep === 0}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="flex items-center"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'} 
                  {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
              <div className="relative w-full aspect-video bg-gray-200 rounded-md overflow-hidden">
                {/* Replace with actual tutorial images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  {steps[currentStep].title} Screenshot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
