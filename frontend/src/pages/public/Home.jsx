import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../components/ui/Reveal';
import { Counter } from '../../components/ui/Counter';
import { useTheme } from '../../utils/ThemeContext';
import {
  ArrowRight, Building2, Calculator, ShieldCheck, Scale,
  ChevronDown, User, Users, Store, CheckCircle,
  TrendingUp, Award, Globe, MessageCircle,
  Check, Clock
} from 'lucide-react';

/* ── Institutional Hero Persona Retainers ── */
const heroHubTabs = [
  {
    id: 'sole',
    label: 'Sole Proprietorship',
    title: 'Sole Proprietorship Package',
    badge: 'Best for Freelancers & Small Traders',
    time: '2–5 Business Days',
    desc: 'Everything you need to formally establish your sole proprietorship — MSME/Udyam registration, GST setup, and Shops & Establishment licence to open a current bank account and operate legally.',
    registrations: [
      { name: 'MSME / Udyam Registration', fee: 'Instant Udyam Certificate', time: '1–2 Business Days', link: '/services/udyam-registration', tag: 'Bank KYC & Govt Benefits' },
      { name: 'GST Registration', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Pan-India Billing & Tax' },
      { name: 'Shops & Establishment Licence', fee: 'State Labour Compliance', time: '3–7 Business Days', link: '/services/shops-establishments', tag: 'Local Trade Compliance' },
    ]
  },
  {
    id: 'pvtltd',
    label: 'Private Ltd Company',
    title: 'Private Limited Company Package',
    badge: 'Most Popular · Funding-Ready Structure',
    time: '10–14 Business Days',
    desc: 'Complete Private Limited incorporation along with multi-state GST registration and trademark filing — everything your startup needs to raise investment and operate across India.',
    registrations: [
      { name: 'Private Limited Incorporation', fee: 'Govt Registration Included', time: '10–15 Business Days', link: '/services/private-limited-company', tag: 'Limited Liability Structure' },
      { name: 'Multi-State GST Registration', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Inter-State Commerce' },
      { name: 'Trademark Filing & Brand Shield', fee: 'Govt Registry Fee', time: 'Same-Day Priority Filing', link: '/services/trademark-registration', tag: 'Brand Name & Logo Protection' },
    ]
  },
  {
    id: 'others',
    label: 'Others',
    title: 'Other Business Structures',
    badge: 'LLP · OPC · Section 8 & More',
    time: 'Varies by Structure',
    desc: 'Explore other recognised legal structures — choose the one that fits your needs and get a full breakdown of the services included.',
    registrations: []
  },
];

/* ── Others Sub-Options ── */
const othersSubOptions = [
  {
    id: 'llp',
    label: 'LLP',
    title: 'Limited Liability Partnership',
    badge: 'Flexible Structure · Low Compliance',
    time: '12–15 Business Days',
    desc: 'Combines partnership flexibility with limited liability protection. Ideal for professionals, consultants, and small service firms.',
    registrations: [
      { name: 'LLP Incorporation', fee: 'Nominal Govt Fee', time: '12–15 Business Days', link: '/services/llp-registration', tag: 'Limited Liability Structure' },
      { name: 'Trademark Registration', fee: 'Govt Registry Fee', time: 'Same-Day Priority Filing', link: '/services/trademark-registration', tag: 'Brand Name & Logo Protection' },
      { name: 'GST Registration', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Pan-India Billing & Tax' },
    ]
  },
  {
    id: 'opc',
    label: 'OPC',
    title: 'One Person Company',
    badge: 'Solo Founder · Full Corporate Shield',
    time: '10–12 Business Days',
    desc: 'Full corporate limited liability protection tailored for solo founders and independent consultants — no second director required.',
    registrations: [
      { name: 'OPC Incorporation', fee: 'Govt Registration Included', time: '10–12 Business Days', link: '/services/private-limited-company', tag: 'Solo Entrepreneur Setup' },
      { name: 'GST Registration', fee: 'Direct Expert Filing', time: '3–5 Business Days', link: '/services/gst-registration', tag: 'Pan-India Billing & Tax' },
      { name: 'Udyam MSME Registration', fee: 'Instant Udyam Certificate', time: '1–2 Business Days', link: '/services/udyam-registration', tag: 'Govt Benefits & Bank KYC' },
    ]
  },
  {
    id: 'sec8',
    label: 'Section 8',
    title: 'Section 8 Company (Non-Profit)',
    badge: 'NGO · CSR · Charitable Foundation',
    time: '12–18 Business Days',
    desc: 'Government-recognised non-profit structure for charitable trusts, foundations, educational institutions, and CSR-funded entities.',
    registrations: [
      { name: 'Section 8 Incorporation', fee: 'Central Licence Included', time: '12–18 Business Days', link: '/services/section-8-company', tag: 'Non-Profit Legal Status' },
      { name: 'FCRA Registration', fee: 'Govt Filing Fee', time: '90–120 Days', link: '/services/section-8-company', tag: 'Foreign Donations Approval' },
      { name: 'Udyam MSME Registration', fee: 'Instant Udyam Certificate', time: '1–2 Business Days', link: '/services/udyam-registration', tag: 'Govt Tender & Bank Benefits' },
    ]
  },
];

/* ── Disciplines & Value-Focused Matrix Data ── */
/* ── Disciplines & Value-Focused Matrix Data ── */
const servicesMatrix = [
  /* 10 Featured Flagship Cards (Shown in 'All Services') */
  { title: 'Sole Proprietorship Registration', category: 'setup', slug: 'proprietorship-setup', tag: 'Company Setup', desc: 'The simplest and fastest way to start a business for freelancers and individual traders.', fee: 'Professional Filing', time: '2–5 Days', featured: false },
  { title: 'Partnership Firm Registration', category: 'setup', slug: 'partnership-firm-registration', tag: 'Company Setup', desc: 'Formalize your business partnership with a registered deed to ensure clear terms and legal standing.', fee: 'Drafting & Notarization', time: '5–7 Days', featured: true },
  { title: 'Limited Liability Partnership (LLP)', category: 'setup', slug: 'llp-registration', tag: 'Company Setup', desc: 'Combines the flexibility of a traditional partnership with the personal asset protection of a private limited company.', fee: 'Nominal Govt Fee', time: '12–15 Days', featured: true },
  { title: 'Private Limited Company Registration', category: 'setup', slug: 'private-limited-company', tag: 'Company Setup', desc: 'The most reliable corporate structure for growing companies, protecting personal assets and making raising investment easy.', fee: 'Govt Registration Included', time: '10–15 Days', featured: true },
  { title: 'GST Registration & Tax Setup', category: 'registrations', slug: 'gst-registration', tag: 'Tax Registration', desc: 'Official state and central GST registration required to bill customers PAN-India and sell across state borders.', fee: 'Direct Expert Filing', time: '3–5 Days', featured: true },
  { title: 'Udyam (MSME) Registration', category: 'registrations', slug: 'udyam-registration', tag: 'Government Certificate', desc: 'Secures priority bank loans, 50% discount on government trademark fees, and special startup benefits.', fee: 'Instant Udyam Certificate', time: '1–2 Days', featured: true },
  { title: 'DPIIT (Startup India) Recognition', category: 'registrations', slug: 'startup-india-recognition', tag: 'Startup Recognition', desc: 'Unlock 3-year tax exemptions, easier compliance, and fast-track IPR processing for your innovative startup.', fee: 'Govt Recognition', time: '3–5 Days', featured: true },
  { title: 'FSSAI Food Safety License', category: 'license', slug: 'fssai-licence', tag: 'Trade License', desc: 'Mandatory government food license for food product manufacturers, restaurants, cafes, and cloud kitchens.', fee: 'State & Central Filing', time: '7–10 Days', featured: true },
  { title: 'Shops & Establishments License', category: 'license', slug: 'shops-establishments', tag: 'Local License', desc: 'Official operating permit required by state labor departments for commercial offices, stores, and businesses.', fee: 'State Specific Fee', time: '3–7 Days', featured: true },
  { title: 'Trademark Registration & Brand Shield', category: 'ip', slug: 'trademark-registration', tag: 'Brand Protection', desc: 'Protect your brand name, logo, and unique business identity against copycats across India.', fee: 'Govt Registry Fee', time: 'Same-Day Filing', featured: true },
  { title: 'Import Export Code (IEC) License', category: 'license', slug: 'iec-registration', tag: 'Global Trade License', desc: 'Mandatory DGFT authorization required to import commercial goods into India or export products and IT services worldwide.', fee: 'Lifetime Govt Permit', time: '2–4 Days', featured: true },

  /* Additional Specialized Company Setup Cards */
  { title: 'One Person Company (OPC) Registration', category: 'setup', slug: 'opc-registration', tag: 'Solo Entrepreneur Setup', desc: 'Full corporate limited liability protection tailored for solo founders and independent consultants without requiring a second director.', fee: 'Govt Registration Included', time: '10–12 Days', featured: false },
  { title: 'Public Limited Company Incorporation', category: 'setup', slug: 'private-limited-company', tag: 'Corporate Expansion', desc: 'Comprehensive multi-shareholder corporate entity structuring required for raising public equity or pre-IPO venture financing.', fee: 'Complete Statutory Package', time: '15–20 Days', featured: false },
  { title: 'Foreign Subsidiary Incorporation in India', category: 'setup', slug: 'private-limited-company', tag: 'FDI & Cross-Border', desc: 'End-to-end statutory setup for international corporations establishing wholly owned Indian subsidiaries under FEMA and RBI guidelines.', fee: 'FDI Compliance Included', time: '14–21 Days', featured: false },
  { title: 'Section 8 Company Incorporation', category: 'setup', slug: 'section-8-company', tag: 'Non-Profit Setup', desc: 'Government-recognized non-profit structure ideal for charitable trusts, foundations, educational institutions, and CSR entities.', fee: 'Central License Included', time: '12–18 Days', featured: false },

  /* Additional Specialized Taxation & Govt Registrations Cards */
  { title: 'Multi-State GST Registration', category: 'registrations', slug: 'gst-registration', tag: 'Multi-State Tax Setup', desc: 'Official GST registration across multiple states enabling pan-India billing, inter-state commerce, and marketplace onboarding.', fee: 'Direct Expert Filing', time: '3–5 Days', featured: false },
  { title: 'PAN, TAN & TDS Services', category: 'registrations', slug: 'pan-tan-tds-services', tag: 'Tax Identity Registration', desc: 'Permanent Account Number, Tax Deduction Account Number allocation, and TDS registration for compliance.', fee: 'Zero Govt Fee', time: '1–2 Days', featured: false },
  { title: 'Professional Tax Enrolment', category: 'registrations', slug: 'professional-tax', tag: 'State Tax Registration', desc: 'Mandatory state-level employer and employee professional tax registration required for businesses hiring staff in applicable states.', fee: 'State Specific Fee', time: '2–5 Days', featured: false },
  { title: 'GST Amendment & Additional Place of Business', category: 'registrations', slug: 'gst-amendment', tag: 'GST Update Registration', desc: 'Official amendment of GST registration for change of address, addition of business premises, or jurisdictional state transfer.', fee: 'Direct Expert Filing', time: '3–7 Days', featured: false },

  /* Additional Specialized Trade Licensing Cards */
  { title: 'EPF & ESIC Staff Registration', category: 'license', slug: 'epf-registration', tag: 'Staff & Labor Law', desc: 'Official provident fund and employee health insurance setup required as your team grows above threshold limits.', fee: 'Complete Setup & Filing', time: '5–7 Days', featured: false },
  { title: 'ISO Certification & Quality Standards', category: 'license', slug: 'shops-establishments', tag: 'Global Accreditation', desc: 'Complete statutory audit and documentation support for ISO 9001:2015, ISO 27001, and CE quality standard certifications.', fee: 'Complete Accreditation', time: '7–12 Days', featured: false },
  { title: 'RERA & State Regulatory Permitting', category: 'license', slug: 'shops-establishments', tag: 'Real Estate & Projects', desc: 'End-to-end RERA project registration, agent certification, and municipal land zoning clearance across major Indian jurisdictions.', fee: 'Jurisdiction Specific', time: '14–20 Days', featured: false },
  { title: 'Pollution Control Board Consent (CTE/CTO)', category: 'license', slug: 'pollution-control', tag: 'Environmental Compliance', desc: 'State Pollution Control Board Consent to Establish (CTE) and Consent to Operate (CTO) permits for industrial units.', fee: 'State Board Filing', time: '10–15 Days', featured: false },

  /* Additional Specialized Trademark & IP Cards */
  { title: 'Trademark Objection & Hearing Defense', category: 'ip', slug: 'trademark-registration', tag: 'IP Legal Defense', desc: 'Expert legal response and hearing representation by Senior Corporate Counsel to overcome Trademark Registry examination objections.', fee: 'Transparent Pricing', time: '48 Hour Response', featured: false },
  { title: 'Copyright & Digital Design Protection', category: 'ip', slug: 'copyright-registration', tag: 'IP Asset Shield', desc: 'Official government copyright filing to legally secure your proprietary software code, creative content, architectural plans, and brand assets.', fee: 'Govt Registry Included', time: '14–18 Days', featured: false },
  { title: 'Patent Prior-Art Search & Filing', category: 'ip', slug: 'patent-filing', tag: 'Innovation Protection', desc: 'Comprehensive patent novelty search, provisional specification drafting, and complete Indian Patent Office representation.', fee: 'Technical Drafting Fee', time: '7–14 Days', featured: false },
];

/* ── Fiduciary FAQ Data ── */
const faqData = [
  { q: 'How long does it take to register a Private Limited company?', a: 'A Private Limited or LLP registration typically takes 10 to 14 business days, depending on name approval and state stamp duty processing. Our team handles all the paperwork and government follow-ups for you.' },
  { q: 'Do I need to visit any office or submit physical documents?', a: 'No. Everything is done 100% online. Identity verification, digital signatures, and all government filings are handled digitally. We serve clients across all 28 states and 8 Union Territories.' },
  { q: 'How are your professional fees structured?', a: 'We offer transparent pricing that is agreed upon before we start any work. Our comprehensive packages are designed for predictability and mutual trust at every stage.' },
  { q: 'Are your services handled by qualified professionals?', a: 'Yes. Every registration is handled directly by qualified professionals. We do not outsource any government filings — your documents are prepared, verified, and submitted by experienced specialists.' },
  { q: 'What other registrations might I need after incorporating my company?', a: 'After incorporation, most businesses require GST registration to start billing clients, Udyam/MSME registration to access government benefits, and Trademark registration to protect their brand name. Our team will advise you on exactly which registrations are relevant for your specific business type.' },
  { q: 'Can you assist if my registration application was rejected or objected to?', a: 'Absolutely. Our team regularly handles registration rejections, GST objections, and trademark examination reports. We respond with detailed professional replies and resubmit corrected applications to ensure successful approval.' },
];

/* ── 4-Step Engagement Workflow ── */
const processSteps = [
  { num: '01', title: 'Consultation & Strategy', desc: 'We understand your exact business goals, team size, and location to recommend the right registration and tax structure.' },
  { num: '02', title: 'Document Collection & Preparation', desc: 'Our Senior Compliance Advisors carefully check and prepare all needed documents, IDs, and application forms to ensure strict regulatory compliance and seamless approval.' },
  { num: '03', title: 'Regulatory Filings', desc: 'We submit your applications directly to the Ministry of Corporate Affairs, GST portal, or Trademark office and other regulators.' },
  { num: '04', title: 'Fast Delivery & Continuous Support', desc: 'You receive all official government certificates timely along with compliance calendar & continuous support for your business.' },
];

export default function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState('sole');
  const [activeOthersSub, setActiveOthersSub] = useState('llp');
  const [matrixCategory, setMatrixCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getThDark = (bgHex) => ({
    pageBg:        bgHex,
    cardBg:        '#101A2D',
    cardBorder:    '#243149',
    heading:       '#FFFFFF',
    headingStrong: '#FFFFFF',
    body:          '#AAB4C5',
    bodyFaint:     'rgba(255,255,255,0.5)',
    accent:        '#C79A45',
    accentGold:    '#C79A45',
    iconBg:        'rgba(199,154,69,0.12)',
    iconBorder:    'rgba(199,154,69,0.3)',
    sectionBg:     bgHex,
    pillBg:        'rgba(199,154,69,0.14)',
    pillBorder:    'rgba(199,154,69,0.35)',
    pillText:      '#FFFFFF',
    tabActive:     'rgba(199,154,69,0.14)',
    tabActiveBorder: '#C79A45',
    tabActiveText: '#C79A45',
    tabDefault:    'rgba(255,255,255,0.04)',
    tabDefaultBorder: 'rgba(255,255,255,0.1)',
    tabDefaultText: 'rgba(255,255,255,0.6)',
    divider:       '#243149',
    highlightBar:  bgHex,
    highlightText: '#FFFFFF',
    highlightMuted:'rgba(255,255,255,0.6)',
    linkHover:     '#C79A45',
  });

  const getThLight = (bgHex) => ({
    pageBg:        bgHex,
    cardBg:        '#FFFFFF',
    cardBorder:    '#E5E7EB',
    heading:       '#0B172A',
    headingStrong: '#0B172A',
    body:          '#475467',
    bodyFaint:     '#667085',
    accent:        '#C79A45',
    accentGold:    '#C79A45',
    iconBg:        '#FBF5E8',
    iconBorder:    '#E7DCC5',
    sectionBg:     bgHex,
    pillBg:        '#FBF5E8',
    pillBorder:    '#E7DCC5',
    pillText:      '#0B172A',
    tabActive:     '#FBF5E8',
    tabActiveBorder: '#C79A45',
    tabActiveText: '#0B172A',
    tabDefault:    '#FFFFFF',
    tabDefaultBorder: '#E5E7EB',
    tabDefaultText: '#475467',
    divider:       '#E5E7EB',
    highlightBar:  bgHex,
    highlightText: '#0B172A',
    highlightMuted:'#475467',
    linkHover:     '#C79A45',
  });


  /* ── Theme helper: call th.bg, th.text, etc ── */
  const th = {
    pageBg:        isDark ? '#050A15'              : 'hsl(var(--background))',
    cardBg:        isDark ? '#0D1424'              : '#ffffff',
    cardBorder:    isDark ? 'rgba(255,255,255,0.08)': 'hsl(var(--border))',
    heading:       isDark ? '#ffffff'              : 'hsl(var(--foreground))',
    headingStrong: isDark ? '#ffffff'              : 'hsl(var(--foreground))',
    body:          isDark ? 'rgba(255,255,255,0.72)': 'hsl(var(--muted-foreground))',
    bodyFaint:     isDark ? 'rgba(255,255,255,0.5)': 'hsl(var(--muted-foreground))',
    accent:        'hsl(var(--primary))',
    accentGold:    isDark ? 'var(--color-gold)'   : 'hsl(var(--primary))',
    iconBg:        isDark ? 'rgba(223,186,115,0.12)': 'hsl(var(--primary)/0.1)',
    iconBorder:    isDark ? 'rgba(223,186,115,0.3)' : 'hsl(var(--primary)/0.25)',
    sectionBg:     isDark ? '#0D1424'              : '#f1f5f9',
    pillBg:        isDark ? 'rgba(223,186,115,0.14)': 'hsl(var(--primary)/0.1)',
    pillBorder:    isDark ? 'rgba(223,186,115,0.35)': 'hsl(var(--primary)/0.3)',
    pillText:      isDark ? '#ffffff'              : 'hsl(var(--foreground))',
    tabActive:     isDark ? 'rgba(223,186,115,0.14)': 'hsl(var(--primary)/0.1)',
    tabActiveBorder: isDark? 'rgba(223,186,115,0.4)': 'hsl(var(--primary)/0.4)',
    tabActiveText: 'hsl(var(--primary))',
    tabDefault:    isDark ? 'rgba(255,255,255,0.04)': 'hsl(var(--secondary))',
    tabDefaultBorder: isDark?'rgba(255,255,255,0.1)': 'hsl(var(--border))',
    tabDefaultText:isDark ? 'rgba(255,255,255,0.6)': 'hsl(var(--muted-foreground))',
    divider:       isDark ? 'rgba(255,255,255,0.08)': 'hsl(var(--border))',
    highlightBar:  isDark ? 'rgba(5,10,20,0.92)'  : 'hsl(var(--foreground)/0.97)',
    highlightText: isDark ? '#ffffff'              : '#ffffff',
    highlightMuted:isDark ? 'rgba(255,255,255,0.6)': 'rgba(255,255,255,0.75)',
    linkHover:     'hsl(var(--primary))',
  };

  const activeHubData = heroHubTabs.find(t => t.id === activeHeroTab) || heroHubTabs[0];
  const activeOthersData = othersSubOptions.find(o => o.id === activeOthersSub) || othersSubOptions[0];
  const filteredServices = (matrixCategory === 'all' 
    ? servicesMatrix.filter(s => s.featured) 
    : servicesMatrix.filter(s => s.category === matrixCategory)).slice(0, 10);

  return (
    <div style={{ width: '100%', background: '#07101F' }}>

      {/* ═══════════════════════════════════════════
          01. HERO — INSTITUTIONAL PRACTICE DESK
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = true;
      const th = getThDark('#07101F');
      return (
  <section className={isDark ? "bg-institutional-grid" : ""} style={{
        padding: '5rem 0 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Spotlights behind Hero Content */}
        <motion.div className="animate-aurora" 
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{
          position: 'absolute', top: isDark ? '-10%' : '-20%', right: isDark ? '2%' : '15%', width: isDark ? '700px' : '70%', height: '700px',
          background: isDark ? 'radial-gradient(circle at center, rgba(197, 168, 128, 0.18) 0%, rgba(5, 10, 21, 0) 70%)' : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />
        <motion.div className="animate-aurora" 
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          style={{
          position: 'absolute', top: '20%', left: '-5%', width: '600px', height: '600px',
          background: isDark ? 'radial-gradient(circle at center, rgba(30, 80, 160, 0.22) 0%, rgba(5, 10, 21, 0) 70%)' : 'none',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', position: 'relative', zIndex: 1 }}>
          {/* Asymmetric Institutional Grid: Left (~42% pushed left), Right (~58% expanded wider so zero scroll needed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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


              <h1 className="animate-fade-up" style={{
                fontFamily: isDark ? 'var(--font-editorial)' : 'var(--font-heading)',
                fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
                fontWeight: isDark ? 500 : 800,
                lineHeight: 1.1,
                color: th.headingStrong,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
                maxWidth: '18ch',
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : 'none'
              }}>
                You Build the Business. <span style={{ fontFamily: isDark ? 'var(--font-editorial)' : 'var(--font-heading)', fontStyle: isDark ? 'italic' : 'normal', fontWeight: isDark ? 400 : 800, color: isDark ? 'var(--color-gold)' : '#0a2540', textShadow: isDark ? '0 0 30px rgba(197, 168, 128, 0.35)' : 'none' }}>We Build the Foundation.</span>
              </h1>

              <p style={{
                fontSize: '1.08rem',
                color: th.body,
                lineHeight: '1.68',
                marginBottom: '2.25rem',
                maxWidth: '46ch',
                fontFamily: 'var(--font-body)'
              }}>
                We handle every type of business registration — company incorporation, GST, trademark, FSSAI, import-export, labour law registrations, and all government licences — managed directly by qualified professionals across all <Counter end={28} /> States and <Counter end={8} /> Union Territories.
              </p>

              {/* Action Pathways */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
                <Link to="/contact" className={isDark ? "btn-gold" : ""} style={{ 
                  padding: '0.92rem 1.95rem', 
                  fontSize: '0.94rem',
                  backgroundColor: isDark ? undefined : '#0a2540',
                  color: isDark ? undefined : '#ffffff',
                  borderRadius: '100px',
                  fontWeight: 600,
                  boxShadow: isDark ? '0 0 25px rgba(223, 186, 115, 0.35), 0 8px 24px -6px rgba(223, 186, 115, 0.5)' : '0 0 25px rgba(10, 37, 64, 0.35), 0 8px 20px -6px rgba(10, 37, 64, 0.5)',
                  display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
                }}>
                  Consult an Expert <ArrowRight size={16} />
                </Link>
                <Link to="/services" style={{ 
                  padding: '0.92rem 1.75rem', 
                  fontSize: '0.94rem', 
                  border: isDark ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(0,0,0,0.1)', 
                  color: th.heading,
                  background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '100px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 160ms ease',
                  boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : '#f9fafb'; 
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff'; 
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)'; 
                }}
                >
                  Explore Practice Areas
                </Link>
              </div>

            </div>

            {/* Right Column: Expanded Live Retainer Hub (Wider card + compact vertical spacing = zero scroll!) */}
            <div>
              <div className={isDark ? "glass-card-dark" : ""} style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                width: '100%',
                background: isDark ? 'linear-gradient(165deg, rgba(20, 32, 58, 0.90) 0%, rgba(9, 15, 28, 0.96) 100%)' : '#ffffff',
                border: isDark ? '1px solid rgba(223, 186, 115, 0.42)' : '1px solid rgba(0,0,0,0.08)',
                borderTop: isDark ? '3px solid var(--color-gold)' : '3px solid #0a2540',
                boxShadow: isDark ? '0 32px 80px -16px rgba(0, 0, 0, 0.8), 0 0 50px rgba(223, 186, 115, 0.18)' : '0 20px 40px -10px rgba(0,0,0,0.05), 0 0 20px rgba(79, 70, 229, 0.05)'
              }}>
                {/* Header / Persona Selector */}
                <div style={{ padding: '1.25rem 1.75rem 1rem', backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : '#f8fafc', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isDark ? 'var(--color-gold)' : '#0a2540', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isDark ? '#ffffff' : '#111827', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                        Recommended Service Package
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.55)' : '#6b7280', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      Customized for Your Business
                    </span>
                  </div>

                  {/* Persona Tabs */}
                  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="hide-scroll">
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
                            border: isSelected ? (isDark ? '1px solid var(--color-gold)' : '1px solid #0a2540') : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb'),
                            backgroundColor: isSelected ? (isDark ? 'var(--color-gold)' : '#eef2ff') : (isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'),
                            color: isSelected ? (isDark ? 'var(--color-navy)' : '#0a2540') : (isDark ? 'rgba(255,255,255,0.7)' : '#4b5563'),
                            transition: 'all 160ms ease'
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Others sub-option pills — appear right below the tab row */}
                  {activeHeroTab === 'others' && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                      {othersSubOptions.map(opt => {
                        const isSel = activeOthersSub === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setActiveOthersSub(opt.id)}
                            style={{
                              padding: '0.38rem 0.95rem',
                              borderRadius: 'var(--radius-md)',
                              fontSize: '0.76rem',
                              fontWeight: 600,
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                              border: isSel ? (isDark ? '1px solid var(--color-gold)' : '1px solid #0a2540') : (isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid #e5e7eb'),
                              backgroundColor: isSel ? (isDark ? 'rgba(223,186,115,0.2)' : '#eef2ff') : (isDark ? 'rgba(255,255,255,0.04)' : '#f9fafb'),
                              color: isSel ? (isDark ? 'var(--color-gold)' : '#0a2540') : (isDark ? 'rgba(255,255,255,0.6)' : '#6b7280'),
                              transition: 'all 150ms ease'
                            }}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Scope Details */}
                <div style={{ padding: 'clamp(1rem, 4vw, 1.4rem) clamp(1rem, 4vw, 1.75rem)' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroTab === 'others' ? `others-${activeOthersSub}` : activeHubData.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14 }}
                    >
                      {activeHeroTab === 'others' ? (
                        <>
                          {/* Others: title + time badge */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '10px' }}>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: isDark ? 'var(--color-gold)' : '#0a2540', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                                {activeOthersData.badge}
                              </span>
                              <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', color: isDark ? '#ffffff' : '#111827', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                                {activeOthersData.title}
                              </h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f3f4f6', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb' }}>
                              <Clock size={13} color={isDark ? "var(--color-gold)" : "#0a2540"} />
                              <span style={{ fontSize: '0.78rem', color: isDark ? '#ffffff' : '#374151', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{activeOthersData.time}</span>
                            </div>
                          </div>

                          <p style={{ fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.68)' : '#4b5563', lineHeight: '1.55', marginBottom: '1.1rem', fontFamily: 'var(--font-body)' }}>
                            {activeOthersData.desc}
                          </p>

                          {/* Sub-option service items */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.2rem' }}>
                            {activeOthersData.registrations.map((reg, idx) => (
                              <Link
                                key={idx}
                                to={reg.link}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                                  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
                                  borderRadius: 'var(--radius-lg)',
                                  transition: 'all 160ms ease',
                                  gap: '12px',
                                  boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
                                  textDecoration: 'none'
                                }}
                                onMouseEnter={e => { 
                                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.07)' : '#f9fafb'; 
                                  e.currentTarget.style.borderColor = isDark ? 'rgba(223,186,115,0.4)' : '#c7d2fe'; 
                                  e.currentTarget.style.transform = 'translateX(3px)'; 
                                }}
                                onMouseLeave={e => { 
                                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'; 
                                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'; 
                                  e.currentTarget.style.transform = 'translateX(0)'; 
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flex: '1 1 auto' }}>
                                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isDark ? 'rgba(223,186,115,0.15)' : '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Check size={12} color={isDark ? "var(--color-gold)" : "#0a2540"} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: isDark ? '#ffffff' : '#111827', lineHeight: 1.3 }}>{reg.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280', marginTop: '2px' }}>{reg.tag}</div>
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDark ? 'var(--color-gold)' : '#0a2540', fontFamily: 'var(--font-body)' }}>{reg.fee}</div>
                                  <div style={{ fontSize: '0.68rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af', marginTop: '2px' }}>{reg.time}</div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <Link
                            to="/contact"
                            className={isDark ? "btn-gold" : ""}
                            style={{ 
                              width: '100%', padding: '0.82rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                              backgroundColor: isDark ? undefined : '#0a2540',
                              color: isDark ? undefined : '#ffffff',
                              borderRadius: 'var(--radius-md)',
                              textDecoration: 'none',
                              fontWeight: 600
                            }}
                          >
                            Start {activeOthersData.title} Setup <ArrowRight size={15} />
                          </Link>
                        </>
                      ) : (
                        <>
                          {/* Normal tab: title + time badge */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '10px' }}>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: isDark ? 'var(--color-gold)' : '#0a2540', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                                {activeHubData.badge}
                              </span>
                              <h3 style={{ fontSize: 'clamp(1.15rem, 4vw, 1.38rem)', color: isDark ? '#ffffff' : '#111827', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                                {activeHubData.title}
                              </h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f3f4f6', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb' }}>
                              <Clock size={13} color={isDark ? "var(--color-gold)" : "#0a2540"} />
                              <span style={{ fontSize: '0.78rem', color: isDark ? '#ffffff' : '#374151', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{activeHubData.time}</span>
                            </div>
                          </div>

                          <p style={{ fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.68)' : '#4b5563', lineHeight: '1.55', marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>
                            {activeHubData.desc}
                          </p>

                          {/* Normal tab service items */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.4rem' }}>
                            {activeHubData.registrations.map((reg, idx) => (
                              <Link
                                key={idx}
                                to={reg.link}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: 'clamp(0.6rem, 3vw, 0.8rem) clamp(0.75rem, 3vw, 1.1rem)',
                                  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
                                  borderRadius: 'var(--radius-lg)',
                                  transition: 'all 160ms ease',
                                  gap: '12px',
                                  boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
                                  textDecoration: 'none'
                                }}
                                onMouseEnter={e => { 
                                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.07)' : '#f9fafb'; 
                                  e.currentTarget.style.borderColor = isDark ? 'rgba(223,186,115,0.4)' : '#c7d2fe'; 
                                  e.currentTarget.style.transform = 'translateX(3px)'; 
                                }}
                                onMouseLeave={e => { 
                                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'; 
                                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'; 
                                  e.currentTarget.style.transform = 'translateX(0)'; 
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto' }}>
                                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: isDark ? 'rgba(223,186,115,0.15)' : '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Check size={13} color={isDark ? "var(--color-gold)" : "#0a2540"} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isDark ? '#ffffff' : '#111827', lineHeight: 1.3 }}>{reg.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: isDark ? 'rgba(255,255,255,0.55)' : '#6b7280', marginTop: '2px' }}>{reg.tag}</div>
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isDark ? 'var(--color-gold)' : '#0a2540', fontFamily: 'var(--font-body)' }}>{reg.fee}</div>
                                  <div style={{ fontSize: '0.7rem', color: isDark ? 'rgba(255,255,255,0.55)' : '#9ca3af', marginTop: '2px' }}>{reg.time}</div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <Link
                            to="/contact"
                            className={isDark ? "btn-gold" : ""}
                            style={{ 
                              width: '100%', padding: '0.88rem', fontSize: '0.92rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                              backgroundColor: isDark ? undefined : '#0a2540',
                              color: isDark ? undefined : '#ffffff',
                              borderRadius: 'var(--radius-md)',
                              textDecoration: 'none',
                              fontWeight: 600
                            }}
                          >
                            Start {activeHubData.title} Setup <ArrowRight size={15} />
                          </Link>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          01B. STANDALONE INSTITUTIONAL HIGHLIGHT BAR
          High-contrast standalone bar with gold icons (Exact to 3rd image purana front layout)
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = true;
      const th = getThDark('#0B172A');
      return (
  <section className={isDark ? "glass-navbar" : ""} style={{
        backgroundColor: isDark ? 'rgba(5, 10, 20, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        borderTop: isDark ? '1px solid rgba(223, 186, 115, 0.38)' : '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
        padding: '2.25rem 0',
        position: 'relative',
        boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.45)' : '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '92rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal delay={200}>
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.75rem',
            alignItems: 'center'
          }}>
            
            {/* Item 1: PAN India Service */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: isDark ? 'rgba(223, 186, 115, 0.12)' : '#eef2ff',
                border: isDark ? '1px solid rgba(223, 186, 115, 0.35)' : '1px solid #c7d2fe',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Globe size={22} style={{ color: isDark ? 'var(--color-gold)' : '#0a2540' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: isDark ? '#ffffff' : '#111827', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  PAN India Service
                </span>
                <span style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280', display: 'block' }}>
                  All states & UTs covered
                </span>
              </div>
            </div>

            {/* Item 2: 100% Online */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: isDark ? 'rgba(223, 186, 115, 0.12)' : '#eef2ff',
                border: isDark ? '1px solid rgba(223, 186, 115, 0.35)' : '1px solid #c7d2fe',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <CheckCircle size={22} style={{ color: isDark ? 'var(--color-gold)' : '#0a2540' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: isDark ? '#ffffff' : '#111827', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  100% Online Process
                </span>
                <span style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280', display: 'block' }}>
                  No office visit required
                </span>
              </div>
            </div>

            {/* Item 3: Qualified Experts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: isDark ? 'rgba(223, 186, 115, 0.12)' : '#eef2ff',
                border: isDark ? '1px solid rgba(223, 186, 115, 0.35)' : '1px solid #c7d2fe',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Award size={22} style={{ color: isDark ? 'var(--color-gold)' : '#0a2540' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: isDark ? '#ffffff' : '#111827', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  Qualified Experts Only
                </span>
                <span style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280', display: 'block' }}>
                  Senior Advisors & Legal Counsel
                </span>
              </div>
            </div>

            {/* Item 4: Transparent Pricing */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                backgroundColor: isDark ? 'rgba(223, 186, 115, 0.12)' : '#eef2ff',
                border: isDark ? '1px solid rgba(223, 186, 115, 0.35)' : '1px solid #c7d2fe',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <TrendingUp size={22} style={{ color: isDark ? 'var(--color-gold)' : '#0a2540' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.98rem', color: isDark ? 'var(--color-gold)' : '#0a2540', fontWeight: 700, display: 'block', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '3px' }}>
                  Transparent Pricing
                </span>
                <span style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280', display: 'block' }}>
                  Clear and upfront fee structures
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          02. FIDUCIARY SCOPE — DISCIPLINES MATRIX
          Priority 3: Value-focused service cards without pricing-catalogue noise
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = false;
      const th = getThLight('#F2F6FA');
      return (
  <section style={{ 
        padding: '5.5rem 0 6.5rem', 
        backgroundColor: '#f1f5f9',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft Ambient Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '60vw', height: '60vw', background: 'radial-gradient(circle at center, rgba(91,78,232,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle at center, rgba(91,78,232,0.04) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Expanded 108rem (1728px / 94vw) container to utilize full desktop screen width */}
        <div style={{ maxWidth: '108rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 3rem)', position: 'relative', zIndex: 1 }}>
          
          <Reveal delay={100}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.75rem' }}>
              <div>
              <span style={{
                  background: 'rgba(223, 186, 115, 0.15)',
                  border: '1px solid rgba(223, 186, 115, 0.4)',
                color: '#0a2540',
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
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0a2540' }} />
                Our Practice Areas
              </span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.1rem)', fontWeight: 800, color: '#0a2540', marginTop: '0.85rem', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '32ch' }}>
                Essential services across company setup, <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-dark)' }}>taxation, and licensing.</span>
              </h2>
              <p style={{ color: '#4b5563', fontSize: '1.05rem', marginTop: '0.75rem', maxWidth: '64ch', lineHeight: '1.65' }}>
                Select a practice pillar to review what&apos;s included, statutory government requirements, and exact completion timelines.
              </p>
            </div>

            {/* Service Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Services' },
                { id: 'setup', label: 'Business Establishment' },
                { id: 'license', label: 'Trade Licensing' },
                { id: 'ip', label: 'Trademark & IP' },
                { id: 'registrations', label: 'Tax & Govt Registrations' },
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
                      border: isSelected ? '1px solid var(--color-gold-dark)' : '1px solid rgba(0,0,0,0.1)',
                      backgroundColor: isSelected ? 'var(--color-gold)' : '#ffffff',
                      color: isSelected ? '#0a2540' : '#4b5563',
                      backdropFilter: 'blur(12px)',
                      boxShadow: isSelected ? '0 6px 18px rgba(13, 21, 39, 0.22)' : '0 2px 4px rgba(0,0,0,0.02)',
                      transition: 'all 180ms ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

          {/* Service Cards Grid: Sleeker horizontal columns (minmax(270px, 1fr)) across wide 108rem grid */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '2rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  layout
                  className={index >= 4 ? 'hidden md:flex' : 'flex'}
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 1 }}
                  style={{ width: '100%' }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    style={{
                      display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                      padding: '1.75rem 1.5rem 1.5rem',
                      borderRadius: 'var(--radius-xl)',
                      textDecoration: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.65)',
                      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px -8px rgba(13, 21, 39, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
                      transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                      e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)';
                      e.currentTarget.style.borderColor = '#0a2540';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 40px -10px rgba(0, 0, 0, 0.1), 0 0 24px rgba(55, 48, 163, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                      e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(13, 21, 39, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)';
                    }}
                  >
                    {/* Top Metadata Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: '#0a2540',
                        fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {service.tag}
                      </span>
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 600, color: '#4b5563',
                        fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0
                      }}>
                        {service.time}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 750, fontFamily: 'var(--font-heading)', color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                      {service.desc}
                    </p>

                    {/* Bottom Footer Row: Clean separation without wrapping */}
                    <div style={{ borderTop: '1px solid rgba(13, 21, 39, 0.07)', paddingTop: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '0.68rem', color: '#6b7280', display: 'block', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: '3px' }}>What&apos;s Included</span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 650, color: '#111827', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.fee}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 700, color: '#0a2540', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        Learn More <ArrowRight size={14} style={{ color: '#0a2540' }} />
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
              className=""
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.95rem 2.35rem',
                fontSize: '0.96rem',
                fontWeight: 700,
                borderRadius: '99px',
                backgroundColor: '#0a2540',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 4px 14px 0 rgba(55, 48, 163, 0.39)',
                transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(55, 48, 163, 0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(55, 48, 163, 0.39)'; }}
            >
              Explore All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          03. INSTITUTIONAL RIGOR — ASYMMETRICAL 4-STEP ENGAGEMENT
          Priority 4 & 8: Left-aligned narrative anchoring vs execution steps
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = true;
      const th = getThDark('#0B172A');
      return (
  <section style={{ padding: '7rem 0', backgroundColor: th.sectionBg, position: 'relative' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div className="grid-home-matrix">

            {/* Left: Why Sterling Advisory */}
            <Reveal delay={150}>
              <span className="section-label">Why Choose Us</span>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 500, color: th.heading, marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '22ch' }}>
                Top-tier corporate advisory without the heavy overhead.
              </h2>
              <p style={{ color: th.body, marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.65', maxWidth: '48ch' }}>
                We replace slow paper bureaucracy with fast, accurate digital processes. Whether you are starting a new company or managing GST returns across states, our team acts as your trusted legal and financial advisor.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'All-India Coverage', desc: 'Seamless company registration and filings across all 28 states and 8 Union Territories.' },
                  { title: '100% Online Process', desc: 'Simple cloud document sharing without physical visits or slow paperwork.' },
                  { title: 'Expert Professional Support', desc: 'Every filing is reviewed and certified by dedicated qualified professionals.' },
                  { title: 'Transparent Pricing', desc: 'Clear, upfront fee structures tailored to your specific business requirements.' },
                ].map((item, i) => (
                  <div key={i} className="hover-lift" style={{ borderLeft: isDark ? '2px solid var(--color-gold)' : '2px solid #0a2540', paddingLeft: '1rem' }}>
                    <div style={{ fontWeight: 600, color: th.heading, fontSize: '0.9375rem', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: th.body, lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: How It Works Roadmap */}
            <Reveal delay={300}>
              <div className={isDark ? "glass-panel-dark hover-lift" : "hover-lift"} style={{
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                backgroundColor: isDark ? undefined : 'rgba(255,255,255,0.7)',
                border: isDark ? undefined : '1px solid rgba(0,0,0,0.06)',
                boxShadow: isDark ? undefined : '0 12px 30px rgba(0,0,0,0.03)'
              }}>
              <span className="section-label" style={{ marginBottom: '2rem', display: 'block' }}>HOW OUR SIMPLE 4-STEP PROCESS WORKS</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {processSteps.map((step) => (
                  <div key={step.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                      backgroundColor: isDark ? 'rgba(223,186,115,0.12)' : '#eef2ff',
                      border: isDark ? '1px solid var(--color-gold)' : '1px solid #c7d2fe',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 700, color: isDark ? 'var(--color-gold)' : '#0a2540', flexShrink: 0
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: th.heading, marginBottom: '6px' }}>{step.title}</div>
                      <div style={{ fontSize: '0.875rem', color: th.body, lineHeight: '1.6' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: th.body }}>Ready to get started with your initial consultation?</div>
                <Link to="/contact" className={isDark ? "btn-gold" : ""} style={{ 
                  padding: '0.625rem 1.25rem', 
                  fontSize: '0.8125rem',
                  backgroundColor: isDark ? undefined : '#0a2540',
                  color: isDark ? undefined : '#ffffff',
                  borderRadius: '100px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </Reveal>

          </div>
        </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          04. STATUTORY & SLA FAQS (COMPACT ACCORDION)
          Priority 2 & 6: Clean, non-robotic microcopy and subtle borders
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = false;
      const th = getThLight('#F8F8F6');
      return (
  <section style={{ padding: '5rem 0', backgroundColor: th.pageBg }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal delay={100}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="section-label">Frequently Asked Questions</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: th.heading, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                Clear Answers for Founders & Business Owners
              </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="hover-lift" style={{ backgroundColor: th.cardBg, borderRadius: 'var(--radius-xl)', border: `1px solid ${th.cardBorder}`, padding: '0 clamp(1rem, 5vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
            {faqData.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqData.length - 1 ? `1px solid ${th.cardBorder}` : 'none' }}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.5rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 600, color: th.heading, fontSize: '1.05rem', paddingRight: '1.5rem', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                  <div style={{
                    width: '28px', height: '28px', flexShrink: 0,
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: openFaqIndex === i ? (isDark ? 'var(--color-navy)' : '#eef2ff') : 'transparent',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background-color 180ms ease'
                  }}>
                    <ChevronDown size={15} style={{ color: openFaqIndex === i ? (isDark ? 'var(--color-gold)' : '#0a2540') : th.body, transform: openFaqIndex === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }} />
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
                      <p style={{ paddingBottom: '1.5rem', fontSize: '0.9375rem', color: th.body, lineHeight: '1.65' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            </div>
          </Reveal>
        </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          05. ADVISORY NOTES / KNOWLEDGE HUB
          Priority 2: "Advisory Notes / Structural briefings on corporate law and taxation."
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = true;
      const th = getThDark('#0B172A');
      return (
  <section style={{ padding: '5rem 0', backgroundColor: th.sectionBg, borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal delay={150}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
              <div>
                <span className="section-label">Advisory Notes</span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: th.heading, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                  Guides on Business Law & Taxation
                </h2>
              </div>
              <Link to="/insights" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: isDark ? 'var(--color-gold-dark)' : '#0a2540', letterSpacing: '0.06em', textTransform: 'uppercase' }} className="link-underline pb-1">
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
                  <Link to="/insights" className="card-premium" style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: th.cardBg, border: `1px solid ${th.cardBorder}` }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', textTransform: 'uppercase', color: isDark ? 'var(--color-gold-dark)' : '#0a2540', marginBottom: '0.875rem', display: 'block', fontWeight: 600 }}>{post.tag}</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: th.heading, marginBottom: '0.625rem', lineHeight: 1.35, letterSpacing: '-0.02em' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: th.body, marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: th.heading, letterSpacing: '0.04em', textTransform: 'uppercase', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem' }}>
                      Read Article <ArrowRight size={13} style={{ color: isDark ? 'var(--color-gold-dark)' : '#0a2540' }} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      );
    })()}

      {/* ═══════════════════════════════════════════
          06. CTA BANNER
          Priority 2 & 7: Confident, authoritative closing command
      ═══════════════════════════════════════════ */}
      {(() => {
      const isDark = false;
      const th = getThLight('#FBF5E8');
      return (
  <section style={{
        padding: '5.5rem 0',
        backgroundColor: th.pageBg,
        borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'
      }}>
        <Reveal delay={200}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
            <span className="section-label">Get Started</span>
            <h2 style={{ fontSize: 'clamp(2.35rem, 4.8vw, 3.5rem)', fontWeight: 800, color: th.heading, marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              Set up your business <br />
              with <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: isDark ? 'var(--color-gold)' : '#0a2540' }}>complete confidence.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: th.body, marginBottom: '2.5rem', maxWidth: '48ch', margin: '0 auto 2.5rem', lineHeight: '1.65' }}>
              Talk to our qualified professionals. We handle company registrations and government licences across all 28 states and 8 Union Territories.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className={isDark ? "btn-gold" : ""} style={{ 
                padding: '0.875rem 2rem', 
                fontSize: '0.9375rem',
                backgroundColor: isDark ? undefined : '#0a2540',
                color: isDark ? undefined : '#ffffff',
                borderRadius: '100px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: isDark ? '0 0 25px rgba(223, 186, 115, 0.35), 0 8px 24px -6px rgba(223, 186, 115, 0.5)' : '0 0 25px rgba(10, 37, 64, 0.35), 0 8px 20px -6px rgba(10, 37, 64, 0.5)'
              }}>
                Get a Consultation <ArrowRight size={15} />
              </Link>
              <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" className={isDark ? "btn-ghost" : ""} style={{ 
                padding: '0.875rem 1.75rem', 
                fontSize: '0.9375rem',
                backgroundColor: isDark ? undefined : '#eef2ff',
                color: isDark ? undefined : '#0a2540',
                borderRadius: '100px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                border: isDark ? undefined : '1px solid #c7d2fe'
              }}>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      );
    })()}

    </div>
  );
}
