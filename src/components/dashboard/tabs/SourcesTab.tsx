
import React, { useState } from "react";

const SourcesTab = () => {
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
                <button className="p-1 border border-gray-200 rounded">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
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

export default SourcesTab;
