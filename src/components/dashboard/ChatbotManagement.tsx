
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
import { BookOpen, Check, X, Loader, Grid2X2 } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

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
    if (currentTab === "active") return chatbot.status === "active";
    if (currentTab === "inactive") return chatbot.status === "inactive";
    if (currentTab === "in-progress") return chatbot.progress < 100;
    return true;
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

  // Tutorial steps cards for new users
  const renderTutorialSteps = () => {
    if (hasChatbots) return null;
    
    const steps = [
      { 
        title: "1. Create", 
        description: "Name your chatbot and define its purpose", 
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        onClick: () => navigate("/dashboard/create")
      },
      { 
        title: "2. Build", 
        description: "Add knowledge from files, websites, or custom text", 
        icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
        onClick: () => navigate("/dashboard/sources")
      },
      { 
        title: "3. Connect", 
        description: "Deploy to your website and other platforms", 
        icon: <BookOpen className="h-6 w-6 text-green-600" />,
        onClick: () => navigate("/dashboard/connect")
      },
      { 
        title: "4. Analyze", 
        description: "Monitor and improve performance", 
        icon: <BookOpen className="h-6 w-6 text-amber-600" />,
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
                Follow Tutorial Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {renderTutorialSteps()}
      
      {hasChatbots && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">My Chatbots</h2>
            <p className="text-gray-600">Manage your existing chatbots or create a new one</p>
          </div>
          <div className="flex gap-2">
            <CreateChatbotButton variant="default" />
            <Button variant="outline" onClick={handleStartTutorial}>
              <BookOpen className="h-4 w-4 mr-2" />
              Creation Guide
            </Button>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mt-6">
        {hasChatbots && (
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Grid2X2 className="h-4 w-4" />
                <span>All Chatbots</span>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-600" />
                <span>Active</span>
              </TabsTrigger>
              <TabsTrigger value="inactive" className="flex items-center gap-1">
                <X className="h-4 w-4 text-gray-600" />
                <span>Inactive</span>
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center gap-1">
                <Loader className="h-4 w-4 text-amber-600" />
                <span>In Progress</span>
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        
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
            
            <TabsContent value="in-progress" className="mt-0">
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
