
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
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DashboardSidebarProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const DashboardSidebar = ({ activeSection, setActiveSection, activeTab, setActiveTab }: DashboardSidebarProps) => {
  const { toast } = useToast();
  
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
  
  // Main navigation items
  const mainNavItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "playground", label: "Playground", icon: PlayCircle },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "connect", label: "Connect", icon: Zap },
    { id: "sources", label: "Sources", icon: Database },
    { id: "actions", label: "Actions", icon: ArrowUpDown },
    { id: "contacts", label: "Contacts", icon: UserPlus },
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

  return (
    <div className="w-64 border-r border-gray-200 p-6 h-screen overflow-y-auto">
      <div className="mb-8">
        <Button 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleCreateChatbot}
        >
          <Plus size={16} />
          <span>Create Chatbot</span>
        </Button>
      </div>
      
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Navigation</h2>
      <ul className="space-y-1 mb-8">
        {mainNavItems.map((item) => (
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
      
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h2>
      <ul className="space-y-1">
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
    </div>
  );
};

export default DashboardSidebar;
