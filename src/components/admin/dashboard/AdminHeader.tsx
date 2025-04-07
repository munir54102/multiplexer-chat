
import React from "react";
import { Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  activeTab: string;
}

const AdminHeader = ({ activeTab }: AdminHeaderProps) => {
  return (
    <header className="bg-white p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {activeTab === "dashboard" && "Dashboard Overview"}
          {activeTab === "users" && "User Management"}
          {activeTab === "subscriptions" && "Subscription Management"}
          {activeTab === "analytics" && "Analytics Dashboard"}
          {activeTab === "settings" && "Admin Settings"}
          {activeTab === "coupons" && "Coupon Management"}
          {activeTab === "messages" && "Customer Messages"}
          {activeTab === "marketing" && "Marketing Campaigns"}
        </h2>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <div className="h-8 w-8 rounded-full bg-primary-foreground flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
