import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePermissions } from '../../hooks/useRedux';
import { 
  Home,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { hasPermission } = usePermissions();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, permission: 'read' },
  ];

  const filteredNavItems = navItems.filter(item => hasPermission(item.permission));

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full shadow-lg`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-700 dark:text-white">
                  Alerts Studio
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Wells Fargo
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-primary-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-primary-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200 shadow-md border-r-2 border-primary-500'
                  : 'text-gray-700 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-primary-600'
              }`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;