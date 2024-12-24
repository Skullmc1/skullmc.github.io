"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Stars from "./components/Stars";
import WavyLines from "./components/WavyLines";
import Matrix from "./components/Matrix";

const Container = styled.div`
  height: 100vh;
  background: #0f0f0f;
  color: white;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButtons = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const Button = styled.div`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Section = styled(motion.section)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-snap-align: center;
  scroll-snap-stop: always;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  z-index: 10;
`;

const BackgroundContainer = styled(motion.div)`
  width: 80%;
  height: 70vh;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

interface BackgroundSection {
  id: number;
  title: string;
  component: React.ComponentType;
  description: string;
}

const backgrounds: BackgroundSection[] = [
  {
    id: 1,
    title: "Constellations",
    component: Stars,
    description: "Interactive star constellation network",
  },
  {
    id: 2,
    title: "Wavy Lines",
    component: WavyLines,
    description: "Smooth animated wave patterns",
  },
  {
    id: 4,
    title: "Matrix Rain",
    component: Matrix,
    description: "Digital rain effect inspired by The Matrix",
  },
];

const InteractivePage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;
    let lastScrollTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < 1000 || isScrolling) return;
      lastScrollTime = now;

      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(
        0,
        Math.min(backgrounds.length - 1, activeSection + direction),
      );

      isScrolling = true;
      setActiveSection(newSection);

      const targetPosition = newSection * window.innerHeight;
      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeSection]);

  return (
    <Container>
      <NavButtons>
        <Link href="./..">
          <Button>← Back to Gallery</Button>
        </Link>
        <Link href="../../../">
          <Button>🏠 Home</Button>
        </Link>
      </NavButtons>

      <ScrollContainer ref={scrollContainerRef}>
        <AnimatePresence mode="wait">
          {backgrounds.map((bg) => {
            const Background = bg.component;
            return (
              <Section key={bg.id}>
                <Title
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {bg.title}
                </Title>
                <BackgroundContainer
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Background />
                </BackgroundContainer>
              </Section>
            );
          })}
        </AnimatePresence>
      </ScrollContainer>
    </Container>
  );
};

export default InteractivePage;
