import React, { useState } from 'react';
import Layout from '../components/Layout';

const OrdersPage = () => {
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
    { 
      id: 6, 
      orderNumber: 'ORD006', 
      customer: 'Pharmacy F', 
      date: '2023-10-20', 
      items: ['Surface Cleaner', 'Toilet Cleaner', 'Glass Cleaner'], 
      totalAmount: 32000,
      status: 'Processing'
    },
    { 
      id: 7, 
      orderNumber: 'ORD007', 
      customer: 'Department Store G', 
      date: '2023-10-21', 
      items: ['Room Freshener', 'Drain Cleaner'], 
      totalAmount: 22000,
      status: 'Shipped'
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
    <Layout title="Orders">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
            <p className="text-gray-600 mt-1">Manage and track customer orders</p>
          </div>
          <button
            onClick={handleAddOrder}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            + Add Order
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
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
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
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
                          <li key={index} className="truncate" title={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Orders</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Pending Orders</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {orders.filter(order => order.status === 'Pending').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Completed</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter(order => order.status === 'Delivered').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Revenue</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;