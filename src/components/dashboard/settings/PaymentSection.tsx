
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Plus, Trash, CreditCard, PaypalIcon, Check } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock data for payment methods and coupons
const initialPaymentMethods = [
  { id: 'credit-card', name: 'Credit Card', enabled: true, description: 'Accept payments with Visa, Mastercard, and American Express' },
  { id: 'paypal', name: 'PayPal', enabled: true, description: 'Connect your PayPal Business account' },
  { id: 'bank-transfer', name: 'Bank Transfer', enabled: false, description: 'Accept direct bank transfers' },
  { id: 'crypto', name: 'Cryptocurrency', enabled: false, description: 'Accept Bitcoin, Ethereum and other cryptocurrencies' },
];

const initialCoupons = [
  { id: 'welcome10', code: 'WELCOME10', discount: 10, type: 'percentage', status: 'active', usageLimit: 100, usedCount: 12 },
  { id: 'summer2023', code: 'SUMMER2023', discount: 25, type: 'percentage', status: 'active', usageLimit: 50, usedCount: 35 },
  { id: 'freemonth', code: 'FREEMONTH', discount: 100, type: 'percentage', status: 'inactive', usageLimit: 20, usedCount: 20 },
];

const PaymentSection = () => {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [newPaymentMethod, setNewPaymentMethod] = useState({ name: '', description: '', id: '' });
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10, type: 'percentage', usageLimit: 100 });
  const [openNewPaymentDialog, setOpenNewPaymentDialog] = useState(false);
  const [openNewCouponDialog, setOpenNewCouponDialog] = useState(false);
  const [couponToApply, setCouponToApply] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // In a real app, this would be determined by user role
  
  const { toast } = useToast();

  // Payment methods functions
  const handleTogglePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, enabled: !method.enabled } : method
    ));
    
    const method = paymentMethods.find(m => m.id === id);
    toast({
      title: method.enabled ? `${method.name} Disabled` : `${method.name} Enabled`,
      description: method.enabled 
        ? `${method.name} payment method has been disabled.` 
        : `${method.name} payment method has been enabled.`,
    });
  };

  const handleDeletePaymentMethod = (id) => {
    const method = paymentMethods.find(m => m.id === id);
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment Method Removed",
      description: `${method.name} payment method has been removed.`,
    });
  };

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.name || !newPaymentMethod.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    const id = newPaymentMethod.name.toLowerCase().replace(/\s+/g, '-');
    
    setPaymentMethods([
      ...paymentMethods, 
      { 
        ...newPaymentMethod, 
        id, 
        enabled: true 
      }
    ]);
    
    setNewPaymentMethod({ name: '', description: '', id: '' });
    setOpenNewPaymentDialog(false);
    
    toast({
      title: "Payment Method Added",
      description: `${newPaymentMethod.name} payment method has been added.`,
    });
  };

  // Coupon functions
  const handleAddCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.usageLimit) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setCoupons([
      ...coupons, 
      { 
        ...newCoupon, 
        id: `coupon-${Date.now()}`, 
        status: 'active',
        usedCount: 0,
      }
    ]);
    
    setNewCoupon({ code: '', discount: 10, type: 'percentage', usageLimit: 100 });
    setOpenNewCouponDialog(false);
    
    toast({
      title: "Coupon Added",
      description: `${newCoupon.code} coupon has been added.`,
    });
  };

  const handleToggleCouponStatus = (id) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id 
        ? { ...coupon, status: coupon.status === 'active' ? 'inactive' : 'active' } 
        : coupon
    ));
    
    const coupon = coupons.find(c => c.id === id);
    toast({
      title: coupon.status === 'active' ? "Coupon Deactivated" : "Coupon Activated",
      description: `${coupon.code} coupon has been ${coupon.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleDeleteCoupon = (id) => {
    const coupon = coupons.find(c => c.id === id);
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    
    toast({
      title: "Coupon Deleted",
      description: `${coupon.code} coupon has been deleted.`,
    });
  };

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponToApply && c.status === 'active');
    
    if (!coupon) {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid or has expired.",
        variant: "destructive",
      });
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponToApply('');
    
    toast({
      title: "Coupon Applied",
      description: `${coupon.code} coupon has been applied to your order. You'll receive a ${coupon.discount}% discount.`,
    });
  };

  const calculatePrice = (basePrice) => {
    if (!appliedCoupon) return basePrice;
    
    if (appliedCoupon.type === 'percentage') {
      const discountAmount = basePrice * (appliedCoupon.discount / 100);
      return Math.max(0, basePrice - discountAmount).toFixed(2);
    }
    
    return Math.max(0, basePrice - appliedCoupon.discount).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Payment Settings</h2>
      
      <Tabs defaultValue={isAdmin ? "methods" : "subscription"}>
        <TabsList className="mb-4">
          {isAdmin && <TabsTrigger value="methods">Payment Methods</TabsTrigger>}
          {isAdmin && <TabsTrigger value="coupons">Coupon Codes</TabsTrigger>}
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        {isAdmin && (
          <TabsContent value="methods" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Manage Payment Methods</h3>
              <Dialog open={openNewPaymentDialog} onOpenChange={setOpenNewPaymentDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Payment Method</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new payment method you want to offer to your customers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="name">Payment Method Name</Label>
                      <Input
                        id="name"
                        value={newPaymentMethod.name}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, name: e.target.value })}
                        placeholder="e.g., Apple Pay"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newPaymentMethod.description}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, description: e.target.value })}
                        placeholder="Brief description of the payment method"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenNewPaymentDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleAddPaymentMethod}>
                      Add Payment Method
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        {method.id === 'credit-card' && <CreditCard className="h-5 w-5 text-primary" />}
                        {method.id === 'paypal' && <PaypalIcon className="h-5 w-5 text-primary" />}
                        {method.id !== 'credit-card' && method.id !== 'paypal' && (
                          <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                            {method.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`enable-${method.id}`} className="mr-2">
                          {method.enabled ? "Enabled" : "Disabled"}
                        </Label>
                        <Switch
                          id={`enable-${method.id}`}
                          checked={method.enabled}
                          onCheckedChange={() => handleTogglePaymentMethod(method.id)}
                        />
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePaymentMethod(method.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
        
        {isAdmin && (
          <TabsContent value="coupons" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Manage Coupon Codes</h3>
              <Dialog open={openNewCouponDialog} onOpenChange={setOpenNewCouponDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Coupon Code
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Coupon Code</DialogTitle>
                    <DialogDescription>
                      Set up a new coupon code to offer discounts to your customers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="code">Coupon Code</Label>
                      <Input
                        id="code"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                        placeholder="e.g., SUMMER2023"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discount">Discount Amount</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="discount"
                          type="number"
                          value={newCoupon.discount}
                          onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) || 0 })}
                          className="flex-1"
                        />
                        <select
                          value={newCoupon.type}
                          onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                          className="border rounded-md px-3 py-2"
                        >
                          <option value="percentage">%</option>
                          <option value="fixed">$</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        value={newCoupon.usageLimit}
                        onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: parseInt(e.target.value) || 0 })}
                        placeholder="Number of times this coupon can be used"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenNewCouponDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleAddCoupon}>
                      Create Coupon
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <Card key={coupon.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{coupon.code}</h4>
                        <Badge variant={coupon.status === 'active' ? 'outline' : 'secondary'}>
                          {coupon.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {coupon.discount}{coupon.type === 'percentage' ? '%' : '$'} off
                        {coupon.usageLimit ? ` • ${coupon.usedCount}/${coupon.usageLimit} used` : ''}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleCouponStatus(coupon.id)}
                      >
                        {coupon.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {coupons.length === 0 && (
                <div className="text-center p-6 border rounded-lg">
                  <p className="text-gray-500">No coupon codes created yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription plan and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Pro Plan</h3>
                    <p className="text-sm text-gray-600">Monthly subscription • Next billing date: May 15, 2025</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center space-x-4 p-3 border rounded-lg">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/2028</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">Change</Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Upcoming Invoice</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pro Plan (Monthly)</span>
                    <span>$29.00</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-${(29 * appliedCoupon.discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total due on May 15, 2025</span>
                    <span>${calculatePrice(29)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="font-medium">Have a coupon?</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponToApply}
                    onChange={(e) => setCouponToApply(e.target.value.toUpperCase())}
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </div>
                
                {appliedCoupon && (
                  <div className="flex items-center text-green-600 text-sm mt-2">
                    <Check className="h-4 w-4 mr-1" />
                    <span>{appliedCoupon.code} applied: {appliedCoupon.discount}% off</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 space-y-4">
                <Button variant="outline" className="w-full">Update Billing Information</Button>
                <Button variant="destructive" className="w-full">Cancel Subscription</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-medium">April 15, 2025</p>
                    <p className="text-sm text-gray-500">Pro Plan (Monthly)</p>
                  </div>
                  <div className="text-right">
                    <p>$29.00</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">Download</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-medium">March 15, 2025</p>
                    <p className="text-sm text-gray-500">Pro Plan (Monthly)</p>
                  </div>
                  <div className="text-right">
                    <p>$29.00</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">Download</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3">
                  <div>
                    <p className="font-medium">February 15, 2025</p>
                    <p className="text-sm text-gray-500">Pro Plan (Monthly)</p>
                  </div>
                  <div className="text-right">
                    <p>$29.00</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">Download</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSection;
