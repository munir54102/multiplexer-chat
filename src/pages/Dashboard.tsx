
import { useState } from "react";
import Layout from "@/components/Layout";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCcw, Filter, Download, Plus } from "lucide-react";

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
                {activeTab === "settings" && <SettingsSection activeSection={activeSection} />}
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
      <h2 className="text-xl font-semibold mb-4">Actions</h2>
      <div className="border border-gray-200 rounded-lg min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No actions configured yet</p>
      </div>
    </div>
  );
};

// Contacts Section
const ContactsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>
      <div className="border border-gray-200 rounded-lg min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No contacts found</p>
      </div>
    </div>
  );
};

// Connect Section
const ConnectSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Connect</h2>
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Embed</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-2">
              <input type="radio" checked className="mt-1 mr-2" />
              <div>
                <h4 className="font-medium">Embed a chat bubble</h4>
                <div className="text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 inline-block mb-2">Recommended</div>
                <p className="text-sm text-gray-600">Embed a chat bubble on your website. Allows you to use all the advanced features of the agent.</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <input type="radio" className="mt-1 mr-2" />
              <div>
                <h4 className="font-medium">Embed the iframe directly</h4>
                <p className="text-sm text-gray-600">Add the agent anywhere on your website</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Section
const SettingsSection = ({ activeSection }: { activeSection: string }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">General</h2>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
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
            value="czone.com.pk" 
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
      </div>
    </div>
  );
};

export default Dashboard;
