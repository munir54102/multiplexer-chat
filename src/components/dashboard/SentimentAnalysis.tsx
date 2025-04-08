
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { SmilePlus, Frown, Meh, Calendar, Download, Filter } from "lucide-react";

const SentimentAnalysis = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  // Sample sentiment data
  const sentimentDistribution = [
    { name: "Positive", value: 65, color: "#10b981" },
    { name: "Neutral", value: 25, color: "#6b7280" },
    { name: "Negative", value: 10, color: "#ef4444" },
  ];
  
  const sentimentTrend = [
    { date: "Apr 1", positive: 58, neutral: 32, negative: 10 },
    { date: "Apr 2", positive: 60, neutral: 30, negative: 10 },
    { date: "Apr 3", positive: 65, neutral: 25, negative: 10 },
    { date: "Apr 4", positive: 70, neutral: 20, negative: 10 },
    { date: "Apr 5", positive: 68, neutral: 22, negative: 10 },
    { date: "Apr 6", positive: 65, neutral: 25, negative: 10 },
    { date: "Apr 7", positive: 72, neutral: 18, negative: 10 },
  ];
  
  const topPositiveTopics = [
    { topic: "Product features", count: 42 },
    { topic: "Customer support", count: 37 },
    { topic: "Ease of use", count: 28 },
    { topic: "Pricing", count: 15 },
    { topic: "Documentation", count: 12 },
  ];
  
  const topNegativeTopics = [
    { topic: "Loading speed", count: 18 },
    { topic: "Complex setup", count: 15 },
    { topic: "Missing features", count: 10 },
    { topic: "Mobile experience", count: 8 },
    { topic: "Pricing", count: 7 },
  ];
  
  // Conversations with strongest sentiment
  const keyConversations = [
    {
      id: "conv123",
      sentiment: "positive",
      score: 0.92,
      message: "Your chatbot has been incredibly helpful! It saved me hours of work. Thank you!",
      time: "2025-04-07 14:23",
    },
    {
      id: "conv124",
      sentiment: "negative",
      score: 0.85,
      message: "I've been trying to set this up for an hour and it still doesn't work. Terrible experience.",
      time: "2025-04-06 10:15",
    },
    {
      id: "conv125",
      sentiment: "positive",
      score: 0.88,
      message: "The new features are amazing! You've really taken things to the next level.",
      time: "2025-04-05 16:42",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground">Understand how users feel about their interactions with your chatbot</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <SmilePlus className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Sentiment</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">65%</p>
                <p className="text-xs text-green-600 ml-2">+5% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <Meh className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Neutral Sentiment</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">25%</p>
                <p className="text-xs text-gray-600 ml-2">-2% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <Frown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative Sentiment</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">10%</p>
                <p className="text-xs text-red-600 ml-2">-3% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Sentiment Trends</TabsTrigger>
          <TabsTrigger value="topics">Key Topics</TabsTrigger>
          <TabsTrigger value="conversations">Key Conversations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription>Overall sentiment breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sentimentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Over Time</CardTitle>
                <CardDescription>How sentiment has changed recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="positive" stroke="#10b981" />
                      <Line type="monotone" dataKey="neutral" stroke="#6b7280" />
                      <Line type="monotone" dataKey="negative" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends</CardTitle>
              <CardDescription>Detailed view of sentiment changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Positive Topics</CardTitle>
                <CardDescription>What users are happy about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPositiveTopics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="topic" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Negative Topics</CardTitle>
                <CardDescription>What users are unhappy about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topNegativeTopics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="topic" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Key Conversations</CardTitle>
              <CardDescription>Conversations with strongest sentiment indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyConversations.map((conv) => (
                  <div 
                    key={conv.id}
                    className={`p-4 rounded-lg border ${
                      conv.sentiment === 'positive' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {conv.sentiment === 'positive' ? (
                          <SmilePlus className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <Frown className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <span className="font-medium">
                          {conv.sentiment === 'positive' ? 'Positive' : 'Negative'} Sentiment
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            (Score: {conv.score})
                          </span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-gray-700">{conv.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SentimentAnalysis;
