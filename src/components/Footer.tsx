
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-gradient-primary">MultiplexAI</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Revolutionizing customer interactions with AI-powered chatbots that deliver seamless experiences across multiple platforms.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/features" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} MultiplexAI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="mailto:contact@multiplexai.com" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
              <Mail size={16} className="mr-2" />
              contact@multiplexai.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
