
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, RefreshCcw, Code, Globe, MessageSquare, Smartphone, Mail, Webhook, Database, Link, Zap, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ConnectTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Connect</h2>
      
      <Tabs defaultValue="embed" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="embed">Embed</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="embed">
          {/* Embed Options */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Embed Options</h3>
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
            
            <div className="mt-6 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-3">Customize Your Embed</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chat-title">Chat Window Title</Label>
                  <Input id="chat-title" placeholder="How can we help you today?" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="chat-color">Primary Color</Label>
                  <div className="flex mt-1 gap-2">
                    <Input id="chat-color" type="color" defaultValue="#8B5CF6" className="w-12 h-10" />
                    <Input id="chat-color-hex" defaultValue="#8B5CF6" />
                  </div>
                </div>
                <div>
                  <Label className="block mb-1">Chat Bubble Position</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Bottom Right</Button>
                    <Button variant="outline" size="sm">Bottom Left</Button>
                  </div>
                </div>
                <div>
                  <Label className="block mb-1">Auto Open</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="auto-open" />
                    <Label htmlFor="auto-open">Open chat automatically after 5 seconds</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api">
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
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2">Rate Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Monthly Quota</div>
                  <div className="text-xl font-bold">Unlimited</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Rate Limit</div>
                  <div className="text-xl font-bold">100 reqs/min</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Max Tokens</div>
                  <div className="text-xl font-bold">4,096</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Need higher limits? <a href="#" className="text-primary font-medium">Contact us</a> for enterprise options.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">API Endpoints</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <Badge variant="outline">POST</Badge>
                    <span className="ml-2">/v1/conversation</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <Badge variant="outline">GET</Badge>
                    <span className="ml-2">/v1/bots</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <Badge variant="outline">GET</Badge>
                    <span className="ml-2">/v1/conversations</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations">
          {/* Platform Integrations */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Messaging Platforms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-medium">WhatsApp</h4>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Connect your WhatsApp Business account to chat with customers directly.</p>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-medium">Facebook Messenger</h4>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">Not Connected</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Engage with your Facebook audience through Messenger bots.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
                      <h4 className="font-medium">Instagram</h4>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">Not Connected</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Respond to Instagram DMs and comments with intelligent automation.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Business Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Database className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Salesforce</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Sync contacts and conversations with your Salesforce CRM.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Mailchimp</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Add contacts to your Mailchimp lists for email marketing.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
                    <h4 className="font-medium">Slack</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Get notifications in Slack when users engage with your bot.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Database className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">HubSpot</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Sync contacts and conversations with your HubSpot CRM.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Zap className="h-5 w-5 text-orange-500 mr-2" />
                    <h4 className="font-medium">Zapier</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Connect to over 5,000 apps via Zapier automations.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Bot className="h-5 w-5 text-gray-500 mr-2" />
                    <h4 className="font-medium">Custom Integration</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Need to connect to a different service? Build a custom integration.</p>
                  <Button variant="outline" size="sm" className="w-full">Create</Button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Knowledge Bases</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Link className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Website Crawler</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Index your website content to improve AI responses.</p>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Database className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Google Drive</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Train your AI on documents stored in Google Drive.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex items-center mb-3">
                    <Database className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">SharePoint</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Connect to Microsoft SharePoint to train your AI.</p>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          {/* Webhooks */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Webhooks</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Webhooks allow you to receive real-time notifications when specific events happen in your account.
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">New Conversation Webhook</h4>
                    <p className="text-sm text-gray-600">Triggered when a new conversation starts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Endpoint URL</span>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex">
                    <Input value="https://your-server.com/webhooks/new-conversation" readOnly className="bg-white" />
                    <Button variant="outline" className="ml-2">
                      <Code className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">Lead Captured Webhook</h4>
                    <p className="text-sm text-gray-600">Triggered when a lead is captured</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Endpoint URL</span>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex">
                    <Input value="https://your-server.com/webhooks/lead-captured" readOnly className="bg-white" />
                    <Button variant="outline" className="ml-2">
                      <Code className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Webhook Security</CardTitle>
                  <CardDescription>Verify webhook authenticity with a signature</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="webhook-secret" className="mb-1 block">Webhook Secret</Label>
                    <div className="flex">
                      <Input type="password" id="webhook-secret" value="••••••••••••••••••" disabled className="rounded-r-none" />
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
                      Use this secret to verify webhook signatures. Each webhook request includes a X-Webhook-Signature header.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectTab;
