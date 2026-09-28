import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from '../../data/services';
import { Landmark, BarChart2, Users, Shield, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { useTheme } from '../../utils/ThemeContext';

const iconMap = {
  Landmark: Landmark,
  BarChart2: BarChart2,
  Users: Users,
  Shield: Shield,
  CheckCircle2: CheckCircle2,
  TrendingUp: TrendingUp,
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export default function Services() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const isDark = false; // Forced light for service catalogue
  const th = {
    pageBg: '#F8F8F6',
    sectionBg: '#FFFFFF',
    cardBg: '#FFFFFF',
    cardBorder: '#E5E7EB',
    cardBorderHover: '#C79A45',
    cardHoverBg: '#FBF5E8',
    heading: '#0B172A',
    body: '#667085',
    accent: '#C79A45',
    iconBg: '#FBF5E8',
    iconColor: '#C79A45',
    tabBg: '#FFFFFF',
    tabBorder: '#E5E7EB',
    tabText: '#475467',
    tabHoverBg: '#FBF5E8',
    tabHoverText: '#172033',
    tabHoverBorder: '#C79A45'
  };

  const displayedCategories = categoryFilter
    ? serviceCategories.filter(c => c.id === categoryFilter)
    : serviceCategories;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: th.pageBg }}>

      {/* ── Institutional Hero Section ── */}
      <section style={{
        backgroundColor: '#F8F8F6',
        paddingTop: '6rem', paddingBottom: '4.5rem',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ maxWidth: '44rem' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em',
                textTransform: 'uppercase', color: '#C79A45', marginBottom: '1rem', display: 'block',
                fontWeight: 600
              }}>
                Our Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, color: '#0B172A', marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              {categoryFilter && displayedCategories.length > 0
                ? displayedCategories[0].title
                : 'All Services & Packages'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ fontSize: '1.05rem', color: '#475467', lineHeight: '1.65', marginBottom: '2rem' }}
            >
              {categoryFilter && displayedCategories.length > 0
                ? displayedCategories[0].description
                : 'Complete professional assistance for company registration, GST & tax registrations, trademark protection, and all types of government licensing across India.'}
            </motion.p>

            {categoryFilter && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                    color: '#C79A45', border: '1px solid #C79A45',
                    padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-md)',
                    transition: 'background-color 160ms ease, border-color 160ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FBF5E8'; e.currentTarget.style.borderColor = '#C79A45'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#C79A45'; }}
                >
                  ← Back to All Services
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Category Navigation Bar ── */}
      {!categoryFilter && (
        <section style={{ background: '#F2F6FA', borderBottom: '1px solid #E5E7EB', padding: '1.25rem 0' }}>
          <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {serviceCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                style={{
                  fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '-0.01em',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${th.tabBorder}`,
                  color: th.tabText,
                  background: th.tabBg,
                  whiteSpace: 'nowrap',
                  transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = th.tabHoverBg; e.currentTarget.style.color = th.tabHoverText; e.currentTarget.style.borderColor = th.tabHoverBorder; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = th.tabBg; e.currentTarget.style.color = th.tabText; e.currentTarget.style.borderColor = th.tabBorder; }}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Services Catalog & Matrix ── */}
      <section style={{ padding: '5rem 0 6rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ padding: '0 clamp(1rem, 5vw, 2rem)' }}>

          {/* Filtered Category View */}
          {categoryFilter && displayedCategories.length > 0 ? (
            <motion.div
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}
            >
              {displayedCategories[0].services.map((service) => (
                <motion.div key={service.id} variants={FADE_UP} style={{ display: 'flex', height: '100%' }}>
                  <Link
                    to={`/services/${service.slug}`}
                    style={{ 
                      display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                      backgroundColor: th.cardBg,
                      border: `1px solid ${th.cardBorder}`,
                      boxShadow: '0 4px 16px rgba(16,24,40,0.04)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '1.75rem',
                      textDecoration: 'none',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = th.cardHoverBg; e.currentTarget.style.borderColor = th.cardBorderHover; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,24,40,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = th.cardBg; e.currentTarget.style.borderColor = th.cardBorder; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isDark ? '0 8px 32px -8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.04)'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: th.accent }}>
                        Estimated Time
                      </span>
                      {service.timeline && (
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: '#667085' }}>
                          {service.timeline}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: th.heading, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.875rem', color: th.body, lineHeight: '1.6', flexGrow: 1, marginBottom: '1.75rem' }}>
                      {service.shortDesc}
                    </p>

                    <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#667085', display: 'block', fontFamily: 'var(--font-body)' }}>Package Fee</span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#172033' }}>{service.fees || 'Transparent Pricing'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: th.heading, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        View Details <ArrowRight size={13} style={{ color: th.accent }} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* All Categories View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
              {displayedCategories.map((category, catIdx) => {
                const IconComponent = iconMap[category.icon] || CheckCircle2;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Discipline Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: '42px', height: '42px', backgroundColor: th.iconBg, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <IconComponent size={20} style={{ color: th.iconColor }} />
                        </div>
                        <div>
                          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: th.heading, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                            {category.title}
                          </h2>
                          <p style={{ fontSize: '0.875rem', color: th.body }}>{category.description}</p>
                        </div>
                      </div>
                      <Link
                        to={`/services?category=${category.id}`}
                        style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: th.accent, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        View Category <ArrowRight size={13} />
                      </Link>
                    </div>

                    {/* Services within this Discipline */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {category.services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1.125rem 1.25rem',
                            background: '#FFFFFF',
                            border: `1px solid ${th.cardBorder}`,
                            borderRadius: 'var(--radius-lg)',
                            transition: 'background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                            gap: '1rem',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = th.cardBorderHover; e.currentTarget.style.backgroundColor = th.cardHoverBg; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,24,40,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = th.cardBorder; e.currentTarget.style.backgroundColor = th.sectionBg; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#172033', letterSpacing: '-0.01em' }}>{service.title}</span>
                          <ArrowRight size={14} style={{ color: th.accent, flexShrink: 0 }} />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ── Retainer Advisory Bottom Banner ── */}
      <section style={{
        backgroundColor: '#0B172A',
        padding: '5rem 0',
        borderTop: 'none'
      }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
          <span className="section-label">Expert Consultation</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Need Help Choosing the Right Service?
          </h2>
          <p style={{ color: '#AAB4C5', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.65' }}>
            Our team of qualified professionals will help you figure out the exact registrations and government licences needed for your business — from company formation to trademarks, GST, and sector-specific permits.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold" style={{ 
              padding: '0.875rem 2rem', 
              fontSize: '0.9375rem',
              backgroundColor: '#C79A45',
              color: '#ffffff',
              borderRadius: '100px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}>
              Talk to an Expert <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ 
              padding: '0.875rem 1.75rem', 
              fontSize: '0.9375rem',
              backgroundColor: 'transparent',
              color: '#ffffff',
              borderRadius: '100px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
