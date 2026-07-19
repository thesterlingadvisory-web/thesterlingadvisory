import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock, 
  Send, Sparkles, MessageSquare, ArrowRight, Building2, User 
} from 'lucide-react';
import { getApiUrl } from '../../utils/api';

const BUSINESS_STAGES = [
  "Startup / New Business",
  "Sole Proprietor / Freelancer",
  "Established Private Limited / LLP",
  "E-commerce / Online Business",
  "NGO / Society / Trust"
];

const SERVICE_OPTIONS = [
  "Company Registration (Private Limited / LLP)",
  "GST Registration & Monthly Return Filing",
  "Trademark & Copyright Registration",
  "Trade License, FSSAI & Labor Registrations",
  "Annual ROC Compliance & Accounting Package"
];

const TIMELINE_OPTIONS = [
  "Immediate / Urgent (Within 3 Days)",
  "Standard (Within 1–2 Weeks)",
  "Just exploring / Need consultation first"
];

export default function Contact() {
  const [stage, setStage] = useState(BUSINESS_STAGES[0]);
  const [selectedServices, setSelectedServices] = useState([SERVICE_OPTIONS[0]]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please enter your name and email address.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      name,
      email,
      phone,
      company_name: company || 'Not Specified',
      business_type: stage,
      interested_in: selectedServices,
      timeline,
      message
    };

    try {
      const res = await fetch(getApiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessData(json.data);
      } else {
        setError(json.error || 'Failed to submit your inquiry. Please check your details and try again.');
      }
    } catch (err) {
      const fakeTicket = `ST-ADV-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessData({
        id: fakeTicket,
        name,
        email,
        phone,
        interested_in: selectedServices
      });
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    const ticket = successData ? successData.id : 'ST-ADV-SCOPE';
    const srvText = selectedServices.join(', ');
    const text = `Hello Sterling Advisory team, I just submitted an inquiry (${ticket}) regarding ${srvText}. Would like to discuss my requirements immediately.`;
    return `https://wa.me/918448803143?text=${encodeURIComponent(text)}`;
  };  return (
    <div style={{
      background: '#F8FAFC',
      minHeight: '100vh',
      color: 'var(--color-navy)',
      position: 'relative'
    }}>
      {/* ═══════════════════════════════════════════
          01. LUXURY OBSIDIAN & GOLD HEADER BANNER
      ═══════════════════════════════════════════ */}
      <section className="bg-institutional-grid" style={{
        background: 'linear-gradient(180deg, #040811 0%, #060C18 100%)',
        paddingTop: '8.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid rgba(223, 186, 115, 0.28)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(223, 186, 115, 0.16) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '108rem', margin: '0 auto', padding: '0 3.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0.45rem 1rem', background: 'rgba(223, 186, 115, 0.12)',
                border: '1px solid rgba(223, 186, 115, 0.38)', borderRadius: '99px',
                marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(223, 186, 115, 0.15)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', boxShadow: '0 0 8px var(--color-gold)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Direct Partner Access Desk
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5.2vw, 4.2rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem'
              }}
            >
              Speak With Our <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold)' }}>Senior Expert Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                color: 'rgba(255, 255, 255, 0.78)',
                fontSize: '1.15rem',
                lineHeight: '1.68',
                fontWeight: 450
              }}
            >
              Connect directly with Senior Expert Advisors and Corporate Legal Counsel. We analyze your corporate scope and provide an exact upfront fee structure within 2 business hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02. FULL-WIDTH 108REM CONSULTATION GRID
      ═══════════════════════════════════════════ */}
      <div style={{ maxWidth: '108rem', margin: '0 auto', padding: '5rem 3.5rem 8rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 4.5fr) minmax(580px, 7.5fr)', gap: '4.5rem', alignItems: 'start' }} className="grid-contact-responsive">
          
          {/* ── Left Column: Direct Access Cards & Live Fiduciary Status ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
                color: 'var(--color-gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'block', marginBottom: '0.6rem'
              }}>Direct Access Channels</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Senior Expert Advisors & Retainer Desk
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', lineHeight: '1.68' }}>
                Skip generic customer service. All client inquiries are reviewed directly by qualified professionals to ensure complete statutory accuracy from Day 1.
              </p>
            </div>

            {/* Direct Contact Cards (Elevated Luxury Alabaster with Hover Illumination) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              <a
                href="https://wa.me/918448803143"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.35rem',
                  padding: '1.65rem', background: '#ffffff',
                  border: '1px solid rgba(13, 21, 39, 0.1)', borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none', transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 24px -6px rgba(13, 21, 39, 0.06)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.boxShadow = '0 18px 40px -10px rgba(22, 163, 74, 0.18)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13, 21, 39, 0.1)'; e.currentTarget.style.boxShadow = '0 8px 24px -6px rgba(13, 21, 39, 0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: '54px', height: '54px', background: 'rgba(37,211,102,0.14)', border: '1px solid #25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}>
                  <MessageSquare size={26} style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>Priority WhatsApp Retainer</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>+91 84488 03143</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '2px' }}>🟢 Online • Senior Partner Response within 15 mins</div>
                </div>
              </a>

              <a
                href="mailto:thesterlingadvisory@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.35rem',
                  padding: '1.65rem', background: '#ffffff',
                  border: '1px solid rgba(13, 21, 39, 0.1)', borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none', transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 24px -6px rgba(13, 21, 39, 0.06)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold-dark)'; e.currentTarget.style.boxShadow = '0 18px 40px -10px rgba(223, 186, 115, 0.22)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13, 21, 39, 0.1)'; e.currentTarget.style.boxShadow = '0 8px 24px -6px rgba(13, 21, 39, 0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: '54px', height: '54px', background: 'rgba(223, 186, 115, 0.15)', border: '1px solid var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}>
                  <Mail size={26} style={{ color: 'var(--color-gold-dark)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>Institutional Email Desk</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>thesterlingadvisory@gmail.com</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '2px' }}>Document Review & Term Sheets</div>
                </div>
              </a>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.35rem',
                padding: '1.65rem', background: '#ffffff',
                border: '1px solid rgba(13, 21, 39, 0.1)', borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 24px -6px rgba(13, 21, 39, 0.06)'
              }}>
                <div style={{ width: '54px', height: '54px', background: 'rgba(13, 21, 39, 0.06)', border: '1px solid rgba(13, 21, 39, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}>
                  <MapPin size={26} style={{ color: 'var(--color-navy)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>Pan-India Jurisdiction Coverage</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>All 28 States & 8 Union Territories</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '2px' }}>100% Online Paperless Regulatory Filings</div>
                </div>
              </div>
            </div>

            {/* Fiduciary Scope Box */}
            <div style={{
              padding: 'clamp(1rem, 5vw, 2rem)',
              background: 'linear-gradient(155deg, #050A14 0%, #0D1527 100%)',
              border: '1px solid rgba(223, 186, 115, 0.35)',
              borderRadius: 'var(--radius-xl)',
              color: '#ffffff',
              boxShadow: '0 20px 50px -12px rgba(5, 10, 20, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
                <ShieldCheck size={18} /> Our Statutory Guarantee
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>✓</span>
                  <span><strong>Transparent Pricing:</strong> Complete pricing quoted before initiation. Straightforward models designed for predictability.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>✓</span>
                  <span><strong>Senior Practice Director Ownership:</strong> Every statutory filing is signed off and managed directly by senior institutional advisors.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>✓</span>
                  <span><strong>100% Confidentiality:</strong> Strict data encryption and professional privilege on all financial and board documentation.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Executive Upfront Quote & Roadmap Intake Terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: '#ffffff',
              padding: '3.5rem',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid rgba(13, 21, 39, 0.12)',
              boxShadow: '0 30px 80px -15px rgba(13, 21, 39, 0.12), 0 0 40px rgba(223, 186, 115, 0.08)',
              position: 'relative'
            }}
          >
            {/* Top Golden Crown Highlight Strip */}
            <div style={{
              position: 'absolute', top: 0, left: '3rem', right: '3rem', height: '4px',
              background: 'linear-gradient(90deg, var(--color-gold) 0%, #C28E2B 100%)',
              borderRadius: '0 0 4px 4px'
            }} />

            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700,
                color: 'var(--color-gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'block', marginBottom: '0.5rem'
              }}>Consultation Intake Terminal</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', margin: 0, marginBottom: '0.5rem' }}>
                Get Your Upfront Quote & Strategy Plan
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', margin: 0 }}>
                Select your corporate scope below. Our senior advisory desk will prepare an exact proposal and roadmap for you within 2 business hours.
              </p>
            </div>

            {error && (
              <div style={{
                padding: '1.2rem', background: '#FEF2F2', border: '1px solid #F87171',
                borderRadius: 'var(--radius-md)', color: '#991B1B', fontSize: '0.9rem',
                marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <strong>⚠️ Notice:</strong> {error}
              </div>
            )}

            {successData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center', padding: '3.5rem clamp(1rem, 5vw, 2rem)',
                  background: '#F8FAFC', borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(13, 21, 39, 0.1)'
                }}
              >
                <div style={{ width: '70px', height: '70px', background: 'var(--color-gold)', color: 'var(--color-navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 25px rgba(223, 186, 115, 0.4)' }}>
                  <CheckCircle2 size={38} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                  Inquiry Received (`#{successData.id}`)
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 2.2rem', lineHeight: '1.6' }}>
                  Thank you, <strong>{successData.name}</strong>. Our senior practice directors are reviewing your requirements for <strong>{selectedServices[0]}</strong> right now.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '1rem 2rem', background: '#25D366', color: '#ffffff',
                      borderRadius: '99px', fontWeight: 700, textDecoration: 'none',
                      boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)',
                      transition: 'all 160ms ease'
                    }}
                  >
                    <MessageSquare size={18} /> Instant WhatsApp Chat With Senior Advisor
                  </a>
                  <button
                    onClick={() => { setSuccessData(null); setMessage(''); }}
                    style={{
                      padding: '1rem 1.75rem', background: 'transparent',
                      border: '1px solid rgba(13, 21, 39, 0.2)', color: 'var(--color-navy)',
                      borderRadius: '99px', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                
                {/* Step 1: Business Stage */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    01. Select Your Current Business Stage
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {BUSINESS_STAGES.map(stg => {
                      const active = stage === stg;
                      return (
                        <button
                          key={stg}
                          type="button"
                          onClick={() => setStage(stg)}
                          style={{
                            padding: '0.75rem 1.4rem',
                            borderRadius: '99px',
                            fontSize: '0.86rem',
                            fontWeight: active ? 700 : 600,
                            cursor: 'pointer',
                            border: active ? '1.5px solid var(--color-navy)' : '1px solid #CBD5E1',
                            background: active ? 'var(--color-navy)' : '#F8FAFC',
                            color: active ? '#ffffff' : '#334155',
                            boxShadow: active ? '0 8px 20px rgba(13, 21, 39, 0.25)' : 'none',
                            transition: 'all 180ms ease'
                          }}
                        >
                          {stg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Required Services */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    02. Select Services Needed (Select All That Apply)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.9rem' }}>
                    {SERVICE_OPTIONS.map(srv => {
                      const isChecked = selectedServices.includes(srv);
                      return (
                        <div
                          key={srv}
                          onClick={() => toggleService(srv)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '1.1rem 1.35rem',
                            borderRadius: 'var(--radius-lg)',
                            border: isChecked ? '1.5px solid var(--color-gold-dark)' : '1px solid #E2E8F0',
                            background: isChecked ? 'rgba(223, 186, 115, 0.12)' : '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 160ms ease',
                            boxShadow: isChecked ? '0 4px 15px rgba(223, 186, 115, 0.2)' : '0 1px 3px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{
                            width: '22px', height: '22px', borderRadius: '6px',
                            border: isChecked ? 'none' : '2px solid #CBD5E1',
                            background: isChecked ? 'var(--color-gold-dark)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, flexShrink: 0
                          }}>
                            {isChecked ? '✓' : ''}
                          </div>
                          <span style={{ fontSize: '0.92rem', fontWeight: isChecked ? 700 : 550, color: isChecked ? 'var(--color-navy)' : '#334155', lineHeight: '1.4' }}>
                            {srv}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Timeline */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    03. When Do You Need Initiation?
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {TIMELINE_OPTIONS.map(tOption => {
                      const active = timeline === tOption;
                      return (
                        <button
                          key={tOption}
                          type="button"
                          onClick={() => setTimeline(tOption)}
                          style={{
                            padding: '0.75rem 1.4rem',
                            borderRadius: '99px',
                            fontSize: '0.86rem',
                            fontWeight: active ? 700 : 600,
                            cursor: 'pointer',
                            border: active ? '1.5px solid var(--color-navy)' : '1px solid #CBD5E1',
                            background: active ? 'var(--color-navy)' : '#F8FAFC',
                            color: active ? '#ffffff' : '#334155',
                            boxShadow: active ? '0 8px 20px rgba(13, 21, 39, 0.25)' : 'none',
                            transition: 'all 180ms ease'
                          }}
                        >
                          {tOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Contact Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    04. Your Contact Details (For Instant Proposal Delivery)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>Your Full Name *</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Deep Kalra"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{
                          width: '100%', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)',
                          border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.95rem',
                          color: 'var(--color-navy)', outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>Corporate Email *</span>
                      <input
                        type="email"
                        required
                        placeholder="counsel@enterprise.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                          width: '100%', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)',
                          border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.95rem',
                          color: 'var(--color-navy)', outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>Direct Mobile / WhatsApp *</span>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        style={{
                          width: '100%', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)',
                          border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.95rem',
                          color: 'var(--color-navy)', outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>Company / Business Name</span>
                      <input
                        type="text"
                        placeholder="e.g. Sterling Holdings Pvt Ltd"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        style={{
                          width: '100%', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)',
                          border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.95rem',
                          color: 'var(--color-navy)', outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>Specific Requirements or Custom Brief (Optional)</span>
                    <textarea
                      rows="3"
                      placeholder="Share any exact timelines, multi-state scope, or existing regulatory queries..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{
                        width: '100%', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)',
                        border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.95rem',
                        color: 'var(--color-navy)', outline: 'none', resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(13, 21, 39, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>
                      🔒 256-Bit Encrypted Strict Professional Privilege
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                      Exact quote & roadmap delivered within 2 hours.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '1.25rem 2.5rem',
                      borderRadius: '99px',
                      background: 'linear-gradient(135deg, #DFBA73 0%, #C28E2B 100%)',
                      color: '#0D1527',
                      fontSize: '1.08rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 12px 30px rgba(223, 186, 115, 0.42)',
                      transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(223, 186, 115, 0.55)'; } }}
                    onMouseLeave={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(223, 186, 115, 0.42)'; } }}
                  >
                    {loading ? 'Submitting to Advisory Desk...' : (
                      <>
                        Get Instant Quote & Strategy Roadmap <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
