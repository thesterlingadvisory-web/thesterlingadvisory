import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Instantly snap to top on route change, overriding Lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    
    // Fallback for native
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, lenis]);

  return null;
}
