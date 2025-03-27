
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Globe, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface CrawledUrl {
  id: string;
  url: string;
  status: "pending" | "success" | "error";
  crawledAt: Date;
  pageCount?: number;
}

const WebsiteSection = () => {
  const { toast } = useToast();
  const [crawlUrl, setCrawlUrl] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [crawledUrls, setCrawledUrls] = useState<CrawledUrl[]>([]);

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

    // Simulate API call for crawling
    setTimeout(() => {
      const newCrawl: CrawledUrl = {
        id: Date.now().toString(),
        url: crawlUrl,
        status: "success",
        crawledAt: new Date(),
        pageCount: Math.floor(Math.random() * 20) + 5,
      };

      setCrawledUrls(prev => [newCrawl, ...prev]);
      setCrawlUrl("");
      setIsLoading(false);

      toast({
        title: "Website crawled",
        description: `Successfully crawled ${newCrawl.pageCount} pages from ${crawlUrl}`,
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
      const newCrawl: CrawledUrl = {
        id: Date.now().toString(),
        url: sitemapUrl,
        status: "success",
        crawledAt: new Date(),
        pageCount: Math.floor(Math.random() * 50) + 20,
      };

      setCrawledUrls(prev => [newCrawl, ...prev]);
      setSitemapUrl("");
      setIsLoading(false);

      toast({
        title: "Sitemap processed",
        description: `Successfully processed ${newCrawl.pageCount} URLs from the sitemap`,
      });
    }, 2000);
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
      
      {crawledUrls.length > 0 && (
        <div className="mt-8">
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {crawledUrls.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-[200px] truncate">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.crawledAt.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteSection;
