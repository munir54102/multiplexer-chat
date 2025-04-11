
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Globe, MessageSquare, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PublishTab = () => {
  const [publishStatus, setPublishStatus] = useState("draft");
  const [channels, setChannels] = useState({
    website: true,
    whatsapp: false,
    facebook: false,
    slack: false
  });
  const { toast } = useToast();

  const handlePublish = () => {
    setPublishStatus("published");
    toast({
      title: "Chatbot Published",
      description: "Your chatbot is now live and available for users to interact with.",
    });
  };

  const handleUnpublish = () => {
    setPublishStatus("draft");
    toast({
      title: "Chatbot Unpublished",
      description: "Your chatbot is now in draft mode and not available to users.",
    });
  };

  const toggleChannel = (channel) => {
    setChannels({
      ...channels,
      [channel]: !channels[channel]
    });
    
    toast({
      title: channels[channel] ? `${channel} Disabled` : `${channel} Enabled`,
      description: `Your chatbot is now ${channels[channel] ? 'disabled' : 'enabled'} on ${channel}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Publish Your Chatbot</h2>
      <p className="text-gray-600">Make your chatbot live on your selected platforms</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Publication Status</CardTitle>
            <CardDescription>Control when your chatbot is available to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Status</h3>
                  <p className="text-sm text-gray-500">
                    {publishStatus === "published" 
                      ? "Your chatbot is live and available to users" 
                      : "Your chatbot is in draft mode and not available to users"}
                  </p>
                </div>
                <Badge 
                  variant={publishStatus === "published" ? "success" : "secondary"}
                  className={publishStatus === "published" ? "bg-green-100 text-green-800" : ""}
                >
                  {publishStatus === "published" ? "Published" : "Draft"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Availability</h3>
                  <p className="text-sm text-gray-500">Control when your chatbot is active</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    24/7
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    All days
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            {publishStatus === "published" ? (
              <Button variant="destructive" onClick={handleUnpublish}>
                Unpublish Chatbot
              </Button>
            ) : (
              <Button onClick={handlePublish}>
                Publish Chatbot
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Channels</CardTitle>
            <CardDescription>Select where your chatbot will be available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">Website</h3>
                  <p className="text-sm text-gray-500">Embed on your website</p>
                </div>
              </div>
              <Switch 
                checked={channels.website} 
                onCheckedChange={() => toggleChannel("website")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <p className="text-sm text-gray-500">Connect to WhatsApp Business</p>
                </div>
              </div>
              <Switch 
                checked={channels.whatsapp} 
                onCheckedChange={() => toggleChannel("whatsapp")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Facebook Messenger</h3>
                  <p className="text-sm text-gray-500">Connect to Facebook Messenger</p>
                </div>
              </div>
              <Switch 
                checked={channels.facebook} 
                onCheckedChange={() => toggleChannel("facebook")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <div>
                  <h3 className="font-medium">Slack</h3>
                  <p className="text-sm text-gray-500">Connect to Slack workspace</p>
                </div>
              </div>
              <Switch 
                checked={channels.slack} 
                onCheckedChange={() => toggleChannel("slack")} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Alert className={publishStatus === "published" ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}>
        {publishStatus === "published" ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Chatbot is live!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your chatbot is now published and available on all enabled channels.
            </AlertDescription>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Chatbot is not published</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your chatbot is in draft mode. Publish it to make it available to users.
            </AlertDescription>
          </>
        )}
      </Alert>
      
      <div className="mt-6">
        <Tabs defaultValue="embed">
          <TabsList>
            <TabsTrigger value="embed">Embed Code</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="embed" className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-2">Website Embed Code</h3>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
              {`<script src="https://chatbot-platform.com/embed.js" data-bot-id="your-bot-id" async></script>`}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Copy and paste this code into the {`<head>`} section of your website.
            </p>
            <Button size="sm" className="mt-4">Copy Code</Button>
          </TabsContent>
          
          <TabsContent value="api" className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-2">API Access Details</h3>
            <p className="text-sm mb-4">
              Use these credentials to access your chatbot via our API.
            </p>
            <div className="space-y-4">
              <div>
                <Label>API Key</Label>
                <div className="flex mt-1">
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm flex-1">
                    ••••••••••••••••••••••••••
                  </div>
                  <Button size="sm" className="ml-2">Show</Button>
                  <Button size="sm" className="ml-2">Copy</Button>
                </div>
              </div>
              <div>
                <Label>Bot ID</Label>
                <div className="flex mt-1">
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm flex-1">
                    bot_123456789
                  </div>
                  <Button size="sm" className="ml-2">Copy</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-2">Usage Statistics</h3>
            <p className="text-sm text-gray-500 mb-4">
              {publishStatus === "published" 
                ? "Your chatbot is published. Analytics will appear here once users start interacting with it." 
                : "Your chatbot is not published yet. Publish it to start collecting analytics."}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-gray-500">TOTAL CONVERSATIONS</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-gray-500">MESSAGES EXCHANGED</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">0s</p>
                  <p className="text-xs text-gray-500">AVG. RESPONSE TIME</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublishTab;
