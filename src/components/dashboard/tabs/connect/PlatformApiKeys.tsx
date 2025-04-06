
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCcw, Save } from "lucide-react";
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

interface PlatformApiKey {
  id: string;
  name: string;
  description: string;
  key: string;
  status: "active" | "inactive" | "expired";
}

const PlatformApiKeys = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<PlatformApiKey[]>([
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      description: "Used for connecting to WhatsApp Business API",
      key: "wh_1234567890abcdef",
      status: "active"
    },
    {
      id: "facebook",
      name: "Facebook Graph API",
      description: "Used for Messenger and Facebook integration",
      key: "fb_1234567890abcdef",
      status: "inactive"
    },
    {
      id: "instagram",
      name: "Instagram Graph API",
      description: "Used for Instagram DM integration",
      key: "ig_1234567890abcdef",
      status: "inactive"
    }
  ]);
  
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const formSchema = z.object({
    apiKey: z.string().min(10, "API key must be at least 10 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
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

  const regenerateKey = (id: string) => {
    // In a real implementation, this would call an API to generate a new key
    const newKey = `${id.substring(0, 2)}_${Math.random().toString(36).substring(2, 15)}`;
    
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
      <CardHeader>
        <CardTitle>Platform API Keys</CardTitle>
        <CardDescription>
          Manage API keys for integrating with various messaging platforms
        </CardDescription>
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
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlatformApiKeys;
