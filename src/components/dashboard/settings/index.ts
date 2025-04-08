
import GeneralSection from "./GeneralSection";
import AISection from "./AISection";
import ChatInterfaceSection from "./ChatInterfaceSection";
import SecuritySection from "./SecuritySection";
import LeadsSection from "./LeadsSection";
import NotificationsSection from "./NotificationsSection";
import WebhooksSection from "./WebhooksSection";
import LanguageSettings from "./LanguageSettings";
import VoiceSettings from "./VoiceSettings";
import React from "react";

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

// Create a settings map that returns the components as functions
// This avoids using JSX directly in a .ts file
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
