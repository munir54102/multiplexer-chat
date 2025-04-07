
import React from "react";
import { 
  Users, 
  CreditCard, 
  BarChart, 
  Settings, 
  LogOut, 
  Home, 
  Tag, 
  MessageSquare, 
  Megaphone, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-500">Manage your platform</p>
      </div>
      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            Overview
          </p>
          <ul className="space-y-1">
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "analytics"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart className="h-5 w-5 mr-3" />
                Analytics
              </button>
            </li>
          </ul>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            Management
          </p>
          <ul className="space-y-1">
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "users"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-5 w-5 mr-3" />
                Users
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "subscriptions"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("subscriptions")}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Subscriptions
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "coupons"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("coupons")}
              >
                <Tag className="h-5 w-5 mr-3" />
                Coupons
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "messages"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                Messages
                <Badge className="ml-auto bg-red-500 text-white">3</Badge>
              </button>
            </li>
          </ul>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            Configuration
          </p>
          <ul className="space-y-1">
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "settings"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-2 rounded-lg ${
                  activeTab === "marketing"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("marketing")}
              >
                <Megaphone className="h-5 w-5 mr-3" />
                Marketing
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => window.open('/', '_blank')}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            View Website
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
