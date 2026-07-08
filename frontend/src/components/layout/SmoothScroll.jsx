import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useReducedMotion } from 'framer-motion';

export default function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, we disable smooth scrolling entirely.
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.08, // Very smooth, premium glide speed
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: false, // Don't hijack native touch scrolling (prevents mobile jank)
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
