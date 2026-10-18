import React, { useMemo, useState } from 'react';
import { PlusCircle, PackageCheck, Truck, Hourglass, XCircle, IndianRupee } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, SearchInput, FilterSelect, TableWrap, EmptyState, Modal, PrimaryButton, GhostButton } from '../components/ui';
import { orders } from '../data/mockData';
import { inr, fmtDate, numFmt } from '../utils/format';

export default function OrdersPage() {
  const [list] = useState(orders);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All Statuses');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => list.filter((o) => {
    const q = query.toLowerCase();
    return (!q || o.id.toLowerCase().includes(q) || o.client.toLowerCase().includes(q))
      && (status === 'All Statuses' || o.status === status);
  }), [list, query, status]);

  const openCount = list.filter((o) => ['Pending', 'Processing'].includes(o.status)).length;
  const transitCount = list.filter((o) => o.status === 'In Transit').length;
  const deliveredValue = list.filter((o) => o.status === 'Delivered').reduce((s, o) => s + o.value, 0);
  const cancelled = list.filter((o) => o.status === 'Cancelled').length;

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Customer orders from placement to delivery"
        actions={<PrimaryButton onClick={() => setModalOpen(true)}><PlusCircle size={16} /> New Order</PrimaryButton>}
      />

      <div className="stats-grid">
        <StatCard icon={Hourglass} tone="amber" label="Open Orders" value={numFmt(openCount)} hint="Pending / processing" />
        <StatCard icon={Truck} tone="purple" label="In Transit" value={numFmt(transitCount)} />
        <StatCard icon={PackageCheck} tone="green" label="Delivered Value" value={inr(deliveredValue)} />
        <StatCard icon={XCircle} tone="red" label="Cancelled" value={numFmt(cancelled)} />
      </div>

      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search order no. or client…" />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={['All Statuses', 'Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled']}
            label="Status"
          />
        </div>

        <TableWrap>
          {filtered.length === 0 ? (
            <EmptyState message="No orders match your filters." />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th className="num">Line Items</th>
                  <th className="num">Order Value</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="cell-strong">{o.id}</td>
                    <td>{o.client}</td>
                    <td className="cell-muted">{fmtDate(o.date)}</td>
                    <td className="num">{o.items}</td>
                    <td className="num cell-strong">{inr(o.value)}</td>
                    <td><Badge>{o.status}</Badge></td>
                    <td><Badge tone={o.payment === 'Paid' ? 'green' : o.payment === 'Partial' ? 'amber' : o.payment === 'Refunded' ? 'gray' : 'red'}>{o.payment}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableWrap>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Order"
        footer={<>
          <GhostButton onClick={() => setModalOpen(false)}>Cancel</GhostButton>
          <PrimaryButton onClick={() => setModalOpen(false)}>Create Order</PrimaryButton>
        </>}
      >
        <form className="form-grid two" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="form-field"><label>Client</label><input placeholder="Select or type client name" required /></div>
          <div className="form-field"><label>Order Date</label><input type="date" required /></div>
          <div className="form-field"><label>Expected Delivery</label><input type="date" /></div>
          <div className="form-field">
            <label>Priority</label>
            <select defaultValue="Normal"><option>Normal</option><option>Urgent</option><option>Low</option></select>
          </div>
          <div className="form-field"><label>Products / Line Items</label><input type="number" min="1" placeholder="0" /></div>
          <div className="form-field"><label>Order Value (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Delivery Instructions</label><textarea rows="2" placeholder="Address, contact person, timing…" /></div>
        </form>
      </Modal>
    </>
  );
}
