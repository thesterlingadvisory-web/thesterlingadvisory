import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Calculator, ShieldCheck, Scale, Compass, ChevronDown, User, Users, Heart, ShoppingCart, Briefcase, BookOpen, FileCheck, Send, Store } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const finderOptions = [
  { id: 'solo', label: 'Solo founder / freelancer', icon: User, results: [
    { name: 'Proprietorship Registration', link: '/services/proprietorship-registration' },
    { name: 'Udyam / MSME Registration', link: '/services/udyam-msme-registration' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
  { id: 'cofounders', label: '2+ co-founders', icon: Users, results: [
    { name: 'Private Limited Company', link: '/services/private-limited-company' },
    { name: 'LLP Registration', link: '/services/llp-registration' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
  { id: 'ngo', label: 'NGO / Trust / Society', icon: Heart, results: [
    { name: 'Section 8 Company', link: '/services/section-8-company' },
    { name: '12A & 80G Registration', link: '/services/12a-80g-registration' },
    { name: 'Trust Registration', link: '/services/trust-registration' },
  ]},
  { id: 'ecommerce', label: 'E-commerce seller', icon: ShoppingCart, results: [
    { name: 'GST Registration', link: '/services/gst-registration' },
    { name: 'Trademark Registration', link: '/services/trademark-registration' },
    { name: 'Private Limited Company', link: '/services/private-limited-company' },
  ]},
  { id: 'existing', label: 'Existing business needing compliance', icon: Briefcase, results: [
    { name: 'GST Return Filing', link: '/services/gst-return-filing' },
    { name: 'Professional Tax Registration', link: '/services/professional-tax-registration' },
    { name: 'FSSAI License', link: '/services/fssai-license' },
  ]},
  { id: 'retail', label: 'Retail / Physical Store', icon: Store, results: [
    { name: 'Shops & Establishments', link: '/services/shops-establishments' },
    { name: 'FSSAI Licence', link: '/services/fssai-licence' },
    { name: 'GST Registration', link: '/services/gst-registration' },
  ]},
];

const faqData = [
  {
    q: 'How long does company registration typically take?',
    a: 'Most registrations are completed within 7–14 business days, depending on the type of entity and government processing timelines. We handle all follow-ups with the authorities so you can focus on your business.'
  },
  {
    q: 'Do I need to visit your office in person?',
    a: 'No. Our entire process is designed to work remotely. Documents can be submitted digitally, consultations happen over video call or phone, and certificates are delivered electronically.'
  },
  {
    q: 'What documents do I need to get started?',
    a: 'The exact list varies by registration type, but generally you will need identity proof (PAN/Aadhaar), address proof, and a passport-sized photograph. We provide a complete checklist during the initial consultation.'
  },
  {
    q: 'Can you help with businesses outside your local state?',
    a: 'Yes. We serve clients across all Indian states and union territories. Most government filings are handled through centralized online portals, so geography is not a barrier.'
  },
  {
    q: 'What happens after my registration is approved?',
    a: 'You receive all original certificates and documents digitally. We also provide a post-registration compliance brief outlining any recurring filings or obligations your entity must meet.'
  },
  {
    q: 'Do you provide ongoing compliance support after registration?',
    a: 'Absolutely. We offer annual compliance packages covering GST return filing, annual returns, and statutory filings so your business stays fully compliant year-round.'
  },
];

const processSteps = [
  { num: '01', title: 'Consultation', desc: 'Understand your business needs and recommend the right structure.', icon: User },
  { num: '02', title: 'Documentation', desc: 'Prepare and vet all required paperwork for submission.', icon: FileCheck },
  { num: '03', title: 'Filing', desc: 'Submit applications to the relevant government authority.', icon: Send },
  { num: '04', title: 'Delivery', desc: 'Receive your certificate or registration, fully compliant.', icon: ShieldCheck },
];

const insightsPreview = [
  {
    title: 'Private Limited vs. LLP: Which Structure Fits Your Startup?',
    excerpt: 'A practical comparison of liability, taxation, and compliance for early-stage founders.',
    link: '/insights',
  },
  {
    title: 'GST Registration: Who Needs It and When',
    excerpt: 'Threshold limits, voluntary registration benefits, and common mistakes to avoid.',
    link: '/insights',
  },
  {
    title: 'Protecting Your Brand: A Guide to Trademark Filing in India',
    excerpt: 'The step-by-step process, timelines, and why you should file before scaling.',
    link: '/insights',
  },
];

export default function Home() {
  const [shouldAnimate] = useState(() => !sessionStorage.getItem('hasPlayedIntro'));
  const shouldReduceMotion = useReducedMotion();
  const [finderSelection, setFinderSelection] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const expertiseCards = [
    {
      title: "Business Setup",
      desc: "End-to-end entity incorporation and structuring for Private Limited Companies, LLPs, and Proprietorships.",
      link: "/services?category=business-registrations",
      linkText: "Explore Setup"
    },
    {
      title: "Tax & Statutory",
      desc: "Definitive compliance solutions covering GST, PAN, TAN, and essential state-specific Professional Taxes.",
      link: "/services?category=tax-registrations",
      linkText: "Explore Tax"
    },
    {
      title: "Intellectual Property",
      desc: "Comprehensive protection of your corporate assets, including Trademarks, Copyrights, and Patents.",
      link: "/services?category=intellectual-property",
      linkText: "Explore IP"
    },
    {
      title: "Industry Licensing",
      desc: "Specialized licence procurement for FSSAI, Import-Export, Drug, PSARA, and other sector-specific authorizations.",
      link: "/services?category=industry-licensing",
      linkText: "Explore Licensing"
    }
  ];

  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white">
      
      {/* 1. Hero Section (Asymmetric Split Layout) */}
      <section className="relative min-h-[80vh] flex items-center border-b border-border-main bg-primary overflow-hidden py-16 lg:py-0">
        {/* Subtle Background Texture */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        ></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Typography & Copy */}
          <div className="w-full lg:max-w-2xl">
            <motion.div 
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-highlight mb-4 block">
                Corporate Advisory & Compliance
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-medium leading-[1.15] text-text-main mb-5">
              <span className="block overflow-hidden pb-1">
                <motion.span className="block" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.08 : 0 }}>
                  Structuring businesses.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span className="block" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.16 : 0 }}>
                  Securing compliance.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span className="block text-accent" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.24 : 0 }}>
                  Scaling with confidence.
                </motion.span>
              </span>
            </h1>
            
            <motion.p 
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.88 : 0 }}
              className="text-base md:text-lg text-text-muted leading-relaxed mb-8 max-w-xl font-body font-light"
            >
              Comprehensive entity registration, complex tax advisory, robust IP protection, and complete labour law compliance tailored for modern Indian enterprises.
            </motion.p>
            
            <motion.div 
              initial={shouldAnimate ? { opacity: 0 } : false} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 1.03 : 0 }}
              className="flex items-center"
            >
              <Link to="/contact" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-accent hover:text-text-main transition-colors duration-500 w-max">
                <span className="link-underline pb-1">Consult Our Experts</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Visual Icon Map */}
          <div className="w-full hidden lg:flex items-center justify-center">
             <div className="relative w-[320px] h-[320px] flex items-center justify-center ml-8 mb-8">
                {/* Connecting Lines */}
                <motion.svg 
                   initial={shouldAnimate ? { opacity: 0 } : false}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: shouldAnimate ? 0.6 : 0 }}
                   className="absolute inset-0 w-full h-full" style={{ color: 'rgba(0,0,0,0.18)' }}
                >
                   <line x1="160" y1="0" x2="160" y2="320" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                   <line x1="0" y1="160" x2="320" y2="160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                </motion.svg>

                {/* Center Core */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: shouldAnimate ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute w-5 h-5 bg-highlight rounded-full z-10 shadow-[0_0_0_4px_rgba(196,169,98,0.15)]"
                />

                {/* Node 1: Top (Business Setup) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
                >
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm">
                      <Building2 size={24} strokeWidth={1.5} className="text-text-main" />
                   </div>
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-center whitespace-nowrap">Business Setup</span>
                </motion.div>

                {/* Node 2: Right (IP) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-4"
                >
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm z-10">
                      <ShieldCheck size={24} strokeWidth={1.5} className="text-text-main" />
                   </div>
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-left w-24">Intellectual<br/>Property</span>
                </motion.div>

                {/* Node 3: Bottom (Tax) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 0.9 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-3 mb-2"
                >
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-center whitespace-nowrap">Tax & Statutory</span>
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm">
                      <Calculator size={24} strokeWidth={1.5} className="text-text-main" />
                   </div>
                </motion.div>

                {/* Node 4: Left (Licensing) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 1.0 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse items-center gap-4"
                >
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm z-10">
                      <Scale size={24} strokeWidth={1.5} className="text-text-main" />
                   </div>
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-right w-24">Industry<br/>Licensing</span>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Find Your Registration — Interactive Finder */}
      <section className="py-44 bg-[#f0f2f8]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Quick Start</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main mb-4">Find Your Registration</h2>
            <p className="text-text-muted font-light max-w-xl mx-auto">Tell us about your business — we'll recommend the right registrations to get you started.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!finderSelection ? (
              <motion.div 
                key="finder-options"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {finderOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button 
                      key={opt.id} 
                      onClick={() => setFinderSelection(opt)}
                      className="group text-left p-6 bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] transition-all duration-200 flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full border border-border-main flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                        <Icon size={18} strokeWidth={1.5} className="text-text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-text-main pt-2">{opt.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="finder-results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto bg-white p-10"
              >
                <p className="text-sm text-text-muted mb-2">Recommended for: <strong className="text-text-main">{finderSelection.label}</strong></p>
                <div className="space-y-4 mt-6">
                  {finderSelection.results.map((r, i) => (
                    <Link key={i} to={r.link} className="group flex items-center justify-between p-5 border-b border-border-main last:border-0 hover:bg-secondary/50 transition-colors">
                      <span className="font-medium text-text-main">{r.name}</span>
                      <ArrowRight size={16} className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
                <button onClick={() => setFinderSelection(null)} className="mt-8 text-sm font-bold text-accent hover:text-text-main transition-colors link-underline pb-1">
                  ← Choose a different option
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Areas of Expertise (Clean 2x2 Grid) */}
      <section className="py-44 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Specialized Practice Areas</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {expertiseCards.map((card, i) => (
              <motion.div key={i} variants={FADE_UP} className="group bg-primary p-10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] transition-all duration-200">
                <span className="text-xs font-mono font-medium text-highlight mb-4 block tracking-widest">0{i+1}</span>
                <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4 text-text-main">{card.title}</h3>
                <p className="text-text-muted font-light leading-relaxed mb-8">{card.desc}</p>
                <Link to={card.link} className="group/link inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2 link-underline pb-1">
                  {card.linkText} <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. How It Works — Process Stepper */}
      <section className="py-44 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">How It Works</h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-border-main z-0"></div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10"
            >
              {processSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <motion.div key={step.num} variants={FADE_UP} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white border border-border-main flex items-center justify-center mb-6 shadow-sm">
                      <StepIcon size={24} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <span className="text-xs font-mono text-text-muted mb-2 block">{step.num}</span>
                    <h3 className="text-lg font-heading font-medium text-text-main mb-2">{step.title}</h3>
                    <p className="text-sm text-text-muted font-light leading-relaxed max-w-[200px]">{step.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Refined Call To Action */}
      <section className="py-52 bg-accent">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-medium mb-8 text-white">Take the next step.</h2>
          <p className="text-white/80 mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Connect with our advisory team to discuss your corporate registration and statutory compliance needs.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-widest text-text-main bg-white btn-hover rounded-none">
            Schedule a Consultation
          </Link>
        </motion.div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-44 bg-primary">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Frequently Asked</h2>
          </motion.div>

          <div className="divide-y divide-border-main">
            {faqData.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} 
                  className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
                >
                  <span className="text-base font-medium text-text-main group-hover:text-accent transition-colors pr-8">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`shrink-0 text-text-muted transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm text-text-muted leading-relaxed font-light">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest Insights Teaser */}
      <section className="py-44 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Latest Insights</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {insightsPreview.map((post, i) => (
              <motion.div key={i} variants={FADE_UP}>
                <Link to={post.link} className="group block bg-primary p-8 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] transition-all duration-200">
                  <div className="w-10 h-10 rounded-full border border-border-main flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                    <BookOpen size={18} strokeWidth={1.5} className="text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-lg font-heading font-medium text-text-main mb-3 leading-snug">{post.title}</h3>
                  <p className="text-sm text-text-muted font-light leading-relaxed mb-6">{post.excerpt}</p>
                  <span className="text-xs font-bold text-accent group-hover:text-text-main transition-colors link-underline pb-1">Read More</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 text-center">
            <Link to="/insights" className="inline-flex items-center text-sm font-bold text-text-main link-underline pb-1 hover:text-accent transition-colors">
              View All Insights
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

