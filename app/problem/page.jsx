import React from 'react';
import Link from 'next/link';
import ProductionGapChart from '@/components/ProductionGapChart';

export const metadata = {
  title: 'The Challenge | Manganese Demand & Exploration Bottlenecks - MIN-GEO-AI',
  description: 'Analysis of India’s manganese production shortfall, steel demand expansion, import dependency, and greenfield exploration challenges.',
};

export default function ProblemPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">STRATEGIC CONTEXT & BOTTLENECKS</span>
          <h1 style={{ marginBottom: '1rem' }}>The Challenge</h1>
          <p style={{ maxWidth: '800px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            Manganese is an irreplaceable strategic mineral for steelmaking and green energy storage. However, depleting high-grade reserves, escalating import dependencies, and slow conventional exploration cycles threaten industrial self-reliance.
          </p>
        </div>
      </section>

      {/* Production Gap Chart Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">MACROECONOMIC ANALYSIS</span>
            <h2 className="section-title">The Widening Manganese Deficit</h2>
            <p className="section-desc">
              India produces approximately 2.8 to 3.0 Million Tonnes (Mt) of manganese ore annually, but the National Steel Policy target of 300 MT crude steel by 2030–31 requires more than 10 MT of manganese ore per year.
            </p>
          </div>

          <ProductionGapChart />

          <div className="callout callout-warning">
            <div className="callout-title">
              <span>CRITICAL NATIONAL DEPENDENCY</span>
            </div>
            <div>
              Over <strong>55% of India’s high-grade manganese requirement (&gt;44% Mn)</strong> is currently imported from South Africa, Gabon, and Australia. Without rapid discovery and conversion of domestic G4/G3 prospective belts, foreign exchange outflow and global supply chain vulnerability will escalate exponentially.
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Problem Pillars */}
      <section className="section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            
            {/* 1. Demand */}
            <div className="card">
              <div className="card-title">
                <span>01. Manganese Demand</span>
                <span className="badge badge-rust">Industrial Core</span>
              </div>
              <p style={{ fontSize: '0.92rem' }}>
                Manganese (Mn) has no known economic substitute in steel production. It acts as an essential desulfurizing and deoxidizing agent, improving toughness, hardness, and tensile strength.
              </p>
              
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>
                  KEY INDUSTRIAL DRIVERS:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  <li>• <strong>Steel Production (90% share):</strong> ~10 kg of manganese alloy is consumed for every metric ton of crude steel.</li>
                  <li>• <strong>EV & Battery Energy Storage:</strong> High-purity manganese sulphate monohydrate (HPMSM) is vital for NMC and next-generation sodium-ion battery cathodes.</li>
                  <li>• <strong>Specialty Alloys & Defense:</strong> High-manganese austenitic steels for cryogenic storage, rail tracks, and defense armor plating.</li>
                  <li>• <strong>Chemical & Agricultural:</strong> Essential trace mineral for fertilizers, water treatment reagents, and dry-cell cathodes.</li>
                </ul>
              </div>
            </div>

            {/* 2. Production Shortfalls */}
            <div className="card">
              <div className="card-title">
                <span>02. Production Shortfalls</span>
                <span className="badge badge-bronze">Supply Squeeze</span>
              </div>
              <p style={{ fontSize: '0.92rem' }}>
                While India possesses significant total resources of manganese ore (~500 Mt), less than <strong>20% falls into proven economic mineable reserves (UNFC G1/G2 category)</strong>.
              </p>

              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>
                  STRUCTURAL SUPPLY PRESSURES:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  <li>• <strong>High-Grade Depletion:</strong> Major open pits in the Sausar and Bonai belts are encountering deeper overburden and lower Mn:Fe grade ratios.</li>
                  <li>• <strong>Underground Transition Capex:</strong> Open-pit mines transitioning to deeper underground operations face 5–8 year gestation periods.</li>
                  <li>• <strong>Escalating Import Costs:</strong> Domestic smelters are compelled to blend imported high-grade African ore with low-grade domestic ore, driving up steel production costs.</li>
                  <li>• <strong>Export Restrictions & Tariffs:</strong> International supply bottlenecks directly impact Indian secondary steelmakers.</li>
                </ul>
              </div>
            </div>

            {/* 3. Exploration Challenges */}
            <div className="card">
              <div className="card-title">
                <span>03. Exploration Bottlenecks</span>
                <span className="badge badge-olive">Technical Silo</span>
              </div>
              <p style={{ fontSize: '0.92rem' }}>
                Conventional mineral exploration relies heavily on surface outcrop hammer mapping, random stream sediment grids, and blind exploratory drilling.
              </p>

              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.5rem' }}>
                  TECHNICAL FIELD CHALLENGES:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  <li>• <strong>Deep Regolith & Thick Overburden:</strong> Potential blind manganese deposits are concealed beneath dense Deccan Trap basalt caps or alluvial soils.</li>
                  <li>• <strong>High Core Drilling Capex:</strong> Diamond core drilling costs ₹8,000–₹15,000 per meter; drilling barren holes wastes millions in public and private capital.</li>
                  <li>• <strong>Multispectral Data Silos:</strong> Satellite Earth observation data (Sentinel-2, Landsat) often remains disconnected from field structural geology.</li>
                  <li>• <strong>Lengthy Discovery Horizons:</strong> Traditional discovery-to-mining cycles currently average 8 to 12 years.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison: Traditional vs AI-Assisted Exploration */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">OPERATIONAL PARADIGM SHIFT</span>
            <h2 className="section-title">Conventional Exploration vs. Space-AI Triage</h2>
            <p className="section-desc">
              How remote sensing and machine learning triage huge search envelopes before expensive drilling commences.
            </p>
          </div>

          <div className="tech-table-container">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Exploration Metric</th>
                  <th>Traditional Geological Survey</th>
                  <th>MIN-GEO-AI Space + ML Pipeline</th>
                  <th>Operational Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Targeting Area Search Scale</td>
                  <td>Limited to regional foot-traverses (10–50 km²/season)</td>
                  <td style={{ color: 'var(--earth-rust-light)', fontWeight: 600 }}>Regional synoptic coverage (&gt;5,000 km²/run)</td>
                  <td>100x broader reconnaissance coverage</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Triage Time to Drilling (G4)</td>
                  <td>24 to 36 months of manual sampling</td>
                  <td style={{ color: 'var(--earth-rust-light)', fontWeight: 600 }}>3 to 6 months data-driven prioritization</td>
                  <td>60% faster project turnaround</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Barren Borehole Risk</td>
                  <td>High (65–80% barren drillholes in greenfield)</td>
                  <td style={{ color: 'var(--earth-rust-light)', fontWeight: 600 }}>Significantly reduced via multi-layer ML validation</td>
                  <td>Millions saved in wasteful drilling capex</td>
                </tr>
                <tr>
                  <td style={{ color: '#ffffff', fontWeight: 600 }}>Spectral Alteration Mapping</td>
                  <td>Costly laboratory point spectrometers only</td>
                  <td style={{ color: 'var(--earth-rust-light)', fontWeight: 600 }}>Continuous 10m-pixel SWIR band ratio mapping</td>
                  <td>Maps continuous alteration halos</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Link href="/solution" className="btn btn-primary">
              See How Our Solution Solves This →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
