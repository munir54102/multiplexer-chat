
import { useState } from "react";
import { File, Type, Globe, MessageSquare, BookText } from "lucide-react";
import FileUploadSection from "./sources/FileUploadSection";
import TextInputSection from "./sources/TextInputSection";
import WebsiteSection from "./sources/WebsiteSection";
import QASection from "./sources/QASection";
import NotionSection from "./sources/NotionSection";

const SourcesTab = () => {
  const [activeSource, setActiveSource] = useState("files");
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sources</h2>
      <div className="flex">
        <div className="w-64 border-r border-gray-200 pr-4">
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
