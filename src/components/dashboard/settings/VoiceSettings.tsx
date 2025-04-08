
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Volume2, Play, Pause, VolumeX, Languages, Settings, BarChart, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VoiceSettings = () => {
  const { toast } = useToast();
  const [enableVoiceInput, setEnableVoiceInput] = useState(true);
  const [enableVoiceOutput, setEnableVoiceOutput] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState("en-US-Standard-F");
  const [volume, setVolume] = useState([80]);
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Sample voice options
  const voices = [
    { id: "en-US-Standard-F", name: "Emma (Female)", language: "English (US)" },
    { id: "en-US-Standard-M", name: "Michael (Male)", language: "English (US)" },
    { id: "en-GB-Standard-F", name: "Sophia (Female)", language: "English (UK)" },
    { id: "en-GB-Standard-M", name: "William (Male)", language: "English (UK)" },
    { id: "fr-FR-Standard-F", name: "Celine (Female)", language: "French" },
    { id: "de-DE-Standard-F", name: "Greta (Female)", language: "German" },
    { id: "es-ES-Standard-F", name: "Maria (Female)", language: "Spanish" },
    { id: "it-IT-Standard-F", name: "Sofia (Female)", language: "Italian" },
    { id: "ja-JP-Standard-F", name: "Yuki (Female)", language: "Japanese" },
  ];
  
  const handlePlayDemo = () => {
    setIsPlaying(true);
    
    // Simulate voice playback
    toast({
      title: "Playing Voice Demo",
      description: "This is a sample of the selected voice."
    });
    
    // Simulate playback completion after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Voice Settings Saved",
      description: "Your voice preferences have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Voice Settings</h2>
          <p className="text-sm text-muted-foreground">Configure voice input and output for your chatbot</p>
        </div>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="voice-selection">Voice Selection</TabsTrigger>
          <TabsTrigger value="speech-recognition">Speech Recognition</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Capabilities</CardTitle>
              <CardDescription>
                Enable or disable voice features for your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-input">Voice Input</Label>
                  <p className="text-xs text-gray-500">
                    Allow users to speak to your chatbot instead of typing
                  </p>
                </div>
                <Switch 
                  id="voice-input" 
                  checked={enableVoiceInput} 
                  onCheckedChange={setEnableVoiceInput} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-output">Voice Output</Label>
                  <p className="text-xs text-gray-500">
                    Allow your chatbot to speak responses out loud
                  </p>
                </div>
                <Switch 
                  id="voice-output" 
                  checked={enableVoiceOutput} 
                  onCheckedChange={setEnableVoiceOutput} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-play">Auto-play Voice Responses</Label>
                  <p className="text-xs text-gray-500">
                    Automatically speak responses without user prompt
                  </p>
                </div>
                <Switch 
                  id="auto-play" 
                  defaultChecked={false}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-commands">Enable Voice Commands</Label>
                  <p className="text-xs text-gray-500">
                    Allow users to control the chatbot with voice commands
                  </p>
                </div>
                <Switch 
                  id="voice-commands" 
                  defaultChecked={true}
                />
              </div>
            </CardContent>
          </Card>
          
          {enableVoiceOutput && (
            <Card>
              <CardHeader>
                <CardTitle>Default Voice Settings</CardTitle>
                <CardDescription>
                  Configure how your chatbot sounds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Voice Selection</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name} - {voice.language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Volume</Label>
                      <span className="text-sm">{volume}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <VolumeX className="h-4 w-4 text-gray-500" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Speech Rate</Label>
                      <span className="text-sm">{rate}x</span>
                    </div>
                    <Slider
                      value={rate}
                      onValueChange={setRate}
                      min={0.5}
                      max={2}
                      step={0.1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Pitch</Label>
                      <span className="text-sm">{pitch}</span>
                    </div>
                    <Slider
                      value={pitch}
                      onValueChange={setPitch}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handlePlayDemo}
                    disabled={isPlaying}
                    className="w-full"
                  >
                    {isPlaying ? (
                      <><Pause className="h-4 w-4 mr-2" /> Playing Demo...</>
                    ) : (
                      <><Play className="h-4 w-4 mr-2" /> Test Voice</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="voice-selection" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Selection</CardTitle>
              <CardDescription>
                Choose from different voices for your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {voices.map(voice => (
                  <div 
                    key={voice.id} 
                    className={`p-4 rounded-lg border flex items-center justify-between ${
                      selectedVoice === voice.id ? "bg-primary/5 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Volume2 className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-sm text-gray-500">{voice.language}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handlePlayDemo}
                      >
                        <Play className="h-4 w-4 mr-1" /> Preview
                      </Button>
                      
                      <Button 
                        variant={selectedVoice === voice.id ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        {selectedVoice === voice.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="speech-recognition" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Speech Recognition</CardTitle>
              <CardDescription>
                Configure how your chatbot recognizes and processes speech input
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Speech Recognition Engine</Label>
                  <p className="text-xs text-gray-500">
                    Select which speech recognition technology to use
                  </p>
                </div>
                <Select defaultValue="webSpeech">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select engine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webSpeech">Web Speech API</SelectItem>
                    <SelectItem value="googleCloud">Google Cloud Speech</SelectItem>
                    <SelectItem value="azure">Azure Speech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="continuous-listening">Continuous Listening</Label>
                  <p className="text-xs text-gray-500">
                    Keep listening for speech input without requiring manual activation
                  </p>
                </div>
                <Switch 
                  id="continuous-listening" 
                  defaultChecked={false}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recognition Languages</Label>
                  <p className="text-xs text-gray-500">
                    Languages the speech recognition system should understand
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Languages className="h-4 w-4 mr-1" /> Configure Languages
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="interim-results">Show Interim Results</Label>
                  <p className="text-xs text-gray-500">
                    Display speech recognition results as they are being processed
                  </p>
                </div>
                <Switch 
                  id="interim-results" 
                  defaultChecked={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Fine-tune voice capabilities for your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audio Format</Label>
                  <p className="text-xs text-gray-500">
                    Choose the audio format for voice output
                  </p>
                </div>
                <Select defaultValue="mp3">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                    <SelectItem value="ogg">OGG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audio Quality</Label>
                  <p className="text-xs text-gray-500">
                    Set the quality level for voice output
                  </p>
                </div>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (24kbps)</SelectItem>
                    <SelectItem value="medium">Medium (48kbps)</SelectItem>
                    <SelectItem value="high">High (96kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-voices">Cache Voice Responses</Label>
                  <p className="text-xs text-gray-500">
                    Store frequently used voice responses to improve performance
                  </p>
                </div>
                <Switch 
                  id="cache-voices" 
                  defaultChecked={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audio-effects">Use Audio Effects</Label>
                  <p className="text-xs text-gray-500">
                    Apply audio effects like background sounds and transitions
                  </p>
                </div>
                <Switch 
                  id="audio-effects" 
                  defaultChecked={false}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Service Provider</Label>
                  <p className="text-xs text-gray-500">
                    Select which third-party service to use for voice synthesis
                  </p>
                </div>
                <Select defaultValue="elevenlabs">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                    <SelectItem value="googleCloud">Google Cloud TTS</SelectItem>
                    <SelectItem value="amazon">Amazon Polly</SelectItem>
                    <SelectItem value="azure">Azure TTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Configure API settings for voice services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>API Key (ElevenLabs)</Label>
                  <div className="flex mt-1">
                    <input 
                      type="password" 
                      className="flex-1 px-3 py-2 border rounded-l-md bg-gray-50" 
                      value="••••••••••••••••••••••••" 
                      disabled 
                    />
                    <Button variant="outline" className="rounded-l-none">
                      Update Key
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Your API key is encrypted and securely stored
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced API Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Voice Settings</Button>
      </div>
    </div>
  );
};

export default VoiceSettings;
