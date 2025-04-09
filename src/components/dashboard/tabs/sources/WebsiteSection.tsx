
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Globe, ArrowRight, CheckCircle, AlertCircle, Loader2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CrawledUrl {
  id: string;
  url: string;
  status: "pending" | "success" | "error";
  crawledAt: Date;
  pageCount?: number;
  extractedData?: ExtractedData;
}

interface ExtractedData {
  pricing?: PricingInfo[];
  features?: string[];
  faqs?: FAQ[];
  generalInfo?: string[];
}

interface PricingInfo {
  plan: string;
  price: string;
  period?: string;
  features?: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const WebsiteSection = () => {
  const { toast } = useToast();
  const [crawlUrl, setCrawlUrl] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [crawledUrls, setCrawledUrls] = useState<CrawledUrl[]>([]);
  const [selectedCrawl, setSelectedCrawl] = useState<CrawledUrl | null>(null);
  const [extractionTab, setExtractionTab] = useState("pricing");

  const extractDataFromWebsite = (url: string) => {
    // This is a simulation of data extraction, in a real implementation
    // this would use actual web scraping or an AI to extract the data
    
    // Sample data that would be extracted from a website
    const extractedData: ExtractedData = {
      pricing: [
        {
          plan: "Basic",
          price: "$29",
          period: "month",
          features: ["1 chatbot", "1,000 messages/month", "Basic integrations", "Email support"]
        },
        {
          plan: "Professional",
          price: "$79",
          period: "month",
          features: ["3 chatbots", "10,000 messages/month", "All integrations", "Priority support"]
        },
        {
          plan: "Enterprise",
          price: "Custom",
          features: ["Unlimited chatbots", "Unlimited messages", "Custom integrations", "Dedicated support"]
        }
      ],
      features: [
        "Multi-Platform Integration with WhatsApp, Facebook, Instagram, and your website",
        "AI-Powered Responses with context-aware message handling",
        "Visual Flow Builder with drag-and-drop interface",
        "Analytics Dashboard for performance tracking",
        "Live Agent Takeover for complex customer issues",
        "Enterprise-grade security and compliance"
      ],
      faqs: [
        {
          question: "How do I get started?",
          answer: "Sign up for a free account, create your first chatbot, and connect it to your preferred platform."
        },
        {
          question: "Can I customize the chatbot appearance?",
          answer: "Yes, you can fully customize the look and feel of your chatbot to match your brand."
        },
        {
          question: "Do you offer a free trial?",
          answer: "Yes, all plans include a 14-day free trial with no credit card required."
        }
      ],
      generalInfo: [
        "Founded in 2023",
        "Serving over 1,000 businesses worldwide",
        "Supports 10+ languages",
        "24/7 customer support available",
        "99.9% uptime guarantee"
      ]
    };
    
    return extractedData;
  };

  const handleCrawlWebsite = async () => {
    if (!crawlUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL to crawl.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Validate URL format
      new URL(crawlUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // In a real implementation, this would be an API call to a web crawler service
    // For now, we'll simulate the crawling process
    setTimeout(() => {
      const extractedData = extractDataFromWebsite(crawlUrl);
      const pageCount = Math.floor(Math.random() * 20) + 5;
      
      const newCrawl: CrawledUrl = {
        id: Date.now().toString(),
        url: crawlUrl,
        status: "success",
        crawledAt: new Date(),
        pageCount: pageCount,
        extractedData: extractedData
      };

      setCrawledUrls(prev => [newCrawl, ...prev]);
      setSelectedCrawl(newCrawl);
      setCrawlUrl("");
      setIsLoading(false);

      toast({
        title: "Website crawled",
        description: `Successfully crawled ${pageCount} pages from ${crawlUrl}`,
      });
    }, 2000);
  };

  const handleSubmitSitemap = async () => {
    if (!sitemapUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid sitemap URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Validate URL format
      new URL(sitemapUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid sitemap URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call for sitemap processing
    setTimeout(() => {
      const extractedData = extractDataFromWebsite(sitemapUrl);
      const pageCount = Math.floor(Math.random() * 50) + 20;
      
      const newCrawl: CrawledUrl = {
        id: Date.now().toString(),
        url: sitemapUrl,
        status: "success",
        crawledAt: new Date(),
        pageCount: pageCount,
        extractedData: extractedData
      };

      setCrawledUrls(prev => [newCrawl, ...prev]);
      setSelectedCrawl(newCrawl);
      setSitemapUrl("");
      setIsLoading(false);

      toast({
        title: "Sitemap processed",
        description: `Successfully processed ${pageCount} URLs from the sitemap`,
      });
    }, 2000);
  };

  const viewCrawlData = (crawl: CrawledUrl) => {
    setSelectedCrawl(crawl);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Website</h3>
      
      <div className="mb-6">
        <p className="text-sm mb-2 font-medium">Crawl Website</p>
        <div className="flex">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              value={crawlUrl}
              onChange={(e) => setCrawlUrl(e.target.value)}
              placeholder="https://www.example.com"
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleCrawlWebsite}
            className="ml-2 flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4 mr-2" />
            )}
            Crawl Website
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This will crawl all the links starting with the URL (not including files on the website).
        </p>
      </div>
      
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <p className="px-4 text-sm text-gray-500">OR</p>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm mb-2 font-medium">Submit Sitemap</p>
        <div className="flex">
          <Input
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://www.example.com/sitemap.xml"
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmitSitemap}
            className="ml-2"
            disabled={isLoading}
          >
            Load Sitemap
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Process all URLs listed in an XML sitemap for more efficient crawling.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {crawledUrls.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium mb-3">Crawl History</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pages
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crawledUrls.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedCrawl?.id === item.id ? 'bg-blue-50' : ''}`}
                        onClick={() => viewCrawlData(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-[150px] truncate">
                          {item.url}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.pageCount || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {item.status === "success" ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" /> Success
                            </span>
                          ) : item.status === "error" ? (
                            <span className="flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" /> Failed
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-600">
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Processing
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          {selectedCrawl && selectedCrawl.extractedData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <div className="flex items-center justify-between">
                    <span>Extracted Data</span>
                    <span className="text-sm text-gray-500">{new Date(selectedCrawl.crawledAt).toLocaleString()}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={extractionTab} onValueChange={setExtractionTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                    <TabsTrigger value="info">General Info</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pricing">
                    <ScrollArea className="h-[300px] pr-4">
                      {selectedCrawl.extractedData.pricing?.map((plan, index) => (
                        <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-lg">{plan.plan}</h4>
                            <div className="text-right">
                              <span className="text-xl font-bold">{plan.price}</span>
                              {plan.period && <span className="text-gray-500">/{plan.period}</span>}
                            </div>
                          </div>
                          {plan.features && (
                            <ul className="mt-2 space-y-1">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-3">
                        {selectedCrawl.extractedData.features?.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="faqs">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {selectedCrawl.extractedData.faqs?.map((faq, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-md mb-2">{faq.question}</h4>
                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="info">
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-2">
                        {selectedCrawl.extractedData.generalInfo?.map((info, index) => (
                          <li key={index} className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{info}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Chatbot updated",
                        description: "Extracted data has been used to train your chatbot",
                      });
                    }}
                  >
                    Train Chatbot with this Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteSection;
