
import { knowledgeBase } from "./knowledgeBase";

export const generateResponse = (userInput: string, botName: string): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check for pricing related queries
  if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("price") || 
      lowercaseInput.includes("plan") || lowercaseInput.includes("subscription")) {
    let response = "We offer the following plans:\n\n";
    
    knowledgeBase.pricing.forEach(plan => {
      response += `• ${plan.plan}: ${plan.price}${plan.period ? '/' + plan.period : ''}\n`;
      response += `  Top features: ${plan.features.slice(0, 2).join(", ")}\n\n`;
    });
    
    response += "Would you like more details about a specific plan?";
    return response;
  }
  
  // Check for feature related queries
  if (lowercaseInput.includes("feature") || lowercaseInput.includes("capability") || 
      lowercaseInput.includes("can you") || lowercaseInput.includes("what can")) {
    let response = "Our platform offers these key features:\n\n";
    
    knowledgeBase.features.slice(0, 4).forEach(feature => {
      response += `• ${feature}\n`;
    });
    
    if (knowledgeBase.features.length > 4) {
      response += "And more! Which feature would you like to learn more about?";
    }
    
    return response;
  }

  // Check for specific feature inquiries
  if (lowercaseInput.includes("whatsapp") || lowercaseInput.includes("facebook") || 
      lowercaseInput.includes("instagram") || lowercaseInput.includes("integration")) {
    return "Our Multi-Platform Integration allows you to connect your chatbot to WhatsApp, Facebook Messenger, Instagram, and your website with seamless integration. This means your customers can reach you on their preferred platform while you manage all conversations from a single dashboard.";
  }
  
  if (lowercaseInput.includes("analytics") || lowercaseInput.includes("dashboard") || 
      lowercaseInput.includes("tracking") || lowercaseInput.includes("report")) {
    return "Our Analytics Dashboard provides comprehensive insights into your chatbot's performance. You can track metrics like conversation volume, resolution rate, popular topics, user satisfaction, and conversion rates. This data helps you optimize your chatbot for better customer engagement and business outcomes.";
  }
  
  // Check for FAQ related queries
  if (lowercaseInput.includes("faq") || lowercaseInput.includes("question") || 
      lowercaseInput.includes("how do i") || lowercaseInput.includes("trial")) {
    // Find a relevant FAQ
    for (const faq of knowledgeBase.faqs) {
      const questionLower = faq.question.toLowerCase();
      if (lowercaseInput.includes(questionLower.substring(0, 5)) || 
          questionLower.includes(lowercaseInput.substring(0, 5))) {
        return faq.answer;
      }
    }
  }
  
  // Greetings
  if (lowercaseInput.match(/hi|hello|hey|greetings/i)) {
    return `Hello there! I'm ${botName}. How can I assist you today?`;
  }
  
  // Help or support
  if (lowercaseInput.includes("help") || lowercaseInput.includes("support")) {
    return "I'm here to help! You can ask me about our products, pricing plans, features, or how to get started. What would you like to know?";
  }
  
  // Default response
  return "I understand you're asking about " + userInput + ". Could you please provide more details so I can give you the most accurate information?";
};
