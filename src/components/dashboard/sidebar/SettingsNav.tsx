
import { LucideIcon } from "lucide-react";

interface SettingsItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SettingsNavProps {
  items: SettingsItem[];
  activeTab: string;
  activeSection: string;
  handleSettingsNav: (id: string) => void;
}

const SettingsNav = ({ items, activeTab, activeSection, handleSettingsNav }: SettingsNavProps) => {
  return (
    <>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h2>
      <ul className="space-y-1 mb-6">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleSettingsNav(item.id)}
              className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${
                activeTab === 'settings' && activeSection === item.id
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
    </>
  );
};

export default SettingsNav;
