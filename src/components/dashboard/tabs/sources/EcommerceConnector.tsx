
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  ArrowRight, 
  Store, 
  Globe, 
  Database, 
  Tag, 
  Loader2 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface StoreConnection {
  id: string;
  name: string;
  platform: string;
  url: string;
  status: ConnectionStatus;
  productsCount?: number;
  lastSync?: Date;
}

const EcommerceConnector = () => {
  const { toast } = useToast();
  const [storeUrl, setStoreUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("woocommerce");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [connections, setConnections] = useState<StoreConnection[]>([]);

  const platforms = [
    { id: "woocommerce", name: "WooCommerce", icon: <ShoppingCart className="h-5 w-5 text-blue-600" /> },
    { id: "shopify", name: "Shopify", icon: <Store className="h-5 w-5 text-green-600" /> },
    { id: "magento", name: "Magento", icon: <Database className="h-5 w-5 text-orange-600" /> },
    { id: "bigcommerce", name: "BigCommerce", icon: <Tag className="h-5 w-5 text-purple-600" /> }
  ];

  const validateConnection = () => {
    if (!storeUrl || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please provide both store URL and API key",
        variant: "destructive"
      });
      return false;
    }

    // Basic URL validation
    try {
      new URL(storeUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid store URL",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleConnect = async () => {
    if (!validateConnection()) return;

    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      const newConnection: StoreConnection = {
        id: Date.now().toString(),
        name: `${new URL(storeUrl).hostname}`,
        platform: platforms.find(p => p.id === selectedPlatform)?.name || selectedPlatform,
        url: storeUrl,
        status: "connected",
        productsCount: Math.floor(Math.random() * 500) + 50,
        lastSync: new Date()
      };

      setConnections(prev => [...prev, newConnection]);
      setStoreUrl("");
      setApiKey("");
      
      toast({
        title: "Connection successful",
        description: `Connected to ${newConnection.name} successfully.`
      });
      
      setIsConnecting(false);
    }, 2000);
  };

  const handleValidate = () => {
    if (!validateConnection()) return;
    
    setIsValidating(true);
    
    // Simulate API validation
    setTimeout(() => {
      setIsValidating(false);
      
      toast({
        title: "Connection validated",
        description: "Your store API credentials are valid."
      });
    }, 1500);
  };

  const handleSync = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    
    toast({
      title: "Sync started",
      description: `Syncing products from ${connection?.name}`
    });
    
    // Update the connection with new sync time
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, lastSync: new Date() } 
          : conn
      )
    );
    
    setTimeout(() => {
      toast({
        title: "Sync completed",
        description: `Successfully synced products from ${connection?.name}`
      });
    }, 2000);
  };

  const handleRemove = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
    
    toast({
      title: "Connection removed",
      description: `${connection?.name} has been disconnected`
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Connect to E-commerce Store</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Store Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {platforms.map(platform => (
                <div 
                  key={platform.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center text-center
                    ${selectedPlatform === platform.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <div className="mb-2">{platform.icon}</div>
                  <div className="font-medium">{platform.name}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-url">Store URL</Label>
                <Input
                  id="store-url"
                  placeholder="https://your-store.com"
                  value={storeUrl}
                  onChange={e => setStoreUrl(e.target.value)}
                  disabled={isConnecting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key/Secret</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  disabled={isConnecting}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={handleValidate}
                disabled={isValidating || isConnecting}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate Connection"
                )}
              </Button>
              
              <Button 
                onClick={handleConnect}
                disabled={isConnecting || isValidating}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Connect Store
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {connections.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Connected Stores</h3>
          <div className="space-y-4">
            {connections.map(connection => (
              <Card key={connection.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center">
                      {platforms.find(p => p.name === connection.platform)?.icon || <Store className="h-5 w-5 mr-2" />}
                      <div className="ml-2">
                        <h4 className="font-medium">{connection.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Badge variant="outline" className="mr-2">{connection.platform}</Badge>
                          {connection.lastSync && (
                            <span>Last synced: {connection.lastSync.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <span className="text-sm mr-2">
                        {connection.productsCount} products
                      </span>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleSync(connection.id)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleRemove(connection.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceConnector;
