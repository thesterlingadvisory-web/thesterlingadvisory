import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const industries = [
  {
    id: '01',
    name: 'Technology & SaaS',
    desc: 'From intellectual property protection to complex entity structuring, we help hyper-growth tech companies secure their innovations and scale globally.',
  },
  {
    id: '02',
    name: 'Healthcare & Life Sciences',
    desc: 'Navigating the intricate regulatory landscape of clinical compliance, drug licensing, and corporate governance for medical institutions.',
  },
  {
    id: '03',
    name: 'Real Estate & Infrastructure',
    desc: 'Specialized advisory for real estate trusts, property acquisitions, and large-scale infrastructure compliance.',
  },
  {
    id: '04',
    name: 'E-Commerce & Retail',
    desc: 'End-to-end statutory compliance, cross-border tax structuring, and consumer protection frameworks for digital and physical retailers.',
  },
  {
    id: '05',
    name: 'Financial Services',
    desc: 'Rigorous regulatory adherence, risk management structuring, and licensing for fintechs, NBFCs, and wealth management firms.',
  }
];

export default function Industries() {
  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white min-h-screen">
      
      {/* Header */}
      <section className="pt-32 pb-24 px-6 text-center border-b border-border-main bg-primary">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 block">Our Domain</span>
          <h1 className="text-5xl md:text-7xl font-heading font-medium leading-[1.1] text-text-main mb-8">
            Industry Expertise.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mx-auto max-w-2xl font-body font-light">
            We deliver highly specialized compliance and structural solutions tailored to the unique regulatory demands of your sector.
          </p>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-24 bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-12 md:gap-16">
            {industries.map((industry) => (
              <div key={industry.id} className="group flex flex-col md:flex-row md:items-start gap-6 md:gap-16 pb-12 md:pb-16 border-b border-border-main last:border-0 last:pb-0">
                <span className="text-4xl md:text-5xl font-mono text-text-muted font-light group-hover:text-accent transition-colors duration-500">
                  {industry.id}
                </span>
                <div className="flex-grow">
                  <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main mb-6">
                    {industry.name}
                  </h2>
                  <p className="text-xl text-text-muted font-light leading-relaxed max-w-3xl mb-8">
                    {industry.desc}
                  </p>
                  <Link to="/contact" className="inline-flex items-center text-sm font-bold text-accent hover:text-text-main transition-colors gap-2 uppercase tracking-wider">
                    Discuss Your Sector <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-secondary border-t border-border-main">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-medium mb-8 text-text-main">Require specialized insight?</h2>
          <p className="text-text-muted mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Our advisory team is equipped to handle complex compliance structures across all major corporate sectors.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-widest text-white bg-text-main hover:bg-accent transition-colors duration-500 rounded-none">
            Schedule a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}
