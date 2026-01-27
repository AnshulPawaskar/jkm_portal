import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('all'); // 'all', 'pending', 'processing', 'shipped', 'delivered'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample orders data
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      orderNumber: 'ORD001', 
      customer: 'Retail Store A', 
      date: '2023-10-15', 
      items: ['Surface Cleaner', 'Room Freshener'], 
      totalAmount: 25000,
      status: 'Processing'
    },
    { 
      id: 2, 
      orderNumber: 'ORD002', 
      customer: 'Wholesale Distributor B', 
      date: '2023-10-16', 
      items: ['Drain Cleaner', 'Toilet Cleaner', 'Glass Cleaner'], 
      totalAmount: 42000,
      status: 'Shipped'
    },
    { 
      id: 3, 
      orderNumber: 'ORD003', 
      customer: 'Local Shop C', 
      date: '2023-10-17', 
      items: ['Surface Cleaner', 'Toilet Cleaner'], 
      totalAmount: 18000,
      status: 'Delivered'
    },
    { 
      id: 4, 
      orderNumber: 'ORD004', 
      customer: 'Supermarket Chain D', 
      date: '2023-10-18', 
      items: ['Room Freshener', 'Glass Cleaner', 'Drain Cleaner'], 
      totalAmount: 35000,
      status: 'Pending'
    },
    { 
      id: 5, 
      orderNumber: 'ORD005', 
      customer: 'Grocery E', 
      date: '2023-10-19', 
      items: ['Surface Cleaner', 'Room Freshener', 'Toilet Cleaner'], 
      totalAmount: 28000,
      status: 'Delivered'
    },
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = orderStatus === 'all' || order.status.toLowerCase() === orderStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddOrder = () => {
    // Placeholder for adding new order
    alert('Add new order functionality would go here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Order
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search orders..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount (₹)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <ul className="list-disc list-inside">
                          {order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : order.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Shipped'
                                ? 'bg-indigo-100 text-indigo-800'
                                : order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;