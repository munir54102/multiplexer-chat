
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Copy, Image, Download, Upload, Palette, Type, Monitor, Smartphone, Settings, Save, PlusCircle, MinusCircle, MessageSquare, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppearanceCustomization = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("desktop");
  const [colorScheme, setColorScheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#3e63dd");
  const [secondaryColor, setSecondaryColor] = useState("#f7f9fc");
  const [accentColor, setAccentColor] = useState("#7c3aed");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(8);
  const [showBranding, setShowBranding] = useState(true);
  const [position, setPosition] = useState("right");
  const [customCssMode, setCustomCssMode] = useState(false);
  const [customCss, setCustomCss] = useState("");
  const [previewImage, setPreviewImage] = useState("/placeholder.svg");
  const [chatHeight, setChatHeight] = useState(70);
  const [chatWidth, setChatWidth] = useState(80);
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your customizations have been applied to the chatbot."
    });
  };
  
  const resetToDefaults = () => {
    setPrimaryColor("#3e63dd");
    setSecondaryColor("#f7f9fc");
    setAccentColor("#7c3aed");
    setFontFamily("Inter");
    setFontSize(16);
    setBorderRadius(8);
    setShowBranding(true);
    setPosition("right");
    
    toast({
      title: "Reset to defaults",
      description: "All appearance settings have been reset to their default values."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appearance</h2>
          <p className="text-muted-foreground">
            Customize how your chatbot looks on your website
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="border-radius">Border Radius</Label>
                      <span className="text-sm text-gray-500">{borderRadius}px</span>
                    </div>
                    <Slider
                      id="border-radius"
                      min={0}
                      max={20}
                      step={1}
                      value={[borderRadius]}
                      onValueChange={(value) => setBorderRadius(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <RadioGroup 
                      defaultValue={position} 
                      onValueChange={setPosition}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="left" />
                        <Label htmlFor="left">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="right" />
                        <Label htmlFor="right">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-branding"
                      checked={showBranding}
                      onCheckedChange={setShowBranding}
                    />
                    <Label htmlFor="show-branding">Show "Powered by MultiplexAI" branding</Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Scheme</Label>
                    <RadioGroup 
                      defaultValue={colorScheme} 
                      onValueChange={setColorScheme}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="auto" id="auto" />
                        <Label htmlFor="auto">Auto</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded cursor-pointer border" 
                        style={{ backgroundColor: primaryColor }}
                      />
                      <Input 
                        id="primary-color" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 p-1 h-8"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded cursor-pointer border" 
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <Input 
                        id="secondary-color" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-16 p-1 h-8"
                      />
                      <Input 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded cursor-pointer border" 
                        style={{ backgroundColor: accentColor }}
                      />
                      <Input 
                        id="accent-color" 
                        type="color" 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-16 p-1 h-8"
                      />
                      <Input 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="font-size">Font Size</Label>
                      <span className="text-sm text-gray-500">{fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>
                  
                  <div className="mt-4 p-4 border rounded-md">
                    <p className="mb-2 text-sm text-gray-500">Preview:</p>
                    <p style={{ fontFamily, fontSize: `${fontSize}px` }}>
                      This is how your chatbot text will appear.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="layout" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="chat-width">Chat Width</Label>
                      <span className="text-sm text-gray-500">{chatWidth}%</span>
                    </div>
                    <Slider
                      id="chat-width"
                      min={30}
                      max={100}
                      step={5}
                      value={[chatWidth]}
                      onValueChange={(value) => setChatWidth(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="chat-height">Chat Height</Label>
                      <span className="text-sm text-gray-500">{chatHeight}%</span>
                    </div>
                    <Slider
                      id="chat-height"
                      min={30}
                      max={100}
                      step={5}
                      value={[chatHeight]}
                      onValueChange={(value) => setChatHeight(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="launcher-icon">Launcher Icon</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="border rounded-md p-2 text-center cursor-pointer hover:border-primary">
                        <MessageSquare className="h-8 w-8 mx-auto mb-1" />
                        <p className="text-xs">Chat</p>
                      </div>
                      <div className="border rounded-md p-2 text-center cursor-pointer hover:border-primary">
                        <UserCircle className="h-8 w-8 mx-auto mb-1" />
                        <p className="text-xs">User</p>
                      </div>
                      <div className="border rounded-md p-2 text-center cursor-pointer hover:border-primary">
                        <Button className="h-8 w-8 rounded-full p-0 mx-auto mb-1">
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <p className="text-xs">Plus</p>
                      </div>
                      <div className="border rounded-md p-2 text-center cursor-pointer hover:border-primary bg-gray-50">
                        <div className="h-8 w-8 mx-auto mb-1 flex items-center justify-center">
                          <Upload className="h-4 w-4" />
                        </div>
                        <p className="text-xs">Custom</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="custom-css-mode"
                      checked={customCssMode}
                      onCheckedChange={setCustomCssMode}
                    />
                    <Label htmlFor="custom-css-mode">Enable Custom CSS</Label>
                  </div>
                  
                  {customCssMode && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <Textarea
                        id="custom-css"
                        value={customCss}
                        onChange={(e) => setCustomCss(e.target.value)}
                        placeholder=".multiplex-chat-container { /* your styles */ }"
                        className="font-mono h-40"
                      />
                      <p className="text-xs text-gray-500">
                        Use custom CSS to override the default styles. Changes will be applied immediately.
                      </p>
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label>Upload Custom Assets</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-dashed rounded-md p-4 text-center">
                        <div className="mb-2">
                          <Image className="h-8 w-8 mx-auto text-gray-400" />
                        </div>
                        <p className="text-sm mb-2">Upload Logo</p>
                        <Button size="sm" variant="outline">
                          <Upload className="h-3 w-3 mr-1" /> Select File
                        </Button>
                      </div>
                      <div className="border border-dashed rounded-md p-4 text-center">
                        <div className="mb-2">
                          <Image className="h-8 w-8 mx-auto text-gray-400" />
                        </div>
                        <p className="text-sm mb-2">Agent Avatar</p>
                        <Button size="sm" variant="outline">
                          <Upload className="h-3 w-3 mr-1" /> Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <div className="h-24 bg-blue-500"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">Professional Blue</h4>
                    <p className="text-xs text-gray-500">Classic business theme</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <div className="h-24 bg-purple-500"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">Creative Purple</h4>
                    <p className="text-xs text-gray-500">Modern design agency look</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <div className="h-24 bg-green-500"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">Eco Green</h4>
                    <p className="text-xs text-gray-500">Sustainability focused</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <div className="h-24 bg-gray-800"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">Dark Mode</h4>
                    <p className="text-xs text-gray-500">Low light environment</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <div className="h-24 bg-red-500"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">Vibrant Red</h4>
                    <p className="text-xs text-gray-500">Bold and attention-grabbing</p>
                  </div>
                </div>
                <div className="border border-dashed rounded-md overflow-hidden flex items-center justify-center h-[104px] cursor-pointer hover:border-primary transition-colors">
                  <div className="text-center">
                    <PlusCircle className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                    <p className="text-sm text-gray-500">Create Custom</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-5">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Preview</CardTitle>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="grid w-[200px] grid-cols-2">
                      <TabsTrigger value="desktop" className="flex items-center">
                        <Monitor className="h-4 w-4 mr-2" /> Desktop
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" /> Mobile
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border rounded-md overflow-hidden mx-auto transition-all ${
                    activeTab === "desktop" ? "w-full" : "w-[320px]"
                  }`}
                >
                  <div 
                    className="bg-gray-50 border-b p-3 flex items-center justify-between"
                    style={{ 
                      backgroundColor: secondaryColor,
                      borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
                    }}
                  >
                    <div className="font-medium" style={{ fontFamily, fontSize: `${fontSize}px` }}>
                      Chat with AI Assistant
                    </div>
                    <Settings className="h-4 w-4 text-gray-500" />
                  </div>
                  <div 
                    className="h-80 p-4 overflow-y-auto"
                    style={{ 
                      fontFamily,
                      fontSize: `${fontSize}px`
                    }}
                  >
                    <div className="flex mb-4">
                      <div 
                        className="rounded-full h-8 w-8 bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      >
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div 
                        className="bg-gray-100 rounded-lg p-3 max-w-[80%]"
                        style={{ 
                          borderRadius: `${borderRadius}px` ,
                          backgroundColor: secondaryColor
                        }}
                      >
                        Hello! How can I help you today?
                      </div>
                    </div>
                    <div className="flex justify-end mb-4">
                      <div 
                        className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]"
                        style={{ 
                          borderRadius: `${borderRadius}px`,
                          backgroundColor: primaryColor
                        }}
                      >
                        I'm looking for information about your services.
                      </div>
                    </div>
                    <div className="flex mb-4">
                      <div 
                        className="rounded-full h-8 w-8 bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      >
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div 
                        className="bg-gray-100 rounded-lg p-3 max-w-[80%]"
                        style={{ 
                          borderRadius: `${borderRadius}px`,
                          backgroundColor: secondaryColor
                        }}
                      >
                        I'd be happy to help! We offer several services including:
                        <ul className="list-disc ml-4 mt-2">
                          <li>Website development</li>
                          <li>Mobile applications</li>
                          <li>Custom software solutions</li>
                        </ul>
                        What specific area are you interested in?
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-3 flex items-center">
                    <Input 
                      placeholder="Type your message..."
                      className="flex-1 mr-2"
                      style={{ borderRadius: `${borderRadius}px` }}
                    />
                    <Button
                      size="sm"
                      style={{ 
                        backgroundColor: primaryColor,
                        borderRadius: `${borderRadius}px`
                      }}
                    >
                      Send
                    </Button>
                  </div>
                  {showBranding && (
                    <div className="text-center py-2 text-xs text-gray-500 border-t">
                      Powered by MultiplexAI
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Theme
                  </Button>
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
