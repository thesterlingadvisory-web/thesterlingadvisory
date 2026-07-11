import React from 'react';

export default function HomepageBuilder() {
  return (
    <div style={{ padding: '4.5rem 2.5rem', maxWidth: '64rem', margin: '0 auto', color: '#ffffff' }}>
      <div style={{ background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)', padding: '3.5rem 2.5rem', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
          Statutory CMS Module
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Content Architecture Builder
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto', lineHeight: '1.6' }}>
          The dynamic content block engine for institutional page revisions is currently operating in read-only statutory mode.
        </p>
      </div>
    </div>
  );
}
