
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";

const NotionSection = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Notion</h3>
      
      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookText className="h-8 w-8 text-blue-600" />
        </div>
        
        <h4 className="text-lg font-medium mb-2">Connect Notion Workspace</h4>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Import content directly from your Notion workspace. Link pages, databases, and documents to train your AI assistant.
        </p>
        
        <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg inline-flex items-center">
          <svg width="20" height="20" viewBox="0 0 13 15" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25596 1.55882L1.09484 1.38034C0.860595 1.53446 0.722656 1.79403 0.722656 2.07004V12.93C0.722656 13.206 0.860595 13.4655 1.09484 13.6197L1.25596 13.4412V1.55882ZM11.9479 1.60548C11.673 1.4602 11.3506 1.45218 11.0686 1.58251L6.46208 3.8796V11.1204L11.0686 13.4175C11.3506 13.5478 11.673 13.5398 11.9479 13.3945C12.2228 13.2493 12.3906 12.9697 12.3906 12.6676V2.33242C12.3906 2.03035 12.2228 1.75075 11.9479 1.60548ZM5.82943 10.7917V4.20835L2.16016 2.38867V12.6113L5.82943 10.7917Z" fill="white"/>
          </svg>
          Import from Notion
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          You'll be asked to authorize MultiplexAI to access your Notion workspace
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-2">What will be imported?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Pages and sub-pages</li>
            <li>• Content from databases</li>
            <li>• Text, lists, and tables</li>
            <li>• Images with captions</li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-2">Why connect Notion?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Keep knowledge always up-to-date</li>
            <li>• Easily manage content in one place</li>
            <li>• Collaborate with your team</li>
            <li>• Sync changes automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotionSection;
