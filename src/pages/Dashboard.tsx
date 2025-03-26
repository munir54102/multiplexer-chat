
import { useState } from "react";
import Layout from "@/components/Layout";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Calendar from "@/components/Calendar";
import Eye from "@/components/Eye";
import { 
  MessageSquare, 
  RefreshCcw, 
  Filter, 
  Download, 
  Plus, 
  Copy, 
  ShieldCheck, 
  Key, 
  Code, 
  UserPlus,
  BellRing,
  Webhook,
  Globe
} from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [activeTab, setActiveTab] = useState("playground");

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto pt-20">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Dashboard Sidebar */}
            <DashboardSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
            
            {/* Dashboard Content */}
            <div className="flex-1 min-h-[80vh]">
              {/* Dashboard Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-6 px-6">
                  <button
                    onClick={() => setActiveTab("playground")}
                    className={`py-4 px-2 relative ${activeTab === "playground" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Playground
                    {activeTab === "playground" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className={`py-4 px-2 relative ${activeTab === "activity" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Activity
                    {activeTab === "activity" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`py-4 px-2 relative ${activeTab === "analytics" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Analytics
                    {activeTab === "analytics" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("sources")}
                    className={`py-4 px-2 relative ${activeTab === "sources" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Sources
                    {activeTab === "sources" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("actions")}
                    className={`py-4 px-2 relative flex items-center ${activeTab === "actions" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Actions
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5">New</span>
                    {activeTab === "actions" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className={`py-4 px-2 relative flex items-center ${activeTab === "contacts" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Contacts
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5">New</span>
                    {activeTab === "contacts" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("connect")}
                    className={`py-4 px-2 relative ${activeTab === "connect" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Connect
                    {activeTab === "connect" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`py-4 px-2 relative ${activeTab === "settings" ? "text-primary font-medium" : "text-gray-600"}`}
                  >
                    Settings
                    {activeTab === "settings" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                  </button>
                </div>
              </div>
              
              {/* Dashboard Content Based on Tab */}
              <div className="p-6">
                {activeTab === "playground" && <PlaygroundSection />}
                {activeTab === "activity" && <ActivitySection />}
                {activeTab === "analytics" && <AnalyticsSection />}
                {activeTab === "sources" && <SourcesSection />}
                {activeTab === "actions" && <ActionsSection />}
                {activeTab === "contacts" && <ContactsSection />}
                {activeTab === "connect" && <ConnectSection />}
                {activeTab === "settings" && (
                  <>
                    {activeSection === "general" && <GeneralSection />}
                    {activeSection === "ai" && <AISection />}
                    {activeSection === "chat" && <ChatInterfaceSection />}
                    {activeSection === "security" && <SecuritySection />}
                    {activeSection === "leads" && <LeadsSection />}
                    {activeSection === "notifications" && <NotificationsSection />}
                    {activeSection === "webhooks" && <WebhooksSection />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Playground Section
const PlaygroundSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Playground</h2>
        <Button variant="outline" size="sm">Compare</Button>
      </div>
      <div className="mt-6 border border-gray-200 rounded-lg p-6 min-h-[400px] bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 mb-auto mt-16">
          <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
            Hi! What can I help you with?
          </div>
          <div className="flex mt-auto">
            <input 
              type="text" 
              placeholder="Message..." 
              className="flex-1 p-2 border border-gray-200 rounded-l-lg focus:outline-none" 
            />
            <button className="bg-primary text-white p-2 rounded-r-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Section
const ActivitySection = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <h2 className="text-xl font-semibold">Chat logs</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No chats found</p>
      </div>
    </div>
  );
};

// Analytics Section
const AnalyticsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Total Conversations</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Avg. Response Time</h3>
          <p className="text-2xl font-bold">0s</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-1">Resolution Rate</h3>
          <p className="text-2xl font-bold">0%</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500">No analytics data available yet</p>
      </div>
    </div>
  );
};

