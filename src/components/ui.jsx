import React from 'react';
import { X } from 'lucide-react';

/* ---------- Page header ---------- */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

/* ---------- Stat card ---------- */
export function StatCard({ icon: Icon, label, value, hint, tone = 'blue' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon tone-${tone}`}>{Icon && <Icon size={20} />}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {hint && <span className="stat-hint">{hint}</span>}
      </div>
    </div>
  );
}

/* ---------- Status badge ---------- */
const toneMap = {
  Paid: 'green', Delivered: 'green', Active: 'green', GST: 'blue', Available: 'green',
  Unpaid: 'red', Cancelled: 'red', Critical: 'red', Overdue: 'red', Pending: 'amber',
  Partial: 'amber', Processing: 'amber', 'In Transit': 'purple', NonGST: 'gray',
  'Non-GST': 'gray', Refunded: 'gray', InStock: 'green', Low: 'amber', OutOfStock: 'red',
};
export function Badge({ children, tone }) {
  const t = tone || toneMap[String(children)] || 'gray';
  return <span className={`badge badge-${t}`}>{children}</span>;
}

/* ---------- Search input ---------- */
export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-input">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

/* ---------- Filter pills / select ---------- */
export function FilterSelect({ value, onChange, options, label }) {
  return (
    <label className="filter-select">
      {label && <span>{label}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

/* ---------- Card wrapper ---------- */
export function Card({ title, children, className = '', actions }) {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-head">
          {title && <h3>{title}</h3>}
          {actions}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}

/* ---------- Responsive table wrapper ---------- */
export function TableWrap({ children }) {
  return <div className="table-wrap">{children}</div>;
}

/* ---------- Empty state ---------- */
export function EmptyState({ message = 'No records found.' }) {
  return (
    <div className="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      <p>{message}</p>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Buttons ---------- */
export function PrimaryButton({ children, onClick, type = 'button' }) {
  return <button type={type} className="btn btn-primary" onClick={onClick}>{children}</button>;
}
export function GhostButton({ children, onClick }) {
  return <button type="button" className="btn btn-ghost" onClick={onClick}>{children}</button>;
}
