
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BellRing, MessageSquare } from "lucide-react";

const NotificationsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notifications</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New Conversations</h4>
              <p className="text-sm text-gray-600">When a new user starts a chat</p>
            </div>
            <Switch id="new-convo" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Unresolved Issues</h4>
              <p className="text-sm text-gray-600">When the AI couldn't resolve a user query</p>
            </div>
            <Switch id="unresolved" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Daily Summary</h4>
              <p className="text-sm text-gray-600">Daily recap of all conversations</p>
            </div>
            <Switch id="daily-summary" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Analytics</h4>
              <p className="text-sm text-gray-600">Weekly performance report</p>
            </div>
            <Switch id="weekly-analytics" defaultChecked />
          </div>
          
          <div>
            <Label htmlFor="email-recipients" className="mb-1 block">Recipients</Label>
            <Input 
              id="email-recipients"
              placeholder="Enter email addresses separated by commas"
              defaultValue="admin@example.com, support@example.com"
            />
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Mobile Push Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="enable-push" />
            <Label htmlFor="enable-push">Enable push notifications</Label>
          </div>
          
          <Button variant="outline">Configure Mobile App</Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Integrations</h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <BellRing className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-gray-600">Get notified in Slack</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Microsoft Teams</h4>
                <p className="text-sm text-gray-600">Get notified in Teams</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Discord</h4>
                <p className="text-sm text-gray-600">Get notified in Discord</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;
