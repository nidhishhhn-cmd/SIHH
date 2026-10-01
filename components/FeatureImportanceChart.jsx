'use client';

import React, { useEffect, useRef } from 'react';

export default function FeatureImportanceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const padding = { top: 25, right: 35, bottom: 25, left: 190 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const features = [
      { name: 'SWIR-2 / NIR Ratio (Mn Index)', weight: 0.28, color: '#a83d1c' },
      { name: 'Lineament Fault Proximity (km)', weight: 0.22, color: '#c24b25' },
      { name: 'Host Lithology (Gondite/Sausar)', weight: 0.19, color: '#7a5023' },
      { name: 'Fe3+/Fe2+ Spectral Band Ratio', weight: 0.14, color: '#946330' },
      { name: 'DEM Slope & Topographic Ruggedness', weight: 0.11, color: '#395734' },
      { name: 'Stream Power Index (SPI)', weight: 0.06, color: '#5e6b7d' }
    ];

    const rowHeight = graphHeight / features.length;
    const barHeight = Math.min(20, rowHeight * 0.65);

    features.forEach((f, i) => {
      const y = padding.top + i * rowHeight + (rowHeight - barHeight) / 2;

      ctx.fillStyle = '#151a21';
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(f.name, padding.left - 12, y + barHeight / 2 + 4);

      // Track
      ctx.fillStyle = '#f0ebe1';
      ctx.fillRect(padding.left, y, graphWidth, barHeight);

      // Bar
      const barW = (f.weight / 0.32) * graphWidth;
      ctx.fillStyle = f.color;
      ctx.fillRect(padding.left, y, barW, barHeight);

      // Value
      ctx.fillStyle = '#7a5023';
      ctx.font = 'bold 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${(f.weight * 100).toFixed(0)}%`, padding.left + barW + 8, y + barHeight / 2 + 4);
    });
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">SHAP Feature Attribution & Spatial Importance Weights</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            Identifies Primary Predictive Geological and Earth Observation Drivers
          </div>
        </div>
        <span className="badge badge-bronze">XGBoost SHAP</span>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '260px', display: 'block' }} 
      />
    </div>
  );
}
