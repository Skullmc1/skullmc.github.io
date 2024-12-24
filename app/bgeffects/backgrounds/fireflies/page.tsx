"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #001;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const BackButton = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

interface Firefly {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
}

const FirefliesPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireflies: Firefly[] = [];
    const numFireflies = 50;

    for (let i = 0; i < numFireflies; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        alpha: Math.random(),
        targetAlpha: Math.random(),
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 1, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((fly) => {
        // Update position
        fly.x += fly.vx;
        fly.y += fly.vy;

        // Bounce off walls
        if (fly.x < 0 || fly.x > canvas.width) fly.vx *= -1;
        if (fly.y < 0 || fly.y > canvas.height) fly.vy *= -1;

        // Update alpha
        if (Math.abs(fly.alpha - fly.targetAlpha) < 0.01) {
          fly.targetAlpha = Math.random();
        }
        fly.alpha += (fly.targetAlpha - fly.alpha) * 0.02;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          fly.x,
          fly.y,
          0,
          fly.x,
          fly.y,
          fly.size * 4,
        );
        gradient.addColorStop(0, `rgba(255, 255, 150, ${fly.alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 150, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(fly.x, fly.y, fly.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw firefly
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 150, ${fly.alpha})`;
        ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2);
        ctx.fill();

        // Add trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 150, ${fly.alpha * 0.5})`;
        ctx.lineWidth = fly.size / 2;
        ctx.moveTo(fly.x - fly.vx * 3, fly.y - fly.vy * 3);
        ctx.lineTo(fly.x, fly.y);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Link href="./..">
        <BackButton>← Back to Gallery</BackButton>
      </Link>
      <Canvas ref={canvasRef} />
    </Container>
  );
};

export default FirefliesPage;
