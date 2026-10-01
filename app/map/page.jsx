import React from 'react';
import GisMap from '@/components/GisMap';

export const metadata = {
  title: 'Exploration Map | Interactive GIS Mineral Intelligence Dashboard - MIN-GEO-AI',
  description: 'Interactive GIS dashboard visualizing satellite imagery, geological fold belts, existing mines, and machine learning manganese prospectivity targets.',
};

export default function MapPage() {
  return (
    <div>
      {/* Top Banner */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderBottom: '1px solid var(--border-medium)', 
        padding: '0.65rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-rust">GIS EXPLORATION DASHBOARD</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Manganese Prospectivity Triage (Sausar, Dharwar, Gangpur Belts)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <span>INTERPOLATION: BILINEAR 10m</span>
          <span>CRS: EPSG:4326 (WGS84)</span>
          <span className="badge badge-caution">PRE-DRILL TARGETS</span>
        </div>
      </div>

      {/* Interactive GIS Dashboard Component */}
      <GisMap />

      {/* Methodological Context Below Map */}
      <section className="section-alt" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>Target Interpretation Protocol</h4>
              <p style={{ fontSize: '0.84rem' }}>
                All target circles represent automated spatial clusters where high SWIR-2 absorption anomalies intersect mapped regional shear fault lines and favorable host lithologies (gondite or ferruginous phyllites).
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--earth-rust-light)', marginBottom: '0.5rem' }}>Field Validation Priority</h4>
              <p style={{ fontSize: '0.84rem' }}>
                High-potential zones (&gt;75 ML score) are scheduled for initial ground reconnaissance traverses, GPS outcrop validation, and shallow electrical resistivity tomography under UNFC Category G4 guidelines.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--signal-amber)', marginBottom: '0.5rem' }}>Non-Commercial Disclaimer</h4>
              <p style={{ fontSize: '0.84rem' }}>
                These targets do not constitute confirmed reserves or auctionable blocks until verified by mandatory subsurface core drilling and chemical assaying by accredited exploration agencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
