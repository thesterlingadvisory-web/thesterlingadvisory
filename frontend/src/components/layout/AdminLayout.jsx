import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Users, LayoutDashboard, FileText, Settings, ExternalLink, 
  ShieldCheck, Bell, ChevronRight, LogOut, RefreshCw, Lock, KeyRound, ArrowRight, Eye, EyeOff 
} from 'lucide-react';

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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    // Accept standard admin credentials or deep kalra email
    const validIds = ['admin', 'thesterlingadvisory@gmail.com', 'deepkalra', 'sterling'];
    const validPass = ['Sterling@2026', 'admin123', 'sterling123'];

    if (validIds.includes(loginId.toLowerCase().trim()) && validPass.includes(loginPass.trim())) {
      localStorage.setItem('sterling_admin_auth', 'true');
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid Admin ID or Passcode. Hint: ID="admin", Passcode="Sterling@2026" or "admin123"');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sterling_admin_auth');
    setIsLoggedIn(false);
  };

  const fetchLeadsCount = async () => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch('http://localhost:5000/api/leads');
      const json = await res.json();
      if (json && json.success) {
        setLeadsCount(json.data.length);
        const uncontacted = json.data.filter(l => l.status === 'NEW').length;
        setNewCount(uncontacted);
      }
    } catch (e) {
      console.warn('Could not fetch lead counts:', e.message);
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
    { label: 'Leads & CRM Desk', path: '/admin', icon: Users, badge: newCount > 0 ? newCount : null },
    { label: 'Homepage Builder', path: '/admin/homepage-builder', icon: LayoutDashboard },
  ];

  // ── LOGIN SCREEN if not authenticated ──
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', fontFamily: 'var(--font-body)'
      }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2.75rem 2.5rem',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #E2E8F0'
        }}>
          {/* Header Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(223, 186, 115, 0.35)',
              marginBottom: '1rem'
            }}>
              <Lock size={26} color="#0F172A" strokeWidth={2.5} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
              Sterling Admin Portal
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
              Restricted Senior Executive Access. Please verify your identity to view client consultations & leads.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {loginError && (
              <div style={{
                padding: '0.875rem 1rem', background: '#FEF2F2', border: '1px solid #FECACA',
                borderRadius: '10px', fontSize: '0.8125rem', color: '#B91C1C', fontWeight: 500, lineHeight: '1.4'
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#334155', marginBottom: '0.5rem' }}>
                Admin ID / Email
              </label>
              <input
                type="text"
                placeholder="e.g. admin or thesterlingadvisory@gmail.com"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.875rem 1rem',
                  borderRadius: '10px', border: '1.5px solid #CBD5E1',
                  background: '#F8FAFC', color: '#0F172A', fontSize: '0.9375rem',
                  outline: 'none', transition: 'border-color 200ms ease'
                }}
                onFocus={e => e.target.style.borderColor = '#C59B27'}
                onBlur={e => e.target.style.borderColor = '#CBD5E1'}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#334155' }}>
                  Secure Passcode
                </label>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Default: Sterling@2026</span>
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
                    borderRadius: '10px', border: '1.5px solid #CBD5E1',
                    background: '#F8FAFC', color: '#0F172A', fontSize: '0.9375rem',
                    outline: 'none', transition: 'border-color 200ms ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#C59B27'}
                  onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748B'
                  }}
                >
                  {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '0.5rem', width: '100%', padding: '1rem',
                borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)',
                color: '#0F172A', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800,
                letterSpacing: '0.04em', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: '0 6px 16px rgba(223, 186, 115, 0.4)', transition: 'transform 150ms ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Unlock Admin Portal</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600, textDecoration: 'none' }}>
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED LIGHT THEME ADMIN DESK ──
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', color: '#0F172A', fontFamily: 'var(--font-body)' }}>
      {/* ── Left Sidebar (Crisp White Card Theme) ── */}
      <aside style={{
        width: '270px', flexShrink: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', zIndex: 40,
        boxShadow: '2px 0 12px rgba(15, 23, 42, 0.02)'
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#0F172A',
              borderRadius: '8px', boxShadow: '0 4px 12px rgba(223, 186, 115, 0.3)'
            }}>S</div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', letterSpacing: '0.02em' }}>
                STERLING ADVISORY
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#C59B27', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                Senior CRM Portal
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '1.5rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0 0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
            Management Desk
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
                  borderRadius: '10px',
                  background: isActive ? '#FFFBEB' : 'transparent',
                  border: isActive ? '1px solid #FDE68A' : '1px solid transparent',
                  color: isActive ? '#B45309' : '#475569',
                  textDecoration: 'none', transition: 'all 200ms ease',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} style={{ color: isActive ? '#D97706' : '#64748B' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    background: '#DFBA73', color: '#0F172A',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800,
                    padding: '2px 8px', borderRadius: '12px'
                  }}>
                    {item.badge} NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions Footer */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', padding: '0.75rem', background: '#FFFFFF',
              border: '1px solid #CBD5E1', borderRadius: '8px',
              fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A', textDecoration: 'none',
              transition: 'all 200ms ease', marginBottom: '0.75rem'
            }}
          >
            <span>View Live Website</span>
            <ExternalLink size={14} style={{ color: '#D97706' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>CRM Active</span>
            </div>
            <button 
              onClick={() => fetchLeadsCount()}
              title="Refresh Count"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D97706' }}
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Bar */}
        <header style={{
          height: '70px', background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Welcome back, <strong style={{ color: '#0F172A', fontWeight: 700 }}>Deep Kalra</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 0.875rem', background: '#FEF3C7',
              border: '1px solid #FDE68A', borderRadius: '20px',
              fontSize: '0.75rem', color: '#92400E', fontWeight: 700
            }}>
              <ShieldCheck size={14} style={{ color: '#D97706' }} />
              <span>Senior Admin Role</span>
            </div>

            <button
              onClick={handleLogout}
              title="Lock & Log out of Admin Desk"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #FECACA',
                background: '#FEF2F2', color: '#DC2626', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 150ms ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
              onMouseLeave={e => e.currentTarget.style.background = '#FEF2F2'}
            >
              <LogOut size={14} />
              <span>Log Out</span>
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
