import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Home, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem clamp(1rem, 5vw, 2rem)' }}>
      <div style={{ maxWidth: '44rem', width: '100%', textAlign: 'center' }}>
        
        <div style={{
          width: '64px', height: '64px',
          backgroundColor: 'var(--color-secondary)',
          border: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 12px 30px rgba(223, 186, 115, 0.15)'
        }}>
          <ShieldAlert size={30} style={{ color: 'var(--color-gold)' }} />
        </div>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
          Error 404 — Page Not Found
        </span>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem'
        }}>
          Page Not Located in Registry.
        </h1>

        <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', maxWidth: '42ch', margin: '0 auto 2.5rem' }}>
          The requested institutional document or statutory route has been archived, relocated under our 2026 website restructuring, or restricted to authorized practitioners.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-gold">
            <Home size={16} /> Return to Institutional Homepage
          </Link>
          <Link to="/contact" className="btn-ghost">
            <PhoneCall size={16} /> Contact Senior Desk
          </Link>
        </div>

      </div>
    </div>
  );
}
