
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FileUploadSection from "./sources/FileUploadSection";
import WebsiteSection from "./sources/WebsiteSection";
import NotionSection from "./sources/NotionSection";
import QASection from "./sources/QASection";
import TextInputSection from "./sources/TextInputSection";
import ProductsSection from "./sources/ProductsSection";

const SourcesTab = () => {
  const [activeTab, setActiveTab] = useState("website");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Knowledge Sources</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </Button>
      </div>
      
      <Tabs defaultValue="website" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="notion">Notion</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="website">
          <WebsiteSection />
        </TabsContent>
        
        <TabsContent value="files">
          <FileUploadSection />
        </TabsContent>
        
        <TabsContent value="text">
          <TextInputSection />
        </TabsContent>
        
        <TabsContent value="qa">
          <QASection />
        </TabsContent>
        
        <TabsContent value="notion">
          <NotionSection />
        </TabsContent>
        
        <TabsContent value="products">
          <ProductsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourcesTab;
