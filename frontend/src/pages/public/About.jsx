import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowRight, MapPin, Briefcase, FileCheck, RefreshCw, CheckCircle2, ShieldCheck, Building2, Store, Monitor, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#F8F8F6' }}>
      
      {/* 2 & 3. HERO SECTION + TRUST PANEL (DARK) */}
      <section style={{ backgroundColor: '#07101F', paddingTop: '8rem', paddingBottom: '6rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Hero Left */}
            <Reveal>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block' }}>
                ABOUT STERLING ADVISORY
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: '16ch' }}>
                Helping Businesses Get Started, <span style={{ color: '#C79A45' }}>Stay Compliant</span> & Grow
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#AAB4C5', lineHeight: '1.65', marginBottom: '2.5rem', maxWidth: '52ch' }}>
                Sterling Advisory helps businesses across India with company registration, GST, trademarks, licences and ongoing compliance — with clear guidance and professional support at every step.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ 
                  padding: '0.875rem 2rem', fontSize: '0.9375rem', backgroundColor: '#C79A45', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', boxShadow: '0 8px 24px -6px rgba(199, 154, 69, 0.4)'
                }}>
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <Link to="/services" style={{ 
                  padding: '0.875rem 1.75rem', fontSize: '0.9375rem', backgroundColor: 'transparent', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Explore Our Services <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            {/* Hero Right — Trust Panel */}
            <Reveal delay={200}>
              <div style={{ backgroundColor: '#0B172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1.25rem', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {[
                    { icon: MapPin, title: 'PAN-INDIA', desc: 'Businesses Across India' },
                    { icon: Briefcase, title: 'EXPERIENCED', desc: 'Professional Advisory Support' },
                    { icon: FileCheck, title: 'TRANSPARENT', desc: 'Clear Fees & Process' },
                    { icon: RefreshCw, title: 'END-TO-END', desc: 'From Registration to Compliance' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(199, 154, 69, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <item.icon size={20} style={{ color: '#C79A45' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: '#AAB4C5' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 4. WHO WE ARE (LIGHT) */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', padding: '4px 12px', backgroundColor: '#FBF5E8', borderRadius: '99px' }}>
                  WHO WE ARE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0B172A', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '16ch' }}>
                  A Practical Partner for Your Business
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '0.5rem' }}>
                <p style={{ fontSize: '1.125rem', color: '#475467', lineHeight: '1.7' }}>
                  Running a business involves more than just building a product or serving customers. Registrations, tax requirements, licences and ongoing compliance also need attention.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#475467', lineHeight: '1.7' }}>
                  Sterling Advisory helps businesses handle these requirements in a simple and structured way. From setting up a new business to managing registrations and compliance as it grows, our team provides practical support at every stage.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. WHAT WE DO (LIGHT #F2F6FA) */}
      <section style={{ backgroundColor: '#F2F6FA', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Reveal>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                  WHAT WE DO
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0B172A', letterSpacing: '-0.02em', textAlign: 'center' }}>
                  Business Support, All in One Place
                </h2>
              </div>
            </Reveal>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { num: '01', title: 'Business Setup', desc: 'Company, LLP and business registrations.' },
              { num: '02', title: 'GST & Tax', desc: 'GST registration, filings and tax-related support.' },
              { num: '03', title: 'Trademark & IP', desc: 'Protect your business name, logo and brand.' },
              { num: '04', title: 'Licences & Registrations', desc: 'Industry-specific licences and government registrations.' },
              { num: '05', title: 'MSME & Startup', desc: 'Udyam, Startup India and other business registrations.' },
              { num: '06', title: 'Ongoing Compliance', desc: 'Regular filings, renewals and compliance support.' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ 
                  backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '1rem', border: '1px solid #E5E7EB',
                  height: '100%', display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#C79A45', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                    {item.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B172A', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: '#667085', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR APPROACH (DARK) */}
      <section style={{ backgroundColor: '#0B172A', padding: '6rem 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block' }}>
              HOW WE WORK
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
              Simple Process. Professional Support.
            </h2>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {[
              { num: '01', title: 'Understand Your Business', desc: 'We first understand your business, structure and requirements.' },
              { num: '02', title: 'Identify What You Need', desc: 'We identify the registrations, licences and compliance requirements that apply to you.' },
              { num: '03', title: 'Prepare & File', desc: 'Our team helps prepare the documents and handles the required filing process.' },
              { num: '04', title: 'Stay on Track', desc: 'We help with follow-ups, renewals and ongoing compliance requirements.' }
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(199, 154, 69, 0.3)', backgroundColor: '#0B172A', color: '#C79A45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: '#AAB4C5', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CORE PRINCIPLES (LIGHT) */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Reveal>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                  WHAT YOU CAN EXPECT
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0B172A', letterSpacing: '-0.02em', textAlign: 'center' }}>
                  The Way We Work
                </h2>
              </div>
            </Reveal>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { num: '01', title: 'CLARITY', desc: 'We explain requirements, timelines and fees in simple language.' },
              { num: '02', title: 'ACCURACY', desc: 'We carefully review documents and applications before submission.' },
              { num: '03', title: 'TRANSPARENCY', desc: 'You know what is required, what it costs and what happens next.' },
              { num: '04', title: 'LONG-TERM SUPPORT', desc: 'We remain available as your business grows and new compliance needs arise.' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '1rem', border: '1px solid #E5E7EB', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <span style={{ color: '#C79A45', fontWeight: 700, fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>{item.num}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B172A', letterSpacing: '0.02em' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: '#475467', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CLIENTS CHOOSE US (DARK) */}
      <section style={{ backgroundColor: '#07101F', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                WHY STERLING ADVISORY
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', textAlign: 'center' }}>
                Built Around Your Business
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            {[
              { title: 'Business-Focused', desc: 'We understand that compliance should support your business, not slow it down.' },
              { title: 'Clear Communication', desc: 'We explain complex requirements in straightforward language.' },
              { title: 'Professional Review', desc: 'Documents and applications are carefully checked before submission.' },
              { title: 'One Place for Multiple Needs', desc: 'From company registration and GST to trademarks, licences and compliance support.' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={24} style={{ color: '#C79A45', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '1rem', color: '#AAB4C5', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 & 10. WHO WE SERVE & PAN INDIA (LIGHT) */}
      <section style={{ backgroundColor: '#F8F8F6', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                  WHO WE SERVE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0B172A', letterSpacing: '-0.02em', textAlign: 'center' }}>
                  Supporting Businesses at Every Stage
                </h2>
              </div>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '6rem' }}>
            {[
              { icon: Building2, title: 'STARTUPS', desc: 'For founders setting up a new business.' },
              { icon: Store, title: 'MSMEs', desc: 'For small and growing businesses managing registrations and compliance.' },
              { icon: MapPin, title: 'GROWING COMPANIES', desc: 'For businesses expanding into new states, products or markets.' },
              { icon: GraduationCap, title: 'PROFESSIONALS', desc: 'For consultants, agencies and independent professionals.' },
              { icon: ShieldCheck, title: 'ESTABLISHED BUSINESSES', desc: 'For businesses needing ongoing registrations, licences and compliance support.' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem 1.5rem', height: '100%', textAlign: 'center', boxShadow: '0 4px 16px rgba(16,24,40,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ width: '56px', height: '56px', backgroundColor: '#FBF5E8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={28} style={{ color: '#C79A45' }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0B172A', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#667085', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pan India Component */}
          <div style={{ backgroundColor: '#F2F6FA', borderRadius: '1.5rem', padding: 'clamp(3rem, 6vw, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                  SERVING BUSINESSES ACROSS INDIA
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0B172A', marginBottom: '1.5rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                  Support Wherever Your Business Operates
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#475467', lineHeight: '1.65', maxWidth: '56ch', margin: '0 auto', textAlign: 'center' }}>
                  From Delhi to Mumbai, Bengaluru to Chennai and across India, Sterling Advisory helps businesses manage registrations, licences and compliance requirements.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA (DARK) */}
      <section style={{ backgroundColor: '#0B172A', padding: '6rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'inline-block', textAlign: 'center' }}>
                GET STARTED
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.15, textAlign: 'center' }}>
                Let's Take Care of the Compliance Side of Your Business.
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#AAB4C5', marginBottom: '2.5rem', lineHeight: '1.65', textAlign: 'center', maxWidth: '52ch' }}>
                Tell us what you are starting, growing or working on. Our team can help you understand the registrations, licences and compliance requirements you need.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ 
                  padding: '0.875rem 2rem', fontSize: '0.9375rem', backgroundColor: '#C79A45', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', boxShadow: '0 8px 24px -6px rgba(199, 154, 69, 0.4)'
                }}>
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
                <Link to="/services" style={{ 
                  padding: '0.875rem 1.75rem', fontSize: '0.9375rem', backgroundColor: 'transparent', color: '#FFFFFF',
                  borderRadius: '100px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Explore All Services <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
