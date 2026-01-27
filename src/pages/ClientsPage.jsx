import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientsPage = () => {
  const navigate = useNavigate();
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
              <h1 className="text-xl font-bold text-gray-900">Clients</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Client
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search clients..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
              >
                <option value="all">All Clients</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </div>

            {/* Clients Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                            ? 'text-red-600' 
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
        </div>
      </main>
    </div>
  );
};

export default ClientsPage;