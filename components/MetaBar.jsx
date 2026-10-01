import React from 'react';

export default function MetaBar() {
  return (
    <div className="meta-bar">
      <div className="meta-bar-inner">
        <div className="meta-badge">
          <span>GOVERNMENT OF INDIA</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>MINISTRY OF MINES</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>GEOLOGICAL SURVEY OF INDIA</span>
        </div>
        <div className="meta-status">
          <span className="pulse-dot"></span>
          <span>ORBITAL TELEMETRY: SENTINEL-2 / CARTOSAT-1 STEREO ACTIVE</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span style={{ color: 'var(--earth-sand)' }}>TARGET CRATONS: SAUSAR, DHARWAR & GANGPUR</span>
        </div>
      </div>
    </div>
  );
}
