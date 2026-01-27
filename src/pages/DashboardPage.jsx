import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const menuItems = [
    { name: 'Inventory Management', path: '/inventory', description: 'Manage product inventory', icon: '📦', color: 'bg-blue-500' },
    { name: 'Purchase Bills', path: '/purchase-bills', description: 'View and manage purchase bills (GST & Non-GST)', icon: '📥', color: 'bg-green-500' },
    { name: 'Sales Bills', path: '/sales-bills', description: 'View and manage sales bills (GST & Non-GST)', icon: '📤', color: 'bg-purple-500' },
    { name: 'Raw Materials', path: '/raw-materials', description: 'Manage raw materials', icon: '🏭', color: 'bg-yellow-500' },
    { name: 'Orders', path: '/orders', description: 'Manage customer orders', icon: '📋', color: 'bg-pink-500' },
    { name: 'Clients', path: '/clients', description: 'Manage client information', icon: '👥', color: 'bg-indigo-500' },
    { name: 'Reports', path: '/reports', description: 'Generate business reports', icon: '📈', color: 'bg-teal-500' },
  ];

  return (
    <Layout title="Dashboard">
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to JKM Enterprises Portal</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{item.name}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Total Products</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">156</div>
              <div className="text-green-500 text-sm mt-1">↑ 12% from last month</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Total Sales</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">₹2,45,000</div>
              <div className="text-green-500 text-sm mt-1">↑ 8% from last month</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Active Orders</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
              <div className="text-orange-500 text-sm mt-1">↓ 3 from last week</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Pending Bills</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">12</div>
              <div className="text-red-500 text-sm mt-1">↑ 2 from yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;