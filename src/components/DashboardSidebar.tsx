
import { 
  Settings, 
  BrainCircuit, 
  MessageSquare, 
  Shield, 
  Users, 
  Bell, 
  Webhook
} from "lucide-react";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DashboardSidebar = ({ activeSection, setActiveSection }: DashboardSidebarProps) => {
  const sidebarItems = [
    { id: "general", label: "General", icon: Settings },
    { id: "ai", label: "AI", icon: BrainCircuit },
    { id: "chat", label: "Chat Interface", icon: MessageSquare },
    { id: "security", label: "Security", icon: Shield },
    { id: "leads", label: "Leads", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
  ];

  return (
    <div className="w-64 border-r border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
      <ul className="space-y-1">
        {sidebarItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${
                activeSection === item.id
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
