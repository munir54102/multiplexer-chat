
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronRight, BarChart2, TrendingUp, Users, MessageSquare, 
  CornerRightDown, BarChart, Calendar, Clock, PercentCircle, 
  GanttChartSquare, LucideLineChart, LineChart 
} from "lucide-react";

const ABTesting = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();
  
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
              
              <TestDetailsPanel />
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

const TestDetailsPanel = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Welcome Message Test Details</CardTitle>
            <CardDescription>
              Testing different welcome messages to improve engagement
            </CardDescription>
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Running (9 days left)
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Performance Comparison</h3>
            <div className="border rounded-lg p-6 h-64 flex items-center justify-center">
              {/* This would be a chart in a real implementation */}
              <div className="text-center">
                <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart visualization</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  Variation A (Original)
                </h4>
                <div className="border rounded-lg p-4">
                  <p className="mb-3 text-gray-800">
                    "Welcome to our support chat! How can I help you today?"
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-sm text-gray-500">Impressions</div>
                      <div className="font-medium">620</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Responses</div>
                      <div className="font-medium">118</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Rate</div>
                      <div className="font-medium">19.0%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  Variation B (Leading)
                </h4>
                <div className="border rounded-lg p-4 border-green-200 bg-green-50">
                  <p className="mb-3 text-gray-800">
                    "Hi there! I'm your personal assistant. What can I help you with today?"
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-sm text-gray-500">Impressions</div>
                      <div className="font-medium">620</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Responses</div>
                      <div className="font-medium">150</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Rate</div>
                      <div className="font-medium text-green-600">24.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Test Information</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="font-medium">Running</div>
                  
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="font-medium">Apr 1, 2025</div>
                  
                  <div className="text-sm text-gray-500">End Date</div>
                  <div className="font-medium">Apr 14, 2025</div>
                  
                  <div className="text-sm text-gray-500">Traffic Split</div>
                  <div className="font-medium">50% / 50%</div>
                  
                  <div className="text-sm text-gray-500">Created By</div>
                  <div className="font-medium">Alex Johnson</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Test Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Total Visitors</span>
                    </div>
                    <span className="font-medium">1,240</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Conversations</span>
                    </div>
                    <span className="font-medium">268</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <PercentCircle className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Improvement</span>
                    </div>
                    <span className="font-medium text-green-600">+5.2%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CornerRightDown className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Confidence</span>
                    </div>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="w-full">
                  End Test
                </Button>
                <Button variant="outline" className="w-full">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CreateTestForm = ({ onCancel }: { onCancel: () => void }) => {
  const { toast } = useToast();
  const [testName, setTestName] = useState("");
  
  const handleSubmit = () => {
    if (!testName.trim()) {
      toast({
        variant: "destructive",
        title: "Test name required",
        description: "Please provide a name for your A/B test"
      });
      return;
    }
    
    toast({
      title: "A/B Test created",
      description: "Your new A/B test has been created successfully."
    });
    
    onCancel();
  };
  
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
          <Input 
            id="test-name" 
            placeholder="e.g., Welcome Message Test" 
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="test-description">Description</Label>
          <Input id="test-description" placeholder="Brief description of what you're testing" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-start">Start Date</Label>
            <div className="relative">
              <Input id="test-start" type="date" />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="test-end">End Date</Label>
            <div className="relative">
              <Input id="test-end" type="date" />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
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
        <Button onClick={handleSubmit}>Create Test</Button>
      </CardFooter>
    </Card>
  );
};

export default ABTesting;
