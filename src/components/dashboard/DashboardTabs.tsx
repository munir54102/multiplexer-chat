
import { useState } from "react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-6 px-6">
        <button
          onClick={() => setActiveTab("playground")}
          className={`py-4 px-2 relative ${activeTab === "playground" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Playground
          {activeTab === "playground" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`py-4 px-2 relative ${activeTab === "activity" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Activity
          {activeTab === "activity" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`py-4 px-2 relative ${activeTab === "analytics" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Analytics
          {activeTab === "analytics" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("sources")}
          className={`py-4 px-2 relative ${activeTab === "sources" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Sources
          {activeTab === "sources" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("actions")}
          className={`py-4 px-2 relative flex items-center ${activeTab === "actions" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Actions
          <span className="ml-1 text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5">New</span>
          {activeTab === "actions" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`py-4 px-2 relative flex items-center ${activeTab === "contacts" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Contacts
          <span className="ml-1 text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5">New</span>
          {activeTab === "contacts" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("connect")}
          className={`py-4 px-2 relative ${activeTab === "connect" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Connect
          {activeTab === "connect" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`py-4 px-2 relative ${activeTab === "settings" ? "text-primary font-medium" : "text-gray-600"}`}
        >
          Settings
          {activeTab === "settings" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
      </div>
    </div>
  );
};

export default DashboardTabs;
