
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, Store, Globe, HeadphonesIcon, ShoppingCart, Users, 
  Briefcase, Book, Star, Download, Search, Filter, PlusCircle, Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  type: string;
  industry: string;
  icon: React.ReactNode;
  isFavorite: boolean;
  color: string;
  stats: {
    users: number;
    rating: number;
  };
}

const TemplateLibrary = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  
  const templates: Template[] = [
    {
      id: "t1",
      name: "Customer Support Bot",
      description: "Handle customer inquiries, provide product information, and resolve common issues",
      type: "support",
      industry: "general",
      icon: <HeadphonesIcon className="h-5 w-5 text-blue-500" />,
      isFavorite: true,
      color: "blue",
      stats: {
        users: 2587,
        rating: 4.7
      }
    },
    {
      id: "t2",
      name: "E-commerce Sales Assistant",
      description: "Help customers find products, answer questions, and increase conversions",
      type: "sales",
      industry: "ecommerce",
      icon: <ShoppingCart className="h-5 w-5 text-green-500" />,
      isFavorite: false,
      color: "green",
      stats: {
        users: 1982,
        rating: 4.5
      }
    },
    {
      id: "t3",
      name: "Lead Generation Bot",
      description: "Qualify prospects, capture contact information, and book meetings with your sales team",
      type: "leads",
      industry: "general",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      isFavorite: true,
      color: "purple",
      stats: {
        users: 1543,
        rating: 4.6
      }
    },
    {
      id: "t4",
      name: "Real Estate Agent",
      description: "Showcase properties, answer buyer questions, and schedule viewings",
      type: "sales",
      industry: "real-estate",
      icon: <Store className="h-5 w-5 text-amber-500" />,
      isFavorite: false,
      color: "amber",
      stats: {
        users: 876,
        rating: 4.3
      }
    },
    {
      id: "t5",
      name: "Hotel Concierge",
      description: "Assist guests with bookings, amenities information, and local recommendations",
      type: "support",
      industry: "hospitality",
      icon: <Briefcase className="h-5 w-5 text-indigo-500" />,
      isFavorite: false,
      color: "indigo",
      stats: {
        users: 765,
        rating: 4.4
      }
    },
    {
      id: "t6",
      name: "Educational Assistant",
      description: "Support students with course information, study resources, and administrative queries",
      type: "support",
      industry: "education",
      icon: <Book className="h-5 w-5 text-blue-500" />,
      isFavorite: false,
      color: "blue",
      stats: {
        users: 1243,
        rating: 4.8
      }
    },
  ];
  
  const industries = [
    { id: "all", name: "All Industries" },
    { id: "general", name: "General" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "real-estate", name: "Real Estate" },
    { id: "hospitality", name: "Hospitality" },
    { id: "education", name: "Education" },
    { id: "healthcare", name: "Healthcare" },
    { id: "finance", name: "Finance" },
  ];
  
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    toast({
      title: "Template Selected",
      description: `${template?.name} template has been selected. You can now customize it.`
    });
  };
  
  const handleToggleFavorite = (templateId: string, currentState: boolean) => {
    toast({
      title: currentState ? "Removed from Favorites" : "Added to Favorites",
      description: `Template has been ${currentState ? "removed from" : "added to"} your favorites.`
    });
  };
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || template.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Template Library</h2>
          <p className="text-sm text-muted-foreground">Choose from pre-built templates for different business use cases</p>
        </div>
        <Button variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Custom Template
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2">
            {industries.map(industry => (
              <Button
                key={industry.id}
                variant={selectedIndustry === industry.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry.id)}
              >
                {industry.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Lead Generation</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`border-l-4 hover:shadow-md transition-shadow ${
                  template.color === "blue" ? "border-l-blue-500" :
                  template.color === "green" ? "border-l-green-500" :
                  template.color === "purple" ? "border-l-purple-500" :
                  template.color === "amber" ? "border-l-amber-500" :
                  template.color === "indigo" ? "border-l-indigo-500" :
                  "border-l-gray-500"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center text-lg">
                      {template.icon}
                      <span className="ml-2">{template.name}</span>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={template.isFavorite ? "text-red-500" : "text-gray-400"}
                      onClick={() => handleToggleFavorite(template.id, template.isFavorite)}
                    >
                      <Heart className="h-5 w-5" fill={template.isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">{template.type}</Badge>
                    <Badge variant="outline" className="text-xs">{template.industry}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {template.stats.users.toLocaleString()} users
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      {template.stats.rating} / 5
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use This Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="border rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any templates matching your search criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="support" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.filter(t => t.type === "support").map((template) => (
              // Template card (same as above)
              <Card 
                key={template.id} 
                className={`border-l-4 hover:shadow-md transition-shadow ${
                  template.color === "blue" ? "border-l-blue-500" :
                  template.color === "green" ? "border-l-green-500" :
                  template.color === "purple" ? "border-l-purple-500" :
                  template.color === "amber" ? "border-l-amber-500" :
                  template.color === "indigo" ? "border-l-indigo-500" :
                  "border-l-gray-500"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center text-lg">
                      {template.icon}
                      <span className="ml-2">{template.name}</span>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={template.isFavorite ? "text-red-500" : "text-gray-400"}
                      onClick={() => handleToggleFavorite(template.id, template.isFavorite)}
                    >
                      <Heart className="h-5 w-5" fill={template.isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">{template.type}</Badge>
                    <Badge variant="outline" className="text-xs">{template.industry}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {template.stats.users.toLocaleString()} users
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      {template.stats.rating} / 5
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use This Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Similar content for other tabs */}
        <TabsContent value="sales" className="mt-6">
          {/* Sales templates */}
        </TabsContent>
        
        <TabsContent value="leads" className="mt-6">
          {/* Lead generation templates */}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          {/* Favorite templates */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateLibrary;
