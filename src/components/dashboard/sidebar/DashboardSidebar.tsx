
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import SidebarHeader from "./SidebarHeader";
import GettingStartedBanner from "./GettingStartedBanner";
import NavSection from "./NavSection";
import SettingsNav from "./SettingsNav";
import LogoutButton from "./LogoutButton";
import { settingsItems, mainNavItems } from "./sidebarData";

interface DashboardSidebarProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const DashboardSidebar = ({ 
  activeSection, 
  setActiveSection, 
  activeTab, 
  setActiveTab 
}: DashboardSidebarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  
  useEffect(() => {
    // Check if this is a new user
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard') === 'true';
    setIsNewUser(!hasVisitedBefore);
  }, []);
  
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
      <SidebarHeader handleCreateChatbot={handleCreateChatbot} />
      
      <GettingStartedBanner isNewUser={isNewUser} handleNav={handleNav} />
      
      {mainNavItems.map((section, idx) => (
        <NavSection
          key={section.heading}
          heading={section.heading}
          items={section.items}
          activeTab={activeTab || ""}
          handleNav={handleNav}
          isHighlighted={section.heading === 'Build Process' && isNewUser}
        />
      ))}
      
      <SettingsNav 
        items={settingsItems}
        activeTab={activeTab || ""}
        activeSection={activeSection || ""}
        handleSettingsNav={handleSettingsNav}
      />
      
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default DashboardSidebar;
