
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Check, Languages, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const languages = [
  { code: "en", name: "English", translated: "100%" },
  { code: "es", name: "Spanish", translated: "100%" },
  { code: "fr", name: "French", translated: "100%" },
  { code: "de", name: "German", translated: "100%" },
  { code: "it", name: "Italian", translated: "100%" },
  { code: "pt", name: "Portuguese", translated: "100%" },
  { code: "nl", name: "Dutch", translated: "95%" },
  { code: "ru", name: "Russian", translated: "90%" },
  { code: "zh", name: "Chinese (Simplified)", translated: "95%" },
  { code: "ja", name: "Japanese", translated: "90%" },
  { code: "ko", name: "Korean", translated: "85%" },
  { code: "ar", name: "Arabic", translated: "85%" },
  { code: "hi", name: "Hindi", translated: "80%" },
  { code: "tr", name: "Turkish", translated: "80%" },
  { code: "pl", name: "Polish", translated: "75%" },
];

const LanguageSettings = () => {
  const { toast } = useToast();
  const [primaryLanguage, setPrimaryLanguage] = useState("en");
  const [autoDetect, setAutoDetect] = useState(true);
  const [enabledLanguages, setEnabledLanguages] = useState<string[]>(["en", "es", "fr"]);
  
  const handleToggleLanguage = (code: string) => {
    if (code === primaryLanguage) {
      toast({
        variant: "destructive",
        title: "Cannot disable primary language",
        description: "Change your primary language first before disabling this language."
      });
      return;
    }
    
    if (enabledLanguages.includes(code)) {
      setEnabledLanguages(enabledLanguages.filter(lang => lang !== code));
    } else {
      setEnabledLanguages([...enabledLanguages, code]);
    }
  };
  
  const handlePrimaryLanguageChange = (value: string) => {
    setPrimaryLanguage(value);
    
    // Make sure primary language is enabled
    if (!enabledLanguages.includes(value)) {
      setEnabledLanguages([...enabledLanguages, value]);
    }
    
    toast({
      title: "Primary language updated",
      description: `Your chatbot's primary language is now ${languages.find(l => l.code === value)?.name}.`
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Language settings saved",
      description: `Your chatbot now supports ${enabledLanguages.length} languages.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Language Settings</h2>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </div>
      
      <Tabs defaultValue="supported">
        <TabsList className="mb-4">
          <TabsTrigger value="supported">Supported Languages</TabsTrigger>
          <TabsTrigger value="translation">Translation Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="supported">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Primary Language</CardTitle>
                <CardDescription>
                  Set the default language for your chatbot. This will be used when no language is specified.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={primaryLanguage} onValueChange={handlePrimaryLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Language Detection</CardTitle>
                <CardDescription>
                  Automatically detect the user's language and respond accordingly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-detect">Auto-detect language</Label>
                    <p className="text-sm text-gray-500">
                      Your chatbot will automatically detect and respond in the user's language.
                    </p>
                  </div>
                  <Switch
                    id="auto-detect"
                    checked={autoDetect}
                    onCheckedChange={setAutoDetect}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Enabled Languages</CardTitle>
              <CardDescription>
                Select which languages your chatbot can use. Your chatbot can only respond in languages that are enabled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language) => {
                  const isEnabled = enabledLanguages.includes(language.code);
                  const isPrimary = primaryLanguage === language.code;
                  
                  return (
                    <div 
                      key={language.code}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        isEnabled ? 'border-primary' : 'border-gray-200'
                      } ${isPrimary ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">
                            {language.name}
                            {isPrimary && (
                              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Primary
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">Translated: {language.translated}</p>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => handleToggleLanguage(language.code)}
                        disabled={isPrimary}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="translation">
          <Card>
            <CardHeader>
              <CardTitle>Translation Service</CardTitle>
              <CardDescription>
                Configure how translations are handled for your chatbot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Use AI-powered translation</Label>
                    <p className="text-sm text-gray-500">
                      More accurate translations with context awareness
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Cache translations</Label>
                    <p className="text-sm text-gray-500">
                      Store frequent translations for faster responses
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Show language switching option</Label>
                    <p className="text-sm text-gray-500">
                      Allow users to manually switch the chatbot language
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LanguageSettings;
