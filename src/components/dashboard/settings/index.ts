
import GeneralSection from "./GeneralSection";
import AISection from "./AISection";
import ChatInterfaceSection from "./ChatInterfaceSection";
import SecuritySection from "./SecuritySection";
import LeadsSection from "./LeadsSection";
import NotificationsSection from "./NotificationsSection";
import WebhooksSection from "./WebhooksSection";
import LanguageSettings from "./LanguageSettings";
import VoiceSettings from "./VoiceSettings";

// Export individual components
export {
  GeneralSection,
  AISection,
  ChatInterfaceSection,
  SecuritySection,
  LeadsSection,
  NotificationsSection,
  WebhooksSection
};

// Create a settings map for tab navigation
export const settings = {
  "general": <GeneralSection />,
  "ai": <AISection />,
  "chat": <ChatInterfaceSection />,
  "security": <SecuritySection />,
  "leads": <LeadsSection />,
  "notifications": <NotificationsSection />,
  "webhooks": <WebhooksSection />,
  "language": <LanguageSettings />,
  "voice": <VoiceSettings />
};
