import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children, title }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Purchase Bills', path: '/purchase-bills', icon: '📥' },
    { name: 'Sales Bills', path: '/sales-bills', icon: '📤' },
    { name: 'Raw Materials', path: '/raw-materials', icon: '🏭' },
    { name: 'Orders', path: '/orders', icon: '📋' },
    { name: 'Clients', path: '/clients', icon: '👥' },
    { name: 'Reports', path: '/reports', icon: '📈' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold flex items-center">
            <span className="mr-2">JKLM</span>
            <span className="hidden md:inline">JKM Enterprises</span>
          </h1>
          <button 
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-6 overflow-y-auto flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-indigo-800 text-white border-l-4 border-white'
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-600">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10 sticky top-0">
          <div className="flex justify-between items-center px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                Welcome back! 👋
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;