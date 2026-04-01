import { COLORS } from "../constants";

export default function SunLogo({ size = 48 }) {
  const rayAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Sun disc */}
      <circle cx="30" cy="32" r="12" fill={COLORS.gold} opacity="0.9" />

      {/* Sun rays */}
      {rayAngles.map((angleDegrees, index) => {
        const angleRadians = (angleDegrees * Math.PI) / 180;
        return (
          <line
            key={index}
            x1={30 + 16 * Math.cos(angleRadians)}
            y1={32 + 16 * Math.sin(angleRadians)}
            x2={30 + 22 * Math.cos(angleRadians)}
            y2={32 + 22 * Math.sin(angleRadians)}
            stroke={COLORS.gold}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}

      {/* Ocean waves */}
      <path d="M8 40 Q30 28 52 40 Q30 44 8 40Z" fill={COLORS.ocean} opacity="0.6" />
      <path d="M5 43 Q30 33 55 43 Q30 47 5 43Z" fill={COLORS.ocean} opacity="0.4" />
    </svg>
  );
}
