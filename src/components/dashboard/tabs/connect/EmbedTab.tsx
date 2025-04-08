
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import EmbedOption from "./EmbedOption";
import EmbedCustomization from "./EmbedCustomization";
import SetupCompleteScreen from "./SetupCompleteScreen";

const EmbedTab = () => {
  const { toast } = useToast();
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
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

  if (showSuccessScreen) {
    return <SetupCompleteScreen />;
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Embed Options</h3>
        <Button onClick={toggleCompleteScreen}>
          View Complete Setup
        </Button>
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
    </div>
  );
};

export default EmbedTab;
