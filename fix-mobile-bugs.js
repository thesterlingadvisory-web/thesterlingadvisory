const fs = require('fs');
const path = require('path');

// 1. Fix PublicLayout.jsx AnimatePresence Fragment bug
const layoutFile = path.join(__dirname, 'frontend', 'src', 'components', 'layout', 'PublicLayout.jsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');

// Replace the fragment with a regular div that handles the AnimatePresence properly
const oldPresence = `<AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div`;
const newPresence = `<AnimatePresence>
        {isMobileMenuOpen && (
          <div key="mobile-menu-wrapper" style={{ position: 'fixed', zIndex: 900 }}>
            <motion.div`;

layoutContent = layoutContent.replace(oldPresence, newPresence);

// Also close the div
const oldPresenceEnd = `              </nav>

              <div style={{ marginTop: '2rem' }}>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="btn-gold" style={{ width: '100%', padding: '0.875rem', display: 'block', textAlign: 'center', borderRadius: '8px' }}>
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>`;

const newPresenceEnd = `              </nav>

              <div style={{ marginTop: '2rem' }}>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="btn-gold" style={{ width: '100%', padding: '0.875rem', display: 'block', textAlign: 'center', borderRadius: '8px' }}>
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>`;

layoutContent = layoutContent.replace(oldPresenceEnd, newPresenceEnd);

fs.writeFileSync(layoutFile, layoutContent, 'utf8');


// 2. Fix Home.jsx Flex Wrap Issue
const homeFile = path.join(__dirname, 'frontend', 'src', 'pages', 'public', 'Home.jsx');
let homeContent = fs.readFileSync(homeFile, 'utf8');

homeContent = homeContent.replace(
  /display: 'flex', gap: '0\.5rem', overflowX: 'auto'/g,
  "display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', overflowX: 'auto'"
);

fs.writeFileSync(homeFile, homeContent, 'utf8');

console.log('Mobile bugs patched!');
