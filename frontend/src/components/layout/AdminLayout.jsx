import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Users, LayoutDashboard, FileText, Settings, ExternalLink, 
  ShieldCheck, Bell, ChevronRight, LogOut, RefreshCw, Lock, KeyRound, ArrowRight, Eye, EyeOff 
} from 'lucide-react';
import { getApiUrl } from '../../utils/api';
import { supabase } from '../../utils/supabase';

export default function AdminLayout() {
  const location = useLocation();
  const [leadsCount, setLeadsCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sterling_admin_auth') === 'true';
  });
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    // 1. Attempt official Supabase Auth Login
    try {
      if (loginId.includes('@')) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginId.trim(),
          password: loginPass.trim()
        });
        if (!error && data?.session) {
          localStorage.setItem('supabase_admin_token', data.session.access_token);
          localStorage.setItem('sterling_admin_auth', 'true');
          setIsLoggedIn(true);
          return;
        }
      }
    } catch (err) {
      console.warn('Supabase auth login check fallback:', err.message);
    }

    // 2. Executive Passcode Fallback
    const validIds = ['admin', 'thesterlingadvisory@gmail.com', 'deepkalra', 'sterling'];
    const validPass = ['Sterling@2026', 'admin123', 'sterling123'];

    if (validIds.includes(loginId.toLowerCase().trim()) && validPass.includes(loginPass.trim())) {
      localStorage.setItem('supabase_admin_token', 'executive-passcode-auth');
      localStorage.setItem('sterling_admin_auth', 'true');
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid Senior Partner ID or Passcode. Hint: ID="admin", Passcode="Sterling@2026" or your official credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('supabase_admin_token');
    localStorage.removeItem('sterling_admin_auth');
    setIsLoggedIn(false);
  };

  const fetchLeadsCount = async () => {
    if (!isLoggedIn) return;
    try {
      const token = localStorage.getItem('supabase_admin_token') || 'executive-passcode-auth';
      const res = await fetch(getApiUrl('/api/leads'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (json && json.success) {
        setLeadsCount(json.data.length);
        const uncontacted = json.data.filter(l => l.status === 'NEW').length;
        setNewCount(uncontacted);
      }
    } catch (e) {
      console.warn('Could not fetch mandate counts:', e.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeadsCount();
      const interval = setInterval(fetchLeadsCount, 15000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const navItems = [
    { label: 'Retainer CRM Registry', path: '/admin', icon: Users, badge: newCount > 0 ? newCount : null },
  ];

  // ── RESTRICTED LOGIN SCREEN if not authenticated ──
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--color-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 5vw, 2rem)', color: '#ffffff'
      }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          background: 'var(--color-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid rgba(223,186,115,0.3)'
        }}>
          {/* Header Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{
              width: '56px', height: '56px',
              background: 'var(--color-navy)',
              border: '1px solid var(--color-gold)',
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(223, 186, 115, 0.25)',
              marginBottom: '1rem'
            }}>
              <Lock size={24} style={{ color: 'var(--color-gold)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
              Sterling Partner Portal
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.5' }}>
              Restricted Fiduciary Access. Please verify your practitioner identity to access statutory client intakes.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {loginError && (
              <div style={{
                padding: '0.875rem 1rem', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: '#EF4444', fontWeight: 600, lineHeight: '1.4'
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                Practitioner ID / Email
              </label>
              <input
                type="text"
                placeholder="e.g. admin or counsel@thesterlingadvisory.com"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)', color: '#ffffff', fontSize: '0.9375rem',
                  outline: 'none', transition: 'border-color 160ms ease'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
                  Encrypted Passcode
                </label>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>Default: Sterling@2026</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasscode ? "text" : "password"}
                  placeholder="Enter executive passcode"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '0.875rem 2.75rem 0.875rem 1rem',
                    borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)', color: '#ffffff', fontSize: '0.9375rem',
                    outline: 'none', transition: 'border-color 160ms ease'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-light)'
                  }}
                >
                  {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{
                marginTop: '0.5rem', width: '100%', padding: '1rem',
                justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <span>Unlock Fiduciary Portal</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', fontWeight: 600, textDecoration: 'none' }}>
              ← Return to Institutional Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED INSTITUTIONAL DARK THEME ADMIN DESK ──
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-primary)', display: 'flex', color: '#ffffff' }}>
      {/* ── Left Sidebar (Dark Authority Theme) ── */}
      <aside style={{
        width: '270px', flexShrink: 0,
        background: 'var(--color-secondary)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', zIndex: 40,
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', background: 'var(--color-navy)',
              border: '1px solid var(--color-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-gold)',
              borderRadius: 'var(--radius-sm)'
            }}>S</div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
                STERLING ADVISORY
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Partner CRM Portal
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '1.5rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0 0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
            Statutory Governance
          </div>

          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={i}
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--color-navy)' : 'transparent',
                  border: isActive ? '1px solid var(--color-gold)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none', transition: 'all 160ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-text-light)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    background: 'var(--color-gold)', color: 'var(--color-navy)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700,
                    padding: '2px 8px', borderRadius: 'var(--radius-sm)'
                  }}>
                    {item.badge} PRIORITY
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions Footer */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
              transition: 'border-color 160ms ease', marginBottom: '0.75rem'
            }}
          >
            <span>Inspect Public Website</span>
            <ExternalLink size={14} style={{ color: 'var(--color-gold)' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366' }} />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Registry Active</span>
            </div>
            <button 
              onClick={() => fetchLeadsCount()}
              title="Sync Count"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gold)' }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Bar */}
        <header style={{
          height: '70px', background: 'var(--color-secondary)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
              Practitioner Desk: <strong style={{ color: '#ffffff', fontWeight: 600 }}>Deep Kalra (Senior Partner)</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 0.875rem', background: 'rgba(223,186,115,0.12)',
              border: '1px solid var(--color-gold)', borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 600
            }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-gold)' }} />
              <span>Fiduciary Privilege Level 1</span>
            </div>

            <button
              onClick={handleLogout}
              title="Lock & Terminate Session"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.12)', color: '#EF4444', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 160ms ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.12)'}
            >
              <LogOut size={14} />
              <span>Lock Portal</span>
            </button>
          </div>
        </header>

        {/* Page Container */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
