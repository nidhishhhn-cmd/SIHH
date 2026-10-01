import React from 'react';
import Link from 'next/link';
import SpectralChart from '@/components/SpectralChart';

export const metadata = {
  title: 'Remote Sensing | Seeing Mineral Potential From Space - MIN-GEO-AI',
  description: 'How satellite Earth Observation, multispectral band ratios, and DEM terrain analysis assist manganese mineral exploration.',
};

export default function RemoteSensingPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">EARTH OBSERVATION PHYSICS</span>
          <h1 style={{ marginBottom: '1rem' }}>Seeing Mineral Potential From Space</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            Satellite remote sensing cannot look through hundreds of meters of dense rock or magically declare an operating mine. Instead, it captures distinct electronic and vibrational absorption features of surface rocks and alteration halos, allowing geologists to pinpoint anomalies across vast terrains.
          </p>
        </div>
      </section>

      {/* Critical Scientific Disclaimer */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="callout callout-info">
          <div className="callout-title">
            <span>SCIENTIFIC PRINCIPLE & BOUNDARIES</span>
          </div>
          <div>
            <strong>Remote sensing identifies surficial indicators, weathering gossans, and lithological contacts.</strong> It serves as a rapid screening and target-generation tool to narrow down search areas from thousands of square kilometers to high-priority prospective zones. Subsurface ore thickness, grade, and economic viability strictly require geological ground truthing, trenching, and exploratory core drilling.
          </div>
        </div>
      </div>

      {/* Interactive Spectral Signature Canvas */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">SPECTRAL ABSORPTION PROFILES</span>
            <h2 className="section-title">Diagnostic Spectral Signatures</h2>
            <p className="section-desc">
              Manganese oxide minerals (such as pyrolusite, psilomelane, and braunite) exhibit strong charge-transfer absorption in the ultraviolet-to-visible region and a characteristic absorption feature in the Shortwave Infrared (SWIR-2).
            </p>
          </div>

          <SpectralChart />
        </div>
      </section>

      {/* Multispectral Bands Breakdown */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">BAND ENGINEERING</span>
            <h2 className="section-title">Multispectral Band Ratios for Manganese Exploration</h2>
            <p className="section-desc">
              By calculating mathematical ratios between specific spectral bands, we suppress topography and albedo variations while amplifying diagnostic mineral absorption.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <div className="card-title">
                <span>SWIR-2 / NIR Ratio</span>
                <span className="badge badge-rust">B12 / B8</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Key Indicator:</strong> Manganese oxide minerals and associated hydroxylated alteration minerals (clay/phyllite halos) exhibit low reflectance in Band 12 (2190nm) compared to the near-infrared (842nm).
              </p>
              <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--earth-sand)' }}>
                Target Mineral: Pyrolusite (MnO2), Braunite
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Ferric Iron Index</span>
                <span className="badge badge-bronze">B4 / B2</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Key Indicator:</strong> Highlights oxidized iron caps and ferruginous quartzites. Manganese deposits in the Sausar and Bonai belts are frequently interbedded with iron-rich metasedimentary strata.
              </p>
              <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--earth-sand)' }}>
                Target Mineral: Hematite, Goethite Gossans
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Ferrous Iron Index</span>
                <span className="badge badge-olive">B12 / B11</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Key Indicator:</strong> Differentiates unweathered silicate host rocks (garnet, amphiboles in gondite) from weathered surface supergene manganese crusts.
              </p>
              <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--earth-sand)' }}>
                Target Mineral: Gondite Host Silicates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terrain Analysis Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">GEOMORPHOLOGY & STRUCTURAL MAPPING</span>
            <h2 className="section-title">Digital Elevation (DEM) & Terrain Analysis</h2>
            <p className="section-desc">
              Topography controls weathering, erosion, and outcrop exposure. Manganese deposits in India’s fold belts typically occur along synclinal ridges and sheared structural contacts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <h4 style={{ color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>Slope & Topographic Ruggedness</h4>
              <p style={{ fontSize: '0.88rem' }}>
                Steep slopes (&gt;25°) suffer severe erosional stripping, while flat alluvial plains (&lt;5°) are buried under thick agricultural soil. Moderate ridge slopes (10°–20°) provide the highest probability of exposed mineralized outcrops.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>Structural Lineaments & Faults</h4>
              <p style={{ fontSize: '0.88rem' }}>
                Shaded relief DEMs illuminated from multiple azimuth angles (0°, 45°, 90°, 135°) reveal regional fault lines, shear zones, and fold hinges that acted as conduits for hydrothermal and supergene manganese concentration.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>Stream Power & Catchment Analysis</h4>
              <p style={{ fontSize: '0.88rem' }}>
                Hydrological modeling of drainage patterns traces stream sediments back to their upstream catchment sources, pinpointing uphill weathering ridges for ground geochemical prospecting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Satellite Source Cards */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">EARTH OBSERVATION DATA SOURCES</span>
            <h2 className="section-title">Satellite Sensor Constellation</h2>
            <p className="section-desc">
              We leverage an ensemble of civil Earth observation satellites, combining European, American, and Indian space assets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-rust">ESA COPERNICUS</span>
                <span className="tech-mono" style={{ fontSize: '0.75rem' }}>10m–20m Resolution</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sentinel-2A / 2B MSI</h3>
              <p style={{ fontSize: '0.86rem' }}>
                <strong>Role:</strong> Primary multispectral mapping engine. 13 spectral bands covering VNIR and SWIR. 5-day revisit rate ensures cloud-free dry-season mosaic compilation for optimal rock outcrop visibility.
              </p>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginTop: '0.75rem' }}>
                Key Bands: B2, B3, B4, B8, B11, B12
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-bronze">USGS / NASA</span>
                <span className="tech-mono" style={{ fontSize: '0.75rem' }}>30m Multispectral</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Landsat 8 & 9 OLI / TIRS</h3>
              <p style={{ fontSize: '0.86rem' }}>
                <strong>Role:</strong> Long-term historical baseline and thermal infrared characterization. Thermal bands (B10, B11 at 100m) assist in mapping quartz and silica-rich gondite host lithologies via thermal inertia.
              </p>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginTop: '0.75rem' }}>
                Key Sensor: Operational Land Imager + TIRS
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-olive">ISRO / NRSC</span>
                <span className="tech-mono" style={{ fontSize: '0.75rem' }}>2.5m–10m DEM</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>ISRO Cartosat-1 / Bhuvan</h3>
              <p style={{ fontSize: '0.86rem' }}>
                <strong>Role:</strong> High-precision Indian terrain elevation models and Bhuvan thematic geo-services. Delivers high-resolution elevation, slope, and geomorphic ridge mapping tailored to the Indian subcontinent.
              </p>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginTop: '0.75rem' }}>
                Key Assets: CartoDEM + LISS-IV Sub-meter
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/methodology" className="btn btn-primary">
              Next: See How AI/ML Analyzes These Features →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
