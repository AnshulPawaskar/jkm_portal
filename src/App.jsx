import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import PurchaseBillsPage from './pages/PurchaseBillsPage';
import SalesBillsPage from './pages/SalesBillsPage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import OrdersPage from './pages/OrdersPage';
import ClientsPage from './pages/ClientsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* All authenticated pages share the responsive sidebar layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/purchase-bills" element={<PurchaseBillsPage />} />
        <Route path="/sales-bills" element={<SalesBillsPage />} />
        <Route path="/raw-materials" element={<RawMaterialsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
