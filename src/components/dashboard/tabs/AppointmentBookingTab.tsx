
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CalendarRange, CalendarClock, Clock, Settings, User, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AppointmentSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  description: string;
  isActive: boolean;
}

const AppointmentBookingTab = () => {
  const { toast } = useToast();
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([
    {
      id: "1",
      name: "Sales Consultation",
      duration: 30,
      description: "Initial sales call to discuss your business needs",
      isActive: true
    },
    {
      id: "2",
      name: "Product Demo",
      duration: 45,
      description: "Live demonstration of our product features",
      isActive: true
    }
  ]);
  
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([
    { id: "1", day: "Monday", startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "2", day: "Tuesday", startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "3", day: "Wednesday", startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "4", day: "Thursday", startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "5", day: "Friday", startTime: "09:00", endTime: "17:00", isActive: true }
  ]);
  
  const [newAppointmentType, setNewAppointmentType] = useState<Omit<AppointmentType, "id" | "isActive">>({
    name: "",
    duration: 30,
    description: ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [bufferTime, setBufferTime] = useState(15);
  
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const handleAddAppointmentType = () => {
    if (!newAppointmentType.name) {
      toast({
        title: "Name required",
        description: "Please provide a name for the appointment type",
        variant: "destructive"
      });
      return;
    }
    
    const newType: AppointmentType = {
      id: Date.now().toString(),
      ...newAppointmentType,
      isActive: true
    };
    
    setAppointmentTypes([...appointmentTypes, newType]);
    setNewAppointmentType({
      name: "",
      duration: 30,
      description: ""
    });
    
    toast({
      title: "Appointment type added",
      description: `${newType.name} has been added successfully`
    });
  };
  
  const toggleAppointmentTypeStatus = (id: string) => {
    setAppointmentTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, isActive: !type.isActive } : type
      )
    );
    
    const type = appointmentTypes.find(t => t.id === id);
    const newStatus = type?.isActive ? "disabled" : "enabled";
    
    toast({
      title: `Appointment type ${newStatus}`,
      description: `${type?.name} has been ${newStatus}`
    });
  };
  
  const toggleAvailabilitySlot = (id: string) => {
    setAvailableSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    );
  };
  
  const handleUpdateSlotTime = (id: string, field: "startTime" | "endTime", value: string) => {
    setAvailableSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your appointment booking settings have been updated"
      });
    }, 1000);
  };
  
  const handleEnableBooking = (enabled: boolean) => {
    setIsEnabled(enabled);
    
    toast({
      title: enabled ? "Booking enabled" : "Booking disabled",
      description: enabled 
        ? "Customers can now book appointments through your chatbot" 
        : "Appointment booking has been disabled"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Appointment Booking</h2>
          <p className="text-gray-600">Configure your chatbot to schedule appointments with customers</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="booking-enabled" 
            checked={isEnabled}
            onCheckedChange={handleEnableBooking}
          />
          <Label htmlFor="booking-enabled">
            {isEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>
      
      <Tabs defaultValue="appointment-types">
        <TabsList className="mb-6">
          <TabsTrigger value="appointment-types">
            <CalendarClock className="h-4 w-4 mr-2" />
            Appointment Types
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Clock className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointment-types" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Appointment Type</CardTitle>
              <CardDescription>
                Create different types of appointments that customers can book
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type-name">Name</Label>
                <Input
                  id="type-name"
                  placeholder="e.g., Sales Consultation"
                  value={newAppointmentType.name}
                  onChange={(e) => setNewAppointmentType(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type-duration">Duration (minutes)</Label>
                <Input
                  id="type-duration"
                  type="number"
                  min="5"
                  step="5"
                  value={newAppointmentType.duration}
                  onChange={(e) => setNewAppointmentType(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type-description">Description</Label>
                <Textarea
                  id="type-description"
                  placeholder="Describe what this appointment is for"
                  value={newAppointmentType.description}
                  onChange={(e) => setNewAppointmentType(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <Button onClick={handleAddAppointmentType}>
                Add Appointment Type
              </Button>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Existing Appointment Types</h3>
            
            {appointmentTypes.length > 0 ? (
              appointmentTypes.map(type => (
                <Card key={type.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium flex items-center">
                          {type.name}
                          {!type.isActive && (
                            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              Disabled
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">{type.description}</p>
                        <p className="text-sm font-medium">{type.duration} minutes</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAppointmentTypeStatus(type.id)}
                        >
                          {type.isActive ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No appointment types added yet</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Availability</CardTitle>
              <CardDescription>
                Set your working hours for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekdays.map(day => {
                  const slot = availableSlots.find(s => s.day === day);
                  const isActive = slot?.isActive || false;
                  
                  return (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-24">
                        <p className="font-medium">{day}</p>
                      </div>
                      
                      <Switch
                        checked={isActive}
                        onCheckedChange={() => {
                          if (slot) {
                            toggleAvailabilitySlot(slot.id);
                          } else {
                            // Create new slot if it doesn't exist
                            const newSlot: AppointmentSlot = {
                              id: Date.now().toString(),
                              day,
                              startTime: "09:00",
                              endTime: "17:00",
                              isActive: true
                            };
                            setAvailableSlots(prev => [...prev, newSlot]);
                          }
                        }}
                      />
                      
                      {slot && isActive && (
                        <div className="flex flex-1 items-center space-x-2">
                          <Input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => handleUpdateSlotTime(slot.id, "startTime", e.target.value)}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => handleUpdateSlotTime(slot.id, "endTime", e.target.value)}
                            className="w-32"
                          />
                        </div>
                      )}
                      
                      {(!slot || !isActive) && (
                        <p className="text-gray-500">Not available</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              Save Availability
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>
                Configure additional settings for your appointment booking system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="buffer-time">Buffer Time Between Appointments (minutes)</Label>
                <Input
                  id="buffer-time"
                  type="number"
                  min="0"
                  step="5"
                  value={bufferTime}
                  onChange={(e) => setBufferTime(parseInt(e.target.value) || 0)}
                  className="max-w-xs"
                />
                <p className="text-xs text-gray-500">
                  Add padding between appointments to give you time to prepare
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="confirmation-emails" defaultChecked />
                  <Label htmlFor="confirmation-emails">Send confirmation emails</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="reminder-emails" defaultChecked />
                  <Label htmlFor="reminder-emails">Send reminder emails</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="calendar-invite" defaultChecked />
                  <Label htmlFor="calendar-invite">Include calendar invites</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="collect-phone" defaultChecked />
                  <Label htmlFor="collect-phone">Collect phone number</Label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentBookingTab;
