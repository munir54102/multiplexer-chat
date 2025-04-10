
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AIModelConfig } from "@/types/chat";
import { getAIConfig, saveAIConfig } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

const AISection = () => {
  const [config, setConfig] = useState<AIModelConfig>(getAIConfig());
  const { toast } = useToast();

  const handleSaveConfig = () => {
    saveAIConfig(config);
    toast({
      title: "AI Configuration Saved",
      description: "Your AI model settings have been updated successfully."
    });
  };

  const handleReset = () => {
    const defaultConfig = getAIConfig();
    setConfig(defaultConfig);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">AI Settings</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Model Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="provider" className="mb-1 block">AI Provider</Label>
            <select 
              id="provider" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={config.provider}
              onChange={(e) => setConfig({...config, provider: e.target.value as "gemini" | "openai" | "claude"})}
            >
              <option value="gemini">Google Gemini (Recommended)</option>
              <option value="openai" disabled>OpenAI (Coming Soon)</option>
              <option value="claude" disabled>Anthropic Claude (Coming Soon)</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="apiKey" className="mb-1 block">API Key</Label>
            <Input 
              id="apiKey"
              type="password" 
              value={config.apiKey}
              onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              className="w-full" 
              placeholder="Enter your Gemini API key"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your Gemini API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
            </p>
          </div>
          
          <div>
            <Label htmlFor="model" className="mb-1 block">AI Model</Label>
            <select 
              id="model" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={config.model}
              onChange={(e) => setConfig({...config, model: e.target.value})}
            >
              <option value="gemini-pro">Gemini Pro</option>
              <option value="gemini-pro-vision" disabled>Gemini Pro Vision (Coming Soon)</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="temperature" className="mb-1 block">Temperature: {config.temperature}</Label>
            <div className="flex items-center">
              <input 
                type="range" 
                id="temperature"
                min="0" 
                max="1" 
                step="0.1" 
                value={config.temperature}
                onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                className="w-full mr-4"
              />
              <span className="text-sm font-medium">{config.temperature}</span>
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
              value={config.maxTokens}
              onChange={(e) => setConfig({...config, maxTokens: parseInt(e.target.value)})}
              className="w-full" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of tokens in AI responses
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSaveConfig} className="flex-1">Save Configuration</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
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
