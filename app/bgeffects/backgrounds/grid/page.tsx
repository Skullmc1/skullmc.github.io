"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0b0014;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: none;
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

const GridPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cellSize = 50;
    let time = 0;

    const drawGlowingLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      baseAlpha: number,
    ) => {
      const pulseSpeed = 2;
      const pulseIntensity = 0.3;
      const positionFactor = Math.sin((x1 + y1) * 0.01 + time);
      const timeOffset = Math.sin(time * pulseSpeed);
      const alpha =
        baseAlpha * (1 + positionFactor * timeOffset * pulseIntensity);

      // Main line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#ff00ff";
      ctx.lineWidth = 2;
      ctx.globalAlpha = alpha;
      ctx.stroke();

      // Inner glow
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#ff80ff";
      ctx.lineWidth = 4;
      ctx.globalAlpha = alpha * 0.4;
      ctx.stroke();

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#ff00ff";
      ctx.lineWidth = 6;
      ctx.globalAlpha = alpha * 0.2;
      ctx.stroke();
    };

    const drawGrid = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = "rgba(11, 0, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;
      const offsetX = (canvas.width % cellSize) / 2;
      const offsetY = (canvas.height % cellSize) / 2;

      // Calculate perspective distortion
      const perspectiveStrength = isHovering ? 0.0015 : 0;
      const mouseXRatio = (mousePos.x - canvas.width / 2) / (canvas.width / 2);
      // Draw vertical lines
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y < rows; y++) {
          const baseX = x * cellSize + offsetX;
          const baseY = y * cellSize + offsetY;
          const nextBaseY = (y + 1) * cellSize + offsetY;

          // Apply perspective distortion
          const distortionX =
            mouseXRatio * (baseY - canvas.height / 2) * perspectiveStrength;
          const nextDistortionX =
            mouseXRatio * (nextBaseY - canvas.height / 2) * perspectiveStrength;

          const startX = baseX + distortionX * canvas.width;
          const endX = baseX + nextDistortionX * canvas.width;

          drawGlowingLine(startX, baseY, endX, nextBaseY, 1);
        }
      }

      // Draw horizontal lines
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x < cols; x++) {
          const baseX = x * cellSize + offsetX;
          const nextBaseX = (x + 1) * cellSize + offsetX;
          const baseY = y * cellSize + offsetY;

          // Apply perspective distortion
          const distortionX =
            mouseXRatio * (baseY - canvas.height / 2) * perspectiveStrength;
          const nextDistortionX =
            mouseXRatio * (baseY - canvas.height / 2) * perspectiveStrength;

          const startX = baseX + distortionX * canvas.width;
          const endX = nextBaseX + nextDistortionX * canvas.width;

          drawGlowingLine(startX, baseY, endX, baseY, 1);
        }
      }

      time += 0.01;
      animationFrameRef.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Container>
      <Link href="./..">
        <BackButton>← Back to Gallery</BackButton>
      </Link>
      <Canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    </Container>
  );
};

export default GridPage;
