
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowRight, BookOpen, MessageSquare, Facebook, Instagram, FileJson, Key, Webhook, LifeBuoy } from "lucide-react";
import Layout from "@/components/Layout";
import APIDocumentation from "@/components/APIDocumentation";

const Documentation = () => {
  const [activeCopyButtons, setActiveCopyButtons] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    
    setActiveCopyButtons({ ...activeCopyButtons, [id]: true });
    setTimeout(() => {
      setActiveCopyButtons({ ...activeCopyButtons, [id]: false });
    }, 2000);
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about integrating and using MultiplexAI's powerful chatbot platform.
            </p>
          </div>

          <Tabs defaultValue="getting-started" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-1 sm:grid-cols-4 mb-8">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="platform-integration">Platform Integration</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="api-reference">API Reference</TabsTrigger>
            </TabsList>

            {/* Getting Started Tab */}
            <TabsContent value="getting-started" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Getting Started with MultiplexAI</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Welcome to MultiplexAI! This guide will help you get up and running with our platform in just a few steps.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <span className="bg-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">1</span>
                        Create an Account
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Sign up for a MultiplexAI account to get started with our platform.
                      </p>
                      <Button className="bg-primary hover:bg-primary/90">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Create an Account
                      </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <span className="bg-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">2</span>
                        Set Up Your First Chatbot
                      </h3>
                      <p className="text-gray-700 mb-3">
                        After signing in, navigate to the dashboard and click "Create New Chatbot". Follow the guided setup to configure your bot.
                      </p>
                      <div className="rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src="/placeholder.svg" 
                          alt="Dashboard screenshot" 
                          className="w-full h-48 object-cover object-top bg-gray-100" 
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <span className="bg-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">3</span>
                        Get Your API Key
                      </h3>
                      <p className="text-gray-700 mb-3">
                        To use the MultiplexAI API, you'll need an API key. You can generate one in your account settings.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li>Go to your <strong>Dashboard</strong></li>
                        <li>Click on <strong>API Keys</strong> in the sidebar</li>
                        <li>Click <strong>Generate New Key</strong></li>
                        <li>Name your key and set permissions</li>
                        <li>Copy and store your key securely</li>
                      </ol>
                      <div className="bg-gray-900 p-3 rounded-md text-gray-200 font-mono text-sm relative">
                        <pre>YOUR_API_KEY = "mltpx_sk_01234567890abcdefghijklmnopqrstuvwxyz"</pre>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2 h-8 text-gray-400 hover:text-white"
                          onClick={() => handleCopy('api-key', 'mltpx_sk_01234567890abcdefghijklmnopqrstuvwxyz')}
                        >
                          {activeCopyButtons['api-key'] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            {/* Platform Integration Tab */}
            <TabsContent value="platform-integration" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Platform Integration</h2>
                  </div>
                  <p className="text-gray-700 mb-6">
                    MultiplexAI supports integration with various messaging platforms. Follow these guides to connect your chatbot to your preferred platform.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                        Facebook Messenger Integration
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Connect your MultiplexAI chatbot to Facebook Messenger to engage with customers on this platform.
                      </p>
                      
                      <h4 className="font-medium mb-2">Prerequisites:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                        <li>A Facebook Page for your business</li>
                        <li>Admin access to the Facebook Page</li>
                        <li>MultiplexAI account with API access</li>
                      </ul>
                      
                      <h4 className="font-medium mb-2">Integration Steps:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li>Go to your MultiplexAI Dashboard</li>
                        <li>Select "Integrations" from the sidebar</li>
                        <li>Choose "Facebook Messenger"</li>
                        <li>Click "Connect to Facebook" and follow the authentication process</li>
                        <li>Select the Facebook Page you want to connect</li>
                        <li>Configure your welcome message and bot settings</li>
                        <li>Test your integration using the preview tool</li>
                      </ol>
                      
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Detailed Facebook Integration Guide
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2">
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                        </svg>
                        WhatsApp Integration
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Connect your MultiplexAI chatbot to WhatsApp to reach customers on the world's most popular messaging app.
                      </p>
                      
                      <h4 className="font-medium mb-2">Prerequisites:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                        <li>WhatsApp Business API access</li>
                        <li>A verified phone number for WhatsApp Business</li>
                        <li>MultiplexAI account with API access</li>
                      </ul>
                      
                      <h4 className="font-medium mb-2">Integration Steps:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li>Go to your MultiplexAI Dashboard</li>
                        <li>Select "Integrations" from the sidebar</li>
                        <li>Choose "WhatsApp"</li>
                        <li>Enter your WhatsApp Business API credentials</li>
                        <li>Configure your message templates</li>
                        <li>Set up automated responses and conversation flows</li>
                        <li>Test your integration using the provided test number</li>
                      </ol>
                      
                      <Button className="bg-green-600 hover:bg-green-700">
                        View Detailed WhatsApp Integration Guide
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Instagram className="h-5 w-5 text-pink-600 mr-2" />
                        Instagram Integration
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Connect your MultiplexAI chatbot to Instagram Direct Messages to engage with your Instagram audience.
                      </p>
                      
                      <h4 className="font-medium mb-2">Prerequisites:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                        <li>An Instagram Business Account</li>
                        <li>The account must be connected to a Facebook Page</li>
                        <li>Admin access to both the Instagram account and Facebook Page</li>
                      </ul>
                      
                      <h4 className="font-medium mb-2">Integration Steps:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li>Go to your MultiplexAI Dashboard</li>
                        <li>Select "Integrations" from the sidebar</li>
                        <li>Choose "Instagram"</li>
                        <li>Connect your Facebook account (which manages your Instagram business account)</li>
                        <li>Select the Instagram account you want to connect</li>
                        <li>Configure your welcome message and automated responses</li>
                        <li>Test your integration by sending a message to your Instagram account</li>
                      </ol>
                      
                      <Button className="bg-pink-600 hover:bg-pink-700">
                        View Detailed Instagram Integration Guide
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            {/* Authentication Tab */}
            <TabsContent value="authentication" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Authentication & Account Management</h2>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Learn how to manage user authentication and account settings for your MultiplexAI implementation.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3">API Authentication</h3>
                      <p className="text-gray-700 mb-4">
                        All API requests to MultiplexAI require authentication using your API key in the Authorization header.
                      </p>
                      
                      <div className="bg-gray-900 p-3 rounded-md text-gray-200 font-mono text-sm mb-4 relative">
                        <pre>
{`// Example of authenticating an API request
fetch('https://api.multiplexai.com/v1/conversation', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bot_id: 'your_bot_id',
    message: 'Hello',
    session_id: 'user123'
  })
})`}
                        </pre>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2 h-8 text-gray-400 hover:text-white"
                          onClick={() => handleCopy('auth-code', `// Example of authenticating an API request
fetch('https://api.multiplexai.com/v1/conversation', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bot_id: 'your_bot_id',
    message: 'Hello',
    session_id: 'user123'
  })
})`)}
                        >
                          {activeCopyButtons['auth-code'] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <h4 className="font-medium mb-2">API Key Security Best Practices:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                        <li>Never expose your API key in client-side code</li>
                        <li>Use environment variables to store your API key</li>
                        <li>Implement proper access controls for your API key</li>
                        <li>Rotate your API keys periodically</li>
                        <li>Use separate API keys for development and production</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3">User Sign-up and Login</h3>
                      <p className="text-gray-700 mb-4">
                        MultiplexAI provides several options for implementing user authentication in your chatbot applications.
                      </p>
                      
                      <h4 className="font-medium mb-2">Authentication Methods:</h4>
                      <div className="space-y-4 mb-4">
                        <div className="p-3 border border-gray-200 rounded-md">
                          <h5 className="font-medium">OAuth Integration</h5>
                          <p className="text-sm text-gray-700">
                            Allow users to sign in with their preferred social accounts (Google, Facebook, etc.)
                          </p>
                        </div>
                        
                        <div className="p-3 border border-gray-200 rounded-md">
                          <h5 className="font-medium">Email & Password Authentication</h5>
                          <p className="text-sm text-gray-700">
                            Traditional authentication using email verification and secure password storage.
                          </p>
                        </div>
                        
                        <div className="p-3 border border-gray-200 rounded-md">
                          <h5 className="font-medium">Single Sign-On (SSO)</h5>
                          <p className="text-sm text-gray-700">
                            Enterprise-grade SSO integration with popular identity providers.
                          </p>
                        </div>
                      </div>
                      
                      <Button className="bg-primary hover:bg-primary/90">
                        View Authentication Integration Guide
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            {/* API Reference Tab */}
            <TabsContent value="api-reference" className="bg-white rounded-lg shadow-sm border border-gray-100">
              <APIDocumentation />
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium flex items-center">
                <LifeBuoy className="h-5 w-5 text-primary mr-2" />
                Need additional help?
              </h3>
              <p className="text-gray-600">Our support team is ready to assist you with any questions.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                Contact Support
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Join Developer Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
