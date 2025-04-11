import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  CreateTab,
  DesignTab,
  PublishTab
} from "@/components/dashboard/tabs";
import ChatbotManagement from "@/components/dashboard/ChatbotManagement";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import ABTesting from "@/components/dashboard/ABTesting";
import SentimentAnalysis from "@/components/dashboard/SentimentAnalysis";
import ChatbotTesting from "@/components/dashboard/ChatbotTesting";
import GuidedTutorial from "@/components/GuidedTutorial";
import DashboardHelp from "@/components/dashboard/DashboardHelp";
import { 
  Activity, 
  BarChart3, 
  BookOpen, 
  ChevronRight, 
  HelpCircle, 
  Rocket 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("general");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard') === 'true';
    const tutorialCompleted = localStorage.getItem('guidedTutorialCompleted') === 'true';
    
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      setIsNewUser(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    } else if (!tutorialCompleted) {
      setIsNewUser(true);
    }
    
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      const section = pathParts[2];
      setActiveTab(section);
      
      if (section === 'create' && location.state && location.state.step) {
        // The step will be handled by the CreateTab component
      }
    }
  }, [navigate, location]);

  const handleStartTutorial = () => {
    setShowTutorial(true);
    toast({
      title: "Tutorial started",
      description: "Follow the steps to create your first chatbot.",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ChatbotManagement />;
      case "create":
        return <CreateTab />;
      case "build":
        return <SourcesTab />;
      case "design":
        return <DesignTab />;
      case "test":
        return <ChatbotTesting botName={localStorage.getItem('currentChatbot') || "My Chatbot"} />;
      case "connect":
        return <ConnectTab />;
      case "publish":
        return <PublishTab />;
      case "deploy":
        return <PublishTab />;
      case "analyze":
        return <AnalyticsTab />;
      case "playground":
        return <PlaygroundTab />;
      case "activity":
        return <ActivityTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "sources":
        return <SourcesTab />;
      case "actions":
        return <ActionsTab />;
      case "contacts":
        return <ContactsTab />;
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

  const renderSettingsContent = () => {
    return getSettingsComponent(activeSection);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "My Chatbots";
      case "create":
        return "Create Chatbot";
      case "build":
        return "Build Your Chatbot";
      case "design":
        return "Design Your Chatbot";
      case "test":
        return "Test Your Chatbot";
      case "connect":
        return "Connect Your Chatbot";
      case "publish":
        return "Publish Your Chatbot";
      case "analyze":
        return "Analyze Performance";
      case "settings":
        return "Settings";
      case "help":
        return "Help & Resources";
      default:
        return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    }
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
                <p className="text-gray-600 mt-1">Manage your existing chatbots or create a new one</p>
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
