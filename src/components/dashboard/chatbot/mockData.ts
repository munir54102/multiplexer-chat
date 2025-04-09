
import { Chatbot } from "./ChatbotCard";

// Mock data for chatbots
export const initialChatbots: Chatbot[] = [
  {
    id: 1,
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    type: "customer-support",
    status: "active",
    lastModified: "2 hours ago",
    messagesCount: 2543,
    integrationsCount: 3,
    progress: 100
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Helps with product recommendations and sales",
    type: "sales",
    status: "active",
    lastModified: "1 day ago",
    messagesCount: 1283,
    integrationsCount: 2,
    progress: 80
  },
  {
    id: 3,
    name: "Marketing Bot",
    description: "Captures leads from marketing campaigns",
    type: "marketing",
    status: "inactive",
    lastModified: "1 week ago",
    messagesCount: 763,
    integrationsCount: 1,
    progress: 40
  }
];
