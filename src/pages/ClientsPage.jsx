import React, { useState } from 'react';
import Layout from '../components/Layout';

const ClientsPage = () => {
  const [clientType, setClientType] = useState('all'); // 'all', 'retail', 'wholesale'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample clients data
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Retail Store A', 
      type: 'retail', 
      email: 'contact@retailstorea.com', 
      phone: '+91 9876543210', 
      address: '123 Main Street, Mumbai',
      gstin: '27ABCDE1234P1Z5',
      creditLimit: 50000,
      outstanding: 15000
    },
    { 
      id: 2, 
      name: 'Wholesale Distributor B', 
      type: 'wholesale', 
      email: 'info@wholesaledistb.com', 
      phone: '+91 9876543211', 
      address: '456 Business Avenue, Delhi',
      gstin: '07ABCDE1234P1Z5',
      creditLimit: 200000,
      outstanding: 45000
    },
    { 
      id: 3, 
      name: 'Local Shop C', 
      type: 'retail', 
      email: 'shopc@email.com', 
      phone: '+91 9876543212', 
      address: '789 Market Road, Bangalore',
      gstin: '29ABCDE1234P1Z5',
      creditLimit: 30000,
      outstanding: 8000
    },
    { 
      id: 4, 
      name: 'Supermarket Chain D', 
      type: 'wholesale', 
      email: 'orders@supermarketd.com', 
      phone: '+91 9876543213', 
      address: '101 Corporate Park, Chennai',
      gstin: '33ABCDE1234P1Z5',
      creditLimit: 500000,
      outstanding: 120000
    },
    { 
      id: 5, 
      name: 'Grocery E', 
      type: 'retail', 
      email: 'manager@grocerye.com', 
      phone: '+91 9876543214', 
      address: '202 Shopping Complex, Hyderabad',
      gstin: '28ABCDE1234P1Z5',
      creditLimit: 25000,
      outstanding: 5000
    },
    { 
      id: 6, 
      name: 'Pharmacy F', 
      type: 'retail', 
      email: 'info@pharmacyf.com', 
      phone: '+91 9876543215', 
      address: '303 Medical Plaza, Pune',
      gstin: '27ABCDE1234P1Z6',
      creditLimit: 40000,
      outstanding: 12000
    },
    { 
      id: 7, 
      name: 'Department Store G', 
      type: 'wholesale', 
      email: 'sales@deptstoreg.com', 
      phone: '+91 9876543216', 
      address: '404 Mall Road, Ahmedabad',
      gstin: '24ABCDE1234P1Z7',
      creditLimit: 300000,
      outstanding: 85000
    },
  ]);

  const filteredClients = clients.filter(client => {
    const matchesType = clientType === 'all' || client.type === clientType;
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const handleAddClient = () => {
    // Placeholder for adding new client
    alert('Add new client functionality would go here');
  };

  return (
    <Layout title="Clients">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
            <p className="text-gray-600 mt-1">Manage and track your customers</p>
          </div>
          <button
            onClick={handleAddClient}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            + Add Client
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="all">All Clients</option>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
          </select>
        </div>

        {/* Clients Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GSTIN
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit Limit (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outstanding (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.type === 'retail' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.gstin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{client.creditLimit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${
                        client.outstanding > client.creditLimit * 0.8 
                          ? 'text-red-600 font-semibold' 
                          : client.outstanding > client.creditLimit * 0.5
                            ? 'text-yellow-600 font-semibold'
                            : 'text-gray-900'
                      }`}>
                        ₹{client.outstanding.toLocaleString()}
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
            <div className="text-gray-500 text-sm">Total Clients</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{clients.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Retail Clients</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {clients.filter(client => client.type === 'retail').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Wholesale Clients</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {clients.filter(client => client.type === 'wholesale').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Outstanding</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{clients.reduce((sum, client) => sum + client.outstanding, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientsPage;