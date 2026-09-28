import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

const featuredInsight = {
  id: 'featured',
  category: 'BUSINESS COMPLIANCE',
  date: 'August 24, 2026',
  title: 'New Business Compliance Rules: What Business Owners Need to Know',
  desc: 'A simple guide to the registrations, filings and compliance requirements that businesses should keep track of.',
  slug: 'new-business-compliance-rules'
};

const CATEGORIES = [
  'All',
  'Business Setup',
  'GST & Tax',
  'Compliance',
  'Trademark & IP',
  'Startup',
  'Licences',
  'Labour & HR',
  'Industry Updates'
];

const insights = [
  {
    id: 1,
    category: 'Business Setup',
    date: 'August 12, 2026',
    title: 'How to Register a Private Limited Company in India',
    desc: 'A simple step-by-step guide to choosing the right business structure and completing the basic registrations.',
    slug: 'register-private-limited-company'
  },
  {
    id: 2,
    category: 'GST & Tax',
    date: 'July 28, 2026',
    title: 'Understanding GST Registration for Small Businesses',
    desc: 'Who needs GST registration, what documents are required and how the process works.',
    slug: 'understanding-gst-registration'
  },
  {
    id: 3,
    category: 'Trademark & IP',
    date: 'July 15, 2026',
    title: 'How to Protect Your Brand with a Trademark',
    desc: 'Understand why trademark registration matters and how it protects your business name and brand.',
    slug: 'protect-brand-trademark'
  },
  {
    id: 4,
    category: 'Startup',
    date: 'June 30, 2026',
    title: 'Business Registrations Every Startup Needs',
    desc: 'Basic legal and compliance checklist to ensure your new startup is officially ready to operate.',
    slug: 'startup-business-registrations'
  },
  {
    id: 5,
    category: 'Licences',
    date: 'June 18, 2026',
    title: 'FSSAI Registration for Food Businesses',
    desc: 'Everything you need to know about getting an FSSAI licence for your restaurant, cloud kitchen or FMCG brand.',
    slug: 'fssai-registration-guide'
  },
  {
    id: 6,
    category: 'Labour & HR',
    date: 'June 05, 2026',
    title: 'Basic Labour Compliance for Growing Businesses',
    desc: 'A simple overview of PF, ESI, and basic labour registrations you need when hiring your first employees.',
    slug: 'basic-labour-compliance'
  }
];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredInsights = activeCategory === 'All' 
    ? insights 
    : insights.filter(i => i.category === activeCategory);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#F2F6FA' }}>
      
      {/* 2. HERO SECTION — DARK */}
      <section style={{ backgroundColor: '#07101F', padding: '6rem 0 5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <div style={{ maxWidth: '64rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'block' }}>
                INSIGHTS & GUIDES
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}>
                Business Guides, Updates & Practical Advice
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#AAB4C5', lineHeight: '1.65', maxWidth: '52ch' }}>
                Simple and practical information to help you start, manage and grow your business with confidence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FEATURED ARTICLE SECTION — LIGHT */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal delay={100}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', padding: '4px 12px', backgroundColor: '#FBF5E8', borderRadius: '99px' }}>
              Featured Guide
            </span>
            <Link to={`/insights/${featuredInsight.slug}`} style={{ display: 'block', textDecoration: 'none', outline: 'none' }}>
              <div style={{
                backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1.25rem',
                padding: 'clamp(2rem, 4vw, 3.5rem)', boxShadow: '0 8px 32px rgba(16,24,40,0.05)',
                transition: 'all 200ms ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '2rem'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C79A45'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(16,24,40,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(16,24,40,0.05)'; }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C79A45', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                    {featuredInsight.category}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0B172A', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2, maxWidth: '36ch' }}>
                    {featuredInsight.title}
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: '#667085', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '64ch' }}>
                    {featuredInsight.desc}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, color: '#0B172A', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Read Full Guide <ArrowRight size={15} style={{ color: '#C79A45' }} />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. ARTICLE CATEGORIES */}
      <section style={{ backgroundColor: '#F2F6FA', padding: '4rem 0 2rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475467' }}>Explore by Topic:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 600,
                        backgroundColor: isActive ? '#0B172A' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#475467',
                        border: isActive ? '1px solid #0B172A' : '1px solid #E5E7EB',
                        borderRadius: '100px', cursor: 'pointer', transition: 'all 150ms ease'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. ARTICLE LIBRARY */}
      <section style={{ backgroundColor: '#F2F6FA', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0B172A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                Latest Guides & Articles
              </h2>
              <p style={{ fontSize: '1rem', color: '#475467' }}>
                Useful information on business registration, tax, compliance, licences and other important business topics.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredInsights.length > 0 ? filteredInsights.map((article, i) => (
              <Reveal key={article.id} delay={i * 50}>
                <Link to={`/insights/${article.slug}`} style={{
                  display: 'flex', flexDirection: 'column', height: '100%',
                  backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem',
                  padding: '1.75rem', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(16,24,40,0.04)',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C79A45'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(16,24,40,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,24,40,0.04)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#C79A45', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#667085', fontWeight: 500 }}>
                      {article.date}
                    </span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.9375rem', color: '#667085', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {article.desc}
                  </p>
                  
                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#0B172A', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Read Article <ArrowRight size={14} style={{ color: '#C79A45' }} />
                  </div>
                </Link>
              </Reveal>
            )) : (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', gridColumn: '1 / -1' }}>
                <p style={{ color: '#475467' }}>No articles found for this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. “NEED HELP?” CONVERSION SECTION — DARK */}
      <section style={{ backgroundColor: '#0B172A', padding: '5rem 0' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                NEED HELP?
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.15, textAlign: 'center' }}>
                Not Sure What Your Business Needs?
              </h2>
              <p style={{ color: '#AAB4C5', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.65', textAlign: 'center' }}>
                Our team can help you understand the registrations, licences and compliance requirements applicable to your business.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ 
                  padding: '0.875rem 2rem', fontSize: '0.9375rem', backgroundColor: '#C79A45', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap'
                }}>
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <Link to="/services" style={{ 
                  padding: '0.875rem 1.75rem', fontSize: '0.9375rem', backgroundColor: 'transparent', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Explore Our Services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. COMPACT NEWSLETTER SECTION — LIGHT */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '5rem 0', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                STAY UPDATED
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0B172A', marginBottom: '0.75rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                Get Useful Business Updates
              </h2>
              <p style={{ color: '#475467', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.65', textAlign: 'center' }}>
                Important business, tax and compliance updates — explained simply.
              </p>
              
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', width: '100%', maxWidth: '28rem', margin: '0 auto', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required
                  style={{ 
                    flexGrow: 1, padding: '0.875rem 1.25rem', borderRadius: '100px', 
                    border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', fontSize: '0.9375rem',
                    outline: 'none', color: '#172033'
                  }} 
                  onFocus={e => e.currentTarget.style.borderColor = '#C79A45'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
                <button type="submit" style={{ 
                  padding: '0 1.75rem', backgroundColor: '#0B172A', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'background-color 200ms ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#172033'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0B172A'}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
