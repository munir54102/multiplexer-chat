
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import {
  GeneralSection,
  AISection,
  ChatInterfaceSection,
  SecuritySection,
  LeadsSection,
  NotificationsSection,
  WebhooksSection
} from "@/components/dashboard/settings";
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
import { Clock, PlusCircle, Activity, BarChart3, Database, ArrowUpDown, Users, Settings, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("general");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

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
      default:
        return <ChatbotManagement />;
    }
  };

  // Content based on active settings section
  const renderSettingsContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSection />;
      case "ai":
        return <AISection />;
      case "chat":
        return <ChatInterfaceSection />;
      case "security":
        return <SecuritySection />;
      case "leads":
        return <LeadsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "webhooks":
        return <WebhooksSection />;
      default:
        return <GeneralSection />;
    }
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
      default:
        return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row pt-16 min-h-[calc(100vh-64px)]">
        <DashboardSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{getTabTitle()}</h1>
            <div className="flex space-x-2">
              {(activeTab === "overview" || activeTab === "create") && (
                <CreateChatbotButton />
              )}
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
