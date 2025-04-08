
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, UserPlus, Settings, Shield, Clock, MessageSquare, Bot, 
  Mail, X, Check, Search, ChevronDown, MoreHorizontal 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    avatar: "/avatar-1.jpg",
    status: "active",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Editor",
    avatar: "/avatar-2.jpg",
    status: "active",
    lastActivity: "5 hours ago"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Viewer",
    avatar: "/avatar-3.jpg",
    status: "inactive",
    lastActivity: "2 days ago"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Editor",
    avatar: "/avatar-4.jpg",
    status: "active",
    lastActivity: "Just now"
  }
];

// Sample activity data
const teamActivities = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "updated the chatbot settings",
    time: "2 hours ago",
    avatar: "/avatar-1.jpg"
  },
  {
    id: 2,
    user: "Sarah Williams",
    action: "added new knowledge base content",
    time: "5 hours ago",
    avatar: "/avatar-2.jpg"
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "created a new A/B test",
    time: "Yesterday at 4:30 PM",
    avatar: "/avatar-4.jpg"
  },
  {
    id: 4,
    user: "System",
    action: "automatically updated language translations",
    time: "Yesterday at 2:15 PM",
    avatar: ""
  },
  {
    id: 5,
    user: "Alex Johnson",
    action: "connected WhatsApp integration",
    time: "2 days ago",
    avatar: "/avatar-1.jpg"
  }
];

const TeamCollaborationTab = () => {
  const { toast } = useToast();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInvite = () => {
    if (!inviteEmail.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address"
      });
      return;
    }
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
    
    setInviteDialogOpen(false);
    setInviteEmail("");
    setInviteRole("editor");
  };
  
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Collaboration</h2>
          <p className="text-muted-foreground">
            Manage team members and collaboration settings
          </p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </div>
      
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Members</CardTitle>
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-medium text-sm text-gray-500">User</th>
                      <th className="text-left p-3 font-medium text-sm text-gray-500">Role</th>
                      <th className="text-left p-3 font-medium text-sm text-gray-500">Status</th>
                      <th className="text-left p-3 font-medium text-sm text-gray-500">Last Activity</th>
                      <th className="text-right p-3 font-medium text-sm text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(member.role)}`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="capitalize">{member.status}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-500">{member.lastActivity}</td>
                        <td className="p-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Role</DropdownMenuItem>
                              <DropdownMenuItem>View Activity</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Total Members</span>
                    </div>
                    <span className="font-medium">{teamMembers.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Admins</span>
                    </div>
                    <span className="font-medium">{teamMembers.filter(m => m.role === 'Admin').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Chatbots Created</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-medium">Team Plan</div>
                    <div className="text-sm text-gray-500">$79/month</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Members Used</span>
                    <span className="font-medium">{teamMembers.length} / 10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Chatbot Slots</span>
                    <span className="font-medium">3 / 5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upgrade Plan
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Mail className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No pending invitations</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setInviteDialogOpen(true)}>
                  Invite Team Members
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>
                Recent actions taken by team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar>
                      {activity.avatar ? (
                        <AvatarImage src={activity.avatar} alt={activity.user} />
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure what each role can access and edit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin">
                <TabsList className="mb-4">
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="viewer">Viewer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="admin" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Admin Role Permissions</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Admins have full access to all features and can manage team members.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        "Manage team members and roles",
                        "Create and delete chatbots",
                        "Configure all chatbot settings",
                        "Access analytics and reports",
                        "Manage billing and subscription",
                        "Configure integrations and API keys",
                        "Manage knowledge base and sources"
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="editor" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Editor Role Permissions</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Editors can modify chatbots but cannot manage team members or billing.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        "Create chatbots",
                        "Edit chatbot settings",
                        "Access analytics and reports",
                        "Create and edit knowledge base",
                        "Run A/B tests",
                        "Configure integrations (with approval)"
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{permission}</span>
                        </div>
                      ))}
                      
                      {[
                        "Manage team members",
                        "Delete chatbots",
                        "Manage billing and subscription"
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <X className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-gray-500">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="viewer" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Viewer Role Permissions</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Viewers can see but not modify chatbots or settings.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        "View chatbots",
                        "View analytics and reports",
                        "View knowledge base",
                        "Access documentation"
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{permission}</span>
                        </div>
                      ))}
                      
                      {[
                        "Create or edit chatbots",
                        "Modify settings",
                        "Manage team members",
                        "Manage knowledge base",
                        "Configure integrations",
                        "Run A/B tests"
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <X className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-gray-500">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>
                Configure collaboration settings for your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Approval Required for Publishing</Label>
                  <p className="text-sm text-gray-500">
                    Require admin approval before changes go live
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send email notifications for important changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Activity Logging</Label>
                  <p className="text-sm text-gray-500">
                    Track all user actions for audit purposes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Chat Collaboration</Label>
                  <p className="text-sm text-gray-500">
                    Enable team chat for real-time collaboration
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Invite Team Member Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Add new members to collaborate on your chatbots.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {inviteRole === "admin" 
                  ? "Admins have full access to all features and settings." 
                  : inviteRole === "editor" 
                  ? "Editors can create and modify chatbots but cannot manage team members." 
                  : "Viewers can only view chatbots and analytics, not make changes."}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamCollaborationTab;
