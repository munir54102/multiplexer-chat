
import AISection from "./AISection";
import AppearanceCustomization from "./AppearanceCustomization";
import ChatInterfaceSection from "./ChatInterfaceSection";
import DiscountSection from "./DiscountSection";
import GeneralSection from "./GeneralSection";
import LanguageSettings from "./LanguageSettings";
import LeadsSection from "./LeadsSection";
import NotificationsSection from "./NotificationsSection";
import PaymentSection from "./PaymentSection";
import SecuritySection from "./SecuritySection";
import VoiceSettings from "./VoiceSettings";
import WebhooksSection from "./WebhooksSection";

export const getSettingsComponent = (section: string) => {
  switch (section) {
    case "general":
      return <GeneralSection />;
    case "ai":
      return <AISection />;
    case "chat":
      return <ChatInterfaceSection />;
    case "security":
      return <SecuritySection />;
    case "leads":
      return <LeadsSection />;
    case "notifications":
      return <NotificationsSection />;
    case "webhooks":
      return <WebhooksSection />;
    case "appearance":
      return <AppearanceCustomization />;
    case "voice":
      return <VoiceSettings />;
    case "language":
      return <LanguageSettings />;
    case "discounts":
      return <DiscountSection />;
    case "payment":
      return <PaymentSection />;
    default:
      return <GeneralSection />;
  }
};
