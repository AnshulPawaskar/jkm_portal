import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell,
} from 'recharts';
import {
  Wallet, TrendingUp, ShoppingCart, AlertTriangle, Boxes, ReceiptText,
  PackageCheck, Users, FileBarChart, PlusCircle,
} from 'lucide-react';
import { PageHeader, StatCard, Card, Badge } from '../components/ui';
import { inr, numFmt } from '../utils/format';
import {
  inventoryItems, orders, salesBills, purchaseBills, monthlySales, categoryShare,
} from '../data/mockData';

const PIE_COLORS = ['#1d4ed8', '#0ea5e9', '#7c3aed', '#16a34a', '#f59e0b'];

export default function DashboardPage() {
  const totalSales = salesBills.reduce((s, b) => s + b.total, 0);
  const totalPurchases = purchaseBills.reduce((s, b) => s + b.total, 0);
  const openOrders = orders.filter((o) => ['Pending', 'Processing', 'In Transit'].includes(o.status)).length;
  const lowStock = inventoryItems.filter((i) => i.stock <= i.reorderLevel);
  const pendingPayments = salesBills.filter((b) => b.status !== 'Paid').reduce((s, b) => s + b.total, 0);

  const quickLinks = [
    { to: '/inventory', label: 'Inventory', icon: Boxes },
    { to: '/sales-bills', label: 'Sales Bill', icon: ReceiptText },
    { to: '/purchase-bills', label: 'Purchase Bill', icon: ShoppingCart },
    { to: '/orders', label: 'New Order', icon: PackageCheck },
    { to: '/clients', label: 'Clients', icon: Users },
    { to: '/reports', label: 'Reports', icon: FileBarChart },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of sales, purchases, orders and stock health"
        actions={
          <Link to="/sales-bills" className="btn btn-primary">
            <PlusCircle size={16} /> New Sales Bill
          </Link>
        }
      />

      <div className="stats-grid">
        <StatCard icon={Wallet} tone="blue" label="Total Sales (Oct)" value={inr(totalSales)} hint={`${salesBills.length} invoices`} />
        <StatCard icon={ShoppingCart} tone="purple" label="Total Purchases (Oct)" value={inr(totalPurchases)} hint={`${purchaseBills.length} bills`} />
        <StatCard icon={TrendingUp} tone="amber" label="Receivables Pending" value={inr(pendingPayments)} hint="Unpaid / partial invoices" />
        <StatCard icon={AlertTriangle} tone="red" label="Low Stock Alerts" value={numFmt(lowStock.length)} hint={`${openOrders} open orders`} />
      </div>

      <div className="grid-2">
        <Card title="Sales vs Purchases (last 6 months)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySales} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPurch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} width={40} />
                <Tooltip formatter={(v) => inr(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12.5 }} />
                <Area type="monotone" dataKey="sales" name="Sales" stroke="#1d4ed8" strokeWidth={2.2} fill="url(#gSales)" />
                <Area type="monotone" dataKey="purchases" name="Purchases" stroke="#7c3aed" strokeWidth={2.2} fill="url(#gPurch)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue by Product Category">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={3}>
                  {categoryShare.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12.5 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Low Stock Items" actions={<Link to="/inventory" className="cell-muted">View all →</Link>}>
          <div className="alert-list">
            {lowStock.map((item) => (
              <div className="alert-item" key={item.id}>
                <span className="stat-icon tone-red"><Boxes size={17} /></span>
                <div className="alert-item-body">
                  <strong>{item.name}</strong>
                  <small>{numFmt(item.stock)} {item.unit} left · reorder at {numFmt(item.reorderLevel)}</small>
                </div>
                <Badge tone="red">Reorder</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Orders" actions={<Link to="/orders" className="cell-muted">View all →</Link>}>
          <div className="alert-list">
            {orders.slice(-5).reverse().map((o) => (
              <div className="alert-item" key={o.id}>
                <span className="stat-icon tone-blue"><PackageCheck size={17} /></span>
                <div className="alert-item-body">
                  <strong>{o.client}</strong>
                  <small>{o.id} · {o.items} items · {inr(o.value)}</small>
                </div>
                <Badge>{o.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="quick-grid">
          {quickLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="quick-link">
              <Icon size={18} /> {label}
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
