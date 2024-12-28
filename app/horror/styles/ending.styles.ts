import styled, { keyframes, css } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const glitchText = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

export const textDistortion = keyframes`
  0% {
    clip-path: inset(0 0 0 0);
  }
  20% {
    clip-path: inset(20% 0 0 0);
  }
  40% {
    clip-path: inset(40% 0 60% 0);
  }
  60% {
    clip-path: inset(60% 0 20% 0);
  }
  80% {
    clip-path: inset(80% 0 40% 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
`;

export const pulseRed = keyframes`
  0% { background-color: #300; }
  50% { background-color: #500; }
  100% { background-color: #300; }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

export const TextContainer = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 3;
`;

export const MainText = styled.h1<{ $isGlitch?: boolean }>`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;

  ${(props) =>
    props.$isGlitch &&
    css`
      animation: ${glitchText} 0.15s infinite;
    `}
`;

export const SubText = styled.p<{ $delay: number; $isDistorted?: boolean }>`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards ${(props) => props.$delay}s;

  ${(props) =>
    props.$isDistorted &&
    css`
      animation: ${textDistortion} 0.5s infinite;
      color: #ff0000;
    `}
`;

export const FinalButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #ff0000;
  color: #ff0000;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 12s;
  margin-top: 2rem;
  z-index: 3;

  &:hover {
    background: #ff0000;
    color: black;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Noise = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/noise.png");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
`;

export const StaticOverlay = styled.div<{ $opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/static.png");
  opacity: ${(props) => props.$opacity};
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: screen;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingText = styled.div`
  color: #ff0000;
  font-size: 1.5rem;
  animation: ${glitchText} 0.15s infinite;
`;

export const ErrorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ErrorText = styled.div`
  color: #ff0000;
  font-size: 2rem;
  margin-bottom: 2rem;
  animation: ${glitchText} 0.15s infinite;
`;

export const RetryButton = styled.button`
  padding: 0.8rem 1.6rem;
  background: transparent;
  border: 1px solid #ff0000;
  color: #ff0000;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff0000;
    color: black;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StaticFlash = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: ${(props) => (props.$visible ? 0.8 : 0)};
  transition: opacity 0.1s ease;
  pointer-events: none;
  z-index: 4;
  mix-blend-mode: overlay;
`;

export const GlitchLayer = styled.div<{ $active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/glitch-texture.png");
  opacity: ${(props) => (props.$active ? 0.1 : 0)};
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: overlay;
  animation: ${glitchText} 0.15s infinite;
`;

export const VignetteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  pointer-events: none;
  z-index: 1;
`;

export const ResponsePreview = styled.div<{ $isGlitch?: boolean }>`
  font-family: monospace;
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;
  opacity: 0.7;

  ${(props) =>
    props.$isGlitch &&
    css`
      animation: ${glitchText} 0.15s infinite;
      color: #ff0000;
    `}
`;
