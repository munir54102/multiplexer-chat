
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, TrendingUp, Users, DollarSign, Package, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Sample data for charts
const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 8000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 9500 },
];

const conversionData = [
  { name: "Mon", value: 3.2 },
  { name: "Tue", value: 2.8 },
  { name: "Wed", value: 3.5 },
  { name: "Thu", value: 4.2 },
  { name: "Fri", value: 3.9 },
  { name: "Sat", value: 5.1 },
  { name: "Sun", value: 4.7 },
];

const categoryData = [
  { name: "Electronics", value: 45 },
  { name: "Clothing", value: 30 },
  { name: "Home", value: 15 },
  { name: "Beauty", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Summary cards data
const summaryCards = [
  {
    title: "Total Sales",
    value: "$24,532",
    change: "+12.5%",
    positive: true,
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: "+0.6%",
    positive: true,
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Products Sold",
    value: "1,243",
    change: "+8.2%",
    positive: true,
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Avg. Order Value",
    value: "$78.50",
    change: "-2.1%",
    positive: false,
    icon: <ShoppingCart className="h-4 w-4" />,
  },
];

// Top products data
const topProducts = [
  { id: 1, name: "Wireless Earbuds Pro", sales: 142, value: "$18,460" },
  { id: 2, name: "Smart Watch Series 5", sales: 98, value: "$24,500" },
  { id: 3, name: "Ultra HD Smart TV 55\"", sales: 76, value: "$53,200" },
  { id: 4, name: "Ergonomic Office Chair", sales: 65, value: "$12,350" },
  { id: 5, name: "Smartphone Pro Max", sales: 54, value: "$48,600" },
];

const EcommerceAnalytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">E-commerce Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`p-2 rounded-full ${card.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                  {card.icon}
                </div>
              </div>
              <div className={`text-sm mt-2 ${card.positive ? 'text-green-600' : 'text-red-600'}`}>
                {card.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trends</CardTitle>
            <CardDescription>Daily conversion rate for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Products with the highest sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Product Name</th>
                    <th scope="col" className="px-4 py-3 text-right">Units Sold</th>
                    <th scope="col" className="px-4 py-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="bg-white border-b">
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-right">{product.sales}</td>
                      <td className="px-4 py-3 text-right">{product.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Chatbot Impact on Sales</CardTitle>
          <CardDescription>Measuring the influence of your AI chatbot on e-commerce performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-bold">23%</h3>
              <p className="text-sm text-gray-600">Increase in Conversion Rate</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-bold">18%</h3>
              <p className="text-sm text-gray-600">Reduction in Customer Support</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-bold">12%</h3>
              <p className="text-sm text-gray-600">Increase in Time on Site</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceAnalytics;
