
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SidebarHeaderProps {
  handleCreateChatbot: () => void;
}

const SidebarHeader = ({ handleCreateChatbot }: SidebarHeaderProps) => {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
      } catch (e) {
        setUserName("User");
      }
    }
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Welcome back</p>
          <h3 className="font-semibold">{userName}</h3>
        </div>
      </div>
      <Button 
        className="w-full flex items-center justify-center gap-2" 
        onClick={handleCreateChatbot}
      >
        <Plus size={16} />
        <span>Create Chatbot</span>
      </Button>
    </div>
  );
};

export default SidebarHeader;
