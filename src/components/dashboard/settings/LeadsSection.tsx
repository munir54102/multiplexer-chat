
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const LeadsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Leads</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Lead Capture</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="lead-capture" />
            <Label htmlFor="lead-capture">Enable lead capture form</Label>
          </div>
          
          <div>
            <Label htmlFor="capture-timing" className="mb-1 block">When to ask for information</Label>
            <select id="capture-timing" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="start">At the start of conversation</option>
              <option value="intent">When specific intent is detected</option>
              <option value="time">After time threshold (2 minutes)</option>
              <option value="end">At the end of conversation</option>
            </select>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Fields to Capture</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="name" className="mr-2" checked />
                <Label htmlFor="name">Name</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="email" className="mr-2" checked />
                <Label htmlFor="email">Email</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required" selected>Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="phone" className="mr-2" />
                <Label htmlFor="phone">Phone Number</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="company" className="mr-2" />
                <Label htmlFor="company">Company</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Lead Integrations</h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive lead notifications via email</p>
              </div>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-gray-600">Send leads to a Slack channel</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">CRM Integration</h4>
                <p className="text-sm text-gray-600">Connect with HubSpot, Salesforce, etc.</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13Z" fill="#2563EB"/>
                  <path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="#2563EB"/>
                  <path d="M12 17C13.667 17 15 15.6673 15 14L9 14C9.00001 15.6673 10.333 17 12 17Z" fill="#2563EB"/>
                  <path d="M21 15C21 15.5523 20.5523 16 20 16H19V11C19 7.73308 16.7274 5.0243 13.6494 4.25039C13.8668 3.93672 14 3.55321 14 3.13081C14 2.00741 13.1077 1.09375 12 1.09375C10.8924 1.09375 10 2.00744 10 3.13081C10 3.56396 10.1392 3.9578 10.3673 4.27547C7.32069 5.07135 5.08488 7.75311 5.05128 10.9887L5 11V16H4C3.44772 16 3 15.5523 3 15C3 14.4477 3.44772 14 4 14V13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11V10C3.44772 10 3 9.55228 3 9C3 8.44772 3.44772 8 4 8H5.06659C5.50982 5.6292 7.33731 3.71698 9.69188 3.18099C9.89458 3.83105 10.396 4.35319 11.0372 4.54964C11.0124 4.5507 10.9876 4.5519 10.9626 4.55326C11.3046 4.5194 11.651 4.50181 12 4.50181C12.3435 4.50181 12.6851 4.51891 13.0216 4.55162C13.0012 4.5506 12.9807 4.54972 12.9603 4.549C13.6069 4.35799 14.1115 3.83441 14.3132 3.17892C16.6797 3.7022 18.5233 5.61725 18.9581 8H20C20.5523 8 21 8.44772 21 9C21 9.55228 20.5523 10 20 10V11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13V14C20.5523 14 21 14.4477 21 15ZM7 12H17V16H7V12Z" fill="#2563EB"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Zapier</h4>
                <p className="text-sm text-gray-600">Connect with 3,000+ apps</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsSection;
