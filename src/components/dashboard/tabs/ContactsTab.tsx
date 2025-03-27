
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, UserPlus, Search, Mail, Phone, Trash2, Edit, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: Date;
}

const ContactsTab = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  
  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: ""
    });
  };
  
  // Handle form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Add a new contact
  const handleAddContact = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    const newContact: Contact = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      createdAt: new Date()
    };
    
    setContacts([...contacts, newContact]);
    resetFormData();
    setIsAddContactOpen(false);
    
    toast({
      title: "Success",
      description: "Contact added successfully"
    });
  };
  
  // Edit contact
  const handleEditContact = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }
    
    setContacts(contacts.map(contact => 
      contact.id === selectedContactId 
        ? { 
            ...contact, 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company
          } 
        : contact
    ));
    
    resetFormData();
    setIsEditDialogOpen(false);
    setSelectedContactId(null);
    
    toast({
      title: "Success",
      description: "Contact updated successfully"
    });
  };
  
  // Delete contact
  const handleDeleteContact = () => {
    setContacts(contacts.filter(contact => contact.id !== selectedContactId));
    setIsDeleteDialogOpen(false);
    setSelectedContactId(null);
    
    toast({
      title: "Success",
      description: "Contact deleted successfully"
    });
  };
  
  // Start editing a contact
  const startEditContact = (contact: Contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      company: contact.company || ""
    });
    setSelectedContactId(contact.id);
    setIsEditDialogOpen(true);
  };
  
  // Start deleting a contact
  const startDeleteContact = (id: string) => {
    setSelectedContactId(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Import contacts from CSV
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const lines = csvData.split('\n');
      
      // Assuming first line is header: name,email,phone,company
      const header = lines[0].split(',');
      
      const nameIndex = header.findIndex(h => h.toLowerCase().includes('name'));
      const emailIndex = header.findIndex(h => h.toLowerCase().includes('email'));
      const phoneIndex = header.findIndex(h => h.toLowerCase().includes('phone'));
      const companyIndex = header.findIndex(h => h.toLowerCase().includes('company'));
      
      if (nameIndex === -1 || emailIndex === -1) {
        toast({
          title: "Error",
          description: "CSV must contain at least 'name' and 'email' columns",
          variant: "destructive"
        });
        return;
      }
      
      const importedContacts: Contact[] = [];
      
      // Skip header (i=1)
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const name = values[nameIndex]?.trim();
        const email = values[emailIndex]?.trim();
        
        if (name && email) {
          importedContacts.push({
            id: Date.now().toString() + i,
            name,
            email,
            phone: phoneIndex !== -1 ? values[phoneIndex]?.trim() : undefined,
            company: companyIndex !== -1 ? values[companyIndex]?.trim() : undefined,
            createdAt: new Date()
          });
        }
      }
      
      if (importedContacts.length > 0) {
        setContacts([...contacts, ...importedContacts]);
        setIsImportDialogOpen(false);
        
        toast({
          title: "Success",
          description: `Imported ${importedContacts.length} contacts successfully`
        });
      } else {
        toast({
          title: "Error",
          description: "No valid contacts found in CSV",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };
  
  // Export contacts to CSV
  const handleExportContacts = () => {
    if (contacts.length === 0) {
      toast({
        title: "Error",
        description: "No contacts to export",
        variant: "destructive"
      });
      return;
    }
    
    const header = "Name,Email,Phone,Company\n";
    const csvContent = contacts.reduce((acc, contact) => {
      return acc + `${contact.name},${contact.email},${contact.phone || ""},${contact.company || ""}\n`;
    }, header);
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contacts-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    
    toast({
      title: "Success",
      description: `Exported ${contacts.length} contacts successfully`
    });
  };
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      (contact.phone && contact.phone.includes(query)) ||
      (contact.company && contact.company.toLowerCase().includes(query))
    );
  });
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportContacts}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" /> Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Add a new contact to your contacts list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>Cancel</Button>
                <Button onClick={handleAddContact}>Save Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">{contacts.length} contacts</div>
        </div>
        
        {contacts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {contact.email}
                    </div>
                    {contact.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </div>
                    )}
                    {contact.company && (
                      <div className="text-gray-400">
                        {contact.company}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => startEditContact(contact)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => startDeleteContact(contact.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
            <UserPlus className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
            <p className="text-gray-500 text-center mb-4">Start adding contacts or import them from your existing CRM</p>
            <div className="flex space-x-3">
              <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                <DialogTrigger asChild>
                  <Button>Add Contact</Button>
                </DialogTrigger>
              </Dialog>
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Import Contacts</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Contacts</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file with your contacts. The file should have columns for name, email, phone, and company.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="csv-file" className="mb-2 block">Choose CSV File</Label>
                    <Input 
                      id="csv-file" 
                      type="file" 
                      accept=".csv"
                      onChange={handleImportCSV}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Example CSV format: name,email,phone,company
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
      
      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update contact information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-company">Company</Label>
              <Input
                id="edit-company"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditContact}>Update Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteContact}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsTab;
