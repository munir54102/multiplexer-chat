
import React from "react";
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
// Using React.createElement instead of JSX in a .ts file
export const settings = {
  "general": React.createElement(GeneralSection),
  "ai": React.createElement(AISection),
  "chat": React.createElement(ChatInterfaceSection),
  "security": React.createElement(SecuritySection),
  "leads": React.createElement(LeadsSection),
  "notifications": React.createElement(NotificationsSection),
  "webhooks": React.createElement(WebhooksSection),
  "language": React.createElement(LanguageSettings),
  "voice": React.createElement(VoiceSettings)
};

// Create a function to get the settings component
export const getSettingsComponent = (section: string) => {
  switch (section) {
    case "general":
      return React.createElement(GeneralSection);
    case "ai":
      return React.createElement(AISection);
    case "chat":
      return React.createElement(ChatInterfaceSection);
    case "security":
      return React.createElement(SecuritySection);
    case "leads":
      return React.createElement(LeadsSection);
    case "notifications":
      return React.createElement(NotificationsSection);
    case "webhooks":
      return React.createElement(WebhooksSection);
    case "language":
      return React.createElement(LanguageSettings);
    case "voice":
      return React.createElement(VoiceSettings);
    default:
      return React.createElement(GeneralSection);
  }
};
