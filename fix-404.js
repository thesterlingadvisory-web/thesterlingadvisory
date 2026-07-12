const fs = require('fs');
const path = require('path');

const notFoundFile = path.join(__dirname, 'frontend', 'src', 'pages', 'public', 'NotFound.jsx');

const premiumNotFound = `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Home, PhoneCall, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--color-navy) 0%, #050a14 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '4rem clamp(1rem, 5vw, 2rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Premium Background Accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(223, 186, 115, 0.03) 0%, rgba(223, 186, 115, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          maxWidth: '44rem', 
          width: '100%', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          width: '72px', height: '72px',
          backgroundColor: 'rgba(223, 186, 115, 0.08)',
          border: '1px solid rgba(223, 186, 115, 0.25)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(223, 186, 115, 0.15)'
        }}>
          <Compass size={32} style={{ color: 'var(--color-gold)' }} />
        </div>

        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.85rem', 
          color: 'var(--color-gold)', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          fontWeight: 700, 
          display: 'block', 
          marginBottom: '1rem' 
        }}>
          Error 404 — Record Not Found
        </span>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          This statutory route doesn't exist.
        </h1>

        <p style={{ 
          fontSize: '1.05rem', 
          color: 'rgba(255,255,255,0.65)', 
          lineHeight: '1.7', 
          maxWidth: '48ch', 
          margin: '0 auto 2.5rem',
          fontFamily: 'var(--font-body)'
        }}>
          The institutional document, service page, or registry route you are looking for has been archived, relocated, or is restricted to authorized practitioners.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/" 
            className="btn-gold" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.875rem 1.5rem', 
              borderRadius: '8px' 
            }}
          >
            <Home size={18} /> Return to Registry Homepage
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.875rem 1.5rem', 
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <PhoneCall size={18} /> Contact Senior Desk
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync(notFoundFile, premiumNotFound, 'utf8');
console.log('Premium 404 page implemented!');
