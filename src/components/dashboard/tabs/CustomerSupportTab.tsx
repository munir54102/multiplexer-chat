
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Headphones, 
  UserCheck, 
  Mail, 
  LifeBuoy, 
  HelpCircle, 
  Plus, 
  Search, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  MessageSquare,
  Settings,
  Loader2
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

interface AutoResponse {
  id: string;
  keyword: string;
  response: string;
  isActive: boolean;
}

const CustomerSupportTab = () => {
  const { toast } = useToast();
  const [isSupportEnabled, setIsSupportEnabled] = useState(true);
  const [isHumanHandoffEnabled, setIsHumanHandoffEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      category: "Account",
      isActive: true
    },
    {
      id: "2",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, and American Express. We also support PayPal and bank transfers for business accounts.",
      category: "Billing",
      isActive: true
    },
    {
      id: "3",
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Orders' section. There you'll find a tracking number and link to the carrier's tracking page.",
      category: "Orders",
      isActive: true
    }
  ]);
  
  const [autoResponses, setAutoResponses] = useState<AutoResponse[]>([
    {
      id: "1",
      keyword: "refund",
      response: "Our refund policy allows returns within 30 days of purchase. To initiate a refund, please visit your order history and select 'Return Item'. If you need further assistance, I can connect you with our support team.",
      isActive: true
    },
    {
      id: "2",
      keyword: "shipping time",
      response: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination country and customs processing.",
      isActive: true
    }
  ]);
  
  const [newFaq, setNewFaq] = useState<Omit<FAQ, "id" | "isActive">>({
    question: "",
    answer: "",
    category: "General"
  });
  
  const [newAutoResponse, setNewAutoResponse] = useState<Omit<AutoResponse, "id" | "isActive">>({
    keyword: "",
    response: ""
  });
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your customer support settings have been updated"
      });
    }, 1000);
  };
  
  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      toast({
        title: "Missing information",
        description: "Please provide both question and answer",
        variant: "destructive"
      });
      return;
    }
    
    const faq: FAQ = {
      id: Date.now().toString(),
      ...newFaq,
      isActive: true
    };
    
    setFaqs([...faqs, faq]);
    setNewFaq({
      question: "",
      answer: "",
      category: "General"
    });
    
    toast({
      title: "FAQ added",
      description: "Your new FAQ has been added successfully"
    });
  };
  
  const handleAddAutoResponse = () => {
    if (!newAutoResponse.keyword || !newAutoResponse.response) {
      toast({
        title: "Missing information",
        description: "Please provide both keyword and response",
        variant: "destructive"
      });
      return;
    }
    
    const autoResponse: AutoResponse = {
      id: Date.now().toString(),
      ...newAutoResponse,
      isActive: true
    };
    
    setAutoResponses([...autoResponses, autoResponse]);
    setNewAutoResponse({
      keyword: "",
      response: ""
    });
    
    toast({
      title: "Auto-response added",
      description: "Your new auto-response has been added successfully"
    });
  };
  
  const toggleFaqStatus = (id: string) => {
    setFaqs(prev => 
      prev.map(faq => 
        faq.id === id ? { ...faq, isActive: !faq.isActive } : faq
      )
    );
  };
  
  const toggleAutoResponseStatus = (id: string) => {
    setAutoResponses(prev => 
      prev.map(response => 
        response.id === id ? { ...response, isActive: !response.isActive } : response
      )
    );
  };
  
  const handleDeleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
    
    toast({
      title: "FAQ deleted",
      description: "The FAQ has been deleted successfully"
    });
  };
  
  const handleDeleteAutoResponse = (id: string) => {
    setAutoResponses(prev => prev.filter(response => response.id !== id));
    
    toast({
      title: "Auto-response deleted",
      description: "The auto-response has been deleted successfully"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Customer Support</h2>
          <p className="text-gray-600">Configure how your chatbot handles customer support inquiries</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="support-enabled" 
            checked={isSupportEnabled}
            onCheckedChange={setIsSupportEnabled}
          />
          <Label htmlFor="support-enabled">
            {isSupportEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>
      
      <Tabs defaultValue="faqs">
        <TabsList className="mb-6">
          <TabsTrigger value="faqs">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="auto-responses">
            <MessageCircle className="h-4 w-4 mr-2" />
            Auto-Responses
          </TabsTrigger>
          <TabsTrigger value="handoff">
            <Headphones className="h-4 w-4 mr-2" />
            Human Handoff
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Frequently Asked Question</CardTitle>
              <CardDescription>
                Create FAQs that your chatbot can automatically answer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faq-question">Question</Label>
                <Input
                  id="faq-question"
                  placeholder="e.g., How do I track my order?"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="faq-answer">Answer</Label>
                <Textarea
                  id="faq-answer"
                  placeholder="Provide a clear and helpful answer..."
                  rows={4}
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="faq-category">Category</Label>
                <select 
                  id="faq-category"
                  className="w-full rounded-md border border-input px-3 py-2"
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Account">Account</option>
                  <option value="Billing">Billing</option>
                  <option value="Orders">Orders</option>
                  <option value="Products">Products</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Returns">Returns & Refunds</option>
                </select>
              </div>
              
              <Button onClick={handleAddFaq}>
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Existing FAQs</h3>
              
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search FAQs..." className="pl-8" />
              </div>
            </div>
            
            {faqs.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {faqs.map(faq => (
                    <Card key={faq.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-start">
                              <Badge variant="outline" className="mr-2">
                                {faq.category}
                              </Badge>
                              {!faq.isActive && (
                                <Badge variant="outline" className="bg-gray-100">
                                  Disabled
                                </Badge>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-base mb-2">{faq.question}</h4>
                              <p className="text-sm text-gray-600">{faq.answer}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFaqStatus(faq.id)}
                            >
                              {faq.isActive ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteFaq(faq.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center p-6 border border-dashed rounded-lg">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-medium">No FAQs added yet</h4>
                <p className="text-gray-500 mt-1">
                  Add some frequently asked questions to help your customers
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="auto-responses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Auto-Response</CardTitle>
              <CardDescription>
                Create automatic responses triggered by specific keywords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Trigger Keyword/Phrase</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., refund policy, shipping time"
                  value={newAutoResponse.keyword}
                  onChange={(e) => setNewAutoResponse({ ...newAutoResponse, keyword: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  The chatbot will use this response when users mention this keyword
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response">Response</Label>
                <Textarea
                  id="response"
                  placeholder="Enter the automatic response..."
                  rows={4}
                  value={newAutoResponse.response}
                  onChange={(e) => setNewAutoResponse({ ...newAutoResponse, response: e.target.value })}
                />
              </div>
              
              <Button onClick={handleAddAutoResponse}>
                <Plus className="h-4 w-4 mr-2" />
                Add Auto-Response
              </Button>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Existing Auto-Responses</h3>
            
            {autoResponses.length > 0 ? (
              <div className="space-y-4">
                {autoResponses.map(response => (
                  <Card key={response.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">Trigger: "{response.keyword}"</h4>
                            {!response.isActive && (
                              <Badge variant="outline" className="ml-2 bg-gray-100">
                                Disabled
                              </Badge>
                            )}
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm">{response.response}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleAutoResponseStatus(response.id)}
                          >
                            {response.isActive ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAutoResponse(response.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-medium">No auto-responses added yet</h4>
                <p className="text-gray-500 mt-1">
                  Add auto-responses to handle common inquiries efficiently
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="handoff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Human Agent Handoff</CardTitle>
              <CardDescription>
                Configure when and how to transfer conversations to human agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Human Handoff</h4>
                  <p className="text-sm text-gray-600">
                    Allow customers to request a human agent when needed
                  </p>
                </div>
                <Switch 
                  id="human-handoff" 
                  checked={isHumanHandoffEnabled}
                  onCheckedChange={setIsHumanHandoffEnabled}
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Handoff Triggers</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="trigger-request" defaultChecked />
                    <Label htmlFor="trigger-request">Customer explicitly requests a human</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="trigger-repetition" defaultChecked />
                    <Label htmlFor="trigger-repetition">Customer repeats the same question multiple times</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="trigger-negative" defaultChecked />
                    <Label htmlFor="trigger-negative">Detected negative sentiment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="trigger-complex" defaultChecked />
                    <Label htmlFor="trigger-complex">Complex inquiry detected</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Business Hours</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Define when human agents are available for live handoff
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Weekdays</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="time" defaultValue="09:00" className="w-full" />
                        <span>to</span>
                        <Input type="time" defaultValue="18:00" className="w-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Weekends</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="time" defaultValue="10:00" className="w-full" />
                        <span>to</span>
                        <Input type="time" defaultValue="16:00" className="w-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="w-full rounded-md border border-input px-3 py-2"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unavailable-message">Message When Agents Unavailable</Label>
                <Textarea
                  id="unavailable-message"
                  placeholder="Message to show when no human agents are available..."
                  rows={3}
                  defaultValue="Our support team is currently unavailable. Please leave your message and contact information, and we'll get back to you during business hours."
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
              <CardDescription>
                Configure what information to collect when a customer needs assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Required Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-name-support" defaultChecked />
                    <Label htmlFor="collect-name-support">Full Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-email-support" defaultChecked />
                    <Label htmlFor="collect-email-support">Email Address</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-phone-support" defaultChecked />
                    <Label htmlFor="collect-phone-support">Phone Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-order-support" />
                    <Label htmlFor="collect-order-support">Order Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-message-support" defaultChecked />
                    <Label htmlFor="collect-message-support">Message/Issue Description</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure how your customer support chatbot should behave
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Knowledge Base</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="use-faq" defaultChecked />
                    <Label htmlFor="use-faq">Use FAQ knowledge base</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="use-product" defaultChecked />
                    <Label htmlFor="use-product">Use product information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="use-order" defaultChecked />
                    <Label htmlFor="use-order">Use order information (for logged in users)</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Support Experience</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="proactive-support" defaultChecked />
                    <Label htmlFor="proactive-support">Offer proactive support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="satisfaction-survey" defaultChecked />
                    <Label htmlFor="satisfaction-survey">Ask for feedback after resolving issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="follow-up" defaultChecked />
                    <Label htmlFor="follow-up">Send follow-up emails for unresolved issues</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="greeting-message">Support Greeting Message</Label>
                <Textarea
                  id="greeting-message"
                  placeholder="Custom greeting for support inquiries..."
                  rows={3}
                  defaultValue="Hello! I'm your customer support assistant. How can I help you today? I can answer questions about your order, provide product information, or connect you with a human agent if needed."
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications about customer support inquiries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-new-inquiry" defaultChecked />
                    <Label htmlFor="email-new-inquiry">New support inquiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-handoff" defaultChecked />
                    <Label htmlFor="email-handoff">Human handoff request</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="support@yourcompany.com"
                  defaultValue="support@example.com"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSupportTab;
