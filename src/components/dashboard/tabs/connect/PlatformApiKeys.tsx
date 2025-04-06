
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCcw, Save, Plus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlatformApiKey {
  id: string;
  name: string;
  description: string;
  key: string;
  status: "active" | "inactive" | "expired";
  platform: string;
}

const PlatformApiKeys = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<PlatformApiKey[]>([
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      description: "Used for connecting to WhatsApp Business API",
      key: "wh_1234567890abcdef",
      status: "active",
      platform: "whatsapp"
    },
    {
      id: "facebook",
      name: "Facebook Graph API",
      description: "Used for Messenger and Facebook integration",
      key: "fb_1234567890abcdef",
      status: "inactive",
      platform: "facebook"
    },
    {
      id: "instagram",
      name: "Instagram Graph API",
      description: "Used for Instagram DM integration",
      key: "ig_1234567890abcdef",
      status: "inactive",
      platform: "instagram"
    }
  ]);
  
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const formSchema = z.object({
    apiKey: z.string().min(10, "API key must be at least 10 characters"),
  });

  const addKeySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    platform: z.string().min(1, "Please select a platform"),
    description: z.string().optional(),
    key: z.string().min(10, "API key must be at least 10 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const addKeyForm = useForm<z.infer<typeof addKeySchema>>({
    resolver: zodResolver(addKeySchema),
    defaultValues: {
      name: "",
      platform: "",
      description: "",
      key: "",
    },
  });

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEditKey = (id: string, currentKey: string) => {
    setEditingKey(id);
    form.setValue("apiKey", currentKey);
  };

  const handleSaveKey = (id: string) => {
    form.handleSubmit((values) => {
      setApiKeys(prev => 
        prev.map(key => 
          key.id === id 
            ? { ...key, key: values.apiKey, status: "active" } 
            : key
        )
      );
      setEditingKey(null);
      toast({
        title: "API Key Updated",
        description: "Your API key has been updated successfully."
      });
    })();
  };

  const handleAddKey = () => {
    addKeyForm.handleSubmit((values) => {
      const newId = values.platform + "_" + Date.now().toString(36);
      const newKey: PlatformApiKey = {
        id: newId,
        name: values.name,
        description: values.description || `API key for ${values.name}`,
        key: values.key,
        status: "active",
        platform: values.platform
      };
      
      setApiKeys([...apiKeys, newKey]);
      setShowAddDialog(false);
      addKeyForm.reset();
      
      toast({
        title: "API Key Added",
        description: `${values.name} API key has been added successfully.`
      });
    })();
  };

  const regenerateKey = (id: string) => {
    // In a real implementation, this would call an API to generate a new key
    const keyPrefix = apiKeys.find(key => key.id === id)?.platform.substring(0, 2) || "api";
    const newKey = `${keyPrefix}_${Math.random().toString(36).substring(2, 15)}`;
    
    setApiKeys(prev => 
      prev.map(key => 
        key.id === id 
          ? { ...key, key: newKey, status: "active" } 
          : key
      )
    );
    
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated. The old key is no longer valid."
    });
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API Key Deleted",
      description: "The API key has been removed."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border border-gray-200 mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Platform API Keys</CardTitle>
          <CardDescription>
            Manage API keys for integrating with various messaging platforms
          </CardDescription>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New API Key</DialogTitle>
              <DialogDescription>
                Add an API key for a third-party platform or service.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...addKeyForm}>
              <form className="space-y-4 py-2">
                <FormField
                  control={addKeyForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Twitter API" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addKeyForm.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="slack">Slack</SelectItem>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="telegram">Telegram</SelectItem>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addKeyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="What this API key is used for" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addKeyForm.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the API key" {...field} />
                      </FormControl>
                      <FormDescription>
                        Keep this key secure. We'll encrypt it before storing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="pt-4">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddKey}>Add Key</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{apiKey.name}</h4>
                <p className="text-sm text-gray-600">{apiKey.description}</p>
              </div>
              {getStatusBadge(apiKey.status)}
            </div>
            
            {editingKey === apiKey.id ? (
              <Form {...form}>
                <form className="space-y-2">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input 
                              {...field} 
                              type={visibleKeys[apiKey.id] ? "text" : "password"} 
                              className="flex-1 rounded-r-none"
                            />
                          </FormControl>
                          <Button 
                            variant="outline" 
                            type="button"
                            className="rounded-l-none border-l-0"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {visibleKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="default" 
                            className="ml-2"
                            onClick={() => handleSaveKey(apiKey.id)}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <div className="flex">
                <Input 
                  type={visibleKeys[apiKey.id] ? "text" : "password"} 
                  value={apiKey.key} 
                  disabled 
                  className="rounded-r-none" 
                />
                <Button 
                  variant="outline" 
                  className="rounded-l-none border-l-0"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                >
                  {visibleKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => handleEditKey(apiKey.id, apiKey.key)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => regenerateKey(apiKey.id)}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  className="ml-2 text-red-600 hover:text-red-700"
                  onClick={() => deleteKey(apiKey.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {apiKeys.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-gray-100 p-3 rounded-full mb-3">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No API Keys Added</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4">
              Add API keys for the external platforms and services you want to integrate with.
            </p>
            <Button onClick={() => setShowAddDialog(true)}>Add Your First API Key</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformApiKeys;
