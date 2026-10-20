import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceCategories } from '../../data/services';

export default function ServiceSearchBar({ isMobile = false, onCloseMobile }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Flatten all services from serviceCategories
  const allServices = useMemo(() => {
    const list = [];
    serviceCategories.forEach((cat) => {
      cat.services.forEach((s) => {
        list.push({
          id: s.id,
          title: s.title,
          slug: s.slug,
          shortDesc: s.shortDesc || '',
          category: cat.title,
          categoryIcon: cat.icon || 'Building2',
        });
      });
    });
    return list;
  }, []);

  // Smart Prefix & Relevance Scoring (P-start first, PR-start next, alphabetical within tiers)
  const matchingServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const getScore = (service) => {
      const title = service.title.toLowerCase();

      // Tier 0: Title starts directly with query (e.g. 'private' -> 'Private Limited...')
      if (title.startsWith(q)) return 0;

      // Tier 1: A word inside title starts with query (e.g. 'pr' -> 'Sole Proprietorship...')
      const words = title.split(/[\s\-&/(),]+/);
      if (words.some((w) => w.startsWith(q))) return 1;

      // Tier 2: Title contains query anywhere
      if (title.includes(q)) return 2;

      // Tier 3: Category or Slug starts with query
      if (service.category.toLowerCase().startsWith(q) || service.slug.toLowerCase().startsWith(q)) return 3;

      // Tier 4: Category or Slug contains query
      if (service.category.toLowerCase().includes(q) || service.slug.toLowerCase().includes(q)) return 4;

      // Tier 5: Short description contains query
      if (service.shortDesc && service.shortDesc.toLowerCase().includes(q)) return 5;

      return 99; // No match
    };

    const scored = allServices
      .map((service) => ({ service, score: getScore(service) }))
      .filter((item) => item.score < 99);

    // Primary sort: Score (Prefix matches first: Tier 0 -> Tier 1 -> Tier 2...)
    // Secondary sort: Alphabetical by title (A to Z)
    scored.sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return a.service.title.localeCompare(b.service.title);
    });

    // Return exactly the top 5 smartest options
    return scored.slice(0, 5).map((item) => item.service);
  }, [query, allServices]);

  // Handle global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when matching list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [matchingServices]);

  // Keyboard navigation within dropdown
  const handleInputKeyDown = (e) => {
    if (!isOpen || matchingServices.length === 0) {
      if (e.key === 'ArrowDown' && matchingServices.length > 0) {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % matchingServices.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + matchingServices.length) % matchingServices.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingServices[selectedIndex]) {
        handleSelectService(matchingServices[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectService = (service) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/services/${service.slug}`);
    if (onCloseMobile) onCloseMobile();
  };

  // Helper to highlight matching text in title
  const renderHighlightedTitle = (title, q) => {
    if (!q) return title;
    const lowerTitle = title.toLowerCase();
    const lowerQ = q.toLowerCase();
    const idx = lowerTitle.indexOf(lowerQ);
    if (idx === -1) return title;

    const before = title.substring(0, idx);
    const match = title.substring(idx, idx + q.length);
    const after = title.substring(idx + q.length);

    return (
      <>
        {before}
        <span style={{ color: '#DFBA73', fontWeight: 700, backgroundColor: 'rgba(223, 186, 115, 0.15)', padding: '0 2px', borderRadius: '3px' }}>
          {match}
        </span>
        {after}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: isMobile ? '100%' : 'auto',
      }}
    >
      {/* Search Input Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: isMobile ? '44px' : '38px',
          width: isMobile ? '100%' : isFocused || query ? '280px' : '220px',
          background: isFocused ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.05)',
          border: isFocused ? '1px solid #C79A45' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isFocused ? '0 0 16px rgba(199, 154, 69, 0.25), 0 2px 8px rgba(0,0,0,0.3)' : 'none',
          borderRadius: '99px',
          padding: '0 12px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Search
          size={14}
          style={{
            color: isFocused ? '#DFBA73' : 'rgba(255, 255, 255, 0.45)',
            flexShrink: 0,
            transition: 'color 200ms ease',
          }}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search services..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#FFFFFF',
            minWidth: 0,
          }}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '2px',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: isMobile ? 0 : 0,
              left: isMobile ? 0 : 'auto',
              width: isMobile ? '100%' : '380px',
              backgroundColor: 'rgba(11, 20, 36, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(199, 154, 69, 0.3)',
              borderRadius: '14px',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65), 0 0 1px rgba(255, 255, 255, 0.15)',
              overflow: 'hidden',
              zIndex: 10000,
            }}
          >


            {/* List of 5 Alphabetical Results */}
            {matchingServices.length > 0 ? (
              <div style={{ padding: '0.375rem 0' }}>
                {matchingServices.map((service, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={service.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => handleSelectService(service)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '0.625rem 1rem',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'rgba(223, 186, 115, 0.12)' : 'transparent',
                        borderLeft: isSelected ? '3px solid #DFBA73' : '3px solid transparent',
                        transition: 'all 120ms ease',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.35,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {renderHighlightedTitle(service.title, query.trim())}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '2px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              color: isSelected ? '#DFBA73' : 'rgba(255, 255, 255, 0.45)',
                              fontWeight: 500,
                            }}
                          >
                            {service.category}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: isSelected ? '#DFBA73' : 'rgba(255, 255, 255, 0.25)',
                          flexShrink: 0,
                          transform: isSelected ? 'translateX(2px)' : 'none',
                          transition: 'all 120ms ease',
                        }}
                      >
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                  No matching services found for <span style={{ color: '#DFBA73' }}>"{query}"</span>
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px', marginBottom: 0 }}>
                  Need custom advisory? <span onClick={() => { setIsOpen(false); navigate('/contact'); }} style={{ color: '#DFBA73', cursor: 'pointer', textDecoration: 'underline' }}>Talk to an Expert</span>
                </p>
              </div>
            )}


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
