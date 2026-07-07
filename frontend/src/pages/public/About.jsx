import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 text-center border-b border-border-main bg-primary">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 block">Our Firm</span>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-medium leading-[1.1] text-text-main mb-8">
            Built on Precision. <br/> Defined by Excellence.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mx-auto max-w-2xl font-body font-light">
            Sterling Advisory is a premier corporate consulting firm dedicated to providing definitive registration, tax structuring, and compliance solutions.
          </p>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="py-32 bg-primary px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4 border-t border-border-main pt-6">
              <span className="text-sm font-bold uppercase tracking-widest text-text-muted">The Philosophy</span>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-heading font-medium text-text-main leading-[1.3] mb-8">
                We believe that true corporate dominance is achieved only through absolute structural integrity and uncompromising compliance.
              </h2>
              <div className="text-lg text-text-muted font-light leading-relaxed space-y-6">
                <p>
                  In an increasingly complex regulatory environment, generic solutions are a liability. At Sterling Advisory, we reject the commoditization of corporate law and tax structuring. 
                </p>
                <p>
                  Instead, we engineer bespoke legal and financial frameworks designed to protect assets, minimize liabilities, and accelerate institutional growth for the modern enterprise. Our approach is intensely analytical, meticulously structured, and executed with zero margin for error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-secondary px-6 border-t border-border-main">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main">Our Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            <div className="border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">01</span>
              <h3 className="text-2xl font-heading font-medium mb-4 text-text-main">Absolute Clarity</h3>
              <p className="text-text-muted font-light leading-relaxed">
                We distill complex statutory frameworks into definitive, actionable strategies, ensuring our clients operate with complete certainty.
              </p>
            </div>

            <div className="border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">02</span>
              <h3 className="text-2xl font-heading font-medium mb-4 text-text-main">Flawless Execution</h3>
              <p className="text-text-muted font-light leading-relaxed">
                From intellectual property filings to cross-border entity structuring, we demand perfection in every document and declaration we draft.
              </p>
            </div>

            <div className="border-t border-border-main pt-8">
              <span className="text-xs font-mono text-text-muted mb-4 block">03</span>
              <h3 className="text-2xl font-heading font-medium mb-4 text-text-main">Long-Term Partnership</h3>
              <p className="text-text-muted font-light leading-relaxed">
                We do not view engagements as transactional. We operate as an extension of your executive team, safeguarding your corporate legacy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-primary border-t border-border-main">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-medium mb-8 text-text-main">Secure your corporate future.</h2>
          <p className="text-text-muted mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Align with a firm that treats your compliance and legal structuring with the gravity it deserves.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-widest text-white bg-text-main hover:bg-accent transition-colors duration-500 rounded-none">
            Schedule a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}
