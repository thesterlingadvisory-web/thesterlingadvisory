import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Building2, Calculator, ShieldCheck, Scale,
  ChevronDown, User, Users, Store, CheckCircle,
  TrendingUp, Award, Globe, MessageCircle,
  Check, Clock
} from 'lucide-react';

/* ── Institutional Hero Persona Retainers ── */
const heroHubTabs = [
  {
    id: 'startup',
    label: 'Startup & Tech Company',
    title: 'Private Limited Company Package',
    badge: 'Popular with Tech & Growing Startups',
    time: '10–14 Business Days',
    desc: 'Complete Private Limited incorporation, Startup India (DPIIT) registration, multi-state GST setup, and trademark protection to get your business funding-ready.',
    registrations: [
      { name: 'Private Limited Incorporation', fee: 'Government Registration Included', time: '10–15 Business Days', link: '/services/private-limited-company', tag: 'Limited Liability Structure' },
      { name: 'Multi-State GST Structuring', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Inter-State Commerce' },
      { name: 'Brand & Trademark Filing', fee: 'Government Registry Fee', time: 'Same-Day Priority Filing', link: '/services/trademark-registration', tag: 'Brand Name & Logo Protection' },
    ]
  },
  {
    id: 'solo',
    label: 'Sole Proprietor & Small Business',
    title: 'Complete Small Business Package',
    badge: 'Fast & Reliable Business Setup',
    time: '2–5 Business Days',
    desc: 'Statutory tax and municipal licensing (Udyam MSME, GST, and Shops & Establishment Act) required to formalize your commercial identity and open a current bank account under your personal PAN.',
    registrations: [
      { name: 'Proprietorship Compliance & Bank Setup', fee: 'Udyam, GST & Shops Act Bundle', time: '2–4 Business Days', link: '/services/proprietorship-setup', tag: 'Bank Current Account KYC' },
      { name: 'GST & Indirect Tax Registration', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Pan-India Billing' },
      { name: 'Shops & Establishments License', fee: 'Local Municipal Operating Permit', time: '3–7 Business Days', link: '/services/shops-establishments', tag: 'Local Trade Compliance' },
    ]
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce & Online Store',
    title: 'Complete E-Commerce Package',
    badge: 'Required to Sell on Amazon / Flipkart',
    time: '4–7 Business Days',
    desc: 'All official registrations needed to smoothly onboard onto Amazon, Flipkart, quick-commerce platforms, and online payment gateways.',
    registrations: [
      { name: 'E-Commerce GST Registration', fee: 'Dedicated Compliance Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Marketplace Ready' },
      { name: 'Brand & Logo Trademark Registration', fee: 'Government Registry Fee', time: 'Same-Day Priority Filing', link: '/services/trademark-registration', tag: 'Brand Registry Protection' },
      { name: 'Private Limited Incorporation', fee: 'Government Registration Included', time: '10–15 Business Days', link: '/services/private-limited-company', tag: 'Limited Liability Structure' },
    ]
  },
  {
    id: 'compliance',
    label: 'Established Business',
    title: 'Annual Statutory & Legal Package',
    badge: 'Complete Peace of Mind Year-Round',
    time: 'Immediate Activation',
    desc: 'Complete annual statutory audits, MCA/ROC secretarial filings, monthly GST returns, and dedicated Senior Advisory support for your business.',
    registrations: [
      { name: 'FSSAI Central & State Food License', fee: 'Government Food Safety Filing', time: '7–10 Business Days', link: '/services/fssai-licence', tag: 'Food Safety Compliance' },
      { name: 'Annual ROC & Tax Compliance', fee: 'Comprehensive Annual Support', time: 'Year-Round Representation', link: '/contact', tag: 'Annual Audits & Filings' },
      { name: 'EPF & ESIC Staff Compliance', fee: 'Labour Law Support Package', time: '5–7 Business Days', link: '/services/epf-registration', tag: 'Employee Social Security' },
    ]
  },
];

/* ── Disciplines & Value-Focused Matrix Data ── */
/* ── Disciplines & Value-Focused Matrix Data ── */
const servicesMatrix = [
  /* 10 Featured Flagship Cards (Shown in 'All Services') */
  { title: 'Private Limited Company Registration', category: 'setup', slug: 'private-limited-company', tag: 'Company Setup', desc: 'The most reliable corporate structure for growing companies, protecting personal assets and making raising investment easy.', fee: 'Govt Registration Included', time: '10–15 Days', featured: true },
  { title: 'GST Registration & Tax Setup', category: 'tax', slug: 'gst-registration', tag: 'Tax Registration', desc: 'Official state and central GST registration required to bill customers PAN-India and sell across state borders.', fee: 'Direct Expert Filing', time: '3–5 Days', featured: true },
  { title: 'Trademark Registration & Brand Shield', category: 'ip', slug: 'trademark-registration', tag: 'Brand Protection', desc: 'Protect your brand name, logo, and unique business identity against copycats across India.', fee: 'Govt Registry Fee', time: 'Same-Day Filing', featured: true },
  { title: 'Limited Liability Partnership (LLP)', category: 'setup', slug: 'llp-registration', tag: 'Company Setup', desc: 'Combines the flexibility of a traditional partnership with the personal asset protection of a private limited company.', fee: 'Nominal Govt Fee', time: '12–15 Days', featured: true },
  { title: 'Udyam (MSME) Registration', category: 'setup', slug: 'udyam-registration', tag: 'Government Certificate', desc: 'Secures priority bank loans, 50% discount on government trademark fees, and special startup benefits.', fee: 'Zero Government Fee', time: '1–2 Days', featured: true },
  { title: 'FSSAI Food Safety License', category: 'license', slug: 'fssai-licence', tag: 'Trade License', desc: 'Mandatory government food license for food product manufacturers, restaurants, cafes, and cloud kitchens.', fee: 'State & Central Filing', time: '7–10 Days', featured: true },
  { title: 'Shops & Establishments License', category: 'license', slug: 'shops-establishments', tag: 'Local License', desc: 'Official operating permit required by state labor departments for commercial offices, stores, and businesses.', fee: 'State Specific Fee', time: '3–7 Days', featured: true },
  { title: 'EPF & ESIC Staff Registration', category: 'license', slug: 'epf-registration', tag: 'Staff & Labor Law', desc: 'Official provident fund and employee health insurance setup required as your team grows above threshold limits.', fee: 'Complete Setup & Filing', time: '5–7 Days', featured: true },
  { title: 'Section 8 Company Incorporation', category: 'setup', slug: 'section-8-company', tag: 'Non-Profit Setup', desc: 'Government-recognized non-profit structure ideal for charitable trusts, foundations, educational institutions, and CSR entities.', fee: 'Central License Included', time: '12–18 Days', featured: true },
  { title: 'Import Export Code (IEC) License', category: 'license', slug: 'iec-registration', tag: 'Global Trade License', desc: 'Mandatory DGFT authorization required to import commercial goods into India or export products and IT services worldwide.', fee: 'Lifetime Govt Permit', time: '2–4 Days', featured: true },

  /* Additional Specialized Company Setup Cards */
  { title: 'One Person Company (OPC) Registration', category: 'setup', slug: 'private-limited-company', tag: 'Solo Entrepreneur Setup', desc: 'Full corporate limited liability protection tailored for solo founders and independent consultants without requiring a second director.', fee: 'Govt Registration Included', time: '10–12 Days', featured: false },
  { title: 'Public Limited Company Incorporation', category: 'setup', slug: 'private-limited-company', tag: 'Corporate Expansion', desc: 'Comprehensive multi-shareholder corporate entity structuring required for raising public equity or pre-IPO venture financing.', fee: 'Complete Statutory Package', time: '15–20 Days', featured: false },
  { title: 'Foreign Subsidiary Incorporation in India', category: 'setup', slug: 'private-limited-company', tag: 'FDI & Cross-Border', desc: 'End-to-end statutory setup for international corporations establishing wholly owned Indian subsidiaries under FEMA and RBI guidelines.', fee: 'FDI Compliance Included', time: '14–21 Days', featured: false },

  /* Additional Specialized Taxation & GST Cards */
  { title: 'Corporate Income Tax & TDS Advisory', category: 'tax', slug: 'gst-registration', tag: 'Corporate Taxation', desc: 'Strategic direct tax planning, quarterly TDS return filings, and statutory tax calculations managed by Senior Corporate Advisors.', fee: 'Fixed Scope Retainer', time: 'Ongoing Support', featured: false },
  { title: 'GST Monthly Filings & Reconciliation', category: 'tax', slug: 'gst-registration', tag: 'Indirect Tax Retainer', desc: 'Comprehensive GSTR-1 and GSTR-3B monthly return preparation with detailed Input Tax Credit (ITC) reconciliation.', fee: 'Monthly Retainer Fee', time: 'Monthly Compliance', featured: false },
  { title: 'Tax Audit & Statutory Representation', category: 'tax', slug: 'gst-registration', tag: 'Statutory Defense', desc: 'Expert practice representation and defense before state and central tax authorities for audit queries and assessment notices.', fee: 'Specialist Practice Fee', time: 'Milestone Based', featured: false },
  { title: 'International Taxation & Transfer Pricing', category: 'tax', slug: 'gst-registration', tag: 'Cross-Border Tax', desc: 'Transfer pricing documentation, Form 3CEB filing, and DTAA structuring for businesses engaged in international transactions.', fee: 'Senior Advisory Quote', time: 'Fixed Scope SLA', featured: false },

  /* Additional Specialized Trade Licensing Cards */
  { title: 'ISO Certification & Quality Standards', category: 'license', slug: 'shops-establishments', tag: 'Global Accreditation', desc: 'Complete statutory audit and documentation support for ISO 9001:2015, ISO 27001, and CE quality standard certifications.', fee: 'Complete Accreditation', time: '7–12 Days', featured: false },
  { title: 'RERA & State Regulatory Permitting', category: 'license', slug: 'shops-establishments', tag: 'Real Estate & Projects', desc: 'End-to-end RERA project registration, agent certification, and municipal land zoning clearance across major Indian jurisdictions.', fee: 'Jurisdiction Specific', time: '14–20 Days', featured: false },
  { title: 'Pollution Control Board Consent (CTE/CTO)', category: 'license', slug: 'shops-establishments', tag: 'Environmental Compliance', desc: 'State Pollution Control Board Consent to Establish (CTE) and Consent to Operate (CTO) permits for industrial units.', fee: 'State Board Filing', time: '10–15 Days', featured: false },

  /* Additional Specialized Trademark & IP Cards */
  { title: 'Trademark Objection & Hearing Defense', category: 'ip', slug: 'trademark-registration', tag: 'IP Legal Defense', desc: 'Expert legal response and hearing representation by Senior Corporate Counsel to overcome Trademark Registry examination objections.', fee: 'Fixed Legal Retainer', time: '48 Hour Response', featured: false },
  { title: 'Copyright & Digital Design Protection', category: 'ip', slug: 'trademark-registration', tag: 'IP Asset Shield', desc: 'Official government copyright filing to legally secure your proprietary software code, creative content, architectural plans, and brand assets.', fee: 'Govt Registry Included', time: '14–18 Days', featured: false },
  { title: 'Patent Prior-Art Search & Filing', category: 'ip', slug: 'trademark-registration', tag: 'Innovation Protection', desc: 'Comprehensive patent novelty search, provisional specification drafting, and complete Indian Patent Office representation.', fee: 'Technical Drafting Fee', time: '7–14 Days', featured: false },
];

/* ── Fiduciary FAQ Data ── */
const faqData = [
  { q: 'How long does it take to register a Private Limited company?', a: 'A Private Limited or LLP registration typically takes 10 to 14 business days, depending on name approval and state stamp duty processing. Our team handles all the paperwork and government follow-ups for you.' },
  { q: 'Do I need to visit any office or submit physical documents?', a: 'No. Everything is done 100% online. Identity verification, digital signatures, and all government filings are handled digitally. We serve clients across all 28 states and 8 Union Territories.' },
  { q: 'How are your fees structured? Are there any hidden charges?', a: 'We charge a single, fixed package fee that is agreed before we start any work. There are no hidden charges, no hourly billing, and no surprise costs at any stage.' },
  { q: 'Are your services handled by qualified professionals?', a: 'Yes. Every registration, tax filing, and compliance task is handled directly by qualified Senior Corporate Advisors and Legal Counsel with years of experience.' },
  { q: 'What compliance do I need to handle after registering my company?', a: 'After incorporation, you will need to appoint an auditor, file a commencement of business form, complete annual ROC filings, and file regular GST returns. We provide a clear compliance calendar so you never miss a deadline.' },
  { q: 'Can you help if my company already has pending compliance or government notices?', a: 'Absolutely. Our team regularly helps businesses resolve pending ROC notices, overdue tax filings, and multi-year compliance gaps. We will audit your current status and fix everything systematically.' },
];

/* ── 4-Step Engagement Workflow ── */
const processSteps = [
  { num: '01', title: 'Free Consultation & Strategy', desc: 'We understand your exact business goals, team size, and location to recommend the right registration and tax structure.' },
  { num: '02', title: 'Document Preparation & Verification', desc: 'Our Senior Compliance Advisors carefully check and prepare all needed documents, IDs, and application forms so nothing gets rejected.' },
  { num: '03', title: 'Direct Government Filing & Follow-up', desc: 'We submit your applications directly to the Ministry of Corporate Affairs, GST portal, or Trademark office and handle all follow-ups.' },
  { num: '04', title: 'Fast Delivery & Ongoing Support', desc: 'You receive all official government certificates and tax IDs digitally, along with a clear compliance calendar for your business.' },
];

export default function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState('startup');
  const [matrixCategory, setMatrixCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const activeHubData = heroHubTabs.find(t => t.id === activeHeroTab) || heroHubTabs[0];
  const filteredServices = (matrixCategory === 'all' 
    ? servicesMatrix.filter(s => s.featured) 
    : servicesMatrix.filter(s => s.category === matrixCategory)).slice(0, 10);

  return (
    <div style={{ width: '100%', background: 'var(--color-primary)' }}>

      {/* ═══════════════════════════════════════════
          01. HERO — INSTITUTIONAL PRACTICE DESK
      ═══════════════════════════════════════════ */}
      <section className="bg-institutional-grid" style={{
        padding: '3.5rem 0 5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Gold & Sapphire Aurora Spotlights behind Hero Content */}
        <div style={{
          position: 'absolute', top: '-10%', right: '2%', width: '700px', height: '700px',
          background: 'radial-gradient(circle at center, rgba(223, 186, 115, 0.18) 0%, rgba(13, 21, 39, 0) 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '-5%', width: '600px', height: '600px',
          background: 'radial-gradient(circle at center, rgba(30, 80, 160, 0.22) 0%, rgba(13, 21, 39, 0) 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ maxWidth: '92rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          {/* Asymmetric Institutional Grid: Left (~42% pushed left), Right (~58% expanded wider so zero scroll needed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          ref={(el) => {
            if (el && window.innerWidth >= 1024) {
              el.style.gridTemplateColumns = '1fr 1.38fr';
            }
          }}
          >

            {/* Left Column: Authoritative Copy & Direct Counsel Pathways */}
            <div style={{ paddingRight: '1rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(223, 186, 115, 0.12)',
                  padding: '5px 14px',
                  borderRadius: '99px',
                  border: '1px solid rgba(223, 186, 115, 0.28)'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', boxShadow: '0 0 8px var(--color-gold)' }} />
                  Corporate Registration & Compliance Advisory
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.6rem, 4.8vw, 4.1rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
                maxWidth: '17ch',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
                Where Indian Businesses Are <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'normal', fontWeight: 800, color: 'var(--color-gold)', textShadow: '0 0 30px rgba(223, 186, 115, 0.35)' }}>Built to Last.</span>
              </h1>

              <p style={{
                fontSize: '1.08rem',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.68',
                marginBottom: '2.25rem',
                maxWidth: '46ch',
                fontFamily: 'var(--font-body)'
              }}>
                We handle company registrations, tax structuring, and statutory compliance with complete precision—managed directly by qualified Senior Corporate Advisors and Legal Counsel across all 28 States and 8 Union Territories.
              </p>

              {/* Action Pathways */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
                <Link to="/contact" className="btn-gold" style={{ 
                  padding: '0.92rem 1.95rem', 
                  fontSize: '0.94rem',
                  boxShadow: '0 10px 30px -5px rgba(223, 186, 115, 0.45), 0 0 20px rgba(223, 186, 115, 0.2)'
                }}>
                  Talk to a Senior Advisor <ArrowRight size={16} />
                </Link>
                <Link to="/services" style={{ 
                  padding: '0.92rem 1.75rem', 
                  fontSize: '0.94rem', 
                  border: '1px solid rgba(255,255,255,0.25)', 
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 160ms ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                >
                  Explore Practice Areas
                </Link>
              </div>

              {/* Clean Minimalist Trust Bullet Row (Exact to Image 3 yesterday layout) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>•</span>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>PAN India Service</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>•</span>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>100% Online Process</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>•</span>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>MCA Registered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Expanded Live Retainer Hub (Wider card + compact vertical spacing = zero scroll!) */}
            <div>
              <div className="glass-card-dark" style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                width: '100%',
                background: 'linear-gradient(165deg, rgba(20, 32, 58, 0.90) 0%, rgba(9, 15, 28, 0.96) 100%) !important',
                border: '1px solid rgba(223, 186, 115, 0.42) !important',
                borderTop: '3px solid var(--color-gold) !important',
                boxShadow: '0 32px 80px -16px rgba(0, 0, 0, 0.8), 0 0 50px rgba(223, 186, 115, 0.18)'
              }}>
                {/* Header / Persona Selector */}
                <div style={{ padding: '1.25rem 1.75rem 1rem', backgroundColor: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                        Recommended Service Package
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      Customized for Your Business
                    </span>
                  </div>

                  {/* Persona Tabs */}
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                    {heroHubTabs.map(tab => {
                      const isSelected = activeHeroTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveHeroTab(tab.id)}
                          style={{
                            padding: '0.5rem 0.9rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font-body)',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            border: isSelected ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.08)',
                            backgroundColor: isSelected ? 'var(--color-gold)' : 'rgba(255,255,255,0.03)',
                            color: isSelected ? 'var(--color-navy)' : 'rgba(255,255,255,0.7)',
                            transition: 'all 160ms ease'
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scope Details (Compact vertical padding so options fit on the face without vertical scrolling) */}
                <div style={{ padding: '1.4rem 1.75rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHubData.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                            {activeHubData.badge}
                          </span>
                          <h3 style={{ fontSize: '1.38rem', color: '#ffffff', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                            {activeHubData.title}
                          </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Clock size={13} color="var(--color-gold)" />
                          <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{activeHubData.time}</span>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.68)', lineHeight: '1.55', marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>
                        {activeHubData.desc}
                      </p>

                      {/* Scope Deliverables (Compact row height so all 3 rows fit cleanly on screen without scrolling) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.4rem' }}>
                        {activeHubData.registrations.map((reg, idx) => (
                          <Link
                            key={idx}
                            to={reg.link}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '0.8rem 1.1rem',
                              backgroundColor: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 'var(--radius-lg)',
                              transition: 'all 160ms ease',
                              gap: '12px'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(223,186,115,0.4)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto' }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(223,186,115,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check size={13} color="var(--color-gold)" />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>{reg.name}</div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{reg.tag}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>{reg.fee}</div>
                              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{reg.time}</div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/contact"
                        className="btn-gold"
                        style={{ width: '100%', padding: '0.88rem', fontSize: '0.92rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                      >
                        Get Started with {activeHubData.title} <ArrowRight size={15} />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          01B. STANDALONE INSTITUTIONAL HIGHLIGHT BAR
          High-contrast standalone bar with gold icons (Exact to 3rd image purana front layout)
      ═══════════════════════════════════════════ */}
      <section className="glass-navbar" style={{
        backgroundColor: 'rgba(5, 10, 20, 0.92)',
        borderTop: '1px solid rgba(223, 186, 115, 0.38)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2.25rem 0',
        position: 'relative',
        boxShadow: '0 12px 36px rgba(0,0,0,0.45)'
      }}>
        <div style={{ maxWidth: '92rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.75rem',
            alignItems: 'center'
          }}>
            
            {/* Item 1: PAN India Service */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: 'rgba(223, 186, 115, 0.12)',
                border: '1px solid rgba(223, 186, 115, 0.35)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Globe size={22} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: '#ffffff', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  PAN India Service
                </span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                  All states & UTs covered
                </span>
              </div>
            </div>

            {/* Item 2: 100% Online */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: 'rgba(223, 186, 115, 0.12)',
                border: '1px solid rgba(223, 186, 115, 0.35)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <CheckCircle size={22} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: '#ffffff', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  100% Online Process
                </span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                  No office visit required
                </span>
              </div>
            </div>

            {/* Item 3: Qualified Experts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: 'rgba(223, 186, 115, 0.12)',
                border: '1px solid rgba(223, 186, 115, 0.35)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Award size={22} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: '#ffffff', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  Qualified Experts Only
                </span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                  Senior Advisors & Legal Counsel
                </span>
              </div>
            </div>

            {/* Item 4: Transparent Pricing */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: 'rgba(223, 186, 115, 0.12)',
                border: '1px solid rgba(223, 186, 115, 0.35)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <TrendingUp size={22} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: 'var(--color-gold)', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  Transparent Pricing
                </span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                  Fixed quotes, no hidden charges
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02. FIDUCIARY SCOPE — DISCIPLINES MATRIX
          Priority 3: Value-focused service cards without pricing-catalogue noise
      ═══════════════════════════════════════════ */}
      <section style={{ 
        padding: '5.5rem 0 6.5rem', 
        backgroundColor: '#F8FAFC',
        borderTop: '1px solid rgba(13, 21, 39, 0.08)',
        borderBottom: '1px solid rgba(13, 21, 39, 0.08)',
        position: 'relative'
      }}>
        {/* Expanded 108rem (1728px / 94vw) container to utilize full desktop screen width */}
        <div style={{ maxWidth: '108rem', margin: '0 auto', padding: '0 3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.75rem' }}>
            <div>
              <span style={{
                background: 'rgba(223, 186, 115, 0.14)',
                border: '1px solid rgba(223, 186, 115, 0.38)',
                color: 'var(--color-navy)',
                padding: '5px 14px',
                borderRadius: '99px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold-dark)' }} />
                Our Practice Areas
              </span>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)', fontWeight: 800, color: 'var(--color-navy)', marginTop: '0.85rem', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '32ch' }}>
                Essential services across company setup, <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-dark)' }}>taxation, and licensing.</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginTop: '0.75rem', maxWidth: '64ch', lineHeight: '1.65' }}>
                Select a practice pillar to review what&apos;s included, statutory government requirements, and exact completion timelines.
              </p>
            </div>

            {/* Service Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Services' },
                { id: 'setup', label: 'Company Setup' },
                { id: 'tax', label: 'Taxation & GST' },
                { id: 'license', label: 'Trade Licensing' },
                { id: 'ip', label: 'Trademark & IP' },
              ].map(cat => {
                const isSelected = matrixCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setMatrixCategory(cat.id)}
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--color-navy)' : '1px solid rgba(13, 21, 39, 0.12)',
                      backgroundColor: isSelected ? 'var(--color-navy)' : '#ffffff',
                      color: isSelected ? '#ffffff' : 'var(--color-text-main)',
                      boxShadow: isSelected ? '0 6px 18px rgba(13, 21, 39, 0.22)' : '0 1px 3px rgba(0,0,0,0.02)',
                      transition: 'all 180ms ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Cards Grid: Sleeker horizontal columns (minmax(270px, 1fr)) across wide 108rem grid */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '2rem' }}
          >
            <AnimatePresence>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    style={{
                      display: 'flex', flexDirection: 'column', width: '100%',
                      minHeight: '430px',
                      padding: '2.35rem 1.65rem 2rem',
                      borderRadius: 'var(--radius-xl)',
                      background: '#ffffff',
                      border: '1px solid rgba(13, 21, 39, 0.09)',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(13, 21, 39, 0.05)',
                      transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(223, 186, 115, 0.55)';
                      e.currentTarget.style.boxShadow = '0 22px 45px rgba(13, 21, 39, 0.12), 0 0 25px rgba(223, 186, 115, 0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(13, 21, 39, 0.09)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(13, 21, 39, 0.05)';
                    }}
                  >
                    {/* Top Metadata Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--color-gold-dark)',
                        fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {service.tag}
                      </span>
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-light)',
                        fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0
                      }}>
                        {service.time}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.28rem', fontWeight: 750, fontFamily: 'var(--font-heading)', color: 'var(--color-navy)', marginBottom: '0.85rem', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.68', marginBottom: '2.4rem', flexGrow: 1 }}>
                      {service.desc}
                    </p>

                    {/* Bottom Footer Row: Clean separation without wrapping */}
                    <div style={{ borderTop: '1px solid rgba(13, 21, 39, 0.07)', paddingTop: '1.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', display: 'block', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: '3px' }}>What&apos;s Included</span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 650, color: 'var(--color-navy)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.fee}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        Learn More <ArrowRight size={14} style={{ color: 'var(--color-gold-dark)' }} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Right-Aligned Explore All Services Tab/Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3.75rem' }}>
            <Link
              to="/services"
              className="btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.95rem 2.35rem',
                fontSize: '0.96rem',
                fontWeight: 700,
                borderRadius: '99px',
                boxShadow: '0 10px 28px -6px rgba(223, 186, 115, 0.45)',
                transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(223, 186, 115, 0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 28px -6px rgba(223, 186, 115, 0.45)'; }}
            >
              Explore All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03. INSTITUTIONAL RIGOR — ASYMMETRICAL 4-STEP ENGAGEMENT
          Priority 4 & 8: Left-aligned narrative anchoring vs execution steps
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-navy)', position: 'relative' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="grid-home-matrix">

            {/* Left: Why Sterling Advisory */}
            <div>
              <span className="section-label">Why Choose Us</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '22ch' }}>
                Top-tier corporate advisory without the heavy overhead.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.65', maxWidth: '48ch' }}>
                We replace slow paper bureaucracy with fast, accurate digital processes. Whether you are starting a new company or managing GST returns across states, our team acts as your trusted legal and financial advisor.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'All-India Coverage', desc: 'Seamless company registration and filings across all 28 states and 8 Union Territories.' },
                  { title: '100% Online Process', desc: 'Simple cloud document sharing without physical visits or slow paperwork.' },
                  { title: 'Senior Advisory Support', desc: 'Every filing is reviewed and certified by dedicated Senior Corporate Advisors and Legal Counsel.' },
                  { title: 'Transparent Fixed Fees', desc: 'Clear, upfront fee packages with zero hidden charges or surprise billing.' },
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: '2px solid var(--color-gold)', paddingLeft: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9375rem', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: How It Works Roadmap */}
            <div style={{
              backgroundColor: 'var(--color-navy-mid)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem'
            }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, display: 'block', marginBottom: '2rem' }}>
                How Our Simple 4-Step Process Works
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {processSteps.map((step) => (
                  <div key={step.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(223,186,115,0.12)',
                      border: '1px solid var(--color-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-gold)', flexShrink: 0
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>{step.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: '1.6' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>Ready to get started with your initial consultation?</div>
                <Link to="/contact" className="btn-gold" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                  Talk to an Expert
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04. STATUTORY & SLA FAQS (COMPACT ACCORDION)
          Priority 2 & 6: Clean, non-robotic microcopy and subtle borders
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">Frequently Asked Questions</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              Clear Answers for Founders & Business Owners
            </h2>
          </div>

          <div style={{ backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.06)', padding: '0 2rem', boxShadow: 'var(--shadow-sm)' }}>
            {faqData.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqData.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.5rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '1.05rem', paddingRight: '1.5rem', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                  <div style={{
                    width: '28px', height: '28px', flexShrink: 0,
                    border: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: openFaqIndex === i ? 'var(--color-navy)' : 'transparent',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background-color 180ms ease'
                  }}>
                    <ChevronDown size={15} style={{ color: openFaqIndex === i ? 'var(--color-gold)' : 'var(--color-text-muted)', transform: openFaqIndex === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ paddingBottom: '1.5rem', fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          05. ADVISORY NOTES / KNOWLEDGE HUB
          Priority 2: "Advisory Notes / Structural briefings on corporate law and taxation."
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-secondary)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-label">Advisory Notes</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                Guides on Business Law & Taxation
              </h2>
            </div>
            <Link to="/insights" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold-dark)', letterSpacing: '0.06em', textTransform: 'uppercase' }} className="link-underline pb-1">
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Private Limited vs. LLP: Which Is Right for Your Business?', excerpt: 'A clear comparison of liability protection, tax benefits, fundraising options, and annual compliance costs to help founders choose the right structure.', tag: 'Business Setup' },
              { title: 'GST Registration: When Is It Required and How Does It Work?', excerpt: 'A simple guide to understanding GST thresholds, voluntary registration benefits, input tax credits, and e-way bill requirements for your business.', tag: 'Tax & GST' },
              { title: 'How to Protect Your Brand Name Before Competitors Copy It', excerpt: 'Practical steps to register your trademark, select the right classes, and secure your brand identity before raising funding or scaling operations.', tag: 'Trademark & IP' },
            ].map((post, i) => (
              <div key={i} style={{ display: 'flex' }}>
                <Link to="/insights" className="card-premium" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold-dark)', marginBottom: '0.875rem', display: 'block', fontWeight: 600 }}>{post.tag}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-navy)', marginBottom: '0.625rem', lineHeight: 1.35, letterSpacing: '-0.02em' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-navy)', letterSpacing: '0.04em', textTransform: 'uppercase', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem' }}>
                    Read Article <ArrowRight size={13} style={{ color: 'var(--color-gold-dark)' }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06. CTA BANNER
          Priority 2 & 7: Confident, authoritative closing command
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '5.5rem 0',
        backgroundColor: 'var(--color-navy)',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <span className="section-label">Get Started</span>
          <h2 style={{ fontSize: 'clamp(2.35rem, 4.8vw, 3.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
            Set up your business <br />
            with <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold)' }}>complete confidence.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '48ch', margin: '0 auto 2.5rem', lineHeight: '1.65' }}>
            Talk to our Senior Corporate Advisors and Legal Counsel. We handle company registrations and statutory filings across all 28 states and 8 Union Territories.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold" style={{ padding: '0.875rem 2rem', fontSize: '0.9375rem' }}>
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '0.875rem 1.75rem', fontSize: '0.9375rem' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
