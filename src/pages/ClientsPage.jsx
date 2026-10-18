import React, { useMemo, useState } from 'react';
import { PlusCircle, Users, Building2, Wallet, Receipt } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, SearchInput, FilterSelect, TableWrap, EmptyState, Modal, PrimaryButton, GhostButton } from '../components/ui';
import { clients } from '../data/mockData';
import { inr, numFmt } from '../utils/format';

export default function ClientsPage() {
  const [list] = useState(clients);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All Types');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => list.filter((c) => {
    const q = query.toLowerCase();
    return (!q || c.name.toLowerCase().includes(q) || c.contactPerson.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
      && (type === 'All Types' || c.type === type);
  }), [list, query, type]);

  const totalOutstanding = list.reduce((s, c) => s + c.outstanding, 0);
  const gstClients = list.filter((c) => c.type === 'GST').length;

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Distributors, retailers & institutional buyers"
        actions={<PrimaryButton onClick={() => setModalOpen(true)}><PlusCircle size={16} /> Add Client</PrimaryButton>}
      />

      <div className="stats-grid">
        <StatCard icon={Users} tone="blue" label="Total Clients" value={numFmt(list.length)} />
        <StatCard icon={Building2} tone="green" label="GST Registered" value={`${gstClients} / ${list.length}`} hint="Rest billed as Non-GST" />
        <StatCard icon={Wallet} tone="amber" label="Total Outstanding" value={inr(totalOutstanding)} />
        <StatCard icon={Receipt} tone="purple" label="Avg. Credit Limit" value={inr(list.reduce((s, c) => s + c.creditLimit, 0) / list.length)} />
      </div>

      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search client, contact, city or email…" />
          <FilterSelect value={type} onChange={setType} options={['All Types', 'GST', 'Non-GST']} label="Billing" />
        </div>

        <TableWrap>
          {filtered.length === 0 ? (
            <EmptyState message="No clients match your search." />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Contact Person</th>
                  <th>City</th>
                  <th>GSTIN</th>
                  <th>Type</th>
                  <th className="num">Credit Limit</th>
                  <th className="num">Outstanding</th>
                  <th>Utilisation</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const util = Math.round((c.outstanding / c.creditLimit) * 100);
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="cell-strong">{c.name}</div>
                        <div className="cell-muted">{c.email}</div>
                      </td>
                      <td>
                        {c.contactPerson}
                        <div className="cell-muted">{c.phone}</div>
                      </td>
                      <td>{c.city}</td>
                      <td className="cell-muted">{c.gstin}</td>
                      <td><Badge tone={c.type === 'GST' ? 'blue' : 'gray'}>{c.type}</Badge></td>
                      <td className="num">{inr(c.creditLimit)}</td>
                      <td className="num cell-strong">{inr(c.outstanding)}</td>
                      <td>
                        <div className="stock-cell">
                          <span className="cell-muted">{util}% used</span>
                          <div className="stock-bar">
                            <i style={{ width: `${Math.min(100, util)}%`, background: util > 85 ? 'var(--danger)' : util > 60 ? 'var(--warning)' : 'var(--success)' }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </TableWrap>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Client"
        footer={<>
          <GhostButton onClick={() => setModalOpen(false)}>Cancel</GhostButton>
          <PrimaryButton onClick={() => setModalOpen(false)}>Save Client</PrimaryButton>
        </>}
      >
        <form className="form-grid two" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="form-field"><label>Client Name</label><input placeholder="Business name" required /></div>
          <div className="form-field"><label>Contact Person</label><input placeholder="Full name" required /></div>
          <div className="form-field"><label>Phone</label><input type="tel" placeholder="+91 …" /></div>
          <div className="form-field"><label>Email</label><input type="email" placeholder="name@company.in" /></div>
          <div className="form-field"><label>City</label><input placeholder="City" /></div>
          <div className="form-field">
            <label>Billing Type</label>
            <select defaultValue="GST"><option>GST</option><option>Non-GST</option></select>
          </div>
          <div className="form-field"><label>GSTIN</label><input placeholder="27AAACM1234N1Z9" /><span className="form-hint">Optional for Non-GST clients</span></div>
          <div className="form-field"><label>Credit Limit (₹)</label><input type="number" min="0" placeholder="0" /></div>
        </form>
      </Modal>
    </>
  );
}
