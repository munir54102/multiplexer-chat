
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, BarChart2, TrendingUp, Users, MessageSquare } from "lucide-react";

const ABTesting = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Testing</h2>
          <p className="text-muted-foreground">
            Compare different versions of your chatbot to optimize performance
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          Create A/B Test
        </Button>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeTab === "active" && !showCreateForm ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TestCard 
                  title="Welcome Message Test"
                  description="Testing different welcome messages for engagement"
                  status="Running"
                  startDate="Apr 1, 2025"
                  endDate="Apr 14, 2025"
                  impressions={1240}
                  conversions={268}
                  winner="Variation B"
                />
                
                <TestCard 
                  title="Button Color Test"
                  description="Testing blue vs. green CTA buttons"
                  status="Running"
                  startDate="Apr 5, 2025"
                  endDate="Apr 19, 2025"
                  impressions={876}
                  conversions={124}
                />
              </div>
            </>
          ) : showCreateForm ? (
            <CreateTestForm onCancel={() => setShowCreateForm(false)} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No completed or draft tests yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TestCardProps {
  title: string;
  description: string;
  status: "Running" | "Completed" | "Draft";
  startDate: string;
  endDate: string;
  impressions: number;
  conversions: number;
  winner?: string;
}

const TestCard = ({ 
  title, 
  description, 
  status, 
  startDate, 
  endDate, 
  impressions, 
  conversions,
  winner
}: TestCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            status === "Running" ? "bg-green-100 text-green-800" : 
            status === "Completed" ? "bg-blue-100 text-blue-800" : 
            "bg-gray-100 text-gray-800"
          }`}>
            {status}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">{endDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Users className="h-4 w-4 text-gray-500 mb-1" />
            <p className="text-xs text-gray-500">Impressions</p>
            <p className="font-medium">{impressions.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <MessageSquare className="h-4 w-4 text-gray-500 mb-1" />
            <p className="text-xs text-gray-500">Conversions</p>
            <p className="font-medium">{conversions.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <BarChart2 className="h-4 w-4 text-gray-500 mb-1" />
            <p className="text-xs text-gray-500">Rate</p>
            <p className="font-medium">{(conversions/impressions*100).toFixed(1)}%</p>
          </div>
        </div>
        
        {winner && (
          <div className="mt-4 p-2 bg-blue-50 rounded flex items-center">
            <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
            <p className="text-sm">
              <span className="font-medium">{winner}</span> is outperforming
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm" className="text-xs">
          View Details <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const CreateTestForm = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New A/B Test</CardTitle>
        <CardDescription>
          Compare two versions of your chatbot to see which performs better
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-name">Test Name</Label>
          <Input id="test-name" placeholder="e.g., Welcome Message Test" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="test-description">Description</Label>
          <Input id="test-description" placeholder="Brief description of what you're testing" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-start">Start Date</Label>
            <Input id="test-start" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="test-end">End Date</Label>
            <Input id="test-end" type="date" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="test-bot">Select Chatbot</Label>
          <Select>
            <SelectTrigger id="test-bot">
              <SelectValue placeholder="Select a chatbot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="support-bot">Customer Support Bot</SelectItem>
              <SelectItem value="sales-bot">Sales Assistant</SelectItem>
              <SelectItem value="faq-bot">FAQ Bot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4 border p-4 rounded-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">Variation A (Original)</h4>
            <div className="flex items-center space-x-2">
              <Label htmlFor="control-traffic">Traffic %</Label>
              <Input id="control-traffic" type="number" className="w-20" defaultValue="50" />
            </div>
          </div>
          
          {/* Original settings would be shown here */}
        </div>
        
        <div className="space-y-4 border p-4 rounded-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">Variation B</h4>
            <div className="flex items-center space-x-2">
              <Label htmlFor="variant-traffic">Traffic %</Label>
              <Input id="variant-traffic" type="number" className="w-20" defaultValue="50" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variation-type">What to vary</Label>
            <Select>
              <SelectTrigger id="variation-type">
                <SelectValue placeholder="Select element to vary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Message</SelectItem>
                <SelectItem value="button">Button Style</SelectItem>
                <SelectItem value="layout">Layout</SelectItem>
                <SelectItem value="tone">Tone of Voice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variation-value">Variant Value</Label>
            <Input id="variation-value" placeholder="Enter new value for this variation" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="auto-winner" />
          <Label htmlFor="auto-winner">Automatically select winner at end of test</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button>Create Test</Button>
      </CardFooter>
    </Card>
  );
};

export default ABTesting;
