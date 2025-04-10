
import { 
  Settings, 
  BrainCircuit, 
  MessageSquare, 
  Shield, 
  Users, 
  Bell, 
  Webhook,
  PlayCircle,
  Clock,
  BarChart3,
  Zap,
  Database,
  ArrowUpDown,
  UserPlus,
  Layers,
  LayoutDashboard,
  Wrench,
  Link,
  HelpCircle
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavSection {
  heading: string;
  items: NavItem[];
}

// Settings sidebar items
export const settingsItems: NavItem[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "chat", label: "Chat Interface", icon: MessageSquare },
  { id: "security", label: "Security", icon: Shield },
  { id: "leads", label: "Leads", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
];

// Main navigation items - organized by workflow
export const mainNavItems: NavSection[] = [
  { 
    heading: "Overview",
    items: [
      { id: "overview", label: "Dashboard", icon: LayoutDashboard },
      { id: "activity", label: "Activity", icon: Clock },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
    ]
  },
  {
    heading: "Build Process",
    items: [
      { id: "create", label: "1. Create", icon: Wrench },
      { id: "sources", label: "2. Build", icon: Database },
      { id: "connect", label: "3. Connect", icon: Link },
    ]
  },
  {
    heading: "Management",
    items: [
      { id: "playground", label: "Test Playground", icon: PlayCircle },
      { id: "actions", label: "Custom Actions", icon: ArrowUpDown },
      { id: "contacts", label: "Manage Contacts", icon: UserPlus },
    ]
  },
  {
    heading: "Resources",
    items: [
      { id: "templates", label: "Templates", icon: Layers },
      { id: "help", label: "Help & Guides", icon: HelpCircle },
    ]
  }
];
