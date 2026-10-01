/**
 * MIN-GEO-AI: Scientific Canvas Visualizations
 * Grounded Geological Survey & Remote Sensing Visualizations
 */

// Utility: High DPI Canvas initialization
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width: rect.width, height: rect.height };
}

/**
 * 1. Spectral Signature Chart
 * Demonstrates diagnostic reflectance differences between manganese oxides,
 * iron oxides, quartzite host rock, and vegetation across Sentinel-2 bands.
 */
function renderSpectralChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const { ctx, width, height } = setupCanvas(canvas);

  const padding = { top: 30, right: 30, bottom: 45, left: 55 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Background grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;

  // Horizontal grid lines (Reflectance 0% to 70%)
  for (let r = 0; r <= 70; r += 10) {
    const y = padding.top + graphHeight - (r / 70) * graphHeight;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + graphWidth, y);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#7e8998';
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${r}%`, padding.left - 8, y + 4);
  }

  // Wavelength bands (Sentinel-2 MSI)
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

  // Vertical band markers
  bands.forEach(b => {
    const x = getX(b.wl);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.setLineDash([3, 3]);
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, padding.top + graphHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Band label
    ctx.fillStyle = '#b8c0cc';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(b.name, x, padding.top + graphHeight + 18);
  });

  // Endmember spectral response curves (% reflectance)
  // [B2, B3, B4, B8, B11, B12]
  const curves = [
    {
      label: 'Manganese Oxides (Pyrolusite/Braunite)',
      color: '#e06c42', // Terracotta/Rust
      width: 2.5,
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
      color: '#d8c7a9', // Sand/Beige
      width: 2,
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
      color: '#b8864d', // Bronze
      width: 1.8,
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
      color: '#5f7457', // Muted olive
      width: 1.5,
      points: [
        { wl: 490, r: 7 },
        { wl: 560, r: 16 },
        { wl: 665, r: 8 },
        { wl: 842, r: 54 }, // Red edge peak
        { wl: 1610, r: 31 },
        { wl: 2190, r: 16 }
      ]
    }
  ];

  // Draw curves
  curves.forEach(curve => {
    ctx.beginPath();
    ctx.strokeStyle = curve.color;
    ctx.lineWidth = curve.width;

    curve.points.forEach((pt, i) => {
      const x = getX(pt.wl);
      const y = padding.top + graphHeight - (pt.r / 70) * graphHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw data points
    curve.points.forEach(pt => {
      const x = getX(pt.wl);
      const y = padding.top + graphHeight - (pt.r / 70) * graphHeight;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = curve.color;
      ctx.fill();
    });
  });

  // Diagnostic absorption annotation
  const diagX = getX(2190);
  const diagY = padding.top + graphHeight - (12 / 70) * graphHeight;
  ctx.fillStyle = '#e06c42';
  ctx.beginPath();
  ctx.arc(diagX, diagY, 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('← Mn-OH / Alteration absorption trough', diagX + 10, diagY + 3);
}

/**
 * 2. Model Performance Benchmarks (ROC-AUC & Metrics)
 */
function renderModelComparisonChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const { ctx, width, height } = setupCanvas(canvas);

  const padding = { top: 30, right: 30, bottom: 40, left: 110 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);

  const models = [
    { name: 'XGBoost', auc: 0.914, f1: 0.887, prec: 0.895, rec: 0.880, color: '#c85a32' },
    { name: 'Random Forest', auc: 0.892, f1: 0.864, prec: 0.871, rec: 0.858, color: '#996e3e' },
    { name: 'SVM (RBF)', auc: 0.835, f1: 0.801, prec: 0.812, rec: 0.791, color: '#5f7457' },
    { name: 'Logistic Reg.', auc: 0.761, f1: 0.724, prec: 0.740, rec: 0.710, color: '#3d4754' }
  ];

  const barHeight = Math.min(32, graphHeight / (models.length * 1.6));
  const rowSpacing = graphHeight / models.length;

  models.forEach((m, idx) => {
    const y = padding.top + idx * rowSpacing + (rowSpacing - barHeight) / 2;

    // Model Label
    ctx.fillStyle = '#f2f1ed';
    ctx.font = '12px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(m.name, padding.left - 12, y + barHeight / 2 + 4);

    // Background track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(padding.left, y, graphWidth, barHeight);

    // ROC-AUC Bar
    const barW = m.auc * graphWidth;
    ctx.fillStyle = m.color;
    ctx.fillRect(padding.left, y, barW, barHeight);

    // Score label inside/beside bar
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`AUC: ${m.auc.toFixed(3)} | F1: ${m.f1.toFixed(3)}`, padding.left + 8, y + barHeight / 2 + 4);
  });

  // Axis lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + graphHeight);
  ctx.lineTo(padding.left + graphWidth, padding.top + graphHeight);
  ctx.stroke();

  // Bottom ticks (0.6 to 1.0)
  for (let val = 0.6; val <= 1.0; val += 0.1) {
    const x = padding.left + val * graphWidth;
    ctx.fillStyle = '#7e8998';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(val.toFixed(1), x, padding.top + graphHeight + 15);
  }
}

/**
 * 3. Feature Importance Chart
 */
function renderFeatureImportanceChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const { ctx, width, height } = setupCanvas(canvas);

  const padding = { top: 25, right: 30, bottom: 25, left: 160 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);

  const features = [
    { name: 'SWIR-2 / NIR Ratio', weight: 0.28, color: '#c85a32' },
    { name: 'Lineament Proximity (km)', weight: 0.22, color: '#b86c3d' },
    { name: 'Host Lithology (Sausar)', weight: 0.19, color: '#996e3e' },
    { name: 'Fe3+/Fe2+ Spectral Index', weight: 0.14, color: '#826543' },
    { name: 'DEM Slope & Curvature', weight: 0.11, color: '#5f7457' },
    { name: 'Stream Power Index (SPI)', weight: 0.06, color: '#475569' }
  ];

  const rowHeight = graphHeight / features.length;
  const barHeight = Math.min(22, rowHeight * 0.65);

  features.forEach((f, i) => {
    const y = padding.top + i * rowHeight + (rowHeight - barHeight) / 2;

    // Feature Name
    ctx.fillStyle = '#b8c0cc';
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(f.name, padding.left - 10, y + barHeight / 2 + 4);

    // Track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(padding.left, y, graphWidth, barHeight);

    // Bar
    const barW = (f.weight / 0.35) * graphWidth;
    ctx.fillStyle = f.color;
    ctx.fillRect(padding.left, y, barW, barHeight);

    // Percentage Label
    ctx.fillStyle = '#d8c7a9';
    ctx.font = 'bold 11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${(f.weight * 100).toFixed(0)}%`, padding.left + barW + 8, y + barHeight / 2 + 4);
  });
}

