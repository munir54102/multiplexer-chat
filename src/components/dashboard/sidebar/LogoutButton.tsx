
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  handleLogout: () => void;
}

const LogoutButton = ({ handleLogout }: LogoutButtonProps) => {
  return (
    <div className="pt-4 mt-6 border-t border-gray-200">
      <Button 
        variant="ghost" 
        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
