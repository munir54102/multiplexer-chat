
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Bot, 
  Palette, 
  Image as ImageIcon,
  Layout, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

const DesignTab = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Design state
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6");
  const [secondaryColor, setSecondaryColor] = useState("#F3F4F6");
  const [chatPosition, setChatPosition] = useState("bottom-right");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can I help you today?");
  const [chatbotName, setChatbotName] = useState(location.state?.botName || "My Chatbot");
  const [avatarType, setAvatarType] = useState("icon");
  const [avatarIcon, setAvatarIcon] = useState("robot");
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(8);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleSaveDesign = () => {
    toast({
      title: "Design updated",
      description: "Your chatbot design has been saved successfully.",
    });
    
    // Navigate to the next step
    navigate("/dashboard/test", { 
      state: { 
        botName: chatbotName,
        step: 'test',
        design: {
          primaryColor,
          secondaryColor,
          chatPosition,
          welcomeMessage,
          avatarType,
          avatarIcon,
          fontSize,
          borderRadius,
          isDarkMode
        }
      } 
    });
  };
  
  const handlePreviewDesign = () => {
    toast({
      title: "Preview mode",
      description: "This is a preview of your chatbot design.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Design Your Chatbot</h1>
          <p className="text-gray-600">Customize how your chatbot looks and feels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreviewDesign}>
            Preview
          </Button>
          <Button onClick={handleSaveDesign}>
            Save & Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="appearance" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="chatbox" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chat Box</span>
              </TabsTrigger>
              <TabsTrigger value="avatar" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Avatar</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <span>Layout</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Colors & Theme</CardTitle>
                  <CardDescription>Customize the colors of your chatbot interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="primary-color"
                        type="color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        type="text" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="secondary-color"
                        type="color" 
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        type="text" 
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dark-mode"
                      checked={isDarkMode}
                      onChange={(e) => setIsDarkMode(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Style Customization</CardTitle>
                  <CardDescription>Adjust the font size and border radius</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    </div>
                    <Slider
                      id="font-size"
                      value={[fontSize]}
                      min={12}
                      max={20}
                      step={1}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="border-radius">Border Radius: {borderRadius}px</Label>
                    </div>
                    <Slider
                      id="border-radius"
                      value={[borderRadius]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(value) => setBorderRadius(value[0])}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chatbox" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Box Settings</CardTitle>
                  <CardDescription>Configure how your chat box appears to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chatbot-name">Chatbot Name</Label>
                    <Input 
                      id="chatbot-name"
                      value={chatbotName}
                      onChange={(e) => setChatbotName(e.target.value)}
                      placeholder="Enter chatbot name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Input 
                      id="welcome-message"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Enter welcome message"
                    />
                    <p className="text-sm text-gray-500">This message will be shown when the chat is first opened</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="avatar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avatar Customization</CardTitle>
                  <CardDescription>Choose how your chatbot is represented visually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={avatarType} onValueChange={setAvatarType} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="icon" id="avatar-icon" />
                      <Label htmlFor="avatar-icon">Use Icon</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="avatar-image" />
                      <Label htmlFor="avatar-image">Upload Image</Label>
                    </div>
                  </RadioGroup>
                  
                  {avatarType === "icon" ? (
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {["robot", "message", "user", "help"].map((icon) => (
                        <div 
                          key={icon}
                          className={`
                            p-4 border rounded-md cursor-pointer flex justify-center
                            ${avatarIcon === icon ? 'border-primary bg-primary/10' : 'border-gray-200'}
                          `}
                          onClick={() => setAvatarIcon(icon)}
                        >
                          {icon === "robot" ? (
                            <Bot className="h-8 w-8" />
                          ) : icon === "message" ? (
                            <MessageSquare className="h-8 w-8" />
                          ) : icon === "user" ? (
                            <Bot className="h-8 w-8" />
                          ) : (
                            <ImageIcon className="h-8 w-8" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="avatar-upload">Upload Avatar Image</Label>
                      <Input id="avatar-upload" type="file" />
                      <p className="text-sm text-gray-500">Recommended size: 100x100px, PNG or JPG</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Window Position</CardTitle>
                  <CardDescription>Select where the chat window appears on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={chatPosition} onValueChange={setChatPosition} className="grid grid-cols-2 gap-4">
                    {[
                      { value: "bottom-right", label: "Bottom Right" },
                      { value: "bottom-left", label: "Bottom Left" },
                      { value: "top-right", label: "Top Right" },
                      { value: "top-left", label: "Top Left" }
                    ].map((position) => (
                      <div 
                        key={position.value}
                        className={`
                          border rounded-md p-4 cursor-pointer
                          ${chatPosition === position.value ? 'border-primary bg-primary/10' : 'border-gray-200'}
                        `}
                        onClick={() => setChatPosition(position.value)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{position.label}</span>
                          {chatPosition === position.value && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your chatbot will look</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-xs">
                <div 
                  className="border rounded-lg overflow-hidden shadow-lg" 
                  style={{ 
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    color: isDarkMode ? '#F9FAFB' : '#111827',
                  }}
                >
                  <div 
                    className="px-4 py-3 flex items-center justify-between"
                    style={{ backgroundColor: primaryColor, color: '#FFFFFF' }}
                  >
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      <span style={{ fontSize: `${fontSize}px` }}>{chatbotName}</span>
                    </div>
                    <button className="text-white">×</button>
                  </div>
                  
                  <div className="p-4 h-56 overflow-y-auto">
                    <div className="flex items-start mb-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div 
                        className="bg-gray-100 px-3 py-2 rounded-lg max-w-[80%]"
                        style={{ backgroundColor: secondaryColor }}
                      >
                        <p style={{ fontSize: `${fontSize}px` }}>{welcomeMessage}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 border-t flex items-center gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="text-sm"
                      style={{ 
                        backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
                        color: isDarkMode ? '#F9FAFB' : '#111827',
                      }}
                    />
                    <Button size="sm" style={{ backgroundColor: primaryColor }}>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500 text-center">This is how your chatbot will appear to users</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignTab;
