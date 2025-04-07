
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Plus, 
  Tag, 
  Trash2, 
  Percent,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for coupons
const dummyCoupons = [
  {
    id: 1,
    code: "WELCOME25",
    type: "percentage",
    value: 25,
    usageLimit: 1000,
    usageCount: 423,
    expiryDate: "May 31, 2025",
    status: "active",
    eligiblePlans: ["All plans"],
    minimumPurchase: 0
  },
  {
    id: 2,
    code: "SUMMER2025",
    type: "percentage",
    value: 15,
    usageLimit: 500,
    usageCount: 89,
    expiryDate: "Aug 31, 2025",
    status: "scheduled",
    eligiblePlans: ["Premium", "Enterprise"],
    minimumPurchase: 0
  },
  {
    id: 3,
    code: "FIRST10",
    type: "fixed",
    value: 10,
    usageLimit: 0,
    usageCount: 156,
    expiryDate: "Never",
    status: "active",
    eligiblePlans: ["Basic"],
    minimumPurchase: 50
  },
  {
    id: 4,
    code: "BLACKFRIDAY50",
    type: "percentage",
    value: 50,
    usageLimit: 100,
    usageCount: 100,
    expiryDate: "Dec 1, 2024",
    status: "expired",
    eligiblePlans: ["All plans"],
    minimumPurchase: 0
  },
  {
    id: 5,
    code: "FREEMONTH",
    type: "percentage",
    value: 100,
    usageLimit: 50,
    usageCount: 32,
    expiryDate: "Jun 15, 2025",
    status: "active",
    eligiblePlans: ["Monthly Basic", "Monthly Premium"],
    minimumPurchase: 0
  }
];

const CouponManagement = () => {
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponType, setNewCouponType] = useState("percentage");
  const [newCouponValue, setNewCouponValue] = useState("25");
  const [newCouponLimit, setNewCouponLimit] = useState("100");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleToggleCoupon = (couponId: number) => {
    setCoupons(coupons.map(coupon => {
      if (coupon.id === couponId) {
        const newStatus = coupon.status === "active" ? "inactive" : "active";
        return { ...coupon, status: newStatus };
      }
      return coupon;
    }));

    toast({
      title: "Coupon updated",
      description: "Coupon status has been successfully updated",
    });
  };

  const handleDeleteCoupon = (couponId: number) => {
    setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    toast({
      title: "Coupon deleted",
      description: "Coupon has been successfully deleted",
    });
  };

  const handleGenerateRandomCode = () => {
    const randomCode = "PROMO" + Math.floor(10000 + Math.random() * 90000);
    setNewCouponCode(randomCode);
  };

  const handleAddCoupon = () => {
    const newCoupon = {
      id: Math.max(...coupons.map(c => c.id)) + 1,
      code: newCouponCode,
      type: newCouponType,
      value: parseInt(newCouponValue),
      usageLimit: parseInt(newCouponLimit),
      usageCount: 0,
      expiryDate: "Dec 31, 2025",
      status: "active",
      eligiblePlans: ["All plans"],
      minimumPurchase: 0
    };

    setCoupons([...coupons, newCoupon]);
    setDialogOpen(false);
    
    // Reset form
    setNewCouponCode("");
    setNewCouponType("percentage");
    setNewCouponValue("25");
    setNewCouponLimit("100");
    
    toast({
      title: "Coupon created",
      description: `Coupon ${newCouponCode} has been successfully created`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Coupon Codes</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Coupon</DialogTitle>
              <DialogDescription>
                Create a new coupon code for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-1">
                  <Label htmlFor="couponCode">Coupon Code</Label>
                  <Input
                    id="couponCode"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g., SUMMER25"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateRandomCode}
                >
                  Generate
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select
                    value={newCouponType}
                    onValueChange={setNewCouponType}
                  >
                    <SelectTrigger id="discountType">
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="discountValue">
                    {newCouponType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="discountValue"
                      value={newCouponValue}
                      onChange={(e) => setNewCouponValue(e.target.value.replace(/[^0-9]/g, ''))}
                      type="text"
                      className="pl-7"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                      {newCouponType === "percentage" ? "%" : "$"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="usageLimit">Usage Limit (0 for unlimited)</Label>
                <Input
                  id="usageLimit"
                  value={newCouponLimit}
                  onChange={(e) => setNewCouponLimit(e.target.value.replace(/[^0-9]/g, ''))}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  defaultValue="Dec 31, 2025"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="eligiblePlans">Eligible Plans</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="eligiblePlans">
                    <SelectValue placeholder="Select eligible plans" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All plans</SelectItem>
                    <SelectItem value="basic">Basic only</SelectItem>
                    <SelectItem value="premium">Premium only</SelectItem>
                    <SelectItem value="enterprise">Enterprise only</SelectItem>
                    <SelectItem value="monthly">Monthly plans only</SelectItem>
                    <SelectItem value="annual">Annual plans only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddCoupon}>
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Eligible Plans</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span>{coupon.code}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        toast({
                          title: "Copied to clipboard",
                          description: `Coupon code ${coupon.code} copied to clipboard`,
                        });
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {coupon.type === "percentage" ? (
                      <Percent className="h-4 w-4 text-gray-500 mr-1" />
                    ) : (
                      <span className="mr-1">$</span>
                    )}
                    {coupon.value}
                    {coupon.type === "percentage" ? "%" : ""}
                  </div>
                </TableCell>
                <TableCell>
                  {coupon.usageCount}
                  {coupon.usageLimit > 0 ? ` / ${coupon.usageLimit}` : ""}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{coupon.expiryDate}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                <TableCell>{coupon.eligiblePlans.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleToggleCoupon(coupon.id)}
                      disabled={coupon.status === "expired"}
                    >
                      {coupon.status === "active" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      <span className="sr-only">
                        {coupon.status === "active" ? "Deactivate" : "Activate"}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteCoupon(coupon.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CouponManagement;
