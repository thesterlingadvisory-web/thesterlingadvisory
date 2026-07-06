import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-border-main">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-heading font-semibold tracking-tight z-50 relative">
            Sterling Advisory
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
            <Link to="/industries" className="hover:text-accent transition-colors">Industries</Link>
            <Link to="/insights" className="hover:text-accent transition-colors">Knowledge Hub</Link>
            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-text-main hover:bg-black transition-colors rounded-sm shadow-sm">
              Book Consultation
            </Link>
            <button 
              className="md:hidden p-2 text-text-main z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary flex flex-col pt-28 px-6 pb-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-8 text-2xl font-heading mb-auto">
            <Link to="/services" className="border-b border-border-main pb-4 hover:text-accent transition-colors">Services</Link>
            <Link to="/industries" className="border-b border-border-main pb-4 hover:text-accent transition-colors">Industries</Link>
            <Link to="/insights" className="border-b border-border-main pb-4 hover:text-accent transition-colors">Knowledge Hub</Link>
            <Link to="/about" className="border-b border-border-main pb-4 hover:text-accent transition-colors">About</Link>
          </nav>
          
          <div className="mt-8">
            <Link to="/contact" className="w-full flex items-center justify-center px-6 py-4 text-base font-medium text-white bg-text-main rounded-sm">
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
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/business-setup" className="hover:text-accent">Business Setup</Link></li>
              <li><Link to="/services/tax-statutory" className="hover:text-accent">Tax & Statutory</Link></li>
              <li><Link to="/services/intellectual-property" className="hover:text-accent">Intellectual Property</Link></li>
              <li><Link to="/services/industry-licensing" className="hover:text-accent">Industry Licensing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-4">The Firm</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/insights" className="hover:text-accent">Knowledge Hub</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-main text-xs text-text-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Sterling Advisory. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
