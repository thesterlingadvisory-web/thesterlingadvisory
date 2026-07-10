import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Filter, Phone, Mail, MessageSquare, 
  CheckCircle, Clock, AlertCircle, ExternalLink, ChevronDown, 
  Save, RefreshCw, Briefcase, Calendar, ShieldCheck, Sparkles 
} from 'lucide-react';

const SAMPLE_LEADS = [
  {
    id: "ST-ADV-9402",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@techventure.in",
    phone: "+91 98110 44210",
    company_name: "TechVenture India Pvt Ltd",
    business_type: "2+ Co-founders / Startup",
    interested_in: ["Private Limited Company", "Trademark Registration"],
    timeline: "Immediate / Urgent (1-3 days)",
    message: "We need to incorporate our fintech startup quickly to close a seed funding round next month. Also need trademark check.",
    status: "NEW",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: "High priority seed stage startup. Follow up by evening."
  },
  {
    id: "ST-ADV-8311",
    name: "Ananya Mehta",
    email: "ananya.m@flavourcraft.com",
    phone: "+91 99201 88314",
    company_name: "FlavourCraft Foods LLP",
    business_type: "Retail / Physical Store",
    interested_in: ["FSSAI Licence", "Shops & Establishments"],
    timeline: "Standard (1-2 weeks)",
    message: "Opening a cloud kitchen and retail pastry outlet in Gurgaon. Need all local municipal and FSSAI licenses.",
    status: "CONTACTED",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: "Quoted Rs. 18,000 for comprehensive FSSAI + Trade license package."
  },
  {
    id: "ST-ADV-7194",
    name: "Vikramaditya Verma",
    email: "vikram@vermaexports.co.in",
    phone: "+91 98712 33901",
    company_name: "Verma Global Trading Co.",
    business_type: "Existing Business / Compliance",
    interested_in: ["GST & Tax Registrations", "Annual Compliance & Accounting"],
    timeline: "Just Exploring / Planning",
    message: "Looking to switch our annual corporate accounting and GST filings to Sterling Advisory from next quarter.",
    status: "IN_PROGRESS",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: "Sent annual fee schedule proposal."
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
      const res = await fetch('http://localhost:5000/api/leads');
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
      await fetch(`http://localhost:5000/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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
      await fetch(`http://localhost:5000/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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
        return { bg: '#FEF3C7', border: '#FDE68A', text: '#D97706', label: 'NEW INQUIRY' };
      case 'CONTACTED':
        return { bg: '#DBEAFE', border: '#BFDBFE', text: '#2563EB', label: 'CONTACTED' };
      case 'IN_PROGRESS':
        return { bg: '#F3E8FF', border: '#E9D5FF', text: '#9333EA', label: 'IN PROGRESS' };
      case 'CONVERTED':
        return { bg: '#D1FAE5', border: '#A7F3D0', text: '#059669', label: 'CONVERTED / WON' };
      case 'CLOSED':
        return { bg: '#F1F5F9', border: '#E2E8F0', text: '#64748B', label: 'CLOSED' };
      default:
        return { bg: '#F8FAFC', border: '#CBD5E1', text: '#334155', label: status };
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '96rem', margin: '0 auto', color: '#0F172A', fontFamily: 'var(--font-body)' }}>
      {/* ── Top Title & Stats Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#D97706', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
              Client Acquisition Desk
            </span>
            <span style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', padding: '2px 8px', fontSize: '0.65rem', borderRadius: '10px', color: '#059669', fontWeight: 700 }}>
              ● Live CRM Active
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Leads & Consultation Pipeline
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Track qualification data, manage consultation follow-ups, and connect instantly with prospective clients.
          </p>
        </div>

        <button
          onClick={() => fetchLeads()}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '0.65rem 1.25rem',
            background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px',
            color: '#0F172A', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 200ms ease',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C59B27'; e.currentTarget.style.background = '#FFFBEB'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#FFFFFF'; }}
        >
          <RefreshCw size={15} style={{ color: '#D97706' }} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Total Inquiries</span>
            <Users size={18} style={{ color: '#64748B' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0F172A' }}>{leads.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#D97706', marginTop: '0.25rem', fontWeight: 600 }}>Active client database</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1.5px solid #FDE68A', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#D97706', textTransform: 'uppercase', fontWeight: 700 }}>New (Uncontacted)</span>
            <Sparkles size={18} style={{ color: '#D97706' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0F172A' }}>
            {leads.filter(l => l.status === 'NEW').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', fontWeight: 600 }}>Requires immediate follow-up</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>In Progress / Contacted</span>
            <Clock size={18} style={{ color: '#2563EB' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0F172A' }}>
            {leads.filter(l => l.status === 'CONTACTED' || l.status === 'IN_PROGRESS').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem', fontWeight: 500 }}>Active client discussions</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Converted Clients</span>
            <CheckCircle size={18} style={{ color: '#059669' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0F172A' }}>
            {leads.filter(l => l.status === 'CONVERTED').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', fontWeight: 600 }}>Successfully onboarded</div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div style={{ 
        background: '#FFFFFF', border: '1px solid #E2E8F0',
        padding: '1.25rem 1.5rem', borderRadius: '14px', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '380px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input
            type="text"
            placeholder="Search by name, company, phone, ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: '#F8FAFC', border: '1.5px solid #CBD5E1',
              padding: '0.625rem 1rem 0.625rem 2.75rem', borderRadius: '10px', color: '#0F172A', fontSize: '0.875rem',
              outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 200ms ease'
            }}
            onFocus={e => e.target.style.borderColor = '#C59B27'}
            onBlur={e => e.target.style.borderColor = '#CBD5E1'}
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
                  padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
                  fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 200ms ease',
                  background: isSelected ? '#0F172A' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  border: isSelected ? '1px solid #0F172A' : '1px solid #CBD5E1',
                }}
              >
                {st.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Table List & Detail Tray ── */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '1fr 440px' : '1fr', gap: '1.5rem', transition: 'all 300ms ease' }}>
        {/* Left Side: Leads Table Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.03)' }}>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
              Loading latest consultation requests...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
              No leads match your search criteria.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Ticket & Client</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Business Stage</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Services Requested</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Actions</th>
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
                          borderBottom: '1px solid #E2E8F0',
                          background: isSelected ? '#FEF3C7' : 'transparent',
                          cursor: 'pointer', transition: 'background 150ms ease'
                        }}
                      >
                        {/* Client & ID */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: '#D97706', fontWeight: 700, marginBottom: '3px' }}>
                            {l.id}
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                            {l.name}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                            {l.company_name}
                          </div>
                        </td>

                        {/* Stage */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                            {l.business_type}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            Timeline: <strong style={{ color: '#2563EB' }}>{l.timeline}</strong>
                          </span>
                        </td>

                        {/* Services List */}
                        <td style={{ padding: '1.125rem 1.25rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '280px' }}>
                            {(Array.isArray(l.interested_in) ? l.interested_in : [l.interested_in]).map((srv, idx) => (
                              <span key={idx} style={{
                                background: '#F1F5F9', border: '1px solid #CBD5E1',
                                padding: '3px 8px', borderRadius: '6px', fontSize: '0.725rem', color: '#334155', fontWeight: 600
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
                              background: badge.bg, border: `1.5px solid ${badge.border}`,
                              color: badge.text, padding: '0.4rem 0.625rem', borderRadius: '8px',
                              fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                              cursor: 'pointer', outline: 'none'
                            }}
                          >
                            <option value="NEW">NEW INQUIRY</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="CONVERTED">CONVERTED / WON</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>

                        {/* Quick Connect Actions */}
                        <td style={{ padding: '1.125rem 1.25rem' }} onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {l.phone && l.phone !== 'Not Provided' && (
                              <a
                                href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${l.name}, following up regarding your consultation inquiry (${l.id}) at Sterling Advisory for ${Array.isArray(l.interested_in) ? l.interested_in[0] : l.interested_in}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  padding: '6px 10px', background: '#D1FAE5',
                                  border: '1px solid #10B981', borderRadius: '8px', color: '#059669',
                                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', textDecoration: 'none',
                                  fontWeight: 700
                                }}
                              >
                                <MessageSquare size={14} /> WA
                              </a>
                            )}
                            <a
                              href={`mailto:${l.email}?subject=Consultation Follow-up - Sterling Advisory (${l.id})`}
                              title="Send Email"
                              style={{
                                padding: '6px 10px', background: '#F8FAFC',
                                border: '1px solid #CBD5E1', borderRadius: '8px', color: '#0F172A',
                                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', textDecoration: 'none',
                                fontWeight: 600
                              }}
                            >
                              <Mail size={14} />
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

        {/* Right Side: Expandable Detail & Notes Tray */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                background: '#FFFFFF', border: '1.5px solid #FDE68A',
                borderRadius: '14px', padding: '1.75rem', display: 'flex', flexDirection: 'column',
                position: 'sticky', top: '6rem', maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: '#D97706', fontWeight: 700 }}>
                    {selectedLead.id}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                    {selectedLead.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
              </div>

              {/* Client Profile Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Company / Entity</div>
                  <div style={{ fontSize: '0.95rem', color: '#0F172A', fontWeight: 700 }}>{selectedLead.company_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Contact Information</div>
                  <div style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 600 }}>{selectedLead.phone}</div>
                  <div style={{ fontSize: '0.9rem', color: '#D97706', fontWeight: 600 }}>{selectedLead.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Business Stage & Timeline</div>
                  <div style={{ fontSize: '0.9rem', color: '#0F172A' }}>{selectedLead.business_type} • <span style={{ color: '#2563EB', fontWeight: 600 }}>{selectedLead.timeline}</span></div>
                </div>
              </div>

              {/* Specific Requirements / Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '0.375rem' }}>Client Specific Message</div>
                <div style={{
                  padding: '1rem', background: '#F8FAFC', border: '1px solid #CBD5E1',
                  borderRadius: '10px', fontSize: '0.875rem', color: '#334155', lineHeight: '1.6'
                }}>
                  {selectedLead.message || 'No specific notes entered during submission.'}
                </div>
              </div>

              {/* Admin Internal CRM Notes */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Staff Follow-up Notes
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#64748B' }}>Internal Private Record</span>
                </div>
                <textarea
                  value={editingNotes}
                  onChange={e => setEditingNotes(e.target.value)}
                  placeholder="Record your phone discussion, quote sent, or next follow-up date here..."
                  style={{
                    width: '100%', minHeight: '120px', background: '#F8FAFC', border: '1.5px solid #CBD5E1',
                    borderRadius: '10px', padding: '0.75rem', color: '#0F172A', fontSize: '0.875rem', outline: 'none',
                    resize: 'vertical', fontFamily: 'var(--font-body)', marginBottom: '0.75rem', transition: 'border-color 200ms ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#C59B27'}
                  onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.85rem',
                    background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)', border: 'none', borderRadius: '10px',
                    color: '#0F172A', fontWeight: 800, fontSize: '0.9rem', cursor: savingNotes ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-heading)', boxShadow: '0 4px 14px rgba(223, 186, 115, 0.35)'
                  }}
                >
                  <Save size={16} />
                  <span>{savingNotes ? 'Saving Notes...' : 'Save Follow-up Notes'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
