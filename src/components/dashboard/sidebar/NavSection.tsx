
import { LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavSectionProps {
  heading: string;
  items: NavItem[];
  activeTab: string;
  handleNav: (id: string) => void;
  isHighlighted?: boolean;
}

const NavSection = ({ heading, items, activeTab, handleNav, isHighlighted = false }: NavSectionProps) => {
  return (
    <div className={`mb-6 ${isHighlighted ? 'border-l-2 border-primary pl-2' : ''}`}>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{heading}</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleNav(item.id)}
              className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavSection;
