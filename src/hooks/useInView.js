import { useRef, useState, useEffect } from "react";

/**
 * Returns [ref, isVisible] — attach ref to a DOM element,
 * and isVisible flips to true once the element enters the viewport.
 */
export function useInView(threshold = 0.15) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
}
