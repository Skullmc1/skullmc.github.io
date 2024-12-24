"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const WavyLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    let time = 0;
    const lines = 5;
    const animate = () => {
      ctx.fillStyle = "rgba(15, 15, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time + i * 0.5) * 50 +
            Math.sin(x * 0.02 + time + i * 0.7) * 30;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${(time * 10 + i * 30) % 360}, 70%, 50%, 0.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 0.01;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", setSize);
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default WavyLines;
