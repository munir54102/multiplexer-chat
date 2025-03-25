
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "MultiplexAI has transformed our customer service operation. We've reduced response time by 75% while maintaining high customer satisfaction.",
      name: "Sarah Johnson",
      title: "Customer Support Manager",
      company: "TechSolutions Inc.",
      avatar: "/testimonial-1.png"
    },
    {
      id: 2,
      quote: "The multi-platform integration is seamless. Our customers can reach us on their preferred channels and the experience is consistent across all of them.",
      name: "Michael Chen",
      title: "Digital Marketing Director",
      company: "GlobalRetail",
      avatar: "/testimonial-2.png"
    },
    {
      id: 3,
      quote: "The AI training capabilities are impressive. Our bot gets smarter every day and now handles 80% of inquiries without human intervention.",
      name: "Jessica Patel",
      title: "Innovation Lead",
      company: "FinanceStream",
      avatar: "/testimonial-3.png"
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          See how businesses across various industries are leveraging MultiplexAI to transform their customer engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-4">
                {/* Placeholder for avatar */}
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.title}, {testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
