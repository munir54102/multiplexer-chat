
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  UserRound, 
  MessageSquare, 
  Briefcase, 
  Target, 
  LineChart, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Loader2 
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ProductKnowledge {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  objectionResponses: {
    objection: string;
    response: string;
  }[];
}

interface SalesScript {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
}

const SalesAgentTab = () => {
  const { toast } = useToast();
  const [isAgentEnabled, setIsAgentEnabled] = useState(true);
  const [agentName, setAgentName] = useState("Sales Assistant");
  const [agentPersonality, setAgentPersonality] = useState("Friendly, knowledgeable, and persuasive");
  const [isLoading, setIsLoading] = useState(false);
  
  const [salesScripts, setSalesScripts] = useState<SalesScript[]>([
    {
      id: "1",
      name: "Initial Introduction",
      content: "Hello! I'm your personal sales assistant. I can help you find the perfect product for your needs. What are you looking for today?",
      isActive: true
    },
    {
      id: "2",
      name: "Product Recommendation",
      content: "Based on what you've told me, I think [Product] would be an excellent choice for you. It has [Features] that address your needs. Would you like to know more about it?",
      isActive: true
    }
  ]);
  
  const [productKnowledge, setProductKnowledge] = useState<ProductKnowledge[]>([
    {
      id: "1",
      name: "Premium Plan",
      description: "Our most comprehensive service package with all features included",
      keyPoints: [
        "24/7 customer support",
        "Unlimited users",
        "API access",
        "Custom integrations"
      ],
      objectionResponses: [
        {
          objection: "It's too expensive",
          response: "While the Premium Plan is our highest tier, it provides significant value through features that can save your team hours of work each week. We also offer flexible payment options."
        },
        {
          objection: "We don't need all these features",
          response: "We can definitely discuss which features would be most valuable for your specific needs. The Premium Plan ensures you have everything available as your business grows."
        }
      ]
    }
  ]);
  
  const [newScript, setNewScript] = useState<Omit<SalesScript, "id" | "isActive">>({
    name: "",
    content: ""
  });
  
  const [editingScript, setEditingScript] = useState<SalesScript | null>(null);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your sales agent settings have been updated"
      });
    }, 1000);
  };
  
  const handleAddScript = () => {
    if (!newScript.name || !newScript.content) {
      toast({
        title: "Missing information",
        description: "Please provide both name and content for the script",
        variant: "destructive"
      });
      return;
    }
    
    const script: SalesScript = {
      id: Date.now().toString(),
      ...newScript,
      isActive: true
    };
    
    setSalesScripts([...salesScripts, script]);
    setNewScript({
      name: "",
      content: ""
    });
    
    toast({
      title: "Script added",
      description: `${script.name} has been added successfully`
    });
  };
  
  const handleUpdateScript = () => {
    if (!editingScript) return;
    
    setSalesScripts(prev => 
      prev.map(script => 
        script.id === editingScript.id ? editingScript : script
      )
    );
    
    setEditingScript(null);
    
    toast({
      title: "Script updated",
      description: `${editingScript.name} has been updated`
    });
  };
  
  const handleDeleteScript = (id: string) => {
    const script = salesScripts.find(s => s.id === id);
    
    setSalesScripts(prev => prev.filter(s => s.id !== id));
    
    toast({
      title: "Script deleted",
      description: `${script?.name} has been deleted`
    });
  };
  
  const toggleScriptStatus = (id: string) => {
    setSalesScripts(prev => 
      prev.map(script => 
        script.id === id ? { ...script, isActive: !script.isActive } : script
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Sales Agent</h2>
          <p className="text-gray-600">Configure your AI sales assistant capabilities</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="agent-enabled" 
            checked={isAgentEnabled}
            onCheckedChange={setIsAgentEnabled}
          />
          <Label htmlFor="agent-enabled">
            {isAgentEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>
      
      <Tabs defaultValue="personality">
        <TabsList className="mb-6">
          <TabsTrigger value="personality">
            <UserRound className="h-4 w-4 mr-2" />
            Personality
          </TabsTrigger>
          <TabsTrigger value="scripts">
            <MessageSquare className="h-4 w-4 mr-2" />
            Sales Scripts
          </TabsTrigger>
          <TabsTrigger value="products">
            <Briefcase className="h-4 w-4 mr-2" />
            Product Knowledge
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="h-4 w-4 mr-2" />
            Goals & Metrics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Personality</CardTitle>
              <CardDescription>
                Define how your sales agent will interact with customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input
                  id="agent-name"
                  placeholder="e.g., Sales Assistant"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agent-personality">Personality Traits</Label>
                <Textarea
                  id="agent-personality"
                  placeholder="e.g., Friendly, knowledgeable, and persuasive"
                  value={agentPersonality}
                  onChange={(e) => setAgentPersonality(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Describe the personality traits of your sales agent. This will guide how it interacts with customers.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Communication Style</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="formal-style" />
                    <Label htmlFor="formal-style">Formal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="casual-style" defaultChecked />
                    <Label htmlFor="casual-style">Casual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="technical-style" />
                    <Label htmlFor="technical-style">Technical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="simple-style" defaultChecked />
                    <Label htmlFor="simple-style">Simple</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Behavior Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="proactive-follow-up" defaultChecked />
                    <Label htmlFor="proactive-follow-up">Proactive follow-up questions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="handle-objections" defaultChecked />
                    <Label htmlFor="handle-objections">Handle common objections</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-leads" defaultChecked />
                    <Label htmlFor="collect-leads">Collect lead information</Label>
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
        
        <TabsContent value="scripts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Sales Script</CardTitle>
              <CardDescription>
                Create scripts that your sales agent can use in conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="script-name">Script Name</Label>
                <Input
                  id="script-name"
                  placeholder="e.g., Product Introduction"
                  value={editingScript ? editingScript.name : newScript.name}
                  onChange={(e) => {
                    if (editingScript) {
                      setEditingScript({ ...editingScript, name: e.target.value });
                    } else {
                      setNewScript({ ...newScript, name: e.target.value });
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="script-content">Script Content</Label>
                <Textarea
                  id="script-content"
                  placeholder="Enter your sales script content here..."
                  rows={5}
                  value={editingScript ? editingScript.content : newScript.content}
                  onChange={(e) => {
                    if (editingScript) {
                      setEditingScript({ ...editingScript, content: e.target.value });
                    } else {
                      setNewScript({ ...newScript, content: e.target.value });
                    }
                  }}
                />
                <p className="text-xs text-gray-500">
                  Use [Product], [Features], and [Benefits] as placeholders that will be replaced with actual product information.
                </p>
              </div>
              
              {editingScript ? (
                <div className="flex space-x-2">
                  <Button onClick={handleUpdateScript}>
                    Update Script
                  </Button>
                  <Button variant="outline" onClick={() => setEditingScript(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddScript}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Script
                </Button>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Existing Scripts</h3>
            
            {salesScripts.length > 0 ? (
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {salesScripts.map(script => (
                    <Card key={script.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <h4 className="font-medium flex items-center">
                              {script.name}
                              {!script.isActive && (
                                <Badge variant="outline" className="ml-2">
                                  Disabled
                                </Badge>
                              )}
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm">{script.content}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingScript(script)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleScriptStatus(script.id)}
                            >
                              {script.isActive ? (
                                <Settings className="h-4 w-4" />
                              ) : (
                                <Settings className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteScript(script.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-gray-500 text-center py-4">No scripts added yet</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Knowledge</CardTitle>
              <CardDescription>
                Add detailed information about your products for the sales agent to reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Connect your e-commerce store or manually add product information to enable your sales agent to effectively promote and sell your products.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Connect E-commerce Store</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically sync product information from your e-commerce platform.
                    </p>
                    <Button variant="outline">
                      Connect Store
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Manual Product Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Manually add product details and sales information.
                    </p>
                    <Button variant="outline">
                      Add Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Objection Handling</h3>
            <p className="text-sm text-gray-600">
              Train your sales agent to handle common objections with persuasive responses.
            </p>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Price Objections</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide responses for when customers say your products are too expensive..."
                    rows={3}
                    defaultValue="While our pricing may seem higher initially, our products offer superior quality and longevity, making them more cost-effective in the long run. We also offer flexible payment options to make it more accessible."
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Competitor Comparisons</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide responses for when customers mention competitors..."
                    rows={3}
                    defaultValue="We're familiar with that solution. What sets our product apart is our focus on [unique selling points]. Our customers particularly value our [specific feature] that isn't available elsewhere."
                  />
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Objection Type
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goals & Metrics</CardTitle>
              <CardDescription>
                Set targets for your sales agent and track performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Primary Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer bg-primary/5 border-primary">
                    <div className="font-medium mb-1">Lead Generation</div>
                    <p className="text-sm text-gray-600">Collect contact information</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="font-medium mb-1">Product Sales</div>
                    <p className="text-sm text-gray-600">Direct purchase conversion</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="font-medium mb-1">Appointment Setting</div>
                    <p className="text-sm text-gray-600">Schedule sales calls</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="success-metric">Success Metric</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="success-metric"
                      placeholder="Target value"
                      type="number"
                      defaultValue={10}
                    />
                  </div>
                  <div>
                    <select className="w-full rounded-md border border-input px-3 py-2">
                      <option>Leads per day</option>
                      <option>Conversion rate (%)</option>
                      <option>Appointments per week</option>
                      <option>Sales per month</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Lead Qualification Criteria</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-name" defaultChecked />
                    <Label htmlFor="collect-name">Full Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-email" defaultChecked />
                    <Label htmlFor="collect-email">Email Address</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-phone" defaultChecked />
                    <Label htmlFor="collect-phone">Phone Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-company" />
                    <Label htmlFor="collect-company">Company Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="collect-budget" />
                    <Label htmlFor="collect-budget">Budget Range</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Track your sales agent's performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <LineChart className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500 ml-4">
                  Performance analytics will be available after your sales agent has been active.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesAgentTab;
