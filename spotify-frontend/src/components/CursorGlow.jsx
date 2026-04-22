import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-64 h-64
      bg-green-400/20 rounded-full blur-3xl z-50"
      style={{
        transform: `translate(${position.x - 120}px, ${position.y - 120}px)`
      }}
    />
  );
}