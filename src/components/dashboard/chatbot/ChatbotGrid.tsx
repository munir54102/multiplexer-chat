
import { Chatbot } from "./ChatbotCard";
import ChatbotCard from "./ChatbotCard";

interface ChatbotGridProps {
  chatbots: Chatbot[];
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  setActiveTab: (tab: string) => void;
  onStartTutorial: () => void;
}

const ChatbotGrid = ({ 
  chatbots, 
  onToggleStatus, 
  onDelete, 
  onDuplicate, 
  setActiveTab,
  onStartTutorial 
}: ChatbotGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chatbots.map((chatbot) => (
        <ChatbotCard 
          key={chatbot.id}
          chatbot={chatbot}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          setActiveTab={setActiveTab}
          onStartTutorial={onStartTutorial}
        />
      ))}
    </div>
  );
};

export default ChatbotGrid;
