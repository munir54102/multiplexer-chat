
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, VolumeX, Play, Mic, MicOff, Languages, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VoiceSettings = () => {
  const { toast } = useToast();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechToTextEnabled, setSpeechToTextEnabled] = useState(true);
  const [voiceType, setVoiceType] = useState("neutral");
  const [voiceLanguage, setVoiceLanguage] = useState("en-US");
  const [speakingRate, setSpeakingRate] = useState([1.0]);
  const [voicePitch, setVoicePitch] = useState([1.0]);
  const [voiceVolume, setVoiceVolume] = useState([0.8]);
  
  const handleSaveSettings = () => {
    toast({
      title: "Voice settings saved",
      description: "Your voice settings have been updated successfully."
    });
  };
  
  const handleTestVoice = () => {
    toast({
      title: "Playing voice sample",
      description: "This is a test of the text-to-speech voice."
    });
  };
  
  const voices = [
    { id: "neutral", name: "Neutral" },
    { id: "friendly", name: "Friendly" },
    { id: "professional", name: "Professional" },
    { id: "formal", name: "Formal" },
    { id: "casual", name: "Casual" }
  ];
  
  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "ja-JP", name: "Japanese" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ar-SA", name: "Arabic" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Voice Settings</h2>
          <p className="text-muted-foreground">
            Configure text-to-speech and speech-to-text options for your chatbot
          </p>
        </div>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </div>
      
      <Tabs defaultValue="tts">
        <TabsList className="mb-4">
          <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
          <TabsTrigger value="stt">Speech-to-Text</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Text-to-Speech</CardTitle>
                  <CardDescription>
                    Configure how your chatbot speaks to users
                  </CardDescription>
                </div>
                <Switch 
                  checked={voiceEnabled} 
                  onCheckedChange={setVoiceEnabled}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Volume2 className={`h-5 w-5 ${voiceEnabled ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`font-medium ${voiceEnabled ? '' : 'text-gray-400'}`}>
                  Voice output is {voiceEnabled ? 'enabled' : 'disabled'}
                </span>
              </div>
              
              <div className={voiceEnabled ? '' : 'opacity-50 pointer-events-none'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voice-type">Voice Type</Label>
                      <Select 
                        value={voiceType}
                        onValueChange={setVoiceType}
                        disabled={!voiceEnabled}
                      >
                        <SelectTrigger id="voice-type">
                          <SelectValue placeholder="Select voice type" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.id} value={voice.id}>
                              {voice.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-language">Voice Language</Label>
                      <Select 
                        value={voiceLanguage}
                        onValueChange={setVoiceLanguage}
                        disabled={!voiceEnabled}
                      >
                        <SelectTrigger id="voice-language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language.code} value={language.code}>
                              {language.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="voice-preview">Voice Preview</Label>
                        <Button
                          size="sm"
                          onClick={handleTestVoice}
                          disabled={!voiceEnabled}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Test Voice
                        </Button>
                      </div>
                      <Input
                        id="voice-preview"
                        placeholder="Enter text to preview voice"
                        defaultValue="Hello, I'm your AI assistant. How can I help you today?"
                        disabled={!voiceEnabled}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="speaking-rate">Speaking Rate</Label>
                          <span className="text-sm text-gray-500">{speakingRate[0].toFixed(1)}x</span>
                        </div>
                        <Slider
                          id="speaking-rate"
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          value={speakingRate}
                          onValueChange={setSpeakingRate}
                          disabled={!voiceEnabled}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Slower</span>
                          <span>Faster</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="voice-pitch">Voice Pitch</Label>
                          <span className="text-sm text-gray-500">{voicePitch[0].toFixed(1)}</span>
                        </div>
                        <Slider
                          id="voice-pitch"
                          min={0.5}
                          max={1.5}
                          step={0.1}
                          value={voicePitch}
                          onValueChange={setVoicePitch}
                          disabled={!voiceEnabled}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Lower</span>
                          <span>Higher</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="voice-volume">Volume</Label>
                          <span className="text-sm text-gray-500">{Math.round(voiceVolume[0] * 100)}%</span>
                        </div>
                        <Slider
                          id="voice-volume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={voiceVolume}
                          onValueChange={setVoiceVolume}
                          disabled={!voiceEnabled}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Quieter</span>
                          <span>Louder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Auto-Response Settings</CardTitle>
              <CardDescription>
                Configure when and how the voice responds automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Automatic Welcome Message</Label>
                  <p className="text-sm text-gray-500">
                    Play a welcome message when chat is first opened
                  </p>
                </div>
                <Switch defaultChecked disabled={!voiceEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Read All Responses</Label>
                  <p className="text-sm text-gray-500">
                    Automatically read all chatbot responses aloud
                  </p>
                </div>
                <Switch disabled={!voiceEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>User-Controlled Audio</Label>
                  <p className="text-sm text-gray-500">
                    Allow users to toggle voice on/off
                  </p>
                </div>
                <Switch defaultChecked disabled={!voiceEnabled} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stt" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Speech-to-Text</CardTitle>
                  <CardDescription>
                    Configure how users can speak to your chatbot
                  </CardDescription>
                </div>
                <Switch 
                  checked={speechToTextEnabled} 
                  onCheckedChange={setSpeechToTextEnabled}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Mic className={`h-5 w-5 ${speechToTextEnabled ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`font-medium ${speechToTextEnabled ? '' : 'text-gray-400'}`}>
                  Voice input is {speechToTextEnabled ? 'enabled' : 'disabled'}
                </span>
              </div>
              
              <div className={speechToTextEnabled ? '' : 'opacity-50 pointer-events-none'}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stt-language">Primary Recognition Language</Label>
                    <Select 
                      defaultValue="en-US"
                      disabled={!speechToTextEnabled}
                    >
                      <SelectTrigger id="stt-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="auto-language-detection">Auto Language Detection</Label>
                      <p className="text-sm text-gray-500">
                        Automatically detect the language being spoken
                      </p>
                    </div>
                    <Switch 
                      id="auto-language-detection" 
                      defaultChecked
                      disabled={!speechToTextEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="continuous-listening">Continuous Listening</Label>
                      <p className="text-sm text-gray-500">
                        Keep microphone active between messages
                      </p>
                    </div>
                    <Switch 
                      id="continuous-listening"
                      disabled={!speechToTextEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="profanity-filter">Profanity Filter</Label>
                      <p className="text-sm text-gray-500">
                        Filter inappropriate language from voice input
                      </p>
                    </div>
                    <Switch 
                      id="profanity-filter" 
                      defaultChecked
                      disabled={!speechToTextEnabled}
                    />
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center">
                      <Wand2 className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Advanced Recognition</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 mb-3">
                      Enable these features for improved voice recognition
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="noise-suppression">Noise Suppression</Label>
                        <Switch 
                          id="noise-suppression" 
                          defaultChecked
                          disabled={!speechToTextEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="echo-cancellation">Echo Cancellation</Label>
                        <Switch 
                          id="echo-cancellation" 
                          defaultChecked
                          disabled={!speechToTextEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-gain">Auto Gain Control</Label>
                        <Switch 
                          id="auto-gain"
                          defaultChecked
                          disabled={!speechToTextEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Voice Commands</CardTitle>
              <CardDescription>
                Configure special voice commands users can speak to control the chatbot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Voice Commands</Label>
                  <p className="text-sm text-gray-500">
                    Allow users to control the chatbot with voice commands
                  </p>
                </div>
                <Switch defaultChecked disabled={!speechToTextEnabled} />
              </div>
              
              <div className="border rounded-lg divide-y">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Clear Chat</p>
                    <p className="text-sm text-gray-500">Command: "Clear the conversation"</p>
                  </div>
                  <Switch defaultChecked disabled={!speechToTextEnabled} />
                </div>
                
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Repeat Last Message</p>
                    <p className="text-sm text-gray-500">Command: "Repeat that"</p>
                  </div>
                  <Switch defaultChecked disabled={!speechToTextEnabled} />
                </div>
                
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Change Topic</p>
                    <p className="text-sm text-gray-500">Command: "Let's talk about [topic]"</p>
                  </div>
                  <Switch defaultChecked disabled={!speechToTextEnabled} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled={!speechToTextEnabled}>
                Add Custom Command
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default VoiceSettings;
