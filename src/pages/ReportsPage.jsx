import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsPage = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('summary');

  // Sample report data
  const salesData = [
    { month: 'Jan', sales: 150000, purchases: 120000 },
    { month: 'Feb', sales: 180000, purchases: 140000 },
    { month: 'Mar', sales: 200000, purchases: 150000 },
    { month: 'Apr', sales: 220000, purchases: 160000 },
    { month: 'May', sales: 190000, purchases: 130000 },
    { month: 'Jun', sales: 210000, purchases: 170000 },
  ];

  const topProducts = [
    { name: 'Surface Cleaner', sold: 1200, revenue: 144000 },
    { name: 'Room Freshener', sold: 950, revenue: 90250 },
    { name: 'Drain Cleaner', sold: 800, revenue: 120000 },
    { name: 'Toilet Cleaner', sold: 750, revenue: 82500 },
    { name: 'Glass Cleaner', sold: 600, revenue: 60000 },
  ];

  const handleGenerateReport = () => {
    // Placeholder for generating report
    alert(`Generating ${reportType} report...`);
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
              <h1 className="text-xl font-bold text-gray-900">Reports</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Business Reports</h2>
            </div>

            {/* Report Type Selector */}
            <div className="mb-6">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="summary">Summary Report</option>
                <option value="sales">Sales Report</option>
                <option value="purchase">Purchase Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="profit">Profit/Loss Report</option>
              </select>
              <button
                onClick={handleGenerateReport}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate Report
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">₹1,150,000</p>
                <p className="mt-1 text-sm text-green-600">↑ 12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Purchases</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">₹870,000</p>
                <p className="mt-1 text-sm text-red-600">↓ 5% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Gross Profit</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">₹280,000</p>
                <p className="mt-1 text-sm text-green-600">↑ 18% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Active Orders</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
                <p className="mt-1 text-sm text-gray-600">3 pending</p>
              </div>
            </div>

            {/* Sales vs Purchases Chart */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sales vs Purchases Trend (Last 6 Months)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales (₹)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purchases (₹)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesData.map((data, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{data.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{data.purchases.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{(data.sales - data.purchases).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Units Sold
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{product.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;