
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import AdminSidebar from "@/components/admin/dashboard/AdminSidebar";
import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";
import UserManagement, { User } from "@/components/admin/dashboard/UserManagement";
import SettingsPanel from "@/components/admin/dashboard/SettingsPanel";
import MessagesPanel from "@/components/admin/dashboard/MessagesPanel";
import MarketingPanel from "@/components/admin/dashboard/MarketingPanel";

// Import existing components
import SubscriptionManagement from "@/components/admin/SubscriptionManagement";
import RevenueAnalytics from "@/components/admin/RevenueAnalytics";
import CouponManagement from "@/components/admin/CouponManagement";

// Dummy user data for demonstration
const dummyUsers: User[] = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    plan: "Monthly",
    status: "active",
    lastLogin: "2 hours ago",
    joined: "Jan 12, 2023"
  },
  {
    id: 2,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    plan: "Annual",
    status: "inactive",
    lastLogin: "5 days ago",
    joined: "Mar 20, 2023"
  },
  {
    id: 3,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    plan: "Semi-Annual",
    status: "active",
    lastLogin: "1 day ago",
    joined: "Feb 15, 2023"
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    plan: "Monthly",
    status: "active",
    lastLogin: "3 hours ago",
    joined: "Apr 5, 2023"
  },
  {
    id: 5,
    name: "Sarah Taylor",
    email: "sarah.taylor@example.com",
    plan: "Monthly",
    status: "pending",
    lastLogin: "Never",
    joined: "May 10, 2023"
  }
];

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Authentication check
  useEffect(() => {
    const isAdminAuth = localStorage.getItem("adminAuth") === "true";
    if (!isAdminAuth) {
      navigate("/admin");
    }
  }, [navigate]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesPlan = filterPlan === "all" || user.plan === filterPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleActivateUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "active" } : user
    ));
    toast({
      title: "User activated",
      description: "User has been successfully activated",
    });
  };

  const handleDeactivateUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "inactive" } : user
    ));
    toast({
      title: "User deactivated",
      description: "User has been successfully deactivated",
    });
  };

  const handleChangePlan = (userId: number, newPlan: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, plan: newPlan } : user
    ));
    toast({
      title: "Plan updated",
      description: `User's plan has been updated to ${newPlan}`,
    });
  };

  const handleSendEmail = (userId: number) => {
    toast({
      title: "Email sent",
      description: "Email has been sent to the user",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Dashboard overview stats
  const dashboardStats = {
    newUsers: 24,
    activeSubscriptions: 243,
    revenue: "$12,450",
    growth: "+15.2%",
    averageSessionTime: "4m 12s",
    conversionRate: "8.3%",
    churned: 5,
    pendingInvoices: 12
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
        />

        <div className="flex-1 overflow-auto">
          <AdminHeader activeTab={activeTab} />

          <div className="p-6">
            {activeTab === "dashboard" && (
              <DashboardOverview stats={dashboardStats} />
            )}

            {activeTab === "users" && (
              <UserManagement
                users={users}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPlan={filterPlan}
                setFilterPlan={setFilterPlan}
                filteredUsers={filteredUsers}
                handleActivateUser={handleActivateUser}
                handleDeactivateUser={handleDeactivateUser}
                handleChangePlan={handleChangePlan}
                handleSendEmail={handleSendEmail}
                getStatusColor={getStatusColor}
              />
            )}

            {activeTab === "subscriptions" && <SubscriptionManagement />}
            {activeTab === "analytics" && <RevenueAnalytics />}
            {activeTab === "coupons" && <CouponManagement />}
            {activeTab === "settings" && <SettingsPanel />}
            {activeTab === "messages" && <MessagesPanel />}
            {activeTab === "marketing" && <MarketingPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
