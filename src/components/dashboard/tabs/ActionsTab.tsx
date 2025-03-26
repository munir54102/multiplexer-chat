
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Code, MessageSquare } from "lucide-react";
import Calendar from "@/components/Calendar";

const ActionsTab = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Actions</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Action
        </Button>
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
      </div>
    </div>
  );
};

export default ActionsTab;
