import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from '../../data/services';
import { Landmark, BarChart2, Users, Shield, CheckCircle2, TrendingUp, ArrowRight, Search } from 'lucide-react';

const iconMap = {
  Landmark: Landmark,
  BarChart2: BarChart2,
  Users: Users,
  Shield: Shield,
  CheckCircle2: CheckCircle2,
  TrendingUp: TrendingUp,
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Services() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const displayedCategories = categoryFilter
    ? serviceCategories.filter(c => c.id === categoryFilter)
    : serviceCategories;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(223, 186, 115, 0.15), transparent), linear-gradient(180deg, #05080F 0%, #0A0F1D 60%, #05080F 100%)',
        paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', display: 'block',
            }}>
              ✦ Comprehensive Compliance Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.1 }}
          >
            {categoryFilter && displayedCategories.length > 0
              ? displayedCategories[0].title
              : 'Our Services'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto 2rem' }}
          >
            {categoryFilter && displayedCategories.length > 0
              ? displayedCategories[0].description
              : 'Explore our comprehensive suite of registration and compliance services.'}
          </motion.p>

          {categoryFilter && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Link
                to="/services"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--color-gold)', border: '1px solid rgba(223,186,115,0.35)',
                  padding: '0.625rem 1.25rem',
                  transition: 'all 200ms ease',
                }}
              >
                ← View All Services
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Category Pills (when not filtered) ── */}
      {!categoryFilter && (
        <section style={{ background: 'var(--color-secondary)', borderBottom: '1px solid var(--color-border-main)', padding: '1.25rem 1.5rem', overflowX: 'auto' }}>
          <div style={{ maxWidth: '88rem', margin: '0 auto', display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
            {serviceCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                style={{
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--color-border-main)',
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-secondary)',
                  whiteSpace: 'nowrap',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-navy)'; e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-navy)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border-main)'; }}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Services Grid ── */}
      <section style={{ padding: '4rem 1.5rem 6rem', maxWidth: '88rem', margin: '0 auto' }}>

        {/* Filtered: show services in that category */}
        {categoryFilter && displayedCategories.length > 0 ? (
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}
          >
            {displayedCategories[0].services.map((service) => (
              <motion.div key={service.id} variants={FADE_UP} style={{ display: 'flex', height: '100%' }}>
                <Link
                  to={`/services/${service.slug}`}
                  className="card-premium"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem', background: 'var(--color-secondary)', height: '100%' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1875rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.65', flexGrow: 1, marginBottom: '1.5rem' }}>
                    {service.shortDesc}
                  </p>
                  {service.timeline && (
                    <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      ⏱ {service.timeline}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    View Details <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* All categories view */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {displayedCategories.map((category, catIdx) => {
              const IconComponent = iconMap[category.icon] || CheckCircle2;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: catIdx * 0.05 }}
                >
                  {/* Category Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '44px', height: '44px', background: 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent size={20} strokeWidth={1.5} style={{ color: 'var(--color-gold)' }} />
                      </div>
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.125rem' }}>
                          {category.title}
                        </h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{category.description}</p>
                      </div>
                    </div>
                    <Link
                      to={`/services?category=${category.id}`}
                      style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      View All <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Services in this category */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.875rem' }}>
                    {category.services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1rem 1.25rem',
                          background: 'var(--color-secondary)',
                          border: '1px solid var(--color-border-main)',
                          transition: 'all 200ms ease',
                          gap: '0.75rem',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.background = 'rgba(223,186,115,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-main)'; e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-navy)' }}>{service.title}</span>
                        <ArrowRight size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: 'var(--color-navy)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', display: 'block' }}>
            Not Sure What You Need?
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#ffffff', marginBottom: '1rem' }}>
            Speak to Our Advisory Team
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
            We'll assess your situation and recommend the right registrations for free.
          </p>
          <Link to="/contact" className="btn-gold">
            Book Free Consultation <ArrowRight size={15} style={{ marginLeft: '8px' }} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
