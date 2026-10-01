import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Technology & Architecture | Multi-Layer System Pipeline - MIN-GEO-AI',
  description: 'Enterprise scientific software architecture: Data Ingestion, Geospatial Processing, AI/ML Prospectivity Modeling, Application GIS, and Decision Layers.',
};

export default function ArchitecturePage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">SYSTEM ARCHITECTURE & TECH STACK</span>
          <h1 style={{ marginBottom: '1rem' }}>Multi-Layer Scientific Architecture</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            The MIN-GEO-AI platform is engineered with a modular, scalable architecture separating satellite data ingestion, raster spatial processing, machine learning inference, and interactive GIS visualization.
          </p>
        </div>
      </section>

      {/* 5-Layer System Stack */}
      <section className="section">
        <div className="container">
          <div className="arch-stack">

            {/* Layer 1: Data */}
            <div className="arch-layer" style={{ borderLeftColor: '#c85a32' }}>
              <div className="arch-header">
                <div className="arch-title">
                  <span className="badge badge-rust" style={{ fontSize: '0.8rem' }}>LAYER 01</span>
                  <span>DATA INGESTION LAYER</span>
                </div>
                <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Multi-Sensor Spatial Sources & Geological Catalogs
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Aggregates heterogeneous spatial formats (Cloud Optimized GeoTIFFs, vector Shapefiles, ASCII DEM grids, and tabular geochemical assays) across space agencies and Indian geological repositories.
              </p>
              <div className="arch-pill-row">
                <span className="arch-pill">ESA Sentinel-2 L2A (10m VNIR/SWIR)</span>
                <span className="arch-pill">USGS Landsat 8/9 OLI & TIRS (30m/100m)</span>
                <span className="arch-pill">ISRO CartoDEM (2.5m/10m Topography)</span>
                <span className="arch-pill">GSI Bhukosh 1:50k Lithology & Faults</span>
                <span className="arch-pill">IBM Mining Lease Boundaries</span>
                <span className="arch-pill">Ground Truth GPS Assays</span>
              </div>
            </div>

            <div className="arch-arrow">↓ REST / STAC API & GDAL Ingestion ↓</div>

            {/* Layer 2: Processing */}
            <div className="arch-layer" style={{ borderLeftColor: '#996e3e' }}>
              <div className="arch-header">
                <div className="arch-title">
                  <span className="badge badge-bronze" style={{ fontSize: '0.8rem' }}>LAYER 02</span>
                  <span>GEOSPATIAL PROCESSING & FEATURE EXTRACTION LAYER</span>
                </div>
                <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Python, GDAL, Rasterio, NumPy & OpenCV
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Executes atmospheric normalization, cloud/water masking, sub-pixel co-registration, band arithmetic, and geomorphometric curvature analysis.
              </p>
              <div className="arch-pill-row">
                <span className="arch-pill">Sen2Cor BOA Reflectance Engine</span>
                <span className="arch-pill">Rasterio / GDAL Virtual Rasters</span>
                <span className="arch-pill">Bilinear Resampling to 10m Unified Grid</span>
                <span className="arch-pill">Diagnostic SWIR-2 / NIR Ratio Generator</span>
                <span className="arch-pill">Crosta Technique PCA Decomposition</span>
                <span className="arch-pill">Hough Transform Lineament Extraction</span>
              </div>
            </div>

            <div className="arch-arrow">↓ 10m Harmonized Feature Tensors ↓</div>

            {/* Layer 3: AI/ML */}
            <div className="arch-layer" style={{ borderLeftColor: '#5f7457' }}>
              <div className="arch-header">
                <div className="arch-title">
                  <span className="badge badge-olive" style={{ fontSize: '0.8rem' }}>LAYER 03</span>
                  <span>MACHINE LEARNING & PROSPECTIVITY MODELING LAYER</span>
                </div>
                <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Scikit-Learn, XGBoost, SHAP & Spatial Cross-Validation
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Computes evidence-weighted spatial probability surfaces, evaluates feature importance, and generates continuous 0.0 to 1.0 Mineral Prospectivity Index (MPI) rasters.
              </p>
              <div className="arch-pill-row">
                <span className="arch-pill">Extreme Gradient Boosting (XGBoost)</span>
                <span className="arch-pill">Random Forest (500 Trees, Gini Impurity)</span>
                <span className="arch-pill">Spatial Block Cross-Validation (5 Folds)</span>
                <span className="arch-pill">Weights of Evidence (WofE) Prior Probabilities</span>
                <span className="arch-pill">SHAP Value Feature Attribution</span>
                <span className="arch-pill">DBSCAN Spatial Target Clustering</span>
              </div>
            </div>

            <div className="arch-arrow">↓ GeoJSON Target Vector Polygons & Tile Services ↓</div>

            {/* Layer 4: Application */}
            <div className="arch-layer" style={{ borderLeftColor: '#06b6d4' }}>
              <div className="arch-header">
                <div className="arch-title">
                  <span className="badge" style={{ fontSize: '0.8rem', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}>LAYER 04</span>
                  <span>APPLICATION & GIS VISUALIZATION LAYER</span>
                </div>
                <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Next.js App Router, Leaflet GIS, React & Canvas Engine
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Interactive browser-based command center delivering real-time layer toggling, feature inspection, spectral curve plots, and scenario prospectivity simulation.
              </p>
              <div className="arch-pill-row">
                <span className="arch-pill">Leaflet Interactive GIS Engine</span>
                <span className="arch-pill">Esri Satellite + CartoDB Dark Matter Basemaps</span>
                <span className="arch-pill">Real-time Parameter Prospectivity Simulator</span>
                <span className="arch-pill">Scientific Canvas Spectral & Metric Visualizers</span>
                <span className="arch-pill">Target Dossier Inspection Drawer</span>
                <span className="arch-pill">GeoTIFF & GeoJSON Export Endpoints</span>
              </div>
            </div>

            <div className="arch-arrow">↓ Actionable Exploration Targets & Triage Dossiers ↓</div>

            {/* Layer 5: Decision */}
            <div className="arch-layer" style={{ borderLeftColor: '#22c55e' }}>
              <div className="arch-header">
                <div className="arch-title">
                  <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>LAYER 05</span>
                  <span>DECISION & FIELD VALIDATION LAYER</span>
                </div>
                <span className="tech-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  UNFC 1997 / CRIRSCO Compliance & Mineral Block Triage
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Translates machine-generated probability contours into compliant exploration workflows for government surveying agencies and mining leaseholders.
              </p>
              <div className="arch-pill-row">
                <span className="arch-pill">Field Survey GPS Traverse Dispatch</span>
                <span className="arch-pill">Ground Magnetic Profiling Grid Siting</span>
                <span className="arch-pill">UNFC Stage G4 Reconnaissance Reports</span>
                <span className="arch-pill">Core Drilling Target Prioritization</span>
                <span className="arch-pill">State DMG Auction Dossier Generation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Summary Table */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">TECHNOLOGY STACK</span>
            <h2 className="section-title">Open-Source & Scientific Technologies</h2>
            <p className="section-desc">
              Built on dependable, industry-standard scientific software with zero proprietary lock-in.
            </p>
          </div>

          <div className="tech-table-container">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Component Domain</th>
                  <th>Core Technology</th>
                  <th>Version / Library</th>
                  <th>Functional Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Web Application</td>
                  <td>Next.js (React Framework)</td>
                  <td>Next.js 14 / React 18</td>
                  <td>Server-rendered, responsive client UI and API routing</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>GIS Map Engine</td>
                  <td>Leaflet.js + Esri GIS</td>
                  <td>Leaflet 1.9.4</td>
                  <td>Client-side vector/raster GIS tile rendering and HUD</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Spatial Raster Processing</td>
                  <td>Python GDAL & Rasterio</td>
                  <td>GDAL 3.8 / Rasterio 1.3</td>
                  <td>Multispectral band ratios, clipping, and georeferencing</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Machine Learning</td>
                  <td>XGBoost & Scikit-Learn</td>
                  <td>XGBoost 2.0 / Sklearn 1.4</td>
                  <td>Gradient boosting, spatial cross-validation, and metrics</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Explainable AI (XAI)</td>
                  <td>SHAP (SHapley Additive exPlanations)</td>
                  <td>SHAP 0.44</td>
                  <td>Feature attribution to ensure geological interpretability</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/team" className="btn btn-primary">
              Meet the Research & Innovation Team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
