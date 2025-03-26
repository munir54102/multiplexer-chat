
import { useState } from "react";
import Layout from "@/components/Layout";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Calendar from "@/components/Calendar";
import Eye from "@/components/Eye";

// Tab components
import PlaygroundTab from "@/components/dashboard/tabs/PlaygroundTab";
import ActivityTab from "@/components/dashboard/tabs/ActivityTab";
import AnalyticsTab from "@/components/dashboard/tabs/AnalyticsTab";
import SourcesTab from "@/components/dashboard/tabs/SourcesTab";
import ActionsTab from "@/components/dashboard/tabs/ActionsTab";
import ContactsTab from "@/components/dashboard/tabs/ContactsTab";
import ConnectTab from "@/components/dashboard/tabs/ConnectTab";

// Settings components
import GeneralSection from "@/components/dashboard/settings/GeneralSection";
import AISection from "@/components/dashboard/settings/AISection";
import ChatInterfaceSection from "@/components/dashboard/settings/ChatInterfaceSection";
import SecuritySection from "@/components/dashboard/settings/SecuritySection";
import LeadsSection from "@/components/dashboard/settings/LeadsSection";
import NotificationsSection from "@/components/dashboard/settings/NotificationsSection";
import WebhooksSection from "@/components/dashboard/settings/WebhooksSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [activeTab, setActiveTab] = useState("playground");

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto pt-20">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Dashboard Sidebar */}
            <DashboardSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
            
            {/* Dashboard Content */}
            <div className="flex-1 min-h-[80vh]">
              {/* Dashboard Navigation */}
              <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              {/* Dashboard Content Based on Tab */}
              <div className="p-6">
                {activeTab === "playground" && <PlaygroundTab />}
                {activeTab === "activity" && <ActivityTab />}
                {activeTab === "analytics" && <AnalyticsTab />}
                {activeTab === "sources" && <SourcesTab />}
                {activeTab === "actions" && <ActionsTab />}
                {activeTab === "contacts" && <ContactsTab />}
                {activeTab === "connect" && <ConnectTab />}
                {activeTab === "settings" && (
                  <>
                    {activeSection === "general" && <GeneralSection />}
                    {activeSection === "ai" && <AISection />}
                    {activeSection === "chat" && <ChatInterfaceSection />}
                    {activeSection === "security" && <SecuritySection />}
                    {activeSection === "leads" && <LeadsSection />}
                    {activeSection === "notifications" && <NotificationsSection />}
                    {activeSection === "webhooks" && <WebhooksSection />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
