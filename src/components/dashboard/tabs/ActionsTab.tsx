
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Code, MessageSquare, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ActionsTab = () => {
  const { toast } = useToast();

  const handleCreateAction = () => {
    toast({
      title: "Action created",
      description: "Your new action has been created successfully",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Actions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Action
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Action</DialogTitle>
              <DialogDescription>
                Configure a new action for your chatbot to perform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Action name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Call</SelectItem>
                    <SelectItem value="email">Email Notification</SelectItem>
                    <SelectItem value="calendar">Calendar Booking</SelectItem>
                    <SelectItem value="custom">Custom Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this action does" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trigger">Trigger Phrase</Label>
                <Input id="trigger" placeholder="When the user says..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreateAction}>Create Action</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">What are Actions?</h3>
          <p className="text-gray-600 mb-4">
            Actions allow your chatbot to perform specific tasks based on user inputs. You can create custom actions to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>Retrieve data from your systems</li>
            <li>Submit forms or process orders</li> 
            <li>Book appointments</li>
            <li>Generate personalized content</li>
          </ul>
          <Button>Create your first action</Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Action Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-blue-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <Code className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium mb-1">API Call</h4>
              <p className="text-gray-600 text-sm">Connect to your external APIs</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-green-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium mb-1">Email Notification</h4>
              <p className="text-gray-600 text-sm">Send email notifications</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-purple-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-medium mb-1">Calendar</h4>
              <p className="text-gray-600 text-sm">Book appointments</p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Active Actions</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-500">You haven't created any actions yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsTab;
