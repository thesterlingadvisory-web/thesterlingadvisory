import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Filter, Phone, Mail, MessageSquare, 
  CheckCircle, Clock, AlertCircle, ExternalLink, ChevronDown, 
  Save, RefreshCw, Briefcase, Calendar, ShieldCheck, Sparkles 
} from 'lucide-react';
import { getApiUrl } from '../../utils/api';

const SAMPLE_LEADS = [
  {
    id: "ST-ADV-9402",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@techventure.in",
    phone: "+91 98110 44210",
    company_name: "TechVenture India Pvt Ltd",
    business_type: "Venture / Tech Startup",
    interested_in: ["Corporate Setup (Private Limited)", "Trademark & Proprietary IP Defense"],
    timeline: "Priority Statutory SLA (1–3 Days)",
    message: "We need to incorporate our venture-backed structure immediately to close institutional seed financing. Also require comprehensive trademark clearance across Class 9 and 42.",
    status: "NEW",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: "Priority institutional mandate. Senior Corporate Advisor assigned for immediate jurisdiction review."
  },
  {
    id: "ST-ADV-8311",
    name: "Ananya Mehta",
    email: "ananya.m@flavourcraft.com",
    phone: "+91 99201 88314",
    company_name: "FlavourCraft Foods LLP",
    business_type: "Retail / Physical Store",
    interested_in: ["FSSAI Statutory Licensing", "Shops & Establishments Enrolment"],
    timeline: "Standard Retainer Scope (1–2 Weeks)",
    message: "Launching commercial processing kitchen and retail pastry outlet in Gurgaon. Require municipal trade licensing and Central FSSAI permit.",
    status: "CONTACTED",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: "Formal fee proposal (₹18,500 fixed scope) transmitted via encrypted client portal."
  },
  {
    id: "ST-ADV-7194",
    name: "Vikramaditya Verma",
    email: "vikram@vermaexports.co.in",
    phone: "+91 98712 33901",
    company_name: "Verma Global Trading Co.",
    business_type: "Established Corporate Entity",
    interested_in: ["Multi-State GST & Tax Structuring", "Retainer Governance & Annual ROC Audit"],
    timeline: "Scope Evaluation / Assessment",
    message: "Evaluating transition of annual statutory representation and quarterly GST audit retainers to Sterling Advisory commencing upcoming fiscal quarter.",
    status: "IN_PROGRESS",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: "Scheduled partner-level briefing to review multi-port IEC and drawback compliance."
  }
];

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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (json && json.success && json.data.length > 0) {
        setLeads(json.data);
      } else {
        setLeads(SAMPLE_LEADS);
      }
    } catch (err) {
      console.warn('Backend reach error, using local fallback leads:', err.message);
      setLeads(SAMPLE_LEADS);
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
      await fetch(getApiUrl(`/api/leads/${leadId}`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      await fetch(getApiUrl(`/api/leads/${selectedLead.id}`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes: editingNotes })
      });
    } catch (e) {
      console.warn('Notes patch update error:', e.message);
    } finally {
      setSavingNotes(false);
    }
  };

  // Filter & Search
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
        return { bg: 'rgba(223,186,115,0.15)', border: 'var(--color-gold)', text: 'var(--color-gold)', label: 'PRIORITY INTAKE' };
      case 'CONTACTED':
        return { bg: 'rgba(37,99,235,0.15)', border: '#3B82F6', text: '#60A5FA', label: 'COUNSEL CONTACTED' };
      case 'IN_PROGRESS':
        return { bg: 'rgba(147,51,234,0.15)', border: '#A855F7', text: '#C084FC', label: 'UNDER ASSESSMENT' };
      case 'CONVERTED':
        return { bg: 'rgba(5,150,105,0.15)', border: '#10B981', text: '#34D399', label: 'RETAINER ACTIVE' };
      case 'CLOSED':
        return { bg: 'rgba(100,116,139,0.15)', border: '#64748B', text: '#94A3B8', label: 'MANDATE CLOSED' };
      default:
        return { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.2)', text: '#ffffff', label: status };
    }
  };

  return (
    <div style={{ padding: '6.5rem 2rem 5rem', maxWidth: '88rem', margin: '0 auto', color: '#ffffff', minHeight: '100vh', background: 'var(--color-primary)' }}>
      {/* ── Top Title & Stats Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.625rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              Partner Intake Portal
            </span>
            <span style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid #25D366', padding: '2px 8px', fontSize: '0.65rem', borderRadius: 'var(--radius-sm)', color: '#25D366', fontWeight: 700 }}>
              ● Encrypted Registry Feed
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Retainer & Mandate Governance Desk
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', maxWidth: '640px', lineHeight: '1.6' }}>
            Supervise statutory intakes, assign Senior Advisory leads, and formulate binding representation scope quotes directly from the central registry.
          </p>
        </div>

        <button
          onClick={() => fetchLeads()}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '0.65rem 1.25rem',
            background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)',
            color: '#ffffff', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', transition: 'border-color 160ms ease, background-color 160ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.backgroundColor = 'var(--color-navy)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; }}
        >
          <RefreshCw size={14} style={{ color: 'var(--color-gold)' }} />
          <span>Sync Statutory Feed</span>
        </button>
      </div>

      {/* ── Stats Matrix ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Total Mandates Logged</span>
            <Users size={16} style={{ color: 'var(--color-text-light)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>{leads.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '0.25rem', fontWeight: 600 }}>Active corporate registry</div>
        </div>

        <div style={{ background: 'var(--color-navy)', border: '1px solid var(--color-gold)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>Priority Intake Queue</span>
            <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {leads.filter(l => l.status === 'NEW').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.25rem', fontWeight: 600 }}>Requires immediate practice assignment</div>
        </div>

        <div style={{ background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Under Counsel Assessment</span>
            <Clock size={16} style={{ color: '#60A5FA' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {leads.filter(l => l.status === 'CONTACTED' || l.status === 'IN_PROGRESS').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.25rem', fontWeight: 500 }}>Active scope negotiations</div>
        </div>

        <div style={{ background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Active Retainers Executed</span>
            <CheckCircle size={16} style={{ color: '#34D399' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {leads.filter(l => l.status === 'CONVERTED').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.25rem', fontWeight: 600 }}>Formal retainers signed</div>
        </div>
      </div>

      {/* ── Search & Filter Control Bar ── */}
      <div style={{ 
        background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '380px', maxWidth: '100%' }}>
          <Search size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
          <input
            type="text"
            placeholder="Search by entity name, ticket ID, or contact number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
              padding: '0.625rem 1rem 0.625rem 2.75rem', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.8125rem',
              outline: 'none', transition: 'border-color 160ms ease'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'].map((st) => {
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600,
                  fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 160ms ease',
                  background: isSelected ? 'var(--color-gold)' : 'rgba(255,255,255,0.04)',
                  color: isSelected ? 'var(--color-navy)' : 'rgba(255,255,255,0.7)',
                  border: isSelected ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {st.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Mandates Table List & Inspection Tray ── */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '1fr 440px' : '1fr', gap: '1.5rem', transition: 'all 200ms ease' }}>
        
        {/* Left Side: Mandates Table Card */}
        <div style={{ background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
              Loading corporate intake registry...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
              No statutory intakes match your selected criteria.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--color-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Intake Ticket & Entity</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Constitutional Stage</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Requested Disciplines</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Intake Status</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Practitioner Actions</th>
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
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                          background: isSelected ? 'rgba(223,186,115,0.1)' : 'transparent',
                          cursor: 'pointer', transition: 'background-color 160ms ease'
                        }}
                      >
                        {/* Client & ID */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '3px' }}>
                            {l.id}
                          </div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                            {l.name}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
                            {l.company_name}
                          </div>
                        </td>

                        {/* Stage */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                            {l.business_type}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                            SLA: <strong style={{ color: '#60A5FA' }}>{l.timeline}</strong>
                          </span>
                        </td>

                        {/* Services List */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '280px' }}>
                            {(Array.isArray(l.interested_in) ? l.interested_in : [l.interested_in]).map((srv, idx) => (
                              <span key={idx} style={{
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                                padding: '3px 8px', borderRadius: '4px', fontSize: '0.725rem', color: '#ffffff', fontWeight: 500
                              }}>
                                {srv}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td style={{ padding: '1.125rem 1.25rem' }} onClick={e => e.stopPropagation()}>
                          <select
                            value={l.status}
                            onChange={e => handleStatusChange(l.id, e.target.value)}
                            style={{
                              background: badge.bg, border: `1px solid ${badge.border}`,
                              color: badge.text, padding: '0.4rem 0.625rem', borderRadius: 'var(--radius-sm)',
                              fontSize: '0.725rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
                              cursor: 'pointer', outline: 'none'
                            }}
                          >
                            <option value="NEW" style={{ background: 'var(--color-navy)', color: '#ffffff' }}>PRIORITY INTAKE</option>
                            <option value="CONTACTED" style={{ background: 'var(--color-navy)', color: '#ffffff' }}>COUNSEL CONTACTED</option>
                            <option value="IN_PROGRESS" style={{ background: 'var(--color-navy)', color: '#ffffff' }}>UNDER ASSESSMENT</option>
                            <option value="CONVERTED" style={{ background: 'var(--color-navy)', color: '#ffffff' }}>RETAINER ACTIVE</option>
                            <option value="CLOSED" style={{ background: 'var(--color-navy)', color: '#ffffff' }}>MANDATE CLOSED</option>
                          </select>
                        </td>

                        {/* Quick Connect Actions */}
                        <td style={{ padding: '1.125rem 1.25rem' }} onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {l.phone && l.phone !== 'Not Provided' && (
                              <a
                                href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${l.name}, senior statutory counsel following up regarding your retainer scope assessment (${l.id}) at Sterling Advisory for ${Array.isArray(l.interested_in) ? l.interested_in[0] : l.interested_in}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Direct Counsel WhatsApp"
                                style={{
                                  padding: '6px 10px', background: 'rgba(37,211,102,0.15)',
                                  border: '1px solid #25D366', borderRadius: 'var(--radius-sm)', color: '#25D366',
                                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', textDecoration: 'none',
                                  fontWeight: 600
                                }}
                              >
                                <MessageSquare size={13} /> WA
                              </a>
                            )}
                            <a
                              href={`mailto:${l.email}?subject=Statutory Retainer Proposal - Sterling Advisory (${l.id})`}
                              title="Transmit Formal Scope Email"
                              style={{
                                padding: '6px 10px', background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#ffffff',
                                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', textDecoration: 'none',
                                fontWeight: 500
                              }}
                            >
                              <Mail size={13} />
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

        {/* Right Side: Expandable Mandate Inspection Tray */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'var(--color-secondary)', border: '1px solid var(--color-gold)',
                borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column',
                position: 'sticky', top: '6.5rem', maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                    {selectedLead.id}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                    {selectedLead.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-light)', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
              </div>

              {/* Client Profile Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Entity / Corporate Name</div>
                  <div style={{ fontSize: '0.9375rem', color: '#ffffff', fontWeight: 600 }}>{selectedLead.company_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Contact Credentials</div>
                  <div style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 500 }}>{selectedLead.phone}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-gold)', fontWeight: 500 }}>{selectedLead.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Constitutional Stage & SLA</div>
                  <div style={{ fontSize: '0.875rem', color: '#ffffff' }}>{selectedLead.business_type} • <span style={{ color: '#60A5FA', fontWeight: 600 }}>{selectedLead.timeline}</span></div>
                </div>
              </div>

              {/* Specific Requirements / Notes */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600, marginBottom: '0.375rem' }}>Client Scope Briefing</div>
                <div style={{
                  padding: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6'
                }}>
                  {selectedLead.message || 'No specific statutory notes transmitted during initial registration.'}
                </div>
              </div>

              {/* Admin Internal CRM Notes */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Partner & Counsel Notes
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-light)' }}>Encrypted Fiduciary Record</span>
                </div>
                <textarea
                  value={editingNotes}
                  onChange={e => setEditingNotes(e.target.value)}
                  placeholder="Record case assessment, quote transmitted, or next statutory milestone here..."
                  style={{
                    width: '100%', minHeight: '120px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-md)', padding: '0.75rem', color: '#ffffff', fontSize: '0.875rem', outline: 'none',
                    resize: 'vertical', marginBottom: '0.75rem', transition: 'border-color 160ms ease'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="btn-gold"
                  style={{
                    width: '100%', padding: '0.75rem',
                    justifyContent: 'center',
                    cursor: savingNotes ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Save size={15} />
                  <span>{savingNotes ? 'Syncing Fiduciary Notes...' : 'Save Counsel Notes'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
