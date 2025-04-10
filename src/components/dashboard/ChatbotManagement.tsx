
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
import { Upload, ShoppingCart, BookOpen, ArrowRight, Wrench, Database, Link, PlayCircle, BarChart3 } from "lucide-react";
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const ChatbotManagement = () => {
  const [chatbots, setChatbots] = useState(initialChatbots);
  const [currentTab, setCurrentTab] = useState("all");
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user has any chatbots
  const hasChatbots = chatbots.length > 0;
  
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
      status: "inactive" as const,
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

  // Tutorial steps cards for new users
  const renderTutorialSteps = () => {
    if (hasChatbots) return null;
    
    const steps = [
      { 
        title: "1. Create", 
        description: "Name your chatbot and define its purpose", 
        icon: <Wrench className="h-6 w-6 text-primary" />,
        onClick: () => navigate("/dashboard/create")
      },
      { 
        title: "2. Build", 
        description: "Add knowledge from files, websites, or custom text", 
        icon: <Database className="h-6 w-6 text-indigo-600" />,
        onClick: () => navigate("/dashboard/sources")
      },
      { 
        title: "3. Connect", 
        description: "Deploy to your website and other platforms", 
        icon: <Link className="h-6 w-6 text-green-600" />,
        onClick: () => navigate("/dashboard/connect")
      },
      { 
        title: "4. Analyze", 
        description: "Monitor and improve performance", 
        icon: <BarChart3 className="h-6 w-6 text-amber-600" />,
        onClick: () => navigate("/dashboard/analytics")
      }
    ];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {steps.map((step, index) => (
          <Card key={index} className="border hover:shadow-md transition-all cursor-pointer" onClick={step.onClick}>
            <CardContent className="p-4 pt-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {step.icon}
                </div>
                <h3 className="font-medium">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {showTutorial && <GuidedTutorial onComplete={() => setShowTutorial(false)} />}
      
      {!hasChatbots && (
        <Card className="border-2 border-primary/30 bg-primary/5 mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Create Your First Chatbot</CardTitle>
              <CardDescription className="text-lg">
                Start by creating your first AI chatbot and follow our step-by-step guide
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <CreateChatbotButton size="lg" />
              <Button size="lg" variant="outline" onClick={handleStartTutorial}>
                Follow Tutorial Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {renderTutorialSteps()}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">My Chatbots</h2>
          <p className="text-gray-600">Manage your chatbots or create a new one</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleStartTutorial}>
            <BookOpen className="h-4 w-4 mr-2" />
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
        
        {hasChatbots ? (
          <>
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
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">You don't have any chatbots yet</p>
            <CreateChatbotButton />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default ChatbotManagement;
