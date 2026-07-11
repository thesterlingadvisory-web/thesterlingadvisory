import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from '../../data/services';
import { Landmark, BarChart2, Users, Shield, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

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

  const displayedCategories = categoryFilter
    ? serviceCategories.filter(c => c.id === categoryFilter)
    : serviceCategories;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>

      {/* ── Institutional Hero Section ── */}
      <section style={{
        backgroundColor: 'var(--color-navy)',
        paddingTop: '6rem', paddingBottom: '4.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '44rem' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.02em',
                textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', display: 'block',
                fontWeight: 600
              }}>
                Our Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              {categoryFilter && displayedCategories.length > 0
                ? displayedCategories[0].title
                : 'All Services & Packages'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', marginBottom: '2rem' }}
            >
              {categoryFilter && displayedCategories.length > 0
                ? displayedCategories[0].description
                : 'Complete professional assistance for company registration, GST and tax compliance, labor law filings, and trademark protection.'}
            </motion.p>

            {categoryFilter && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                    color: 'var(--color-gold)', border: '1px solid rgba(223,186,115,0.3)',
                    padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-md)',
                    transition: 'background-color 160ms ease, border-color 160ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(223,186,115,0.1)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(223,186,115,0.3)'; }}
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
        <section style={{ background: 'var(--color-secondary)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '1.25rem 0' }}>
          <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {serviceCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                style={{
                  fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '-0.01em',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: 'var(--color-text-main)',
                  background: 'transparent',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-navy)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'var(--color-navy)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-main)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Services Catalog & Matrix ── */}
      <section style={{ padding: '5rem 0 6rem', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 2rem' }}>

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
                    className="card-premium"
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-gold-dark)' }}>
                        Estimated Time
                      </span>
                      {service.timeline && (
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-light)' }}>
                          {service.timeline}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.75rem' }}>
                      {service.shortDesc}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-light)', display: 'block', fontFamily: 'var(--font-body)' }}>Package Fee</span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>{service.fees || 'Fixed Package Fee'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-navy)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        View Details <ArrowRight size={13} style={{ color: 'var(--color-gold-dark)' }} />
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
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: '42px', height: '42px', backgroundColor: 'var(--color-navy)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <IconComponent size={20} style={{ color: 'var(--color-gold)' }} />
                        </div>
                        <div>
                          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                            {category.title}
                          </h2>
                          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{category.description}</p>
                        </div>
                      </div>
                      <Link
                        to={`/services?category=${category.id}`}
                        style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}
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
                            background: 'var(--color-secondary)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            borderRadius: 'var(--radius-lg)',
                            transition: 'background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                            gap: '1rem',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(223,186,115,0.4)'; e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-navy)', letterSpacing: '-0.01em' }}>{service.title}</span>
                          <ArrowRight size={14} style={{ color: 'var(--color-gold-dark)', flexShrink: 0 }} />
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
        backgroundColor: 'var(--color-navy)',
        padding: '5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <span className="section-label">Expert Consultation</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Need Help Choosing the Right Service?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.65' }}>
            Our team of experienced Senior Corporate Advisors and Legal Counsel will help you figure out the exact registrations and tax setup needed for your business.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">
              Talk to an Expert <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/918448803143" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
