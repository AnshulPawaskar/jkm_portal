import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LineChart, Line,
} from 'recharts';
import { Download, TrendingUp, Scale, Wallet, Receipt } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, TableWrap } from '../components/ui';
import { inr, inrPrecise } from '../utils/format';
import { monthlySales, salesBills, purchaseBills, inventoryItems } from '../data/mockData';

const gstSummary = [
  { period: 'Apr 2026', outward: 985400, inward: 612300, netLiability: 37310 },
  { period: 'May 2026', outward: 842000, inward: 512000, netLiability: 33000 },
  { period: 'Jun 2026', outward: 913000, inward: 560000, netLiability: 35310 },
  { period: 'Jul 2026', outward: 1024000, inward: 618000, netLiability: 40620 },
  { period: 'Aug 2026', outward: 987000, inward: 590000, netLiability: 39720 },
  { period: 'Sep 2026', outward: 1156000, inward: 672000, netLiability: 48420 },
];

const topProducts = [...inventoryItems]
  .sort((a, b) => b.stock * b.price - a.stock * a.price)
  .slice(0, 5);

export default function ReportsPage() {
  const totalSales = salesBills.reduce((s, b) => s + b.total, 0);
  const totalPurchases = purchaseBills.reduce((s, b) => s + b.total, 0);
  const grossMargin = ((totalSales - totalPurchases) / totalSales) * 100;
  const gstPayable = gstSummary[gstSummary.length - 1].netLiability;

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Business performance, GST liability & stock analytics"
        actions={
          <button className="btn btn-ghost"><Download size={16} /> Export CSV</button>
        }
      />

      <div className="stats-grid">
        <StatCard icon={Wallet} tone="blue" label="Sales This Month" value={inr(totalSales)} />
        <StatCard icon={Receipt} tone="purple" label="Purchases This Month" value={inr(totalPurchases)} />
        <StatCard icon={TrendingUp} tone="green" label="Gross Margin" value={`${grossMargin.toFixed(1)}%`} hint="Before operating costs" />
        <StatCard icon={Scale} tone="amber" label="Net GST Payable (Sep)" value={inrPrecise(gstPayable)} />
      </div>

      <div className="grid-2">
        <Card title="Monthly Sales Trend">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} width={40} />
                <Tooltip formatter={(v) => inr(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12.5 }} />
                <Line type="monotone" dataKey="sales" name="Sales" stroke="#1d4ed8" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="purchases" name="Purchases" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top Products by Stock Value">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11.5, fill: '#334155' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => inr(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Bar dataKey={(d) => d.stock * d.price} name="Stock Value" fill="#1d4ed8" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="GST Summary (Last 6 Months)">
        <TableWrap>
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th className="num">Outward Supplies</th>
                <th className="num">Inward Supplies</th>
                <th className="num">Net GST Liability</th>
                <th>Filing Status</th>
              </tr>
            </thead>
            <tbody>
              {gstSummary.map((g, idx) => (
                <tr key={g.period}>
                  <td className="cell-strong">{g.period}</td>
                  <td className="num">{inrPrecise(g.outward)}</td>
                  <td className="num">{inrPrecise(g.inward)}</td>
                  <td className="num cell-strong">{inrPrecise(g.netLiability)}</td>
                  <td>{idx === gstSummary.length - 1 ? <Badge tone="amber">Due 20 Oct</Badge> : <Badge tone="green">Filed</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>
    </>
  );
}
