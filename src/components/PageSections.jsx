import { useState } from "react";
import { COLORS, SERVICES, BROKER_PHONE } from "../constants";
import FadeIn from "./FadeIn";
import SunLogo from "./SunLogo";

/* ═══ SERVICES ═══ */
const VALUE_PROP_ITEMS = [
  { icon: "◇", title: "Fully Remote", description: "No office. No commute. Our CRM and tools are 100% online. Run your business from anywhere in South Florida." },
  { icon: "◎", title: "Zero Monthly Fees", description: "Just $99 per year. No desk fees, no tech fees, no hidden charges. Period." },
  { icon: "△", title: "Keep What You Earn", description: "100% commission on sales with a flat $399 transaction fee. 90% on rentals. The math works in your favor." },
  { icon: "▢", title: "Flexible Schedule", description: "Pick your own showing times and preferred areas. Take our rental leads, work your own deals, or both." },
];

export function ValueProps() {
  return (
    <section style={{ background: COLORS.sand, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>
              Why Agents Choose Us
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: COLORS.navy, margin: 0, fontWeight: 700 }}>
              A Brokerage That Works For You
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
          {VALUE_PROP_ITEMS.map((item, index) => (
            <FadeIn key={index} delay={index * 0.12}>
              <div
                style={{ background: COLORS.white, padding: 36, borderRadius: 2, borderTop: `2px solid ${COLORS.gold}`, transition: "transform 0.3s, box-shadow 0.3s", cursor: "default", minHeight: 200 }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(10,22,40,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: COLORS.gold, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: COLORS.navy, margin: "0 0 12px", fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ COMMISSION ═══ */
const COMMISSION_ROWS = [
  { rate: "100%", title: "Commission on Your Sales", detail: "Flat $399 transaction fee per file. That's it." },
  { rate: "90%", title: "Payout on Your Rentals", detail: "You source the tenant, you keep 90%." },
  { rate: "60%", title: "On Broker-Provided Leads", detail: "We bring you the client and you close the deal." },
  { rate: "$250", title: "Rental Showing Fee", detail: "Show 2-3 properties on our leads. Tenant moves in, you earn $250. We handle all the paperwork." },
];

export function Commission({ onApplyClick }) {
  return (
    <section id="commission" style={{ background: COLORS.navy, padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.gold} 0, ${COLORS.gold} 1px, transparent 1px, transparent 20px)` }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>One Plan. Maximum Earnings.</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: COLORS.white, margin: "0 0 16px", fontWeight: 700 }}>Your Commission Structure</h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
              Every agent gets the same plan. Work your own deals, earn $250 per showing on our rental leads, or do both.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: "rgba(201,168,76,0.06)", border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 3, overflow: "hidden" }}>
            {COMMISSION_ROWS.map((row, index) => (
              <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px 32px", borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: COLORS.gold, fontWeight: 700, minWidth: 70, textAlign: "right" }}>{row.rate}</div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: COLORS.white, fontWeight: 500, marginBottom: 4 }}>{row.title}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{row.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 40, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(201,168,76,0.1)", border: `1px solid rgba(201,168,76,0.2)`, padding: "14px 28px", borderRadius: 2 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.gold, fontWeight: 700 }}>$99</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>per year — no other fees</span>
            </div>
            <button onClick={onApplyClick} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", padding: "14px 32px", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: 2 }}>
              Join Now
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ HOW IT WORKS ═══ */
const PROCESS_STEPS = [
  { number: "01", title: "Apply Online", description: "Complete your application, review and e-sign your documents, upload your license, and pay $99. All done in minutes." },
  { number: "02", title: "Get Set Up", description: "Receive your welcome email with CRM login. Set your preferred areas and showing availability." },
  { number: "03", title: "Start Earning", description: "Take rental showing leads for $250 each, close your own sales at full commission, bring in your own tenants at 90% — mix and match however you like." },
  { number: "04", title: "Grow With Us", description: "Top showing agents can advance to Rental Coordinator or full pipeline roles. We invest in agents who produce." },
];

export function HowItWorks({ onApplyClick }) {
  return (
    <section id="how-it-works" style={{ background: COLORS.sand, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>How It Works</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: COLORS.navy, margin: "0 0 16px", fontWeight: 700 }}>From Sign-Up to First Paycheck</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0 }}>
          {PROCESS_STEPS.map((step, index) => (
            <FadeIn key={index} delay={index * 0.12}>
              <div style={{ padding: "36px 28px", borderLeft: index ? `1px solid ${COLORS.warmSand}` : "none" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: COLORS.gold, opacity: 0.35, fontWeight: 700, marginBottom: 12 }}>{step.number}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: COLORS.navy, margin: "0 0 10px", fontWeight: 600 }}>{step.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: COLORS.slate, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div style={{ marginTop: 56, background: COLORS.white, padding: 40, borderRadius: 2, borderLeft: `3px solid ${COLORS.gold}`, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: COLORS.navy, margin: "0 0 8px" }}>Perfect For Every Agent</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                Newly licensed agents looking for showing income, part-time agents wanting flexibility, or experienced producers who want to keep 100% of their sales commission. One plan fits all.
              </p>
            </div>
            <button onClick={onApplyClick} style={{ background: COLORS.navy, color: COLORS.white, border: "none", padding: "14px 32px", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", borderRadius: 2, whiteSpace: "nowrap" }}>
              Get Started
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ AREAS ═══ */
const SERVICE_AREAS = [
  { name: "Miami-Dade", cities: "Miami Beach · Brickell · Coral Gables · Key Biscayne" },
  { name: "Broward", cities: "Fort Lauderdale · Pompano Beach · Hollywood · Dania Beach" },
  { name: "Palm Beach", cities: "West Palm Beach · Boca Raton · Delray Beach · Jupiter" },
  { name: "Treasure Coast", cities: "Stuart · Port St. Lucie · Jensen Beach · Vero Beach" },
];

export function Areas() {
  return (
    <section id="areas" style={{ background: `linear-gradient(135deg, ${COLORS.deepBlue} 0%, ${COLORS.navy} 100%)`, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>Coverage Area</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: COLORS.white, margin: "0 0 16px", fontWeight: 700 }}>Miami to the Treasure Coast</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {SERVICE_AREAS.map((area, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "32px 28px", borderRadius: 2, transition: "all 0.3s" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: COLORS.white, margin: "0 0 10px", fontWeight: 600 }}>{area.name}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{area.cities}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
const FAQ_ITEMS = [
  { question: "Do I need a real estate license?", answer: "Yes. You must hold an active Florida real estate sales associate or broker license to join Sun Ocean Realty." },
  { question: "What does $99/year cover?", answer: "Your annual fee covers brokerage affiliation, online CRM and office tools, lead distribution, and full broker support. No desk fees, tech fees, or monthly charges." },
  { question: "How do the rental showings work?", answer: "When a rental lead comes in, you'll receive a showing assignment to your phone. Meet the prospect, show them 2-3 properties. If they sign a lease and move in, you earn $250. We handle all the offers and paperwork." },
  { question: "Can I work my own deals AND take showing leads?", answer: "Absolutely. Every agent has the full commission structure — 100% on your sales, 90% on your rentals, and $250 per showing on our leads. Most agents do both." },
  { question: "What areas can I work in?", answer: "Broward, Miami-Dade, Palm Beach, Martin, and St. Lucie counties. Choose your preferred areas and change them anytime." },
  { question: "Is everything really remote?", answer: "Yes. We are fully remote. All paperwork, CRM access, lead management, and communication happens online." },
  { question: "How do I sign up?", answer: "Click 'Join Now,' complete your application, review and e-sign your documents, upload your license, and pay $99. Takes just a few minutes." },
  { question: "Do I need to join a REALTOR® association?", answer: "Yes — Miami Association of REALTORS®, Fort Lauderdale/Palm Beaches, St. Lucie, Orlando, or Greater Tampa. If you choose not to join, notify the broker to be transferred to our non-affiliated entity." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq" style={{ background: COLORS.sand, padding: "100px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: COLORS.navy, margin: 0, fontWeight: 700 }}>Common Questions</h2>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQ_ITEMS.map((item, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div style={{ background: COLORS.white, borderRadius: 2, overflow: "hidden" }}>
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: COLORS.navy, fontWeight: 500 }}>{item.question}</span>
                  <span style={{ color: COLORS.gold, fontSize: "1.2rem", transition: "transform 0.3s", transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
                </button>
                <div style={{ maxHeight: openIndex === index ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, lineHeight: 1.7, margin: 0, padding: "0 24px 20px", fontWeight: 300 }}>{item.answer}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CALL TO ACTION ═══ */
export function CallToAction({ onApplyClick }) {
  return (
    <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 100%)`, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SunLogo size={56} light />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: COLORS.white, margin: "24px 0 16px", fontWeight: 700 }}>Ready to Join?</h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 32px", fontWeight: 300 }}>
          Complete your application in minutes. Sign documents online, upload your license, and pay $99 to start earning.
        </p>
        <button onClick={onApplyClick} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", padding: "16px 40px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: 2 }}>
          Apply Now — $99/Year
        </button>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: 24, fontWeight: 300 }}>
          Questions? Call or text{" "}
          <a href={`tel:${BROKER_PHONE}`} style={{ color: COLORS.gold, textDecoration: "none" }}>{BROKER_PHONE}</a>
        </p>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
export function Footer() {
  return (
    <footer style={{ background: "#060e1a", padding: "40px 24px 24px", borderTop: `1px solid rgba(201,168,76,0.1)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          {/* Logo — no separate text needed, SunLogo includes it */}
          <SunLogo size={32} light />
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
            © {new Date().getFullYear()} Sun Ocean Realty LLC.
          </div>
        </div>

        {/* Industry affiliations */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="3" y="14" width="26" height="15" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
            <path d="M16 3 L3 14 L29 14 Z" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
            <text x="16" y="24.5" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="6" fontFamily="sans-serif" fontWeight="700">=</text>
          </svg>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>EQUAL HOUSING OPPORTUNITY</span>
          <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>REALTOR®</span>
          <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>MLS</span>
        </div>

        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", margin: 0, lineHeight: 1.7, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            Sun Ocean Realty LLC. Broker: Enrique L. Guillen, License #3265449, Company License #C1056011.
          </p>
        </div>
      </div>
    </footer>
  );
}