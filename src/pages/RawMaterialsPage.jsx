import React, { useMemo, useState } from 'react';
import { PlusCircle, FlaskConical, Truck, Scale, IndianRupee } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, SearchInput, TableWrap, EmptyState, Modal, PrimaryButton, GhostButton } from '../components/ui';
import { rawMaterials } from '../data/mockData';
import { inr, numFmt, fmtDate } from '../utils/format';

// Simple threshold: items with under 100 units are considered "reorder soon"
const LOW_THRESHOLD = 100;

export default function RawMaterialsPage() {
  const [items] = useState(rawMaterials);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => items.filter((i) => {
    const q = query.toLowerCase();
    return !q || i.name.toLowerCase().includes(q) || i.supplier.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
  }), [items, query]);

  const stockValue = items.reduce((s, i) => s + i.stock * i.pricePerUnit, 0);
  const suppliers = new Set(items.map((i) => i.supplier)).size;
  const lowCount = items.filter((i) => i.stock < LOW_THRESHOLD).length;

  return (
    <>
      <PageHeader
        title="Raw Materials"
        subtitle="Chemicals, packaging & inputs used in manufacturing"
        actions={<PrimaryButton onClick={() => setModalOpen(true)}><PlusCircle size={16} /> Add Material</PrimaryButton>}
      />

      <div className="stats-grid">
        <StatCard icon={FlaskConical} tone="blue" label="Materials Tracked" value={numFmt(items.length)} />
        <StatCard icon={Truck} tone="green" label="Active Suppliers" value={numFmt(suppliers)} />
        <StatCard icon={IndianRupee} tone="purple" label="Stock Value" value={inr(stockValue)} />
        <StatCard icon={Scale} tone="amber" label="Reorder Soon" value={numFmt(lowCount)} hint={`Below ${LOW_THRESHOLD} units`} />
      </div>

      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search material or supplier…" />
        </div>

        <TableWrap>
          {filtered.length === 0 ? (
            <EmptyState message="No raw materials match your search." />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Supplier</th>
                  <th className="num">In Stock</th>
                  <th className="num">Price / Unit</th>
                  <th className="num">Value</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <div className="cell-strong">{i.name}</div>
                      <div className="cell-muted">{i.id}</div>
                    </td>
                    <td>{i.supplier}</td>
                    <td className="num">{numFmt(i.stock)} {i.unit}</td>
                    <td className="num">{inr(i.pricePerUnit)}</td>
                    <td className="num cell-strong">{inr(i.stock * i.pricePerUnit)}</td>
                    <td className="cell-muted">{fmtDate(i.lastUpdated)}</td>
                    <td>
                      {i.stock < LOW_THRESHOLD
                        ? <Badge tone="amber">Reorder Soon</Badge>
                        : <Badge tone="green">Available</Badge>}
                    </td>
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
        title="Add Raw Material"
        footer={<>
          <GhostButton onClick={() => setModalOpen(false)}>Cancel</GhostButton>
          <PrimaryButton onClick={() => setModalOpen(false)}>Save Material</PrimaryButton>
        </>}
      >
        <form className="form-grid two" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="form-field"><label>Material Name</label><input placeholder="e.g. Sodium Lauryl Ether Sulphate" required /></div>
          <div className="form-field"><label>Supplier</label><input placeholder="e.g. ChemSource Pvt Ltd" required /></div>
          <div className="form-field"><label>Unit</label><select defaultValue="kg"><option>kg</option><option>ltr</option><option>pcs</option><option>ton</option></select></div>
          <div className="form-field"><label>Current Stock</label><input type="number" min="0" placeholder="0" /></div>
          <div className="form-field"><label>Price per Unit (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field"><label>Hazard Class</label><select defaultValue="None"><option>None</option><option>Corrosive</option><option>Flammable</option><option>Irritant</option></select></div>
        </form>
      </Modal>
    </>
  );
}
