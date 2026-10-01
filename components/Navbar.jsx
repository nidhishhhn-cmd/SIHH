'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const navLinks = [
    { label: 'Overview', pageIndex: 0 },
    { label: '01 Deficit', pageIndex: 1 },
    { label: '02 Satellite AI', pageIndex: 2 },
    { label: '03 AI Engine', pageIndex: 3 },
    { label: '04 Metallogenic GIS', pageIndex: 4 },
    { label: '05 Strategic Impact', pageIndex: 5 }
  ];

  // Listen for active page changes dispatched by the continuous horizontal slider
  useEffect(() => {
    const handlePageIndex = (e) => {
      if (typeof e.detail?.index === 'number') {
        setActivePageIndex(e.detail.index);
      }
    };
    window.addEventListener('app-page-index', handlePageIndex);
    return () => window.removeEventListener('app-page-index', handlePageIndex);
  }, []);

  const handleNavClick = (link, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    setActivePageIndex(link.pageIndex);
    window.dispatchEvent(new CustomEvent('switch-deck-panel', { detail: { index: link.pageIndex } }));
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <div 
          onClick={(e) => handleNavClick(navLinks[0], e)} 
          className="brand"
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-emblem">Mn</div>
          <div className="brand-text">
            <span className="brand-title">MIN-GEO-AI</span>
            <span className="brand-subtitle">National Manganese Reconnaissance Platform</span>
          </div>
        </div>

        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
        </button>

        <nav className={`site-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activePageIndex === link.pageIndex;
              return (
                <li key={link.label}>
                  <button 
                    onClick={(e) => handleNavClick(link, e)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    style={{
                      background: isActive ? 'var(--earth-rust)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: isActive ? 700 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.45rem 0.8rem',
                      borderRadius: 'var(--radius-xs)',
                      transition: 'all 0.18s ease',
                      fontSize: '0.84rem'
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
