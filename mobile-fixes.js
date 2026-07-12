const fs = require('fs');
const path = require('path');

// 1. Fix PublicLayout.jsx Mobile Sidebar
const layoutFile = path.join(__dirname, 'frontend', 'src', 'components', 'layout', 'PublicLayout.jsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');

// Replace the full-screen mobile menu with a sleek sidebar
const oldMobileMenu = `{/* Mobile Menu Overlay */}
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
      </AnimatePresence>`;

const newMobileMenu = `{/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
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
          </>
        )}
      </AnimatePresence>`;

layoutContent = layoutContent.replace(oldMobileMenu, newMobileMenu);

// Fix the zIndex of the hamburger button itself so it doesn't overlap the new close button weirdly
layoutContent = layoutContent.replace(
  /zIndex: 50,\s*}}\s*className="md:hidden"/g,
  `zIndex: 50,
              }}
              className="md:hidden"` // keep it
);

fs.writeFileSync(layoutFile, layoutContent, 'utf8');

// 2. Fix Home.jsx Recommended Service Package mobile styling
const homeFile = path.join(__dirname, 'frontend', 'src', 'pages', 'public', 'Home.jsx');
let homeContent = fs.readFileSync(homeFile, 'utf8');

// Persona Tabs: Add mobile-friendly scrolling
homeContent = homeContent.replace(
  /overflowX: 'auto', paddingBottom: '0\.25rem' }}/g,
  "overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}\n                  className=\"hide-scroll\""
);

// We need to inject a tiny bit of CSS for hide-scroll if we want, or just rely on inline styles.
// Actually `scrollbarWidth: 'none'` works.

// Padding inside Scope Details: Reduce for mobile
homeContent = homeContent.replace(
  /padding: '1\.4rem 1\.75rem' }}/g,
  "padding: 'clamp(1rem, 4vw, 1.4rem) clamp(1rem, 4vw, 1.75rem)' }}"
);

// Scale down the title slightly on mobile
homeContent = homeContent.replace(
  /fontSize: '1\.38rem', color: '#ffffff'/g,
  "fontSize: 'clamp(1.15rem, 4vw, 1.38rem)', color: '#ffffff'"
);

// Scale down deliverable paddings
homeContent = homeContent.replace(
  /padding: '0\.8rem 1\.1rem'/g,
  "padding: 'clamp(0.6rem, 3vw, 0.8rem) clamp(0.75rem, 3vw, 1.1rem)'"
);

fs.writeFileSync(homeFile, homeContent, 'utf8');

console.log('Mobile view enhancements completed!');
