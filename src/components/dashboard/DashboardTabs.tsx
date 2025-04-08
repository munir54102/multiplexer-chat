
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, MessageSquare, BarChart2, Link, Database, 
  Activity, Zap, Users, HelpCircle, PenTool, 
  Globe, VolumeX, Laptop
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateTab,
  PlaygroundTab,
  ActivityTab,
  AnalyticsTab,
  ConnectTab,
  SourcesTab,
  ActionsTab,
  ContactsTab,
  LanguageSettingsTab,
  TeamCollaborationTab,
  HelpTab
} from "./tabs";
import ABTesting from "./ABTesting";
import SentimentAnalysis from "./SentimentAnalysis";
import TemplateLibrary from "./TemplateLibrary";
import { settings } from "./settings";
import { useToast } from "@/hooks/use-toast";
import GuidedTutorial from "../GuidedTutorial";

const DashboardTabs = () => {
  const navigate = useNavigate();
  const { section = 'create', tab } = useParams<{ section?: string; tab?: string }>();
  const [value, setValue] = useState(section);
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if this is first time visiting dashboard
    const hasTakenTutorial = localStorage.getItem('dashboardTutorialComplete');
    if (!hasTakenTutorial) {
      // Show the tutorial with a small delay
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  useEffect(() => {
    setValue(section);
  }, [section]);
  
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    navigate(`/dashboard/${newValue}${tab ? `/${tab}` : ''}`);
  };
  
  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('dashboardTutorialComplete', 'true');
    toast({
      title: "Tutorial completed!",
      description: "You can access it anytime from the Help section."
    });
  };
  
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {showTutorial && <GuidedTutorial onComplete={handleTutorialComplete} />}
      
      <div className="border-b">
        <Tabs
          defaultValue={value}
          value={value}
          onValueChange={handleValueChange}
          className="w-full"
        >
          <div className="px-4 overflow-x-auto">
            <TabsList className="h-14 w-max">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Create</span>
              </TabsTrigger>
              <TabsTrigger value="playground" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                <span>Playground</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>Templates</span>
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Knowledge</span>
              </TabsTrigger>
              <TabsTrigger value="connect" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span>Connect</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
              <TabsTrigger value="abtesting" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>A/B Testing</span>
              </TabsTrigger>
              <TabsTrigger value="sentimentanalysis" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Sentiment</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Actions</span>
              </TabsTrigger>
              <TabsTrigger value="languages" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Languages</span>
              </TabsTrigger>
              <TabsTrigger value="voicesettings" className="flex items-center gap-2">
                <VolumeX className="h-4 w-4" />
                <span>Voice</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Team</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        {value === "create" && <CreateTab />}
        {value === "playground" && <PlaygroundTab />}
        {value === "templates" && <TemplateLibrary />}
        {value === "analytics" && <AnalyticsTab />}
        {value === "sources" && <SourcesTab />}
        {value === "connect" && <ConnectTab />}
        {value === "activity" && <ActivityTab />}
        {value === "contacts" && <ContactsTab />}
        {value === "actions" && <ActionsTab />}
        {value === "settings" && settings[tab || "general"]}
        {value === "abtesting" && <ABTesting />}
        {value === "sentimentanalysis" && <SentimentAnalysis />}
        {value === "languages" && <LanguageSettingsTab />}
        {value === "voicesettings" && settings["voice"]}
        {value === "team" && <TeamCollaborationTab />}
        {value === "help" && <HelpTab />}
      </div>
    </div>
  );
};

export default DashboardTabs;
