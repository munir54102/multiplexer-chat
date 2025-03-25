
import { ReactNode } from "react";

interface PlatformCardProps {
  icon: ReactNode;
  name: string;
  description: string;
  delay?: number;
}

export default function PlatformCard({ icon, name, description, delay = 0 }: PlatformCardProps) {
  return (
    <div 
      className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
