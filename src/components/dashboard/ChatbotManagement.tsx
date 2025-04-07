
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
import { Bot, MoreHorizontal, Edit, Copy, Trash, MessageSquare, BarChart3, Clock, Users, ArrowRight, Database, Link, Zap } from "lucide-react";
import CreateChatbotButton from "@/components/CreateChatbotButton";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Chatbots</h2>
        <CreateChatbotButton />
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
}

const ChatbotCard = ({ chatbot, onToggleStatus, onDelete, onDuplicate, setActiveTab }: ChatbotCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { toast } = useToast();
  
  const getBuildStage = (progress: number) => {
    if (progress < 25) return "Create";
    if (progress < 50) return "Build";
    if (progress < 75) return "Connect";
    return "Complete";
  };
  
  const handleContinue = () => {
    const stage = getBuildStage(chatbot.progress);
    if (stage === "Create") setActiveTab("create");
    if (stage === "Build") setActiveTab("sources");
    if (stage === "Connect") setActiveTab("connect");
    
    toast({
      title: "Continuing setup",
      description: `Navigating to the ${stage} stage for "${chatbot.name}"`
    });
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
          
          <Badge variant="secondary" className="text-xs">
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
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>Create</span>
              <span>Build</span>
              <span>Connect</span>
            </div>
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
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" /> Stats
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatbotManagement;
