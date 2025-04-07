
import { useState } from "react";
import { File, Type, Globe, MessageSquare, BookText, PlusCircle, Layers } from "lucide-react";
import FileUploadSection from "./sources/FileUploadSection";
import TextInputSection from "./sources/TextInputSection";
import WebsiteSection from "./sources/WebsiteSection";
import QASection from "./sources/QASection";
import NotionSection from "./sources/NotionSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SourcesTab = () => {
  const [activeSource, setActiveSource] = useState("files");
  const [progress, setProgress] = useState(20); // Showing build progress
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Build Your Chatbot</h2>
        <p className="text-gray-600 mb-4">Add knowledge to your chatbot from different sources</p>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Build Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex mt-4 text-xs text-gray-500 justify-between">
            <span>Create</span>
            <span>Build</span>
            <span>Connect</span>
            <span>Publish</span>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="w-64 border-r border-gray-200 pr-4">
          <h3 className="text-sm font-medium mb-3">Knowledge Sources</h3>
          <ul className="space-y-1">
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'files' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('files')}
              >
                <File className="h-5 w-5" />
                <span>Files</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'text' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('text')}
              >
                <Type className="h-5 w-5" />
                <span>Text</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'website' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('website')}
              >
                <Globe className="h-5 w-5" />
                <span>Website</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'qa' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('qa')}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Q&A</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'notion' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('notion')}
              >
                <BookText className="h-5 w-5" />
                <span>Notion</span>
              </button>
            </li>
          </ul>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-3">Next Steps</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start mb-2"
              onClick={() => setProgress(Math.min(progress + 20, 100))}
            >
              <Layers className="h-4 w-4 mr-2" />
              Configure Models
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => setProgress(Math.min(progress + 20, 100))}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add More Knowledge
            </Button>
          </div>
        </div>
        <div className="flex-1 pl-6">
          {activeSource === 'files' && <FileUploadSection />}
          {activeSource === 'text' && <TextInputSection />}
          {activeSource === 'website' && <WebsiteSection />}
          {activeSource === 'qa' && <QASection />}
          {activeSource === 'notion' && <NotionSection />}
        </div>
      </div>
    </div>
  );
};

export default SourcesTab;
