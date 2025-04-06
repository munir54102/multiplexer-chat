
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Zap, ChevronRight, Globe, Headphones, ShoppingCart } from "lucide-react";
import CreateChatbotButton from "./CreateChatbotButton";
import { Link } from "react-router-dom";

const ChatbotCreationSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your AI Chatbot in Minutes
          </h2>
          <p className="text-lg text-gray-600">
            No coding required. Just a few clicks to create a powerful AI assistant for your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Template</h3>
            <p className="text-gray-600 mb-4">
              Select from pre-built templates for customer support, sales, or create a custom bot.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Customer Support</span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Sales</span>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Lead Generation</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Train Your AI</h3>
            <p className="text-gray-600 mb-4">
              Connect your knowledge base, FAQs, or documentation to train your AI assistant.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Documents</span>
              <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">Website</span>
              <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">Q&A Pairs</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deploy Everywhere</h3>
            <p className="text-gray-600 mb-4">
              Add your chatbot to your website, WhatsApp, Facebook, and other platforms.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">WhatsApp</span>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Website</span>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Instagram</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <CreateChatbotButton size="lg" fullWidth={false} />
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Popular Chatbot Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Headphones className="h-10 w-10 text-blue-600" />,
                title: "Customer Support",
                description: "Answer common questions, troubleshoot issues, and reduce support ticket volume",
                cta: "Create Support Bot"
              },
              {
                icon: <ShoppingCart className="h-10 w-10 text-green-600" />,
                title: "Sales Assistant",
                description: "Guide customers through products, answer questions, and increase conversions",
                cta: "Create Sales Bot"
              },
              {
                icon: <Bot className="h-10 w-10 text-purple-600" />,
                title: "Lead Generation",
                description: "Capture leads, qualify prospects, and book meetings with your sales team",
                cta: "Create Lead Bot"
              }
            ].map((useCase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
                <div className="mb-4">
                  {useCase.icon}
                </div>
                <h4 className="text-xl font-medium mb-2">{useCase.title}</h4>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard">
                    {useCase.cta} <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotCreationSection;
