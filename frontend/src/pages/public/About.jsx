import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Landmark, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>
      
      {/* ── Institutional Hero Section ── */}
      <section style={{
        backgroundColor: 'var(--color-navy)',
        paddingTop: '6.5rem', paddingBottom: '5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '52rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', display: 'block',
              fontWeight: 600
            }}>
              The Advisory Group
            </span>
            
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.06,
              color: '#ffffff',
              marginBottom: '1.75rem',
              letterSpacing: '-0.03em'
            }}>
              Statutory precision engineered for <span style={{ color: 'var(--color-gold)' }}>Indian enterprises.</span>
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', maxWidth: '58ch' }}>
              Sterling Advisory is a leading professional services firm of experienced Senior Corporate Advisors and Legal Counsel, helping businesses manage company registration, GST & tax compliance, labor law filings, and trademark protection across India.
            </p>
          </div>

          {/* Institutional Practice Metrics */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginTop: '4.5rem', paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>PAN-India</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginTop: '4px' }}>28 States & 8 Union Territories</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>Experienced Specialists</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginTop: '4px' }}>Senior Advisors & Legal Counsel</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>Fixed Upfront Pricing</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginTop: '4px' }}>Zero hidden charges or surprises</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>100% Online</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginTop: '4px' }}>Secure digital document process</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fiduciary Philosophy ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="grid-about-hero">
            <div style={{ borderTop: '2px solid var(--color-gold)', paddingTop: '1.25rem' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>Our Mission</span>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
                We believe that a successful business starts with strong legal foundations and 100% regulatory compliance.
              </h2>
              <div className="grid-about-cols" style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                <p>
                  Setting up and running a business in India comes with strict rules under the Ministry of Corporate Affairs, GST Council, and tax authorities. Using generic online templates can lead to serious legal and financial issues. At Sterling Advisory, we avoid automated shortcuts and ensure every filing is done right.
                </p>
                <p>
                  Instead, we provide personalized support for company registration, tax filings, and trademark defense. Every document and application is carefully reviewed by experienced Senior Corporate Advisors and Professional Counsel to ensure zero rejections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-secondary)', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-label">How We Work</span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '-0.02em' }}>
              Our Core Principles
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-primary)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '1.25rem', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Transparency</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>Complete Clarity & Transparency</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: '1.65' }}>
                We explain complex corporate laws and tax rules in simple, practical terms. You will always know your filing deadlines, exact government fees, and compliance requirements upfront.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-primary)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '1.25rem', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Accuracy</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>Flawless Accuracy & Execution</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: '1.65' }}>
                From Private Limited company registrations to complex GST and trademark filings, we maintain strict quality standards. Every document and tax return undergoes thorough double-checking by our senior experts.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-primary)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '1.25rem', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Long-Term Partnership</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>Reliable Ongoing Support</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: '1.65' }}>
                We don't treat our clients like one-time transactions. Our team works as your trusted long-term partner, handling your compliance and legal paperwork at every stage of your business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing Call to Representation ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-navy)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <span className="section-label">Get Started</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Partner with trusted <br />
            <span style={{ color: 'var(--color-gold)' }}>legal & tax advisors.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.65', maxWidth: '46ch', margin: '0 auto 2.5rem' }}>
            Schedule a consultation with our experienced team to discuss your company registration, GST & tax compliance, or trademark protection needs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">
              Talk to an Expert <ArrowRight size={15} />
            </Link>
            <Link to="/services" className="btn-ghost">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
