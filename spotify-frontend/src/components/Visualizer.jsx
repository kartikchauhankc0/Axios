import { useEffect, useState } from "react";

export default function Visualizer({ playing }) {

  const [heights, setHeights] = useState([20, 40, 60, 80, 50, 70, 30, 90]);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setHeights(prev =>
        prev.map(() => Math.floor(Math.random() * 80) + 20)
      );
    }, 200); // speed of animation

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="flex items-end gap-1 h-6">

      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 bg-green-400 rounded transition-all duration-200"
          style={{
            height: `${h}%`,
          }}
        />
      ))}

    </div>
  );
}