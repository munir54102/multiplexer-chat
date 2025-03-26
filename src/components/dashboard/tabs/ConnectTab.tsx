
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, RefreshCcw, Code, Globe, MessageSquare } from "lucide-react";

const ConnectTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Connect</h2>
      
      {/* Embed Options */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Embed</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Bubble Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <input type="radio" checked id="chat-bubble" className="mt-1 mr-2" />
              <div>
                <label htmlFor="chat-bubble" className="font-medium block mb-1">Embed a chat bubble</label>
                <div className="text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 inline-block mb-2">Recommended</div>
                <p className="text-sm text-gray-600">Embed a chat bubble on your website. Allows you to use all the advanced features of the agent.</p>
              </div>
            </div>
            
            <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">JavaScript Snippet</span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                {`<script>
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
              </pre>
            </div>
          </div>
          
          {/* Iframe Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <input type="radio" id="iframe" className="mt-1 mr-2" />
              <div>
                <label htmlFor="iframe" className="font-medium block mb-1">Embed the iframe directly</label>
                <p className="text-sm text-gray-600">Add the agent anywhere on your website</p>
              </div>
            </div>
            
            <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">HTML Code</span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                {`<iframe
  src="https://multiplexai.com/chat/YOUR_BOT_ID"
  width="100%" 
  height="600px"
  frameborder="0"
></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* API Integration */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">API Integration</h3>
        <p className="text-gray-600 mb-4">
          Connect your agent to custom applications or third-party services using our API.
        </p>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Your API Key</h4>
          <div className="flex">
            <Input type="password" value="••••••••••••••••••••••••••••••" disabled className="rounded-r-none" />
            <Button variant="outline" className="rounded-l-none border-l-0">
              <Eye className="h-4 w-4 mr-2" />
              Show
            </Button>
            <Button variant="outline" className="ml-2">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Keep your API key secret. Do not share it in publicly accessible areas such as GitHub, client-side code, etc.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-2">Quick Start</h4>
          <p className="text-sm text-gray-600 mb-3">
            Make a request to our conversation API to interact with your agent:
          </p>
          <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto mb-3">
            {`curl -X POST \\
  https://api.multiplexai.com/v1/conversation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bot_id": "YOUR_BOT_ID",
    "message": "Hello",
    "session_id": "user123"
  }'`}
          </pre>
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" /> View Full API Documentation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <Globe className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">WhatsApp</h4>
            <p className="text-gray-600 text-sm mb-3">Connect your WhatsApp Business account</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <MessageSquare className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">Facebook Messenger</h4>
            <p className="text-gray-600 text-sm mb-3">Connect to Facebook Messenger</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <MessageSquare className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">Instagram</h4>
            <p className="text-gray-600 text-sm mb-3">Connect to Instagram Direct Messages</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectTab;
