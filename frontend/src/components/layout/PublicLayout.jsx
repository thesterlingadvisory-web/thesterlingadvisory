import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const serviceNav = [
  { label: 'Business Registrations', href: '/services?category=business-registrations' },
  { label: 'Tax Registrations', href: '/services?category=tax-registrations' },
  { label: 'Intellectual Property', href: '/services?category=intellectual-property' },
  { label: 'Labour Law', href: '/services?category=labour-law' },
  { label: 'MSME & Government', href: '/services?category=msme-govt' },
  { label: 'Industry Specific', href: '/services?category=industry-specific' },
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const [shouldAnimate] = useState(() => location.pathname === '/' && !sessionStorage.getItem('hasPlayedIntro'));

  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem('hasPlayedIntro', 'true');
    }
  }, [shouldAnimate]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col font-body" style={{ background: 'var(--color-primary)' }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: isScrolled ? 'rgba(5, 8, 15, 0.97)' : 'var(--color-navy)',
          backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(223,186,115,0.18)' : '1px solid rgba(223,186,115,0.08)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.45)' : 'none',
          transition: 'all 400ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: isScrolled ? '68px' : '80px',
            transition: 'height 300ms ease',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              {/* Emblem */}
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700, color: 'var(--color-navy)',
                fontFamily: 'var(--font-heading)',
                flexShrink: 0,
              }}>S</div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '1.2rem',
                color: '#ffffff',
                letterSpacing: '0.01em',
              }}>
                Sterling <span style={{ color: 'var(--color-gold)' }}>Advisory</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.nav
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: shouldAnimate ? 0.3 : 0 }}
            style={{ alignItems: 'center', gap: '0.25rem' }}
            className="hidden md:flex"
          >
            {/* Services Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive('/services') ? 'var(--color-gold)' : 'rgba(255,255,255,0.75)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                transition: 'color 200ms ease',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.color = isActive('/services') ? 'var(--color-gold)' : 'rgba(255,255,255,0.75)'}
              >
                Services <ChevronDown size={13} style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                      background: 'var(--color-navy)',
                      border: '1px solid rgba(223,186,115,0.25)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      minWidth: '260px',
                      zIndex: 100,
                      padding: '0.75rem',
                    }}
                  >
                    {serviceNav.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        style={{
                          display: 'block', padding: '0.625rem 0.875rem',
                          fontSize: '0.8125rem', fontWeight: 500,
                          color: 'rgba(255,255,255,0.75)',
                          borderBottom: '1px solid rgba(223,186,115,0.08)',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.paddingLeft = '1.25rem'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.paddingLeft = '0.875rem'; }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      style={{
                        display: 'block', padding: '0.625rem 0.875rem', marginTop: '0.25rem',
                        fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--color-gold)',
                        transition: 'all 150ms ease',
                      }}
                    >
                      View All Services →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: 'Industries', href: '/industries' },
              { label: 'Knowledge Hub', href: '/insights' },
              { label: 'About', href: '/about' },
            ].map((item) => (
              <motion.div key={item.href} style={{ position: 'relative' }} whileHover="hover">
                <Link
                  to={item.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive(item.href) ? 'var(--color-gold)' : 'rgba(255,255,255,0.75)',
                    transition: 'color 200ms ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive(item.href) ? 'var(--color-gold)' : 'rgba(255,255,255,0.75)'}
                >
                  {item.label}
                </Link>
                {/* Gold underline slide */}
                <motion.div
                  variants={{ hover: { scaleX: 1 }, rest: { scaleX: 0 } }}
                  initial="rest"
                  style={{
                    position: 'absolute', bottom: '2px', left: '1rem', right: '1rem',
                    height: '1.5px', background: 'var(--color-gold)',
                    transformOrigin: 'left center',
                    scaleX: isActive(item.href) ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA + Mobile Toggle */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: shouldAnimate ? 0.4 : 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(223,186,115,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex' }}
              className="hidden md:inline-flex"
            >
              <Link
                to="/contact"
                className="btn-gold"
                style={{ padding: '0.625rem 1.5rem', fontSize: '0.7rem' }}
              >
                Book Consultation
              </Link>
            </motion.div>
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
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'var(--color-navy)',
              display: 'flex', flexDirection: 'column',
              paddingTop: '6rem', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem',
            }}
            className="md:hidden"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: 'auto' }}>
              {[
                { label: 'Services', href: '/services' },
                { label: 'Industries', href: '/industries' },
                { label: 'Knowledge Hub', href: '/insights' },
                { label: 'About', href: '/about' },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                >
                  <Link
                    to={item.href}
                    style={{
                      display: 'block',
                      padding: '1.25rem 0',
                      borderBottom: '1px solid rgba(223,186,115,0.12)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: 500,
                      color: '#ffffff',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <Link to="/contact" className="btn-gold" style={{ width: '100%', padding: '1rem' }}>
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--color-navy)', borderTop: '1px solid rgba(223,186,115,0.18)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

            {/* Brand */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '30px', height: '30px',
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: 'var(--color-navy)',
                  fontFamily: 'var(--font-heading)',
                }}>S</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', color: '#ffffff' }}>
                  Sterling <span style={{ color: 'var(--color-gold)' }}>Advisory</span>
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', maxWidth: '260px' }}>
                India's trusted partner for business registration, tax compliance, and intellectual property protection.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                {['in', 'tw'].map(s => (
                  <a key={s} href="#" style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(223,186,115,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-gold)', fontSize: '0.7rem', fontWeight: 700,
                    textTransform: 'uppercase', transition: 'all 200ms ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-navy)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)'; }}
                  >{s}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                Our Services
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Business Registrations', href: '/services?category=business-registrations' },
                  { label: 'Tax Registrations', href: '/services?category=tax-registrations' },
                  { label: 'Intellectual Property', href: '/services?category=intellectual-property' },
                  { label: 'Labour Law', href: '/services?category=labour-law' },
                  { label: 'MSME & Government', href: '/services?category=msme-govt' },
                  { label: 'Industry Licenses', href: '/services?category=industry-specific' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 200ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Services */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                Popular Services
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Private Limited Company', href: '/services/private-limited-company' },
                  { label: 'GST Registration', href: '/services/gst-registration' },
                  { label: 'Trademark Registration', href: '/services/trademark-registration' },
                  { label: 'LLP Registration', href: '/services/llp-registration' },
                  { label: 'FSSAI Licence', href: '/services/fssai-licence' },
                  { label: 'Udyam Registration', href: '/services/udyam-registration' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 200ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                The Firm
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Knowledge Hub', href: '/insights' },
                  { label: 'Industries We Serve', href: '/industries' },
                  { label: 'Contact', href: '/contact' },
                ].map(link => (
                  <li key={link.href}>
                    <Link to={link.href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 200ms ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(223,186,115,0.15)' }}>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.8' }}>
                  📧 thesterlingadvisory@gmail.com<br />
                  📞 +91 8448803143<br />
                  🌍 PAN India Services
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(223,186,115,0.12)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} Sterling Advisory. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(t => (
                <Link key={t} to="#" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', transition: 'color 200ms ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >{t}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/918448803143?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pulse-gold"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          transition: 'transform 200ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
