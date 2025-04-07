
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatbotTesting from "@/components/dashboard/ChatbotTesting";

const PlaygroundTab = () => {
  const [selectedBot, setSelectedBot] = useState("Customer Support Bot");

  const botOptions = [
    "Customer Support Bot",
    "Sales Assistant",
    "Marketing Bot"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Playground</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedBot} onValueChange={setSelectedBot}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a chatbot" />
            </SelectTrigger>
            <SelectContent>
              {botOptions.map((bot) => (
                <SelectItem key={bot} value={bot}>
                  {bot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Compare</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatbotTesting botName={selectedBot} />
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="accuracy">
              <TabsList className="mb-4">
                <TabsTrigger value="accuracy">Response Accuracy</TabsTrigger>
                <TabsTrigger value="speed">Response Time</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="accuracy">
                <div className="flex flex-col items-center justify-center h-[350px] border rounded-lg p-6 bg-gray-50">
                  <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">92%</span>
                  </div>
                  <p className="text-gray-600">Response accuracy based on user feedback</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full mt-8">
                    <div className="text-center">
                      <div className="text-lg font-medium">350</div>
                      <div className="text-xs text-gray-500">INTERACTIONS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">26</div>
                      <div className="text-xs text-gray-500">FALLBACKS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">8%</div>
                      <div className="text-xs text-gray-500">ERROR RATE</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="speed">
                <div className="flex flex-col items-center justify-center h-[350px] border rounded-lg p-6 bg-gray-50">
                  <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">1.2s</span>
                  </div>
                  <p className="text-gray-600">Average response time</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full mt-8">
                    <div className="text-center">
                      <div className="text-lg font-medium">0.8s</div>
                      <div className="text-xs text-gray-500">FASTEST</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">1.2s</div>
                      <div className="text-xs text-gray-500">AVERAGE</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">2.3s</div>
                      <div className="text-xs text-gray-500">SLOWEST</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="usage">
                <div className="flex flex-col items-center justify-center h-[350px] border rounded-lg p-6 bg-gray-50">
                  <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">2,543</span>
                  </div>
                  <p className="text-gray-600">Total interactions this month</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full mt-8">
                    <div className="text-center">
                      <div className="text-lg font-medium">85</div>
                      <div className="text-xs text-gray-500">PER DAY</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">+12%</div>
                      <div className="text-xs text-gray-500">VS LAST MONTH</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">62%</div>
                      <div className="text-xs text-gray-500">COMPLETION RATE</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaygroundTab;
