
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <div className="flex-1 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      {children}
    </div>
  );
};

export default DashboardContent;
