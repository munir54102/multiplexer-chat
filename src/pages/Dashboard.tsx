
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import CreateChatbotButton from "@/components/CreateChatbotButton";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("playground");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <CreateChatbotButton />
        </div>
        <DashboardContent>
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </DashboardContent>
      </main>
    </div>
  );
};

export default Dashboard;
