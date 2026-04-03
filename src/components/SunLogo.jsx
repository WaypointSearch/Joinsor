import { COLORS } from "../constants";

/**
 * Redesigned Sun Ocean Realty logo — matches sunoceanrealty.com
 * Geometric sun with compass circle, elegant ocean wave arcs,
 * Cormorant Garamond + Raleway typography
 */
export default function SunLogo({ size = 48, light = true }) {
  const textColor = light ? COLORS.white : COLORS.navy;
  const gold = COLORS.gold;
  const azure = "#1b7aad";
  const rayAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: size > 40 ? 14 : 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer compass circle */}
        <circle cx="32" cy="32" r="30" stroke={gold} strokeWidth="1" opacity="0.3" />

        {/* Sun disc */}
        <circle cx="32" cy="26" r="10" fill={gold} />

        {/* Sun rays — alternating lengths for elegance */}
        {rayAngles.map((angleDeg, index) => {
          const rad = (angleDeg * Math.PI) / 180;
          const isCardinal = index % 2 === 0;
          const innerRadius = isCardinal ? 13 : 12.5;
          const outerRadius = isCardinal ? 18 : 15.5;
          return (
            <line
              key={index}
              x1={32 + innerRadius * Math.cos(rad)}
              y1={26 + innerRadius * Math.sin(rad)}
              x2={32 + outerRadius * Math.cos(rad)}
              y2={26 + outerRadius * Math.sin(rad)}
              stroke={gold}
              strokeWidth={isCardinal ? "1.8" : "1"}
              strokeLinecap="round"
            />
          );
        })}

        {/* Ocean waves — three elegant arcs */}
        <path
          d="M12 42 Q22 36 32 42 Q42 48 52 42"
          stroke={azure}
          strokeWidth="1.8"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M14 46 Q24 40 34 46 Q44 52 54 46"
          stroke={azure}
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
          strokeLinecap="round"
        />
        <path
          d="M16 50 Q26 44 36 50 Q46 56 56 50"
          stroke={azure}
          strokeWidth="0.8"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />
      </svg>

      <div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontSize: size > 40 ? "1.35rem" : "1rem",
            fontWeight: 600,
            color: textColor,
            letterSpacing: "0.12em",
            lineHeight: 1.15,
          }}
        >
          SUN OCEAN
        </div>
        <div
          style={{
            fontFamily: "'Raleway', 'Outfit', sans-serif",
            fontSize: size > 40 ? "0.52rem" : "0.42rem",
            fontWeight: 500,
            color: gold,
            letterSpacing: "0.4em",
            marginTop: 1,
          }}
        >
          R E A L T Y
        </div>
      </div>
    </div>
  );
}