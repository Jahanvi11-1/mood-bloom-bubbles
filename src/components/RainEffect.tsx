import { useEffect, useState } from "react";

export const RainEffect = () => {
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const drops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 1 + 0.5,
      delay: Math.random() * 2,
    }));
    setRainDrops(drops);
  }, []);

  return (
    <div className="rain-effect">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
};