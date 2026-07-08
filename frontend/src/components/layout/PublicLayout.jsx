import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [shouldAnimate] = useState(() => location.pathname === '/' && !sessionStorage.getItem('hasPlayedIntro'));

  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem('hasPlayedIntro', 'true');
    }
  }, [shouldAnimate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-primary text-text-main">
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/85 backdrop-blur-md border-border-main shadow-[0_2px_20px_rgba(0,0,0,0.04)] py-0' : 'bg-primary border-border-main/50 py-3'}`}>
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <motion.div initial={shouldAnimate ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <Link to="/" className="text-[1.35rem] font-heading font-semibold tracking-tight z-50 relative block text-accent">
              Sterling Advisory
            </Link>
          </motion.div>
          
          <motion.nav 
            initial={shouldAnimate ? { opacity: 0 } : false} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4, delay: shouldAnimate ? 1.03 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center gap-9 text-[13px] font-semibold tracking-wide uppercase text-text-muted"
          >
            <Link to="/services" className="hover:text-accent transition-colors duration-300">Services</Link>
            <Link to="/industries" className="hover:text-accent transition-colors duration-300">Industries</Link>
            <Link to="/insights" className="hover:text-accent transition-colors duration-300">Knowledge Hub</Link>
            <Link to="/about" className="hover:text-accent transition-colors duration-300">About</Link>
          </motion.nav>

          <motion.div 
            initial={shouldAnimate ? { opacity: 0 } : false} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4, delay: shouldAnimate ? 1.03 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <Link to="/contact" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-bold tracking-wide uppercase text-white bg-accent btn-hover rounded-none">
              Book Consultation
            </Link>
            <button 
              className="md:hidden p-2 text-text-main z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary flex flex-col pt-28 px-6 pb-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-8 text-2xl font-heading mb-auto">
            <Link to="/services" className="w-max link-underline pb-1 hover:text-accent transition-colors">Services</Link>
            <Link to="/industries" className="w-max link-underline pb-1 hover:text-accent transition-colors">Industries</Link>
            <Link to="/insights" className="w-max link-underline pb-1 hover:text-accent transition-colors">Knowledge Hub</Link>
            <Link to="/about" className="w-max link-underline pb-1 hover:text-accent transition-colors">About</Link>
          </nav>
          
          <div className="mt-8">
            <Link to="/contact" className="w-full flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-text-main rounded-none btn-hover">
              Book Consultation
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-border-main bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-heading font-semibold mb-4">Sterling Advisory</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Strategic, financial, regulatory, and operational advisory that drives sustainable growth.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-4">Corporate Services</h4>
            <ul className="space-y-3 text-sm flex flex-col items-start">
              <li><Link to="/services/business-setup" className="link-underline hover:text-accent">Business Setup</Link></li>
              <li><Link to="/services/tax-statutory" className="link-underline hover:text-accent">Tax & Statutory</Link></li>
              <li><Link to="/services/intellectual-property" className="link-underline hover:text-accent">Intellectual Property</Link></li>
              <li><Link to="/services/industry-licensing" className="link-underline hover:text-accent">Industry Licensing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-4">The Firm</h4>
            <ul className="space-y-3 text-sm flex flex-col items-start">
              <li><Link to="/about" className="link-underline hover:text-accent">About Us</Link></li>
              <li><Link to="/insights" className="link-underline hover:text-accent">Knowledge Hub</Link></li>
              <li><Link to="/contact" className="link-underline hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-4">Connect</h4>
            <ul className="space-y-3 text-sm flex flex-col items-start">
              <li><a href="#" className="link-underline hover:text-accent">LinkedIn</a></li>
              <li><a href="#" className="link-underline hover:text-accent">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-main text-xs text-text-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Sterling Advisory. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="link-underline">Privacy Policy</Link>
            <Link to="/terms" className="link-underline">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919999999999?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
          transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.div>
      </motion.a>
    </div>
  );
}
