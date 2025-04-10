
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GettingStartedBannerProps {
  isNewUser: boolean;
  handleNav: (id: string) => void;
}

const GettingStartedBanner = ({ isNewUser, handleNav }: GettingStartedBannerProps) => {
  if (!isNewUser) return null;
  
  return (
    <div className="p-3 mb-6 bg-primary/10 border border-primary/30 rounded-lg">
      <h3 className="text-sm font-medium text-primary mb-2">Getting Started</h3>
      <p className="text-xs text-gray-600 mb-2">Follow these steps to create your first AI chatbot:</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full flex items-center justify-center gap-1 border-primary/40 text-primary"
        onClick={() => handleNav('create')}
      >
        <Rocket size={14} />
        <span>Start Building</span>
      </Button>
    </div>
  );
};

export default GettingStartedBanner;
