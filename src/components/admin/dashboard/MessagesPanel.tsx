
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MessagesPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>Recent support inquiries from users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">Message dashboard coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPanel;
