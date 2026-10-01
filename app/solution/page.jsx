import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Our Solution | 5-Step Exploration Intelligence Pipeline - MIN-GEO-AI',
  description: 'Detailed breakdown of the 5-step technical pipeline from multispectral satellite acquisition to machine-learning prospectivity and field validation.',
};

export default function SolutionPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">TECHNICAL METHODOLOGY</span>
          <h1 style={{ marginBottom: '1rem' }}>From Satellite Data to Exploration Intelligence</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            We bridge the gap between spaceborne Earth observation and ground geological reality. Our structured 5-stage pipeline transforms raw multispectral rasters and regional structural maps into drill-ready, high-confidence prospectivity zones.
          </p>
        </div>
      </section>

      {/* Deep Dive into the 5 Steps */}
      <section className="section">
        <div className="container">
          
          {/* Step 1 */}
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--earth-rust)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="step-num">STAGE 01</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>Acquire: Multi-Sensor & Geological Ingestion</h3>
              </div>
              <span className="badge badge-rust">Level 1 Ingestion</span>
            </div>
            <p>
              Exploration begins by aggregating open-access, calibrated Earth observation rasters alongside historical spatial geological datasets from verified government repositories.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>MULTISPECTRAL SATELLITE</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  ESA Sentinel-2A/B (10m VNIR, 20m SWIR) & Landsat-8/9 OLI (30m multispectral + 100m Thermal TIRS).
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>DIGITAL ELEVATION (DEM)</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  ISRO Cartosat-1 DEM (2.5m/10m stereo) & SRTM 30m for topographic slope, aspect, and catchment modeling.
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>GEOLOGICAL & MINING GIS</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Geological Survey of India (GSI Bhukosh 1:50k maps), lithological units, and Indian Bureau of Mines (IBM) lease boundaries.
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--earth-bronze)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="step-num" style={{ color: 'var(--earth-bronze-light)' }}>STAGE 02</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>Process: Preprocessing & Atmospheric Correction</h3>
              </div>
              <span className="badge badge-bronze">Level 2A Radiometric</span>
            </div>
            <p>
              Raw top-of-atmosphere (TOA) satellite signals are contaminated by atmospheric haze, Rayleigh scattering, water vapor, and vegetation. We apply automated scientific corrections.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>ATMOSPHERIC RECTIFICATION</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Sen2Cor algorithm conversion to Bottom-of-Atmosphere (BOA) surface reflectance with Dark Object Subtraction (DOS1).
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>MASKING & FILTERING</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Scene Classification Layer (SCL) masks out clouds, shadows, bodies of water, and active urban infrastructure.
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>SPATIAL CO-REGISTRATION</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Sub-pixel alignment across temporal passes and resampling of 20m SWIR bands to 10m VNIR grid using bilinear interpolation.
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--earth-olive)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="step-num" style={{ color: 'var(--earth-olive-light)' }}>STAGE 03</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>Analyze: Spectral Indices & Spatial Patterns</h3>
              </div>
              <span className="badge badge-olive">Feature Engineering</span>
            </div>
            <p>
              Extracting domain-specific geological evidence layers based on metallogenic models of manganese ore deposition (sedimentary-syngenetic and supergene enrichment).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>DIAGNOSTIC BAND RATIOS</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  SWIR-2/NIR (B12/B8) for manganese oxides; Ferric Iron Index (B4/B2); Ferrous Iron Index (B12/B11); Clay Minerals (B11/B12).
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>CROSTA TECHNIQUE (PCA)</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Principal Component Analysis isolates diagnostic absorption/reflection eigenvectors to map gossanous alteration caps.
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>STRUCTURAL LINEAMENT DENSITY</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Automated Hough-transform edge detection and shaded relief DEM analysis to map faults, fold hinges, and fluid pathways.
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--signal-amber)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="step-num" style={{ color: 'var(--signal-amber)' }}>STAGE 04</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>Predict: Machine Learning Prospectivity Mapping</h3>
              </div>
              <span className="badge badge-caution">Predictive AI Inference</span>
            </div>
            <p>
              Trained supervised ensemble classifiers fuse multispectral, lithological, structural, and geochemical layers to predict pixel-wise Mineral Prospectivity Index (MPI).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>ENSEMBLE ALGORITHMS</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  XGBoost (Extreme Gradient Boosting) and Random Forest classifiers weighted by Weight of Evidence (WofE).
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>SPATIAL CROSS-VALIDATION</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Spatial block K-fold cross-validation prevents spatial autocorrelation overfitting between adjacent pixels.
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>CONTINUOUS PROSPECTIVITY GRID</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Generates 0.0 to 1.0 probability raster maps segmented into High, Medium, and Low potential target clusters.
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--signal-green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="step-num" style={{ color: 'var(--signal-green)' }}>STAGE 05</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>Validate: Field Survey & UNFC Verification</h3>
              </div>
              <span className="badge badge-success">UNFC Compliance</span>
            </div>
            <p>
              Remote sensing and AI establish exploration triage, but ground reality governs economic reserves. Predictions are delivered directly to field surveying teams.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>GEOPHYSICAL GROUND TRUTH</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  High-priority clusters trigger ground electrical resistivity profiling and proton-precession magnetometer surveys.
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>GEOCHEMICAL ASSAYING</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Rock chip and soil grid sampling to confirm presence of MnO2 minerals (pyrolusite, psilomelane, braunite).
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>UNFC G4/G3 REPORTING</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Target dossiers prepared for mineral concession auctioning under the MMDR Amendment Act provisions.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="section-alt" style={{ textAlign: 'center', padding: '3.5rem 0' }}>
        <div className="container">
          <h2>Ready to explore the underlying remote sensing physics?</h2>
          <p style={{ maxWidth: '600px', margin: '0.75rem auto 1.5rem' }}>
            Learn how satellite sensors detect manganese absorption features across the electromagnetic spectrum.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/remote-sensing" className="btn btn-primary">
              Examine Remote Sensing Methodology →
            </Link>
            <Link href="/map" className="btn btn-secondary">
              View Targets on GIS Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
