import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Building2, Calculator, ShieldCheck, Scale,
  ChevronDown, User, Users, Heart, ShoppingCart, Briefcase,
  FileCheck, Send, Store, CheckCircle, Phone,
  TrendingUp, Award, Globe, MessageCircle, Factory, Cpu
} from 'lucide-react';

/* ── Animation Variants ── */
const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

/* ── Finder Data ── */
const finderOptions = [
  { id: 'solo', label: 'Solo founder / freelancer', icon: User, results: [
    { name: 'Proprietorship Setup', link: '/services/proprietorship-setup' },
    { name: 'Udyam / MSME Registration', link: '/services/udyam-registration' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
  { id: 'cofounders', label: '2+ co-founders', icon: Users, results: [
    { name: 'Private Limited Company', link: '/services/private-limited-company' },
    { name: 'LLP Registration', link: '/services/llp-registration' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
  { id: 'ngo', label: 'NGO / Trust / Society', icon: Heart, results: [
    { name: 'Section 8 Company', link: '/services/section-8-company' },
    { name: 'Trust Registration', link: '/services/trust-registration' },
    { name: 'Society Registration', link: '/services/society-registration' },
  ]},
  { id: 'ecommerce', label: 'E-commerce seller', icon: ShoppingCart, results: [
    { name: 'GST Registration', link: '/services/gst-registration' },
    { name: 'Trademark Registration', link: '/services/trademark-registration' },
    { name: 'Private Limited Company', link: '/services/private-limited-company' },
  ]},
  { id: 'existing', label: 'Existing business / compliance', icon: Briefcase, results: [
    { name: 'GST Registration', link: '/services/gst-registration' },
    { name: 'Professional Tax', link: '/services/professional-tax' },
    { name: 'FSSAI Licence', link: '/services/fssai-licence' },
  ]},
  { id: 'retail', label: 'Retail / Physical Store', icon: Store, results: [
    { name: 'Shops & Establishments', link: '/services/shops-establishments' },
    { name: 'FSSAI Licence', link: '/services/fssai-licence' },
    { name: 'Trade Licence', link: '/services/trade-licence' },
  ]},
  { id: 'manufacturing', label: 'Manufacturing / Factory', icon: Factory, results: [
    { name: 'Factory Licence', link: '/services/factory-licence' },
    { name: 'Udyam / MSME Registration', link: '/services/udyam-registration' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
  { id: 'tech', label: 'Tech Startup / IT Agency', icon: Cpu, results: [
    { name: 'Private Limited Company', link: '/services/private-limited-company' },
    { name: 'Trademark Registration', link: '/services/trademark-registration' },
    { name: 'Shops & Establishments', link: '/services/shops-establishments' },
  ]},
];

/* ── FAQ Data ── */
const faqData = [
  { q: 'How long does company registration typically take?', a: 'Most registrations are completed within 7–14 business days, depending on the type of entity and government processing timelines. We handle all follow-ups with the authorities so you can focus on your business.' },
  { q: 'Do I need to visit your office in person?', a: 'No. Our entire process is designed to work remotely. Documents can be submitted digitally, consultations happen over video call or phone, and certificates are delivered electronically.' },
  { q: 'What documents do I need to get started?', a: 'The exact list varies by registration type, but generally you will need identity proof (PAN/Aadhaar), address proof, and a passport-sized photograph. We provide a complete checklist during the initial consultation.' },
  { q: 'Can you help with businesses outside your local state?', a: 'Yes. We serve clients across all Indian states and union territories. Most government filings are handled through centralized online portals, so geography is not a barrier.' },
  { q: 'What happens after my registration is approved?', a: 'You receive all original certificates and documents digitally. We also provide a post-registration compliance brief outlining any recurring filings or obligations your entity must meet.' },
  { q: 'Do you provide ongoing compliance support after registration?', a: 'Absolutely. We offer annual compliance packages covering GST return filing, annual returns, and statutory filings so your business stays fully compliant year-round.' },
];

/* ── Process Steps ── */
const processSteps = [
  { num: '01', title: 'Consultation', desc: 'Understand your business needs and recommend the right structure.', icon: User },
  { num: '02', title: 'Documentation', desc: 'Prepare and vet all required paperwork for submission.', icon: FileCheck },
  { num: '03', title: 'Filing', desc: 'Submit applications to the relevant government authority.', icon: Send },
  { num: '04', title: 'Delivery', desc: 'Receive your certificate or registration, fully compliant.', icon: ShieldCheck },
];

/* ── Featured Services ── */
const featuredServices = [
  { title: 'Private Limited Company', slug: 'private-limited-company', tag: 'Most Popular', icon: Building2, desc: 'Ideal for startups & scalable businesses with limited liability.' },
  { title: 'GST Registration', slug: 'gst-registration', tag: 'Essential', icon: Calculator, desc: 'Mandatory for businesses crossing the threshold turnover.' },
  { title: 'Trademark Registration', slug: 'trademark-registration', tag: 'Brand Protection', icon: ShieldCheck, desc: 'Protect your brand name, logo, or slogan from infringement.' },
  { title: 'LLP Registration', slug: 'llp-registration', tag: 'Flexible', icon: Scale, desc: 'Corporate benefits with flexible management for partners.' },
  { title: 'Udyam Registration', slug: 'udyam-registration', tag: 'Free & Fast', icon: Award, desc: 'Unlock government benefits, tenders, and scheme access.' },
  { title: 'FSSAI Licence', slug: 'fssai-licence', tag: 'Food Business', icon: CheckCircle, desc: 'Mandatory for all food manufacturers, retailers & cloud kitchens.' },
  { title: 'Shops & Establishments', slug: 'shops-establishments', tag: 'Commercial', icon: Store, desc: 'Mandatory municipal registration for commercial offices, shops & retail outlets.' },
  { title: 'EPF & ESIC Registration', slug: 'epf-registration', tag: 'Labour Law', icon: Users, desc: 'Mandatory social security, provident fund & health insurance for employers.' },
];


export default function Home() {
  const [shouldAnimate] = useState(() => !sessionStorage.getItem('hasPlayedIntro'));
  const [finderSelection, setFinderSelection] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div style={{ width: '100%', background: 'var(--color-primary)' }}>

      {/* ═══════════════════════════════════════════
          1. HERO — Dark Navy with Gold Accents
      ═══════════════════════════════════════════ */}
      <section style={{
        minHeight: '92vh',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(223, 186, 115, 0.22), transparent), linear-gradient(180deg, #0F172A 0%, #16223A 60%, #0F172A 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '6rem 0 4rem',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(223,186,115,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(223,186,115,0.05) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

            {/* Left: Copy */}
            <div>
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label" style={{ color: 'var(--color-gold)' }}>
                  ✦ Corporate Registration & Compliance Advisory
                </span>
              </motion.div>

              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: '#ffffff',
                marginBottom: '1.75rem',
                letterSpacing: '-0.02em',
              }}>
                {['Where Indian', 'Businesses Are', 'Built to Last.'].map((line, i) => (
                  <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    <motion.span
                      style={{ display: 'block', color: i === 2 ? 'var(--color-gold)' : '#ffffff' }}
                      initial={shouldAnimate ? { y: '105%', opacity: 0 } : false}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? i * 0.1 + 0.1 : 0 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: shouldAnimate ? 0.55 : 0 }}
                style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '520px' }}
              >
                Comprehensive entity registration, tax advisory, IP protection, and labour law compliance — tailored for modern Indian enterprises.
              </motion.p>

              <motion.div
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldAnimate ? 0.7 : 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
              >
                <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(223,186,115,0.4)' }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex' }}>
                  <Link to="/contact" className="btn-gold" style={{ gap: '8px' }}>
                    Book Free Consultation <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                  <Link to="/services" className="btn-ghost" style={{ gap: '8px' }}>
                    Explore Services
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldAnimate ? 0.9 : 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}
              >
                {['PAN India Service', '100% Online Process', 'MCA Registered'].map(badge => (
                  <span key={badge} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.45)',
                  }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '10px' }}>●</span> {badge}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Scattered floating cards */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: shouldAnimate ? 0.4 : 0 }}
              className="hidden lg:block"
              style={{ position: 'relative', width: '100%', height: '520px' }}
            >
              {/* LLP top-left */}
              <div className="hero-card float-4" style={{
                top: '4%', left: '0%', width: '155px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1.125rem 1.25rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              }}>
                <Users size={15} color="rgba(223,186,115,0.8)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>LLP</div>
                <div style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Flexible<br/>Partnership</div>
              </div>

              {/* GST top-right */}
              <div className="hero-card float-2" style={{
                top: '6%', right: '0%', width: '158px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(223,186,115,0.22)',
                padding: '1.125rem 1.25rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              }}>
                <div style={{ fontSize: '0.52rem', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>GST Reg.</div>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: 600, lineHeight: 1 }}>₹0</div>
                <div style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Govt. Fee</div>
              </div>

              {/* Private Limited — dead center via marginLeft */}
              <div className="hero-card float-1" style={{
                top: '37%', left: '50%', marginLeft: '-120px', width: '240px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(223,186,115,0.4)',
                borderTop: '2px solid var(--color-gold)',
                padding: '1.375rem 1.625rem',
                boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                zIndex: 3,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={16} color="#05080F" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Private Limited Co.</div>
                      <div style={{ fontSize: '0.54rem', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>MOST POPULAR</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--color-gold)', border: '1px solid rgba(223,186,115,0.3)', padding: '2px 8px', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>10–15 Days</span>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(223,186,115,0.3), transparent)', marginBottom: '0.75rem' }} />
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['FDI Ready', 'Ltd. Liability', 'Scalable'].map(t => (
                    <span key={t} style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.48)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: 'var(--color-gold)', fontSize: '7px' }}>✓</span>{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trademark bottom-left */}
              <div className="hero-card float-3" style={{
                bottom: '4%', left: '2%', width: '162px',
                background: 'linear-gradient(135deg, rgba(223,186,115,0.1) 0%, rgba(223,186,115,0.03) 100%)',
                border: '1px solid rgba(223,186,115,0.25)',
                padding: '1.125rem 1.25rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}>
                <ShieldCheck size={15} color="var(--color-gold)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>Trademark</div>
                <div style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.42)' }}>Brand Protection</div>
              </div>

              {/* FSSAI bottom-right */}
              <div className="hero-card float-5" style={{
                bottom: '6%', right: '2%', width: '152px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(223,186,115,0.1)',
                padding: '1.125rem 1.25rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}>
                <FileCheck size={15} color="rgba(223,186,115,0.8)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>FSSAI</div>
                <div style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.4)' }}>Food Business</div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} color="rgba(255,255,255,0.25)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. VALUE SIGNALS BAR
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-navy)', borderBottom: '1px solid rgba(223,186,115,0.12)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', borderLeft: '1px solid rgba(223,186,115,0.12)' }}>
            {[
              { icon: Globe, label: 'PAN India Service', desc: 'All states & UTs covered' },
              { icon: CheckCircle, label: '100% Online', desc: 'No office visit required' },
              { icon: Award, label: 'Qualified Experts', desc: 'CAs, CSs & Legal professionals' },
              { icon: TrendingUp, label: 'Transparent Pricing', desc: 'Fixed quotes, no hidden charges' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ borderRight: '1px solid rgba(223,186,115,0.12)', padding: '1.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Icon size={20} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FIND YOUR REGISTRATION
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'var(--color-secondary)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="section-label">Quick Start</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: 'var(--color-navy)' }}>
              Find Your Registration
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto' }}>
              Tell us about your business — we'll recommend the right registrations to get you started.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!finderSelection ? (
              <motion.div
                key="finder-options"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}
              >
                {finderOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setFinderSelection(opt)}
                      className="card-premium"
                      style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', background: 'var(--color-secondary)', textAlign: 'left', border: '1px solid var(--color-border-main)', width: '100%' }}
                    >
                      <div style={{
                        width: '44px', height: '44px', flexShrink: 0,
                        background: 'rgba(10,22,40,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 200ms ease',
                      }}>
                        <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-navy)' }} />
                      </div>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-navy)' }}>{opt.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="finder-results"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                style={{ maxWidth: '560px', margin: '0 auto' }}
              >
                <div style={{
                  background: 'var(--color-secondary)',
                  border: '1px solid var(--color-border-main)',
                  boxShadow: '0 20px 60px rgba(10,22,40,0.08)',
                }}>
                  <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border-main)', background: 'var(--color-navy)' }}>
                    <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>Recommended for</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff' }}>{finderSelection.label}</p>
                  </div>
                  <div>
                    {finderSelection.results.map((r, i) => (
                      <Link
                        key={i}
                        to={r.link}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1.25rem 2rem',
                          borderBottom: i < finderSelection.results.length - 1 ? '1px solid var(--color-border-main)' : 'none',
                          transition: 'all 200ms ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(223,186,115,0.08)'; e.currentTarget.style.paddingLeft = '2.25rem'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '2rem'; }}
                      >
                        <span style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{r.name}</span>
                        <ArrowRight size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                  <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid var(--color-border-main)' }}>
                    <button
                      onClick={() => setFinderSelection(null)}
                      style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}
                    >
                      ← Choose a different option
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. FEATURED SERVICES
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'var(--color-primary)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div>
              <span className="section-label">Our Services</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-navy)' }}>
                Most Requested Services
              </h2>
            </div>
            <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              className="link-underline pb-1"
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}
          >
            {featuredServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={i} variants={FADE_UP} style={{ display: 'flex', height: '100%' }}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="card-premium"
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '2rem', background: 'var(--color-secondary)' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(10,22,40,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--color-navy)' }} />
                        </div>
                        <span style={{
                          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em',
                          textTransform: 'uppercase', color: 'var(--color-gold)',
                          border: '1px solid rgba(223,186,115,0.35)',
                          padding: '0.25rem 0.625rem',
                        }}>{service.tag}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1875rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.625rem' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.5rem', flexGrow: 1 }}>
                        {service.desc}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Learn More <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. WHY CHOOSE US
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'linear-gradient(135deg, #131E36 0%, #213254 100%)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(223, 186, 115, 0.15) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label" style={{ color: '#F2D59A' }}>Why Sterling Advisory</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#ffffff', marginBottom: '1.5rem' }}>
                Compliance Without the Complexity
              </h2>
              <p style={{ color: '#E2E8F0', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.8' }}>
                We make the complicated world of Indian business compliance simple, transparent, and stress-free. From your first registration to annual compliance — we're your permanent advisory partner.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Globe, title: 'PAN India Coverage', desc: 'We serve businesses across all 28 states and 8 UTs.' },
                  { icon: CheckCircle, title: '100% Online Process', desc: 'No office visits needed. Everything handled digitally.' },
                  { icon: Award, title: 'Expert Advisory Team', desc: 'Qualified CAs, CSs and legal professionals on your case.' },
                  { icon: TrendingUp, title: 'Transparent Pricing', desc: 'No hidden charges. Fixed quotes before we begin.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                    >
                      <div style={{ width: '36px', height: '36px', background: 'rgba(223,186,115,0.25)', border: '1px solid #DFBA73', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', flexShrink: 0, marginTop: '2px' }}>
                        <Icon size={17} style={{ color: '#F2D59A' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/contact" className="btn-gold" style={{ boxShadow: '0 8px 24px rgba(223, 186, 115, 0.3)' }}>
                  Start Your Registration <ArrowRight size={15} style={{ marginLeft: '8px' }} />
                </Link>
              </div>
            </motion.div>

            {/* Right: Honest engagement panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* What happens on your call */}
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(223, 186, 115, 0.35)', borderRadius: '14px', padding: '2rem', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2D59A', fontWeight: 700, marginBottom: '1rem' }}>On Your Free Call</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {[
                    'We understand your business model and goals',
                    'Recommend the right registration(s) for your situation',
                    'Walk you through required documents and timelines',
                    'Provide a transparent, fixed fee quote — no surprises',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#F2D59A', fontWeight: 800, fontSize: '0.85rem', marginTop: '1px', flexShrink: 0 }}>0{i + 1}</span>
                      <span style={{ fontSize: '0.9375rem', color: '#ffffff', lineHeight: '1.6', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct contact options */}
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '14px', padding: '1.75rem', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2D59A', fontWeight: 700, marginBottom: '1.25rem' }}>Reach Us Directly</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', transition: 'color 200ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    <CheckCircle size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    Fill our contact form — we reply within 24 hrs
                  </a>
                  <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', transition: 'color 200ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    <MessageCircle size={15} style={{ color: '#25D366', flexShrink: 0 }} />
                    WhatsApp us for a quick query
                  </a>
                  <a href="tel:+918448803143"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', transition: 'color 200ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    <Phone size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    Call us: +91 8448803143
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'var(--color-primary)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span className="section-label">Our Process</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-navy)' }}>
              Simple. Seamless. Certain.
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Connecting line (desktop) */}
            <div style={{
              position: 'absolute', top: '2rem', left: '12.5%', right: '12.5%', height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--color-gold), var(--color-gold), transparent)',
              opacity: 0.3,
            }} className="hidden md:block" />

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}
            >
              {processSteps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <motion.div key={step.num} variants={FADE_UP} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                      width: '64px', height: '64px',
                      background: 'var(--color-navy)',
                      border: '1px solid rgba(223,186,115,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.25rem', position: 'relative',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    }}>
                      <StepIcon size={24} strokeWidth={1.5} style={{ color: 'var(--color-gold)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', marginBottom: '0.625rem', letterSpacing: '0.15em' }}>{step.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.625rem' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', maxWidth: '200px' }}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. CTA BANNER
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '7rem 0',
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #0C1426 50%, var(--color-navy-mid) 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(223,186,115,0.1) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(223,186,115,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <span className="section-label" style={{ color: 'var(--color-gold)' }}>Get Started Today</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: '#ffffff', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Ready to Register Your <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Business?</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Connect with our advisory team for a free consultation. We'll guide you to the right structure and handle everything from start to finish.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">
              Book Free Consultation <ArrowRight size={15} style={{ marginLeft: '8px' }} />
            </Link>
            <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'var(--color-secondary)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="section-label">Common Questions</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-navy)' }}>
              Frequently Asked
            </h2>
          </motion.div>

          <div style={{ borderTop: '1px solid var(--color-border-main)' }}>
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{ borderBottom: '1px solid var(--color-border-main)' }}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.5rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.9375rem', paddingRight: '2rem', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                  <div style={{
                    width: '28px', height: '28px', flexShrink: 0,
                    border: '1px solid var(--color-border-main)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 200ms ease',
                    background: openFaqIndex === i ? 'var(--color-navy)' : 'transparent',
                  }}>
                    <ChevronDown size={15} style={{ color: openFaqIndex === i ? 'var(--color-gold)' : 'var(--color-text-muted)', transform: openFaqIndex === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 300ms ease' }} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ paddingBottom: '1.5rem', fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: '1.75' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. INSIGHTS TEASER
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'var(--color-primary)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="section-label">Knowledge Hub</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-navy)' }}>
              Latest Insights
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
          >
            {[
              { title: 'Private Limited vs. LLP: Which Suits Your Startup?', excerpt: 'A practical comparison of liability, taxation, and compliance for early-stage founders.', tag: 'Business Setup' },
              { title: 'GST Registration: Who Needs It and When', excerpt: 'Threshold limits, voluntary registration benefits, and common mistakes to avoid.', tag: 'Tax & Compliance' },
              { title: 'Protecting Your Brand: A Guide to Trademark Filing in India', excerpt: 'The step-by-step process, timelines, and why you should file before scaling.', tag: 'Intellectual Property' },
            ].map((post, i) => (
              <motion.div key={i} variants={FADE_UP} style={{ display: 'flex', height: '100%' }}>
                <Link to="/insights" className="card-premium" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '2rem', background: 'var(--color-secondary)' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', display: 'block' }}>{post.tag}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.65', flexGrow: 1 }}>{post.excerpt}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Read More <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/insights" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="link-underline pb-1">
              View All Insights <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
