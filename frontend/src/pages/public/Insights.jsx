import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';

const featuredInsight = {
  id: 'featured',
  category: 'Business Law & Compliance',
  date: 'July 2026',
  title: 'New 2026 Corporate Compliance Rules: What Every Business Owner Must Know',
  desc: 'A complete breakdown of the updated MCA compliance requirements, director responsibilities, and what private limited companies need to do right now to stay fully compliant.',
  slug: '2026-corporate-governance-framework'
};

const insights = [
  {
    id: 1,
    category: 'International Tax',
    date: 'August 05, 2026',
    title: 'Cross-Border Mergers: How to Handle GST and Customs When Expanding Abroad',
    slug: 'cross-border-mergers-tax-strategies'
  },
  {
    id: 2,
    category: 'Trademark & IP',
    date: 'July 28, 2026',
    title: 'How to Protect Your Software, Code, and Digital Products Under Indian Law',
    slug: 'protecting-digital-assets'
  },
  {
    id: 3,
    category: 'Foreign Investment',
    date: 'July 15, 2026',
    title: 'FDI in Healthcare & Biotech: Navigating RBI and CDSCO Approvals Step by Step',
    slug: 'fdi-healthcare-regulatory'
  },
  {
    id: 4,
    category: 'Startup Finance',
    date: 'June 30, 2026',
    title: 'Seed to Series B: How to Structure Your Cap Table and ESOP Pool Correctly',
    slug: 'structuring-entity-venture-capital'
  },
  {
    id: 5,
    category: 'Company Compliance',
    date: 'June 18, 2026',
    title: 'Director Liability: What Company Directors Are Personally Responsible For',
    slug: 'directors-liability-board-decisions'
  },
  {
    id: 6,
    category: 'Labour & Employment',
    date: 'June 05, 2026',
    title: 'Hiring Remote Employees Across States? Here Is Your Complete Compliance Guide',
    slug: 'workforce-contracts-remote-economy'
  }
];

export default function Insights() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>
      
      {/* ── Institutional Header Section ── */}
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
              Insights & Guides
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
              Insights, Guides & Updates
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65' }}>
              Clear, practical business guides, tax compliance updates, and legal advice written by our Senior Corporate Advisors and Legal Counsel.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Quarterly Report Card ── */}
      <section style={{ padding: '5rem 0 3rem', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 2rem' }}>
          <Link to={`/insights/${featuredInsight.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div
              className="card-premium"
              style={{
                padding: '3.5rem',
                backgroundColor: 'var(--color-navy)',
                border: '1px solid rgba(223,186,115,0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
                  color: 'var(--color-navy)', backgroundColor: 'var(--color-gold)',
                  padding: '4px 10px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase'
                }}>
                  {featuredInsight.category}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
                  // {featuredInsight.date}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                maxWidth: '36ch'
              }}>
                {featuredInsight.title}
              </h2>

              <p style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.65',
                maxWidth: '65ch',
                marginBottom: '2.5rem'
              }}>
                {featuredInsight.desc}
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold)' }}>
                Read Full Guide <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Publications Matrix Grid ── */}
      <section style={{ padding: '3rem 0 6rem', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 2rem' }}>
          <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
            <span className="section-label" style={{ marginBottom: '0.25rem' }}>All Guides & Articles</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '-0.02em' }}>
              Latest Articles & Resources
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {insights.map((article) => (
              <Link
                key={article.id}
                to={`/insights/${article.slug}`}
                className="card-premium"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontFamily: 'var(--font-mono)' }}>
                    {article.date}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.4, marginBottom: '2rem', flexGrow: 1, letterSpacing: '-0.01em' }}>
                  {article.title}
                </h4>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Read Article <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Executive Briefing Subscription Card ── */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-navy)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '46rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <span className="section-label">Stay Updated</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Subscribe to Business & Tax Updates
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.65' }}>
            Get important updates on corporate tax changes, annual filing deadlines, and business compliance straight to your inbox.
          </p>
          <form onSubmit={e => { e.preventDefault(); alert('Thank you! You have subscribed to our newsletter.'); }} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '440px', margin: '0 auto' }}>
            <input 
              type="email" 
              placeholder="Enter your work email address..." 
              style={{
                flexGrow: 1, padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontSize: '0.875rem', outline: 'none'
              }}
              required
            />
            <button type="submit" className="btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
