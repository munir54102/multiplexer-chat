
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const EmbedCustomization = () => {
  return (
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
  );
};

export default EmbedCustomization;
