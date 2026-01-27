import React, { useState } from 'react';
import Layout from '../components/Layout';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('summary');

  // Sample report data
  const salesData = [
    { month: 'Jan', sales: 150000, purchases: 120000 },
    { month: 'Feb', sales: 180000, purchases: 140000 },
    { month: 'Mar', sales: 200000, purchases: 150000 },
    { month: 'Apr', sales: 220000, purchases: 160000 },
    { month: 'May', sales: 190000, purchases: 130000 },
    { month: 'Jun', sales: 210000, purchases: 170000 },
    { month: 'Jul', sales: 240000, purchases: 180000 },
    { month: 'Aug', sales: 260000, purchases: 190000 },
  ];

  const topProducts = [
    { name: 'Surface Cleaner', sold: 1200, revenue: 144000 },
    { name: 'Room Freshener', sold: 950, revenue: 90250 },
    { name: 'Drain Cleaner', sold: 800, revenue: 120000 },
    { name: 'Toilet Cleaner', sold: 750, revenue: 82500 },
    { name: 'Glass Cleaner', sold: 600, revenue: 60000 },
    { name: 'Floor Cleaner', sold: 550, revenue: 99000 },
    { name: 'Carpet Cleaner', sold: 400, revenue: 80000 },
    { name: 'Disinfectant Spray', sold: 700, revenue: 94500 },
  ];

  const handleGenerateReport = () => {
    // Placeholder for generating report
    alert(`Generating ${reportType} report...`);
  };

  return (
    <Layout title="Reports">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Business Reports</h2>
            <p className="text-gray-600 mt-1">Analyze your business performance</p>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Generate Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Total Sales</h3>
            <p className="mt-1 text-2xl font-bold">₹1,150,000</p>
            <p className="mt-1 text-xs opacity-80">↑ 12% from last month</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Total Purchases</h3>
            <p className="mt-1 text-2xl font-bold">₹870,000</p>
            <p className="mt-1 text-xs opacity-80">↓ 5% from last month</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Gross Profit</h3>
            <p className="mt-1 text-2xl font-bold">₹280,000</p>
            <p className="mt-1 text-xs opacity-80">↑ 18% from last month</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Active Orders</h3>
            <p className="mt-1 text-2xl font-bold">24</p>
            <p className="mt-1 text-xs opacity-80">3 pending</p>
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
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
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
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
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
    </Layout>
  );
};

export default ReportsPage;