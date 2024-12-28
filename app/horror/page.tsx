"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const MainText = styled.h1`
  font-size: 2.5rem;
  opacity: 0;
  animation: ${fadeIn} 3s ease-in forwards;
  margin-bottom: 2rem;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  opacity: 0;
  animation: ${fadeIn} 3s ease-in forwards 2s;
  color: #8a8a8a;
`;

const EnterButton = styled.button`
  margin-top: 3rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 3s ease-in forwards 4s;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const Noise = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/noise.png");
  opacity: 0.03;
  pointer-events: none;
`;

const CursorFollower = styled.div`
  position: fixed;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  pointer-events: none;
  z-index: 0;
`;

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 }); // Start off-screen
  const [textDistortion, setTextDistortion] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX - 100,
        y: e.clientY - 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleEnter = () => {
    // Create and play ambient sound
    const ambientSound = new Audio("/ambient.mp3");
    ambientSound.play().catch((e) => console.log("Audio playback failed:", e));

    // Navigate to the next page
    router.push("/horror/test-1");
  };

  const handleTextHover = () => {
    setTextDistortion(true);
    setTimeout(() => setTextDistortion(false), 100);
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono flex justify-center items-center overflow-hidden">
      <Noise />
      <CursorFollower
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      <Container>
        <MainText
          onMouseOver={handleTextHover}
          style={{
            transform: textDistortion ? "skew(0.5deg)" : "skew(-0.5deg)",
            transition: "transform 0.1s ease",
          }}
        >
          Welcome to the Threshold
        </MainText>
        <SubText>Are you prepared to know yourself?</SubText>
        <EnterButton onClick={handleEnter}>Enter</EnterButton>
      </Container>
    </main>
  );
}
