
import { useState } from "react";
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Layout from "@/components/Layout";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const articles = [
    {
      id: 1,
      title: "5 Ways AI Chatbots Are Transforming Customer Service",
      excerpt: "Discover how businesses are using AI-powered chatbots to provide faster, more efficient customer service while reducing costs.",
      author: "Emily Chen",
      date: "May 15, 2023",
      category: "AI",
      image: "/blog-1.jpg",
      content: "AI chatbots are revolutionizing customer service by providing 24/7 support, handling multiple inquiries simultaneously, reducing wait times, personalizing customer interactions, and gathering valuable customer data for business insights."
    },
    {
      id: 2,
      title: "The Complete Guide to WhatsApp Business API Integration",
      excerpt: "Everything you need to know about integrating WhatsApp Business API to reach your customers on their preferred messaging platform.",
      author: "Marcus Johnson",
      date: "April 22, 2023",
      category: "Integration",
      image: "/blog-2.jpg",
      content: "WhatsApp Business API integration enables businesses to reach over 2 billion users worldwide. This guide covers account setup, authentication, message templates, automation, and best practices for successful implementation."
    },
    {
      id: 3,
      title: "How to Design Conversational Flows That Convert",
      excerpt: "Learn the art of creating chatbot conversation flows that guide users toward conversion while maintaining a natural dialogue.",
      author: "Sophia Williams",
      date: "March 10, 2023",
      category: "Design",
      image: "/blog-3.jpg",
      content: "Effective conversational flows employ clear objectives, personalized approaches, strategic questions, appropriate tone, and seamless handoffs to human agents when needed, all working together to guide users to conversion."
    },
    {
      id: 4,
      title: "Leveraging Natural Language Processing in Customer Support",
      excerpt: "How NLP technology is changing the game for customer service chatbots and creating more human-like interactions.",
      author: "David Patel",
      date: "February 28, 2023",
      category: "Technology",
      image: "/blog-4.jpg",
      content: "Natural Language Processing enables chatbots to understand context, sentiment, and intent, resulting in more meaningful and effective customer interactions that closely resemble human conversation."
    },
    {
      id: 5,
      title: "Building Trust with AI: Transparency in Chatbot Interactions",
      excerpt: "Best practices for maintaining transparency and building customer trust when implementing AI chatbots.",
      author: "Laura Martinez",
      date: "January 15, 2023",
      category: "Strategy",
      image: "/blog-5.jpg",
      content: "Building customer trust with AI chatbots requires clear disclosure of AI use, transparency about capabilities and limitations, proper expectation setting, and clear paths to human assistance when needed."
    },
    {
      id: 6,
      title: "Instagram Messaging API: Connecting with Customers Where They Are",
      excerpt: "How to implement the Instagram Messaging API to create seamless customer conversations on one of the world's most popular social platforms.",
      author: "James Wilson",
      date: "December 10, 2022",
      category: "Social Media",
      image: "/blog-6.jpg",
      content: "The Instagram Messaging API allows businesses to scale customer communications through automation while maintaining personalized interactions on a platform where over a billion users are already active and engaged."
    },
    {
      id: 7,
      title: "Measuring ROI on Conversational AI Investments",
      excerpt: "A comprehensive guide to tracking and measuring the return on investment from your AI chatbot implementations.",
      author: "Michelle Lee",
      date: "November 5, 2022",
      category: "Business",
      image: "/blog-7.jpg",
      content: "To measure chatbot ROI effectively, businesses should track metrics like cost reduction, conversion rates, customer satisfaction scores, resolution times, and agent productivity to quantify both tangible and intangible benefits."
    },
    {
      id: 8,
      title: "The Evolution of Chatbots: From Rule-Based to AI-Powered",
      excerpt: "A look at how chatbot technology has evolved over the years and where it's headed in the future.",
      author: "Robert Chen",
      date: "October 18, 2022",
      category: "Technology",
      image: "/blog-8.jpg",
      content: "Chatbot evolution has progressed from simple rule-based systems to sophisticated AI models using machine learning, natural language understanding, and contextual awareness, with future developments focusing on emotional intelligence and multimodal capabilities."
    },
    {
      id: 9,
      title: "Implementing Multilingual Support in Your Chatbot Strategy",
      excerpt: "How to effectively serve a global audience by building chatbots that communicate in multiple languages.",
      author: "Anna Kowalski",
      date: "September 22, 2022",
      category: "Globalization",
      image: "/blog-9.jpg",
      content: "Multilingual chatbots require proper language detection, culturally appropriate responses, and maintenance of context across languages to effectively serve global audiences and expand market reach."
    },
    {
      id: 10,
      title: "Voice-Enabled Chatbots: The Next Frontier in Customer Engagement",
      excerpt: "Exploring the integration of voice recognition technology with chatbots to create seamless omnichannel experiences.",
      author: "Thomas Jackson",
      date: "August 15, 2022",
      category: "Innovation",
      image: "/blog-10.jpg",
      content: "Voice-enabled chatbots combine speech recognition with natural language processing to create hands-free interaction options that improve accessibility while maintaining conversational context across text and voice channels."
    }
  ];

  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MultiplexAI Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest articles, guides, and resources on chatbots and customer engagement.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                {article.category} Image
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    {article.category}
                  </span>
                  <span className="mx-2">·</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article.date}</span>
                </div>
                <h3 className="font-bold text-lg">{article.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <Button variant="link" className="text-primary p-0 flex items-center">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-16">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Newsletter signup */}
        <div className="mt-24 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest articles, updates, and news about chatbot technology and AI-powered customer engagement delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <Input type="email" placeholder="Your email address" className="sm:flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
