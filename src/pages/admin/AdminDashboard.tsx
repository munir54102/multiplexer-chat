import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
  UserCheck,
  UserX,
  Mail,
  RefreshCcw,
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Home,
  Gift,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  Tag,
  ArrowUpRight,
  Wallet,
  LineChart,
  MessageSquare,
  Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import SubscriptionManagement from "@/components/admin/SubscriptionManagement";
import RevenueAnalytics from "@/components/admin/RevenueAnalytics";
import CouponManagement from "@/components/admin/CouponManagement";

// Dummy user data for demonstration
const dummyUsers = [
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
    plan: "pending",
    lastLogin: "Never",
    joined: "May 10, 2023"
  }
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [secondaryTab, setSecondaryTab] = useState("overview");
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
        {/* Sidebar */}
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
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
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

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">New Users (Today)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.newUsers}</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +12.5% from yesterday
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.activeSubscriptions}</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +5.2% from last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.revenue}</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        {dashboardStats.growth} from last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Churned Users (This Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.churned}</div>
                      <div className="text-xs text-red-600 flex items-center mt-1">
                        <span className="i-lucide-trending-down mr-1"></span>
                        2.1% churn rate
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Monthly revenue for the past 6 months</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-center">
                          <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Revenue chart would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest user actions and system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <UserCheck className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">New user registered</p>
                            <p className="text-sm text-gray-500">Alex Johnson (alex.johnson@example.com)</p>
                            <p className="text-xs text-gray-400">10 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <CreditCard className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">New subscription</p>
                            <p className="text-sm text-gray-500">Sarah Taylor upgraded to Premium Plan</p>
                            <p className="text-xs text-gray-400">1 hour ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <Wallet className="h-5 w-5 text-red-700" />
                          </div>
                          <div>
                            <p className="font-medium">Payment failed</p>
                            <p className="text-sm text-gray-500">Michael Brown's payment method rejected</p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <Mail className="h-5 w-5 text-purple-700" />
                          </div>
                          <div>
                            <p className="font-medium">Campaign sent</p>
                            <p className="text-sm text-gray-500">Monthly newsletter sent to 1,245 subscribers</p>
                            <p className="text-xs text-gray-400">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Wallet className="h-5 w-5 text-amber-500 mr-3" />
                            <span>Pending invoices</span>
                          </div>
                          <Badge variant="outline">{dashboardStats.pendingInvoices}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
                            <span>Unanswered messages</span>
                          </div>
                          <Badge variant="outline">3</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-red-500 mr-3" />
                            <span>Security alerts</span>
                          </div>
                          <Badge variant="outline">2</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Premium Annual</span>
                            <span className="text-sm text-gray-500">45%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Basic Monthly</span>
                            <span className="text-sm text-gray-500">30%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Premium Monthly</span>
                            <span className="text-sm text-gray-500">15%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Enterprise</span>
                            <span className="text-sm text-gray-500">10%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="h-24 flex flex-col justify-center items-center">
                          <Users className="h-6 w-6 mb-2" />
                          <span>Add User</span>
                        </Button>
                        <Button className="h-24 flex flex-col justify-center items-center">
                          <Gift className="h-6 w-6 mb-2" />
                          <span>Create Coupon</span>
                        </Button>
                        <Button className="h-24 flex flex-col justify-center items-center">
                          <FileText className="h-6 w-6 mb-2" />
                          <span>View Reports</span>
                        </Button>
                        <Button className="h-24 flex flex-col justify-center items-center">
                          <Megaphone className="h-6 w-6 mb-2" />
                          <span>New Campaign</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filterPlan}
                      onValueChange={setFilterPlan}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All plans</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Add a new user to the platform. They will receive an email invitation.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="User's full name"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="user@example.com"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="plan" className="text-right">
                              Plan
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a plan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                                <SelectItem value="annual">Annual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add User</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Select
                                defaultValue={user.plan}
                                onValueChange={(value) => handleChangePlan(user.id, value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Monthly">Monthly</SelectItem>
                                  <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                                  <SelectItem value="Annual">Annual</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>{user.joined}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                                    <UserCheck className="h-4 w-4 mr-2" /> Activate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}>
                                    <UserX className="h-4 w-4 mr-2" /> Deactivate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSendEmail(user.id)}>
                                    <Mail className="h-4 w-4 mr-2" /> Send Email
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            No users found matching your filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

            {activeTab === "subscriptions" && (
              <SubscriptionManagement />
            )}

            {activeTab === "analytics" && (
              <RevenueAnalytics />
            )}

            {activeTab === "coupons" && (
              <CouponManagement />
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Settings</CardTitle>
                    <CardDescription>Manage your admin account and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input id="admin-email" defaultValue="admin@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Change Password</Label>
                      <Input id="admin-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Configure what notifications you receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">New user registrations</h4>
                        <p className="text-sm text-gray-500">Get notified when a new user signs up</p>
                      </div>
                      <div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-
