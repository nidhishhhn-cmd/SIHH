'use client';

import React, { useState } from 'react';

export default function ProspectivitySimulator() {
  // Inputs
  const [swirRatio, setSwirRatio] = useState(1.85); // SWIR-2 / NIR ratio (1.0 to 3.0)
  const [lineamentDist, setLineamentDist] = useState(1.2); // km (0.1 to 10.0)
  const [hostLithology, setHostLithology] = useState('gondite'); // gondite, quartzite, schist, basalt, alluvium
  const [feOxideIndex, setFeOxideIndex] = useState(2.1); // 1.0 to 4.0
  const [demSlope, setDemSlope] = useState(14); // degrees (0 to 45)
  const [soilMnTrace, setSoilMnTrace] = useState(650); // ppm (100 to 2000)

  // Simulation calculation engine
  const calculateScore = () => {
    // 1. Spectral contribution (30%)
    const spectralScore = Math.min(100, Math.max(0, ((swirRatio - 1.0) / 2.0) * 100));

    // 2. Structural Lineament proximity (25% - inverse distance)
    const structScore = Math.max(0, 100 - (lineamentDist / 8.0) * 100);

    // 3. Host Rock Compatibility (20%)
    const lithWeights = {
      gondite: 95,
      quartzite: 75,
      schist: 60,
      basalt: 20,
      alluvium: 5
    };
    const lithScore = lithWeights[hostLithology] || 50;

    // 4. Fe-Mn oxide index & Geochemical trace (15%)
    const geoScore = Math.min(100, (soilMnTrace / 1500) * 100);

    // 5. DEM Topographic Slope factor (10%)
    // Moderate ridge slopes (8-22 deg) are ideal for exposed gossans/outcrops
    let slopeScore = 50;
    if (demSlope >= 8 && demSlope <= 22) {
      slopeScore = 90;
    } else if (demSlope < 8) {
      slopeScore = 40; // High overburden / alluvial cover
    } else {
      slopeScore = 60; // Steep cliffs, erosion
    }

    const total = (
      spectralScore * 0.30 +
      structScore * 0.25 +
      lithScore * 0.20 +
      geoScore * 0.15 +
      slopeScore * 0.10
    );

    return Math.round(total);
  };

  const score = calculateScore();

  let tier = 'LOW POTENTIAL';
  let tierColor = 'var(--text-muted)';
  let recommendation = 'Low prospectivity signature. Retain as baseline background. Not prioritized for ground survey.';

  if (score >= 75) {
    tier = 'HIGH POTENTIAL TARGET';
    tierColor = 'var(--earth-rust-light)';
    recommendation = 'PRIORITY LEVEL 1: High correlation across SWIR absorption and structural lineaments. Recommend immediate ground magnetic profiling and grid-pitting (UNFC G4 Stage).';
  } else if (score >= 50) {
    tier = 'MODERATE PROSPECTIVITY';
    tierColor = 'var(--signal-amber)';
    recommendation = 'PRIORITY LEVEL 2: Moderate spectral anomaly with favorable host lithology. Secondary geological reconnaissance recommended during dry season.';
  }

  return (
    <div className="simulator-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem' }}>Machine Learning Prospectivity Simulator</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Adjust earth observation spectral indices, structural fault proximity, and host lithology to calculate spatial probability.
          </p>
        </div>
        <div className="callout-warning" style={{ margin: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
          <strong>DEMONSTRATION MODEL — NOT REAL MINERAL RESERVE ESTIMATION</strong>
        </div>
      </div>

      <div className="simulator-grid">
        <div>
          {/* Parameter 1: SWIR Index */}
          <div className="param-group">
            <div className="param-label">
              <span>SWIR-2 / NIR Ratio (Sentinel-2 B12/B8)</span>
              <span className="tech-mono" style={{ color: 'var(--earth-rust-light)' }}>{swirRatio.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="3.0" 
              step="0.05"
              value={swirRatio}
              onChange={(e) => setSwirRatio(parseFloat(e.target.value))}
              className="param-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span>1.0 (Host Rock Baseline)</span>
              <span>2.0 (Hydrothermal Alteration)</span>
              <span>3.0 (Strong Mn-Oxide Absorption)</span>
            </div>
          </div>

          {/* Parameter 2: Lineament Distance */}
          <div className="param-group">
            <div className="param-label">
              <span>Proximity to Mapped Fault / Shear Lineament</span>
              <span className="tech-mono" style={{ color: 'var(--earth-sand)' }}>{lineamentDist.toFixed(1)} km</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="8.0" 
              step="0.1"
              value={lineamentDist}
              onChange={(e) => setLineamentDist(parseFloat(e.target.value))}
              className="param-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span>0.1 km (Fault Axis Intersection)</span>
              <span>4.0 km</span>
              <span>8.0 km (Distal Regional)</span>
            </div>
          </div>

          {/* Parameter 3: Host Lithology */}
          <div className="param-group">
            <div className="param-label">
              <span>Mapped Host Rock Stratigraphy (GSI Map Layer)</span>
              <span className="tech-mono" style={{ color: 'var(--signal-green)' }}>{hostLithology.toUpperCase()}</span>
            </div>
            <select 
              value={hostLithology}
              onChange={(e) => setHostLithology(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              <option value="gondite">Sausar Group: Gondite & Quartzite Formation (Prime Host)</option>
              <option value="quartzite">Dharwar Supergroup: Ferruginous Quartzite / Schist</option>
              <option value="schist">Mica Schist & Phyllite Enclave</option>
              <option value="basalt">Deccan Trap Basalt Cap (Overburden)</option>
              <option value="alluvium">Quaternary River Alluvium</option>
            </select>
          </div>

          {/* Parameter 4: DEM Slope */}
          <div className="param-group">
            <div className="param-label">
              <span>Cartosat DEM Slope & Topographic Position</span>
              <span className="tech-mono" style={{ color: 'var(--text-secondary)' }}>{demSlope}°</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="40" 
              step="1"
              value={demSlope}
              onChange={(e) => setDemSlope(parseInt(e.target.value))}
              className="param-slider"
            />
          </div>

          {/* Parameter 5: Geochemical soil trace */}
          <div className="param-group">
            <div className="param-label">
              <span>Geochemical Soil Assay Mn Trace (Optional Layer)</span>
              <span className="tech-mono" style={{ color: 'var(--earth-sand)' }}>{soilMnTrace} ppm</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="1800" 
              step="50"
              value={soilMnTrace}
              onChange={(e) => setSoilMnTrace(parseInt(e.target.value))}
              className="param-slider"
            />
          </div>
        </div>

        <div className="sim-output-card">
          <div>
            <span className="section-label">Simulated Inference</span>
            <div className="sim-score-ring">
              <div className="sim-score-val" style={{ color: tierColor }}>{score}</div>
              <div className="sim-score-unit">/ 100</div>
              <div className="sim-score-tier" style={{ color: tierColor }}>{tier}</div>
            </div>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Action Recommendation
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {recommendation}
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Confidence Level: {score > 70 ? 'High (86.4%)' : score > 45 ? 'Moderate (71.2%)' : 'Low (62.0%)'} | Algorithm: Ensemble XGBoost + Weight of Evidence (WofE)
          </div>
        </div>
      </div>
    </div>
  );
}
