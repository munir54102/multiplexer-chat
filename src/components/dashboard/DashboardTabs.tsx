
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaygroundTab from "./tabs/PlaygroundTab";
import ActivityTab from "./tabs/ActivityTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import ConnectTab from "./tabs/ConnectTab";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="playground">Playground</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="connect">Connect</TabsTrigger>
      </TabsList>
      
      <TabsContent value="playground">
        <PlaygroundTab />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityTab />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsTab />
      </TabsContent>
      
      <TabsContent value="connect">
        <ConnectTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
