import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Landmark, TrendingUp, Users, CheckCircle2, ChevronRight } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Counter Component for Trust Metrics
const Counter = ({ end, suffix = "", title }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col">
      <span className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
        {count}{suffix}
      </span>
      <span className="text-sm font-bold text-text-muted uppercase tracking-wider">{title}</span>
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full bg-primary selection:bg-text-main selection:text-white">
      {/* 1. Hero Section (Dynamic 2-Column) */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border-main">
        {/* Abstract Background Element for the right column */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full bg-secondary border-l border-border-main z-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="pt-20 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-secondary border border-border-main text-xs font-mono font-bold tracking-widest uppercase mb-8"
            >
              <span className="w-2 h-2 bg-accent rounded-none"></span> Top Tier Advisory
            </motion.div>
            <motion.h1 
              initial="hidden" animate="visible" variants={FADE_UP}
              className="text-5xl md:text-7xl lg:text-[5rem] font-heading font-bold leading-[1.05] tracking-tight text-text-main mb-8"
            >
              Strategic Authority. <br className="hidden md:block"/> Unrivaled Execution.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-lg"
            >
              We provide definitive registration, compliance, and corporate structuring solutions for businesses that demand precision and speed.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link to="/contact" className="group w-full sm:w-auto px-8 py-4 bg-text-main text-white text-sm font-bold hover:bg-accent transition-colors duration-300 rounded-none flex items-center justify-center gap-2">
                Initiate Engagement <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/services" className="group w-full sm:w-auto px-8 py-4 bg-transparent border border-border-main text-text-main text-sm font-bold hover:border-text-main hover:bg-secondary transition-all duration-300 rounded-none flex items-center justify-center gap-2">
                View Services
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex justify-end h-full relative"
          >
             <div className="bg-white border border-border-main p-12 shadow-2xl relative w-full max-w-md">
                <h3 className="text-xl font-heading font-bold mb-8">Corporate Setup Intelligence</h3>
                <div className="space-y-6">
                  {[
                    { label: "Entity Incorporation", val: "10-15 Days" },
                    { label: "IP Registration (MSME)", val: "₹4,500" },
                    { label: "Compliance Processing", val: "Automated" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border-main pb-4">
                      <span className="text-sm font-bold text-text-muted">{item.label}</span>
                      <span className="text-sm font-bold text-text-main">{item.val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 absolute -left-12 -bottom-12 bg-accent text-white p-8 border border-text-main">
                  <p className="text-3xl font-heading font-bold mb-2">99.8%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-90">Application Success</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Metrics & Logos */}
      <section className="py-20 border-b border-border-main bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <Counter end={500} suffix="+" title="Companies Registered" />
            <Counter end={45} suffix="+" title="Sectors Served" />
            <Counter end={99} suffix="%" title="Client Retention" />
            <Counter end={14} suffix=" Days" title="Avg. Setup Time" />
          </div>

          <p className="text-xs font-mono font-bold tracking-widest uppercase text-text-muted mb-8 border-t border-border-main pt-12">Trusted By Modern Enterprises</p>
          <div className="flex flex-wrap gap-8 md:gap-16 opacity-30 grayscale font-heading text-xl md:text-2xl font-bold">
            <span>Startups</span>
            <span>MSMEs</span>
            <span>Corporates</span>
            <span>Family Businesses</span>
            <span>Investors</span>
          </div>
        </div>
      </section>

      {/* 3. Executive Services (Bento Box) */}
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
            <Link to="/services" className="group col-span-1 md:col-span-2 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col justify-between min-h-[300px]">
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
            <Link to="/services" className="group col-span-1 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col">
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
            <Link to="/services" className="group col-span-1 p-10 bg-white border border-border-main hover:border-accent transition-colors duration-300 flex flex-col">
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

      {/* 4. Call To Action */}
      <section className="py-32 bg-text-main text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight">Ready to Dominate?</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-medium">
            Partner with Sterling Advisory for definitive, zero-error corporate execution.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-text-main bg-white hover:bg-accent hover:text-white transition-colors rounded-none">
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

