import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWidget from '../ui/ChatWidget';
import { useTheme } from '../../utils/ThemeContext';

const megaMenuCategories = [
  {
    id: 'incorporation',
    title: 'Business Establishment',
    shortTitle: 'Business Establishment',
    desc: 'Foundational entity setup and legal architecture for high-growth ventures and enterprises across India.',
    items: [
      { label: 'Private Limited Company (Pvt Ltd)', href: '/services/private-limited-company', badge: 'Popular' },
      { label: 'Limited Liability Partnership (LLP)', href: '/services/llp-registration' },
      { label: 'One Person Company (OPC)', href: '/services/opc-registration' },
      { label: 'Section 8 NGO / Foundation Setup', href: '/services/section-8-company' },
      { label: 'Partnership Firm Registration', href: '/services/partnership-firm-registration' },
      { label: 'Sole Proprietorship Formation', href: '/services/proprietorship-setup' },
      { label: 'Trust Deed Registration', href: '/services/trust-registration' },
    ]
  },
  {
    id: 'tax-gst',
    title: 'Tax & Govt Registrations',
    shortTitle: 'Tax & Govt Registrations',
    desc: 'GST, professional tax, and all tax-related registrations handled by qualified professionals.',
    items: [
      { label: 'GST Registration & Structuring', href: '/services/gst-registration', badge: 'Pan-India' },
      { label: 'GST Amendment & Transfer', href: '/services/gst-amendment' },
      { label: 'PAN, TAN & TDS Services', href: '/services/pan-tan-tds-services' },
      { label: 'Professional Tax Enrolment', href: '/services/professional-tax' },
      { label: 'EPF Registration & Governance', href: '/services/epf-registration' },
    ]
  },
  {
    id: 'secretarial-ip',
    title: 'Trademark & IP',
    shortTitle: 'Trademark & IP',
    desc: 'MCA annual returns, board governance, and robust trademark & copyright protection by Senior Corporate Counsel.',
    items: [
      { label: 'Trademark Filing & Prosecution', href: '/services/trademark-registration', badge: 'Priority' },
      { label: 'Copyright Registration', href: '/services/copyright-registration' },
      { label: 'Industrial Design Protection', href: '/services/design-registration' },
      { label: 'Patent Drafting & Prosecution', href: '/services/patent-filing' },
      { label: 'Class 3 Digital Signature (DSC)', href: '/services/dsc-registration' },
      { label: 'Director Identification Number (DIN)', href: '/services/din-registration' },
    ]
  },
  {
    id: 'licensing',
    title: 'Trade Licensing',
    shortTitle: 'Trade Licensing',
    desc: 'Sector-specific statutory clearances required for seamless and verified operational compliance.',
    items: [
      { label: 'FSSAI Food Safety Licensing', href: '/services/fssai-licence', badge: 'Mandatory' },
      { label: 'Startup India (DPIIT) Recognition', href: '/services/startup-india-recognition', badge: 'Tax Holiday' },
      { label: 'Udyam (MSME) Enrolment', href: '/services/udyam-registration' },
      { label: 'Import Export Code (IEC)', href: '/services/iec-registration' },
      { label: 'Municipal Trade License', href: '/services/trade-licence' },
      { label: 'Shops & Establishments License', href: '/services/shops-establishments' },
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
  const { theme, toggle } = useTheme();
  const uiTheme = 'dark'; // Forced dark for layout

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
    <div className="min-h-screen flex flex-col font-body" style={{ background: 'hsl(var(--background))' }}>

      {/* ── HEADER (Priority 8: Agency-Grade Stripe / Mercury / Notion Navigation) ── */}
      <header
        className={isScrolled ? 'glass-navbar' : ''}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          background: isScrolled ? 'rgba(11, 23, 42, 0.95)' : '#07101F',
          borderBottom: isScrolled ? undefined : '1px solid hsl(var(--border))',
          boxShadow: isScrolled ? undefined : 'none',
          transition: 'all 300ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '88rem',
            margin: '0 auto',
            padding: '0 clamp(1rem, 5vw, 2rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: isScrolled ? '64px' : '80px',
            transition: 'height 300ms ease',
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
              color: uiTheme === 'dark' ? '#ffffff' : 'hsl(var(--primary))',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>Sterling Advisory</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ gap: '2rem' }} className="hidden md:flex items-center">
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
                color: uiTheme === 'dark'
                  ? ((isActive('/services') || isServicesOpen) ? '#ffffff' : 'rgba(255,255,255,0.65)')
                  : ((isActive('/services') || isServicesOpen) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'),
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
                      top: isScrolled ? '68px' : '80px',
                      left: 0,
                      right: 0,
                      width: '100vw',
                      background: uiTheme === 'dark' ? 'rgba(9,15,29,0.97)' : 'hsl(var(--background)/0.97)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                      borderBottom: uiTheme === 'dark' ? '1px solid rgba(197,168,128,0.25)' : '1px solid hsl(var(--border))',
                      boxShadow: uiTheme === 'dark' ? '0 24px 64px rgba(0,0,0,0.65)' : '0 24px 64px rgba(0,0,0,0.08)',
                      zIndex: 999,
                      padding: '2.5rem 0',
                      transition: 'top 300ms ease',
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
                  color: uiTheme === 'dark'
                    ? (isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.65)')
                    : (isActive(item.href) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'),
                  background: 'transparent',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = uiTheme === 'dark' ? '#ffffff' : 'hsl(var(--primary))'; }}
                onMouseLeave={e => { e.currentTarget.style.color = uiTheme === 'dark' ? (isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.65)') : (isActive(item.href) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'); }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="hidden md:flex items-center" style={{ gap: '0.75rem' }}>



              <button
                onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: uiTheme === 'dark' ? '#ffffff' : 'hsl(var(--primary))',
                  background: uiTheme === 'dark'
                    ? 'linear-gradient(135deg, rgba(197,168,128,0.15) 0%, rgba(197,168,128,0.03) 100%)'
                    : 'hsl(var(--secondary))',
                  border: uiTheme === 'dark' ? '1px solid rgba(197,168,128,0.3)' : '1px solid hsl(var(--primary)/0.25)',
                  borderRadius: '99px',
                  cursor: 'pointer',
                  transition: 'all 250ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = 'var(--shadow-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Sparkles size={14} style={{ color: 'hsl(var(--primary))' }} />
                <span>Ask AI</span>
              </button>
              
              <Link
                to="/contact"
                style={{
                  padding: '0.55rem 1.2rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'hsl(var(--primary-foreground))',
                  backgroundColor: 'hsl(var(--primary))',
                  borderRadius: '99px',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                  boxShadow: 'var(--shadow-primary)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Talk to an Expert
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '0.5rem',
                color: uiTheme === 'dark' ? '#ffffff' : 'hsl(var(--foreground))',
                background: 'transparent', border: 'none', cursor: 'pointer',
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

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div key="mobile-menu-wrapper" style={{ position: 'fixed', zIndex: 900 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 900,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)'
              }}
              className="md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 901,
                width: '85%', maxWidth: '320px',
                background: 'linear-gradient(165deg, rgba(13, 21, 39, 0.98) 0%, rgba(5, 10, 20, 1) 100%)',
                borderLeft: '1px solid rgba(223, 186, 115, 0.2)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column',
                padding: '1.5rem',
              }}
              className="md:hidden"
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
                >
                  <X size={20} />
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: 'auto' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Menu</span>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Practice Areas', href: '/services' },
                  { label: 'Industries We Serve', href: '/industries' },
                  { label: 'Insights & Guides', href: '/insights' },
                  { label: 'About Us', href: '/about' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      textDecoration: 'none'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div style={{ marginTop: '2rem' }}>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="btn-gold" style={{ width: '100%', padding: '0.875rem', display: 'block', textAlign: 'center', borderRadius: '8px' }}>
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: uiTheme === 'dark' ? 'var(--color-navy)' : 'hsl(var(--foreground))', borderTop: uiTheme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
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
