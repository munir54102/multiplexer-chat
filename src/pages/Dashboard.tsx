
import { useState } from "react";
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
  ContactsTab
} from "@/components/dashboard/tabs";
import ChatbotManagement from "@/components/dashboard/ChatbotManagement";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Clock, PlusCircle, Activity, BarChart3, Database, ArrowUpDown, Users, Settings, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("general");

  // Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ChatbotManagement />;
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:flex">
              <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="playground" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Playground</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="connect" className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>Connect</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <CreateChatbotButton />
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
  );
};

export default Dashboard;
