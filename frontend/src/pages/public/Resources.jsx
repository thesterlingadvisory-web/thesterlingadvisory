import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Download, Calendar, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

const RESOURCES_LIST = [
  {
    id: 'ROC-2026',
    title: 'Statutory Annual ROC Compliance Schedule & Filing Deadlines (FY 2026-27)',
    category: 'Secretarial Calendar • Ministry of Corporate Affairs',
    desc: 'Comprehensive matrix detailing mandatory filing dates for Form AOC-4 (Financial Statements), Form MGT-7/7A (Annual Return), and DIR-3 KYC for Private Limited Companies and LLPs.',
    type: 'Official Statutory Guide • PDF/Excel Archive'
  },
  {
    id: 'FDI-VAL',
    title: 'Cross-Border Share Valuation & Pricing Guidelines under RBI FEMA Regulation 20',
    category: 'Foreign Direct Investment • Capital Markets',
    desc: 'Practitioner whitepaper on Discounted Cash Flow (DCF) statutory valuation rules for foreign venture capital allocations, right issues, and overseas direct investment (ODI).',
    type: 'Technical Practice Whitepaper • 18 Pages'
  },
  {
    id: 'GST-AUDIT',
    title: 'Multi-State GST Annual Reconciliation & GSTR-9/9C Audit Checkpoints',
    category: 'Indirect Taxation & GST Council Rules',
    desc: 'Step-by-step audit framework utilized by our senior practice teams to reconcile Input Tax Credit (ITC) mismatches between GSTR-2B and financial general ledgers.',
    type: 'Audit Checklist & Reconciliation Macro'
  },
  {
    id: 'ESOP-TRUST',
    title: 'Direct and Indirect Tax Implications of Employee Stock Option Plans (ESOPs)',
    category: 'Executive Compensation • Income Tax Act 1961',
    desc: 'A comparative breakdown of Section 17(2)(vi) perquisite taxation upon exercise versus Section 45 capital gains taxation upon disposal for startup employees.',
    type: 'Tax Advisory Memorandum • 12 Pages'
  }
];

export default function Resources() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>
      
      {/* ── Institutional Header Section ── */}
      <section style={{
        backgroundColor: 'var(--color-navy)',
        paddingTop: '6.5rem', paddingBottom: '5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ maxWidth: '52rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', display: 'block',
              fontWeight: 600
            }}>
              Client Knowledge Repositories
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
              Statutory Resources & Tools
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65' }}>
              Curated registration guides, government licence checklists, and technical whitepapers engineered by our qualified professionals to empower your business setup decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Resource Repository Grid ── */}
      <section style={{ padding: '6rem 0', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {RESOURCES_LIST.map((item) => (
              <div
                key={item.id}
                className="card-premium flex-resource-card"
                style={{
                  padding: '2.5rem',
                }}
              >
                <div style={{ flexGrow: 1, maxWidth: '54rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 600,
                      color: 'var(--color-gold)', backgroundColor: 'var(--color-navy)',
                      padding: '3px 10px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase'
                    }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontFamily: 'var(--font-mono)' }}>
                      // {item.id}
                    </span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h2>

                  <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-navy)', fontWeight: 600 }}>
                    <FileText size={15} style={{ color: 'var(--color-gold-dark)' }} />
                    <span>Format: {item.type}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexShrink: 0, alignSelf: 'center' }}>
                  <Link
                    to="/contact"
                    className="btn-gold"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Download size={15} /> Request Client Copy
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Consultation CTA Banner ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-navy)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <span className="section-label">Custom Statutory Solutions</span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Require bespoke compliance restructuring?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.65', maxWidth: '44ch', margin: '0 auto 2.5rem' }}>
            Our advisory desk models complex multi-state corporate structures, transfer pricing benchmarks, and joint venture shareholder charters upon request.
          </p>
          <Link to="/contact" className="btn-gold">
            Consult a Senior Practice Lead <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
