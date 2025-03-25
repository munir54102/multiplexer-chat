
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Zap, Lock, Globe, PenTool, BarChart3, Users, Smartphone, Facebook, Instagram, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import ChatDemo from "@/components/ChatDemo";
import PlatformCard from "@/components/PlatformCard";
import LiveChatDemo from "@/components/LiveChatDemo";
import PricingTable from "@/components/PricingTable";
import Testimonials from "@/components/Testimonials";
import PlatformIntegrations from "@/components/PlatformIntegrations";
import AIFeatures from "@/components/AIFeatures";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import BlogSection from "@/components/BlogSection";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import APIDocumentation from "@/components/APIDocumentation";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                <span className="text-gradient-primary">AI-Powered Chatbots</span> for Every Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Connect with your customers across WhatsApp, Facebook, Instagram, and your website with intelligent chatbots that drive sales and streamline support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">See Features</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Trusted by <span className="font-medium">1,000+</span> businesses
                </span>
              </div>
            </div>
            <div className="hidden lg:block lg:animate-fade-in lg:animation-delay-200">
              <LiveChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Enhanced Engagement
            </h2>
            <p className="text-lg text-gray-600">
              Our AI-powered platform offers everything you need to create engaging customer experiences across multiple channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Multi-Platform Integration"
              description="Connect your chatbot to WhatsApp, Facebook, Instagram, and your website with seamless integration."
              delay={100}
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="AI-Powered Responses"
              description="Leverage advanced AI to provide personalized and context-aware responses to customer inquiries."
              delay={200}
            />
            <FeatureCard
              icon={<PenTool className="h-6 w-6" />}
              title="Visual Flow Builder"
              description="Design conversation flows with our intuitive drag-and-drop interface - no coding required."
              delay={300}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Analytics Dashboard"
              description="Track performance, measure conversions, and gain insights into customer interactions."
              delay={400}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Live Agent Takeover"
              description="Seamlessly transition from bot to human agent when complex issues require personal attention."
              delay={500}
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6" />}
              title="Secure & Compliant"
              description="Enterprise-grade security and compliance with global data protection regulations."
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto">
          <AIFeatures />
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <PlatformIntegrations />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <CaseStudies />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for your business needs.
            </p>
          </div>
          
          <PricingTable />
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Onboarding Tutorial Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <OnboardingTutorial />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <FAQ />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <BlogSection />
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <APIDocumentation />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-primary rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
            <div className="relative z-10 px-6 py-16 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Customer Engagement?
                </h2>
                <p className="text-lg text-white/90 mb-0 md:pr-12">
                  Start building intelligent chatbots today and see the difference in your customer satisfaction and sales.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end animate-fade-in animation-delay-200">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
