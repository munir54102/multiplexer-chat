
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Ticket, Copy, Plus, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expiryDate: string;
  isActive: boolean;
  timesUsed: number;
  maxUses: number | null;
}

const DiscountSection = () => {
  const { toast } = useToast();
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: "disc_1",
      code: "WELCOME25",
      type: "percentage",
      value: 25,
      expiryDate: "2025-12-31",
      isActive: true,
      timesUsed: 43,
      maxUses: 100,
    },
    {
      id: "disc_2",
      code: "SUMMER2025",
      type: "percentage",
      value: 15,
      expiryDate: "2025-08-31",
      isActive: true,
      timesUsed: 12,
      maxUses: null,
    },
    {
      id: "disc_3",
      code: "MUNIR70",
      type: "percentage",
      value: 70,
      expiryDate: "2025-05-15",
      isActive: true,
      timesUsed: 87,
      maxUses: 100,
    }
  ]);
  
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    expiryDate: "",
    maxUses: "",
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const copyDiscountCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Discount code copied to clipboard.",
    });
  };
  
  const toggleDiscountStatus = (id: string) => {
    setDiscounts(discounts.map(discount => 
      discount.id === id 
        ? { ...discount, isActive: !discount.isActive } 
        : discount
    ));
    
    const discount = discounts.find(d => d.id === id);
    if (discount) {
      toast({
        title: discount.isActive ? "Discount Deactivated" : "Discount Activated",
        description: `Discount code ${discount.code} has been ${discount.isActive ? "deactivated" : "activated"}.`,
      });
    }
  };
  
  const handleCreateDiscount = () => {
    if (!formData.code || !formData.value || !formData.expiryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const value = parseFloat(formData.value as string);
    if (isNaN(value) || value <= 0 || (formData.type === "percentage" && value > 100)) {
      toast({
        title: "Invalid Value",
        description: formData.type === "percentage" 
          ? "Percentage must be between 1 and 100." 
          : "Amount must be greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    const newDiscount: Discount = {
      id: `disc_${Date.now()}`,
      code: formData.code.toUpperCase(),
      type: formData.type as "percentage" | "fixed",
      value,
      expiryDate: formData.expiryDate,
      isActive: true,
      timesUsed: 0,
      maxUses: formData.maxUses ? parseInt(formData.maxUses as string) : null,
    };
    
    setDiscounts([...discounts, newDiscount]);
    setFormData({
      code: "",
      type: "percentage",
      value: "",
      expiryDate: "",
      maxUses: "",
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Discount Created",
      description: `Discount code ${newDiscount.code} has been created.`,
    });
  };
  
  const deleteDiscount = (id: string) => {
    const discountToDelete = discounts.find(d => d.id === id);
    
    setDiscounts(discounts.filter(discount => discount.id !== id));
    
    if (discountToDelete) {
      toast({
        title: "Discount Deleted",
        description: `Discount code ${discountToDelete.code} has been deleted.`,
      });
    }
  };
  
  const formatValue = (discount: Discount) => {
    return discount.type === "percentage" 
      ? `${discount.value}%` 
      : `$${discount.value.toFixed(2)}`;
  };
  
  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Discount Codes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Discount
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Discount</DialogTitle>
              <DialogDescription>
                Create a new discount code for your customers.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discount-code">Code</Label>
                <Input
                  id="discount-code"
                  placeholder="e.g., SUMMER25"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount-type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount-value">
                  {formData.type === "percentage" ? "Percentage %" : "Amount $"}
                </Label>
                <Input
                  id="discount-value"
                  type="number"
                  placeholder={formData.type === "percentage" ? "e.g., 25" : "e.g., 10.00"}
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-uses">Maximum Uses (Optional)</Label>
                <Input
                  id="max-uses"
                  type="number"
                  placeholder="Leave blank for unlimited"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({...formData, maxUses: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDiscount}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No discount codes created yet.
                </TableCell>
              </TableRow>
            ) : (
              discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-2 text-primary" />
                      {discount.code}
                    </div>
                  </TableCell>
                  <TableCell>{formatValue(discount)}</TableCell>
                  <TableCell>
                    {isExpired(discount.expiryDate) ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Expired
                      </Badge>
                    ) : (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-amber-500" />
                        <span>{new Date(discount.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={discount.isActive}
                      onCheckedChange={() => toggleDiscountStatus(discount.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {discount.timesUsed} 
                    {discount.maxUses && ` / ${discount.maxUses}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => copyDiscountCode(discount.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteDiscount(discount.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        <p className="font-medium mb-1">Pro Tip</p>
        <p>
          Share discount codes with your customers via email campaigns or social media to boost conversions.
          Customers can apply these codes during checkout to receive the discount.
        </p>
      </div>
    </div>
  );
};

export default DiscountSection;
