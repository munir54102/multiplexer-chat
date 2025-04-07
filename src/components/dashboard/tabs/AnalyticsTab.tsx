
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { ShoppingBag, Users, MessageSquare, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import EcommerceAnalytics from "./analytics/EcommerceAnalytics";

// Sample data for charts
const sessionData = [
  { name: "Mon", sessions: 400 },
  { name: "Tue", sessions: 300 },
  { name: "Wed", sessions: 500 },
  { name: "Thu", sessions: 280 },
  { name: "Fri", sessions: 590 },
  { name: "Sat", sessions: 390 },
  { name: "Sun", sessions: 490 }
];

const interactionData = [
  { name: "Greetings", value: 25 },
  { name: "Questions", value: 40 },
  { name: "Product Info", value: 15 },
  { name: "Support", value: 20 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const performanceData = [
  { name: "Mon", rating: 4.2 },
  { name: "Tue", rating: 4.3 },
  { name: "Wed", rating: 4.1 },
  { name: "Thu", rating: 4.5 },
  { name: "Fri", rating: 4.4 },
  { name: "Sat", rating: 4.7 },
  { name: "Sun", rating: 4.6 }
];

const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState("week");
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-input px-3 py-2 bg-background text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">1,324</p>
                    <p className="text-xs text-green-600">+12% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Conversations</p>
                    <p className="text-2xl font-bold">8,492</p>
                    <p className="text-xs text-green-600">+8% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-2xl font-bold">237</p>
                    <p className="text-xs text-green-600">+5% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Overview</CardTitle>
                <CardDescription>Number of sessions per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interactions</CardTitle>
                <CardDescription>Types of user interactions with your chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interactionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {interactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <div>
            <h3 className="text-lg font-medium mb-4">Engagement Metrics</h3>
            <p className="text-gray-600 mb-6">
              Track how users are interacting with your chatbot across different platforms.
            </p>
            
            {/* Content for Engagement tab would go here */}
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div>
            <h3 className="text-lg font-medium mb-4">Chatbot Performance</h3>
            <p className="text-gray-600 mb-6">
              Monitor your chatbot's effectiveness and user satisfaction metrics.
            </p>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>User Satisfaction Ratings</CardTitle>
                <CardDescription>Average daily satisfaction rating (out of 5)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[3, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ecommerce">
          <EcommerceAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsTab;
