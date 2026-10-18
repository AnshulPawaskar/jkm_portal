import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets, User, Lock, Eye, EyeOff, LogIn, AlertCircle,
  Info, Boxes, ReceiptText, FlaskConical, BarChart3, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: Boxes, text: 'Real-time inventory & raw material tracking' },
  { icon: ReceiptText, text: 'GST and Non-GST purchase & sales billing' },
  { icon: FlaskConical, text: 'Order management for distributors & retailers' },
  { icon: BarChart3, text: 'Business reports with sales & stock analytics' },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username.trim(), password)) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      {/* Brand hero — visible on desktop only */}
      <section className="login-hero">
        <div className="login-hero-brand">
          <span className="brand-logo"><Droplets size={24} /></span>
          <div>
            <strong>JKM Enterprises</strong>
            <small>Home Care Manufacturing</small>
          </div>
        </div>

        <div className="login-hero-copy">
          <h2>One portal to run<br />your entire plant.</h2>
          <p>Manage inventories, GST &amp; Non-GST billing, raw materials, orders and clients — all in one secure workspace built to grow with your business.</p>
          <div className="hero-features">
            {features.map(({ icon: Icon, text }) => (
              <div className="hero-feature" key={text}>
                <span className="hf-icon"><Icon size={17} /></span>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="login-hero-foot">
          <ShieldCheck size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: '-2px' }} />
          Secure access · Role-based controls coming soon
        </div>
      </section>

      {/* Login form */}
      <section className="login-pane">
        <div className="login-card">
          <div className="login-mobile-brand">
            <span className="brand-logo"><Droplets size={22} /></span>
            <div>
              <strong>JKM Enterprises</strong>
              <small>Process Management Portal</small>
            </div>
          </div>

          <h2>Welcome back</h2>
          <p className="login-sub">Sign in to continue to your dashboard.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <div className="input-icon-wrap">
                <User size={17} />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrap">
                <Lock size={17} />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary login-submit">
              <LogIn size={17} /> Sign in
            </button>
          </form>

          <div className="demo-note">
            <Info size={15} style={{ flexShrink: 0 }} />
            <span>Demo credentials — Username: <b>aa</b> · Password: <b>1234</b></span>
          </div>

          <p className="login-foot">© 2026 JKM Enterprises. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
