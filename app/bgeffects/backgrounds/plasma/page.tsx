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

const PlasmaPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createPlasma = (x: number, y: number, time: number) => {
      const value =
        Math.sin(x * 0.01 + time) +
        Math.sin(y * 0.01 + time) +
        Math.sin((x + y) * 0.01 + time) +
        Math.sin(Math.sqrt(x * x + y * y) * 0.01);
      return value;
    };

    const animate = () => {
      frame++;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = createPlasma(x, y, frame * 0.02);
          const cell = (x + y * canvas.width) * 4;

          const r = Math.sin(value * Math.PI) * 127 + 128;
          const g = Math.sin(value * Math.PI + 2) * 127 + 128;
          const b = Math.sin(value * Math.PI + 4) * 127 + 128;

          data[cell] = r;
          data[cell + 1] = g;
          data[cell + 2] = b;
          data[cell + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
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

export default PlasmaPage;
