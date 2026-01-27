import React, { useState } from 'react';
import Layout from '../components/Layout';

const SalesBillsPage = () => {
  const [billType, setBillType] = useState('all'); // 'all', 'gst', 'non-gst'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample sales bills data
  const [salesBills, setSalesBills] = useState([
    { 
      id: 1, 
      billNumber: 'SB001', 
      customer: 'Retail Store A', 
      date: '2023-10-16', 
      totalAmount: 28000, 
      gst: true,
      gstAmount: 5040,
      status: 'Paid'
    },
    { 
      id: 2, 
      billNumber: 'SB002', 
      customer: 'Wholesale Distributor B', 
      date: '2023-10-19', 
      totalAmount: 42000, 
      gst: true,
      gstAmount: 7560,
      status: 'Pending'
    },
    { 
      id: 3, 
      billNumber: 'SB003', 
      customer: 'Local Shop C', 
      date: '2023-10-21', 
      totalAmount: 15000, 
      gst: false,
      gstAmount: 0,
      status: 'Paid'
    },
    { 
      id: 4, 
      billNumber: 'SB004', 
      customer: 'Supermarket Chain D', 
      date: '2023-10-23', 
      totalAmount: 58000, 
      gst: true,
      gstAmount: 10440,
      status: 'Paid'
    },
    { 
      id: 5, 
      billNumber: 'SB005', 
      customer: 'Grocery E', 
      date: '2023-10-26', 
      totalAmount: 22000, 
      gst: false,
      gstAmount: 0,
      status: 'Pending'
    },
    { 
      id: 6, 
      billNumber: 'SB006', 
      customer: 'Department Store F', 
      date: '2023-10-28', 
      totalAmount: 35000, 
      gst: true,
      gstAmount: 6300,
      status: 'Paid'
    },
    { 
      id: 7, 
      billNumber: 'SB007', 
      customer: 'Pharmacy G', 
      date: '2023-10-30', 
      totalAmount: 18000, 
      gst: false,
      gstAmount: 0,
      status: 'Pending'
    },
  ]);

  const filteredBills = salesBills.filter(bill => {
    const matchesType = billType === 'all' || 
                       (billType === 'gst' && bill.gst) || 
                       (billType === 'non-gst' && !bill.gst);
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddBill = () => {
    // Placeholder for adding new sales bill
    alert('Add new sales bill functionality would go here');
  };

  return (
    <Layout title="Sales Bills">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Sales Bills</h2>
            <p className="text-gray-600 mt-1">Manage and track your sales transactions</p>
          </div>
          <button
            onClick={handleAddBill}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            + Add Bill
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search bills..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
          >
            <option value="all">All Bills</option>
            <option value="gst">GST Bills</option>
            <option value="non-gst">Non-GST Bills</option>
          </select>
        </div>

        {/* Bills Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GST Amount (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bill.billNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bill.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(bill.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bill.gst ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {bill.gst ? 'GST' : 'Non-GST'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{bill.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bill.gst ? `₹${bill.gstAmount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bill.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bill.status}
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
            <div className="text-gray-500 text-sm">Total Bills</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{salesBills.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Revenue</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{salesBills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Paid Bills</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {salesBills.filter(bill => bill.status === 'Paid').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Pending</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {salesBills.filter(bill => bill.status === 'Pending').length}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesBillsPage;