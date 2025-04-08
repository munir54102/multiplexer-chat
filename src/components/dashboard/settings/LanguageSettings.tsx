
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Check, Plus, Trash2, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LanguageSettings = () => {
  const { toast } = useToast();
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  
  // Sample languages data
  const availableLanguages = [
    { code: "en", name: "English", active: true, translationComplete: 100 },
    { code: "es", name: "Spanish", active: true, translationComplete: 87 },
    { code: "fr", name: "French", active: true, translationComplete: 92 },
    { code: "de", name: "German", active: true, translationComplete: 84 },
    { code: "it", name: "Italian", active: false, translationComplete: 0 },
    { code: "pt", name: "Portuguese", active: false, translationComplete: 0 },
    { code: "nl", name: "Dutch", active: false, translationComplete: 0 },
    { code: "ru", name: "Russian", active: false, translationComplete: 0 },
    { code: "ja", name: "Japanese", active: false, translationComplete: 0 },
    { code: "zh", name: "Chinese (Simplified)", active: false, translationComplete: 0 },
  ];
  
  const handleToggleLanguage = (code: string, currentState: boolean) => {
    toast({
      title: currentState ? "Language Deactivated" : "Language Activated",
      description: `${availableLanguages.find(lang => lang.code === code)?.name} is now ${currentState ? "deactivated" : "activated"}.`
    });
  };
  
  const handleSetDefaultLanguage = (code: string) => {
    const language = availableLanguages.find(lang => lang.code === code)?.name;
    setDefaultLanguage(language!);
    toast({
      title: "Default Language Updated",
      description: `${language} is now set as the default language.`
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Language Settings Saved",
      description: "Your language preferences have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Language Settings</h2>
          <p className="text-sm text-muted-foreground">Configure multilingual support for your chatbot</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Language Preferences</CardTitle>
          <CardDescription>
            Configure how your chatbot handles different languages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-detect">Auto-detect user language</Label>
              <p className="text-xs text-gray-500">
                Automatically detect and respond in the user's preferred language
              </p>
            </div>
            <Switch 
              id="auto-detect" 
              checked={autoDetectLanguage} 
              onCheckedChange={setAutoDetectLanguage} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Default Language</Label>
              <p className="text-xs text-gray-500">
                Used when auto-detection is disabled or fails
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span>{defaultLanguage}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow users to change language</Label>
              <p className="text-xs text-gray-500">
                Show language selector in chatbot interface
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Languages</CardTitle>
          <CardDescription>
            Manage which languages your chatbot supports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableLanguages.map((language) => (
              <div 
                key={language.code} 
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  language.active ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{language.code.toUpperCase()}</span>
                  </div>
                  
                  <div>
                    <div className="font-medium">{language.name}</div>
                    {language.active && language.translationComplete < 100 && (
                      <div className="mt-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Translation complete</span>
                          <span className="text-xs font-medium">{language.translationComplete}%</span>
                        </div>
                        <Progress value={language.translationComplete} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {language.active && defaultLanguage !== language.name && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefaultLanguage(language.code)}
                    >
                      Set as Default
                    </Button>
                  )}
                  
                  {defaultLanguage === language.name && (
                    <Badge className="mr-2">Default</Badge>
                  )}
                  
                  <Button 
                    variant={language.active ? "destructive" : "outline"} 
                    size="sm"
                    onClick={() => handleToggleLanguage(language.code, language.active)}
                  >
                    {language.active ? (
                      <><Trash2 className="h-4 w-4 mr-1" /> Remove</>
                    ) : (
                      <><Plus className="h-4 w-4 mr-1" /> Add</>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save Language Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LanguageSettings;
