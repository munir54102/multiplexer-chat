
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AISection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">AI Settings</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Model Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="model" className="mb-1 block">AI Model</Label>
            <select id="model" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="gpt-4">GPT-4 (Recommended)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-v2">Claude 2</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              GPT-4 provides the best performance but uses more credits
            </p>
          </div>
          
          <div>
            <Label htmlFor="temperature" className="mb-1 block">Temperature</Label>
            <div className="flex items-center">
              <input 
                type="range" 
                id="temperature"
                min="0" 
                max="1" 
                step="0.1" 
                defaultValue="0.7" 
                className="w-full mr-4"
              />
              <span className="text-sm font-medium">0.7</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Higher values make output more creative, lower values make it more deterministic
            </p>
          </div>
          
          <div>
            <Label htmlFor="max-tokens" className="mb-1 block">Max Response Length</Label>
            <Input 
              id="max-tokens"
              type="number" 
              defaultValue="1024" 
              className="w-full" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of tokens in AI responses
            </p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Personality</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="persona" className="mb-1 block">Agent Persona</Label>
            <Textarea 
              id="persona"
              placeholder="Describe how your agent should interact with users..." 
              className="min-h-[120px]"
              defaultValue="Friendly, helpful, and knowledgeable customer support agent who is patient and always provides accurate information. Maintains a professional tone while being conversational."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="emojis" />
            <Label htmlFor="emojis">Allow emojis in responses</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="humor" />
            <Label htmlFor="humor">Allow light humor</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Training</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="training-data" className="mb-1 block">Training Frequency</Label>
            <select id="training-data" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="auto-improve" defaultChecked />
            <Label htmlFor="auto-improve">Auto-improve from conversations</Label>
          </div>
          
          <Button>Train Model Now</Button>
        </div>
      </div>
    </div>
  );
};

export default AISection;
