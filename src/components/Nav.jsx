import { useState, useEffect } from "react";
import { COLORS } from "../constants";
import SunLogo from "./SunLogo";

export default function Nav({ onApplyClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(sectionId) {
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  const navLinkStyle = {
    color: COLORS.white, textDecoration: "none", fontSize: "0.8rem",
    letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
    transition: "color 0.3s", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
  };

  const NAV_LINKS = [
    { id: "commission", label: "Commission" },
    { id: "how-it-works", label: "How It Works" },
    { id: "areas", label: "Areas" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: isScrolled ? "rgba(10,22,40,0.97)" : "transparent", backdropFilter: isScrolled ? "blur(12px)" : "none", borderBottom: isScrolled ? `1px solid rgba(201,168,76,0.15)` : "none", transition: "all 0.4s", padding: isScrolled ? "12px 0" : "20px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* LEFT SIDE: Logo only */}
          <div style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => scrollToSection("home")}>
            <SunLogo size={isScrolled ? 34 : 38} light={true} />
          </div>

          {/* RIGHT SIDE: Navigation Links & Hamburger Grouped Together */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {NAV_LINKS.map(({ id, label }) => (
                <span key={id} style={navLinkStyle} onClick={() => scrollToSection(id)} onMouseOver={(e) => (e.target.style.color = COLORS.gold)} onMouseOut={(e) => (e.target.style.color = COLORS.white)}>
                  {label}
                </span>
              ))}
              <button onClick={onApplyClick} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", padding: "10px 24px", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: 2 }}>
                Join Now
              </button>
            </div>

            <div className="nav-mobile" style={{ display: "none", cursor: "pointer", padding: 8 }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6, transition: "all 0.3s", transform: isMobileMenuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6, opacity: isMobileMenuOpen ? 0 : 1 }} />
              <div style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s", transform: isMobileMenuOpen ? "rotate(-45deg) translate(6px,-6px)" : "none" }} />
            </div>
          </div>

        </div>
      </nav>

      {isMobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(10,22,40,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
          {[{ id: "home", label: "Home" }, ...NAV_LINKS].map(({ id, label }) => (
            <span key={id} onClick={() => scrollToSection(id)} style={{ ...navLinkStyle, fontSize: "1.1rem" }}>{label}</span>
          ))}
          <span onClick={() => { setIsMobileMenuOpen(false); onApplyClick(); }} style={{ ...navLinkStyle, fontSize: "1.1rem", color: COLORS.gold }}>Join Now</span>
        </div>
      )}
    </>
  );
}