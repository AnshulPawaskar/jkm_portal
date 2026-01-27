import React, { useState } from 'react';
import Layout from '../components/Layout';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample inventory data
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Surface Cleaner', category: 'Cleaners', quantity: 150, unit: 'bottles', minStock: 50, price: 120 },
    { id: 2, name: 'Room Freshener', category: 'Air Fresheners', quantity: 80, unit: 'units', minStock: 30, price: 95 },
    { id: 3, name: 'Drain Cleaner', category: 'Cleaners', quantity: 200, unit: 'bottles', minStock: 60, price: 150 },
    { id: 4, name: 'Toilet Cleaner', category: 'Cleaners', quantity: 120, unit: 'bottles', minStock: 40, price: 110 },
    { id: 5, name: 'Glass Cleaner', category: 'Cleaners', quantity: 90, unit: 'bottles', minStock: 35, price: 100 },
    { id: 6, name: 'Floor Cleaner', category: 'Cleaners', quantity: 45, unit: 'liters', minStock: 50, price: 180 },
    { id: 7, name: 'Carpet Cleaner', category: 'Cleaners', quantity: 25, unit: 'bottles', minStock: 30, price: 200 },
    { id: 8, name: 'Disinfectant Spray', category: 'Sanitizers', quantity: 110, unit: 'bottles', minStock: 40, price: 135 },
  ]);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    // Placeholder for adding new inventory item
    alert('Add new inventory item functionality would go here');
  };

  return (
    <Layout title="Inventory Management">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Inventory Items</h2>
            <p className="text-gray-600 mt-1">Track and manage your products</p>
          </div>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            + Add Item
          </button>
        </div>

        {/* Search Bar and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search inventory items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>All Categories</option>
              <option>Cleaners</option>
              <option>Air Fresheners</option>
              <option>Sanitizers</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.quantity <= item.minStock 
                          ? 'bg-red-100 text-red-800' 
                          : item.quantity <= item.minStock * 1.5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {item.quantity <= item.minStock 
                          ? 'Low Stock' 
                          : item.quantity <= item.minStock * 1.5
                            ? 'Medium Stock'
                            : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Items</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{inventoryItems.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Low Stock</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {inventoryItems.filter(item => item.quantity <= item.minStock).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Categories</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {[...new Set(inventoryItems.map(item => item.category))].length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Avg. Price</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{Math.round(inventoryItems.reduce((sum, item) => sum + item.price, 0) / inventoryItems.length)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryPage;