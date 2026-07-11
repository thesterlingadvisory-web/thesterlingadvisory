import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Cpu, Building2, Stethoscope, ShoppingBag, Landmark, CheckCircle2 } from 'lucide-react';

const SECTOR_DATA = {
  '01': {
    name: 'Venture & Deeptech SaaS',
    icon: Cpu,
    statutoryBody: 'Ministry of Electronics & IT (MeitY) • DPIIT • RBI FEMA',
    desc: 'From cross-border holding company architectures to proprietary software copyright and ESOP structuring, we protect hyper-growth tech enterprises across multi-stage equity rounds.',
    mandates: [
      'Cross-Border Flip Structuring & RBI FEMA Valuation Compliance.',
      'Software Copyright & Algorithmic Patent Defense across US/IN jurisdictions.',
      'DPIIT Startup Recognition & 3-Year 100% Tax Holiday Enrolment.',
      'Employee Stock Option Plan (ESOP) Governance & Trust Setup.'
    ],
    sla: 'Expert review within 24–48 hours'
  },
  '02': {
    name: 'Pharmaceutical & Life Sciences',
    icon: Stethoscope,
    statutoryBody: 'CDSCO • State Licensing Authorities • National Medical Commission',
    desc: 'Navigating CDSCO drug manufacturing approvals, clinical trial compliance, and multi-jurisdictional pharmacy distribution licenses under strict state medical regulations.',
    mandates: [
      'Central CDSCO Drug Manufacturing & Import Licensing.',
      'Good Manufacturing Practice (GMP) & WHO Statutory Audits.',
      'Medical Device Classification & Bio-Safety Regulatory Filings.',
      'Multi-State Wholesale Drug & Pharmacy Retail Representation.'
    ],
    sla: 'Dedicated expert assigned within 24 hours'
  },
  '03': {
    name: 'Infrastructure & Real Estate Trusts',
    icon: Building2,
    statutoryBody: 'State RERA Authorities • Ministry of Environment & Forests • Town Planning',
    desc: 'Specialized statutory governance for Real Estate Investment Trusts (REITs), commercial zoning compliance, environmental CTE/CTO permits, and project SPV structuring.',
    mandates: [
      'RERA Project Registration, Escrow Audits, & Statutory Disclosures.',
      'State Pollution Control Board Consent to Establish (CTE) / Operate (CTO).',
      'Special Purpose Vehicle (SPV) Structuring for Joint Development Agreements.',
      'Municipal Land Zoning Re-Classification & Title Verification.'
    ],
    sla: 'Senior Corporate Advisor / Legal Counsel on-site review within 72 hours'
  }
};

export default function IndustryDetail() {
  const { id } = useParams();
  const sector = SECTOR_DATA[id] || {
    name: 'Corporate Sector & Industry Practice',
    icon: ShieldCheck,
    statutoryBody: 'Applicable Ministry of Corporate Affairs (MCA) & State Authorities',
    desc: 'We engineer specialized statutory compliance, tax mitigation, and regulatory licensing frameworks tailored precisely to your industry’s operational demands.',
    mandates: [
      'End-to-End Statutory Registration & ROC Secretarial Governance.',
      'Direct & Indirect Tax Architecture (GST, Corporate Income Tax, DTAA).',
      'Ministry Licensing & Regulatory Representation before State Authorities.',
      'Corporate Restructuring, Mergers, & Demerger Audits.'
    ],
    sla: 'Senior expert assessment within 24 hours'
  };

  const IconComponent = sector.icon;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)', paddingBottom: '6rem' }}>
      
      {/* Top Header */}
      <div style={{ backgroundColor: 'var(--color-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingTop: '6.5rem', paddingBottom: '4.5rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
          <Link
            to="/industries"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold)',
              textDecoration: 'none', marginBottom: '2rem', fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase', letterSpacing: '0.08em'
            }}
          >
            <ArrowLeft size={14} /> Return to Sector Specializations
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '44px', height: '44px', background: 'rgba(223,186,115,0.15)',
              border: '1px solid var(--color-gold)', borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <IconComponent size={22} style={{ color: 'var(--color-gold)' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Statutory Sector Dossier // {sector.statutoryBody}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 4.8vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            {sector.name}
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.65', maxWidth: '58ch' }}>
            {sector.desc}
          </p>
        </div>
      </div>

      {/* Main Dossier Content */}
      <div style={{ maxWidth: '64rem', margin: '4rem auto 0', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '4rem' }}>
          
          {/* Statutory Retainer Scope */}
          <div style={{
            backgroundColor: 'var(--color-secondary)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem'
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              What We Handle for This Industry
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sector.mandates.map((mandate, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '1.05rem', color: '#ffffff', lineHeight: '1.6' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{mandate}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Level Agreement Guarantee */}
          <div style={{
            backgroundColor: 'rgba(223,186,115,0.08)',
            border: '1px solid var(--color-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem 2.25rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Our Commitment
              </span>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>
                {sector.sla}
              </span>
            </div>
            <Link to="/contact" className="btn-gold">
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
