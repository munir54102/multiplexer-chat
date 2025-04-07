
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Users, 
  Calendar,
  DollarSign
} from "lucide-react";

const RevenueAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <div className="flex items-center mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$149,400</div>
            <div className="flex items-center mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+24.8% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <div className="flex items-center mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$51.23</div>
            <div className="flex items-center mt-1 text-sm text-red-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>-2.3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="churn">Churn</TabsTrigger>
          <TabsTrigger value="ltv">Customer LTV</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown for the past 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Revenue chart visualization would go here</p>
                  <p className="text-gray-400 text-sm mt-1">Connects to your payment processor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscriptions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
              <CardDescription>New vs churned subscriptions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <Users className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Subscription growth visualization would go here</p>
                  <p className="text-gray-400 text-sm mt-1">Shows new vs churned subscriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="churn" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Churn Analysis</CardTitle>
              <CardDescription>Monthly churn rate and reasons</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <Users className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Churn analysis visualization would go here</p>
                  <p className="text-gray-400 text-sm mt-1">Shows churn rate and causes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ltv" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value</CardTitle>
              <CardDescription>LTV by acquisition channel and plan type</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <DollarSign className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">LTV visualization would go here</p>
                  <p className="text-gray-400 text-sm mt-1">Shows customer value over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by payment method</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Payment methods chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Distribution by plan type</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Subscription plans chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
