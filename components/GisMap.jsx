'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GisMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupsRef = useRef({});

  // Layer States
  const [layers, setLayers] = useState({
    satellite: true,
    geology: true,
    elevation: false,
    existingMines: true,
    indicators: true,
    mlProspectivity: true
  });

  // Selected Target for Inspector
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [coords, setCoords] = useState({ lat: 21.8105, lng: 80.1852 });
  const [zoomLevel, setZoomLevel] = useState(7);
  const [selectedBelt, setSelectedBelt] = useState('sausar');

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    let isMounted = true;

    async function initMap() {
      // Import Leaflet dynamically
      const L = (await import('leaflet')).default;

      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Initialize map centered on Central India (Sausar Belt)
      const map = L.map(mapContainerRef.current, {
        center: [21.8, 79.9],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false
      });

      mapInstanceRef.current = map;

      // Add Zoom Control at top-left
      L.control.zoom({ position: 'topleft' }).addTo(map);

      // 1. Basemaps
      // Esri World Imagery (Satellite)
      const satLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18, maxNativeZoom: 17 }
      );

      // CartoDB Dark Matter / Geological Basemap
      const darkLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      );

      // Topographic Terrain
      const topoLayer = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        { maxZoom: 17 }
      );

      satLayer.addTo(map);

      // Layer groups storage
      const layerGroups = {
        satellite: satLayer,
        geology: L.layerGroup().addTo(map),
        elevation: topoLayer,
        existingMines: L.layerGroup().addTo(map),
        indicators: L.layerGroup().addTo(map),
        mlProspectivity: L.layerGroup().addTo(map)
      };

      layerGroupsRef.current = layerGroups;

      // Track mouse position
      map.on('mousemove', (e) => {
        if (isMounted) {
          setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });

      map.on('zoomend', () => {
        if (isMounted) {
          setZoomLevel(map.getZoom());
        }
      });

      // --- 2. Geological Formations (Polygons & Lines) ---
      // Sausar Fold Belt (Archean Metasedimentary Belt)
      const sausarBelt = L.polygon([
        [21.40, 78.85],
        [21.65, 79.40],
        [21.90, 80.45],
        [21.75, 80.60],
        [21.45, 79.95],
        [21.30, 79.10]
      ], {
        color: '#996e3e',
        weight: 1.5,
        fillColor: '#996e3e',
        fillOpacity: 0.15,
        dashArray: '4, 4'
      }).bindTooltip('Sausar Group (Gondite & Quartzite Formation)', { className: 'tech-mono' });
      layerGroups.geology.addLayer(sausarBelt);

      // Dharwar Schist Belt (Sandur Basin)
      const sandurBelt = L.polygon([
        [14.90, 76.40],
        [15.25, 76.50],
        [15.30, 76.75],
        [15.00, 76.65]
      ], {
        color: '#76906d',
        weight: 1.5,
        fillColor: '#5f7457',
        fillOpacity: 0.18,
        dashArray: '4, 4'
      }).bindTooltip('Dharwar Supergroup (Sandur Basin)', { className: 'tech-mono' });
      layerGroups.geology.addLayer(sandurBelt);

      // Gangpur Group (Odisha)
      const gangpurBelt = L.polygon([
        [22.00, 84.80],
        [22.30, 85.20],
        [22.25, 85.65],
        [21.95, 85.35]
      ], {
        color: '#826543',
        weight: 1.5,
        fillColor: '#826543',
        fillOpacity: 0.15,
        dashArray: '4, 4'
      }).bindTooltip('Gangpur Group (Gonditic / Iron-Manganese Horizon)', { className: 'tech-mono' });
      layerGroups.geology.addLayer(gangpurBelt);

      // Regional Fault & Shear Lineaments
      const faults = [
        [[21.75, 79.35], [21.85, 80.20], [21.92, 80.55]],
        [[21.50, 79.55], [21.60, 80.10]],
        [[15.05, 76.45], [15.22, 76.68]],
        [[22.05, 85.10], [22.28, 85.50]]
      ];
      faults.forEach(coordsLine => {
        const faultLine = L.polyline(coordsLine, {
          color: '#e06c42',
          weight: 2,
          dashArray: '6, 4',
          opacity: 0.8
        }).bindTooltip('Major Structural Fault / Shear Zone (Fluid Conduit)', { className: 'tech-mono' });
        layerGroups.geology.addLayer(faultLine);
      });

      // --- 3. Existing Known Manganese Mines (Diamonds) ---
      const minesData = [
        {
          id: 'MINE-MOIL-01',
          name: 'Balaghat Mine (MOIL)',
          state: 'Madhya Pradesh',
          coords: [21.8105, 80.1852],
          type: 'Operating Underground / Open Pit',
          grade: 'High Grade (44-48% Mn)',
          reserve: 'Deep seated braunite reef'
        },
        {
          id: 'MINE-MOIL-02',
          name: 'Dongri Buzurg Mine (MOIL)',
          state: 'Maharashtra',
          coords: [21.5450, 79.6910],
          type: 'Open Pit',
          grade: 'Battery Grade Pyrolusite (MnO2)',
          reserve: 'Stratiform bedded deposit'
        },
        {
          id: 'MINE-MOIL-03',
          name: 'Chikla Mine (MOIL)',
          state: 'Maharashtra',
          coords: [21.5520, 79.7610],
          type: 'Underground Mine',
          grade: 'Medium Grade (38-42% Mn)',
          reserve: 'Gondite host sequence'
        },
        {
          id: 'MINE-SMIORE-01',
          name: 'Sandur Deogiri Mine (SMIORE)',
          state: 'Karnataka',
          coords: [15.0850, 76.5490],
          type: 'Open Cast',
          grade: 'Low to Medium Grade (32-38% Mn)',
          reserve: 'Lateritoid and bedded ore'
        },
        {
          id: 'MINE-OD-01',
          name: 'Joda West Mine (Tata Steel)',
          state: 'Odisha',
          coords: [22.1150, 85.3950],
          type: 'Open Cast Operations',
          grade: 'Medium to High Grade',
          reserve: 'Iron Ore Group Manganese Reef'
        }
      ];

      minesData.forEach(m => {
        const iconHtml = `
          <div style="
            width: 14px; 
            height: 14px; 
            background: #ffffff; 
            border: 2px solid #c85a32; 
            transform: rotate(45deg);
            box-shadow: 0 0 6px rgba(0,0,0,0.8);
          "></div>
        `;
        const customIcon = L.divIcon({
          className: 'custom-mine-icon',
          html: iconHtml,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker(m.coords, { icon: customIcon });
        marker.on('click', () => {
          setSelectedFeature({
            category: 'EXISTING PRODUCING MINE',
            id: m.id,
            name: m.name,
            state: m.state,
            coords: `${m.coords[0].toFixed(4)}° N, ${m.coords[1].toFixed(4)}° E`,
            lithology: 'Active Mining Lease / G1 Operating Reserve',
            anomaly: 'Extracted Surface Signature',
            score: 98,
            recommendation: 'Active production benchmark. Used for spectral endmember calibration.'
          });
        });
        layerGroups.existingMines.addLayer(marker);
      });

      // --- 4. Potential Mineral Zones / Exploration Targets ---
      const targetsData = [
        {
          id: 'TAR-MP-SAUSAR-042',
          name: 'North Ukwa Fold Axis Target',
          state: 'Madhya Pradesh',
          coords: [21.8420, 80.2450],
          tier: 'HIGH POTENTIAL',
          color: '#e06c42',
          radius: 1200,
          swirIndex: 2.34,
          score: 87,
          faultDist: '0.4 km',
          status: 'Model-Identified Target — Requires Field Validation',
          action: 'Priority 1: Conduct 50m-grid shallow resistivity & core drilling.'
        },
        {
          id: 'TAR-MH-BHANDARA-019',
          name: 'Tirodi Quartzite Contact Extension',
          state: 'Maharashtra',
          coords: [21.5830, 79.8210],
          tier: 'HIGH POTENTIAL',
          color: '#e06c42',
          radius: 1500,
          swirIndex: 2.18,
          score: 83,
          faultDist: '0.7 km',
          status: 'Model-Identified Target — Requires Field Validation',
          action: 'Priority 1: Geological outcrop mapping and rock chip assaying.'
        },
        {
          id: 'TAR-KA-SANDUR-008',
          name: 'Ramgad Syncline Ridge Flank',
          state: 'Karnataka',
          coords: [15.1420, 76.6120],
          tier: 'MEDIUM POTENTIAL',
          color: '#f59e0b',
          radius: 1800,
          swirIndex: 1.88,
          score: 68,
          faultDist: '1.8 km',
          status: 'Potential Zone — Secondary Exploration Target',
          action: 'Priority 2: Reconnaissance geochemical soil grid (UNFC G4).'
        },
        {
          id: 'TAR-OD-BONAI-077',
          name: 'Koira-Patmunda Structural Corridor',
          state: 'Odisha',
          coords: [22.1680, 85.4520],
          tier: 'HIGH POTENTIAL',
          color: '#e06c42',
          radius: 1400,
          swirIndex: 2.25,
          score: 85,
          faultDist: '0.5 km',
          status: 'Model-Identified Target — Requires Field Validation',
          action: 'Priority 1: Ground magnetics to delineate manganese-shale contact.'
        },
        {
          id: 'TAR-RJ-BANSWARA-003',
          name: 'Ghatia-Tambesra Aravalli Outcrop',
          state: 'Rajasthan',
          coords: [23.4800, 74.4500],
          tier: 'LOW POTENTIAL',
          color: '#5f7457',
          radius: 2000,
          swirIndex: 1.62,
          score: 48,
          faultDist: '3.4 km',
          status: 'Requires Field Validation / Low Confidence',
          action: 'Priority 3: Satellite monitoring for seasonal vegetation baseline.'
        }
      ];

      targetsData.forEach(t => {
        // Circle overlay representing prospectivity zone
        const circle = L.circle(t.coords, {
          color: t.color,
          fillColor: t.color,
          fillOpacity: 0.35,
          weight: 2,
          radius: t.radius
        });

        circle.on('click', () => {
          setSelectedFeature({
            category: t.status,
            id: t.id,
            name: t.name,
            state: t.state,
            coords: `${t.coords[0].toFixed(4)}° N, ${t.coords[1].toFixed(4)}° E`,
            lithology: 'Sausar/Dharwar Host Sequence',
            anomaly: `SWIR Alteration Ratio: ${t.swirIndex} (High Mn-OH Trough)`,
            score: t.score,
            recommendation: t.action
          });
        });

        layerGroups.mlProspectivity.addLayer(circle);

        // Marker Reticle
        const reticleIcon = L.divIcon({
          className: 'reticle-marker',
          html: `<div style="
            width: 8px; 
            height: 8px; 
            background: ${t.color}; 
            border-radius: 50%;
            border: 1px solid #fff;
          "></div>`,
          iconSize: [8, 8],
          iconAnchor: [4, 4]
        });

        const marker = L.marker(t.coords, { icon: reticleIcon });
        marker.on('click', () => {
          setSelectedFeature({
            category: t.status,
            id: t.id,
            name: t.name,
            state: t.state,
            coords: `${t.coords[0].toFixed(4)}° N, ${t.coords[1].toFixed(4)}° E`,
            lithology: 'Targeted Contact Zone',
            anomaly: `SWIR Alteration Ratio: ${t.swirIndex}`,
            score: t.score,
            recommendation: t.action
          });
        });
        layerGroups.mlProspectivity.addLayer(marker);
      });

      // Default selected feature
      setSelectedFeature({
        category: 'Model-Identified Target — Requires Field Validation',
        id: 'TAR-MP-SAUSAR-042',
        name: 'North Ukwa Fold Axis Target',
        state: 'Madhya Pradesh (Balaghat District)',
        coords: '21.8420° N, 80.2450° E',
        lithology: 'Sausar Group: Gondite-Quartzite Stratigraphic Contact',
        anomaly: 'SWIR B12/B8 Alteration Ratio: 2.34 (Strong Mn Absorption)',
        score: 87,
        recommendation: 'Priority 1: Conduct 50m-grid shallow electrical resistivity and exploratory G4 core drilling.'
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Layer Toggle
  const toggleLayer = (layerKey) => {
    const nextState = !layers[layerKey];
    setLayers(prev => ({ ...prev, [layerKey]: nextState }));

    const lg = layerGroupsRef.current[layerKey];
    const map = mapInstanceRef.current;
    if (!lg || !map) return;

    if (nextState) {
      map.addLayer(lg);
    } else {
      map.removeLayer(lg);
    }
  };

  // Fly to Region
  const flyToBelt = (belt) => {
    setSelectedBelt(belt);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (belt === 'sausar') {
      map.flyTo([21.8, 79.9], 8, { duration: 1.2 });
    } else if (belt === 'sandur') {
      map.flyTo([15.1, 76.55], 9, { duration: 1.2 });
    } else if (belt === 'odisha') {
      map.flyTo([22.1, 85.3], 8.5, { duration: 1.2 });
    } else if (belt === 'india') {
      map.flyTo([20.5, 80.0], 5, { duration: 1.5 });
    }
  };

  return (
    <div className="gis-layout">
      {/* Sidebar Controls */}
      <div className="gis-sidebar">
        <div className="gis-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--earth-sand)' }}>
              GIS EXPLORATION ENGINE V2.4
            </span>
          </div>
          <h2 style={{ fontSize: '1.15rem' }}>Geographic Layer Toggles</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Satellite Earth Observation, Geological Stratigraphy & AI Triage Layers.
          </p>
        </div>

        {/* Region Quick Select */}
        <div className="gis-sidebar-section">
          <div className="gis-sidebar-title">
            <span>Focus Metallogenic Belt</span>
            <span className="tech-mono" style={{ fontSize: '0.7rem' }}>CRS: EPSG:4326</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button 
              className={`btn btn-sm ${selectedBelt === 'sausar' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => flyToBelt('sausar')}
              style={{ fontSize: '0.74rem' }}
            >
              Sausar Belt (MP/MH)
            </button>
            <button 
              className={`btn btn-sm ${selectedBelt === 'sandur' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => flyToBelt('sandur')}
              style={{ fontSize: '0.74rem' }}
            >
              Sandur Basin (KA)
            </button>
            <button 
              className={`btn btn-sm ${selectedBelt === 'odisha' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => flyToBelt('odisha')}
              style={{ fontSize: '0.74rem' }}
            >
              Gangpur/Bonai (OD)
            </button>
            <button 
              className={`btn btn-sm ${selectedBelt === 'india' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => flyToBelt('india')}
              style={{ fontSize: '0.74rem' }}
            >
              All India View
            </button>
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="gis-sidebar-section" style={{ flex: 1 }}>
          <div className="gis-sidebar-title">
            <span>Active Map Layers</span>
            <span style={{ color: 'var(--earth-rust-light)' }}>6 Available</span>
          </div>

          <div className="layer-list">
            <label className={`layer-item ${layers.satellite ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.satellite} 
                  onChange={() => toggleLayer('satellite')}
                  className="layer-checkbox"
                />
                <span>Satellite Imagery (Sentinel/Esri)</span>
              </div>
              <span className="badge badge-rust">10m</span>
            </label>

            <label className={`layer-item ${layers.geology ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.geology} 
                  onChange={() => toggleLayer('geology')}
                  className="layer-checkbox"
                />
                <span>Geological Formations & Faults</span>
              </div>
              <span className="layer-indicator" style={{ backgroundColor: '#996e3e' }}></span>
            </label>

            <label className={`layer-item ${layers.elevation ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.elevation} 
                  onChange={() => toggleLayer('elevation')}
                  className="layer-checkbox"
                />
                <span>Cartosat Topographic Contours</span>
              </div>
              <span className="badge">DEM</span>
            </label>

            <label className={`layer-item ${layers.existingMines ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.existingMines} 
                  onChange={() => toggleLayer('existingMines')}
                  className="layer-checkbox"
                />
                <span>Existing Producing Mines</span>
              </div>
              <span className="layer-indicator" style={{ backgroundColor: '#ffffff', border: '1px solid #c85a32' }}></span>
            </label>

            <label className={`layer-item ${layers.indicators ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.indicators} 
                  onChange={() => toggleLayer('indicators')}
                  className="layer-checkbox"
                />
                <span>Manganese Spectral Indicators</span>
              </div>
              <span className="layer-indicator" style={{ backgroundColor: '#06b6d4' }}></span>
            </label>

            <label className={`layer-item ${layers.mlProspectivity ? 'active' : ''}`}>
              <div className="layer-label-group">
                <input 
                  type="checkbox" 
                  checked={layers.mlProspectivity} 
                  onChange={() => toggleLayer('mlProspectivity')}
                  className="layer-checkbox"
                />
                <span>ML Prospectivity Targets</span>
              </div>
              <span className="layer-indicator" style={{ backgroundColor: '#c85a32' }}></span>
            </label>
          </div>
        </div>

        {/* Status Box */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <div><strong style={{ color: 'var(--earth-sand)' }}>Target Classification:</strong> UNFC Stage G4 Reconnaissance to G3 Preliminary.</div>
          <div style={{ marginTop: '4px' }}>Predictions require verification by core drilling.</div>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="gis-map-viewport">
        <div id="leafletMap" ref={mapContainerRef}></div>

        {/* Top Right Coordinates & Telemetry HUD */}
        <div className="map-hud-bar">
          <div>LAT: <span style={{ color: 'var(--earth-sand)' }}>{coords.lat.toFixed(4)}° N</span></div>
          <div>LON: <span style={{ color: 'var(--earth-sand)' }}>{coords.lng.toFixed(4)}° E</span></div>
          <div>ZOOM: <span style={{ color: 'var(--text-primary)' }}>{zoomLevel}</span></div>
          <div>DATUM: <span style={{ color: 'var(--signal-green)' }}>WGS84</span></div>
        </div>

        {/* Legend Overlay */}
        <div className="map-legend-box">
          <div className="legend-title">Prospectivity Heatmap Legend</div>
          <div className="legend-row">
            <div className="legend-swatch" style={{ backgroundColor: '#e06c42' }}></div>
            <span>HIGH POTENTIAL TARGET</span>
          </div>
          <div className="legend-row">
            <div className="legend-swatch" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>MEDIUM POTENTIAL ZONE</span>
          </div>
          <div className="legend-row">
            <div className="legend-swatch" style={{ backgroundColor: '#5f7457' }}></div>
            <span>LOW POTENTIAL / BACKGROUND</span>
          </div>
          <div className="legend-row">
            <div className="legend-swatch" style={{ backgroundColor: '#ffffff', border: '1px solid #c85a32', transform: 'rotate(45deg)', width: '10px', height: '10px' }}></div>
            <span style={{ marginLeft: '4px' }}>Existing Operating Mine</span>
          </div>
          <div className="legend-row">
            <div style={{ width: '14px', height: '2px', borderTop: '2px dashed #e06c42' }}></div>
            <span>Structural Fault / Shear</span>
          </div>
        </div>

        {/* Selected Feature Inspector Modal */}
        {selectedFeature && (
          <div className="map-inspector" style={{ display: 'block' }}>
            <div className="inspector-header">
              <div>
                <span className="badge badge-rust" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {selectedFeature.category}
                </span>
                <div className="inspector-title">{selectedFeature.name}</div>
              </div>
              <button 
                className="inspector-close" 
                onClick={() => setSelectedFeature(null)}
                aria-label="Close feature inspector"
              >
                ✕
              </button>
            </div>

            <div className="inspector-field">
              <span>Target ID:</span>
              <span className="tech-mono">{selectedFeature.id}</span>
            </div>
            <div className="inspector-field">
              <span>Coordinates:</span>
              <span className="tech-mono">{selectedFeature.coords}</span>
            </div>
            <div className="inspector-field">
              <span>State / Belt:</span>
              <span>{selectedFeature.state}</span>
            </div>
            <div className="inspector-field">
              <span>Host Lithology:</span>
              <span>{selectedFeature.lithology}</span>
            </div>
            <div className="inspector-field">
              <span>Spectral Anomaly:</span>
              <span>{selectedFeature.anomaly}</span>
            </div>
            <div className="inspector-field">
              <span>ML Score:</span>
              <span style={{ color: 'var(--earth-rust-light)', fontWeight: 700 }}>{selectedFeature.score} / 100</span>
            </div>

            <div style={{ 
              marginTop: '10px', 
              paddingTop: '8px', 
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--earth-sand)',
              lineHeight: '1.4'
            }}>
              <strong>Exploration Next Step:</strong> {selectedFeature.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
