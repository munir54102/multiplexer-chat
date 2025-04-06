
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Award, Heart, BarChart3, Building, MessageSquare } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MultiplexAI</h1>
            <p className="text-xl text-gray-600">
              We're on a mission to transform customer engagement through intelligent AI-powered conversations.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="Our team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, MultiplexAI began with a simple idea: make it easy for businesses of all sizes to leverage the power of AI for customer engagement. We saw that while large enterprises had the resources to build custom AI solutions, small and medium businesses were left behind.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of AI experts, developers, and customer experience professionals came together to build a platform that democratizes access to cutting-edge conversational AI technology. We believe that every business deserves the tools to provide exceptional customer experiences.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of businesses across the globe, helping them connect with their customers in more meaningful and efficient ways.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at MultiplexAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Customer First",
                description: "We believe that success comes from putting our customers' needs at the center of every decision."
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from code quality to customer support."
              },
              {
                icon: <Heart className="h-10 w-10 text-primary" />,
                title: "Empathy",
                description: "We design with empathy for the end users who will interact with our AI solutions."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Data-Driven",
                description: "We make decisions based on data, constantly measuring and improving our performance."
              },
              {
                icon: <Building className="h-10 w-10 text-primary" />,
                title: "Transparency",
                description: "We believe in being open and honest with our customers, partners, and each other."
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                title: "Innovation",
                description: "We continuously explore new technologies and approaches to solve customer problems."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the talented people behind MultiplexAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Co-Founder",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "Sarah Chen",
                role: "CTO & Co-Founder",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "Michael Rodriguez",
                role: "Head of AI Research",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "Emily Taylor",
                role: "Head of Product",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "David Kim",
                role: "Lead Engineer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "Olivia Martinez",
                role: "Customer Success Lead",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "James Wilson",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              },
              {
                name: "Sophia Lee",
                role: "UX Designer",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about AI and customer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/careers">View Open Positions</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
