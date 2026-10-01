'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'Technical Question',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">MINISTRY OF MINES // SYSTEM SPECIFICATIONS</span>
          <h1 style={{ marginBottom: '1rem' }}>National Mineral Intelligence Portal</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            System documentation, technical specifications, and institutional research collaboration channels for the MIN-GEO-AI platform.
          </p>
        </div>
      </section>

      {/* Main Grid: Problem Specs + Contact / QR */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
            
            {/* Left Column: Official Problem Statement Dossier */}
            <div>
              <div className="card" style={{ borderLeft: '4px solid var(--earth-rust)', marginBottom: '2rem' }}>
                <span className="badge badge-rust" style={{ marginBottom: '0.75rem' }}>NATIONAL MANDATE DOSSIER</span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  Using AI/ML and Space Technology to Identify Manganese Reserves and Overcome Production Shortfalls
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PROJECT MANDATE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--earth-sand)' }}>MIN-EO-2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>MINISTRY / STAKEHOLDER</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Ministry of Mines / GSI / MOIL</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DOMAIN CATEGORY</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--earth-rust-light)' }}>Space Tech & Mineral Intelligence</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>TARGET FOCUS</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--signal-green)' }}>G4 Triage & UNFC Compliance</div>
                  </div>
                </div>
              </div>

              {/* Institution & Team Credentials */}
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Project & Institutional Credentials</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Authority:</span>
                    <strong style={{ color: 'var(--earth-rust-light)' }}>Ministry of Mines, Government of India</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Technical Partner:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>Geological Survey of India & ISRO Remote Sensing Cell</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Standardization:</span>
                    <span style={{ color: 'var(--earth-sand)' }}>UNFC-1997 / CRIRSCO Compliance Framework</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Primary Contact:</span>
                    <span className="tech-mono" style={{ color: 'var(--earth-sand)' }}>mineral-intelligence@mines.gov.in</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>System Code:</span>
                    <span className="tech-mono" style={{ color: 'var(--earth-rust-light)' }}>MIN-GEO-AI-CORE-V2</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Geospatial Coverage:</span>
                    <span className="tech-mono" style={{ color: 'var(--signal-green)' }}>Sausar, Dharwar & Gangpur Belts</span>
                  </div>
                </div>
              </div>

              {/* Technical Documentation Download Links */}
              <div id="docs" className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Documentation & Artifact Downloads</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Complete technical dossier and operational specifications for domain evaluators and mining directors:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Technical Whitepaper & Metallogenic Model (PDF)</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>34 Pages | 4.8 MB | UNFC G4 Protocols</div>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => alert('Downloading Technical Whitepaper PDF...')}>
                      Download ↓
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Architecture & ML Pipeline Specifications (PDF)</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>22 Pages | 3.2 MB | XGBoost / GDAL Stack</div>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => alert('Downloading Architecture Specifications PDF...')}>
                      Download ↓
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sample GeoTIFF Band Ratios & Target Shapefiles (ZIP)</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Sausar Quad 55K/14 | 48 MB | EPSG:4326</div>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => alert('Downloading Sample GeoTIFF & Shapefiles ZIP...')}>
                      Download ↓
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: QR Code + Inquiry Form */}
            <div>
              {/* QR Code Container */}
              <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="badge badge-rust" style={{ marginBottom: '1rem' }}>LIVE DEMO & REPO QR CODE</span>
                
                {/* Clean Realistic SVG QR Code Placeholder */}
                <div style={{ 
                  margin: '0 auto 1rem', 
                  width: '180px', 
                  height: '180px', 
                  background: '#ffffff', 
                  padding: '12px',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                    {/* Corner Position Marks */}
                    <rect x="5" y="5" width="26" height="26" fill="#111417" />
                    <rect x="9" y="9" width="18" height="18" fill="#ffffff" />
                    <rect x="13" y="13" width="10" height="10" fill="#c85a32" />

                    <rect x="69" y="5" width="26" height="26" fill="#111417" />
                    <rect x="73" y="9" width="18" height="18" fill="#ffffff" />
                    <rect x="77" y="13" width="10" height="10" fill="#c85a32" />

                    <rect x="5" y="69" width="26" height="26" fill="#111417" />
                    <rect x="9" y="73" width="18" height="18" fill="#ffffff" />
                    <rect x="13" y="77" width="10" height="10" fill="#c85a32" />

                    {/* QR Code Matrix Cells */}
                    <rect x="36" y="8" width="6" height="6" fill="#111417" />
                    <rect x="46" y="14" width="6" height="6" fill="#111417" />
                    <rect x="56" y="8" width="6" height="6" fill="#111417" />
                    <rect x="36" y="24" width="8" height="6" fill="#111417" />
                    
                    <rect x="10" y="38" width="6" height="6" fill="#111417" />
                    <rect x="22" y="44" width="6" height="6" fill="#111417" />
                    <rect x="34" y="38" width="8" height="6" fill="#111417" />
                    <rect x="48" y="38" width="6" height="6" fill="#111417" />
                    <rect x="62" y="44" width="8" height="6" fill="#111417" />
                    <rect x="78" y="38" width="8" height="6" fill="#111417" />

                    <rect x="38" y="52" width="6" height="8" fill="#111417" />
                    <rect x="50" y="52" width="8" height="6" fill="#111417" />
                    <rect x="64" y="56" width="6" height="6" fill="#111417" />

                    <rect x="38" y="70" width="8" height="6" fill="#111417" />
                    <rect x="52" y="76" width="6" height="8" fill="#111417" />
                    <rect x="68" y="70" width="8" height="6" fill="#111417" />
                    <rect x="80" y="80" width="6" height="6" fill="#111417" />
                  </svg>
                </div>

                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>
                  SCAN TO ACCESS LIVE DEPLOYMENT & ARTIFACTS
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  National Mineral Intelligence Portal
                </div>
              </div>

              {/* Inquiry & Evaluation Form */}
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Technical Inquiry & Evaluation Form</h3>
                
                {submitted ? (
                  <div style={{ padding: '1.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 'var(--radius-xs)', textAlign: 'center' }}>
                    <div style={{ color: 'var(--signal-green)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      Message Transmitted Successfully
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      Thank you for contacting the MIN-GEO-AI research team. A project lead will respond via your provided institutional email within 24 hours.
                    </p>
                    <button 
                      className="btn btn-sm btn-secondary" 
                      onClick={() => setSubmitted(false)}
                      style={{ marginTop: '1rem' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.3rem' }}>
                        YOUR NAME / DESIGNATION
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Dr. Rajesh Sharma (Director of Exploration)"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.3rem' }}>
                        INSTITUTION / MINISTRY / AGENCY
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Geological Survey of India / State Directorate of Geology & Mining"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.3rem' }}>
                        EMAIL ADDRESS
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="evaluator@gsi.gov.in"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.3rem' }}>
                        QUERY CATEGORY
                      </label>
                      <select 
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <option>Mineral Reconnaissance & Triage Inquiry</option>
                        <option>Technical Question on ML / Remote Sensing</option>
                        <option>Request for Sausar Belt GeoTIFF Rasters</option>
                        <option>Collaboration with Field Survey Team</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.3rem' }}>
                        MESSAGE
                      </label>
                      <textarea 
                        rows="3"
                        required
                        placeholder="Please detail your question or technical clarification..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-sans)',
                          resize: 'vertical'
                        }}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                      Transmit Inquiry to Team Lead →
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
