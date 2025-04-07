
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MarketingPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing Campaigns</CardTitle>
          <CardDescription>Plan and manage email campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">Marketing dashboard coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPanel;
