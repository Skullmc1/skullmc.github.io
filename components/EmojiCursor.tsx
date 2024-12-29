"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EmojiCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emoji, setEmoji] = useState(0);

  const emojis = ["🌟", "⭐", "💫", "✨", "🎨", "🎯", "🎪", "🎠"];

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    // Change emoji every second
    const interval = setInterval(() => {
      setEmoji((prev) => (prev + 1) % emojis.length);
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] select-none"
      style={{
        left: 0,
        top: 0,
        fontSize: "24px",
        filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))",
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
      {emojis[emoji]}
    </motion.div>
  );
};

export default EmojiCursor;
