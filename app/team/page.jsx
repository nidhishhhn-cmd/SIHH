import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Research Team | MIN-GEO-AI Mineral Intelligence',
  description: 'Multidisciplinary engineering consortium structure, technical specializations, and institutional credentials.',
};

export default function TeamPage() {
  const members = [
    {
      roleTag: 'TEAM LEADER',
      badgeClass: 'badge-rust',
      name: '[Team Leader Name]',
      title: 'AI/ML Lead & System Architect',
      dept: 'Department of Computer Science & Engineering / Data Science',
      contribution: 'Architected the spatial machine learning pipeline, spatial block cross-validation, and XGBoost/SHAP feature attribution algorithms.',
      skills: ['Python', 'XGBoost', 'Spatial CV', 'System Design']
    },
    {
      roleTag: 'MEMBER 01',
      badgeClass: 'badge-bronze',
      name: '[Member 01 Name]',
      title: 'Remote Sensing & Satellite Image Specialist',
      dept: 'Department of Geoinformatics / Remote Sensing',
      contribution: 'Implemented Sen2Cor atmospheric correction, Sentinel-2 SWIR-2/NIR band ratio derivations, and Crosta Technique Principal Component Analysis.',
      skills: ['Sentinel-2', 'Landsat-9', 'Sen2Cor', 'Band Math']
    },
    {
      roleTag: 'MEMBER 02',
      badgeClass: 'badge-olive',
      name: '[Member 02 Name]',
      title: 'GIS & Spatial Database Engineer',
      dept: 'Department of Information Technology / Geomatics',
      contribution: 'Constructed the spatial ETL pipeline with GDAL/Rasterio, GSI Bhukosh layer integration, and coordinate reference transformation to EPSG:4326.',
      skills: ['GDAL', 'Rasterio', 'PostGIS', 'QGIS Pipelines']
    },
    {
      roleTag: 'MEMBER 03',
      badgeClass: 'badge-rust',
      name: '[Member 03 Name]',
      title: 'Geological Domain & Metallogenic Modeler',
      dept: 'Department of Earth Sciences / Applied Geology',
      contribution: 'Formulated the structural criteria for Sausar and Dharwar manganese deposition, lineament shear identification, and UNFC G4 reporting criteria.',
      skills: ['Structural Geology', 'Metallogeny', 'UNFC Code', 'Petrology']
    },
    {
      roleTag: 'MEMBER 04',
      badgeClass: 'badge-bronze',
      name: '[Member 04 Name]',
      title: 'Full Stack GIS & Dashboard Developer',
      dept: 'Department of Computer Science & Engineering',
      contribution: 'Developed the interactive Leaflet GIS command center, custom HUD telemetry overlays, Canvas scientific charts, and scenario simulation engine.',
      skills: ['Next.js', 'React', 'Leaflet.js', 'HTML5 Canvas']
    },
    {
      roleTag: 'MEMBER 05',
      badgeClass: 'badge-olive',
      name: '[Member 05 Name]',
      title: 'Data Engineering & Field Validation Coordinator',
      dept: 'Department of Mining Engineering / Geology',
      contribution: 'Curated historical mine datasets, ground-truth GPS coordinates, production gap econometric models, and field validation protocols.',
      skills: ['Data Mining', 'GPS Ground Truth', 'Supply Analysis', 'ETL']
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="section-alt" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <span className="section-label">MINISTRY OF MINES // RESEARCH CONSORTIUM</span>
          <h1 style={{ marginBottom: '1rem' }}>Project Engineering & Research Team</h1>
          <p style={{ maxWidth: '820px', fontSize: '1.15rem', color: 'var(--earth-sand)' }}>
            A multidisciplinary engineering and Earth observation consortium combining expertise in spatial machine learning, satellite remote sensing, structural metallogeny, and geospatial software systems.
          </p>

          <div style={{ 
            marginTop: '1.5rem', 
            display: 'flex', 
            gap: '1.5rem', 
            flexWrap: 'wrap',
            background: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.86rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>INITIATIVE: </span>
              <strong style={{ color: 'var(--earth-rust-light)' }}>National Critical Minerals Mission</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>AFFILIATION: </span>
              <strong style={{ color: 'var(--text-primary)' }}>Geological Survey of India & ISRO Remote Sensing Cell</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>FRAMEWORK: </span>
              <strong style={{ color: 'var(--earth-sand)' }}>UNFC-1997 / CRIRSCO Compliance</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">TEAM MEMBERS & ROLES</span>
            <h2 className="section-title">Multidisciplinary Student Contributors</h2>
            <p className="section-desc">
              All member profiles are fully documented with specific technical contributions to the MIN-GEO-AI platform.
            </p>
          </div>

          <div className="team-grid">
            {members.map((m, index) => (
              <div key={index} className="team-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="team-avatar-box">
                    <span>{m.roleTag === 'TEAM LEADER' ? 'TL' : `M${index}`}</span>
                  </div>
                  <span className={`badge ${m.badgeClass}`}>{m.roleTag}</span>
                </div>

                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.title}</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {m.dept}
                </div>
                
                <p className="team-bio">{m.contribution}</p>

                <div className="team-skills">
                  {m.skills.map((skill) => (
                    <span key={skill} className="badge" style={{ fontSize: '0.7rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Academic Advisors Section */}
          <div style={{ marginTop: '3.5rem' }}>
            <div className="section-header">
              <span className="section-label">ACADEMIC & DOMAIN MENTORSHIP</span>
              <h2 className="section-title">Faculty Mentors & Geological Advisors</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div className="card" style={{ borderLeft: '3px solid var(--earth-rust)' }}>
                <span className="badge badge-rust" style={{ marginBottom: '0.5rem' }}>FACULTY MENTOR 01</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>[Faculty Mentor Name]</h3>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.75rem' }}>
                  Professor / Associate Professor, Department of Computer Science / AI
                </div>
                <p style={{ fontSize: '0.86rem' }}>
                  Provided guidance on geospatial machine learning architectures, cross-validation protocols, and high-performance computing pipelines.
                </p>
              </div>

              <div className="card" style={{ borderLeft: '3px solid var(--earth-bronze)' }}>
                <span className="badge badge-bronze" style={{ marginBottom: '0.5rem' }}>DOMAIN ADVISOR 02</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>[Geological Advisor Name]</h3>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)', marginBottom: '0.75rem' }}>
                  Senior Geologist / Professor, Department of Geology / Earth Sciences
                </div>
                <p style={{ fontSize: '0.86rem' }}>
                  Advised on metallogenic models of Indian manganese deposits, Sausar/Dharwar stratigraphy, and UNFC mineral resource classification standards.
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/contact" className="btn btn-primary">
              View Technical Specifications & Contact Info →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
