import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesBillsPage = () => {
  const navigate = useNavigate();
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
              <h1 className="text-xl font-bold text-gray-900">Sales Bills</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Sales Bills</h2>
              <button
                onClick={handleAddBill}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Bill
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search bills..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={billType}
                onChange={(e) => setBillType(e.target.value)}
              >
                <option value="all">All Bills</option>
                <option value="gst">GST Bills</option>
                <option value="non-gst">Non-GST Bills</option>
              </select>
            </div>

            {/* Bills Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    <tr key={bill.id}>
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
        </div>
      </main>
    </div>
  );
};

export default SalesBillsPage;