// Sources Section
const SourcesSection = () => {
  const [activeSource, setActiveSource] = useState("files");
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sources</h2>
      <div className="flex">
        <div className="w-64 border-r border-gray-200 pr-4">
          <ul className="space-y-1">
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'files' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('files')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span>Files</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'text' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('text')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 7 4 4 20 4 20 7"></polyline>
                  <line x1="9" y1="20" x2="15" y2="20"></line>
                  <line x1="12" y1="4" x2="12" y2="20"></line>
                </svg>
                <span>Text</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'website' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('website')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>Website</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'qa' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('qa')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Q&A</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center space-x-2 p-2 w-full rounded-lg text-left ${activeSource === 'notion' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSource('notion')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"></path>
                  <path d="M22 7l-10 5L2 7"></path>
                </svg>
                <span>Notion</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1 pl-6">
          {activeSource === 'files' && (
            <div className="border border-dashed border-gray-300 rounded-lg p-10 text-center min-h-[300px] flex flex-col items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p className="mb-2">Drag & drop files here, or click to select files</p>
              <p className="text-sm text-gray-500">Supported File Types: .pdf, .doc, .docx, .txt</p>
            </div>
          )}
          {activeSource === 'text' && (
            <div className="border border-gray-200 rounded-lg min-h-[300px]">
              <textarea 
                placeholder="Enter text ..." 
                className="w-full h-full min-h-[300px] p-4 rounded-lg focus:outline-none resize-none"
              ></textarea>
            </div>
          )}
          {activeSource === 'website' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Website</h3>
              <div className="mb-4">
                <p className="text-sm mb-2 font-medium">Crawl</p>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="https://www.example.com" 
                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg">
                    Fetch more links
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">This will crawl all the links starting with the URL (not including files on the website).</p>
              </div>
              
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <p className="px-4 text-sm text-gray-500">OR</p>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm mb-2 font-medium">Submit Sitemap</p>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="https://www.example.com/sitemap.xml" 
                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg">
                    Load additional sitemap
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeSource === 'qa' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Q&A</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="border border-gray-200 rounded-lg min-h-[300px] flex items-center justify-center">
                <p className="text-gray-500">No Q&A entries yet</p>
              </div>
            </div>
          )}
          {activeSource === 'notion' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Notion</h3>
              <div className="border border-gray-200 rounded-lg p-8 text-center">
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"></path>
                    <path d="M22 7l-10 5L2 7"></path>
                  </svg>
                  Import from Notion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Actions Section
const ActionsSection = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Actions</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Action
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">What are Actions?</h3>
          <p className="text-gray-600 mb-4">
            Actions allow your chatbot to perform specific tasks based on user inputs. You can create custom actions to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>Retrieve data from your systems</li>
            <li>Submit forms or process orders</li> 
            <li>Book appointments</li>
            <li>Generate personalized content</li>
          </ul>
          <Button>Create your first action</Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Action Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-blue-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <Code className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium mb-1">API Call</h4>
              <p className="text-gray-600 text-sm">Connect to your external APIs</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-green-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium mb-1">Email Notification</h4>
              <p className="text-gray-600 text-sm">Send email notifications</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
              <div className="bg-purple-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-medium mb-1">Calendar</h4>
              <p className="text-gray-600 text-sm">Book appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contacts Section
const ContactsSection = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" /> Add Contact
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
          <Input 
            placeholder="Search contacts..." 
            className="max-w-xs"
          />
          <div className="text-sm text-gray-500">0 contacts</div>
        </div>
        
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
          <UserPlus className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
          <p className="text-gray-500 text-center mb-4">Start adding contacts or import them from your existing CRM</p>
          <div className="flex space-x-3">
            <Button>Add Contact</Button>
            <Button variant="outline">Import Contacts</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Connect Section with enhanced content
const ConnectSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Connect</h2>
      
      {/* Embed Options */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Embed</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Bubble Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <input type="radio" checked id="chat-bubble" className="mt-1 mr-2" />
              <div>
                <label htmlFor="chat-bubble" className="font-medium block mb-1">Embed a chat bubble</label>
                <div className="text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 inline-block mb-2">Recommended</div>
                <p className="text-sm text-gray-600">Embed a chat bubble on your website. Allows you to use all the advanced features of the agent.</p>
              </div>
            </div>
            
            <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">JavaScript Snippet</span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                {`<script>
  (function(d,t) {
    var g=d.createElement(t),
    s=d.getElementsByTagName(t)[0];
    g.src="https://multiplexai.com/widget/chat.js";
    g.defer=true;
    g.async=true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.multiplexAI.init({
        botId: "YOUR_BOT_ID"
      })
    }
  })(document,"script");
</script>`}
              </pre>
            </div>
          </div>
          
          {/* Iframe Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <input type="radio" id="iframe" className="mt-1 mr-2" />
              <div>
                <label htmlFor="iframe" className="font-medium block mb-1">Embed the iframe directly</label>
                <p className="text-sm text-gray-600">Add the agent anywhere on your website</p>
              </div>
            </div>
            
            <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">HTML Code</span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                {`<iframe
  src="https://multiplexai.com/chat/YOUR_BOT_ID"
  width="100%" 
  height="600px"
  frameborder="0"
></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* API Integration */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">API Integration</h3>
        <p className="text-gray-600 mb-4">
          Connect your agent to custom applications or third-party services using our API.
        </p>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Your API Key</h4>
          <div className="flex">
            <Input type="password" value="••••••••••••••••••••••••••••••" disabled className="rounded-r-none" />
            <Button variant="outline" className="rounded-l-none border-l-0">
              <Eye className="h-4 w-4 mr-2" />
              Show
            </Button>
            <Button variant="outline" className="ml-2">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Keep your API key secret. Do not share it in publicly accessible areas such as GitHub, client-side code, etc.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-2">Quick Start</h4>
          <p className="text-sm text-gray-600 mb-3">
            Make a request to our conversation API to interact with your agent:
          </p>
          <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto mb-3">
            {`curl -X POST \\
  https://api.multiplexai.com/v1/conversation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bot_id": "YOUR_BOT_ID",
    "message": "Hello",
    "session_id": "user123"
  }'`}
          </pre>
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" /> View Full API Documentation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <Globe className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">WhatsApp</h4>
            <p className="text-gray-600 text-sm mb-3">Connect your WhatsApp Business account</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <MessageSquare className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">Facebook Messenger</h4>
            <p className="text-gray-600 text-sm mb-3">Connect to Facebook Messenger</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
            <MessageSquare className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium mb-1">Instagram</h4>
            <p className="text-gray-600 text-sm mb-3">Connect to Instagram Direct Messages</p>
            <Button variant="outline" size="sm" className="w-full">Configure</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// General Settings Section
const GeneralSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">General Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Agent ID</h3>
          <div className="flex">
            <input 
              type="text" 
              value="Dkkn7kDrggtcMDYtrHkP" 
              disabled
              className="flex-1 border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
            <button className="ml-2 p-2 border border-gray-300 rounded-lg">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Size</h3>
          <p className="text-xl font-medium">68,715 characters</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Name</h3>
          <input 
            type="text" 
            value="MultiplexAI Agent" 
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-700">Credit limit</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
              <div className="bg-blue-600 h-2.5 rounded-full w-[15%]"></div>
            </div>
            <span className="text-sm text-gray-600">15%</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Language</h3>
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese (Simplified)</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Timezone</h3>
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>(GMT-05:00) Eastern Time (US & Canada)</option>
            <option>(GMT+00:00) UTC</option>
            <option>(GMT+01:00) Central European Time</option>
            <option>(GMT+08:00) China Standard Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// AI Settings Section
const AISection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">AI Settings</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Model Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="model" className="mb-1 block">AI Model</Label>
            <select id="model" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="gpt-4">GPT-4 (Recommended)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-v2">Claude 2</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              GPT-4 provides the best performance but uses more credits
            </p>
          </div>
          
          <div>
            <Label htmlFor="temperature" className="mb-1 block">Temperature</Label>
            <div className="flex items-center">
              <input 
                type="range" 
                id="temperature"
                min="0" 
                max="1" 
                step="0.1" 
                defaultValue="0.7" 
                className="w-full mr-4"
              />
              <span className="text-sm font-medium">0.7</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Higher values make output more creative, lower values make it more deterministic
            </p>
          </div>
          
          <div>
            <Label htmlFor="max-tokens" className="mb-1 block">Max Response Length</Label>
            <Input 
              id="max-tokens"
              type="number" 
              defaultValue="1024" 
              className="w-full" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of tokens in AI responses
            </p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Personality</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="persona" className="mb-1 block">Agent Persona</Label>
            <Textarea 
              id="persona"
              placeholder="Describe how your agent should interact with users..." 
              className="min-h-[120px]"
              defaultValue="Friendly, helpful, and knowledgeable customer support agent who is patient and always provides accurate information. Maintains a professional tone while being conversational."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="emojis" />
            <Label htmlFor="emojis">Allow emojis in responses</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="humor" />
            <Label htmlFor="humor">Allow light humor</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Training</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="training-data" className="mb-1 block">Training Frequency</Label>
            <select id="training-data" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="auto-improve" defaultChecked />
            <Label htmlFor="auto-improve">Auto-improve from conversations</Label>
          </div>
          
          <Button>Train Model Now</Button>
        </div>
      </div>
    </div>
  );
};

// Chat Interface Section
const ChatInterfaceSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Chat Interface</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Appearance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="primary-color" className="mb-1 block">Primary Color</Label>
            <div className="flex">
              <input 
                type="color" 
                id="primary-color"
                defaultValue="#4f46e5" 
                className="h-10 w-10 rounded-l-md border border-gray-300"
              />
              <Input 
                type="text" 
                defaultValue="#4f46e5" 
                className="rounded-l-none" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="chat-position" className="mb-1 block">Chat Position</Label>
            <select id="chat-position" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="bubble-icon" className="mb-1 block">Bubble Icon</Label>
            <select id="bubble-icon" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="chat">Chat Bubble</option>
              <option value="bot">Robot</option>
              <option value="help">Help</option>
              <option value="custom">Custom (Upload)</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="chat-window-size" className="mb-1 block">Chat Window Size</Label>
            <select id="chat-window-size" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="medium">Medium (Default)</option>
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Messages</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="welcome-message" className="mb-1 block">Welcome Message</Label>
            <Textarea 
              id="welcome-message"
              defaultValue="👋 Hi there! How can I help you today?"
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="away-message" className="mb-1 block">Away Message</Label>
            <Textarea 
              id="away-message"
              defaultValue="Thanks for your message! Our team is currently away but we'll get back to you as soon as possible."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="typing-indicator" defaultChecked />
            <Label htmlFor="typing-indicator">Show typing indicator</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="read-receipts" defaultChecked />
            <Label htmlFor="read-receipts">Show read receipts</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">User Input</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="input-placeholder" className="mb-1 block">Input Placeholder</Label>
            <Input 
              id="input-placeholder"
              defaultValue="Type your message here..." 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="attachments" defaultChecked />
            <Label htmlFor="attachments">Allow file attachments</Label>
          </div>
          
          <div>
            <Label htmlFor="suggested-messages" className="mb-1 block">Suggested Messages</Label>
            <Textarea 
              id="suggested-messages"
              placeholder="Add comma-separated messages that will be suggested to the user"
              defaultValue="Tell me about your services, How do I get started?, What are your pricing plans?"
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              These will appear as clickable options for users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Section
const SecuritySection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Security</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Access Control</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="content-control" className="mb-1 block">Content Filtering</Label>
            <select id="content-control" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="standard">Standard (Recommended)</option>
              <option value="strict">Strict</option>
              <option value="minimal">Minimal</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="profanity-filter" defaultChecked />
            <Label htmlFor="profanity-filter">Enable profanity filter</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="pii-redaction" defaultChecked />
            <Label htmlFor="pii-redaction">Automatically redact PII</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Privacy</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="data-retention" defaultChecked />
            <Label htmlFor="data-retention">Store conversation history</Label>
          </div>
          
          <div>
            <Label htmlFor="retention-period" className="mb-1 block">Data Retention Period</Label>
            <select id="retention-period" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="forever">Forever</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="anonymize-ips" defaultChecked />
            <Label htmlFor="anonymize-ips">Anonymize IP addresses</Label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">SSL Encryption Enabled</span>
          </div>
          
          <div>
            <Label htmlFor="domain-restriction" className="mb-1 block">Domain Restriction</Label>
            <Textarea 
              id="domain-restriction"
              placeholder="Enter allowed domains separated by commas (leave empty for no restrictions)"
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Restrict chat widget to only appear on specific domains
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="api-key-rotation" />
            <Label htmlFor="api-key-rotation">Auto-rotate API keys every 90 days</Label>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" className="flex items-center">
              <Key className="h-4 w-4 mr-2" /> Manage API Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Leads Section
const LeadsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Leads</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Lead Capture</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="lead-capture" />
            <Label htmlFor="lead-capture">Enable lead capture form</Label>
          </div>
          
          <div>
            <Label htmlFor="capture-timing" className="mb-1 block">When to ask for information</Label>
            <select id="capture-timing" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="start">At the start of conversation</option>
              <option value="intent">When specific intent is detected</option>
              <option value="time">After time threshold (2 minutes)</option>
              <option value="end">At the end of conversation</option>
            </select>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Fields to Capture</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="name" className="mr-2" checked />
                <Label htmlFor="name">Name</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="email" className="mr-2" checked />
                <Label htmlFor="email">Email</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required" selected>Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="phone" className="mr-2" />
                <Label htmlFor="phone">Phone Number</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="company" className="mr-2" />
                <Label htmlFor="company">Company</Label>
                <div className="ml-auto">
                  <select className="text-xs border border-gray-300 rounded p-1">
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Lead Integrations</h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive lead notifications via email</p>
              </div>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-gray-600">Send leads to a Slack channel</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">CRM Integration</h4>
                <p className="text-sm text-gray-600">Connect with HubSpot, Salesforce, etc.</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13Z" fill="#2563EB"/>
                  <path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="#2563EB"/>
                  <path d="M12 17C13.667 17 15 15.6673 15 14L9 14C9.00001 15.6673 10.333 17 12 17Z" fill="#2563EB"/>
                  <path d="M21 15C21 15.5523 20.5523 16 20 16H19V11C19 7.73308 16.7274 5.0243 13.6494 4.25039C13.8668 3.93672 14 3.55321 14 3.13081C14 2.00741 13.1077 1.09375 12 1.09375C10.8924 1.09375 10 2.00744 10 3.13081C10 3.56396 10.1392 3.9578 10.3673 4.27547C7.32069 5.07135 5.08488 7.75311 5.05128 10.9887L5 11V16H4C3.44772 16 3 15.5523 3 15C3 14.4477 3.44772 14 4 14V13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11V10C3.44772 10 3 9.55228 3 9C3 8.44772 3.44772 8 4 8H5.06659C5.50982 5.6292 7.33731 3.71698 9.69188 3.18099C9.89458 3.83105 10.396 4.35319 11.0372 4.54964C11.0124 4.5507 10.9876 4.5519 10.9626 4.55326C11.3046 4.5194 11.651 4.50181 12 4.50181C12.3435 4.50181 12.6851 4.51891 13.0216 4.55162C13.0012 4.5506 12.9807 4.54972 12.9603 4.549C13.6069 4.35799 14.1115 3.83441 14.3132 3.17892C16.6797 3.7022 18.5233 5.61725 18.9581 8H20C20.5523 8 21 8.44772 21 9C21 9.55228 20.5523 10 20 10V11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13V14C20.5523 14 21 14.4477 21 15ZM7 12H17V16H7V12Z" fill="#2563EB"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Zapier</h4>
                <p className="text-sm text-gray-600">Connect with 3,000+ apps</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Section
const NotificationsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notifications</h2>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New Conversations</h4>
              <p className="text-sm text-gray-600">When a new user starts a chat</p>
            </div>
            <Switch id="new-convo" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Unresolved Issues</h4>
              <p className="text-sm text-gray-600">When the AI couldn't resolve a user query</p>
            </div>
            <Switch id="unresolved" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Daily Summary</h4>
              <p className="text-sm text-gray-600">Daily recap of all conversations</p>
            </div>
            <Switch id="daily-summary" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Analytics</h4>
              <p className="text-sm text-gray-600">Weekly performance report</p>
            </div>
            <Switch id="weekly-analytics" defaultChecked />
          </div>
          
          <div>
            <Label htmlFor="email-recipients" className="mb-1 block">Recipients</Label>
            <Input 
              id="email-recipients"
              placeholder="Enter email addresses separated by commas"
              defaultValue="admin@example.com, support@example.com"
            />
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Mobile Push Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="enable-push" />
            <Label htmlFor="enable-push">Enable push notifications</Label>
          </div>
          
          <Button variant="outline">Configure Mobile App</Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Integrations</h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <BellRing className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-gray-600">Get notified in Slack</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Microsoft Teams</h4>
                <p className="text-sm text-gray-600">Get notified in Teams</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Discord</h4>
                <p className="text-sm text-gray-600">Get notified in Discord</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Webhooks Section
const WebhooksSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Webhooks</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Send data to your systems when events occur in MultiplexAI</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Webhook
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Available Events</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="convo-started" className="rounded" />
            <Label htmlFor="convo-started">conversation.started</Label>
            <span className="text-sm text-gray-500">When a new conversation begins</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="message-received" className="rounded" />
            <Label htmlFor="message-received">message.received</Label>
            <span className="text-sm text-gray-500">When a user sends a message</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="message-sent" className="rounded" />
            <Label htmlFor="message-sent">message.sent</Label>
            <span className="text-sm text-gray-500">When the AI sends a message</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="convo-ended" className="rounded" />
            <Label htmlFor="convo-ended">conversation.ended</Label>
            <span className="text-sm text-gray-500">When a conversation is completed</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="lead-captured" className="rounded" />
            <Label htmlFor="lead-captured">lead.captured</Label>
            <span className="text-sm text-gray-500">When user contact info is collected</span>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Endpoint Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url" className="mb-1 block">Webhook URL</Label>
            <Input 
              id="webhook-url"
              placeholder="https://your-server.com/webhook" 
            />
          </div>
          
          <div>
            <Label htmlFor="secret-key" className="mb-1 block">Secret Key</Label>
            <div className="flex">
              <Input 
                id="secret-key"
                type="password" 
                value="••••••••••••••••••••••" 
                className="rounded-r-none"
              />
              <Button variant="outline" className="rounded-l-none border-l-0">
                <Eye className="h-4 w-4 mr-2" /> Show
              </Button>
              <Button variant="outline" className="ml-2">
                <RefreshCcw className="h-4 w-4 mr-2" /> Generate
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used to verify webhook payloads are coming from MultiplexAI
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <Button className="mr-3">Save Webhook</Button>
            <Button variant="outline">Test Webhook</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