/**
 * 4. Production Shortfall & Demand Forecast Chart (2020 - 2035)
 */
function renderProductionGapChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const { ctx, width, height } = setupCanvas(canvas);

  const padding = { top: 30, right: 35, bottom: 45, left: 55 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);

  const years = [2020, 2022, 2024, 2026, 2028, 2030, 2032, 2035];
  // Million Tonnes (Mt)
  const projectedDemand = [2.9, 3.4, 4.1, 5.0, 6.2, 7.8, 9.4, 11.2]; // Driven by 300Mt National Steel Policy + EV Batteries
  const baselineProduction = [2.8, 2.7, 2.9, 3.0, 3.1, 3.2, 3.2, 3.3]; // Current depletion rate
  const aiAssistedTarget = [2.8, 2.7, 2.9, 3.4, 4.3, 5.8, 7.6, 9.5]; // With rapid remote-sensing triage

  const maxVal = 12;

  function getY(val) {
    return padding.top + graphHeight - (val / maxVal) * graphHeight;
  }

  function getX(idx) {
    return padding.left + (idx / (years.length - 1)) * graphWidth;
  }

  // Grid
  for (let v = 0; v <= maxVal; v += 2) {
    const y = getY(v);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + graphWidth, y);
    ctx.stroke();

    ctx.fillStyle = '#7e8998';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${v} Mt`, padding.left - 8, y + 4);
  }

  // Draw shortfall area between demand and baseline
  ctx.beginPath();
  years.forEach((yr, i) => {
    const x = getX(i);
    const y = getY(projectedDemand[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  for (let i = years.length - 1; i >= 0; i--) {
    const x = getX(i);
    const y = getY(baselineProduction[i]);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(200, 90, 50, 0.12)';
  ctx.fill();

  // Lines helper
  function drawLine(data, color, width, dashed = false) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([4, 4]);
    else ctx.setLineDash([]);

    data.forEach((val, i) => {
      const x = getX(i);
      const y = getY(val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Dots
    data.forEach((val, i) => {
      const x = getX(i);
      const y = getY(val);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  drawLine(projectedDemand, '#e06c42', 2.5); // Demand
  drawLine(baselineProduction, '#7e8998', 2); // Baseline
  drawLine(aiAssistedTarget, '#22c55e', 2, true); // AI Target

  // Year labels
  years.forEach((yr, i) => {
    const x = getX(i);
    ctx.fillStyle = '#b8c0cc';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(yr.toString(), x, padding.top + graphHeight + 18);
  });

  // Shortfall Callout label
  const midX = getX(5);
  const midY = (getY(projectedDemand[5]) + getY(baselineProduction[5])) / 2;
  ctx.fillStyle = '#e06c42';
  ctx.font = 'bold 10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CRITICAL IMPORT GAP', midX, midY - 6);
  ctx.fillText('(4.6 Mt Deficit)', midX, midY + 8);
}

// Auto-initialize charts on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderSpectralChart('spectralChart');
  renderModelComparisonChart('modelChart');
  renderFeatureImportanceChart('featureChart');
  renderProductionGapChart('productionGapChart');

  // Handle resize gracefully
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderSpectralChart('spectralChart');
      renderModelComparisonChart('modelChart');
      renderFeatureImportanceChart('featureChart');
      renderProductionGapChart('productionGapChart');
    }, 250);
  });
});
