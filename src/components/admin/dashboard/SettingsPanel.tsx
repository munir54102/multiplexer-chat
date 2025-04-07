
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>Manage your admin account and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input id="admin-email" defaultValue="admin@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Change Password</Label>
            <Input id="admin-password" type="password" placeholder="••••••••" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New user registrations</h4>
              <p className="text-sm text-gray-500">Get notified when a new user signs up</p>
            </div>
            <div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Failed payments</h4>
              <p className="text-sm text-gray-500">Get notified when a payment fails</p>
            </div>
            <div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New support messages</h4>
              <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
            </div>
            <div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
