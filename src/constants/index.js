/* ─── Brand Colors ─── */
export const COLORS = {
  navy: "#0a1628",
  deepBlue: "#112240",
  sand: "#f5f0e8",
  warmSand: "#e8e0d0",
  gold: "#c9a84c",
  goldLight: "#d4b96a",
  ocean: "#1a6fa0",
  white: "#fefefe",
  slate: "#64748b",
  red: "#dc2626",
};

/* ─── External Links ─── */
export const SQUARE_CHECKOUT_URL =
  "https://checkout.square.site/merchant/MLCYXVB8D5ZTH/checkout/XZUNS6SLJS6Z7I36OTTHSRBF";

export const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyKTq0TYcOhpPfdxd2f-n9T8AVIRTMP-0knOGh82Im68DDsbsFEW6rYmfBx_Dl1eF0/exec";

/* ─── Contact ─── */
export const BROKER_PHONE = "954-586-7655";

/* ─── Onboarding Step Labels ─── */
export const ONBOARDING_STEP_LABELS = [
  "Your Info",
  "Review & Agree",
  "Sign",
  "Tax Info",
  "License",
  "Pay",
];

/* ─── Document Keys & Display Titles ─── */
export const DOCUMENT_KEYS = ["ica", "policy", "showing", "subscription", "dbpr", "w9"];

export const DOCUMENT_TITLES = {
  ica: "ICA-7",
  policy: "Office Policy",
  showing: "Showing Addendum",
  subscription: "Subscription",
  dbpr: "DBPR RE 11",
  w9: "W-9",
};

/* ─── Shared Input Styles ─── */
export const INPUT_STYLE = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${COLORS.warmSand}`,
  borderRadius: 3,
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  background: COLORS.white,
  color: COLORS.navy,
  outline: "none",
  boxSizing: "border-box",
};

export const LABEL_STYLE = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.8rem",
  color: COLORS.navy,
  fontWeight: 500,
  display: "block",
  marginBottom: 6,
};
