const fs = require('fs');
const path = require('path');

// 1. Fix AdminLayout.jsx sidebar theme
const layoutFile = path.join(__dirname, 'frontend', 'src', 'components', 'layout', 'AdminLayout.jsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');

// Replace the authenticated layout section to enforce hardcoded dark theme for the sidebar
// Find the sidebar aside element
layoutContent = layoutContent.replace(
  /background: 'var\(--color-secondary\)',\s*borderRight: '1px solid rgba\(255,255,255,0\.08\)'/,
  "background: '#0A0F1D',\n        borderRight: '1px solid rgba(255,255,255,0.05)'"
);
layoutContent = layoutContent.replace(
  /<div style={{ minHeight: '100vh', background: 'var\(--color-primary\)', display: 'flex', color: '#ffffff' }}>/,
  "<div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', color: '#111827' }}>"
);

// Top header bar (make it white)
layoutContent = layoutContent.replace(
  /height: '70px', background: 'var\(--color-secondary\)',\s*borderBottom: '1px solid rgba\(255,255,255,0\.08\)'/,
  "height: '70px', background: '#FFFFFF',\n          borderBottom: '1px solid #E5E7EB'"
);
// Top header text color
layoutContent = layoutContent.replace(
  /Practitioner Desk: <strong style={{ color: '#ffffff', fontWeight: 600 }}>/,
  "Practitioner Desk: <strong style={{ color: '#111827', fontWeight: 600 }}>"
);
layoutContent = layoutContent.replace(
  /color: 'rgba\(255,255,255,0\.7\)'/,
  "color: '#6B7280'"
);

fs.writeFileSync(layoutFile, layoutContent, 'utf8');


// 2. Complete rewrite of AdminDashboard.jsx
const dashFile = path.join(__dirname, 'frontend', 'src', 'pages', 'admin', 'AdminDashboard.jsx');

