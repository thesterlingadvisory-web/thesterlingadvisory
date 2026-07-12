import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, FileText, Share2, Printer, CheckCircle2 } from 'lucide-react';

const ARTICLES_DATA = {
  '2026-corporate-governance-framework': {
    title: 'The 2026 Corporate Governance Code: Strategic Re-Architecture for Indian Enterprises',
    category: 'Statutory Governance & Law',
    date: 'Quarter 3 // 2026 Mandate',
    author: 'Adv. Deep Kalra, Senior Corporate Counsel & Practice Lead',
    readTime: '12 Min Read • Formal Legal Memorandum',
    summary: 'The Ministry of Corporate Affairs (MCA) has enforced stringent compliance audits for private limited entities exceeding ₹10 Crore in annual turnover. This memorandum outlines required board restructurings, digital secretarial records, and director indemnification structures.',
    sections: [
      {
        heading: '1. The Expansion of Mandatory Secretarial Audits',
        body: 'Under recent government notifications, private companies must now maintain proper digital records of all board resolutions, share transfers, and related-party transactions within 14 business days. Old-style paper minutes and backdated signing can now result in heavy penalties under Sections 118 and 205.'
      },
      {
        heading: '2. Director Personal Liability & Protection',
        body: 'A major change in 2026 rules is that non-executive directors can now be held personally liable when GST mismatches or provident fund delays occur. Companies must clearly document which directors are responsible for what duties, protecting non-executive directors from operational liability.'
      },
      {
        heading: '3. Action Plan for Upcoming Quarterly Filings',
        body: 'We recommend all businesses complete a thorough internal review before the AOC-4 and MGT-7 filing deadlines. Key steps include verifying DIR-3 KYC for all directors, checking Form BEN-2 for beneficial ownership compliance, and updating all company registers at your registered office.'
      }
    ],
    takeaways: [
      'Immediate digital migration of all secretarial board minutes.',
      'Execution of Director Indemnity Agreements before quarterly closing.',
      'Mandatory reconciliation of Form BEN-2 (Significant Beneficial Ownership).'
    ]
  }
};

export default function InsightDetail() {
  const { slug } = useParams();
  const article = ARTICLES_DATA[slug] || {
    title: 'Statutory Memorandum & Corporate Advisory Report',
    category: 'Corporate Advisory Briefing',
    date: 'Current Fiscal Period',
    author: 'Sterling Advisory Senior Practice Council',
    readTime: '8 Min Read • Formal Legal Memorandum',
    summary: 'This proprietary research briefing examines essential regulatory mandates, statutory compliance updates, and corporate restructuring strategies for mid-to-large Indian enterprises.',
    sections: [
      {
        heading: '1. Regulatory Scope & Statutory Applicability',
        body: 'In accordance with prevailing Ministry of Corporate Affairs regulations and tax enforcement circulars, organizations must continuously assess their structural positioning. Proactive compliance not only prevents punitive interest and legal entanglements but also enhances enterprise valuation during institutional due diligence.'
      },
      {
        heading: '2. Implementation Framework for Executive Boards',
        body: 'To achieve 100% statutory integrity, company management must establish a recurring internal audit schedule covering GST reconciliations, labor welfare compliance, and ROC annual filings. Our practice assists corporate boards in establishing automated secretarial monitoring protocols.'
      }
    ],
    takeaways: [
      'Quarterly compliance reconciliation across direct and indirect taxation.',
      'Regular updating of statutory corporate registers and ROC documentation.',
      'Retaining specialized Corporate Counsel for complex transactions.'
    ]
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)', paddingBottom: '6rem' }}>
      
      {/* Top Breadcrumb Header */}
      <div style={{ backgroundColor: 'var(--color-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingTop: '6.5rem', paddingBottom: '3.5rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Link
            to="/insights"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold)',
              textDecoration: 'none', marginBottom: '2rem', fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase', letterSpacing: '0.08em'
            }}
          >
            <ArrowLeft size={14} /> Return to Statutory Research Hub
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
              color: 'var(--color-navy)', backgroundColor: 'var(--color-gold)',
              padding: '3px 10px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase'
            }}>
              {article.category}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
              // {article.date} • {article.readTime}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Authored by: <span style={{ color: 'var(--color-gold)' }}>{article.author}</span>
            </span>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => window.print()}
                title="Print Official Memorandum"
                style={{
                  padding: '6px 12px', background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)',
                  color: '#ffffff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Printer size={13} /> Print Memorandum
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Memorandum Body */}
      <div style={{ maxWidth: '64rem', margin: '4rem auto 0', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
        
        {/* Executive Summary Box */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(223, 186, 115, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.25rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 20px rgba(13, 21, 39, 0.03)'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700,
            color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.12em',
            display: 'block', marginBottom: '0.75rem'
          }}>
            Executive Summary
          </span>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-navy)', lineHeight: '1.65', fontWeight: 600, margin: 0 }}>
            {article.summary}
          </p>
        </div>

        {/* Sections Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3.5rem' }}>
          {article.sections.map((sec, idx) => (
            <div key={idx}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.65rem',
                fontWeight: 750,
                color: 'var(--color-navy)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                {sec.heading}
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.75',
                margin: 0
              }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Action Checkpoints */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(13, 21, 39, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 20px rgba(13, 21, 39, 0.03)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 750, color: 'var(--color-navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--color-gold-dark)' }} /> Key Action Steps
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {article.takeaways.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.5', fontWeight: 500 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-gold-dark)', flexShrink: 0, marginTop: '2px' }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultation Retainer Box */}
        <div style={{
          backgroundColor: 'var(--color-navy)',
          border: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(1rem, 5vw, 3rem)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
            Need a Compliance Audit for Your Company?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '50ch', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            Our Senior Corporate Advisors and legal counsel conduct confidential compliance reviews and help restructure your filings within 48 hours.
          </p>
          <Link to="/contact" className="btn-gold" style={{ display: 'inline-flex' }}>
            Get a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>

      </div>

    </div>
  );
}
