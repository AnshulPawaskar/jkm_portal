import React, { useMemo, useState } from 'react';
import { PlusCircle, Boxes, AlertTriangle, IndianRupee, Package } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, SearchInput, FilterSelect, TableWrap, EmptyState, Modal, PrimaryButton, GhostButton } from '../components/ui';
import { inventoryItems } from '../data/mockData';
import { inr, numFmt } from '../utils/format';

export default function InventoryPage() {
  const [items] = useState(inventoryItems);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('All Stock');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['All Categories', ...new Set(items.map((i) => i.category))];

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const q = query.toLowerCase();
      const matchQ = !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
      const matchC = category === 'All Categories' || i.category === category;
      const matchS =
        stockFilter === 'All Stock' ? true :
        stockFilter === 'Low Stock' ? i.stock <= i.reorderLevel :
        i.stock > i.reorderLevel;
      return matchQ && matchC && matchS;
    });
  }, [items, query, category, stockFilter]);

  const totalValue = items.reduce((s, i) => s + i.stock * i.price, 0);
  const lowCount = items.filter((i) => i.stock <= i.reorderLevel).length;

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Finished goods & trading products stock"
        actions={<PrimaryButton onClick={() => setModalOpen(true)}><PlusCircle size={16} /> Add Item</PrimaryButton>}
      />

      <div className="stats-grid">
        <StatCard icon={Package} tone="blue" label="Total SKUs" value={numFmt(items.length)} />
        <StatCard icon={Boxes} tone="green" label="Units In Stock" value={numFmt(items.reduce((s, i) => s + i.stock, 0))} />
        <StatCard icon={IndianRupee} tone="purple" label="Stock Value" value={inr(totalValue)} />
        <StatCard icon={AlertTriangle} tone="red" label="Low Stock Items" value={numFmt(lowCount)} hint="At or below reorder level" />
      </div>

      <Card>
        <div className="toolbar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, SKU or ID…" />
          <FilterSelect value={category} onChange={setCategory} options={categories} label="Category" />
          <FilterSelect value={stockFilter} onChange={setStockFilter} options={['All Stock', 'Low Stock', 'Healthy Stock']} label="Stock" />
        </div>

        <TableWrap>
          {filtered.length === 0 ? (
            <EmptyState message="No inventory items match your search." />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Stock Level</th>
                  <th className="num">Unit Price</th>
                  <th className="num">Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => {
                  const pct = Math.min(100, (i.stock / (i.reorderLevel * 3)) * 100);
                  const color = i.stock <= i.reorderLevel ? 'var(--danger)' : i.stock <= i.reorderLevel * 1.5 ? 'var(--warning)' : 'var(--success)';
                  return (
                    <tr key={i.id}>
                      <td>
                        <div className="cell-strong">{i.name}</div>
                        <div className="cell-muted">{i.id}</div>
                      </td>
                      <td className="cell-muted">{i.sku}</td>
                      <td>{i.category}</td>
                      <td>
                        <div className="stock-cell">
                          <span>{numFmt(i.stock)} {i.unit}</span>
                          <div className="stock-bar"><i style={{ width: `${pct}%`, background: color }} /></div>
                        </div>
                      </td>
                      <td className="num">{inr(i.price)}</td>
                      <td className="num cell-strong">{inr(i.stock * i.price)}</td>
                      <td>
                        {i.stock <= i.reorderLevel
                          ? <Badge tone="red">Low Stock</Badge>
                          : <Badge tone="green">In Stock</Badge>}
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
        title="Add Inventory Item"
        footer={<>
          <GhostButton onClick={() => setModalOpen(false)}>Cancel</GhostButton>
          <PrimaryButton onClick={() => setModalOpen(false)}>Save Item</PrimaryButton>
        </>}
      >
        <form className="form-grid two" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="form-field"><label>Item Name</label><input placeholder="e.g. Surface Cleaner 500ml" required /></div>
          <div className="form-field"><label>SKU</label><input placeholder="e.g. SC-500" required /></div>
          <div className="form-field">
            <label>Category</label>
            <select defaultValue="Surface Cleaners">
              {categories.filter((c) => c !== 'All Categories').map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-field"><label>Unit</label><select defaultValue="pcs"><option>pcs</option><option>kg</option><option>ltr</option></select></div>
          <div className="form-field"><label>Opening Stock</label><input type="number" min="0" placeholder="0" /></div>
          <div className="form-field"><label>Reorder Level</label><input type="number" min="0" placeholder="0" /></div>
          <div className="form-field"><label>Selling Price (₹)</label><input type="number" min="0" step="0.01" placeholder="0.00" /></div>
          <div className="form-field"><label>Tax Rate (GST %)</label><select defaultValue="18"><option>0</option><option>5</option><option>12</option><option>18</option><option>28</option></select></div>
        </form>
      </Modal>
    </>
  );
}