const premiumDashboard = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Filter, Phone, Mail, MessageSquare, 
  CheckCircle, Clock, AlertCircle, ExternalLink, ChevronDown, 
  Save, RefreshCw, Briefcase, Calendar, ShieldCheck, Sparkles, MoreVertical
} from 'lucide-react';
import { getApiUrl } from '../../utils/api';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('supabase_admin_token') || 'executive-passcode-auth';
      const res = await fetch(getApiUrl('/api/leads'), {
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
      const json = await res.json();
      if (json && json.success) {
        setLeads(json.data || []);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.warn('Backend reach error:', err.message);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }

    try {
      const token = localStorage.getItem('supabase_admin_token') || 'executive-passcode-auth';
      await fetch(getApiUrl(\`/api/leads/\${leadId}\`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Status patch update error:', e.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    const updatedLead = { ...selectedLead, notes: editingNotes };
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);

    try {
      const token = localStorage.getItem('supabase_admin_token') || 'executive-passcode-auth';
      await fetch(getApiUrl(\`/api/leads/\${selectedLead.id}\`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify({ notes: editingNotes })
      });
    } catch (e) {
      console.warn('Notes patch update error:', e.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch = 
      l.name?.toLowerCase().includes(q) ||
      l.company_name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.id?.toLowerCase().includes(q) ||
      l.phone?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return { bg: '#FEF3C7', text: '#D97706', label: 'PRIORITY INTAKE' };
      case 'CONTACTED':
        return { bg: '#DBEAFE', text: '#2563EB', label: 'COUNSEL CONTACTED' };
      case 'IN_PROGRESS':
        return { bg: '#F3E8FF', text: '#9333EA', label: 'UNDER ASSESSMENT' };
      case 'CONVERTED':
        return { bg: '#D1FAE5', text: '#059669', label: 'RETAINER ACTIVE' };
      case 'CLOSED':
        return { bg: '#F1F5F9', text: '#64748B', label: 'MANDATE CLOSED' };
      default:
        return { bg: '#F1F5F9', text: '#475569', label: status };
    }
  };

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    border: '1px solid #F1F5F9'
  };

  return (
    <div style={{ padding: '3rem 2rem 5rem', maxWidth: '88rem', margin: '0 auto', color: '#111827', minHeight: '100vh', background: '#F9FAFB' }}>
      
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#B49359', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              Partner Intake Portal
            </span>
            <span style={{ background: '#D1FAE5', padding: '2px 8px', fontSize: '0.65rem', borderRadius: '4px', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>
              ● LIVE REGISTRY
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
            Retainer Governance
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '640px', lineHeight: '1.5' }}>
            Supervise statutory intakes, assign Senior Advisory leads, and formulate binding representation scope quotes directly from the central registry.
          </p>
        </div>

        <button
          onClick={() => fetchLeads()}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.25rem',
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
            color: '#374151', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'all 160ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
        >
          <RefreshCw size={15} style={{ color: '#B49359' }} />
          <span>Sync Feed</span>
        </button>
      </div>

      {/* ── Stats Matrix ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Total Mandates</span>
            <Users size={18} style={{ color: '#9CA3AF' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>{leads.length}</div>
        </div>

        <div style={{ ...cardStyle, background: '#111827', border: '1px solid #B49359' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#B49359', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Priority Queue</span>
            <Sparkles size={18} style={{ color: '#B49359' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {leads.filter(l => l.status === 'NEW').length}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Under Assessment</span>
            <Clock size={18} style={{ color: '#3B82F6' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {leads.filter(l => l.status === 'CONTACTED' || l.status === 'IN_PROGRESS').length}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Retainers Executed</span>
            <CheckCircle size={18} style={{ color: '#10B981' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {leads.filter(l => l.status === 'CONVERTED').length}
          </div>
        </div>
      </div>

      {/* ── Search & Filter Control Bar ── */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem'
      }}>
        <div style={{ position: 'relative', width: '400px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search entities, IDs, or contacts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: '#FFFFFF', border: '1px solid #E5E7EB',
              padding: '0.875rem 1.25rem 0.875rem 3rem', borderRadius: '12px', color: '#111827', fontSize: '0.875rem',
              outline: 'none', transition: 'all 160ms ease', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
            onFocus={e => { e.target.style.borderColor = '#B49359'; e.target.style.boxShadow = '0 4px 14px rgba(180, 147, 89, 0.1)'; }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)'; }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', background: '#FFFFFF', padding: '0.375rem', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'].map((st) => {
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                  fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 160ms ease',
                  background: isSelected ? '#111827' : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#6B7280',
                  border: 'none',
                }}
              >
                {st.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Table & Tray ── */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '1fr 480px' : '1fr', gap: '1.5rem', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
        
        {/* Left Side: Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '6rem', textAlign: 'center', color: '#9CA3AF', fontWeight: 500 }}>
              Syncing Fiduciary Registry...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '6rem', textAlign: 'center', color: '#9CA3AF', fontWeight: 500 }}>
              No statutory intakes match your selected criteria.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Entity Profile</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Disciplines</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((l) => {
                    const badge = getStatusBadge(l.status);
                    const isSelected = selectedLead && selectedLead.id === l.id;
                    return (
                      <tr
                        key={l.id}
                        onClick={() => { setSelectedLead(l); setEditingNotes(l.notes || ''); }}
                        style={{
                          borderBottom: '1px solid #F3F4F6',
                          background: isSelected ? '#F9FAFB' : '#FFFFFF',
                          cursor: 'pointer', transition: 'all 160ms ease'
                        }}
                        onMouseEnter={e => { if(!isSelected) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                        onMouseLeave={e => { if(!isSelected) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                      >
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#B49359', fontWeight: 700, marginBottom: '4px' }}>
                            {l.id}
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {l.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            {l.company_name}
                          </div>
                        </td>

                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '300px' }}>
                            {(Array.isArray(l.interested_in) ? l.interested_in : [l.interested_in]).map((srv, idx) => (
                              <span key={idx} style={{
                                background: '#F1F5F9', border: '1px solid #E2E8F0',
                                padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#475569', fontWeight: 600
                              }}>
                                {srv}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td style={{ padding: '1.25rem 1.5rem' }} onClick={e => e.stopPropagation()}>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <select
                              value={l.status}
                              onChange={e => handleStatusChange(l.id, e.target.value)}
                              style={{
                                appearance: 'none',
                                background: badge.bg, color: badge.text, 
                                padding: '0.5rem 2rem 0.5rem 1rem', borderRadius: '2rem',
                                fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                                cursor: 'pointer', outline: 'none', border: 'none',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                              }}
                            >
                              <option value="NEW">PRIORITY INTAKE</option>
                              <option value="CONTACTED">COUNSEL CONTACTED</option>
                              <option value="IN_PROGRESS">UNDER ASSESSMENT</option>
                              <option value="CONVERTED">RETAINER ACTIVE</option>
                              <option value="CLOSED">MANDATE CLOSED</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: badge.text, pointerEvents: 'none' }} />
                          </div>
                        </td>

                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {l.phone && l.phone !== 'Not Provided' && (
                              <a
                                href={\`https://wa.me/\${l.phone.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(\`Hello \${l.name}, senior statutory counsel following up regarding your retainer scope assessment (\${l.id}) at Sterling Advisory.\`)}\`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  padding: '8px', background: '#DCFCE7',
                                  borderRadius: '8px', color: '#16A34A',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 160ms ease',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                              >
                                <MessageSquare size={16} />
                              </a>
                            )}
                            <a
                              href={\`mailto:\${l.email}?subject=Statutory Retainer Proposal - Sterling Advisory (\${l.id})\`}
                              style={{
                                padding: '8px', background: '#F1F5F9',
                                borderRadius: '8px', color: '#475569',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 160ms ease',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                              }}
                              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                            >
                              <Mail size={16} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side: Tray */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                background: '#FFFFFF', border: '1px solid #E5E7EB',
                borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column',
                position: 'sticky', top: '6.5rem', maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto',
                boxShadow: '0 12px 32px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#B49359', fontWeight: 700 }}>
                    {selectedLead.id}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
                    {selectedLead.name}
                  </h3>
                  <div style={{ fontSize: '0.9375rem', color: '#6B7280', marginTop: '4px' }}>{selectedLead.company_name}</div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  style={{ background: '#F1F5F9', border: 'none', color: '#475569', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 160ms ease' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem', padding: '1.25rem', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
                  <div style={{ fontSize: '0.9375rem', color: '#111827', fontWeight: 600, marginTop: '2px' }}>{selectedLead.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                  <div style={{ fontSize: '0.9375rem', color: '#3B82F6', fontWeight: 600, marginTop: '2px' }}>{selectedLead.email}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline / SLA</div>
                  <div style={{ fontSize: '0.9375rem', color: '#111827', fontWeight: 600, marginTop: '2px' }}>{selectedLead.timeline}</div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 700, marginBottom: '0.75rem' }}>Client Scope Briefing</div>
                <div style={{
                  padding: '1.25rem', background: '#FFFFFF', border: '1px solid #E5E7EB',
                  borderRadius: '12px', fontSize: '0.9375rem', color: '#4B5563', lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                }}>
                  {selectedLead.message || 'No specific statutory notes transmitted during initial registration.'}
                </div>
              </div>

              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
                    Counsel Notes
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#B49359', fontWeight: 600 }}>Encrypted Record</span>
                </div>
                <textarea
                  value={editingNotes}
                  onChange={e => setEditingNotes(e.target.value)}
                  placeholder="Record case assessment, quote transmitted, or next statutory milestone here..."
                  style={{
                    width: '100%', minHeight: '140px', background: '#F9FAFB', border: '1px solid #D1D5DB',
                    borderRadius: '12px', padding: '1rem', color: '#111827', fontSize: '0.9375rem', outline: 'none',
                    resize: 'vertical', marginBottom: '1rem', transition: 'all 160ms ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                  }}
                  onFocus={e => { e.target.style.borderColor = '#B49359'; e.target.style.boxShadow = '0 0 0 4px rgba(180, 147, 89, 0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)'; }}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  style={{
                    width: '100%', padding: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#111827', color: '#FFFFFF', borderRadius: '12px',
                    fontWeight: 600, fontSize: '0.9375rem', border: 'none',
                    cursor: savingNotes ? 'not-allowed' : 'pointer',
                    transition: 'all 160ms ease',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={e => { if(!savingNotes) e.currentTarget.style.background = '#000000'; }}
                  onMouseLeave={e => { if(!savingNotes) e.currentTarget.style.background = '#111827'; }}
                >
                  <Save size={18} />
                  <span>{savingNotes ? 'Syncing Record...' : 'Save Counsel Notes'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(dashFile, premiumDashboard, 'utf8');
console.log('Premium Admin UI redesign complete!');
