
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const articles = [
    {
      id: 1,
      title: "5 Ways AI Chatbots Are Transforming Customer Service",
      excerpt: "Discover how businesses are using AI-powered chatbots to provide faster, more efficient customer service while reducing costs.",
      author: "Emily Chen",
      date: "May 15, 2023",
      category: "AI",
      image: "/blog-1.jpg"
    },
    {
      id: 2,
      title: "The Complete Guide to WhatsApp Business API Integration",
      excerpt: "Everything you need to know about integrating WhatsApp Business API to reach your customers on their preferred messaging platform.",
      author: "Marcus Johnson",
      date: "April 22, 2023",
      category: "Integration",
      image: "/blog-2.jpg"
    },
    {
      id: 3,
      title: "How to Design Conversational Flows That Convert",
      excerpt: "Learn the art of creating chatbot conversation flows that guide users toward conversion while maintaining a natural dialogue.",
      author: "Sophia Williams",
      date: "March 10, 2023",
      category: "Design",
      image: "/blog-3.jpg"
    }
  ];

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Resources & Insights</h2>
          <p className="mt-2 text-gray-600">
            Latest articles, guides, and resources on chatbots and customer engagement.
          </p>
        </div>
        <Button variant="outline" className="flex items-center">
          View all articles <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200">
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {article.category} Image
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {article.category}
                </span>
                <span className="mx-2">·</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <Link to="/blog" className="text-primary text-sm font-medium hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
