
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Check, ShoppingCart, Facebook, Instagram, MessageCircle } from "lucide-react";

const PlatformConnectionTutorial = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Choose your platforms",
      description: "Select the messaging and e-commerce platforms you want to connect with your AI chatbot.",
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="hover:border-primary cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium">WhatsApp</h3>
              </div>
              <p className="text-sm text-gray-600">Connect with billions of WhatsApp users globally.</p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium">Facebook</h3>
              </div>
              <p className="text-sm text-gray-600">Engage with your Facebook audience directly.</p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <Instagram className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium">Instagram</h3>
              </div>
              <p className="text-sm text-gray-600">Respond to DMs and comments with your AI.</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 2,
      title: "Connect e-commerce store",
      description: "Link your online store to enable product information, ordering, and customer support.",
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      content: (
        <div className="mt-6 space-y-4">
          <Card className="hover:border-primary cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <ShoppingCart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium">WooCommerce</h3>
              </div>
              <p className="text-sm text-gray-600">Connect your WordPress WooCommerce store.</p>
              <div className="mt-4 text-xs flex">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">WordPress Plugin</span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded ml-2">API Key</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary cursor-pointer transition-all">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium">Shopify</h3>
              </div>
              <p className="text-sm text-gray-600">Link your Shopify store for seamless integration.</p>
              <div className="mt-4 text-xs flex">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Shopify App</span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded ml-2">API Access</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 3,
      title: "Configure product catalog",
      description: "Import your products and customize how they appear in chatbot conversations.",
      icon: <Check className="h-10 w-10 text-primary" />,
      content: (
        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg">
          <h3 className="font-medium mb-3">Configuration Options</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <span>Choose which product details to show (price, availability, images)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <span>Set up automatic inventory sync schedule</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <span>Create product recommendation rules</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <span>Enable ordering directly through chat</span>
            </li>
          </ul>
        </div>
      )
    }
  ];
  
  const currentStepData = steps.find(step => step.id === currentStep) || steps[0];
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex border-b">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex-1 py-4 px-6 text-center cursor-pointer ${step.id === currentStep ? 'bg-primary/5 border-b-2 border-primary' : ''}`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div className="flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 
                ${step.id === currentStep 
                  ? 'bg-primary text-white' 
                  : step.id < currentStep 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'}`}>
                {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className={`hidden md:inline ${step.id === currentStep ? 'text-primary font-medium' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          {currentStepData.icon}
          <div className="ml-4">
            <h2 className="text-xl font-bold">{currentStepData.title}</h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>
        </div>
        
        {currentStepData.content}
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNextStep}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? 'Finish' : 'Next'} 
            {currentStep !== steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformConnectionTutorial;
