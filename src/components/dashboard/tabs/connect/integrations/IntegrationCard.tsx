
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IntegrationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  status?: string;
  statusColor?: "green" | "blue" | "gray";
  buttonText: string;
}

const IntegrationCard = ({
  icon,
  title,
  description,
  status,
  statusColor = "gray",
  buttonText,
}: IntegrationCardProps) => {
  const getStatusClasses = () => {
    switch (statusColor) {
      case "green":
        return "bg-green-50 text-green-700 border-green-200";
      case "blue":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {icon}
          <h4 className="font-medium">{title}</h4>
        </div>
        {status && (
          <Badge variant="outline" className={getStatusClasses()}>
            {status}
          </Badge>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <Button variant="outline" size="sm" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
};

export default IntegrationCard;
