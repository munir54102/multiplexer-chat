import React, { useState, useEffect } from "react";
import { Bot, User, Send, Mic, MicOff, Languages, Settings, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  language?: string;
}

interface MultiLanguageChatDemoProps {
  initialLanguage?: string;
  customizable?: boolean;
  botName?: string;
  primaryColor?: string;
  bubbleStyle?: "rounded" | "square" | "modern";
  voiceEnabled?: boolean;
  showLanguageSelector?: boolean;
}

const MultiLanguageChatDemo = ({
  initialLanguage = "en",
  customizable = false,
  botName = "MultiplexAI Assistant",
  primaryColor = "#2563eb", // blue-600
  bubbleStyle = "rounded",
  voiceEnabled = true,
  showLanguageSelector = true
}: MultiLanguageChatDemoProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Language options for the dropdown
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" }
  ];

  // Get bubble style class based on the bubbleStyle prop
  const getBubbleStyleClass = (sender: "bot" | "user") => {
    const baseClass = `max-w-[80%] p-3 ${sender === 'bot' 
      ? 'bg-gray-100 text-gray-800' 
      : `text-white`}`;
      
    const styles = {
      rounded: `${baseClass} rounded-lg`,
      square: `${baseClass} rounded-sm`,
      modern: `${baseClass} ${sender === 'bot' 
        ? 'rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg' 
        : 'rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-lg'}`
    };
    
    return `${styles[bubbleStyle]} ${sender === 'user' ? 'bg-[' + primaryColor + ']' : ''}`;
  };

  useEffect(() => {
    // Initial welcome message in the selected language
    const welcomeMessages = {
      en: "Hello! How can I help you today?",
      es: "¡Hola! ¿Cómo puedo ayudarte hoy?",
      fr: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      de: "Hallo! Wie kann ich Ihnen heute helfen?",
      it: "Ciao! Come posso aiutarti oggi?",
      pt: "Olá! Como posso ajudá-lo hoje?"
    };
    
    setMessages([{
      id: 1,
      text: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
      sender: "bot",
      language
    }]);
  }, [language]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputText, sender: "user" as const, language };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response based on language after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Sample responses in different languages
      let botResponse = "";
      const lowercaseInput = inputText.toLowerCase();
      
      if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || 
          lowercaseInput.includes("hola") || lowercaseInput.includes("bonjour")) {
        if (language === "en") botResponse = "Hello there! How can I assist you?";
        else if (language === "es") botResponse = "¡Hola! ¿Cómo puedo ayudarte?";
        else if (language === "fr") botResponse = "Bonjour ! Comment puis-je vous aider ?";
        else if (language === "de") botResponse = "Hallo! Wie kann ich Ihnen helfen?";
        else if (language === "it") botResponse = "Ciao! Come posso aiutarti?";
        else if (language === "pt") botResponse = "Olá! Como posso ajudá-lo?";
      }
      else if (lowercaseInput.includes("pricing") || lowercaseInput.includes("price") || 
               lowercaseInput.includes("precio") || lowercaseInput.includes("prix")) {
        if (language === "en") botResponse = "Our pricing starts at $29/month for the Basic plan. We also offer Professional ($79/month) and Enterprise plans.";
        else if (language === "es") botResponse = "Nuestros precios comienzan en $29/mes para el plan Básico. También ofrecemos planes Profesional ($79/mes) y Empresarial.";
        else if (language === "fr") botResponse = "Nos tarifs commencent à 29$/mois pour le forfait Basic. Nous proposons également des forfaits Professional (79$/mois) et Enterprise.";
        else if (language === "de") botResponse = "Unsere Preise beginnen bei 29$/Monat für den Basic-Plan. Wir bieten auch Professional- (79$/Monat) und Enterprise-Pläne an.";
        else if (language === "it") botResponse = "I nostri prezzi partono da $29/mese per il piano Basic. Offriamo anche piani Professional ($79/mese) ed Enterprise.";
        else if (language === "pt") botResponse = "Nossos preços começam em $29/mês para o plano Básico. Também oferecemos planos Professional ($79/mês) e Enterprise.";
      }
      else if (lowercaseInput.includes("features") || lowercaseInput.includes("funciones") || 
               lowercaseInput.includes("fonctionnalités")) {
        if (language === "en") botResponse = "Our platform offers multi-channel support, AI-powered responses, analytics, and customization options.";
        else if (language === "es") botResponse = "Nuestra plataforma ofrece soporte multicanal, respuestas basadas en IA, análisis y opciones de personalización.";
        else if (language === "fr") botResponse = "Notre plateforme offre un support multicanal, des réponses alimentées par l'IA, des analyses et des options de personnalisation.";
        else if (language === "de") botResponse = "Unsere Plattform bietet Multichannel-Support, KI-gestützte Antworten, Analysen und Anpassungsoptionen.";
        else if (language === "it") botResponse = "La nostra piattaforma offre supporto multicanale, risposte basate sull'IA, analisi e opzioni di personalizzazione.";
        else if (language === "pt") botResponse = "Nossa plataforma oferece suporte multicanal, respostas alimentadas por IA, análises e opções de personalização.";
      }
      else {
        // Default response if no matches
        if (language === "en") botResponse = "I understand. How else can I help you today?";
        else if (language === "es") botResponse = "Entiendo. ¿Cómo más puedo ayudarte hoy?";
        else if (language === "fr") botResponse = "Je comprends. Comment puis-je vous aider davantage aujourd'hui ?";
        else if (language === "de") botResponse = "Ich verstehe. Wie kann ich Ihnen heute noch helfen?";
        else if (language === "it") botResponse = "Capisco. Come posso aiutarti ulteriormente oggi?";
        else if (language === "pt") botResponse = "Eu entendo. Como mais posso ajudá-lo hoje?";
      }
      
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: botResponse, 
        sender: "bot",
        language
      }]);
    }, 1500);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    toast({
      title: "Language changed",
      description: `Chat language is now set to ${languages.find(l => l.code === value)?.name}`
    });
  };

  const resetConversation = () => {
    // Reset conversation but keep the language
    const welcomeMessages = {
      en: "Hello! How can I help you today?",
      es: "¡Hola! ¿Cómo puedo ayudarte hoy?",
      fr: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      de: "Hallo! Wie kann ich Ihnen heute helfen?",
      it: "Ciao! Come posso aiutarti oggi?",
      pt: "Olá! Como posso ajudá-lo hoje?"
    };
    
    setMessages([{
      id: 1,
      text: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
      sender: "bot",
      language
    }]);
  };

  const toggleVoiceInput = () => {
    if (!voiceEnabled) {
      toast({
        title: "Voice input disabled",
        description: "Voice input feature is currently disabled"
      });
      return;
    }
    
    if (isListening) {
      setIsListening(false);
      // In a real implementation, we would stop the speech recognition here
    } else {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now. Voice input is active."
      });
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        setInputText("This is a simulated voice input");
      }, 3000);
    }
  };

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white flex flex-col h-[500px]" style={{
      borderColor: customizable ? primaryColor : undefined
    }}>
      <div className="p-4 flex justify-between items-center" style={{
        backgroundColor: customizable ? primaryColor : '#2563eb',
        color: 'white'
      }}>
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-medium">{botName}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {showLanguageSelector && (
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[130px] bg-white/10 border-0 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Button variant="ghost" size="icon" className="text-white" onClick={resetConversation}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={getBubbleStyleClass(message.sender)}>
                <div className="flex items-start">
                  {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />}
                  <p>{message.text}</p>
                  {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0" />}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4 flex gap-2">
        <Input
          placeholder={language === "en" ? "Type your message..." :
                      language === "es" ? "Escribe tu mensaje..." :
                      language === "fr" ? "Tapez votre message..." :
                      language === "de" ? "Schreiben Sie Ihre Nachricht..." :
                      language === "it" ? "Scrivi il tuo messaggio..." :
                      language === "pt" ? "Digite sua mensagem..." :
                      "Type your message..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        
        {voiceEnabled && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleVoiceInput}
            className={isListening ? "bg-red-100" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        )}
        
        <Button onClick={handleSend} style={{
          backgroundColor: customizable ? primaryColor : undefined
        }}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MultiLanguageChatDemo;
