import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Landmark, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary px-6">
        {/* Subtle background abstract shape */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03]">
          <div className="w-[80vw] h-[80vw] rounded-full border border-black scale-150 transform -translate-y-20"></div>
          <div className="absolute w-[60vw] h-[60vw] rounded-full border border-black scale-150 transform translate-x-20"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 
            initial="hidden" animate="visible" variants={FADE_UP}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium leading-[1.1] tracking-tight text-text-main mb-8"
          >
            Strategic Advisory <br/> for Modern Businesses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Helping businesses navigate growth, governance, finance, compliance, funding, and transformation through integrated advisory solutions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-text-main text-white text-sm font-medium hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2">
              Talk to an Advisor <ArrowRight size={16} />
            </Link>
            <Link to="/capabilities" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border-main text-text-main text-sm font-medium hover:border-text-main transition-colors rounded-sm">
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Trusted By */}
      <section className="py-12 border-y border-border-main bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-mono tracking-widest uppercase text-text-muted mb-8">Trusted By</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale font-heading text-xl md:text-2xl">
            <span>Startups</span>
            <span>MSMEs</span>
            <span>Corporates</span>
            <span>Family Businesses</span>
            <span>Investors</span>
          </div>
        </div>
      </section>

      {/* 4. Our Capabilities (Skipped 3 for brevity, combined concept) */}
      <section className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">Executive Capabilities</h2>
              <p className="text-text-muted leading-relaxed">
                We partner with business leaders to solve complex challenges. Our integrated advisory approach ensures every decision drives long-term value.
              </p>
            </div>
            <Link to="/capabilities" className="text-sm font-medium border-b border-text-main pb-1 hover:text-accent hover:border-accent transition-colors flex items-center gap-2 shrink-0">
              View all capabilities <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Landmark/>, title: "Business Setup", desc: "Private Limited, LLP, OPC, and NGO registrations with end-to-end guidance." },
              { icon: <BarChart2/>, title: "Tax & Statutory", desc: "Comprehensive GST, PAN, TAN, and Professional Tax registrations." },
              { icon: <Users/>, title: "Workforce & Labour", desc: "EPF, ESIC, CLRA, and State Establishment registrations for scaling teams." },
              { icon: <Shield/>, title: "Intellectual Property", desc: "Protect your brand with specialized trademark, copyright, and patent filings." },
              { icon: <TrendingUp/>, title: "Industry Licensing", desc: "FSSAI, Drug Licences, RERA, and Environmental approvals simplified." },
              { icon: <CheckCircle2/>, title: "Digital & Compliance", desc: "Digital Signatures, DINs, MCA KYC, and ongoing annual compliance filings." }
            ].map((cap, i) => (
              <Link to={`/capabilities/${cap.title.toLowerCase().replace(/ /g, '-').replace('&', 'and')}`} key={i} className="group p-8 bg-white border border-border-main hover:border-accent/50 transition-all duration-300 flex flex-col h-full rounded-sm">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-text-main mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-heading font-medium mb-3 group-hover:text-accent transition-colors">{cap.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mt-auto">{cap.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action */}
      <section className="py-32 bg-text-main text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading mb-8">Let's Build Better Businesses.</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg">
            Partner with Sterling Advisory for strategic guidance that transforms your business trajectory.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-text-main bg-white hover:bg-gray-100 transition-colors rounded-sm">
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
