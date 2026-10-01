import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Production Intelligence | Exploration to Production Planning - MIN-GEO-AI',
  description: 'Bridging mineral exploration with long-term mine planning, domestic raw material security, and steel industry supply chain stabilization.',
};

export default function ProductionPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">STRATEGIC SUPPLY CHAIN TRIAGE</span>
          <h1 style={{ marginBottom: '1rem' }}>From Exploration to Production Planning</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            Identifying a spectral anomaly from space is merely the first step. To overcome India’s strategic manganese shortfalls, exploration targets must be methodically funneled through the United Nations Framework Classification (UNFC) lifecycle.
          </p>
        </div>
      </section>

      {/* Visual Lifecycle Flow */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">MINING LIFECYCLE PROGRESSION</span>
            <h2 className="section-title">The Target-to-Production Pipeline</h2>
            <p className="section-desc">
              How space technology accelerates the pre-competitive exploration timeline.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '1rem',
            margin: '2rem 0'
          }}>
            {[
              {
                step: '01',
                title: 'Potential Zone',
                stage: 'UNFC G4 Pre-Target',
                desc: 'Satellite SWIR-2 anomaly + lithology intersection.'
              },
              {
                step: '02',
                title: 'Exploration Priority',
                stage: 'Spatial Triage',
                desc: 'Multi-layer ML ranking based on infrastructure and access.'
              },
              {
                step: '03',
                title: 'Geological Survey',
                stage: 'UNFC G4 / G3',
                desc: 'Ground magnetic profiling and geochemical pitting.'
              },
              {
                step: '04',
                title: 'Resource Assessment',
                stage: 'UNFC G2 Indicated',
                desc: 'Close-grid diamond core drilling and assay 3D modeling.'
              },
              {
                step: '05',
                title: 'Mine Planning',
                stage: 'UNFC G1 Feasibility',
                desc: 'Open-cast vs. underground geotechnical feasibility.'
              },
              {
                step: '06',
                title: 'Production Support',
                stage: 'Active Ore Extraction',
                desc: 'Supplying domestic steel mills & EV battery precursors.'
              }
            ].map((node) => (
              <div key={node.step} className="card" style={{ borderTop: '3px solid var(--earth-rust)', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-rust-light)', fontWeight: 700 }}>
                  STAGE {node.step}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0', color: 'var(--text-primary)' }}>
                  {node.title}
                </div>
                <div className="badge badge-bronze" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  {node.stage}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {node.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="callout callout-warning">
            <div className="callout-title">
              <span>DECISION SUPPORT PRINCIPLE</span>
            </div>
            <div>
              <strong>MIN-GEO-AI is a decision-support and prioritization system</strong>, not an automatic reserve certification tool. It dramatically compresses the pre-competitive G4 reconnaissance phase from 3 years to 4 months, empowering agencies like GSI, MECL, and state DMGs to direct drilling rigs only to zones with the highest statistical prospectivity.
            </div>
          </div>
        </div>
      </section>

      {/* Production & Exploration Dashboard Metrics */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">REGIONAL INVENTORY & TRIAGE STATUS</span>
            <h2 className="section-title">Production Belt Health & Target Pipeline</h2>
            <p className="section-desc">
              Overview of target distribution across primary Indian manganese metallogenic provinces.
            </p>
          </div>

          <div className="tech-table-container">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Metallogenic Belt</th>
                  <th>Primary States</th>
                  <th>Identified Targets</th>
                  <th>High Priority (P1)</th>
                  <th>Field Validated</th>
                  <th>Avg Ore Grade Potential</th>
                  <th>Strategic Target Contribution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Sausar Fold Belt</td>
                  <td>Madhya Pradesh, Maharashtra</td>
                  <td>28 Targets</td>
                  <td><span className="badge badge-rust">12 P1 Targets</span></td>
                  <td>6 Verified</td>
                  <td>High Grade (42–48% Mn)</td>
                  <td>Primary alloy & ferromanganese feed</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Dharwar Schist Belt</td>
                  <td>Karnataka (Sandur, Bellary)</td>
                  <td>19 Targets</td>
                  <td><span className="badge badge-bronze">6 P1 Targets</span></td>
                  <td>3 Verified</td>
                  <td>Medium Grade (34–38% Mn)</td>
                  <td>South India mini-steel plants</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Gangpur & Bonai Group</td>
                  <td>Odisha, Jharkhand</td>
                  <td>22 Targets</td>
                  <td><span className="badge badge-rust">9 P1 Targets</span></td>
                  <td>4 Verified</td>
                  <td>Medium-High (36–44% Mn)</td>
                  <td>Eastern steel cluster (Tata, SAIL, JSW)</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Aravalli Supergroup</td>
                  <td>Rajasthan, Gujarat</td>
                  <td>11 Targets</td>
                  <td><span className="badge badge-olive">2 P1 Targets</span></td>
                  <td>1 Verified</td>
                  <td>Low-Medium (28–34% Mn)</td>
                  <td>Beneficiation & chemical feed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <h4 style={{ color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>Capex Optimization & Avoided Costs</h4>
              <p style={{ fontSize: '0.88rem' }}>
                At an average diamond core drilling rate of ₹12,000/m, drilling 20 blind greenfield boreholes of 200m depth costs ₹4.8 Crores. By screening out 68% of unviable barren land using spaceborne SWIR and structural lineament models, exploration agencies conserve crores in drilling capital.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: 'var(--earth-rust-light)', marginBottom: '0.5rem' }}>Accelerating Mineral Block Auctions</h4>
              <p style={{ fontSize: '0.88rem' }}>
                Under the amended MMDR Act, State Governments require high-quality Geological Reports (GR) to auction composite licenses (CL). The platform outputs GIS-ready exploration dossiers that streamline the preparation of pre-auction geological documentation.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/architecture" className="btn btn-primary">
              Inspect System Software & Data Architecture →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
