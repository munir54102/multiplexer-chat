
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import {
  GeneralSection,
  AISection,
  ChatInterfaceSection,
  SecuritySection,
  LeadsSection,
  NotificationsSection,
} from "@/components/dashboard/settings";
import WebhooksSection from "@/components/dashboard/settings/WebhooksSection";
import ConnectTab from "@/components/dashboard/tabs/ConnectTab";
import ActivityTab from "@/components/dashboard/tabs/ActivityTab";
import AnalyticsTab from "@/components/dashboard/tabs/AnalyticsTab";
import PlaygroundTab from "@/components/dashboard/tabs/PlaygroundTab";
import { Clock, PlusCircle, Activity, BarChart3, Database, Zap, Users, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("playground");
  const [activeSection, setActiveSection] = useState("general");

  // Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "playground":
        return <PlaygroundTab />;
      case "activity":
        return <ActivityTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "connect":
        return <ConnectTab />;
      default:
        return <PlaygroundTab />;
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
