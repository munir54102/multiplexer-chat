
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import { getSettingsComponent } from "@/components/dashboard/settings";
import {
  PlaygroundTab,
  ActivityTab,
  AnalyticsTab,
  ConnectTab,
  SourcesTab,
  ActionsTab,
  ContactsTab,
  CreateTab
} from "@/components/dashboard/tabs";
import ChatbotManagement from "@/components/dashboard/ChatbotManagement";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import ABTesting from "@/components/dashboard/ABTesting";
import SentimentAnalysis from "@/components/dashboard/SentimentAnalysis";
import TemplateLibrary from "@/components/dashboard/TemplateLibrary";
import GuidedTutorial from "@/components/GuidedTutorial";
import DashboardHelp from "@/components/dashboard/DashboardHelp";
import { Clock, PlusCircle, Activity, BarChart3, Database, ArrowUpDown, Users, Settings, Zap, Languages, 
  HelpCircle, BookOpen, ChevronRight, MessageSquare, Link, Bot, Rocket, Wrench, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("general");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard') === 'true';
    const tutorialCompleted = localStorage.getItem('guidedTutorialCompleted') === 'true';
    
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      setIsNewUser(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    } else if (!tutorialCompleted) {
      setIsNewUser(true);
    }
  }, [navigate]);

  const handleStartTutorial = () => {
    setShowTutorial(true);
    toast({
      title: "Tutorial started",
      description: "Follow the steps to create your first chatbot.",
    });
  };

  // Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ChatbotManagement />;
      case "create":
        return <CreateTab />;
      case "playground":
        return <PlaygroundTab />;
      case "activity":
        return <ActivityTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "connect":
        return <ConnectTab />;
      case "sources":
        return <SourcesTab />;
      case "actions":
        return <ActionsTab />;
      case "contacts":
        return <ContactsTab />;
      case "templates":
        return <TemplateLibrary />;
      case "abtesting":
        return <ABTesting />;
      case "sentiment":
        return <SentimentAnalysis />;
      case "help":
        return <DashboardHelp />;
      default:
        return <ChatbotManagement />;
    }
  };

  // Content based on active settings section
  const renderSettingsContent = () => {
    return getSettingsComponent(activeSection);
  };

  // Get the tab section title
  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard";
      case "create":
        return "Create Chatbot";
      case "sources":
        return "Build Your Chatbot";
      case "connect":
        return "Connect Your Chatbot";
      case "settings":
        return "Settings";
      case "templates":
        return "Template Library";
      case "abtesting":
        return "A/B Testing";
      case "sentiment":
        return "Sentiment Analysis";
      case "help":
        return "Help & Resources";
      default:
        return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    }
  };

  // Quick action buttons for the dashboard
  const renderQuickActions = () => {
    if (activeTab !== "overview") return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20 hover:border-primary/50 transition-colors cursor-pointer" 
              onClick={() => setActiveTab("create")}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-2">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium">Create Chatbot</h3>
            <p className="text-sm text-gray-500 mt-1">Create your first AI assistant</p>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-200 hover:border-indigo-400 transition-colors cursor-pointer"
              onClick={() => setActiveTab("sources")}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 mt-2">
              <Database className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">Build Knowledge</h3>
            <p className="text-sm text-gray-500 mt-1">Add data to train your AI</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => setActiveTab("connect")}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 mt-2">
              <Link className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium">Connect Chatbot</h3>
            <p className="text-sm text-gray-500 mt-1">Deploy to your platforms</p>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer"
              onClick={() => setActiveTab("playground")}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3 mt-2">
              <PlaygroundTab className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-medium">Test Chatbot</h3>
            <p className="text-sm text-gray-500 mt-1">Try out your AI assistant</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {showOnboarding && <OnboardingTutorial />}
      {showTutorial && <GuidedTutorial onComplete={() => setShowTutorial(false)} />}
      <div className="flex flex-col md:flex-row pt-16 min-h-[calc(100vh-64px)]">
        <DashboardSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="flex-1 p-4 md:p-6">
          {isNewUser && !showTutorial && activeTab === "overview" && (
            <Alert className="mb-6 border-primary/50 bg-primary/10">
              <Rocket className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary">Ready to build your first chatbot?</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                <span>Follow our step-by-step guide to create an AI chatbot in just a few minutes.</span>
                <Button onClick={handleStartTutorial} className="mt-2 sm:mt-0">
                  Start Tutorial <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{getTabTitle()}</h1>
              {activeTab === "overview" && (
                <p className="text-gray-600 mt-1">Manage your chatbots and get started quickly</p>
              )}
            </div>
            <div className="flex space-x-2">
              {(activeTab === "overview" || activeTab === "create" || activeTab === "templates") && (
                <CreateChatbotButton />
              )}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleStartTutorial}
                      className="ml-2"
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open Guided Tutorial</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="default" 
                      onClick={handleStartTutorial}
                      className="hidden md:flex"
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Chatbot Creation Guide
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start the step-by-step tutorial</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {renderQuickActions()}
          
          <DashboardContent>
            {activeTab === "settings" ? (
              renderSettingsContent()
            ) : (
              renderTabContent()
            )}
          </DashboardContent>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
