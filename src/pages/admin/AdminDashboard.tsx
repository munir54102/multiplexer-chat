
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
  MoreHorizontal
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
    plan: "Annual",
    status: "pending",
    lastLogin: "Never",
    joined: "May 10, 2023"
  }
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
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
                    activeTab === "billing"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("billing")}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Billing
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
            </ul>
          </nav>
          <div className="p-4 mt-auto border-t border-gray-200">
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
            <h2 className="text-2xl font-bold">
              {activeTab === "users" && "User Management"}
              {activeTab === "billing" && "Billing & Subscriptions"}
              {activeTab === "analytics" && "Analytics Dashboard"}
              {activeTab === "settings" && "Admin Settings"}
            </h2>
          </header>

          {/* Tab Content */}
          <div className="p-6">
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

            {activeTab === "billing" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Total Revenue</CardTitle>
                      <CardDescription>Monthly recurring revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$12,450</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +12.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Active Subscriptions</CardTitle>
                      <CardDescription>Across all plans</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">243</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +5.2% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Average Plan Value</CardTitle>
                      <CardDescription>Per subscription</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$51.23</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +2.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Plan Distribution</CardTitle>
                    <CardDescription>User breakdown by plan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-gray-500">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4">Discount Codes</h3>
                  <div className="flex items-center border rounded-md p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex-1">
                      <div className="font-semibold">MUNIR70</div>
                      <div className="text-sm text-gray-500">70% off all plans</div>
                    </div>
                    <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="traffic">Traffic</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="conversions">Conversions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1,234</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">852</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">12.5%</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4m 23s</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-gray-500">Growth chart would go here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="traffic" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-gray-500">Traffic sources chart would go here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="engagement" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Engagement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-gray-500">Engagement metrics would go here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="conversions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conversion Funnel</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-gray-500">Conversion funnel would go here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Subscription changes</h4>
                        <p className="text-sm text-gray-500">Get notified when users upgrade or downgrade</p>
                      </div>
                      <div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Payment failures</h4>
                        <p className="text-sm text-gray-500">Get notified about failed payments</p>
                      </div>
                      <div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
