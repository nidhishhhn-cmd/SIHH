"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GlyphPortal from "@/components/ui/glyph-portal";

export default function PortalPage() {
  const [face, setFace] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => {
      if (!settled) {
        settled = true;
        setFace(value);
      }
    };
    const font = new FontFace(
      "Space Grotesk",
      'url("https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2")',
      { weight: "700" }
    );
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      finish('"Space Grotesk", Arial, sans-serif');
    }).catch(() => {
      finish('"Arial Black", Arial, sans-serif');
    });

    const timer = setTimeout(() => finish('"Arial Black", Arial, sans-serif'), 1200);
    return () => {
      settled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f5f4ef" }}>
      {/* Top Banner Navigation */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #cfc6b8"
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <span style={{ 
            background: "#1e242c", 
            color: "#fff", 
            padding: "0.2rem 0.5rem", 
            fontFamily: "monospace", 
            fontWeight: 700, 
            borderRadius: "2px" 
          }}>
            ←
          </span>
          <span style={{ fontWeight: 700, color: "#151a21", fontSize: "0.95rem" }}>
            Return to MIN-GEO-AI Portal
          </span>
        </Link>
        <span className="badge badge-rust" style={{ fontSize: "0.75rem" }}>
          MINISTRY OF MINES // GEOLOGICAL INTELLIGENCE PORTAL
        </span>
      </div>

      {/* Glyph Portal Component with Geological Earth Observation Scene */}
      <div style={{ paddingTop: "60px" }}>
        <GlyphPortal
          word="MANGANESE"
          focusChar="M"
          fontFamily={face ?? '"Arial Black", Arial, sans-serif'}
          fontWeight={900}
          scrollLength={2.6}
          interactive={true}
          annotations={true}
          enterLabel="Enter Exploration Suite"
          style={{
            "--gp-paper": "#f5f4ef",
            "--gp-ink": "#151a21",
            "--gp-field": "#1e2820",
            "--gp-foreground": "#f5f4ef"
          }}
          background={
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 25% 20%, rgba(168,61,28,0.45), transparent 45%), radial-gradient(circle at 75% 75%, rgba(57,87,52,0.6), transparent 50%), linear-gradient(135deg, #13191c 0%, #1e2820 50%, #2a1f18 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {/* Subtle Geodetic Grid Lines */}
              <div style={{
                position: "absolute",
                inset: 0,
                opacity: 0.15,
                backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }} />
            </div>
          }
          front={
            <>
              <div style={{
                position: "absolute",
                top: "clamp(24px, 5cqw, 48px)",
                left: "clamp(24px, 5cqw, 64px)",
                right: "clamp(24px, 5cqw, 64px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#151a21" }}>
                  MIN-GEO-AI
                </span>
                <span style={{ fontSize: "0.8rem", color: "#7a5023", fontFamily: "monospace", fontWeight: 600 }}>
                  EARTH OBSERVATION & ML DISCOVERY
                </span>
              </div>
              <p style={{
                position: "absolute",
                top: "calc(var(--gp-word-top, 35%) - 42px)",
                left: "24px",
                right: "24px",
                textAlign: "center",
                fontSize: "0.85rem",
                color: "#7a5023",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}>
                Interactive Camera Journey Through Live Type
              </p>
              <p style={{
                position: "absolute",
                top: "calc(var(--gp-word-bottom, 50%) + 24px)",
                left: "24px",
                right: "24px",
                textAlign: "center",
                fontSize: "1.05rem",
                color: "#3b4554",
                fontWeight: 500
              }}>
                Select any letter above, then scroll downward to enter the prospective mineral terrain.
              </p>
            </>
          }
        >
          {/* Content revealed after passing through the glyph */}
          <div style={{ maxWidth: "64rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <span className="badge badge-rust" style={{ alignSelf: "flex-start" }}>
              STEPPING INSIDE THE METALLOGENIC CORRIDOR
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, color: "#ffffff" }}>
              From Space Earth Observation to Subsurface Resource Discovery.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#d2dcd0", lineHeight: 1.7, maxWidth: "48rem" }}>
              You have entered through the glyph into the simulated Sausar Group fold belt. Here, multi-sensor Sentinel-2 SWIR-2 band indices and machine learning triage prospective manganese targets to overcome India’s domestic raw material deficit.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "4px", padding: "1.25rem" }}>
                <div style={{ color: "#e06c42", fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  01 · SATELLITE TRIAGE
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
                  Multispectral Absorption
                </div>
                <div style={{ fontSize: "0.84rem", color: "#a4b3a2", lineHeight: 1.5 }}>
                  Isolates diagnostic manganese oxide troughs at 2190nm (SWIR-2) to distinguish ore caps from host rock.
                </div>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "4px", padding: "1.25rem" }}>
                <div style={{ color: "#b8864d", fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  02 · SPATIAL ML
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
                  XGBoost & WofE Ranking
                </div>
                <div style={{ fontSize: "0.84rem", color: "#a4b3a2", lineHeight: 1.5 }}>
                  Correlates structural shear lineaments, DEM slope, and lithology with 0.914 ROC-AUC cross-validation.
                </div>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "4px", padding: "1.25rem" }}>
                <div style={{ color: "#76906d", fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  03 · FIELD DRILL TRIAGE
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
                  UNFC G4 Verification
                </div>
                <div style={{ fontSize: "0.84rem", color: "#a4b3a2", lineHeight: 1.5 }}>
                  Diverts diamond core drilling exclusively to high-statistical probability zones, saving up to 60% in greenfield capex.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <Link href="/map" className="btn btn-primary">
                Open GIS Exploration Map →
              </Link>
              <Link href="/methodology" className="btn btn-secondary">
                View Machine Learning Methodology
              </Link>
            </div>
          </div>
        </GlyphPortal>
      </div>
    </div>
  );
}
