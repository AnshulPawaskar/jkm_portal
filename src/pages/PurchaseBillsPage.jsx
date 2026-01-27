import React, { useState } from 'react';
import Layout from '../components/Layout';

const PurchaseBillsPage = () => {
  const [billType, setBillType] = useState('all'); // 'all', 'gst', 'non-gst'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample purchase bills data
  const [purchaseBills, setPurchaseBills] = useState([
    { 
      id: 1, 
      billNumber: 'PB001', 
      supplier: 'ABC Chemicals', 
      date: '2023-10-15', 
      totalAmount: 45000, 
      gst: true,
      gstAmount: 8100,
      status: 'Paid'
    },
    { 
      id: 2, 
      billNumber: 'PB002', 
      supplier: 'XYZ Suppliers', 
      date: '2023-10-18', 
      totalAmount: 32000, 
      gst: true,
      gstAmount: 5760,
      status: 'Pending'
    },
    { 
      id: 3, 
      billNumber: 'PB003', 
      supplier: 'Local Vendor', 
      date: '2023-10-20', 
      totalAmount: 18000, 
      gst: false,
      gstAmount: 0,
      status: 'Paid'
    },
    { 
      id: 4, 
      billNumber: 'PB004', 
      supplier: 'Global Distributors', 
      date: '2023-10-22', 
      totalAmount: 67000, 
      gst: true,
      gstAmount: 12060,
      status: 'Paid'
    },
    { 
      id: 5, 
      billNumber: 'PB005', 
      supplier: 'Regional Suppliers', 
      date: '2023-10-25', 
      totalAmount: 25000, 
      gst: false,
      gstAmount: 0,
      status: 'Pending'
    },
    { 
      id: 6, 
      billNumber: 'PB006', 
      supplier: 'Premium Chemicals', 
      date: '2023-10-27', 
      totalAmount: 42000, 
      gst: true,
      gstAmount: 7560,
      status: 'Paid'
    },
    { 
      id: 7, 
      billNumber: 'PB007', 
      supplier: 'Domestic Suppliers', 
      date: '2023-10-29', 
      totalAmount: 28000, 
      gst: false,
      gstAmount: 0,
      status: 'Pending'
    },
  ]);

  const filteredBills = purchaseBills.filter(bill => {
    const matchesType = billType === 'all' || 
                       (billType === 'gst' && bill.gst) || 
                       (billType === 'non-gst' && !bill.gst);
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddBill = () => {
    // Placeholder for adding new purchase bill
    alert('Add new purchase bill functionality would go here');
  };

  return (
    <Layout title="Purchase Bills">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Purchase Bills</h2>
            <p className="text-gray-600 mt-1">Manage and track your purchase transactions</p>
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
                    Supplier
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
                      {bill.supplier}
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
            <div className="text-2xl font-bold text-gray-900 mt-1">{purchaseBills.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Spent</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{purchaseBills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Paid Bills</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {purchaseBills.filter(bill => bill.status === 'Paid').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Pending</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {purchaseBills.filter(bill => bill.status === 'Pending').length}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseBillsPage;