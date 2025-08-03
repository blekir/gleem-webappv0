import { useRef, useState, useEffect } from "react";

export default function useContainerWidth() {
  const ref = useRef();
  const [width, setWidth] = useState(1600);

  useEffect(() => {
    if (!ref.current) return;

    // Create resize observer instance
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log("ResizeObserver:", entry.contentRect.width);
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(ref.current);

    // Cleanup on unmount
    return () => resizeObserver.disconnect();
  }, []);

  return [ref, width];
}
