
import React from "react";
import { 
  UserCheck, 
  CreditCard, 
  Wallet, 
  Mail, 
  LineChart, 
  MessageSquare,
  Shield,
  Users,
  Gift,
  FileText,
  Megaphone
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  newUsers: number;
  activeSubscriptions: number;
  revenue: string;
  growth: string;
  averageSessionTime: string;
  conversionRate: string;
  churned: number;
  pendingInvoices: number;
}

interface DashboardOverviewProps {
  stats: DashboardStats;
}

const DashboardOverview = ({ stats }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Users (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newUsers}</div>
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
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
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
            <div className="text-2xl font-bold">{stats.revenue}</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              {stats.growth} from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Churned Users (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.churned}</div>
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
                <Badge variant="outline">{stats.pendingInvoices}</Badge>
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
  );
};

export default DashboardOverview;
