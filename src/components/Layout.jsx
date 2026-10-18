import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Boxes, ShoppingCart, ReceiptText, FlaskConical,
  PackageCheck, Users, BarChart3, LogOut, Menu, X, Bell, Search,
  ChevronsUpDown, Droplets, Building2, UserCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/purchase-bills', label: 'Purchase Bills', icon: ShoppingCart },
  { to: '/sales-bills', label: 'Sales Bills', icon: ReceiptText },
  { to: '/raw-materials', label: 'Raw Materials', icon: FlaskConical },
  { to: '/orders', label: 'Orders', icon: PackageCheck },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

// Add new modules here as the portal grows — sidebar & routing stay in sync.
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-logo"><Droplets size={20} /></span>
          <div className="brand-text">
            <strong>JKM Enterprises</strong>
            <small>Process Management Portal</small>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={19} className="nav-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-card">
            <Building2 size={16} />
            <div>
              <strong>Manufacturing Unit</strong>
              <small>Surface &amp; Home Care Products</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="main-area">
        <header className="topbar">
          <button className="icon-btn hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>

          <div className="topbar-title">
            <h1>JKM Enterprises</h1>
            <span className="topbar-crumb">Home Care Manufacturing</span>
          </div>

          <div className="topbar-search">
            <Search size={16} />
            <input type="text" placeholder="Search bills, orders, clients…" aria-label="Global search" />
          </div>

          <div className="topbar-actions">
            <button className="icon-btn notif-btn" aria-label="Notifications">
              <Bell size={19} />
              <span className="notif-dot" />
            </button>

            <div className="user-menu-wrap">
              <button className="user-menu-btn" onClick={() => setUserMenuOpen((o) => !o)}>
                <UserCircle2 size={26} className="user-avatar" />
                <span className="user-name">{user?.username || 'aa'}</span>
                <ChevronsUpDown size={15} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="user-menu-backdrop" onClick={() => setUserMenuOpen(false)} />
                  <div className="user-menu">
                    <div className="user-menu-header">
                      <strong>Signed in as “{user?.username || 'aa'}”</strong>
                      <small>Demo administrator account</small>
                    </div>
                    <button className="user-menu-item danger" onClick={handleLogout}>
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="app-footer">
          © 2026 JKM Enterprises · Surface Cleaners · Room Fresheners · Drain Cleaners
        </footer>
      </div>
    </div>
  );
}
