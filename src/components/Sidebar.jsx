import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Radio,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  LayoutGrid,
  Bot,
  UserCheck
} from 'lucide-react';

const Sidebar = ({ isOpen, toggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Widgets', path: '/', icon: LayoutGrid },
    { name: 'Radio Station', path: '/radio', icon: Radio },
    { name: 'Raven AI', path: '/raven', icon: Bot },
    { name: 'Discord Bot', path: '/discord', icon: Settings },
    { name: 'Members', path: '/members', icon: Users },
  ];

  if (user?.role === 'OWNER' || user?.role === 'ADMIN') {
    navItems.push({ name: 'Manage Users', path: '/admin/users', icon: UserCheck });
  }

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-20'} border-r border-gray-800`}>
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-800">
        <h1 className={`font-bold text-xl truncate ${!isOpen && 'hidden'}`}>Dashboard</h1>
        <button onClick={toggle} className="p-2 hover:bg-gray-800 rounded">
            {/* Simple hamburger/close icon toggle */}
            <div className="space-y-1.5 cursor-pointer">
                <span className="block w-6 h-0.5 bg-gray-400"></span>
                <span className="block w-6 h-0.5 bg-gray-400"></span>
                <span className="block w-6 h-0.5 bg-gray-400"></span>
            </div>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-800 border-r-4 border-blue-500' : ''
                  }`
                }
                title={!isOpen ? item.name : ''}
              >
                <item.icon size={24} />
                <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center mb-4 ${!isOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className={`ml-3 ${!isOpen && 'hidden'}`}>
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded transition-colors ${!isOpen && 'justify-center'}`}
          title={!isOpen ? 'Logout' : ''}
        >
          <LogOut size={20} />
          <span className={`ml-4 ${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
