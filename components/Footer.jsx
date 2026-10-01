import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-disclaimer">
          <strong style={{ color: 'var(--earth-rust-light)' }}>GEOLOGICAL & EXPLORATION DISCLAIMER:</strong> All predictive models, spectral indices, and prospective zones rendered on this platform are for decision-support and exploration targeting only. Remote sensing and machine learning triage surface indicators and structural anomalies; they do NOT confirm subsurface economic reserve volume or grade. All targets require mandatory ground-truth verification, geochemical sampling, geophysical surveys, and core drilling compliance under the United Nations Framework Classification for Mineral Resources (UNFC-1997 / CRIRSCO).
        </div>

        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-emblem" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>Mn</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>MIN-GEO-AI</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              A sovereign Earth observation and predictive machine learning intelligence system developed for the Geological Survey of India and Ministry of Mines. Designed to map prospective manganese mineralization corridors and accelerate national critical mineral self-reliance under UNFC-1997 standards.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-rust">Ministry of Mines</span>
              <span className="badge badge-bronze">GSI Bhukosh</span>
              <span className="badge badge-olive">ISRO Bhuvan</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Exploration Modules</div>
            <ul className="footer-links">
              <li><Link href="/#panel-problem">National Supply Deficit</Link></li>
              <li><Link href="/#panel-solution">Satellite Remote Sensing</Link></li>
              <li><Link href="/#panel-simulator">AI Prospectivity Engine</Link></li>
              <li><Link href="/map">Interactive Metallogenic GIS</Link></li>
              <li><Link href="/#panel-impact">Deployment & Capex ROI</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Standards & Compliance</div>
            <ul className="footer-links">
              <li><span style={{ color: 'var(--text-secondary)' }}>UNFC-1997 / CRIRSCO Triage</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>ISO 19115 Geospatial Metadata</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>GSI Mineral Exploration Guidelines</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>OGC WMS / WFS Open Services</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>National Mineral Policy 2019</span></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Telemetry & Data Partners</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Integrated with sovereign and international satellite telemetry:
            </p>
            <ul className="footer-links" style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
              <li>• ESA Copernicus Sentinel-2 MSI</li>
              <li>• USGS / NASA Landsat-9 OLI/TIRS</li>
              <li>• ISRO Bhuvan / Cartosat-1 DEM</li>
              <li>• Geological Survey of India (Bhukosh)</li>
              <li>• Indian Bureau of Mines (IBM)</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 MIN-GEO-AI National Mineral Intelligence Platform | Ministry of Mines, Govt. of India
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Targeting Sausar, Dharwar & Gangpur Metallogenic Belts</span>
            <span>UNFC Category G4 Reconnaissance Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
