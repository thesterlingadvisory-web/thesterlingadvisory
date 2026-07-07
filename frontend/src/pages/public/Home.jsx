import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function Home() {
  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white">
      
      {/* 1. Hero Section (Ultra Clean & Classy) */}
      <section className="relative min-h-[85vh] flex items-center justify-center border-b border-border-main bg-primary">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center mt-12">
          <motion.h1 
            initial="hidden" animate="visible" variants={FADE_UP}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-medium leading-[1.1] text-text-main mb-8"
          >
            Definitive Guidance. <br/> Precise Execution.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed mb-16 mx-auto max-w-2xl font-body font-light"
          >
            We provide elite registration, compliance, and corporate structuring solutions for enterprises that demand nothing but absolute precision.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link to="/contact" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-accent hover:text-text-main transition-colors duration-500">
              <span className="border-b border-accent pb-1 group-hover:border-text-main transition-colors">Initiate Engagement</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Areas of Expertise (Minimalist List/Grid) */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Specialized Practice Areas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            
            {/* Area 1 */}
            <div className="group border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">01</span>
              <h3 className="text-3xl font-heading font-medium mb-4 text-text-main">Business Setup</h3>
              <p className="text-text-muted font-light leading-relaxed mb-8">
                End-to-end entity incorporation and structuring for Private Limited Companies, LLPs, and Proprietorships.
              </p>
              <Link to="/services?category=business-registrations" className="inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2">
                Explore Setup <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Area 2 */}
            <div className="group border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">02</span>
              <h3 className="text-3xl font-heading font-medium mb-4 text-text-main">Intellectual Property</h3>
              <p className="text-text-muted font-light leading-relaxed mb-8">
                Comprehensive protection of your corporate assets, including Trademarks, Copyrights, and Patents.
              </p>
              <Link to="/services?category=intellectual-property" className="inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2">
                Explore IP <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Area 3 */}
            <div className="group border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">03</span>
              <h3 className="text-3xl font-heading font-medium mb-4 text-text-main">Tax & Statutory</h3>
              <p className="text-text-muted font-light leading-relaxed mb-8">
                Definitive compliance solutions covering GST, PAN, TAN, and essential state-specific Professional Taxes.
              </p>
              <Link to="/services?category=tax-registrations" className="inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2">
                Explore Tax <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
          
          <div className="mt-20 text-center">
             <Link to="/services" className="inline-flex items-center text-sm font-bold text-text-main border-b border-text-main pb-1 hover:text-accent hover:border-accent transition-colors">
               View Full Catalog
             </Link>
          </div>
        </div>
      </section>

      {/* 3. Refined Call To Action */}
      <section className="py-32 bg-primary border-t border-border-main">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-medium mb-8 text-text-main">Partner with Sterling.</h2>
          <p className="text-text-muted mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Professional corporate services and definitive compliance solutions tailored for businesses that demand excellence.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-widest text-white bg-text-main hover:bg-accent transition-colors duration-500 rounded-none">
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

