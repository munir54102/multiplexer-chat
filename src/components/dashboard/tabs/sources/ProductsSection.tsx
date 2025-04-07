
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, ArrowRight, CheckCircle, AlertCircle, Loader2, Package, Tag, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  status: "active" | "imported" | "error";
  importedAt: Date;
  platform: string;
}

const ProductsSection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Earbuds",
      category: "Electronics",
      price: "$129.99",
      status: "active",
      importedAt: new Date(),
      platform: "Shopify"
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      category: "Apparel",
      price: "$34.99",
      status: "active",
      importedAt: new Date(),
      platform: "WooCommerce"
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle",
      category: "Home",
      price: "$24.95",
      status: "active",
      importedAt: new Date(),
      platform: "Shopify"
    }
  ]);

  const categories = ["all", "Electronics", "Apparel", "Home", "Beauty", "Food", "Books"];

  const handleImportProducts = () => {
    setIsLoading(true);

    // Simulate API call for importing products
    setTimeout(() => {
      const newProducts: Product[] = [
        {
          id: Date.now().toString() + "1",
          name: "Smart Watch Series 5",
          category: "Electronics",
          price: "$249.99",
          status: "imported",
          importedAt: new Date(),
          platform: "WooCommerce"
        },
        {
          id: Date.now().toString() + "2",
          name: "Yoga Mat Pro",
          category: "Fitness",
          price: "$45.00",
          status: "imported",
          importedAt: new Date(),
          platform: "Shopify"
        }
      ];

      setProducts(prev => [...newProducts, ...prev]);
      setIsLoading(false);

      toast({
        title: "Products imported",
        description: `Successfully imported ${newProducts.length} products from your store.`,
      });
    }, 2000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSync = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sync complete",
        description: "Your product catalog has been synchronized with your chatbot."
      });
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Products</h3>
      
      <div className="mb-6">
        <Tabs defaultValue="catalog" className="mb-4">
          <TabsList>
            <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalog">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-md border border-input px-3 py-2 bg-background text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  
                  <Button onClick={handleImportProducts} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Package className="h-4 w-4 mr-2" />
                    )}
                    Import Products
                  </Button>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Platform
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant="outline">{product.platform}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {product.status === "active" ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" /> Active
                              </span>
                            ) : product.status === "imported" ? (
                              <span className="flex items-center text-blue-600">
                                <CheckCircle className="h-4 w-4 mr-1" /> Imported
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <AlertCircle className="h-4 w-4 mr-1" /> Error
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="text-gray-500 mt-2">Import products from your store or try a different search term.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium mb-2">Product Knowledge</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Control how your chatbot uses product information in conversations.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Product Recommendations</h5>
                      <p className="text-sm text-gray-600">Suggest relevant products during conversations</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Price Checking</h5>
                      <p className="text-sm text-gray-600">Allow users to check prices through the chatbot</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Availability Checking</h5>
                      <p className="text-sm text-gray-600">Share inventory availability information</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSync} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                Sync Product Knowledge with Chatbot
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsSection;
