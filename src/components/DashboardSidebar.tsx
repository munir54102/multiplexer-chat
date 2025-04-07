
import { 
  Settings, 
  BrainCircuit, 
  MessageSquare, 
  Shield, 
  Users, 
  Bell, 
  Webhook,
  Plus,
  PlayCircle,
  Clock,
  BarChart3,
  Zap,
  Database,
  ArrowUpDown,
  UserPlus,
  Home,
  LogOut,
  FileText,
  Layers,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface DashboardSidebarProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const DashboardSidebar = ({ activeSection, setActiveSection, activeTab, setActiveTab }: DashboardSidebarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
      } catch (e) {
        setUserName("User");
      }
    }
  }, []);
  
  // Settings sidebar items
  const settingsItems = [
    { id: "general", label: "General", icon: Settings },
    { id: "ai", label: "AI", icon: BrainCircuit },
    { id: "chat", label: "Chat Interface", icon: MessageSquare },
    { id: "security", label: "Security", icon: Shield },
    { id: "leads", label: "Leads", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
  ];
  
  // Main navigation items - organized by workflow
  const mainNavItems = [
    { 
      heading: "Overview",
      items: [
        { id: "overview", label: "Dashboard", icon: Home },
        { id: "activity", label: "Activity", icon: Clock },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]
    },
    {
      heading: "Build Process",
      items: [
        { id: "create", label: "Create", icon: Plus },
        { id: "sources", label: "Build", icon: Database },
        { id: "connect", label: "Connect", icon: Link },
      ]
    },
    {
      heading: "Management",
      items: [
        { id: "playground", label: "Playground", icon: PlayCircle },
        { id: "actions", label: "Actions", icon: ArrowUpDown },
        { id: "contacts", label: "Contacts", icon: UserPlus },
      ]
    }
  ];
  
  const handleNav = (id: string) => {
    if (setActiveTab) {
      if (id === 'settings') {
        setActiveTab('settings');
        if (setActiveSection && !activeSection) {
          setActiveSection('general');
        }
      } else {
        setActiveTab(id);
      }
    }
  };

  const handleSettingsNav = (id: string) => {
    if (setActiveSection) {
      setActiveSection(id);
      if (setActiveTab) {
        setActiveTab('settings');
      }
    }
  };

  const handleCreateChatbot = () => {
    toast({
      title: "Creating new chatbot",
      description: "Opening the chatbot creation dialog",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate('/');
  };

  return (
    <div className="w-64 border-r border-gray-200 p-6 h-screen overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Welcome back</p>
            <h3 className="font-semibold">{userName}</h3>
          </div>
        </div>
        <Button 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleCreateChatbot}
        >
          <Plus size={16} />
          <span>Create Chatbot</span>
        </Button>
      </div>
      
      {mainNavItems.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.heading}</h2>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h2>
      <ul className="space-y-1 mb-6">
        {settingsItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleSettingsNav(item.id)}
              className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${
                activeTab === 'settings' && activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="pt-4 mt-6 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
