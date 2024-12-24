"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// Add noise texture animation
const noiseAnimation = keyframes`
  0% { transform: translate(0,0) }
  10% { transform: translate(-5%,-5%) }
  20% { transform: translate(-10%,5%) }
  30% { transform: translate(5%,-10%) }
  40% { transform: translate(-5%,15%) }
  50% { transform: translate(-10%,5%) }
  60% { transform: translate(15%,0) }
  70% { transform: translate(0,10%) }
  80% { transform: translate(-15%,0) }
  90% { transform: translate(10%,5%) }
  100% { transform: translate(5%,0) }
`;

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const flicker = keyframes`
  0% { opacity: 0.27861 }
  5% { opacity: 0.34769 }
  10% { opacity: 0.23604 }
  15% { opacity: 0.90626 }
  20% { opacity: 0.18128 }
  25% { opacity: 0.83891 }
  30% { opacity: 0.65583 }
  35% { opacity: 0.67807 }
  40% { opacity: 0.26559 }
  45% { opacity: 0.84693 }
  50% { opacity: 0.96019 }
  55% { opacity: 0.08594 }
  60% { opacity: 0.20313 }
  65% { opacity: 0.71988 }
  70% { opacity: 0.53455 }
  75% { opacity: 0.37288 }
  80% { opacity: 0.71428 }
  85% { opacity: 0.70419 }
  90% { opacity: 0.7003 }
  95% { opacity: 0.36108 }
  100% { opacity: 0.24387 }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.08;
    animation: ${noiseAnimation} 0.5s steps(1) infinite;
    pointer-events: none;
  }
`;

// Enhanced glitch animations
const glitch = keyframes`
  /* ... (keep your existing glitch animation) ... */
`;

const glitchAnim2 = keyframes`
  /* ... (keep your existing glitchAnim2 animation) ... */
`;

const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  animation: ${scanline} 6s linear infinite;
  opacity: 0.3;
`;

const GlitchText = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  text-shadow:
    0.05em 0 0 #00fffc,
    -0.03em -0.04em 0 #fc00ff,
    0.025em 0.04em 0 #fffc00;
  animation: ${glitch} 725ms infinite;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    animation: ${glitch} 500ms infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    opacity: 0.75;
  }

  &::after {
    animation: ${glitchAnim2} 375ms infinite;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(0.0125em, 0.025em);
    opacity: 0.75;
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const GlitchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  animation: ${flicker} 4s infinite;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 1;
`;

const GlitchPage = () => {
  const [text, setText] = useState("GLITCH");
  const [isHovered, setIsHovered] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(1);

  // Random glitch effects
  useEffect(() => {
    const triggerRandomGlitch = () => {
      const interval = Math.random() * 10000 + 2000; // Random interval between 2-12 seconds
      setTimeout(() => {
        setGlitchIntensity(Math.random() * 2 + 0.5);
        const duration = Math.random() * 1000 + 500; // Glitch duration 0.5-1.5 seconds
        setTimeout(() => {
          setGlitchIntensity(1);
          triggerRandomGlitch();
        }, duration);
      }, interval);
    };

    triggerRandomGlitch();
  }, []);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomText = Array(6)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("");
        setText(randomText);
      }, 50);

      return () => clearInterval(interval);
    } else {
      setText("GLITCH");
    }
  }, [isHovered]);

  return (
    <>
      <GlobalStyle />
      <Container style={{ transform: `scale(${glitchIntensity})` }}>
        <GlitchOverlay />
        <Scanline />
        <Link href="./..">
          <BackButton>← Back to Gallery</BackButton>
        </Link>
        <GlitchText
          data-text={text}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            filter: `brightness(${glitchIntensity}) contrast(${glitchIntensity * 1.2})`,
          }}
        >
          {text}
        </GlitchText>
      </Container>
    </>
  );
};

export default GlitchPage;
