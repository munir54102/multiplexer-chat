
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  CreditCard,
  Download,
  Filter,
  Mail,
  RefreshCcw,
  Search,
  User,
  AlertTriangle,
  Check,
  Clock,
  Ban
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for subscriptions
const dummySubscriptions = [
  {
    id: 1,
    userId: 101,
    userName: "Jane Cooper",
    email: "jane.cooper@example.com",
    planType: "Annual Premium",
    status: "active",
    amount: "$99.00",
    nextBilling: "Aug 15, 2025",
    startDate: "Aug 15, 2024",
    paymentMethod: "Visa **** 4242",
    lastPayment: "Success"
  },
  {
    id: 2,
    userId: 102,
    userName: "Robert Fox",
    email: "robert.fox@example.com",
    planType: "Monthly Basic",
    status: "past_due",
    amount: "$9.99",
    nextBilling: "Apr 22, 2025",
    startDate: "Mar 22, 2025",
    paymentMethod: "Mastercard **** 5555",
    lastPayment: "Failed"
  },
  {
    id: 3,
    userId: 103,
    userName: "Emily Wilson",
    email: "emily.wilson@example.com",
    planType: "Annual Basic",
    status: "active",
    amount: "$79.00",
    nextBilling: "Jan 10, 2026",
    startDate: "Jan 10, 2025",
    paymentMethod: "PayPal",
    lastPayment: "Success"
  },
  {
    id: 4,
    userId: 104,
    userName: "Michael Brown",
    email: "michael.brown@example.com",
    planType: "Monthly Premium",
    status: "canceled",
    amount: "$19.99",
    nextBilling: "N/A",
    startDate: "Feb 05, 2025",
    paymentMethod: "Visa **** 1234",
    lastPayment: "Success"
  },
  {
    id: 5,
    userId: 105,
    userName: "Sarah Taylor",
    email: "sarah.taylor@example.com",
    planType: "Annual Enterprise",
    status: "active",
    amount: "$299.00",
    nextBilling: "Jun 20, 2025",
    startDate: "Jun 20, 2024",
    paymentMethod: "Amex **** 9876",
    lastPayment: "Success"
  },
  {
    id: 6,
    userId: 106,
    userName: "David Johnson",
    email: "david.johnson@example.com",
    planType: "Monthly Enterprise",
    status: "trial",
    amount: "$49.99",
    nextBilling: "Apr 30, 2025",
    startDate: "Apr 15, 2025",
    paymentMethod: "Not added yet",
    lastPayment: "Trial"
  }
];

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState(dummySubscriptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const { toast } = useToast();

  // Filter subscriptions based on search and filters
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesPlan = planFilter === "all" || sub.planType.includes(planFilter);
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleRenewSubscription = (subId: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subId ? { ...sub, status: "active", lastPayment: "Success" } : sub
    ));
    toast({
      title: "Subscription renewed",
      description: "Subscription has been successfully renewed",
    });
  };

  const handleCancelSubscription = (subId: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subId ? { ...sub, status: "canceled", nextBilling: "N/A" } : sub
    ));
    toast({
      title: "Subscription canceled",
      description: "Subscription has been successfully canceled",
    });
  };

  const handleExtendTrial = (subId: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subId ? { ...sub, nextBilling: "May 15, 2025" } : sub
    ));
    toast({
      title: "Trial extended",
      description: "Trial period has been extended by 15 days",
    });
  };

  const handleSendReminder = (subId: number) => {
    toast({
      title: "Reminder sent",
      description: "Payment reminder email has been sent to the user",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "past_due":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Past Due</Badge>;
      case "canceled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Canceled</Badge>;
      case "trial":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Trial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <Check className="h-4 w-4 text-green-600" />;
      case "Failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "Trial":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subscribers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="past_due">Past Due</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={planFilter}
            onValueChange={setPlanFilter}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All plans</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="Monthly">Monthly only</SelectItem>
              <SelectItem value="Annual">Annual only</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>

          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{sub.userName}</span>
                      <span className="text-sm text-gray-500">{sub.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{sub.planType}</TableCell>
                  <TableCell>{getStatusBadge(sub.status)}</TableCell>
                  <TableCell>{sub.amount}</TableCell>
                  <TableCell>{sub.nextBilling}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{sub.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getPaymentStatusIcon(sub.lastPayment)}
                      <span className="ml-1">{sub.lastPayment}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRenewSubscription(sub.id)} disabled={sub.status === 'active'}>
                          <RefreshCcw className="h-4 w-4 mr-2" /> Renew Subscription
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCancelSubscription(sub.id)} disabled={sub.status === 'canceled'}>
                          <Ban className="h-4 w-4 mr-2" /> Cancel Subscription
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExtendTrial(sub.id)} disabled={sub.status !== 'trial'}>
                          <Calendar className="h-4 w-4 mr-2" /> Extend Trial
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendReminder(sub.id)} disabled={sub.status !== 'past_due'}>
                          <Mail className="h-4 w-4 mr-2" /> Send Payment Reminder
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" /> View Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  No subscriptions found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
