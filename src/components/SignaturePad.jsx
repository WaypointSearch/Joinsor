import { useRef, useState, useEffect } from "react";
import { COLORS } from "../constants";

export default function SignaturePad({ onSave, savedSignature }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(!!savedSignature);

  /* ─── Pointer position helper ─── */
  function getCanvasPosition(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
      x: (clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (clientY - rect.top) * (canvasRef.current.height / rect.height),
    };
  }

  /* ─── Drawing handlers ─── */
  function handleDrawStart(event) {
    event.preventDefault();
    const context = canvasRef.current.getContext("2d");
    const position = getCanvasPosition(event);
    context.beginPath();
    context.moveTo(position.x, position.y);
    setIsDrawing(true);
  }

  function handleDrawMove(event) {
    if (!isDrawing) return;
    event.preventDefault();
    const context = canvasRef.current.getContext("2d");
    const position = getCanvasPosition(event);
    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.strokeStyle = COLORS.navy;
    context.lineTo(position.x, position.y);
    context.stroke();
    setHasContent(true);
  }

  function handleDrawEnd() {
    setIsDrawing(false);
    if (hasContent && canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
    }
  }

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasContent(false);
    onSave(null);
  }

  /* ─── Restore saved signature on mount ─── */
  useEffect(() => {
    if (savedSignature && canvasRef.current) {
      const image = new Image();
      image.onload = () => {
        canvasRef.current.getContext("2d").drawImage(image, 0, 0);
        setHasContent(true);
      };
      image.src = savedSignature;
    }
  }, []);

  return (
    <div>
      <div
        style={{
          border: `1px solid ${COLORS.warmSand}`,
          borderRadius: 3,
          background: COLORS.white,
          position: "relative",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          style={{ width: "100%", height: 120, cursor: "crosshair", display: "block" }}
          onMouseDown={handleDrawStart}
          onMouseMove={handleDrawMove}
          onMouseUp={handleDrawEnd}
          onMouseLeave={handleDrawEnd}
          onTouchStart={handleDrawStart}
          onTouchMove={handleDrawMove}
          onTouchEnd={handleDrawEnd}
        />
        {!hasContent && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                color: "#ccc",
                fontStyle: "italic",
              }}
            >
              Sign here with your mouse or finger
            </span>
          </div>
        )}
      </div>

      {hasContent && (
        <button
          onClick={handleClear}
          style={{
            marginTop: 6,
            background: "none",
            border: "none",
            color: COLORS.red,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.8rem",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Clear Signature
        </button>
      )}
    </div>
  );
}
