"use client";

import { useEffect, useRef } from "react";
import styles from "./miab.module.css";

interface Bubble {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const Bubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const bubbles = useRef<Bubble[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Initialize bubbles
    const initBubbles = () => {
      bubbles.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
      }));
    };
    initBubbles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.current.forEach((bubble) => {
        // Avoid mouse
        const dx = mousePos.current.x - bubble.x;
        const dy = mousePos.current.y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const avoidanceRadius = 100;

        if (distance < avoidanceRadius) {
          const angle = Math.atan2(dy, dx);
          bubble.x -= Math.cos(angle) * (avoidanceRadius - distance) * 0.1;
          bubble.y -= Math.sin(angle) * (avoidanceRadius - distance) * 0.1;
        }

        // Move bubbles
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Bounce off walls
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.speedX *= -1;
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.speedY *= -1;

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.stroke();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.bubbles} />;
};

export default Bubbles;
