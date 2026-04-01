import { useInView } from "../hooks/useInView";

export default function FadeIn({ children, delay = 0, style = {} }) {
  const [elementRef, isVisible] = useInView();

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
