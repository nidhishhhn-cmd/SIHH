'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SpectralChart() {
  const canvasRef = useRef(null);
  const [activeBand, setActiveBand] = useState('All');

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

    const padding = { top: 30, right: 30, bottom: 45, left: 55 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    // Grid lines (Reflectance 0% to 70%) - light crisp grid
    for (let r = 0; r <= 70; r += 10) {
      const y = padding.top + graphHeight - (r / 70) * graphHeight;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + graphWidth, y);
      ctx.stroke();

      ctx.fillStyle = '#5e6b7d';
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${r}%`, padding.left - 8, y + 4);
    }

    const bands = [
      { name: 'B2 (490nm)', wl: 490 },
      { name: 'B3 (560nm)', wl: 560 },
      { name: 'B4 (665nm)', wl: 665 },
      { name: 'B8 (842nm)', wl: 842 },
      { name: 'B11 (1610nm)', wl: 1610 },
      { name: 'B12 (2190nm)', wl: 2190 }
    ];

    const minWl = 400;
    const maxWl = 2300;

    function getX(wl) {
      return padding.left + ((wl - minWl) / (maxWl - minWl)) * graphWidth;
    }

    bands.forEach(b => {
      const x = getX(b.wl);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.setLineDash([3, 3]);
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + graphHeight);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#3b4554';
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, x, padding.top + graphHeight + 18);
    });

    const curves = [
      {
        label: 'Manganese Oxides (Pyrolusite/Braunite)',
        color: '#a83d1c', // Mineral terracotta
        points: [
          { wl: 490, r: 8 },
          { wl: 560, r: 11 },
          { wl: 665, r: 13 },
          { wl: 842, r: 14 },
          { wl: 1610, r: 18 },
          { wl: 2190, r: 12 } // Characteristic drop in SWIR2
        ]
      },
      {
        label: 'Gondite / Quartzite Host Rock',
        color: '#7a5023', // Geological bronze
        points: [
          { wl: 490, r: 18 },
          { wl: 560, r: 24 },
          { wl: 665, r: 31 },
          { wl: 842, r: 40 },
          { wl: 1610, r: 52 },
          { wl: 2190, r: 46 }
        ]
      },
      {
        label: 'Ferruginous Laterite / Iron Oxide',
        color: '#c24b25', // Ochre/Rust
        points: [
          { wl: 490, r: 12 },
          { wl: 560, r: 19 },
          { wl: 665, r: 28 },
          { wl: 842, r: 35 },
          { wl: 1610, r: 44 },
          { wl: 2190, r: 33 }
        ]
      },
      {
        label: 'Sparse Scrub Vegetation',
        color: '#395734', // Forest olive
        points: [
          { wl: 490, r: 7 },
          { wl: 560, r: 16 },
          { wl: 665, r: 8 },
          { wl: 842, r: 54 },
          { wl: 1610, r: 31 },
          { wl: 2190, r: 16 }
        ]
      }
    ];

    curves.forEach(curve => {
      ctx.beginPath();
      ctx.strokeStyle = curve.color;
      ctx.lineWidth = 2.4;

      curve.points.forEach((pt, i) => {
        const x = getX(pt.wl);
        const y = padding.top + graphHeight - (pt.r / 70) * graphHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      curve.points.forEach(pt => {
        const x = getX(pt.wl);
        const y = padding.top + graphHeight - (pt.r / 70) * graphHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = curve.color;
        ctx.fill();
      });
    });

    // Diagnostic annotation
    const diagX = getX(2190);
    const diagY = padding.top + graphHeight - (12 / 70) * graphHeight;
    ctx.strokeStyle = '#a83d1c';
    ctx.beginPath();
    ctx.arc(diagX, diagY, 7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#a83d1c';
    ctx.font = 'bold 10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('← Mn-OH / Alteration absorption trough (B12)', diagX + 12, diagY + 4);

  }, [activeBand]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">Diagnostic Spectral Reflectance Curves (Sentinel-2 MSI)</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            Laboratory & Satellite Ground-Truth Endmember Signatures (USGS / GSI Spectral Library)
          </div>
        </div>
        <div className="chart-legend">
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#a83d1c' }}></span>
            <span>Manganese Oxides</span>
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#7a5023' }}></span>
            <span>Gondite / Quartzite</span>
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#c24b25' }}></span>
            <span>Ferruginous Host</span>
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#395734' }}></span>
            <span>Scrub Cover</span>
          </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '300px', display: 'block' }} 
      />

      <div style={{ 
        marginTop: '1rem', 
        padding: '0.75rem 1rem', 
        backgroundColor: 'var(--bg-surface)', 
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xs)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <strong style={{ color: 'var(--mineral-charcoal)' }}>Spectral Key Takeaway:</strong> Manganese oxides exhibit low overall albedo with a sharp diagnostic absorption trough in SWIR-2 (2190nm), contrasting strongly with high-reflectance quartzite host rocks.
        </div>
        <span className="badge badge-rust">Band Ratio Index: B11 / B12</span>
      </div>
    </div>
  );
}
