import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Building2, Cpu, Stethoscope, ShoppingBag, Landmark } from 'lucide-react';

const industries = [
  {
    id: '01',
    name: 'Venture & Deeptech SaaS',
    icon: Cpu,
    desc: 'From cross-border holding company architectures to proprietary software copyright and ESOP structuring, we protect hyper-growth tech enterprises across multi-stage equity rounds.',
    metrics: 'IP Prosecution • ESOP Pools • DPIIT Tax Holiday'
  },
  {
    id: '02',
    name: 'Pharmaceutical & Life Sciences',
    icon: Stethoscope,
    desc: 'Navigating CDSCO drug manufacturing approvals, clinical trial compliance, and multi-jurisdictional pharmacy distribution licenses under strict state medical regulations.',
    metrics: 'CDSCO Licensing • GMP Audits • State Drug Permits'
  },
  {
    id: '03',
    name: 'Infrastructure & Real Estate Trusts',
    icon: Building2,
    desc: 'Specialized statutory governance for Real Estate Investment Trusts (REITs), commercial zoning compliance, environmental CTE/CTO permits, and project SPV structuring.',
    metrics: 'Pollution Control • RERA Filings • Municipal Zoning'
  },
  {
    id: '04',
    name: 'Omnichannel Commerce & Retail',
    icon: ShoppingBag,
    desc: 'Complete statutory registration frameworks covering multi-state Principal Place of Business GST enrollments, FSSAI central licenses, and Legal Metrology packaging compliance.',
    metrics: 'Multi-State GST • FSSAI Central • Packaged Commodities'
  },
  {
    id: '05',
    name: 'Fintech & Capital Markets',
    icon: Landmark,
    desc: 'Rigorous regulatory adherence and compliance frameworks for NBFCs, payment aggregators, and wealth management firms operating under RBI and SEBI statutory mandates.',
    metrics: 'RBI Compliance • LEI Allotment • Anti-Money Laundering'
  }
];

export default function Industries() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>
      
      {/* ── Institutional Header Section ── */}
      <section style={{
        backgroundColor: 'var(--color-navy)',
        paddingTop: '6.5rem', paddingBottom: '5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ maxWidth: '48rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', display: 'block',
              fontWeight: 600
            }}>
              Domain Specialization
            </span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em'
            }}>
              Sector-Specific Statutory Counsel
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65' }}>
              Every industry operates under a distinct web of ministerial mandates and state regulations. We engineer tailored compliance and licensing structures engineered specifically for your commercial sector.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sector Matrix List ── */}
      <section style={{ padding: '6rem 0', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="card-premium grid-industry-card"
                  style={{
                    padding: '2.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px', height: '48px',
                      backgroundColor: 'var(--color-navy)',
                      border: '1px solid rgba(223,186,115,0.3)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={22} style={{ color: 'var(--color-gold)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>
                      {industry.id} //
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '-0.02em', margin: 0 }}>
                      {industry.name}
                    </h2>
                    
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.65', margin: 0 }}>
                      {industry.desc}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-navy)', fontWeight: 600 }}>
                        Key Services: <span style={{ color: 'var(--color-text-muted)' }}>{industry.metrics}</span>
                      </span>

                      <Link
                        to="/contact"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.04em', color: 'var(--color-gold-dark)',
                          transition: 'color 160ms ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-navy)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-gold-dark)'}
                      >
                        Get Industry Consultation <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Call to Specialization Banner ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-navy)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <span className="section-label">Sector Advisory Briefing</span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Require specialized sector representation?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.65', maxWidth: '44ch', margin: '0 auto 2.5rem' }}>
            Our Senior Corporate Advisors and Corporate Counsel execute sector-specific licensing audits and compliance charters within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">
              Schedule Sector Intake <ArrowRight size={15} />
            </Link>
            <Link to="/services" className="btn-ghost">
              Inspect All Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
