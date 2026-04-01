import { useState, useEffect } from "react";
import { COLORS } from "../constants";
import SunLogo from "./SunLogo";

export default function Hero({ onApplyClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  function scrollToCommission() {
    document.getElementById("commission")?.scrollIntoView({ behavior: "smooth" });
  }

  const STATS = [
    { value: "100%", label: "Commission on Sales" },
    { value: "$0", label: "Monthly Fees" },
    { value: "5", label: "Counties Served" },
    { value: "Since 2012", label: "Licensed & Active" },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 50%, #0d2847 100%)`,
      }}
    >
      {/* Wave pattern background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="heroWaves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q50 0 100 20 Q150 40 200 20" fill="none" stroke={COLORS.gold} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroWaves)" />
        </svg>
      </div>

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 80, left: 40, width: 60, height: 60, borderTop: `1px solid ${COLORS.gold}`, borderLeft: `1px solid ${COLORS.gold}`, opacity: 0.3 }} />
      <div style={{ position: "absolute", bottom: 40, right: 40, width: 60, height: 60, borderBottom: `1px solid ${COLORS.gold}`, borderRight: `1px solid ${COLORS.gold}`, opacity: 0.3 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
        {/* Headline */}
        <div style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease 0.2s" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>
            South Florida's Waterfront Brokerage
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: COLORS.white, lineHeight: 1.1, margin: "0 0 12px", fontWeight: 700, maxWidth: 700 }}>
            Build Your Career
            <br />
            <span style={{ color: COLORS.gold }}>On Your Terms</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease 0.5s" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 560, margin: "24px 0 40px", fontWeight: 300 }}>
            100% commission on sales. 90% on rentals. Earn $250 per showing on our leads. Fully remote. No desk fees.
            No monthly charges. Just $99/year.
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ opacity: isLoaded ? 1 : 0, transition: "all 1s ease 0.8s", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={onApplyClick}
            style={{
              background: COLORS.gold, color: COLORS.navy, border: "none", padding: "16px 40px",
              fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em",
              textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: 2, transition: "all 0.3s",
            }}
            onMouseOver={(e) => { e.target.style.background = COLORS.goldLight; e.target.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.target.style.background = COLORS.gold; e.target.style.transform = "translateY(0)"; }}
          >
            Apply Today — $99/Year
          </button>
          <button
            onClick={scrollToCommission}
            style={{
              background: "transparent", color: COLORS.white, border: "1px solid rgba(255,255,255,0.25)",
              padding: "16px 40px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em",
              textTransform: "uppercase", fontWeight: 400, cursor: "pointer", borderRadius: 2,
            }}
            onMouseOver={(e) => { e.target.style.borderColor = COLORS.gold; e.target.style.color = COLORS.gold; }}
            onMouseOut={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = COLORS.white; }}
          >
            Learn More
          </button>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 48, marginTop: 80, flexWrap: "wrap", opacity: isLoaded ? 1 : 0, transition: "all 1s ease 1.1s" }}>
          {STATS.map(({ value, label }, index) => (
            <div key={index} style={{ minWidth: 120 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: COLORS.gold, fontWeight: 700 }}>{value}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <svg style={{ position: "absolute", bottom: -2, left: 0, right: 0 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80Z" fill={COLORS.sand} />
      </svg>
    </section>
  );
}
