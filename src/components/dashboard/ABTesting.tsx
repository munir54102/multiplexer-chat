
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarChart, ChartContainer, ChartBar, Play, Pause, Plus, MessageSquare, ThumbsUp, ThumbsDown, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ABTesting = () => {
  const { toast } = useToast();
  const [activeTest, setActiveTest] = useState<string | null>(null);
  
  const testScenarios = [
    {
      id: "test1",
      name: "Welcome Message Test",
      status: "Running",
      variantA: "Welcome! How can I assist you today?",
      variantB: "Hi there! I'm your AI assistant. What can I help you with?",
      impressions: { A: 245, B: 258 },
      conversions: { A: 87, B: 112 },
      startDate: "2025-03-27",
      endDate: "2025-04-14",
    },
    {
      id: "test2",
      name: "Product Recommendation Style",
      status: "Paused",
      variantA: "Based on your preferences, I recommend Product X.",
      variantB: "Many customers like you have enjoyed Product X. Would you like to learn more?",
      impressions: { A: 189, B: 192 },
      conversions: { A: 42, B: 58 },
      startDate: "2025-03-20",
      endDate: "2025-04-03",
    },
  ];

  const handleCreateTest = () => {
    toast({
      title: "New A/B Test Created",
      description: "Your test has been created and is ready to start running."
    });
  };

  const handleToggleTest = (testId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Running" ? "Paused" : "Running";
    toast({
      title: `Test ${newStatus}`,
      description: `The A/B test has been ${newStatus.toLowerCase()}.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">A/B Testing</h2>
          <p className="text-sm text-muted-foreground">Optimize your chatbot responses by testing different variations</p>
        </div>
        <Button onClick={() => setActiveTest("new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {activeTest === "new" ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New A/B Test</CardTitle>
            <CardDescription>
              Set up a test to compare two different versions of a chatbot response
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="test-name">Test Name</Label>
                <Input id="test-name" placeholder="e.g., Welcome Message Test" />
              </div>
              
              <div>
                <Label htmlFor="test-type">Test Type</Label>
                <Select defaultValue="message">
                  <SelectTrigger id="test-type">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="message">Message Content</SelectItem>
                    <SelectItem value="style">Response Style</SelectItem>
                    <SelectItem value="flow">Conversation Flow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="variant-a">Variant A (Control)</Label>
                  <Textarea id="variant-a" placeholder="Enter response for Variant A" />
                </div>
                <div>
                  <Label htmlFor="variant-b">Variant B (Test)</Label>
                  <Textarea id="variant-b" placeholder="Enter response for Variant B" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="success-metric">Success Metric</Label>
                <Select defaultValue="conversion">
                  <SelectTrigger id="success-metric">
                    <SelectValue placeholder="Select success metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversion">Conversion Rate</SelectItem>
                    <SelectItem value="satisfaction">User Satisfaction</SelectItem>
                    <SelectItem value="completion">Task Completion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="start-immediately" />
                <Label htmlFor="start-immediately">Start test immediately</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTest(null)}>Cancel</Button>
            <Button onClick={handleCreateTest}>Create Test</Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testScenarios.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      test.status === "Running" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {test.status}
                    </div>
                  </div>
                  <CardDescription>
                    {test.startDate} - {test.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 border rounded-md">
                      <div className="text-xs text-gray-500 mb-1">Variant A</div>
                      <div className="text-sm">{test.variantA}</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-xs text-gray-500 mb-1">Variant B</div>
                      <div className="text-sm">{test.variantB}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Impressions</div>
                      <div className="flex h-4 mb-1">
                        <div 
                          className="bg-blue-500 rounded-l-full" 
                          style={{ width: `${(test.impressions.A / (test.impressions.A + test.impressions.B)) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-purple-500 rounded-r-full" 
                          style={{ width: `${(test.impressions.B / (test.impressions.A + test.impressions.B)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>A: {test.impressions.A}</span>
                        <span>B: {test.impressions.B}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Conversions</div>
                      <div className="flex h-4 mb-1">
                        <div 
                          className="bg-blue-500 rounded-l-full" 
                          style={{ width: `${(test.conversions.A / (test.conversions.A + test.conversions.B)) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-purple-500 rounded-r-full" 
                          style={{ width: `${(test.conversions.B / (test.conversions.A + test.conversions.B)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>A: {test.conversions.A} ({Math.round((test.conversions.A / test.impressions.A) * 100)}%)</span>
                        <span>B: {test.conversions.B} ({Math.round((test.conversions.B / test.impressions.B) * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    variant={test.status === "Running" ? "destructive" : "default"} 
                    size="sm"
                    onClick={() => handleToggleTest(test.id, test.status)}
                  >
                    {test.status === "Running" ? (
                      <><Pause className="h-4 w-4 mr-1" /> Pause</>
                    ) : (
                      <><Play className="h-4 w-4 mr-1" /> Start</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ABTesting;
