import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Landmark, ChevronRight } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="w-full bg-primary selection:bg-text-main selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden border-b border-border-main bg-white">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial="hidden" animate="visible" variants={FADE_UP}
            className="text-5xl md:text-7xl font-heading font-bold leading-[1.05] tracking-tight text-text-main mb-8"
          >
            Professional Corporate Advisory & Compliance.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed mb-12 mx-auto max-w-2xl"
          >
            We provide definitive registration, compliance, and corporate structuring solutions for businesses that demand precision and speed.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="group w-full sm:w-auto px-8 py-4 bg-text-main text-white text-sm font-bold hover:bg-accent transition-colors duration-300 rounded-none flex items-center justify-center gap-2">
              Initiate Engagement <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link to="/services" className="group w-full sm:w-auto px-8 py-4 bg-transparent border border-border-main text-text-main text-sm font-bold hover:border-text-main hover:bg-secondary transition-all duration-300 rounded-none flex items-center justify-center gap-2">
              View Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Executive Services (Bento Box) */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">Executive Services</h2>
              <p className="text-text-muted leading-relaxed font-medium">
                A highly structured approach to corporate compliance, intellectual property, and business scaling.
              </p>
            </div>
            <Link to="/services" className="text-sm font-bold border-b-2 border-text-main pb-1 hover:text-accent hover:border-accent transition-colors flex items-center gap-2 shrink-0">
              Explore All Services <ArrowRight size={16} />
            </Link>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Large Card */}
            <Link to="/services?category=business-registrations" className="group col-span-1 md:col-span-2 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col justify-between min-h-[300px]">
              <div className="w-12 h-12 bg-secondary border border-border-main flex items-center justify-center text-text-main mb-8 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                <Landmark/>
              </div>
              <div>
                <h3 className="text-3xl font-heading font-bold mb-4 group-hover:text-accent transition-colors">Business Setup</h3>
                <p className="text-text-muted leading-relaxed mb-6 font-medium max-w-md">End-to-end entity incorporation for Private Limited Companies, LLPs, and Proprietorships.</p>
                <div className="flex gap-2">
                  {['Private Limited', 'LLP', 'Proprietorship'].map(t => <span key={t} className="text-xs font-bold px-3 py-1 bg-secondary border border-border-main text-text-muted">{t}</span>)}
                </div>
              </div>
            </Link>

            {/* Square Card 1 */}
            <Link to="/services?category=intellectual-property" className="group col-span-1 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col">
              <div className="w-12 h-12 bg-secondary border border-border-main flex items-center justify-center text-text-main mb-8 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                <Shield/>
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-accent transition-colors">Intellectual Property</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed mb-6">Trademarks, Copyrights, and Patents.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {['Trademark', 'Copyright'].map(t => <span key={t} className="text-xs font-bold px-3 py-1 bg-secondary border border-border-main text-text-muted">{t}</span>)}
              </div>
            </Link>

            {/* Square Card 2 */}
            <Link to="/services?category=tax-registrations" className="group col-span-1 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col">
              <div className="w-12 h-12 bg-secondary border border-border-main flex items-center justify-center text-text-main mb-8 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                <BarChart2/>
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-accent transition-colors">Tax & Statutory</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed mb-6">GST, PAN, TAN, and Professional Tax.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {['GST', 'Professional Tax'].map(t => <span key={t} className="text-xs font-bold px-3 py-1 bg-secondary border border-border-main text-text-muted">{t}</span>)}
              </div>
            </Link>

            {/* Horizontal Card */}
            <Link to="/services" className="group col-span-1 md:col-span-2 p-10 bg-text-main text-white border border-text-main hover:bg-accent hover:border-accent transition-colors duration-300 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-3xl font-heading font-bold mb-2">Comprehensive Catalog</h3>
                <p className="text-gray-400 font-medium max-w-sm text-sm">Explore all 60+ registrations including Labour Law, FSSAI, MSME, and more.</p>
              </div>
              <div className="mt-8 md:mt-0 w-12 h-12 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-accent transition-colors">
                <ChevronRight/>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. Call To Action */}
      <section className="py-32 bg-text-main text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight">Partner with Sterling Advisory.</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-medium">
            Professional corporate services and definitive compliance solutions.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-text-main bg-white hover:bg-accent hover:text-white transition-colors rounded-none">
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

