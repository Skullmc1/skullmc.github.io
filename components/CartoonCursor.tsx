"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CartoonCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shape, setShape] = useState(0);
  const [color, setColor] = useState(0);

  const shapes = [
    "50%", // circle
    "0%", // square
    "50% 0", // triangle-ish
    "30% 70% 70% 30% / 30% 30% 70% 70%", // blob
    "20% 80% 20% 80% / 80% 20% 80% 20%", // star-ish
    "60% 40% 40% 60% / 40% 60% 40% 60%", // organic shape
  ];

  const colors = [
    "#FF6B6B", // red
    "#4ECDC4", // turquoise
    "#FFD93D", // yellow
    "#95E1D3", // mint
    "#FF8B94", // pink
    "#A8E6CF", // light green
    "#DCD6F7", // lavender
    "#F4A261", // orange
  ];

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    // Change shape and color every second
    const interval = setInterval(() => {
      setShape((prev) => (prev + 1) % shapes.length);
      setColor((prev) => (prev + 1) % colors.length);
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: 0,
        top: 0,
        width: "24px",
        height: "24px",
        backgroundColor: colors[color],
        borderRadius: shapes[shape],
        mixBlendMode: "normal",
        boxShadow: `0 0 10px ${colors[color]}`,
        transition: "border-radius 0.3s ease, background-color 0.3s ease",
      }}
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        rotate: 360,
      }}
      transition={{
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        },
        x: { duration: 0, ease: "linear" },
        y: { duration: 0, ease: "linear" },
      }}
    >
      {/* Optional inner shape for more playfulness */}
      <div
        style={{
          width: "50%",
          height: "50%",
          backgroundColor: "white",
          borderRadius: "inherit",
          position: "absolute",
          top: "25%",
          left: "25%",
          opacity: 0.5,
        }}
      />
    </motion.div>
  );
};

export default CartoonCursor;
