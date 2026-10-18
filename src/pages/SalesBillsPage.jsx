import React, { useMemo, useState } from 'react';
import { PlusCircle, ReceiptText, Wallet, Clock3, TrendingUp } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, SearchInput, FilterSelect, TableWrap, EmptyState, Modal, PrimaryButton, GhostButton } from '../components/ui';
import { salesBills } from '../data/mockData';
import { inrPrecise, fmtDate } from '../utils/format';

export default function SalesBillsPage() {
  const [bills] = useState(salesBills);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All Types');
  const [status, setStatus] = useState('All Statuses');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => bills.filter((b) => {
    const q = query.toLowerCase();
    return (!q || b.id.toLowerCase().includes(q) || b.client.toLowerCase().includes(q))
      && (type === 'All Types' || b.type === type)
      && (status === 'All Statuses' || b.status === status);
  }), [bills, query, type, status]);

  const total = bills.reduce((s, b) => s + b.total, 0);
  const received = bills.filter((b) => b.status === 'Paid').reduce((s, b) => s + b.total, 0);
  const gstCollected = bills.reduce((s, b) => s + b.cgst + b.sgst, 0);

  return (
    <>
      <PageHeader
        title="Sales Bills"
        subtitle="Outbound invoices to clients — GST and Non-GST"
        actions={<PrimaryButton onClick={() => setModalOpen(true)}><PlusCircle size={16} /> New Sales Bill</PrimaryButton>}
      />

      <div className="stats-grid">
        <StatCard icon={ReceiptText} tone="blue" label="Total Invoices" value={bills.length} />
        <StatCard icon={Wallet} tone="green" label="Invoice Value" value={inrPrecise(total)} />
        <StatCard icon={TrendingUp} tone="purple" label="Amount Received" value={inrPrecise(received)} />
        <StatCard icon={Clock3} tone="amber" label="GST Collected" value={inrPrecise(gstCollected)} hint="CGST + SGST" />
      </div>

      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search invoice no. or client…" />
          <FilterSelect value={type} onChange={setType} options={['All Types', 'GST', 'Non-GST']} label="Bill Type" />
          <FilterSelect value={status} onChange={setStatus} options={['All Statuses', 'Paid', 'Partial', 'Unpaid']} label="Payment" />
        </div>

        <TableWrap>
          {filtered.length === 0 ? (
            <EmptyState message="No sales bills match your filters." />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice No.</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>GSTIN</th>
                  <th className="num">Taxable</th>
                  <th className="num">CGST</th>
                  <th className="num">SGST</th>
                  <th className="num">Total</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="cell-strong">{b.id}</td>
                    <td>{b.client}</td>
                    <td className="cell-muted">{fmtDate(b.date)}</td>
                    <td><Badge tone={b.type === 'GST' ? 'blue' : 'gray'}>{b.type}</Badge></td>
                    <td className="cell-muted">{b.gstin}</td>
                    <td className="num">{inrPrecise(b.taxableValue)}</td>
                    <td className="num">{b.cgst ? inrPrecise(b.cgst) : '—'}</td>
                    <td className="num">{b.sgst ? inrPrecise(b.sgst) : '—'}</td>
                    <td className="num cell-strong">{inrPrecise(b.total)}</td>
                    <td><Badge>{b.status}</Badge></td>
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
        title="New Sales Bill"
        footer={<>
          <GhostButton onClick={() => setModalOpen(false)}>Cancel</GhostButton>
          <PrimaryButton onClick={() => setModalOpen(false)}>Save Invoice</PrimaryButton>
        </>}
      >
        <form className="form-grid two" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="form-field"><label>Invoice Number</label><input placeholder="SB-2026-___" required /></div>
          <div className="form-field"><label>Invoice Date</label><input type="date" required /></div>
          <div className="form-field"><label>Client</label><input placeholder="e.g. Metro Retail Chain" required /></div>
          <div className="form-field">
            <label>Bill Type</label>
            <select defaultValue="GST"><option>GST</option><option>Non-GST</option></select>
          </div>
          <div className="form-field"><label>Client GSTIN</label><input placeholder="27AAACM1234N1Z9" /><span className="form-hint">Required only for GST bills</span></div>
          <div className="form-field"><label>Taxable Value (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field"><label>CGST (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field"><label>SGST (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field">
            <label>Payment Status</label>
            <select defaultValue="Unpaid"><option>Paid</option><option>Partial</option><option>Unpaid</option></select>
          </div>
          <div className="form-field"><label>Notes</label><textarea rows="2" placeholder="Optional remarks…" /></div>
        </form>
      </Modal>
    </>
  );
}
