
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Video, FileText, BookOpen, ExternalLink, ChevronRight, Bot, Database, Globe, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import GuidedTutorial from "../GuidedTutorial";
import { ChatInterface } from "../dashboard/chatbot/ChatInterface";

interface HelpResourceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  url?: string;
  onClick?: () => void;
}

const HelpResource = ({ title, description, icon, buttonText, url, onClick }: HelpResourceProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {/* Placeholder for preview image */}
        <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          Resource Preview
        </div>
      </CardContent>
      <CardFooter>
        {url ? (
          <Button variant="outline" className="w-full" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {buttonText} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={onClick}>
            {buttonText} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const DashboardHelp = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showChatbotDemo, setShowChatbotDemo] = useState(false);
  
  const startGuidedTutorial = () => {
    setShowTutorial(true);
  };
  
  return (
    <div className="space-y-6">
      {showTutorial && <GuidedTutorial onComplete={() => setShowTutorial(false)} />}
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Help & Resources</h2>
        <Button onClick={startGuidedTutorial}>Start Guided Tutorial</Button>
      </div>
      
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Chatbot Creation Guide</CardTitle>
          <CardDescription>
            Our step-by-step tutorial walks you through the entire process of creating, configuring, and deploying your AI chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium">1. Create</h3>
              <p className="text-sm text-gray-600">Name and define your chatbot</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Database className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium">2. Build</h3>
              <p className="text-sm text-gray-600">Add knowledge and train AI</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Palette className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium">3. Design</h3>
              <p className="text-sm text-gray-600">Customize appearance</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium">4. Deploy</h3>
              <p className="text-sm text-gray-600">Connect to platforms</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={startGuidedTutorial}>
            Start Guided Tutorial
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showChatbotDemo} onOpenChange={setShowChatbotDemo}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Assistant Demo</DialogTitle>
            <DialogDescription>
              See how your chatbot would interact with users
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] border rounded-md overflow-hidden">
            <ChatInterface botName="Help Assistant" />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowChatbotDemo(false)}>Close Demo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HelpResource
          title="Getting Started"
          description="A complete guide to setting up and configuring your chatbot"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
          buttonText="View Guide"
          url="#"
        />
        
        <HelpResource
          title="Video Tutorials"
          description="Step-by-step video walkthroughs of key features"
          icon={<Video className="h-5 w-5 text-primary" />}
          buttonText="Watch Videos"
          url="#"
        />
        
        <HelpResource
          title="Knowledge Base Setup"
          description="Learn how to create an effective knowledge base for your chatbot"
          icon={<FileText className="h-5 w-5 text-primary" />}
          buttonText="Read Documentation"
          url="#"
        />
        
        <HelpResource
          title="Platform Integrations"
          description="Connect your chatbot to WhatsApp, Facebook, and other platforms"
          icon={<FileText className="h-5 w-5 text-primary" />}
          buttonText="View Integration Guides"
          url="#"
        />
        
        <HelpResource
          title="Guided Tutorial"
          description="Interactive walkthrough of all platform features"
          icon={<HelpCircle className="h-5 w-5 text-primary" />}
          buttonText="Start Tutorial"
          onClick={startGuidedTutorial}
        />
        
        <HelpResource
          title="Chatbot Demo"
          description="See a live example of how your chatbot will work"
          icon={<Bot className="h-5 w-5 text-primary" />}
          buttonText="View Demo"
          onClick={() => setShowChatbotDemo(true)}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Need Additional Help?</CardTitle>
          <CardDescription>
            Our support team is available to assist you with any questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
            <Button variant="outline" className="w-full">
              Schedule Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHelp;
