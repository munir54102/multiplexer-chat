
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Upload, Rocket } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import EmbedOption from "./EmbedOption";
import EmbedCustomization from "./EmbedCustomization";
import SetupCompleteScreen from "./SetupCompleteScreen";

const EmbedTab = () => {
  const { toast } = useToast();
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard."
    });
  };
  
  const toggleCompleteScreen = () => {
    setShowSuccessScreen(!showSuccessScreen);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    toast({
      title: "Publishing chatbot",
      description: "Your chatbot is being published. This may take a few moments."
    });
    
    // Simulate publishing delay
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Chatbot published!",
        description: "Your chatbot is now live and ready to use."
      });
      // Show the success screen after publishing
      setShowSuccessScreen(true);
    }, 2000);
  };

  if (showSuccessScreen) {
    return <SetupCompleteScreen onBackToEmbed={() => setShowSuccessScreen(false)} />;
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Embed Options</h3>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={toggleCompleteScreen}>
            View Setup Details
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPublishing ? (
              <>Publishing...</>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Publish Chatbot
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chat Bubble Option */}
        <EmbedOption
          id="chat-bubble"
          title="Embed a chat bubble"
          description="Embed a chat bubble on your website. Allows you to use all the advanced features of the agent."
          recommended={true}
          checked={true}
          codeSnippet={`<script>
  (function(d,t) {
    var g=d.createElement(t),
    s=d.getElementsByTagName(t)[0];
    g.src="https://multiplexai.com/widget/chat.js";
    g.defer=true;
    g.async=true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.multiplexAI.init({
        botId: "YOUR_BOT_ID"
      })
    }
  })(document,"script");
</script>`}
          codeLabel="JavaScript Snippet"
        />
        
        {/* Iframe Option */}
        <EmbedOption
          id="iframe"
          title="Embed the iframe directly"
          description="Add the agent anywhere on your website"
          recommended={false}
          checked={false}
          codeSnippet={`<iframe
  src="https://multiplexai.com/chat/YOUR_BOT_ID"
  width="100%" 
  height="600px"
  frameborder="0"
></iframe>`}
          codeLabel="HTML Code"
        />
      </div>
      
      <EmbedCustomization />
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handlePublish} 
          disabled={isPublishing} 
          size="lg" 
          className="bg-green-600 hover:bg-green-700"
        >
          {isPublishing ? (
            <>Publishing...</>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Publish Your Chatbot
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EmbedTab;
