
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ChatInterface from "./chatbot/ChatInterface";
import BehaviorTab from "./chatbot/BehaviorTab";
import AppearanceTab from "./chatbot/AppearanceTab";

interface ChatbotTestingProps {
  botName: string;
}

const ChatbotTesting = ({ botName }: ChatbotTestingProps) => {
  const [activeTab, setActiveTab] = useState("test");

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Test Your Chatbot</CardTitle>
            <CardDescription>See how your chatbot will respond to user queries</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Active
          </Badge>
        </div>
      </CardHeader>
      <Tabs defaultValue="test" value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-4 pb-0">
          <TabsList className="mb-4">
            <TabsTrigger value="test">Test Chat</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
        </CardContent>
        
        <TabsContent value="test">
          <ChatInterface botName={botName} />
        </TabsContent>
        
        <TabsContent value="behavior">
          <BehaviorTab />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ChatbotTesting;
