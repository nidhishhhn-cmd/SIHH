'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ProductionGapChart from '@/components/ProductionGapChart';
import SpectralChart from '@/components/SpectralChart';
import ModelBenchmarkChart from '@/components/ModelBenchmarkChart';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import ProspectivitySimulator from '@/components/ProspectivitySimulator';
import dynamic from 'next/dynamic';

const GisMap = dynamic(() => import('@/components/GisMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
      LOADING GEOSPATIAL GIS ENGINE (SAUSAR / DHARWAR / GANGPUR BELTS)...
    </div>
  )
});

export default function HorizontalDeck() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [portalZoomed, setPortalZoomed] = useState(false);
  const isScrollingRef = useRef(false);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const portalZoomedRef = useRef(portalZoomed);
  portalZoomedRef.current = portalZoomed;

  // 6 Continuous Pages matching top navigation exactly:
  const panels = [
    { id: 'overview', number: '00', title: 'Overview', subtitle: 'National Mineral Intelligence Platform' },
    { id: 'deficit', number: '01', title: '01 Deficit', subtitle: 'Strategic Industrial Exposure & 2030 Mandate' },
    { id: 'satellite', number: '02', title: '02 Satellite AI', subtitle: 'Multispectral & DEM Remote Sensing Pipeline' },
    { id: 'engine', number: '03', title: '03 AI Engine', subtitle: 'Live Model Simulator & Spatial Validation' },
    { id: 'gis', number: '04', title: '04 Metallogenic GIS', subtitle: 'High-Resolution Target Reconnaissance' },
    { id: 'impact', number: '05', title: '05 Strategic Impact', subtitle: 'Economic ROI & System Architecture' },
  ];

  const scrollToPanel = (index) => {
    if (index >= 0 && index < panels.length) {
      setActiveTab(index);
      activeTabRef.current = index;
      if (index > 0) {
        setPortalZoomed(true);
        portalZoomedRef.current = true;
      }
    }
  };

  // Broadcast active page index to Navbar
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app-page-index', { detail: { index: activeTab } }));
  }, [activeTab]);

  // Listen for custom navigation switch events from Navbar
  useEffect(() => {
    const handleSwitchPanel = (e) => {
      const idx = e.detail?.index;
      if (typeof idx === 'number' && idx >= 0 && idx < panels.length) {
        scrollToPanel(idx);
      }
    };
    window.addEventListener('switch-deck-panel', handleSwitchPanel);
    return () => window.removeEventListener('switch-deck-panel', handleSwitchPanel);
  }, [panels.length]);

  // Continuous Mouse Wheel Gliding:
  // 1. Initial scroll zooms through "MANGANESE" glyph chamber into the terrain
  // 2. Subsequent scrolls glide continuously: 01 Deficit -> 02 Satellite AI -> 03 AI Engine -> 04 Metallogenic GIS -> 05 Strategic Impact
  useEffect(() => {
    let wheelAccumulator = 0;
    let resetTimer = null;
    let lastTransitionTime = 0;

    const handleWheel = (e) => {
      // Allow pure horizontal gestures on trackpads if user is swiping horizontally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
        return;
      }

      if (['TEXTAREA', 'INPUT'].includes(e.target?.tagName)) {
        return;
      }

      // Always intercept wheel to smoothly transition between the 6 pages
      e.preventDefault();

      const now = Date.now();
      if (isScrollingRef.current || now - lastTransitionTime < 500) {
        return;
      }

      wheelAccumulator += e.deltaY;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        wheelAccumulator = 0;
      }, 150);

      const THRESHOLD = 20;
      const currentIdx = activeTabRef.current;

      if (wheelAccumulator >= THRESHOLD) {
        // SCROLL DOWN
        // If on Overview and glyph hasn't zoomed in yet: DIVE THROUGH MANGANESE!
        if (currentIdx === 0 && !portalZoomedRef.current) {
          isScrollingRef.current = true;
          lastTransitionTime = now;
          wheelAccumulator = 0;
          setPortalZoomed(true);
          portalZoomedRef.current = true;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 650);
          return;
        }

        // Advance to next horizontal page
        if (currentIdx < panels.length - 1) {
          isScrollingRef.current = true;
          lastTransitionTime = now;
          wheelAccumulator = 0;
          const nextIdx = currentIdx + 1;
          setActiveTab(nextIdx);
          activeTabRef.current = nextIdx;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 500);
        }
      } else if (wheelAccumulator <= -THRESHOLD) {
        // SCROLL UP
        // If on Overview and already zoomed in: ZOOM BACK OUT TO MANGANESE!
        if (currentIdx === 0 && portalZoomedRef.current) {
          isScrollingRef.current = true;
          lastTransitionTime = now;
          wheelAccumulator = 0;
          setPortalZoomed(false);
          portalZoomedRef.current = false;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 650);
          return;
        }

        // Go to previous horizontal page
        if (currentIdx > 0) {
          isScrollingRef.current = true;
          lastTransitionTime = now;
          wheelAccumulator = 0;
          const prevIdx = currentIdx - 1;
          setActiveTab(prevIdx);
          activeTabRef.current = prevIdx;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 500);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      clearTimeout(resetTimer);
    };
  }, [panels.length]);

  // Keyboard navigation: Left & Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      const currentIdx = activeTabRef.current;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        scrollToPanel(Math.min(currentIdx + 1, panels.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        scrollToPanel(Math.max(currentIdx - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panels.length]);

  return (
    <div id="horizontal-suite" className="horizontal-deck-wrapper">
      {/* Floating Bottom HUD Navigation Bar */}
      <div className="deck-floating-hud">
        <button
          onClick={() => scrollToPanel(activeTab - 1)}
          disabled={activeTab === 0}
          className="hud-nav-btn"
          aria-label="Previous Page"
          title="Previous Page (Arrow Left or Scroll Up)"
        >
          ‹
        </button>

        <div className="hud-dots">
          {panels.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => scrollToPanel(idx)}
              className={`hud-dot ${activeTab === idx ? 'active' : ''}`}
              title={`${p.number} ${p.title}`}
              aria-label={`Jump to page ${idx + 1}: ${p.title}`}
            />
          ))}
        </div>

        <span className="hud-label tech-mono">
          PAGE 0{activeTab} / 05 // {panels[activeTab].title.toUpperCase()}
        </span>

        <button
          onClick={() => scrollToPanel(activeTab + 1)}
          disabled={activeTab === panels.length - 1}
          className="hud-nav-btn"
          aria-label="Next Page"
          title="Next Page (Arrow Right or Scroll Down)"
        >
          ›
        </button>
      </div>

      {/* Main Horizontal Slider Container with Hardware-Accelerated Track */}
      <div ref={containerRef} className="deck-slider-container">
        <div 
          className="deck-slider-track"
          style={{
            display: 'flex',
            width: `${panels.length * 100}vw`,
            transform: `translate3d(-${activeTab * 100}vw, 0, 0)`,
            transition: 'transform 0.65s cubic-bezier(0.2, 0.9, 0.3, 1)',
            willChange: 'transform'
          }}
        >

          {/* =========================================================================
              PANEL 00: NATIONAL MINERAL INTELLIGENCE OVERVIEW & MANGANESE DIVE
              ========================================================================= */}
          <section className="deck-panel" id="panel-overview" role="tabpanel">
            <div className="panel-container">
              <div className="manganese-portal-wrapper">

                {/* 1. The Typographic MANGANESE Glyph Chamber */}
                <div className={`manganese-glyph-view ${portalZoomed ? 'zoomed' : ''}`}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.35rem 0.85rem', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '0.75rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--earth-rust)', display: 'inline-block', boxShadow: '0 0 10px var(--earth-rust)' }} />
                    <span className="tech-mono" style={{ fontSize: '0.72rem', color: '#f5f4ef', letterSpacing: '0.06em' }}>
                      GOVERNMENT OF INDIA • MINISTRY OF MINES • GSI
                    </span>
                  </div>

                  <h1 className="manganese-word-title">
                    MANGANESE
                  </h1>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#a4b3a2', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span>ATOMIC NO. 25</span>
                    <span>•</span>
                    <span>FERROMANGANESE GRADE &gt;44%</span>
                    <span>•</span>
                    <span>CRITICAL RAW MATERIAL 2030</span>
                  </div>

                  <p style={{ maxWidth: '620px', color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, margin: '0 auto 1.75rem' }}>
                    National spaceborne Earth observation & machine learning platform to discover concealed high-grade manganese deposits across Central India’s Proterozoic mobile belts.
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      onClick={() => {
                        setPortalZoomed(true);
                        portalZoomedRef.current = true;
                      }}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem', fontWeight: 700, borderRadius: '4px', boxShadow: '0 4px 20px rgba(168, 61, 28, 0.4)' }}
                    >
                      <span>Dive Through Glyph Chamber ↓</span>
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.5rem 0.9rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <span style={{ fontSize: '1.1rem' }}>🖱️</span>
                      <span className="tech-mono" style={{ fontSize: '0.75rem', color: '#ffc1a8', fontWeight: 600 }}>
                        SCROLL MOUSE WHEEL DOWN TO DIVE INTO THE PLATFORM
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. The Revealed Sovereign Mission Briefing */}
                <div className={`manganese-briefing-view ${portalZoomed ? 'visible-view' : 'hidden-view'}`}>
                  <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                    <div className="panel-meta-bar" style={{ justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="badge badge-rust">SOVEREIGN MINERAL INTELLIGENCE PLATFORM</span>
                        <span className="panel-tag">MINISTRY OF MINES • GEOLOGICAL SURVEY OF INDIA</span>
                        <span className="panel-tag tech-mono">UNFC-1997 / CRIRSCO STANDARD COMPLIANT</span>
                      </div>
                      <button
                        onClick={() => {
                          setPortalZoomed(false);
                          portalZoomedRef.current = false;
                        }}
                        className="btn"
                        style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)', fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                        title="Replay Manganese Glyph Zoom Dive"
                      >
                        ↺ Replay Glyph Dive
                      </button>
                    </div>
                  </div>

                  {/* Grand Institutional Hero Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #182026 0%, #222b35 60%, #2f231d 100%)',
                    color: '#ffffff',
                    borderRadius: '4px',
                    padding: '1.75rem 2rem',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.08,
                      backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                      pointerEvents: 'none'
                    }} />

                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(168, 61, 28, 0.25)', border: '1px solid rgba(235, 114, 76, 0.4)', padding: '0.25rem 0.65rem', borderRadius: '2px', marginBottom: '0.8rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6937', display: 'inline-block', boxShadow: '0 0 8px #ff6937' }} />
                        <span className="tech-mono" style={{ fontSize: '0.75rem', color: '#ffc1a8', fontWeight: 600, letterSpacing: '0.04em' }}>
                          NATIONAL MANGANESE RECONNAISSANCE SUITE
                        </span>
                      </div>

                      <h1 style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 0.65rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                        From Earth Observation Telemetry to Concealed Critical Mineral Discovery
                      </h1>

                      <p style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1.25rem', maxWidth: '850px' }}>
                        An autonomous spaceborne multispectral exploration pipeline designed for the <strong>Geological Survey of India</strong> and <strong>Ministry of Mines</strong>. Fuses Copernicus Sentinel-2 SWIR-2 spectrometry, Cartosat DEM geomorphology, and zero-leakage spatial machine learning to uncover deep-seated manganese deposits beneath weathered regolith.
                      </p>

                      <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          onClick={() => scrollToPanel(1)}
                          className="btn btn-primary"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem', fontWeight: 700 }}
                        >
                          <span>Next: 01 Deficit Analysis ➔</span>
                        </button>
                        <button
                          onClick={() => scrollToPanel(4)}
                          className="btn"
                          style={{ background: 'rgba(255, 255, 255, 0.12)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.6rem 1.25rem', fontSize: '0.88rem', fontWeight: 600 }}
                        >
                          <span>Direct GIS Workspace Jump ↗</span>
                        </button>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.35)', padding: '0.4rem 0.8rem', borderRadius: '2px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <span style={{ fontSize: '1rem' }}>🖱️</span>
                          <span className="tech-mono" style={{ fontSize: '0.75rem', color: '#ffc1a8', fontWeight: 600 }}>
                            ✦ SCROLL MOUSE WHEEL DOWN TO GLIDE INTO 01 DEFICIT ➔
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Core Architecture Pillars */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div className="card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--earth-rust)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className="badge badge-rust" style={{ fontSize: '0.65rem' }}>STAGE 01 & 02</span>
                        <span className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SENTINEL-2 + LANDSAT</span>
                      </div>
                      <h3 style={{ fontSize: '0.98rem', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                        Multispectral Remote Sensing
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        Isolates diagnostic manganese oxide absorption troughs at 2.19μm (SWIR-2) and structural shear corridors through weathered lateritic cover.
                      </p>
                    </div>

                    <div className="card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--earth-sand)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className="badge badge-sand" style={{ fontSize: '0.65rem' }}>STAGE 03</span>
                        <span className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ROC-AUC: 0.912</span>
                      </div>
                      <h3 style={{ fontSize: '0.98rem', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                        Spatial ML Inference Engine
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        Zero spatial-leakage spatial block cross-validation correlating lithology, DEM slope, and gravity gradients benchmarked against MOIL core logs.
                      </p>
                    </div>

                    <div className="card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--earth-olive)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className="badge badge-olive" style={{ fontSize: '0.65rem' }}>STAGE 04 & 05</span>
                        <span className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>UNFC G4 DOSSIERS</span>
                      </div>
                      <h3 style={{ fontSize: '0.98rem', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>
                        GIS Reconnaissance & ROI
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        Eliminates up to 60% of blind diamond core drilling capex by triaging high-confidence prospective coordinates for mineral block auctions.
                      </p>
                    </div>
                  </div>

                  {/* 4 Sovereign Strategic Facts */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-rust)' }}>
                      <div className="stat-value" style={{ color: 'var(--earth-rust)', fontSize: '1.75rem' }}>42.4%</div>
                      <div className="stat-label">Import Dependency</div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        High-grade manganese imported from Africa & Australia.
                      </p>
                    </div>

                    <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-sand)' }}>
                      <div className="stat-value" style={{ color: 'var(--earth-sand)', fontSize: '1.75rem' }}>₹8,400 Cr</div>
                      <div className="stat-label">Annual Forex Drain</div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        National expenditure on critical mineral import substitution.
                      </p>
                    </div>

                    <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-bronze)' }}>
                      <div className="stat-value" style={{ color: 'var(--earth-bronze)', fontSize: '1.75rem' }}>60%</div>
                      <div className="stat-label">Drilling Capex Saved</div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        By pre-filtering sterile acreage prior to diamond core drilling.
                      </p>
                    </div>

                    <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-olive)' }}>
                      <div className="stat-value" style={{ color: 'var(--earth-olive)', fontSize: '1.75rem' }}>18–24 Mo</div>
                      <div className="stat-label">Recon Timeline Saved</div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        Accelerates greenfield prospecting to commercial G4 lease stage.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
                    Accelerates greenfield prospecting to commercial G4 lease stage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              PANEL 01: NATIONAL DEFICIT & CRITICAL RAW MATERIAL GAP
              ========================================================================= */}
          <section className="deck-panel" id="panel-problem" role="tabpanel">
          <div className="panel-container">
            <div className="panel-header">
              <div className="panel-meta-bar">
                <span className="badge badge-rust">MODULE 01 // CRITICAL RAW MATERIALS</span>
                <span className="panel-tag">MINISTRY OF MINES • GEOLOGICAL SURVEY OF INDIA</span>
                <span className="panel-tag tech-mono">NATIONAL STEEL MISSION 2030</span>
              </div>
              <h2 className="panel-title">
                India’s Manganese Deficit & 2030 Industrial Exposure
              </h2>
              <p className="panel-lead">
                India’s steel target requires <strong>300 MTPA crude steel by 2030</strong> (~14.2 MT manganese ore). Over <strong>42.4% of ferromanganese-grade ore</strong> is imported from South Africa and Australia, draining foreign exchange while domestic deep-seated deposits remain obscured beneath weathered laterite.
              </p>
            </div>

            <div className="panel-grid-2col" style={{ alignItems: 'start', marginTop: '1.25rem' }}>
              <div>
                {/* 4 Core Quantitative Facts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-rust)' }}>
                    <div className="stat-value" style={{ color: 'var(--earth-rust)' }}>42.4%</div>
                    <div className="stat-label">High-Grade Ore Imported</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Metallurgical grade (&gt;44% Mn) imported annually for domestic smelting.
                    </p>
                  </div>
                  <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-sand)' }}>
                    <div className="stat-value" style={{ color: 'var(--earth-sand)' }}>₹8,400 Cr</div>
                    <div className="stat-label">Annual Forex Drain</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Foreign currency drained on import substitution of raw metallurgical ore.
                    </p>
                  </div>
                  <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-bronze)' }}>
                    <div className="stat-value" style={{ color: 'var(--earth-bronze)' }}>70%</div>
                    <div className="stat-label">Blind Drill Waste</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Exploratory boreholes hit sterile ground due to regolith & structural blindness.
                    </p>
                  </div>
                  <div className="stat-card" style={{ borderLeft: '4px solid var(--earth-olive)' }}>
                    <div className="stat-value" style={{ color: 'var(--earth-olive)' }}>14.2 MT</div>
                    <div className="stat-label">2030 Annual Demand</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Required to support infrastructure, rail network, and defence alloy manufacturing.
                    </p>
                  </div>
                </div>

                {/* 2 Critical Bottlenecks */}
                <div className="card" style={{ padding: '1rem', background: 'var(--bg-paper)' }}>
                  <div className="tech-mono" style={{ fontSize: '0.72rem', color: 'var(--earth-rust)', fontWeight: 600 }}>THE CORE BOTTLENECK</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.5 }}>
                    Manganese deposits in Central India (Sausar Belt) are synclinally folded and capped by 10m–30m of barren weathered laterite. Traditional ground exploration cannot "see" through this cover, leading to massive drilling capex waste.
                  </p>
                </div>
              </div>

              {/* Real-time Canvas Supply/Demand Gap Chart */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', margin: 0, color: 'var(--text-primary)' }}>
                      Manganese Supply vs Demand Gap (2020–2035)
                    </h3>
                    <span className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Official Indian Bureau of Mines Data Forecast
                    </span>
                  </div>
                  <span className="badge badge-caution">CRITICAL DEFICIT</span>
                </div>
                <ProductionGapChart />
                <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                  <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--earth-rust)', fontWeight: 600 }}>
                    ✦ Scroll mouse wheel down to glide to Module 02 ➔
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PANEL 02: SATELLITE REMOTE SENSING & SPECTRAL SCIENCE
            ========================================================================= */}
        <section className="deck-panel" id="panel-solution" role="tabpanel">
          <div className="panel-container">
            <div className="panel-header">
              <div className="panel-meta-bar">
                <span className="badge badge-rust">MODULE 02 // SATELLITE METHODOLOGY</span>
                <span className="panel-tag">MULTI-SENSOR EARTH OBSERVATION</span>
                <span className="panel-tag tech-mono">SENTINEL-2 MSI + LANDSAT-9 + CARTOSAT DEM</span>
              </div>
              <h2 className="panel-title">
                The 5-Stage Satellite AI Exploration Architecture
              </h2>
              <p className="panel-lead">
                We combine Copernicus multispectral space telemetry, Cartosat geomorphology, and machine learning to detect diagnostic manganese oxide absorption troughs through weathered caprocks, pre-screening exploration blocks before drilling.
              </p>
            </div>

            <div className="panel-grid-2col" style={{ alignItems: 'start', marginTop: '1.25rem' }}>
              {/* 5-Step Visual Pipeline */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                  End-to-End Technical Workflow
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span className="badge badge-rust" style={{ fontSize: '0.65rem' }}>01 ACQUIRE</span>
                    <span style={{ fontSize: '0.82rem' }}>Sentinel-2 MSI (10m VNIR, 20m SWIR) + Cartosat-1 DEM stereo elevation</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span className="badge badge-sand" style={{ fontSize: '0.65rem' }}>02 PROCESS</span>
                    <span style={{ fontSize: '0.82rem' }}>Sen2Cor BOA surface reflectance conversion + cloud/shadow masking</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span className="badge badge-bronze" style={{ fontSize: '0.65rem' }}>03 EXTRACT</span>
                    <span style={{ fontSize: '0.82rem' }}>Diagnostic SWIR-2 B11/B12 Mn oxide absorption + structural fault lineaments</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span className="badge badge-olive" style={{ fontSize: '0.65rem' }}>04 PREDICT</span>
                    <span style={{ fontSize: '0.82rem' }}>Spatial block cross-validated XGBoost/Random Forest ensemble</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span className="badge badge-caution" style={{ fontSize: '0.65rem' }}>05 TRIAGE</span>
                    <span style={{ fontSize: '0.82rem' }}>UNFC G4 pre-drill target coordinates with estimated overburden depth</span>
                  </div>
                </div>
              </div>

              {/* Spectral Diagnostic Chart */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', margin: 0, color: 'var(--text-primary)' }}>
                      Diagnostic SWIR-2 (2.19μm) Trough
                    </h3>
                    <span className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Pyrolusite ($MnO_2$) Spectral Signature vs Host Quartzite
                    </span>
                  </div>
                  <span className="badge badge-rust">SPECTRAL RATIO</span>
                </div>
                <SpectralChart />
                <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                  <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--earth-rust)', fontWeight: 600 }}>
                    ✦ Scroll mouse wheel down to glide to Module 03 ➔
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PANEL 03: LIVE INTERACTIVE AI SIMULATOR (THE CORE DEMO)
            ========================================================================= */}
        <section className="deck-panel" id="panel-simulator" role="tabpanel">
          <div className="panel-container">
            <div className="panel-header">
              <div className="panel-meta-bar">
                <span className="badge badge-rust">MODULE 03 // PREDICTIVE ENGINE</span>
                <span className="panel-tag">SPATIAL BLOCK CROSS-VALIDATION</span>
                <span className="panel-tag tech-mono">ROC-AUC: 0.912 • ZERO GROUND-LEAKAGE</span>
              </div>
              <h2 className="panel-title">
                Interactive AI Prospectivity Simulator & Benchmarks
              </h2>
              <p className="panel-lead">
                <strong>Live inference engine:</strong> Adjust multispectral band ratios, fault lineament density, and host lithology below to evaluate real-time machine learning prediction and UNFC drill classification.
              </p>
            </div>

            <div className="panel-grid-2col" style={{ alignItems: 'start', marginTop: '1.25rem' }}>
              {/* Left Column: Live Interactive Prospectivity Simulator */}
              <div>
                <ProspectivitySimulator />
              </div>

              {/* Right Column: Model Benchmarks & SHAP Feature Importance */}
              <div>
                <div className="card" style={{ padding: '1rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-primary)' }}>
                      Spatial Cross-Validation Performance
                    </h3>
                    <span className="badge badge-rust">ROC-AUC: 0.912</span>
                  </div>
                  <ModelBenchmarkChart />
                </div>

                <div className="card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-primary)' }}>
                      SHAP Feature Attribution Ranking
                    </h3>
                    <span className="tech-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Top Mineral Predictors</span>
                  </div>
                  <FeatureImportanceChart />
                </div>

                <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                  <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--earth-rust)', fontWeight: 600 }}>
                    ✦ Scroll mouse wheel down to glide to Module 04 ➔
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PANEL 04: INTERACTIVE METALLOGENIC GIS MAP
            ========================================================================= */}
        <section className="deck-panel" id="panel-map" role="tabpanel">
          <div className="panel-container" style={{ maxWidth: '1440px' }}>
            <div className="panel-header">
              <div className="panel-meta-bar">
                <span className="badge badge-rust">MODULE 04 // GEOSPATIAL RECONNAISSANCE</span>
                <span className="panel-tag">LIVE LEAFLET GIS ENGINE</span>
                <span className="panel-tag tech-mono">SAUSAR / DHARWAR / GANGPUR BELTS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>
                  Target Triage & High-Resolution Belt Reconnaissance
                </h2>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <Link href="/map" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                    Open Fullscreen GIS Workspace ↗
                  </Link>
                  <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--earth-rust)', fontWeight: 600 }}>
                    ✦ Scroll mouse wheel down to glide to Module 05 ➔
                  </span>
                </div>
              </div>
              <p className="panel-lead" style={{ marginTop: '0.4rem' }}>
                Multi-layer reconnaissance dashboard: Toggle Satellite Imagery, Geological Formations, Regional Shear Faults, Active MOIL Mines, and AI Pre-Drill Target Clusters with verified coordinates and grade estimates.
              </p>
            </div>

            {/* Embedded Full-Featured GIS Map */}
            <div style={{ marginTop: '0.8rem', border: '1px solid var(--border-medium)', borderRadius: '2px', overflow: 'hidden', background: '#fff' }}>
              <GisMap />
            </div>
          </div>
        </section>

        {/* =========================================================================
            PANEL 05: ECONOMIC IMPACT & DEPLOYMENT ARCHITECTURE
            ========================================================================= */}
        <section className="deck-panel" id="panel-impact" role="tabpanel">
          <div className="panel-container">
            <div className="panel-header">
              <div className="panel-meta-bar">
                <span className="badge badge-rust">MODULE 05 // STRATEGIC VALUE</span>
                <span className="panel-tag">NATIONAL DEPLOYMENT ROADMAP</span>
                <span className="panel-tag tech-mono">UNFC-1997 / CRIRSCO FRAMEWORK</span>
              </div>
              <h2 className="panel-title">
                Economic ROI, UNFC Acceleration & Deployment Architecture
              </h2>
              <p className="panel-lead">
                Built specifically for the Geological Survey of India and Ministry of Mines to cut exploratory drilling waste, accelerate the discovery cycle, and secure national mineral sovereignty.
              </p>
            </div>

            <div className="panel-grid-2col" style={{ alignItems: 'start', marginTop: '1.25rem' }}>
              {/* Quantified Economic ROI */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                  Quantified Value for Ministry of Mines
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
                    <div className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--earth-rust)' }}>EXPLORATORY CAPEX SAVINGS</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹18.5 Cr / 1,000 km²</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                      By pre-screening out 85% sterile acreage before deploying expensive core drill rigs.
                    </p>
                  </div>

                  <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
                    <div className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--earth-sand)' }}>TIMELINE ACCELERATION</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>18–24 Months Saved</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                      Reduces greenfield reconnaissance from years to weeks using automated space AI.
                    </p>
                  </div>

                  <div>
                    <div className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--earth-olive)' }}>IMPORT SUBSTITUTION</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>$320M / Year Forex</div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                      Conserves foreign exchange by unlocking domestic ferromanganese reserves.
                    </p>
                  </div>
                </div>
              </div>

              {/* Operational Integration Architecture */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                  Operational Integration & National Data Architecture
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1px solid var(--border-subtle)', borderRadius: '2px' }}>
                    <div className="tech-mono" style={{ fontSize: '0.65rem', color: 'var(--earth-rust)' }}>GEOSPATIAL INTEROPERABILITY</div>
                    <strong style={{ fontSize: '0.82rem', display: 'block', margin: '0.2rem 0' }}>GSI Bhukosh & ISRO Bhuvan</strong>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>OGC-compliant WMS/WFS map services and GeoTIFF target sync.</p>
                  </div>
                  <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1px solid var(--border-subtle)', borderRadius: '2px' }}>
                    <div className="tech-mono" style={{ fontSize: '0.65rem', color: 'var(--earth-sand)' }}>REGULATORY COMPLIANCE</div>
                    <strong style={{ fontSize: '0.82rem', display: 'block', margin: '0.2rem 0' }}>UNFC-1997 / CRIRSCO</strong>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Automated G4 reconnaissance dossiers for mining lease e-auctions.</p>
                  </div>
                  <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1px solid var(--border-subtle)', borderRadius: '2px' }}>
                    <div className="tech-mono" style={{ fontSize: '0.65rem', color: 'var(--earth-bronze)' }}>SATELLITE PIPELINE</div>
                    <strong style={{ fontSize: '0.82rem', display: 'block', margin: '0.2rem 0' }}>High-Throughput GDAL</strong>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Processes 50,000 km² search corridors with atmospheric BOA correction.</p>
                  </div>
                  <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1px solid var(--border-subtle)', borderRadius: '2px' }}>
                    <div className="tech-mono" style={{ fontSize: '0.65rem', color: 'var(--earth-olive)' }}>GROUND TRUTH RIGOR</div>
                    <strong style={{ fontSize: '0.82rem', display: 'block', margin: '0.2rem 0' }}>Zero Spatial Leakage</strong>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Spatial block cross-validation benchmarked against MOIL core logs.</p>
                  </div>
                </div>

                {/* Return to Top Button */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.8rem', textAlign: 'center' }}>
                  <button
                    onClick={() => scrollToPanel(0)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>↑ Return to Overview</span>
                  </button>
                  <div className="tech-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    Scroll mouse wheel UP anytime to glide back to earlier modules
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        </div>
      </div>
    </div>
  );
}
