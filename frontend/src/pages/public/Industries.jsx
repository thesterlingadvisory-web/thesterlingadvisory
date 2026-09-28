import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowRight, ShoppingBag, Factory, Stethoscope, Monitor, Leaf } from 'lucide-react';

const industriesData = [
  {
    id: 1,
    title: 'E-commerce, D2C & Retail',
    icon: ShoppingBag,
    desc: 'For online sellers, D2C brands, retailers and marketplace businesses selling products across India.',
    tags: ['Company Registration', 'GST Registration', 'Trademark & Brand Protection', 'FSSAI / Product Licences', 'Import Export Code'],
    cta: 'Explore E-commerce & Retail',
    link: '/services'
  },
  {
    id: 2,
    title: 'Manufacturing & Engineering',
    icon: Factory,
    desc: 'For manufacturers, factories, engineering businesses and growing industrial companies.',
    tags: ['Company Registration', 'GST & Tax Compliance', 'MSME / Udyam', 'Factory & Labour Registrations', 'Industrial Licences'],
    cta: 'Explore Manufacturing',
    link: '/services'
  },
  {
    id: 3,
    title: 'Healthcare & Pharmaceuticals',
    icon: Stethoscope,
    desc: 'For clinics, healthcare businesses, pharma companies, medical suppliers and health-focused businesses.',
    tags: ['Company Registration', 'GST Registration', 'Drug / Sector Licences', 'Trademark & IP', 'Labour Compliance'],
    cta: 'Explore Healthcare & Pharma',
    link: '/services'
  },
  {
    id: 4,
    title: 'IT, Software & Digital Services',
    icon: Monitor,
    desc: 'For software companies, IT firms, agencies, consultants, SaaS businesses and digital service providers.',
    tags: ['Company Registration', 'GST Registration', 'Trademark & IP', 'Contracts & Compliance', 'Import Export / IEC'],
    cta: 'Explore IT & Digital',
    link: '/services'
  },
  {
    id: 5,
    title: 'Renewable Energy, EV & Clean Technology',
    icon: Leaf,
    desc: 'For solar, EV, clean-energy, battery, charging and sustainability-focused businesses.',
    tags: ['Company Registration', 'GST & Tax Compliance', 'MSME / Udyam', 'Sector Licences', 'Government Registrations'],
    cta: 'Explore Clean Technology',
    link: '/services'
  }
];

export default function Industries() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#F8F8F6' }}>
      
      {/* 1. HERO SECTION — DARK */}
      <section style={{ backgroundColor: '#07101F', padding: '6rem 0 5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'block', textAlign: 'center' }}>
                INDUSTRIES WE SERVE
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch', textAlign: 'center' }}>
                Business Support for Growing Industries
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#AAB4C5', lineHeight: '1.65', marginBottom: '2.5rem', maxWidth: '60ch', textAlign: 'center' }}>
                From starting a new business to managing registrations, licences and ongoing compliance, Sterling Advisory helps businesses across India's growing industries handle the regulatory side with confidence.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/contact" style={{ 
                  padding: '0.875rem 2rem', fontSize: '0.9375rem', backgroundColor: '#C79A45', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', boxShadow: '0 8px 24px -6px rgba(199, 154, 69, 0.4)'
                }}>
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <a href="#industries" style={{ 
                  padding: '0.875rem 1.75rem', fontSize: '0.9375rem', backgroundColor: 'transparent', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Explore Industries
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. INTRODUCTION — LIGHT */}
      <section id="industries" style={{ backgroundColor: '#F8F8F6', padding: '5rem 0' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal delay={100}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', padding: '4px 12px', backgroundColor: '#FBF5E8', borderRadius: '99px', textAlign: 'center' }}>
                OUR INDUSTRIES
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0B172A', marginBottom: '1rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                We Help Businesses Across Growing Sectors
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475467', lineHeight: '1.65', maxWidth: '64ch', margin: '0 auto', textAlign: 'center' }}>
                Every industry has different registrations, licences and compliance requirements. We help businesses understand what they need and handle the process from start to finish.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FIVE INDUSTRY CARDS — LIGHT */}
      <section style={{ backgroundColor: '#F8F8F6', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          {/* Card Grid: Desktop 3+2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {industriesData.slice(0, 3).map((ind, i) => (
              <Reveal key={ind.id} delay={i * 100}>
                <IndustryCard industry={ind} />
              </Reveal>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}>
            {industriesData.slice(3, 5).map((ind, i) => (
              <Reveal key={ind.id} delay={(i + 3) * 100}>
                <IndustryCard industry={ind} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. "HOW WE HELP" SECTION — DARK */}
      <section style={{ backgroundColor: '#0B172A', padding: '6rem 0' }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                HOW WE HELP
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', textAlign: 'center' }}>
                From Starting Up to Staying Compliant
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2rem' }}>
              {[
                { step: '01', title: 'Start Your Business', desc: 'Company formation and initial registrations.' },
                { step: '02', title: 'Get the Required Registrations', desc: 'GST, MSME, licences and other registrations.' },
                { step: '03', title: 'Protect Your Business', desc: 'Trademark, contracts and compliance support.' },
                { step: '04', title: 'Stay Compliant', desc: 'Ongoing filings, renewals and advisory support.' }
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid rgba(199, 154, 69, 0.3)', paddingLeft: '1.25rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#C79A45', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{item.step}</div>
                  <h3 style={{ fontSize: '1.125rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: '#AAB4C5', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. INDUSTRY-SPECIFIC SUPPORT — LIGHT */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '5rem 0', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0B172A', marginBottom: '1rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                Not Sure What Your Business Needs?
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475467', lineHeight: '1.65', marginBottom: '2.5rem', textAlign: 'center' }}>
                Tell us what your business does and our team will help identify the registrations, licences and compliance requirements that may apply.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ 
                  padding: '0.75rem 1.75rem', fontSize: '0.9rem', backgroundColor: '#0B172A', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                  whiteSpace: 'nowrap'
                }}>
                  Talk to an Expert <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" style={{ 
                  padding: '0.75rem 1.5rem', fontSize: '0.9rem', backgroundColor: 'transparent', color: '#0B172A',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                  whiteSpace: 'nowrap', border: '1px solid #0B172A'
                }}>
                  Chat on WhatsApp <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. FINAL CTA — DARK */}
      <section style={{ backgroundColor: '#07101F', padding: '6rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                GET STARTED
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.15, textAlign: 'center' }}>
                Let's Get Your Business Set Up Right
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#AAB4C5', marginBottom: '2.5rem', lineHeight: '1.65', textAlign: 'center' }}>
                Speak with our team about registrations, licences and compliance for your business.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ 
                  padding: '0.875rem 2rem', fontSize: '0.9375rem', backgroundColor: '#C79A45', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', boxShadow: '0 8px 24px -6px rgba(199, 154, 69, 0.4)'
                }}>
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" style={{ 
                  padding: '0.875rem 1.75rem', fontSize: '0.9375rem', backgroundColor: '#111C31', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

function IndustryCard({ industry }) {
  const Icon = industry.icon;
  return (
    <Link to={industry.link} style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-xl)',
      padding: '2rem', textDecoration: 'none',
      boxShadow: '0 4px 16px rgba(16,24,40,0.04)',
      transition: 'all 200ms ease'
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C79A45'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(16,24,40,0.08)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,24,40,0.04)'; }}
    >
      <div style={{ width: '48px', height: '48px', backgroundColor: '#FBF5E8', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <Icon size={24} style={{ color: '#C79A45' }} />
      </div>
      
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#0B172A', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
        {industry.title}
      </h2>
      
      <p style={{ fontSize: '0.9375rem', color: '#667085', lineHeight: '1.6', marginBottom: '2rem', flexGrow: 1 }}>
        {industry.desc}
      </p>
      
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0B172A', display: 'block', marginBottom: '0.75rem' }}>
          Key Services
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {industry.tags.map((tag, i) => (
            <span key={i} style={{ padding: '0.35rem 0.75rem', backgroundColor: '#F2F6FA', color: '#475467', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, color: '#C79A45', letterSpacing: '0.02em' }}>
        {industry.cta} <ArrowRight size={15} />
      </div>
    </Link>
  );
}
