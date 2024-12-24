"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  filter: saturate(120%) contrast(120%);
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

const VHSPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseCanvasRef.current;
    if (!canvas || !noiseCanvas) return;

    const ctx = canvas.getContext("2d");
    const noiseCtx = noiseCanvas.getContext("2d");
    if (!ctx || !noiseCtx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    noiseCanvas.width = window.innerWidth;
    noiseCanvas.height = window.innerHeight;

    let time = 0;
    let tracking = 0;
    let trackingDirection = 1;

    // Create noise pattern
    const createNoise = () => {
      const imageData = noiseCtx.createImageData(
        noiseCanvas.width,
        noiseCanvas.height,
      );
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise; // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = 20; // Alpha
      }

      return imageData;
    };

    // Create RGB shift effect
    const createRGBShift = (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      const shiftAmount = Math.sin(time) * 4;

      // Draw red channel
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(x - shiftAmount, y, width, height);

      // Draw blue channel
      ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
      ctx.fillRect(x + shiftAmount, y, width, height);

      // Draw green channel
      ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
      ctx.fillRect(x, y, width, height);
    };

    // Create scan lines
    const createScanLines = () => {
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, y, canvas.width, 1);
      }
    };

    // Create tracking distortion
    const createTracking = () => {
      const height = 20;
      const y = (tracking % canvas.height) - height;

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, y, canvas.width, height);
      ctx.fillRect(0, y + canvas.height / 2, canvas.width, height);

      tracking += trackingDirection * 2;
      if (Math.random() < 0.01) {
        trackingDirection *= -1;
      }
    };

    // Main animation loop
    const animate = () => {
      time += 0.05;

      // Clear canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw main content (example: colored rectangles)
      for (let i = 0; i < 5; i++) {
        createRGBShift(
          canvas.width / 2 - 200 + i * 100,
          canvas.height / 2 - 100,
          50,
          200,
        );
      }

      // Apply noise
      noiseCtx.putImageData(createNoise(), 0, 0);
      ctx.globalAlpha = 0.1;
      ctx.drawImage(noiseCanvas, 0, 0);
      ctx.globalAlpha = 1.0;

      // Apply scan lines
      createScanLines();

      // Apply tracking distortion
      createTracking();

      // Random glitches
      if (Math.random() < 0.05) {
        const glitchHeight = Math.random() * 10;
        const glitchY = Math.random() * canvas.height;
        ctx.drawImage(
          canvas,
          0,
          glitchY,
          canvas.width,
          glitchHeight,
          Math.random() * 10 - 5,
          glitchY,
          canvas.width,
          glitchHeight,
        );
      }

      // Random color aberration
      if (Math.random() < 0.01) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255}, 0.1)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      noiseCanvas.width = window.innerWidth;
      noiseCanvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      <Link href="./..">
        <BackButton>← Back to Gallery</BackButton>
      </Link>
      <Canvas ref={canvasRef} />
      <canvas ref={noiseCanvasRef} style={{ display: "none" }} />
    </Container>
  );
};

export default VHSPage;
