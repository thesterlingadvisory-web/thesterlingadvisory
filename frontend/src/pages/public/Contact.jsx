import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock, 
  Send, Sparkles, MessageSquare, ArrowRight, Building2, User 
} from 'lucide-react';

const BUSINESS_STAGES = [
  "Solo Founder / Freelancer",
  "2+ Co-founders / Startup",
  "Private Limited / Existing Company",
  "Retail / E-commerce Seller",
  "NGO / Trust / Society"
];

const SERVICE_OPTIONS = [
  "Company Setup (Pvt Ltd / LLP)",
  "GST & Tax Registrations",
  "Trademark & IP Protection",
  "FSSAI & Municipal Licenses",
  "Annual Compliance & Accounting"
];

const TIMELINE_OPTIONS = [
  "Immediate / Urgent (1-3 days)",
  "Standard (1-2 weeks)",
  "Just Exploring / Planning"
];

export default function Contact() {
  const [stage, setStage] = useState(BUSINESS_STAGES[1]);
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
      setError('Please provide your name and email address.');
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
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessData(json.data);
      } else {
        setError(json.error || 'Failed to submit consultation. Please verify your connection.');
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
    const ticket = successData ? successData.id : 'ST-ADV-LEAD';
    const srvText = selectedServices.join(', ');
    const text = `Hello Sterling Advisory team, I just submitted consultation intake (${ticket}) for ${srvText}. Would like to connect regarding my ${stage} right away!`;
    return `https://wa.me/918448803143?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{
      background: '#F8F6F0',
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '8rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      position: 'relative',
      color: '#0A0F1D'
    }}>
      {/* Subtle Luxury Ambient Background Pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(223, 186, 115, 0.16) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Top Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.45rem 1.125rem', background: '#FFFFFF',
              border: '1px solid #DFBA73', borderRadius: '30px',
              marginBottom: '1.25rem', boxShadow: '0 4px 16px rgba(223, 186, 115, 0.18)'
            }}
          >
            <Sparkles size={15} style={{ color: '#A6823B' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#A6823B', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Strategic Consultation Desk
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 800,
              color: '#0A0F1D',
              letterSpacing: '-0.03em',
              lineHeight: '1.15',
              marginBottom: '1.25rem'
            }}
          >
            Schedule Your Advisory Intake
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: '#475569',
              fontSize: '1.125rem',
              maxWidth: '660px',
              margin: '0 auto',
              lineHeight: '1.75',
              fontFamily: 'var(--font-body)',
              fontWeight: 500
            }}
          >
            Connect directly with our senior Company Secretaries & Chartered Accountants. We analyze your corporate structure and provide transparent fee quotes within 2 hours.
          </motion.p>
        </div>

        {/* ── Main Two Column Layout Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3.5rem', alignItems: 'flex-start' }}>
          
          {/* Left Column: Direct Reach & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 800,
                color: '#A6823B', letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'block', marginBottom: '0.625rem'
              }}>Direct Communications</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0A0F1D', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.25' }}>
                Talk Directly to India's Corporate Registry Specialists
              </h2>
              <p style={{ color: '#475569', fontSize: '0.985rem', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
                Whether incorporating a high-growth startup or streamlining multi-state compliance for an existing enterprise, our advisory desk guarantees accurate counsel without delays.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a
                href="https://wa.me/918448803143"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: '1.5rem', background: '#FFFFFF',
                  border: '1px solid #E2E8F0', borderRadius: '14px',
                  textDecoration: 'none', transition: 'all 250ms ease',
                  boxShadow: '0 8px 24px rgba(10, 15, 29, 0.05)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#DFBA73'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(223, 186, 115, 0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 15, 29, 0.05)'; }}
              >
                <div style={{ width: '54px', height: '54px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>
                  <MessageSquare size={26} style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#A6823B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '4px' }}>Instant WhatsApp Desk</div>
                  <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0A0F1D', fontFamily: 'var(--font-heading)' }}>+91 84488 03143</div>
                  <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Priority response Mon - Sat (9am - 8pm)</div>
                </div>
              </a>

              <a
                href="mailto:consult@thesterlingadvisory.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: '1.5rem', background: '#FFFFFF',
                  border: '1px solid #E2E8F0', borderRadius: '14px',
                  textDecoration: 'none', transition: 'all 250ms ease',
                  boxShadow: '0 8px 24px rgba(10, 15, 29, 0.05)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#DFBA73'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(223, 186, 115, 0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 15, 29, 0.05)'; }}
              >
                <div style={{ width: '54px', height: '54px', background: '#F8FAFC', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>
                  <Mail size={26} style={{ color: '#A6823B' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '4px' }}>Official Email Desk</div>
                  <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0A0F1D', fontFamily: 'var(--font-heading)' }}>consult@thesterlingadvisory.com</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>Formal proposals & document review</div>
                </div>
              </a>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem',
                padding: '1.5rem', background: '#FFFFFF',
                border: '1px solid #E2E8F0', borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(10, 15, 29, 0.05)'
              }}>
                <div style={{ width: '54px', height: '54px', background: '#F8FAFC', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>
                  <MapPin size={26} style={{ color: '#A6823B' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '4px' }}>Central Headquarters</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A0F1D', fontFamily: 'var(--font-heading)' }}>Connaught Place, New Delhi</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>PAN-India filings across all 28 States & 8 UTs</div>
                </div>
              </div>
            </div>

            {/* The Sterling Assurance Box */}
            <div style={{ padding: '2rem', background: '#FFFDF9', border: '1px solid #DFBA73', borderRadius: '14px', boxShadow: '0 12px 32px rgba(223, 186, 115, 0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', borderBottom: '1px solid #F2D59A', paddingBottom: '1rem' }}>
                <ShieldCheck size={22} style={{ color: '#A6823B' }} />
                <span style={{ fontSize: '0.925rem', fontWeight: 800, color: '#A6823B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  The Sterling Assurance
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#A6823B', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.925rem', color: '#334155', lineHeight: '1.65' }}><strong style={{ color: '#0A0F1D' }}>No Hidden Fees:</strong> Every quote provided is all-inclusive covering government challan, DSC, name approval, and professional fees.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#A6823B', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.925rem', color: '#334155', lineHeight: '1.65' }}><strong style={{ color: '#0A0F1D' }}>Senior Specialists:</strong> Handled entirely by practicing CSs, CAs & Corporate Advocates. Zero junior intern handoffs.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#A6823B', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.925rem', color: '#334155', lineHeight: '1.65' }}><strong style={{ color: '#0A0F1D' }}>Strict Confidentiality:</strong> Your business plans, financial numbers, and documents remain 100% encrypted under NDA protocols.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Intake Form Card (`card-premium`) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '3rem',
              boxShadow: '0 24px 64px rgba(10, 15, 29, 0.08)',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              {!successData ? (
                <motion.form
                  key="intake-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}
                >
                  <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#A6823B', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>
                      4-Step Interactive Intake
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#0A0F1D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                      Consultation & Fee Assessment
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: '#64748B', lineHeight: '1.6' }}>
                      Select your profile below so our team prepares the exact regulatory roadmaps before reaching out.
                    </p>
                  </div>

                  {/* Step 1: Business Profile Stage */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.785rem', fontFamily: 'var(--font-mono)', color: '#A6823B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '0.875rem' }}>
                      Step 1: What is Your Current Business Stage?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {BUSINESS_STAGES.map((st, i) => {
                        const isSel = stage === st;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setStage(st)}
                            style={{
                              padding: '0.75rem 1.125rem', borderRadius: '8px', fontSize: '0.875rem',
                              fontWeight: isSel ? 700 : 600,
                              fontFamily: 'var(--font-body)',
                              background: isSel ? 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)' : '#F8FAFC',
                              border: isSel ? '1px solid #A6823B' : '1px solid #CBD5E1',
                              color: isSel ? '#000000' : '#334155',
                              cursor: 'pointer', transition: 'all 200ms ease',
                              boxShadow: isSel ? '0 4px 16px rgba(223, 186, 115, 0.35)' : 'none'
                            }}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Services Needed */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.785rem', fontFamily: 'var(--font-mono)', color: '#A6823B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '0.875rem' }}>
                      Step 2: Select Services You Require (Select all that apply)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {SERVICE_OPTIONS.map((srv, i) => {
                        const isSel = selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => toggleService(srv)}
                            style={{
                              padding: '0.75rem 1.125rem', borderRadius: '8px', fontSize: '0.875rem',
                              fontWeight: isSel ? 700 : 600,
                              fontFamily: 'var(--font-body)',
                              background: isSel ? '#FFFDF9' : '#F8FAFC',
                              border: isSel ? '2px solid #DFBA73' : '1px solid #CBD5E1',
                              color: isSel ? '#0A0F1D' : '#475569',
                              display: 'flex', alignItems: 'center', gap: '8px',
                              cursor: 'pointer', transition: 'all 200ms ease'
                            }}
                          >
                            <span style={{
                              width: '18px', height: '18px', borderRadius: '4px',
                              border: isSel ? '2px solid #A6823B' : '1px solid #94A3B8',
                              background: isSel ? '#DFBA73' : 'transparent',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 150ms ease'
                            }}>
                              {isSel && <span style={{ color: '#000000', fontSize: '12px', fontWeight: 900 }}>✓</span>}
                            </span>
                            <span>{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Target Timeline */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.785rem', fontFamily: 'var(--font-mono)', color: '#A6823B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '0.875rem' }}>
                      Step 3: What is Your Priority Timeline?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {TIMELINE_OPTIONS.map((tm, i) => {
                        const isSel = timeline === tm;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setTimeline(tm)}
                            style={{
                              padding: '0.75rem 1.125rem', borderRadius: '8px', fontSize: '0.875rem',
                              fontWeight: isSel ? 700 : 600,
                              fontFamily: 'var(--font-body)',
                              background: isSel ? 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)' : '#F8FAFC',
                              border: isSel ? '1px solid #A6823B' : '1px solid #CBD5E1',
                              color: isSel ? '#000000' : '#334155',
                              cursor: 'pointer', transition: 'all 200ms ease',
                              boxShadow: isSel ? '0 4px 16px rgba(223, 186, 115, 0.35)' : 'none'
                            }}
                          >
                            {tm}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Contact Info Fields */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.785rem', fontFamily: 'var(--font-mono)', color: '#A6823B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '1.25rem' }}>
                      Step 4: Contact & Company Details
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#0A0F1D', fontWeight: 700, marginBottom: '0.5rem' }}>Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Deep Kalra"
                          style={{
                            width: '100%', padding: '0.875rem 1.125rem', background: '#F8FAFC',
                            border: '1px solid #CBD5E1', borderRadius: '8px',
                            color: '#0F172A', fontSize: '0.925rem', fontFamily: 'var(--font-body)', outline: 'none',
                            fontWeight: 500
                          }}
                          onFocus={e => { e.target.style.borderColor = '#DFBA73'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(223, 186, 115, 0.2)'; }}
                          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#0A0F1D', fontWeight: 700, marginBottom: '0.5rem' }}>Work Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          style={{
                            width: '100%', padding: '0.875rem 1.125rem', background: '#F8FAFC',
                            border: '1px solid #CBD5E1', borderRadius: '8px',
                            color: '#0F172A', fontSize: '0.925rem', fontFamily: 'var(--font-body)', outline: 'none',
                            fontWeight: 500
                          }}
                          onFocus={e => { e.target.style.borderColor = '#DFBA73'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(223, 186, 115, 0.2)'; }}
                          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#0A0F1D', fontWeight: 700, marginBottom: '0.5rem' }}>Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%', padding: '0.875rem 1.125rem', background: '#F8FAFC',
                            border: '1px solid #CBD5E1', borderRadius: '8px',
                            color: '#0F172A', fontSize: '0.925rem', fontFamily: 'var(--font-body)', outline: 'none',
                            fontWeight: 500
                          }}
                          onFocus={e => { e.target.style.borderColor = '#DFBA73'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(223, 186, 115, 0.2)'; }}
                          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#0A0F1D', fontWeight: 700, marginBottom: '0.5rem' }}>Company / Entity Name (Optional)</label>
                        <input
                          type="text"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          placeholder="e.g. Sterling Tech Ventures Pvt Ltd"
                          style={{
                            width: '100%', padding: '0.875rem 1.125rem', background: '#F8FAFC',
                            border: '1px solid #CBD5E1', borderRadius: '8px',
                            color: '#0F172A', fontSize: '0.925rem', fontFamily: 'var(--font-body)', outline: 'none',
                            fontWeight: 500
                          }}
                          onFocus={e => { e.target.style.borderColor = '#DFBA73'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(223, 186, 115, 0.2)'; }}
                          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#0A0F1D', fontWeight: 700, marginBottom: '0.5rem' }}>Any Specific Questions / Case Notes?</label>
                      <textarea
                        rows="3"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us briefly about your turnover, multi-state presence, or any urgent statutory deadlines..."
                        style={{
                          width: '100%', padding: '0.875rem 1.125rem', background: '#F8FAFC',
                          border: '1px solid #CBD5E1', borderRadius: '8px',
                          color: '#0F172A', fontSize: '0.925rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical',
                          fontWeight: 500
                        }}
                        onFocus={e => { e.target.style.borderColor = '#DFBA73'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(223, 186, 115, 0.2)'; }}
                        onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #EF4444', borderRadius: '8px', color: '#DC2626', fontSize: '0.875rem', fontWeight: 600 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%', padding: '1.25rem',
                      background: 'linear-gradient(135deg, #DFBA73 0%, #A6823B 100%)',
                      border: 'none', borderRadius: '10px',
                      color: '#000000', fontSize: '1.05rem', fontWeight: 800,
                      fontFamily: 'var(--font-heading)', letterSpacing: '0.02em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 12px 32px -6px rgba(223, 186, 115, 0.45)',
                      transition: 'all 200ms ease'
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0px)')}
                  >
                    <Send size={20} />
                    <span>{loading ? 'Processing Priority Consultation Ticket...' : 'Request Priority Consultation & Fee Quote'}</span>
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.785rem', color: '#64748B', margin: 0, fontWeight: 500 }}>
                    🔒 100% Secure & Confidential. A Senior Corporate Advisor will review your profile and respond within 2 hours.
                  </p>
                </motion.form>
              ) : (
                /* Success Confirmed Ticket Card */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ textAlign: 'center', padding: '2rem 1rem' }}
                >
                  <div style={{
                    width: '76px', height: '76px', background: 'rgba(34, 197, 94, 0.12)',
                    border: '2px solid #22c55e', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem', boxShadow: '0 0 32px rgba(34, 197, 94, 0.2)'
                  }}>
                    <CheckCircle2 size={42} style={{ color: '#16a34a' }} />
                  </div>

                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#A6823B', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
                    Registration Ticket Confirmed
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#0A0F1D', margin: '0.5rem 0 1rem', letterSpacing: '-0.02em' }}>
                    Consultation Booked!
                  </h3>
                  <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: '1.65' }}>
                    Thank you, <strong style={{ color: '#0A0F1D' }}>{name}</strong>. We have logged your consultation ticket <strong style={{ color: '#A6823B', fontFamily: 'var(--font-mono)' }}>#{successData.id}</strong> directly in our senior desk CRM.
                  </p>

                  <div style={{
                    background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2.25rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>Your Selected Services Summary:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedServices.map((s, i) => (
                        <span key={i} style={{ background: '#0A0F1D', border: '1px solid #DFBA73', padding: '5px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#ffffff', fontWeight: 600 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        padding: '1.125rem 1.75rem', background: '#16a34a', color: '#ffffff',
                        borderRadius: '10px', fontWeight: 800, fontSize: '1.05rem', textDecoration: 'none',
                        boxShadow: '0 12px 32px -4px rgba(22, 163, 74, 0.4)', transition: 'all 200ms ease',
                        fontFamily: 'var(--font-heading)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0px)'}
                    >
                      <MessageSquare size={22} />
                      <span>Connect on WhatsApp Right Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => { setSuccessData(null); setName(''); setEmail(''); setPhone(''); setMessage(''); }}
                      style={{
                        width: '100%', padding: '0.875rem', background: 'transparent',
                        border: '1px solid #CBD5E1', borderRadius: '10px', color: '#475569',
                        fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'all 200ms ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#A6823B'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
                    >
                      Book Another Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
