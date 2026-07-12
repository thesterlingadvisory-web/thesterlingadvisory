import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWidget from '../ui/ChatWidget';

const megaMenuCategories = [
  {
    id: 'incorporation',
    title: 'Entity Incorporation & Structuring',
    shortTitle: 'Incorporation & Setups',
    desc: 'Foundational entity setup and legal architecture for high-growth ventures and enterprises across India.',
    items: [
      { label: 'Private Limited Company (Pvt Ltd)', href: '/services/pvt-ltd-incorporation', badge: 'Popular' },
      { label: 'Limited Liability Partnership (LLP)', href: '/services/llp-registration' },
      { label: 'One Person Company (OPC)', href: '/services/opc-registration' },
      { label: 'Public Limited Incorporation', href: '/services?category=business-registrations' },
      { label: 'Section 8 NGO / Foundation Setup', href: '/services?category=business-registrations' },
      { label: 'Sole Proprietorship Formation', href: '/services/proprietorship-formation' },
      { label: 'Indian Subsidiary for Foreign Co.', href: '/services?category=business-registrations' },
    ]
  },
  {
    id: 'tax-gst',
    title: 'Taxation, GST & Corporate Advisory',
    shortTitle: 'Taxation & GST Advisory',
    desc: 'Direct & Indirect tax structuring, regulatory representation, and compliance assurance managed by Senior Corporate Advisors.',
    items: [
      { label: 'GST Registration & Structuring', href: '/services/gst-registration', badge: 'Pan-India' },
      { label: 'Corporate Income Tax & TDS Advisory', href: '/services?category=tax-registrations' },
      { label: 'International Taxation & Transfer Pricing', href: '/services?category=tax-registrations' },
      { label: 'Tax Audit & Statutory Representation', href: '/services?category=tax-registrations' },
      { label: 'GST Monthly Filings & Reconciliation', href: '/services?category=tax-registrations' },
      { label: 'PF & ESIC Statutory Enrolment', href: '/services?category=tax-registrations' },
    ]
  },
  {
    id: 'secretarial-ip',
    title: 'Secretarial Compliance & IP Protection',
    shortTitle: 'Secretarial & IP Practice',
    desc: 'MCA annual returns, board governance, and robust trademark & copyright protection by Senior Corporate Counsel.',
    items: [
      { label: 'Trademark Registration & Opposition', href: '/services/trademark-registration', badge: 'Priority' },
      { label: 'Annual MCA Return & Secretarial Audit', href: '/services/mca-compliance' },
      { label: 'Copyright & Design Patent Protection', href: '/services?category=intellectual-property' },
      { label: 'FEMA & RBI Regulatory Filings', href: '/services?category=business-registrations' },
      { label: 'Director KYC & DSC Issuance', href: '/services?category=business-registrations' },
      { label: 'Corporate Restructuring & M&A Support', href: '/services?category=business-registrations' },
    ]
  },
  {
    id: 'licensing',
    title: 'Industry Licenses & Certifications',
    shortTitle: 'Licenses & Registrations',
    desc: 'Sector-specific statutory clearances required for seamless and verified operational compliance.',
    items: [
      { label: 'FSSAI Central & State Food Licensing', href: '/services/fssai-license', badge: 'Mandatory' },
      { label: 'Startup India (DPIIT) Recognition', href: '/services/startup-india-dpiit', badge: 'Tax Holiday' },
      { label: 'MSME / Udyam Registration', href: '/services?category=msme-govt' },
      { label: 'Import Export Code (IEC)', href: '/services?category=msme-govt' },
      { label: 'ISO 9001 / 27001 Quality Certifications', href: '/services?category=industry-specific' },
      { label: 'Shop & Establishment Act Registration', href: '/services?category=labour-law' },
    ]
  }
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState(0);
  const [openFooterAccordion, setOpenFooterAccordion] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Temporarily disable smooth scrolling for instant route transition
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);
    
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col font-body" style={{ background: 'var(--color-primary)' }}>

      {/* ── HEADER (Priority 8: Agency-Grade Stripe / Mercury / Notion Navigation) ── */}
      <header
        className="glass-navbar"
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: isScrolled ? 'rgba(3, 6, 12, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
          boxShadow: 'none',
          transition: 'all 300ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: isScrolled ? '64px' : '76px',
            transition: 'height 200ms ease',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src="/logo.png" 
              alt="Sterling Advisory Logo" 
              style={{
                width: '42px', 
                height: '42px', 
                objectFit: 'cover',
                borderRadius: '8px',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            />
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.18rem',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>Sterling Advisory</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
            {/* Services Dropdown (Deloitte / Big 4 Grade Full-Width Mega-Menu) */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.5rem 0',
                fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0',
                color: (isActive('/services') || isServicesOpen) ? '#ffffff' : 'rgba(255,255,255,0.65)',
                background: 'transparent',
                border: 'none', cursor: 'pointer',
                transition: 'color 200ms ease',
              }}
              >
                Services <ChevronDown size={14} style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease', color: 'rgba(255,255,255,0.4)' }} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    style={{
                      position: 'fixed',
                      top: isScrolled ? '64px' : '76px',
                      left: 0,
                      right: 0,
                      width: '100vw',
                      background: 'rgba(9, 15, 29, 0.96)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                      borderBottom: '1px solid rgba(223, 186, 115, 0.35)',
                      boxShadow: '0 24px 64px rgba(0, 0, 0, 0.65)',
                      zIndex: 999,
                      padding: '2.5rem 0',
                    }}
                  >
                    <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '3rem', alignItems: 'start' }}>
                        
                        {/* Column 1: Mega Sidebar Categories (Exact to Deloitte tabs) */}
                        <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Practice Pillars
                          </span>
                          {megaMenuCategories.map((cat, idx) => {
                            const isTabActive = activeMegaTab === idx;
                            return (
                              <button
                                key={cat.id}
                                onMouseEnter={() => setActiveMegaTab(idx)}
                                onClick={() => setActiveMegaTab(idx)}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '0.8rem 1rem',
                                  background: isTabActive ? 'rgba(223, 186, 115, 0.12)' : 'transparent',
                                  borderLeft: isTabActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                                  color: isTabActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                                  fontWeight: isTabActive ? 700 : 500,
                                  fontSize: '0.88rem',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                                  transition: 'all 150ms ease'
                                }}
                              >
                                <span>{cat.shortTitle}</span>
                                <span style={{ color: isTabActive ? 'var(--color-gold)' : 'rgba(255,255,255,0.25)', fontWeight: 700 }}>›</span>
                              </button>
                            );
                          })}
                          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <Link
                              to="/services"
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-gold)',
                                fontSize: '0.82rem', fontWeight: 600,
                                textDecoration: 'none'
                              }}
                            >
                              <span>Explore All Practice Areas</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: Active Category Practice Pillars Grid */}
                        <div>
                          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0, marginBottom: '4px' }}>
                              {megaMenuCategories[activeMegaTab].title}
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                              {megaMenuCategories[activeMegaTab].desc}
                            </p>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem 2rem' }}>
                            {megaMenuCategories[activeMegaTab].items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                to={item.href}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '0.68rem 0.9rem',
                                  borderRadius: 'var(--radius-md)',
                                  color: '#ffffff',
                                  fontSize: '0.88rem', fontWeight: 500,
                                  textDecoration: 'none',
                                  background: 'rgba(255,255,255,0.02)',
                                  border: '1px solid rgba(255,255,255,0.05)',
                                  transition: 'all 160ms ease',
                                  gap: '12px'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = 'rgba(223, 186, 115, 0.09)';
                                  e.currentTarget.style.borderColor = 'rgba(223, 186, 115, 0.35)';
                                  e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                }}
                              >
                                <span style={{ paddingRight: '4px', lineHeight: '1.3' }}>{item.label}</span>
                                {item.badge && (
                                  <span style={{
                                    fontSize: '0.68rem', fontWeight: 750,
                                    color: item.badge === 'Mandatory' ? '#0D1527' : 'var(--color-gold)',
                                    background: item.badge === 'Mandatory' ? 'var(--color-gold)' : 'rgba(223, 186, 115, 0.16)',
                                    border: item.badge === 'Mandatory' ? '1px solid var(--color-gold)' : '1px solid rgba(223, 186, 115, 0.45)',
                                    padding: '3px 9px',
                                    borderRadius: '99px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    boxShadow: item.badge === 'Mandatory' ? '0 0 10px rgba(223, 186, 115, 0.35)' : 'none'
                                  }}>
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured Institutional Advisory Box (Exact to Deloitte right showcase) */}
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(223, 186, 115, 0.14) 0%, rgba(13, 21, 39, 0.95) 100%)',
                          border: '1px solid rgba(223, 186, 115, 0.38)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.5rem',
                          boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
                          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                          minHeight: '260px'
                        }}>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>
                              Executive Advisory Hub
                            </span>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', lineHeight: '1.3', margin: '0 0 0.75rem 0' }}>
                              PAN-India Senior Institutional Advisory & Representation
                            </h4>
                            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.68)', lineHeight: '1.5', margin: 0 }}>
                              Strategic entity structures, statutory compliance, and multi-state tax planning across all 28 States & 8 Union Territories.
                            </p>
                          </div>

                          <Link
                            to="/contact"
                            className="btn-gold"
                            style={{
                              marginTop: '1.5rem',
                              padding: '0.75rem 1rem',
                              fontSize: '0.82rem',
                              textAlign: 'center',
                              display: 'block',
                              fontWeight: 700,
                              textDecoration: 'none',
                              borderRadius: 'var(--radius-md)'
                            }}
                          >
                            Schedule Senior Consultation ↗
                          </Link>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: 'Industries', href: '/industries' },
              { label: 'Insights & Guides', href: '/insights' },
              { label: 'About Us', href: '/about' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  display: 'block',
                  padding: '0.5rem 0',
                  fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0',
                  color: isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  background: 'transparent',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.65)'; }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="hidden md:flex items-center" style={{ gap: '0.85rem' }}>
              <button
                onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0.55rem 1rem',
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, rgba(223, 186, 115, 0.15) 0%, rgba(223, 186, 115, 0.03) 100%)',
                  border: '1px solid rgba(223, 186, 115, 0.3)',
                  borderRadius: '99px',
                  cursor: 'pointer',
                  transition: 'all 250ms ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(223, 186, 115, 0.25) 0%, rgba(223, 186, 115, 0.08) 100%)'; 
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(223, 186, 115, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(223, 186, 115, 0.15) 0%, rgba(223, 186, 115, 0.03) 100%)'; 
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'; 
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
                <span>Ask AI</span>
              </button>
              
              <Link
                to="/contact"
                style={{
                  padding: '0.55rem 1.1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-navy)',
                  backgroundColor: '#ffffff',
                  borderRadius: '99px',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                  boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f1f3f5'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Talk to an Expert
              </Link>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '0.5rem',
                color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer',
                zIndex: 50,
              }}
              className="md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'var(--color-navy)',
              display: 'flex', flexDirection: 'column',
              padding: 'clamp(4rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem) 2rem',
            }}
            className="md:hidden"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: 'auto' }}>
              {[
                { label: 'Services', href: '/services' },
                { label: 'Industries We Serve', href: '/industries' },
                { label: 'Insights & Guides', href: '/insights' },
                { label: 'About Us', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{
                    display: 'block',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: '2rem' }}>
              <Link to="/contact" className="btn-gold" style={{ width: '100%', padding: '0.875rem' }}>
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* ── FOOTER (Priority 2 & 4: Human-crafted copywriting & 8pt spatial grid) ── */}
      <footer style={{ background: 'var(--color-navy)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: 'clamp(3rem, 10vw, 5rem) clamp(1rem, 5vw, 2rem) 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3.5rem', marginBottom: '4.5rem' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '28px', height: '28px',
                  backgroundColor: 'var(--color-gold)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: 'var(--color-navy)',
                  fontFamily: 'var(--font-body)',
                }}>S</div>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Sterling <span style={{ color: 'var(--color-gold)' }}>Advisory</span>
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: '1.6', maxWidth: '280px' }}>
                Professional Senior Advisory & Legal counsel tailored for scaling Indian businesses. Reliable corporate compliance handled smoothly with zero paperwork hassle.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                {['LinkedIn', 'Twitter'].map(s => (
                  <a key={s} href="#" style={{
                    padding: '0.4rem 0.75rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 500,
                    transition: 'border-color 160ms ease, color 160ms ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  >{s}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="md:hidden flex justify-between items-center cursor-pointer mb-3" onClick={() => setOpenFooterAccordion(openFooterAccordion === 'services' ? null : 'services')}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, margin: 0 }}>
                  Our Services
                </h4>
                <ChevronDown size={16} style={{ color: 'var(--color-gold)', transform: openFooterAccordion === 'services' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }} />
              </div>
              <h4 className="hidden md:block" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
                Our Services
              </h4>
              <ul className={`md:flex ${openFooterAccordion === 'services' ? 'flex' : 'hidden'}`} style={{ listStyle: 'none', padding: 0, margin: 0, flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { label: 'Company & Business Setup', href: '/services?category=business-registrations' },
                  { label: 'GST & Tax Compliance', href: '/services?category=tax-registrations' },
                  { label: 'Trademark & IP Protection', href: '/services?category=intellectual-property' },
                  { label: 'Labour & Employment Law', href: '/services?category=labour-law' },
                  { label: 'Startup & DPIIT Recognition', href: '/services?category=msme-govt' },
                  { label: 'Industry & Trade Licensing', href: '/services?category=industry-specific' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', transition: 'color 150ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Services */}
            <div>
              <div className="md:hidden flex justify-between items-center cursor-pointer mb-3 mt-2" onClick={() => setOpenFooterAccordion(openFooterAccordion === 'popular' ? null : 'popular')}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, margin: 0 }}>
                  Popular Services
                </h4>
                <ChevronDown size={16} style={{ color: 'var(--color-gold)', transform: openFooterAccordion === 'popular' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }} />
              </div>
              <h4 className="hidden md:block" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
                Popular Services
              </h4>
              <ul className={`md:flex ${openFooterAccordion === 'popular' ? 'flex' : 'hidden'}`} style={{ listStyle: 'none', padding: 0, margin: 0, flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { label: 'Private Limited Incorporation', href: '/services/private-limited-company' },
                  { label: 'Multi-State GST Filings', href: '/services/gst-registration' },
                  { label: 'Brand & Trademark Filing', href: '/services/trademark-registration' },
                  { label: 'Limited Liability Partnership', href: '/services/llp-registration' },
                  { label: 'FSSAI Food Licensing', href: '/services/fssai-licence' },
                  { label: 'Annual ROC Compliance', href: '/services/annual-compliance' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', transition: 'color 150ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="md:hidden flex justify-between items-center cursor-pointer mb-3 mt-2" onClick={() => setOpenFooterAccordion(openFooterAccordion === 'company' ? null : 'company')}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, margin: 0 }}>
                  Company
                </h4>
                <ChevronDown size={16} style={{ color: 'var(--color-gold)', transform: openFooterAccordion === 'company' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }} />
              </div>
              <h4 className="hidden md:block" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
                Company
              </h4>
              <ul className={`md:flex ${openFooterAccordion === 'company' ? 'flex' : 'hidden'}`} style={{ listStyle: 'none', padding: 0, margin: 0, flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { label: 'About Our Firm', href: '/about' },
                  { label: 'Insights & Guides', href: '/insights' },
                  { label: 'Industries We Serve', href: '/industries' },
                  { label: 'Contact & Support', href: '/contact' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', transition: 'color 150ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', lineHeight: '1.7', fontFamily: 'var(--font-mono)' }}>
                  thesterlingadvisory@gmail.com<br />
                  +91 8448803143<br />
                  Serving Businesses Across All India
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
              © {new Date().getFullYear()} Sterling Advisory. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(t => (
                <Link key={t} to="#" style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', transition: 'color 150ms ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}
                >{t}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Premium Stacked WhatsApp Icon */}
      <a
        href="https://wa.me/918448803143?text=Hi%2C%20I'd%20like%20to%20consult%20with%20your%20advisory%20team."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct Counsel via WhatsApp"
        style={{
          position: 'fixed', bottom: '6.85rem', right: '2.15rem', zIndex: 890,
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: '#128C7E',
          color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(18, 140, 126, 0.35)',
          border: '2px solid rgba(255,255,255,0.15)',
          transition: 'all 200ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#075E54'; e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(18, 140, 126, 0.45)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#128C7E'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 140, 126, 0.35)'; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </a>

      <ChatWidget />
    </div>
  );
}
