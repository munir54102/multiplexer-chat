
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, UserPlus } from "lucide-react";

const ContactsTab = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" /> Add Contact
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
          <Input 
            placeholder="Search contacts..." 
            className="max-w-xs"
          />
          <div className="text-sm text-gray-500">0 contacts</div>
        </div>
        
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
          <UserPlus className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
          <p className="text-gray-500 text-center mb-4">Start adding contacts or import them from your existing CRM</p>
          <div className="flex space-x-3">
            <Button>Add Contact</Button>
            <Button variant="outline">Import Contacts</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsTab;
