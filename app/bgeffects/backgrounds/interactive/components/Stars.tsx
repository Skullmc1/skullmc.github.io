"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const MeshDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Create dots
    const dots: { x: number; y: number }[] = [];
    const createDots = () => {
      const numberOfDots = 100;
      for (let i = 0; i < numberOfDots; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        });
      }
    };
    createDots();

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      });

      // Draw connections
      dots.forEach((dot1) => {
        dots.forEach((dot2) => {
          const distance = Math.hypot(dot1.x - dot2.x, dot1.y - dot2.y);
          const mouseDistance = Math.hypot(
            mousePos.x - dot1.x,
            mousePos.y - dot1.y,
          );

          if (
            distance < 100 &&
            (mouseDistance < 150 || Math.random() < 0.001)
          ) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return <Canvas ref={canvasRef} onMouseMove={handleMouseMove} />;
};

export default MeshDots;
