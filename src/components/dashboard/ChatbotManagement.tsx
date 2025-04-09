
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bot, MoreHorizontal, Edit, Copy, Trash, MessageSquare, BarChart3, Clock, Users, ArrowRight, Database, Link, Zap, Play, Palette } from "lucide-react";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import GuidedTutorial from "@/components/GuidedTutorial";

// Mock data for chatbots
const initialChatbots = [
  {
    id: 1,
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    type: "customer-support",
    status: "active",
    lastModified: "2 hours ago",
    messagesCount: 2543,
    integrationsCount: 3,
    progress: 100
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Helps with product recommendations and sales",
    type: "sales",
    status: "active",
    lastModified: "1 day ago",
    messagesCount: 1283,
    integrationsCount: 2,
    progress: 80
  },
  {
    id: 3,
    name: "Marketing Bot",
    description: "Captures leads from marketing campaigns",
    type: "marketing",
    status: "inactive",
    lastModified: "1 week ago",
    messagesCount: 763,
    integrationsCount: 1,
    progress: 40
  }
];

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
    
    const newBot = {
      ...botToDuplicate,
      id: Math.max(...chatbots.map(b => b.id)) + 1,
      name: `${botToDuplicate.name} (Copy)`,
      status: "inactive",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChatbots.map((chatbot) => (
              <ChatbotCard 
                key={chatbot.id}
                chatbot={chatbot}
                onToggleStatus={toggleStatus}
                onDelete={deleteChatbot}
                onDuplicate={duplicateChatbot}
                setActiveTab={setActiveTab}
                onStartTutorial={handleStartTutorial}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChatbots.map((chatbot) => (
              <ChatbotCard 
                key={chatbot.id}
                chatbot={chatbot}
                onToggleStatus={toggleStatus}
                onDelete={deleteChatbot}
                onDuplicate={duplicateChatbot}
                setActiveTab={setActiveTab}
                onStartTutorial={handleStartTutorial}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChatbots.map((chatbot) => (
              <ChatbotCard 
                key={chatbot.id}
                chatbot={chatbot}
                onToggleStatus={toggleStatus}
                onDelete={deleteChatbot}
                onDuplicate={duplicateChatbot}
                setActiveTab={setActiveTab}
                onStartTutorial={handleStartTutorial}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ChatbotCardProps {
  chatbot: typeof initialChatbots[0];
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  setActiveTab: (tab: string) => void;
  onStartTutorial: () => void;
}

const ChatbotCard = ({ chatbot, onToggleStatus, onDelete, onDuplicate, setActiveTab, onStartTutorial }: ChatbotCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const getBuildStage = (progress: number) => {
    if (progress < 17) return "Create";
    if (progress < 34) return "Build";
    if (progress < 51) return "Design";
    if (progress < 68) return "Test";
    if (progress < 85) return "Deploy";
    return "Analyze";
  };
  
  const getStageIcon = (stage: string) => {
    switch(stage) {
      case "Create": return <Bot className="h-4 w-4 mr-1" />;
      case "Build": return <Database className="h-4 w-4 mr-1" />;
      case "Design": return <Palette className="h-4 w-4 mr-1" />;
      case "Test": return <Play className="h-4 w-4 mr-1" />;
      case "Deploy": return <Upload className="h-4 w-4 mr-1" />;
      case "Analyze": return <BarChart3 className="h-4 w-4 mr-1" />;
      default: return <Bot className="h-4 w-4 mr-1" />;
    }
  };
  
  const handleContinue = () => {
    const stage = getBuildStage(chatbot.progress);
    
    if (stage === "Create") {
      navigate("/dashboard/create");
    } else if (stage === "Build") {
      navigate("/dashboard/sources");
    } else if (stage === "Design") {
      navigate("/dashboard/settings/chat");
    } else if (stage === "Test") {
      navigate("/dashboard/playground");
    } else if (stage === "Deploy") {
      navigate("/dashboard/connect");
    } else if (stage === "Analyze") {
      navigate("/dashboard/analytics");
    }
    
    toast({
      title: "Continuing setup",
      description: `Navigating to the ${stage} stage for "${chatbot.name}"`
    });
  };
  
  const getNextStepAction = () => {
    const stage = getBuildStage(chatbot.progress);
    
    if (chatbot.progress < 100) {
      if (stage === "Create") {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <Bot className="h-4 w-4 mr-1" /> 
            Next: Create your chatbot
          </div>
        );
      } else if (stage === "Build") {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <Database className="h-4 w-4 mr-1" /> 
            Next: Build knowledge base
          </div>
        );
      } else if (stage === "Design") {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <Palette className="h-4 w-4 mr-1" /> 
            Next: Design appearance
          </div>
        );
      } else if (stage === "Test") {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <Play className="h-4 w-4 mr-1" /> 
            Next: Test responses
          </div>
        );
      } else if (stage === "Deploy") {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <Link className="h-4 w-4 mr-1" /> 
            Next: Deploy to platforms
          </div>
        );
      } else {
        return (
          <div className="text-sm text-green-600 flex items-center mt-2">
            <BarChart3 className="h-4 w-4 mr-1" /> 
            Next: Analyze performance
          </div>
        );
      }
    }
    
    return null;
  };
  
  return (
    <Card className={chatbot.status === "inactive" ? "opacity-75" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{chatbot.name}</CardTitle>
            <CardDescription className="mt-1">{chatbot.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleContinue()}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStartTutorial()}>
                <Bot className="mr-2 h-4 w-4" /> Creation Guide
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(chatbot.id)}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Chatbot</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete "{chatbot.name}"? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        onDelete(chatbot.id);
                        setConfirmDelete(false);
                      }}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Badge variant={chatbot.status === "active" ? "outline" : "secondary"} className={chatbot.status === "active" ? "border-green-500 text-green-700" : ""}>
            {chatbot.status === "active" ? "Active" : "Inactive"}
          </Badge>
          
          <Badge variant="secondary" className="text-xs flex items-center">
            {getStageIcon(getBuildStage(chatbot.progress))}
            {getBuildStage(chatbot.progress)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {chatbot.progress < 100 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Setup progress</span>
              <span className="text-xs font-medium">{chatbot.progress}%</span>
            </div>
            <Progress value={chatbot.progress} className="h-1" />
            <div className="mt-1 grid grid-cols-6 text-xs text-gray-400">
              <span className="text-center">Create</span>
              <span className="text-center">Build</span>
              <span className="text-center">Design</span>
              <span className="text-center">Test</span>
              <span className="text-center">Deploy</span>
              <span className="text-center">Analyze</span>
            </div>
            {getNextStepAction()}
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <MessageSquare className="h-4 w-4 mb-1 text-gray-500" />
            <span className="font-medium">{chatbot.messagesCount}</span>
            <span className="text-xs text-gray-500">Messages</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 mb-1 text-gray-500" />
            <span className="font-medium">{chatbot.lastModified}</span>
            <span className="text-xs text-gray-500">Last modified</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <Users className="h-4 w-4 mb-1 text-gray-500" />
            <span className="font-medium">{chatbot.integrationsCount}</span>
            <span className="text-xs text-gray-500">Integrations</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`active-${chatbot.id}`} 
            checked={chatbot.status === "active"}
            onCheckedChange={() => onToggleStatus(chatbot.id)}
          />
          <Label htmlFor={`active-${chatbot.id}`}>
            {chatbot.status === "active" ? "Active" : "Inactive"}
          </Label>
        </div>
        
        {chatbot.progress < 100 ? (
          <Button variant="default" size="sm" onClick={handleContinue}>
            Continue Setup <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/analytics")}>
            <BarChart3 className="h-4 w-4 mr-2" /> Stats
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatbotManagement;
