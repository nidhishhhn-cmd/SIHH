"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";

const settings = { 
  word: "MANGANESE", 
  focusChar: "M",
  scrollLength: 2.5, 
  interactive: true, 
  annotations: true 
};
const family = '"Space Grotesk", "Arial Black", Arial, sans-serif';
let fontLoad: Promise<void> | undefined;

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const [face, setFace] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => { if (!settled) { settled = true; setFace(value); } };
    
    fontLoad ??= new FontFace("Space Grotesk", 'url("https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2")', { weight: "700" })
      .load().then((font) => { document.fonts.add(font); });
    const timeout = window.setTimeout(() => finish("Arial, sans-serif"), 1400);
    void fontLoad.then(() => finish(family), () => finish("Arial, sans-serif"));
    return () => { settled = true; clearTimeout(timeout); };
  }, []);

  return (
    <div data-demo-scroll data-slipstream-demo tabIndex={0} role="region" aria-label="Manganese. Scroll to step inside."
      style={{ width: "100%", height: "min(720px, 100svh)", overflowY: "auto", background: "#f5f4ef", containerType: "inline-size", fontFamily: face ?? "Arial, sans-serif" }}>
      <style>{`
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-enter]{min-height:46px;padding:0 20px;gap:28px;background:#a83d1c;border:1px solid #8e3215;border-radius:6px;color:#fff;font-size:13px;font-weight:600;box-shadow:0 1px 3px rgba(168,61,28,0.25);transition:background .18s,box-shadow .18s;}
        [data-slipstream-demo] [data-gp-enter]:hover{background:#c24b25;box-shadow:0 3px 8px rgba(168,61,28,0.3);}
        [data-slipstream-demo] [data-gp-enter]:focus-visible{outline:2px solid #a83d1c;outline-offset:4px;}
        [data-slipstream-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-slipstream-demo] [data-gp-select]{border-color:#cfc6b8;border-radius:4px;font-size:12px;color:#151a21;background:#fff;}
        [data-sublime-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-sublime-logo]{font-size:19px;font-weight:700;letter-spacing:-.03em;color:#151a21;}
        [data-sublime-category]{font-size:12px;line-height:1.5;color:#7a5023;font-family:monospace;font-weight:600;}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:13px;font-weight:500;line-height:1.5;letter-spacing:.02em;color:#7a5023;font-family:monospace;text-transform:uppercase;}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:500;line-height:1.5;color:#3b4554;}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:#5e6b7d;font-size:12px;letter-spacing:.01em;font-family:monospace;}
        @media(any-pointer:coarse){[data-sublime-scroll]{bottom:13%;}}
        @container(max-width:450px){[data-sublime-category]{max-width:12ch;text-align:right;}[data-sublime-eyebrow]{font-size:11px;}[data-sublime-support]{font-size:14px;}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-sublime-header]{top:18px;}[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-slipstream-demo] section,[data-slipstream-demo] [data-gp-caption]{font-family:inherit;}
        [data-slipstream-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(2rem,5svh,3.5rem);}
        [data-slipstream-copy] h2{max-width:48rem;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.25rem);font-weight:600;line-height:1.25;letter-spacing:-0.01em;text-wrap:balance;}
        [data-slipstream-features]{display:grid;width:100%;grid-template-columns:1fr;gap:1.75rem;}
        [data-slipstream-feature]{border-top:1px solid rgba(255,255,255,.2);padding-top:1.1rem;}
        [data-slipstream-feature] h3{margin:0;color:inherit;font-size:1.125rem;font-weight:600;line-height:1.2;letter-spacing:0;}
        [data-slipstream-feature] p{margin:.55rem 0 0;color:rgba(255,255,255,.85);font-size:.92rem;line-height:1.55;}
        [data-slipstream-no]{display:inline-block;margin-right:.7rem;color:#f5c6b5;font:600 .75rem ui-monospace,monospace;letter-spacing:.08em;transform:translateY(-.1em);}
        @container(min-width:768px){[data-slipstream-features]{grid-template-columns:repeat(3,minmax(0,1fr));gap:3.5rem;}}
      `}</style>

      {face ? (
        <GlyphPortal 
          word={s.word} 
          focusChar={s.focusChar}
          fontFamily={face} 
          fontWeight={900} 
          style={{ 
            fontFamily: face,
            "--gp-paper": "#f5f4ef",
            "--gp-ink": "#151a21",
            "--gp-field": "#1a251e",
            "--gp-foreground": "#ffffff"
          }} 
          scrollLength={s.scrollLength} 
          interactive={s.interactive} 
          annotations={s.annotations} 
          enterLabel="Enter Exploration Suite" 
          background={
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 25% 20%, rgba(168,61,28,0.5), transparent 45%), radial-gradient(circle at 75% 75%, rgba(57,87,52,0.65), transparent 50%), linear-gradient(135deg, #101416 0%, #1a251e 50%, #251c16 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                opacity: 0.12,
                backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }} />
            </div>
          }
          front={
            <>
              <div data-sublime-header>
                <span data-sublime-logo>MIN-GEO-AI</span>
                <span data-sublime-category>SPACE TECH & MINERAL DISCOVERY</span>
              </div>
              <p data-sublime-eyebrow>Target Metallogenic Focus · Sausar & Dharwar Belts</p>
              <p data-sublime-support>Choose any letter to focus the camera, then scroll into the deposit.</p>
              <span data-sublime-scroll>Scroll down to enter the geological terrain ↓</span>
            </>
          }
        >
          <div data-slipstream-copy>
            <h2>AI-Assisted Satellite Intelligence for Manganese Discovery.</h2>
            <div data-slipstream-features>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>01</span>Spectral Absorption (SWIR-2)</h3>
                <p>Pinpoints diagnostic 2190nm absorption troughs for pyrolusite and braunite alteration minerals.</p>
              </div>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>02</span>Structural Fault Lineaments</h3>
                <p>Maps shear contacts and fold hinges acting as regional hydrothermal conduits.</p>
              </div>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>03</span>Target Drilling Triage</h3>
                <p>Prioritizes pre-competitive UNFC G4 exploration to overcome domestic steel production shortfalls.</p>
              </div>
            </div>
          </div>
        </GlyphPortal>
      ) : (
        <div role="status" style={{ height: "100%", display: "grid", placeItems: "center", color: "#555", fontSize: 13, fontFamily: "monospace" }}>
          Initializing Glyph Camera Focus on "M"…
        </div>
      )}
    </div>
  );
}
