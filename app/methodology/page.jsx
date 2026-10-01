import React from 'react';
import Link from 'next/link';
import ModelBenchmarkChart from '@/components/ModelBenchmarkChart';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import ProspectivitySimulator from '@/components/ProspectivitySimulator';

export const metadata = {
  title: 'AI/ML Methodology | Machine Learning for Mineral Prospectivity - MIN-GEO-AI',
  description: 'Technical machine learning pipeline, spatial cross-validation, XGBoost/Random Forest benchmarks, and interactive prospectivity simulator.',
};

export default function MethodologyPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">AI/ML ARCHITECTURE & BENCHMARKS</span>
          <h1 style={{ marginBottom: '1rem' }}>Machine Learning for Mineral Prospectivity</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            Mineral prospectivity mapping is a spatial classification problem. We combine domain-informed geological feature engineering with ensemble gradient boosting and spatial cross-validation to prevent spatial overfitting.
          </p>
        </div>
      </section>

      {/* Technical Pipeline Flowchart */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">DATA TO DECISION FLOW</span>
            <h2 className="section-title">The Machine Learning Pipeline</h2>
            <p className="section-desc">
              From continuous raster layers to verified exploration targets.
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '0.75rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.5rem',
            margin: '1.5rem 0'
          }}>
            {[
              { label: 'Satellite Data', sub: 'Sentinel-2 & DEM' },
              { label: 'Preprocessing', sub: 'Atmospheric BOA' },
              { label: 'Feature Extraction', sub: 'Band Ratios & Crosta' },
              { label: 'Feature Engineering', sub: 'Distance to Faults' },
              { label: 'Training Dataset', sub: 'Past Mine Deposits' },
              { label: 'Machine Learning', sub: 'XGBoost & RF' },
              { label: 'Prospectivity Map', sub: '0.0 - 1.0 Grid' },
              { label: 'Field Validation', sub: 'UNFC G4 Drilling' }
            ].map((node, i, arr) => (
              <React.Fragment key={node.label}>
                <div style={{ textAlign: 'center', flex: '1 1 110px' }}>
                  <div style={{ 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border-rust)', 
                    padding: '0.65rem 0.5rem', 
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    {node.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {node.sub}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ color: 'var(--earth-rust)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="callout callout-info" style={{ marginTop: '1.5rem' }}>
            <div className="callout-title">
              <span>PREVENTING SPATIAL AUTOCORRELATION BIAS</span>
            </div>
            <div>
              Traditional random train/test splits fail catastrophically in geospatial ML because adjacent satellite pixels are almost identical (Tobler’s First Law of Geography). We employ <strong>Spatial Block Cross-Validation</strong>, clustering training samples by geographic region (e.g., training on Maharashtra while validating on Madhya Pradesh) to guarantee authentic generalization to unseen terrains.
            </div>
          </div>
        </div>
      </section>

      {/* Model Benchmark Comparison Section */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">EMPIRICAL BENCHMARKS</span>
            <h2 className="section-title">Model Performance & Algorithm Selection</h2>
            <p className="section-desc">
              We benchmarked four machine learning architectures on identical spatial feature sets derived from the Sausar and Dharwar metallogenic belts.
            </p>
          </div>

          <ModelBenchmarkChart />

          <div style={{ marginTop: '2.5rem' }}>
            <FeatureImportanceChart />
          </div>
        </div>
      </section>

      {/* Interactive Prospectivity Simulator */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">INTERACTIVE MODEL SIMULATOR</span>
            <h2 className="section-title">Simulate Mineral Prospectivity Scoring</h2>
            <p className="section-desc">
              Test how different combinations of Earth observation spectral ratios, structural fault proximity, and host lithology influence model inference in real time.
            </p>
          </div>

          <ProspectivitySimulator />

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/map" className="btn btn-primary">
              View Spatial Predictions on Interactive GIS Map →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
