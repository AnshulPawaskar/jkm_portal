import React, { useState } from 'react';
import Layout from '../components/Layout';

const RawMaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample raw materials data
  const [rawMaterials, setRawMaterials] = useState([
    { id: 1, name: 'Surfactants', category: 'Chemicals', quantity: 500, unit: 'kg', minStock: 100, pricePerUnit: 80, supplier: 'Chemical Corp' },
    { id: 2, name: 'Essential Oils', category: 'Fragrances', quantity: 150, unit: 'liters', minStock: 50, pricePerUnit: 250, supplier: 'Aroma Supplies' },
    { id: 3, name: 'Sodium Hypochlorite', category: 'Chemicals', quantity: 300, unit: 'liters', minStock: 80, pricePerUnit: 60, supplier: 'Industrial Chemicals' },
    { id: 4, name: 'Ethanol', category: 'Solvents', quantity: 200, unit: 'liters', minStock: 60, pricePerUnit: 75, supplier: 'Chemical Corp' },
    { id: 5, name: 'Thickeners', category: 'Additives', quantity: 80, unit: 'kg', minStock: 30, pricePerUnit: 120, supplier: 'Polymer Suppliers' },
    { id: 6, name: 'Preservatives', category: 'Additives', quantity: 45, unit: 'kg', minStock: 25, pricePerUnit: 150, supplier: 'Specialty Chemicals' },
    { id: 7, name: 'Emulsifiers', category: 'Additives', quantity: 120, unit: 'kg', minStock: 40, pricePerUnit: 95, supplier: 'Chemical Corp' },
    { id: 8, name: 'Colorants', category: 'Additives', quantity: 25, unit: 'kg', minStock: 20, pricePerUnit: 200, supplier: 'Pigment Suppliers' },
  ]);

  const filteredMaterials = rawMaterials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMaterial = () => {
    // Placeholder for adding new raw material
    alert('Add new raw material functionality would go here');
  };

  return (
    <Layout title="Raw Materials">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Raw Materials</h2>
            <p className="text-gray-600 mt-1">Track and manage your raw material inventory</p>
          </div>
          <button
            onClick={handleAddMaterial}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            + Add Material
          </button>
        </div>

        {/* Search Bar and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search raw materials..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>All Categories</option>
              <option>Chemicals</option>
              <option>Fragrances</option>
              <option>Solvents</option>
              <option>Additives</option>
            </select>
          </div>
        </div>

        {/* Raw Materials Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material Name
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
                    Price per Unit (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {material.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{material.pricePerUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        material.quantity <= material.minStock 
                          ? 'bg-red-100 text-red-800' 
                          : material.quantity <= material.minStock * 1.5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {material.quantity <= material.minStock 
                          ? 'Low Stock' 
                          : material.quantity <= material.minStock * 1.5
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
            <div className="text-gray-500 text-sm">Total Materials</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{rawMaterials.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Low Stock</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {rawMaterials.filter(item => item.quantity <= item.minStock).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Categories</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {[...new Set(rawMaterials.map(item => item.category))].length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Avg. Price</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{Math.round(rawMaterials.reduce((sum, item) => sum + item.pricePerUnit, 0) / rawMaterials.length)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RawMaterialsPage;