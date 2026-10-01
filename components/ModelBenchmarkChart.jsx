'use client';

import React, { useEffect, useRef } from 'react';

export default function ModelBenchmarkChart() {
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

    const padding = { top: 25, right: 30, bottom: 40, left: 140 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const models = [
      { name: 'XGBoost (Selected)', auc: 0.914, f1: 0.887, prec: 0.895, rec: 0.880, color: '#a83d1c' },
      { name: 'Random Forest', auc: 0.892, f1: 0.864, prec: 0.871, rec: 0.858, color: '#7a5023' },
      { name: 'Support Vector Machine', auc: 0.835, f1: 0.801, prec: 0.812, rec: 0.791, color: '#395734' },
      { name: 'Logistic Regression', auc: 0.761, f1: 0.724, prec: 0.740, rec: 0.710, color: '#5e6b7d' }
    ];

    const rowSpacing = graphHeight / models.length;
    const barHeight = Math.min(28, rowSpacing * 0.65);

    models.forEach((m, idx) => {
      const y = padding.top + idx * rowSpacing + (rowSpacing - barHeight) / 2;

      ctx.fillStyle = '#151a21';
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(m.name, padding.left - 12, y + barHeight / 2 + 4);

      // Background track
      ctx.fillStyle = '#f0ebe1';
      ctx.fillRect(padding.left, y, graphWidth, barHeight);

      // AUC bar
      const barW = m.auc * graphWidth;
      ctx.fillStyle = m.color;
      ctx.fillRect(padding.left, y, barW, barHeight);

      // Label inside bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`ROC-AUC: ${m.auc.toFixed(3)}  |  F1: ${m.f1.toFixed(3)}`, padding.left + 10, y + barHeight / 2 + 4);
    });

    // Axis
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + graphHeight);
    ctx.lineTo(padding.left + graphWidth, padding.top + graphHeight);
    ctx.stroke();

    for (let val = 0.5; val <= 1.0; val += 0.1) {
      const x = padding.left + val * graphWidth;
      ctx.fillStyle = '#5e6b7d';
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(val.toFixed(1), x, padding.top + graphHeight + 15);
    }
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">Model Architecture Comparison & Cross-Validation ROC-AUC</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            Spatial 5-Fold Cross-Validation on Sausar Fold Belt Training Samples
          </div>
        </div>
        <span className="badge badge-rust">DEMO DATA / BENCHMARK</span>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '260px', display: 'block' }} 
      />

      <div className="tech-table-container" style={{ margin: '1rem 0 0' }}>
        <table className="tech-table">
          <thead>
            <tr>
              <th>Model Architecture</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
              <th>ROC-AUC</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: 'var(--mineral-charcoal)', fontWeight: 700 }}>XGBoost Classifier</td>
              <td>89.4%</td>
              <td>89.5%</td>
              <td>88.0%</td>
              <td style={{ color: 'var(--earth-rust)', fontWeight: 700 }}>0.887</td>
              <td style={{ color: 'var(--earth-rust)', fontWeight: 700 }}>0.914</td>
              <td><span className="badge badge-success">Selected</span></td>
            </tr>
            <tr>
              <td>Random Forest (500 Trees)</td>
              <td>87.2%</td>
              <td>87.1%</td>
              <td>85.8%</td>
              <td>0.864</td>
              <td>0.892</td>
              <td><span className="badge badge-bronze">Candidate</span></td>
            </tr>
            <tr>
              <td>Support Vector Machine (RBF)</td>
              <td>81.6%</td>
              <td>81.2%</td>
              <td>79.1%</td>
              <td>0.801</td>
              <td>0.835</td>
              <td><span className="badge badge-olive">Baseline</span></td>
            </tr>
            <tr>
              <td>Logistic Regression</td>
              <td>73.5%</td>
              <td>74.0%</td>
              <td>71.0%</td>
              <td>0.724</td>
              <td>0.761</td>
              <td><span className="badge">Linear Ref</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
