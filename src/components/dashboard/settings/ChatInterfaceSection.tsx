
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const ChatInterfaceSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Chat Interface</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Appearance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="primary-color" className="mb-1 block">Primary Color</Label>
            <div className="flex">
              <input 
                type="color" 
                id="primary-color"
                defaultValue="#4f46e5" 
                className="h-10 w-10 rounded-l-md border border-gray-300"
              />
              <Input 
                type="text" 
                defaultValue="#4f46e5" 
                className="rounded-l-none" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="chat-position" className="mb-1 block">Chat Position</Label>
            <select id="chat-position" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="bubble-icon" className="mb-1 block">Bubble Icon</Label>
            <select id="bubble-icon" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="chat">Chat Bubble</option>
              <option value="bot">Robot</option>
              <option value="help">Help</option>
              <option value="custom">Custom (Upload)</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="chat-window-size" className="mb-1 block">Chat Window Size</Label>
            <select id="chat-window-size" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="medium">Medium (Default)</option>
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Messages</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="welcome-message" className="mb-1 block">Welcome Message</Label>
            <Textarea 
              id="welcome-message"
              defaultValue="👋 Hi there! How can I help you today?"
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="away-message" className="mb-1 block">Away Message</Label>
            <Textarea 
              id="away-message"
              defaultValue="Thanks for your message! Our team is currently away but we'll get back to you as soon as possible."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="typing-indicator" defaultChecked />
            <Label htmlFor="typing-indicator">Show typing indicator</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="read-receipts" defaultChecked />
            <Label htmlFor="read-receipts">Show read receipts</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">User Input</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="input-placeholder" className="mb-1 block">Input Placeholder</Label>
            <Input 
              id="input-placeholder"
              defaultValue="Type your message here..." 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="attachments" defaultChecked />
            <Label htmlFor="attachments">Allow file attachments</Label>
          </div>
          
          <div>
            <Label htmlFor="suggested-messages" className="mb-1 block">Suggested Messages</Label>
            <Textarea 
              id="suggested-messages"
              placeholder="Add comma-separated messages that will be suggested to the user"
              defaultValue="Tell me about your services, How do I get started?, What are your pricing plans?"
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              These will appear as clickable options for users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceSection;
