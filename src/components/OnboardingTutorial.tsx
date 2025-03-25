
import { useState } from "react";
import { MessageSquare, Database, Zap, Settings, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnboardingTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Create Your First Chatbot",
      description: "Getting started is easy. Simply name your chatbot, choose a primary platform, and set your business goals.",
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      image: "/onboarding-1.png" // Placeholder image paths
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
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Getting Started is Easy</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Follow our simple four-step process to set up your intelligent chatbot and start engaging with customers in minutes.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex mb-8 justify-between">
          {steps.map((step, index) => (
            <div key={index} className="relative flex-1">
              <div 
                className={`
                  w-10 h-10 mx-auto rounded-full flex items-center justify-center z-10 relative
                  ${currentStep >= index ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}
                `}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-1/2 w-full h-1 -z-10
                    ${currentStep > index ? "bg-primary" : "bg-gray-200"}
                  `}
                ></div>
              )}
              <div className="text-center mt-2 text-xs text-gray-500">
                {step.title.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
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
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center"
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 flex items-center justify-center p-4">
              <div className="rounded-lg bg-gray-300 w-full aspect-video">
                {/* Placeholder for screenshot/illustration */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  Screenshot {currentStep + 1}
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
