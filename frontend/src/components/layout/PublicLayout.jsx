import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-primary text-text-main">
      <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-border-main">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-semibold tracking-tight">
            TheSterlingAdvisory
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
            <button className="md:hidden p-2 text-text-main">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-border-main bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-xl font-heading font-semibold mb-4">TheSterlingAdvisory</h3>
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
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-main text-xs text-text-muted flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} TheSterlingAdvisory. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
