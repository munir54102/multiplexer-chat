
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, Layout, Type, Image, MessageSquare, 
  PanelLeft, Monitor, Smartphone, Tablet, Save, 
  Undo, Eye, EyeOff, Check, X, ArrowRight
} from "lucide-react";

const AppearanceCustomization = () => {
  const { toast } = useToast();
  const [activePreset, setActivePreset] = useState("modern");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [secondaryColor, setSecondaryColor] = useState("#f9fafb");
  const [accentColor, setAccentColor] = useState("#10b981");
  const [borderRadius, setBorderRadius] = useState([8]);
  const [showUserAvatar, setShowUserAvatar] = useState(true);
  const [showBotAvatar, setShowBotAvatar] = useState(true);
  const [chatWindowHeight, setChatWindowHeight] = useState([400]);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [headerText, setHeaderText] = useState("Chat with our AI Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can I help you today?");
  
  const presets = [
    { id: "modern", name: "Modern", 
      preview: "bg-indigo-50 border border-indigo-200 rounded-lg" },
    { id: "minimal", name: "Minimal", 
      preview: "bg-gray-50 border border-gray-200 rounded-lg" },
    { id: "colorful", name: "Colorful", 
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg" },
    { id: "dark", name: "Dark Mode", 
      preview: "bg-gray-800 border border-gray-700 rounded-lg" },
    { id: "bubbles", name: "Bubbles", 
      preview: "bg-blue-50 border border-blue-200 rounded-xl" },
    { id: "enterprise", name: "Enterprise", 
      preview: "bg-slate-50 border border-slate-200 rounded-md" },
  ];
  
  const handleSelectPreset = (presetId: string) => {
    setActivePreset(presetId);
    
    // Update settings based on the selected preset
    switch (presetId) {
      case "modern":
        setPrimaryColor("#4f46e5");
        setSecondaryColor("#f9fafb");
        setAccentColor("#10b981");
        setBorderRadius([8]);
        setShowUserAvatar(true);
        setShowBotAvatar(true);
        setFontFamily("Inter");
        break;
      case "minimal":
        setPrimaryColor("#1f2937");
        setSecondaryColor("#ffffff");
        setAccentColor("#6b7280");
        setBorderRadius([4]);
        setShowUserAvatar(false);
        setShowBotAvatar(false);
        setFontFamily("System UI");
        break;
      case "colorful":
        setPrimaryColor("#8b5cf6");
        setSecondaryColor("#fdf4ff");
        setAccentColor("#ec4899");
        setBorderRadius([12]);
        setShowUserAvatar(true);
        setShowBotAvatar(true);
        setFontFamily("Poppins");
        break;
      case "dark":
        setPrimaryColor("#cbd5e1");
        setSecondaryColor("#1e293b");
        setAccentColor("#3b82f6");
        setBorderRadius([6]);
        setShowUserAvatar(true);
        setShowBotAvatar(true);
        setFontFamily("System UI");
        break;
      case "bubbles":
        setPrimaryColor("#3b82f6");
        setSecondaryColor("#eff6ff");
        setAccentColor("#10b981");
        setBorderRadius([20]);
        setShowUserAvatar(true);
        setShowBotAvatar(true);
        setFontFamily("Nunito");
        break;
      case "enterprise":
        setPrimaryColor("#0f172a");
        setSecondaryColor("#f8fafc");
        setAccentColor("#0ea5e9");
        setBorderRadius([2]);
        setShowUserAvatar(false);
        setShowBotAvatar(true);
        setFontFamily("IBM Plex Sans");
        break;
    }
    
    toast({
      title: "Preset Applied",
      description: `The ${presets.find(p => p.id === presetId)?.name} preset has been applied.`
    });
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your chatbot appearance has been updated successfully."
    });
  };
  
  const resetToDefaults = () => {
    handleSelectPreset("modern");
    toast({
      title: "Reset to Defaults",
      description: "Appearance settings have been reset to default values."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Chatbot Appearance</h2>
          <p className="text-sm text-muted-foreground">Customize how your chatbot looks and feels</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Style Presets</CardTitle>
              <CardDescription>
                Choose a ready-made style for your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presets.map(preset => (
                  <div key={preset.id} className="text-center">
                    <button
                      className={`w-full aspect-square ${preset.preview} p-3 mb-2 flex flex-col items-center justify-center relative transition-all ${
                        activePreset === preset.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleSelectPreset(preset.id)}
                    >
                      {activePreset === preset.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div className={`w-full h-2 ${
                        preset.id === "dark" ? "bg-gray-700" : 
                        preset.id === "colorful" ? "bg-purple-400" : 
                        preset.id === "bubbles" ? "bg-blue-400" : 
                        preset.id === "enterprise" ? "bg-slate-800" :
                        "bg-indigo-500"
                      } rounded-t-sm mb-1`}></div>
                      <div className="w-2/3 h-1.5 mb-1 rounded-sm bg-gray-400 opacity-50"></div>
                      <div className="w-full h-1.5 mb-1 rounded-sm bg-gray-400 opacity-30"></div>
                      <div className="w-5/6 h-1.5 mb-1 rounded-sm bg-gray-400 opacity-30"></div>
                      <div className="w-full h-1.5 mb-1 rounded-sm bg-gray-400 opacity-30"></div>
                      <div className="w-1/2 h-1.5 rounded-sm bg-gray-400 opacity-50 ml-auto"></div>
                    </button>
                    <span className="text-sm font-medium">{preset.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="colors">
            <TabsList className="mb-4">
              <TabsTrigger value="colors"><Palette className="h-4 w-4 mr-1" /> Colors</TabsTrigger>
              <TabsTrigger value="layout"><Layout className="h-4 w-4 mr-1" /> Layout</TabsTrigger>
              <TabsTrigger value="typography"><Type className="h-4 w-4 mr-1" /> Typography</TabsTrigger>
              <TabsTrigger value="content"><MessageSquare className="h-4 w-4 mr-1" /> Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>
                    Customize the colors of your chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border" 
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <Input 
                        id="primary-color" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Used for headers, buttons and accents
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondary-color">Background Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border" 
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <Input 
                        id="secondary-color" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="flex-1" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Main background of the chat window
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border" 
                        style={{ backgroundColor: accentColor }}
                      ></div>
                      <Input 
                        id="accent-color" 
                        type="color" 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="flex-1" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Used for highlights and secondary elements
                    </p>
                  </div>
                  
                  <div>
                    <Label>Theme Mode</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" className="flex-1 justify-start">
                        <Monitor className="h-4 w-4 mr-2" /> Light Mode
                      </Button>
                      <Button variant="outline" className="flex-1 justify-start">
                        <Monitor className="h-4 w-4 mr-2" /> Dark Mode
                      </Button>
                      <Button variant="default" className="flex-1 justify-start">
                        <Monitor className="h-4 w-4 mr-2" /> Auto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                  <CardDescription>
                    Configure the shape and size of your chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Border Radius</Label>
                      <span className="text-sm">{borderRadius}px</span>
                    </div>
                    <Slider
                      value={borderRadius}
                      onValueChange={setBorderRadius}
                      min={0}
                      max={20}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Square</span>
                      <span>Rounded</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Chat Window Height</Label>
                      <span className="text-sm">{chatWindowHeight}px</span>
                    </div>
                    <Slider
                      value={chatWindowHeight}
                      onValueChange={setChatWindowHeight}
                      min={300}
                      max={700}
                      step={10}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="show-user-avatar" className="mb-2 block">User Avatar</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Show user avatar</span>
                        <Switch 
                          id="show-user-avatar" 
                          checked={showUserAvatar} 
                          onCheckedChange={setShowUserAvatar} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="show-bot-avatar" className="mb-2 block">Bot Avatar</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Show bot avatar</span>
                        <Switch 
                          id="show-bot-avatar" 
                          checked={showBotAvatar} 
                          onCheckedChange={setShowBotAvatar} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Responsive Behavior</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" className="flex-1 justify-start">
                        <Smartphone className="h-4 w-4 mr-2" /> Mobile
                      </Button>
                      <Button variant="outline" className="flex-1 justify-start">
                        <Tablet className="h-4 w-4 mr-2" /> Tablet
                      </Button>
                      <Button variant="default" className="flex-1 justify-start">
                        <Monitor className="h-4 w-4 mr-2" /> All Devices
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Chat Window Position</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button variant="outline" size="sm">Top Left</Button>
                      <Button variant="outline" size="sm">Top Center</Button>
                      <Button variant="outline" size="sm">Top Right</Button>
                      <Button variant="outline" size="sm">Middle Left</Button>
                      <Button variant="outline" size="sm">Center</Button>
                      <Button variant="outline" size="sm">Middle Right</Button>
                      <Button variant="outline" size="sm">Bottom Left</Button>
                      <Button variant="default" size="sm">Bottom Center</Button>
                      <Button variant="outline" size="sm">Bottom Right</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Settings</CardTitle>
                  <CardDescription>
                    Configure fonts and text styles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="System UI">System UI</SelectItem>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Nunito">Nunito</SelectItem>
                        <SelectItem value="IBM Plex Sans">IBM Plex Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="header-color">Header Text Color</Label>
                      <Input 
                        id="header-color" 
                        type="color" 
                        defaultValue="#FFFFFF" 
                        className="w-full h-10 mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="chat-text-color">Chat Text Color</Label>
                      <Input 
                        id="chat-text-color" 
                        type="color" 
                        defaultValue="#1F2937" 
                        className="w-full h-10 mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="font-size">Base Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Settings</CardTitle>
                  <CardDescription>
                    Configure the text content of your chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="header-text">Header Text</Label>
                    <Input 
                      id="header-text" 
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Input 
                      id="welcome-message" 
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="placeholder-text">Input Placeholder</Label>
                    <Input 
                      id="placeholder-text" 
                      defaultValue="Type your message here..." 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="send-button-text">Send Button Text</Label>
                    <Input 
                      id="send-button-text" 
                      defaultValue="Send" 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="branding">Show Branding</Label>
                      <p className="text-xs text-gray-500">
                        Display "Powered by MultiplexAI" in the chatbot
                      </p>
                    </div>
                    <Switch id="branding" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetToDefaults}>
              <Undo className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your chatbot will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Smartphone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm" className="h-8 w-8 p-0">
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div 
                  className="border rounded-lg overflow-hidden"
                  style={{ 
                    borderRadius: `${borderRadius}px`,
                    fontFamily: fontFamily
                  }}
                >
                  {/* Chat header */}
                  <div 
                    className="p-3 flex items-center justify-between"
                    style={{ backgroundColor: primaryColor, color: "white" }}
                  >
                    <div className="font-medium">{headerText}</div>
                    <div className="flex gap-1">
                      <button className="p-1 rounded-full hover:bg-white/10">
                        <Minus className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-white/10">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div 
                    className="p-4 overflow-y-auto"
                    style={{ 
                      backgroundColor: secondaryColor, 
                      height: `${chatWindowHeight}px` 
                    }}
                  >
                    {/* Bot message */}
                    <div className="flex mb-4">
                      {showBotAvatar && (
                        <div 
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0"
                          style={{ color: primaryColor }}
                        >
                          <Bot className="h-4 w-4" />
                        </div>
                      )}
                      <div 
                        className={`p-3 rounded-lg max-w-[80%] ${showBotAvatar ? "" : "ml-0"}`}
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: `${borderRadius}px`
                        }}
                      >
                        <p className="text-gray-800">{welcomeMessage}</p>
                      </div>
                    </div>
                    
                    {/* User message */}
                    <div className="flex justify-end mb-4">
                      <div 
                        className={`p-3 rounded-lg max-w-[80%] ${showUserAvatar ? "" : "mr-0"}`}
                        style={{ 
                          backgroundColor: accentColor, 
                          color: "white",
                          borderRadius: `${borderRadius}px`
                        }}
                      >
                        <p>Hello, I have a question about your service.</p>
                      </div>
                      {showUserAvatar && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 flex-shrink-0">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                    
                    {/* Bot response */}
                    <div className="flex mb-4">
                      {showBotAvatar && (
                        <div 
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0"
                          style={{ color: primaryColor }}
                        >
                          <Bot className="h-4 w-4" />
                        </div>
                      )}
                      <div 
                        className={`p-3 rounded-lg max-w-[80%] ${showBotAvatar ? "" : "ml-0"}`}
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: `${borderRadius}px`
                        }}
                      >
                        <p className="text-gray-800">Of course! I'd be happy to help. What would you like to know about our service?</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat input */}
                  <div 
                    className="p-3 border-t flex gap-2"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    <Input 
                      placeholder="Type your message here..." 
                      className="flex-1"
                    />
                    <Button style={{ backgroundColor: primaryColor }}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                  This is a preview of how your chatbot will appear to users.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceCustomization;
