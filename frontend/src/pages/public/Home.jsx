import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Calculator, ShieldCheck, Scale, Compass } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const StackedCard = ({ card, i, totalCards, progress, shouldReduceMotion }) => {
  const targetScale = 1 - ((totalCards - 1 - i) * 0.04);
  const targetOpacity = 1 - ((totalCards - 1 - i) * 0.3);
  
  const scale = useTransform(progress, [i * (1/totalCards), 1], [1, targetScale]);
  const opacity = useTransform(progress, [i * (1/totalCards), 1], [1, targetOpacity]);

  const topOffset = 120 + (i * 20); 

  return (
    <div 
      className="sticky flex items-center justify-center w-full" 
      style={{ top: `${topOffset}px`, marginBottom: i === totalCards - 1 ? '0' : '60vh' }}
    >
      <motion.div 
        style={shouldReduceMotion ? {} : { scale, opacity }}
        className="w-full bg-primary border border-border-main p-10 md:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-8 md:gap-16 origin-top"
      >
        <div className="md:w-1/3">
           <span className="text-xs font-mono text-text-muted mb-6 block">0{i+1}</span>
           <h3 className="text-3xl md:text-4xl font-heading font-medium text-text-main">{card.title}</h3>
        </div>
        <div className="md:w-2/3 flex flex-col justify-center">
           <p className="text-lg text-text-muted font-light leading-relaxed mb-8">{card.desc}</p>
           <Link to={card.link} className="group inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2 link-underline pb-1 w-max">
             {card.linkText} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [shouldAnimate] = useState(() => !sessionStorage.getItem('hasPlayedIntro'));
  const shouldReduceMotion = useReducedMotion();
  const expertiseRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: expertiseRef,
    offset: ['start start', 'end end']
  });

  const expertiseCards = [
    {
      title: "Business Setup",
      desc: "End-to-end entity incorporation and structuring for Private Limited Companies, LLPs, and Proprietorships.",
      link: "/services?category=business-registrations",
      linkText: "Explore Setup"
    },
    {
      title: "Intellectual Property",
      desc: "Comprehensive protection of your corporate assets, including Trademarks, Copyrights, and Patents.",
      link: "/services?category=intellectual-property",
      linkText: "Explore IP"
    },
    {
      title: "Tax & Statutory",
      desc: "Definitive compliance solutions covering GST, PAN, TAN, and essential state-specific Professional Taxes.",
      link: "/services?category=tax-registrations",
      linkText: "Explore Tax"
    }
  ];

  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white">
      
      {/* 1. Hero Section (Asymmetric Split Layout) */}
      <section className="relative min-h-[90vh] flex items-center justify-center border-b border-border-main bg-primary overflow-hidden pt-20 pb-20 md:pt-0 md:pb-0">
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-6 block">
                Corporate Advisory & Compliance
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-medium leading-[1.1] text-text-main mb-8">
              <span className="block overflow-hidden pb-2">
                <motion.span className="block" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.08 : 0 }}>
                  Structuring businesses.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span className="block text-text-muted" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.16 : 0 }}>
                  Securing compliance.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span className="block" initial={shouldAnimate ? { y: "100%", opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.24 : 0 }}>
                  Scaling with confidence.
                </motion.span>
              </span>
            </h1>
            
            <motion.p 
              initial={shouldAnimate ? { opacity: 0, y: 20 } : false} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 0.88 : 0 }}
              className="text-lg text-text-muted leading-relaxed mb-12 max-w-xl font-body font-light"
            >
              Comprehensive entity registration, complex tax advisory, robust IP protection, and complete labour law compliance tailored for modern Indian enterprises.
            </motion.p>
            
            <motion.div 
              initial={shouldAnimate ? { opacity: 0 } : false} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: shouldAnimate ? 1.03 : 0 }}
              className="flex flex-col gap-8"
            >
              <Link to="/contact" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-accent hover:text-text-main transition-colors duration-500 w-max">
                <span className="link-underline pb-1">Consult Our Experts</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              
              <div className="flex flex-wrap gap-3 mt-2">
                <Link to="/services?category=business-registrations" className="px-4 py-1.5 border border-border-main rounded-full text-xs font-medium text-text-muted hover:border-text-main hover:text-text-main transition-colors bg-white/50 backdrop-blur-sm">Private Limited</Link>
                <Link to="/services?category=tax-registrations" className="px-4 py-1.5 border border-border-main rounded-full text-xs font-medium text-text-muted hover:border-text-main hover:text-text-main transition-colors bg-white/50 backdrop-blur-sm">GST Registration</Link>
                <Link to="/services?category=intellectual-property" className="px-4 py-1.5 border border-border-main rounded-full text-xs font-medium text-text-muted hover:border-text-main hover:text-text-main transition-colors bg-white/50 backdrop-blur-sm">Trademark Filing</Link>
                <Link to="/services?category=industry-licensing" className="px-4 py-1.5 border border-border-main rounded-full text-xs font-medium text-text-muted hover:border-text-main hover:text-text-main transition-colors bg-white/50 backdrop-blur-sm">MSME / Udyam</Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual Icon Map */}
          <div className="w-full hidden lg:flex items-center justify-center h-full min-h-[500px]">
             <div className="relative w-[360px] h-[360px] flex items-center justify-center ml-12">
                {/* Connecting Lines */}
                <motion.svg 
                   initial={shouldAnimate ? { opacity: 0 } : false}
                   animate={{ opacity: 0.5 }}
                   transition={{ duration: 1, delay: shouldAnimate ? 0.6 : 0 }}
                   className="absolute inset-0 w-full h-full text-border-main"
                >
                   <line x1="180" y1="0" x2="180" y2="360" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="0" y1="180" x2="360" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </motion.svg>

                {/* Center Core */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: shouldAnimate ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute w-20 h-20 bg-primary border border-border-main rounded-full flex items-center justify-center z-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <Compass size={28} strokeWidth={1} className="text-accent" />
                </motion.div>

                {/* Node 1: Top (Business Setup) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
                >
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm">
                      <Building2 size={24} strokeWidth={1} className="text-text-main" />
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
                      <ShieldCheck size={24} strokeWidth={1} className="text-text-main" />
                   </div>
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-left w-24">Intellectual<br/>Property</span>
                </motion.div>

                {/* Node 3: Bottom (Tax) */}
                <motion.div 
                  initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: shouldAnimate ? 0.9 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-4"
                >
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-center whitespace-nowrap">Tax & Statutory</span>
                   <div className="w-16 h-16 bg-white border border-border-main rounded-full flex items-center justify-center shadow-sm">
                      <Calculator size={24} strokeWidth={1} className="text-text-main" />
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
                      <Scale size={24} strokeWidth={1} className="text-text-main" />
                   </div>
                   <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase text-right w-24">Industry<br/>Licensing</span>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Areas of Expertise (Sticky Stack Layout) */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Specialized Practice Areas</h2>
          </motion.div>
        </div>

        <div ref={expertiseRef} className="max-w-5xl mx-auto px-6 relative pb-32">
          {expertiseCards.map((card, i) => (
            <StackedCard 
              key={i} 
              card={card} 
              i={i} 
              totalCards={expertiseCards.length} 
              progress={scrollYProgress} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
          
          <div className="mt-32 text-center relative z-10">
             <Link to="/services" className="inline-flex items-center text-sm font-bold text-text-main link-underline pb-1 hover:text-accent transition-colors">
               View Full Catalog
             </Link>
          </div>
        </div>
      </section>

      {/* 3. Refined Call To Action */}
      <section className="py-40 bg-accent">
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
    </div>
  );
}

