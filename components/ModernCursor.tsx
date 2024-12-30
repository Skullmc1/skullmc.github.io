"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ModernCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check if cursor is over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "input" ||
        target.hasAttribute("role") ||
        target.hasAttribute("onClick") ||
        !!target.closest("button") ||
        !!target.closest("a") ||
        !!target.closest("input");

      setIsHovering(Boolean(isClickable));
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: 0,
          top: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          duration: 0,
          ease: "linear",
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: 0,
          top: 0,
          width: "32px",
          height: "32px",
          border: "1.5px solid #fff",
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
      />

      {/* Optional hover indicator */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[99998]"
          style={{
            left: 0,
            top: 0,
            width: "48px",
            height: "48px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            mixBlendMode: "difference",
            opacity: 0.1,
          }}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
        />
      )}
    </>
  );
};

export default ModernCursor;
