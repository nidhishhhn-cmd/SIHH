'use client';

import React, { useEffect, useRef } from 'react';

export default function ProductionGapChart() {
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

    const padding = { top: 30, right: 35, bottom: 45, left: 60 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const years = [2020, 2022, 2024, 2026, 2028, 2030, 2032, 2035];
    const projectedDemand = [2.9, 3.4, 4.1, 5.0, 6.2, 7.8, 9.4, 11.2]; 
    const baselineProduction = [2.8, 2.7, 2.9, 3.0, 3.1, 3.2, 3.2, 3.3]; 
    const aiAssistedTarget = [2.8, 2.7, 2.9, 3.4, 4.3, 5.8, 7.6, 9.5]; 

    const maxVal = 12;

    function getY(val) {
      return padding.top + graphHeight - (val / maxVal) * graphHeight;
    }

    function getX(idx) {
      return padding.left + (idx / (years.length - 1)) * graphWidth;
    }

    // Grid lines
    for (let v = 0; v <= maxVal; v += 2) {
      const y = getY(v);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + graphWidth, y);
      ctx.stroke();

      ctx.fillStyle = '#5e6b7d';
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${v} Mt`, padding.left - 8, y + 4);
    }

    // Deficit area
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
    ctx.fillStyle = 'rgba(168, 61, 28, 0.12)';
    ctx.fill();

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

      data.forEach((val, i) => {
        const x = getX(i);
        const y = getY(val);
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    }

    drawLine(projectedDemand, '#a83d1c', 2.6); // Terracotta demand
    drawLine(baselineProduction, '#5e6b7d', 2); // Slate baseline
    drawLine(aiAssistedTarget, '#15803d', 2.2, true); // Green target

    years.forEach((yr, i) => {
      const x = getX(i);
      ctx.fillStyle = '#151a21';
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(yr.toString(), x, padding.top + graphHeight + 18);
    });

    const midX = getX(5);
    const midY = (getY(projectedDemand[5]) + getY(baselineProduction[5])) / 2;
    ctx.fillStyle = '#a83d1c';
    ctx.font = 'bold 10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CRITICAL IMPORT GAP', midX, midY - 6);
    ctx.fillText('(4.6 Mt Deficit)', midX, midY + 8);
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">India Manganese Ore Demand vs Domestic Supply Trajectory (2020–2035)</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            Impact of 300 MT National Steel Policy Target & Emerging EV Battery Cathode Supply Pressure
          </div>
        </div>
        <div className="chart-legend">
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#a83d1c' }}></span>
            <span>Projected Demand (NSP + EV)</span>
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#5e6b7d' }}></span>
            <span>Current Baseline Production</span>
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot" style={{ backgroundColor: '#15803d' }}></span>
            <span>With AI Exploration Triage</span>
          </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '280px', display: 'block' }} 
      />
    </div>
  );
}
