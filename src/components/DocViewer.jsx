import { COLORS } from "../constants";

/**
 * Renders a scrollable legal document from structured content blocks.
 * Block types: h (header), f (field), p (paragraph), s (section),
 * sub (subsection), b (bullet), sig (signature block), sl (signature line).
 */
export default function DocViewer({ document, formData, signatureImage }) {
  const todayFormatted = new Date().toLocaleDateString();

  const containerStyle = {
    background: "#fff",
    border: `1px solid ${COLORS.warmSand}`,
    borderRadius: 4,
    padding: "28px 24px",
    maxHeight: 400,
    overflowY: "auto",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "0.82rem",
    lineHeight: 1.75,
    color: "#1a1a1a",
  };

  function renderBlock(block, index) {
    switch (block.type) {
      case "h":
        return (
          <div
            key={index}
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: 18,
              paddingBottom: 10,
              borderBottom: "2px solid #1a1a1a",
              whiteSpace: "pre-line",
            }}
          >
            {block.text}
          </div>
        );

      case "f":
        return (
          <div
            key={index}
            style={{
              margin: "8px 0",
              padding: "6px 12px",
              background: "#f0f7ff",
              border: "1px solid #cde0f2",
              borderRadius: 3,
            }}
          >
            <strong
              style={{
                fontSize: "0.72rem",
                color: COLORS.slate,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {block.label}:
            </strong>{" "}
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: COLORS.navy }}>
              {block.value}
            </span>
          </div>
        );

      case "p":
        return (
          <p key={index} style={{ margin: "10px 0", whiteSpace: "pre-line" }}>
            {block.text}
          </p>
        );

      case "s":
        return (
          <div key={index} style={{ margin: "16px 0 6px" }}>
            <strong>
              {block.n ? `${block.n}. ` : ""}
              {block.t}
              {block.text ? ":" : ""}
            </strong>
            {block.text && <span style={{ whiteSpace: "pre-line" }}> {block.text}</span>}
          </div>
        );

      case "sub":
        return (
          <div key={index} style={{ margin: "6px 0 6px 20px" }}>
            <strong>{block.l}:</strong>
            <span style={{ whiteSpace: "pre-line" }}> {block.text}</span>
          </div>
        );

      case "b":
        return (
          <div
            key={index}
            style={{
              margin: "12px 0",
              padding: "8px 12px",
              background: "#fafaf7",
              borderLeft: `3px solid ${COLORS.gold}`,
            }}
          >
            <strong style={{ display: "block", marginBottom: 3, fontSize: "0.78rem", letterSpacing: "0.03em" }}>
              {block.l}:
            </strong>
            <span>{block.text}</span>
          </div>
        );

      case "sig":
        return (
          <div
            key={index}
            style={{
              marginTop: 24,
              paddingTop: 14,
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.72rem", color: COLORS.slate, marginBottom: 4 }}>
                BROKER
              </div>
              <div style={{ fontStyle: "italic", color: COLORS.navy }}>{block.broker}</div>
              <div style={{ fontSize: "0.72rem", color: COLORS.slate }}>
                {block.brokerage} · {block.brokerDate}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.72rem", color: COLORS.slate, marginBottom: 4 }}>
                ASSOCIATE
              </div>
              {signatureImage ? (
                <img src={signatureImage} alt="Agent signature" style={{ height: 36, marginBottom: 4 }} />
              ) : (
                <div style={{ color: "#999", fontStyle: "italic" }}>(Your signature will appear here)</div>
              )}
              <div style={{ fontSize: "0.72rem", color: COLORS.slate }}>
                {formData.fullName || "___"} · {todayFormatted}
              </div>
            </div>
          </div>
        );

      case "sl":
        return (
          <div key={index} style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid #ddd" }}>
            <div style={{ fontWeight: 700, fontSize: "0.72rem", color: COLORS.slate, marginBottom: 4 }}>
              LICENSEE SIGNATURE
            </div>
            {signatureImage ? (
              <img src={signatureImage} alt="Agent signature" style={{ height: 36, marginBottom: 4 }} />
            ) : (
              <div style={{ color: "#999", fontStyle: "italic" }}>(Your signature will appear here)</div>
            )}
            <div style={{ fontSize: "0.72rem", color: COLORS.slate }}>
              {formData.fullName || "___"} · {todayFormatted}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return <div style={containerStyle}>{document.content.map(renderBlock)}</div>;
}
