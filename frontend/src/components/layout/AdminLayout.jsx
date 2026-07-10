import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Users, LayoutDashboard, FileText, Settings, ExternalLink, 
  ShieldCheck, Bell, ChevronRight, LogOut, RefreshCw 
} from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const [leadsCount, setLeadsCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  const fetchLeadsCount = async () => {
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
    fetchLeadsCount();
    const interval = setInterval(fetchLeadsCount, 15000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Leads & CRM Desk', path: '/admin', icon: Users, badge: newCount > 0 ? newCount : null },
    { label: 'Homepage Builder', path: '/admin/homepage-builder', icon: LayoutDashboard },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#05080F', display: 'flex', color: '#ffffff' }}>
      {/* ── Left Sidebar ── */}
      <aside style={{
        width: '270px', flexShrink: 0,
        background: '#0A0F1D',
        borderRight: '1px solid #1E293B',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', zIndex: 40
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid #1E293B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#000000',
              borderRadius: '8px', boxShadow: '0 4px 12px rgba(223, 186, 115, 0.3)'
            }}>S</div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
                STERLING ADVISORY
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#DFBA73', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Senior CRM Portal
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '1.5rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0 0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
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
                  borderRadius: '8px',
                  background: isActive ? 'rgba(223, 186, 115, 0.12)' : 'transparent',
                  border: isActive ? '1px solid #DFBA73' : '1px solid transparent',
                  color: isActive ? '#DFBA73' : '#94A3B8',
                  textDecoration: 'none', transition: 'all 200ms ease',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} style={{ color: isActive ? '#DFBA73' : '#64748B' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    background: '#DFBA73', color: '#000000',
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
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid #1E293B', background: 'rgba(5, 8, 15, 0.6)' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', padding: '0.75rem', background: '#05080F',
              border: '1px solid #334155', borderRadius: '8px',
              fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
              transition: 'all 200ms ease', marginBottom: '0.75rem'
            }}
          >
            <span>View Live Website</span>
            <ExternalLink size={14} style={{ color: '#DFBA73' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>CRM Active</span>
            </div>
            <button 
              onClick={() => fetchLeadsCount()}
              title="Refresh Count"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DFBA73' }}
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
          height: '70px', background: '#0A0F1D',
          borderBottom: '1px solid #1E293B',
          padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
              Welcome back, <strong style={{ color: '#ffffff', fontWeight: 700 }}>Deep Kalra</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 0.875rem', background: '#05080F',
              border: '1px solid #334155', borderRadius: '20px',
              fontSize: '0.75rem', color: '#ffffff', fontWeight: 600
            }}>
              <ShieldCheck size={14} style={{ color: '#DFBA73' }} />
              <span>Senior Admin Role</span>
            </div>
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
