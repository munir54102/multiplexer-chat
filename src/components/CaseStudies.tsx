
import { LineChart, Users, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "GlobalTech Retail",
      industry: "E-commerce",
      challenge: "Struggling with high customer service costs and slow response times during peak shopping seasons.",
      solution: "Implemented MultiplexAI across website chat, WhatsApp, and Facebook Messenger with custom product knowledge base.",
      results: [
        { metric: "Response time", value: "90%", detail: "decrease from 24 hours to under 2 hours" },
        { metric: "Resolution rate", value: "75%", detail: "of customer inquiries resolved without human intervention" },
        { metric: "Support costs", value: "40%", detail: "reduction in customer support expenses" }
      ],
      logo: "/case-study-1.png"
    },
    {
      company: "FinServe Solutions",
      industry: "Financial Services",
      challenge: "Needed to provide secure, compliant customer support while scaling their growing client base.",
      solution: "Deployed a custom-trained AI chatbot with sensitive information handling capabilities and human handoff.",
      results: [
        { metric: "Client onboarding", value: "65%", detail: "faster onboarding process" },
        { metric: "Customer satisfaction", value: "4.8/5", detail: "average rating for bot interactions" },
        { metric: "Lead conversion", value: "32%", detail: "increase in qualified leads" }
      ],
      logo: "/case-study-2.png"
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Customer Success Stories</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          See how organizations across industries have transformed their customer engagement with MultiplexAI.
        </p>
      </div>

      <div className="space-y-12">
        {caseStudies.map((study, index) => (
          <div key={study.company} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="h-12 w-36 bg-gray-200 rounded mb-6">
                  {/* Placeholder for company logo */}
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    {study.company} Logo
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{study.company}</h3>
                  <p className="text-gray-500">{study.industry}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Challenge</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Solution</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-8">
                <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  Results & Impact
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {study.results.map((result) => (
                    <div key={result.metric} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="font-bold text-2xl text-primary mb-1">{result.value}</div>
                      <div className="text-sm text-gray-800">{result.metric}</div>
                      <div className="text-xs text-gray-500 mt-1">{result.detail}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center group">
                    Read full case study <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
