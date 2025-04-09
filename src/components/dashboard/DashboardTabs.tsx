
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CreateTab from "./tabs/CreateTab";
import SourcesTab from "./tabs/SourcesTab";
import IntegrationsTab from "./tabs/connect/IntegrationsTab";
import AppointmentBookingTab from "./tabs/AppointmentBookingTab";
import SalesAgentTab from "./tabs/SalesAgentTab";
import CustomerSupportTab from "./tabs/CustomerSupportTab";
import ActionsTab from "./tabs/ActionsTab";
import LanguageSettingsTab from "./tabs/LanguageSettingsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Database, 
  Link, 
  Zap, 
  Languages, 
  BarChart3, 
  Calendar, 
  UserRound,
  Headphones,
  ShoppingCart
} from "lucide-react";
import EcommerceConnector from "./tabs/sources/EcommerceConnector";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show toast when certain tabs are selected
    if (value === "appointment-booking") {
      toast({
        title: "Appointment Booking",
        description: "Configure your chatbot to schedule appointments with customers"
      });
    } else if (value === "sales-agent") {
      toast({
        title: "Sales Agent",
        description: "Configure your AI sales assistant capabilities"
      });
    } else if (value === "customer-support") {
      toast({
        title: "Customer Support",
        description: "Configure how your chatbot handles customer support inquiries"
      });
    } else if (value === "ecommerce") {
      toast({
        title: "E-commerce Connection",
        description: "Connect and sync with your e-commerce platforms"
      });
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="create" className="flex items-center">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create
        </TabsTrigger>
        <TabsTrigger value="sources" className="flex items-center">
          <Database className="h-4 w-4 mr-2" />
          Sources
        </TabsTrigger>
        <TabsTrigger value="connect" className="flex items-center">
          <Link className="h-4 w-4 mr-2" />
          Connect
        </TabsTrigger>
        <TabsTrigger value="actions" className="flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          Actions
        </TabsTrigger>
        <TabsTrigger value="ecommerce" className="flex items-center">
          <ShoppingCart className="h-4 w-4 mr-2" />
          E-commerce
        </TabsTrigger>
        <TabsTrigger value="appointment-booking" className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Appointment Booking
        </TabsTrigger>
        <TabsTrigger value="sales-agent" className="flex items-center">
          <UserRound className="h-4 w-4 mr-2" />
          Sales Agent
        </TabsTrigger>
        <TabsTrigger value="customer-support" className="flex items-center">
          <Headphones className="h-4 w-4 mr-2" />
          Customer Support
        </TabsTrigger>
        <TabsTrigger value="language" className="flex items-center">
          <Languages className="h-4 w-4 mr-2" />
          Language
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </TabsTrigger>
      </TabsList>

      <Card className="p-6">
        <TabsContent value="create">
          <CreateTab />
        </TabsContent>

        <TabsContent value="sources">
          <SourcesTab />
        </TabsContent>

        <TabsContent value="connect">
          <IntegrationsTab />
        </TabsContent>

        <TabsContent value="actions">
          <ActionsTab />
        </TabsContent>
        
        <TabsContent value="ecommerce">
          <EcommerceConnector />
        </TabsContent>
        
        <TabsContent value="appointment-booking">
          <AppointmentBookingTab />
        </TabsContent>
        
        <TabsContent value="sales-agent">
          <SalesAgentTab />
        </TabsContent>
        
        <TabsContent value="customer-support">
          <CustomerSupportTab />
        </TabsContent>

        <TabsContent value="language">
          <LanguageSettingsTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default DashboardTabs;
