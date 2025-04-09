
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import GuidedTutorial from "@/components/GuidedTutorial";
import ChatbotGrid from "./chatbot/ChatbotGrid";
import { initialChatbots } from "./chatbot/mockData";
import { Chatbot } from "./chatbot/ChatbotCard";
import { Upload, ShoppingCart } from "lucide-react";

const ChatbotManagement = () => {
  const [chatbots, setChatbots] = useState(initialChatbots);
  const [currentTab, setCurrentTab] = useState("all");
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter chatbots based on tab
  const filteredChatbots = chatbots.filter(chatbot => {
    if (currentTab === "all") return true;
    return chatbot.status === currentTab;
  });
  
  const toggleStatus = (id: number) => {
    setChatbots(chatbots.map(chatbot => 
      chatbot.id === id 
        ? { ...chatbot, status: chatbot.status === "active" ? "inactive" : "active" }
        : chatbot
    ));
    
    const bot = chatbots.find(b => b.id === id);
    const newStatus = bot?.status === "active" ? "deactivated" : "activated";
    
    toast({
      title: `Chatbot ${newStatus}`,
      description: `"${bot?.name}" has been ${newStatus}.`
    });
  };
  
  const deleteChatbot = (id: number) => {
    const bot = chatbots.find(b => b.id === id);
    setChatbots(chatbots.filter(chatbot => chatbot.id !== id));
    
    toast({
      title: "Chatbot deleted",
      description: `"${bot?.name}" has been deleted.`
    });
  };
  
  const duplicateChatbot = (id: number) => {
    const botToDuplicate = chatbots.find(b => b.id === id);
    if (!botToDuplicate) return;
    
    const newBot: Chatbot = {
      ...botToDuplicate,
      id: Math.max(...chatbots.map(b => b.id)) + 1,
      name: `${botToDuplicate.name} (Copy)`,
      status: "inactive" as const,  // Explicitly set to "inactive" as a literal type
      progress: 20
    };
    
    setChatbots([...chatbots, newBot]);
    
    toast({
      title: "Chatbot duplicated",
      description: `"${botToDuplicate.name}" has been duplicated.`
    });
  };

  const setActiveTab = (tabId: string) => {
    navigate(`/dashboard`);
    // Additional logic if needed
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
  };

  const handleCreateEcommerceChatbot = () => {
    const newBot: Chatbot = {
      id: Math.max(...chatbots.map(b => b.id)) + 1,
      name: "E-commerce Assistant",
      description: "Product recommendations and order support",
      type: "ecommerce",
      status: "inactive" as const,
      lastModified: "Just now",
      messagesCount: 0,
      integrationsCount: 0,
      progress: 10
    };
    
    setChatbots([...chatbots, newBot]);
    
    toast({
      title: "E-commerce chatbot created",
      description: "Your new e-commerce assistant has been created successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      {showTutorial && <GuidedTutorial onComplete={() => setShowTutorial(false)} />}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">My Chatbots</h2>
          <p className="text-gray-600">Manage your chatbots or create a new one</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleStartTutorial}>
            Creation Guide
          </Button>
          <Button variant="outline" onClick={handleCreateEcommerceChatbot}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            E-commerce Bot
          </Button>
          <CreateChatbotButton />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Chatbots</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <ChatbotGrid 
            chatbots={filteredChatbots}
            onToggleStatus={toggleStatus}
            onDelete={deleteChatbot}
            onDuplicate={duplicateChatbot}
            setActiveTab={setActiveTab}
            onStartTutorial={handleStartTutorial}
          />
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <ChatbotGrid 
            chatbots={filteredChatbots}
            onToggleStatus={toggleStatus}
            onDelete={deleteChatbot}
            onDuplicate={duplicateChatbot}
            setActiveTab={setActiveTab}
            onStartTutorial={handleStartTutorial}
          />
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <ChatbotGrid 
            chatbots={filteredChatbots}
            onToggleStatus={toggleStatus}
            onDelete={deleteChatbot}
            onDuplicate={duplicateChatbot}
            setActiveTab={setActiveTab}
            onStartTutorial={handleStartTutorial}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotManagement;
