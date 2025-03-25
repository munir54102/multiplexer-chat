
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <div className="flex-1 p-6">
      {children}
    </div>
  );
};

export default DashboardContent;
