"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Slider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  emoji: string;
}

interface Theme {
  name: string;
  bgColor: string;
  emoji: string;
  additionalEmojis?: string[];
  intensity: number;
  special?: () => JSX.Element;
}

interface EmojiPickerData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  skin?: number | null;
  emoticons?: string[];
}

const Container = styled.div<{ $bgColor: string }>`
  position: relative;
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
  color: #fff;
  overflow: hidden;
`;

const Controls = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  width: 300px;
`;

const BackButton = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const PresetButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#4CAF50" : "#2196F3")};
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const EmojiPickerButton = styled.button`
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
`;

const ParticleElement = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  user-select: none;
  pointer-events: none;
`;

const themes: Theme[] = [
  {
    name: "Default",
    bgColor: "#1a1a1a",
    emoji: "⭐",
    intensity: 50,
  },
  {
    name: "Christmas",
    bgColor: "#2d4a3e",
    emoji: "❄️",
    additionalEmojis: ["🎄", "🎁", "⛄"],
    intensity: 70,
    special: () => (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100px",
          background: "linear-gradient(transparent, #fff)",
          opacity: 0.3,
        }}
      />
    ),
  },
  {
    name: "Halloween",
    bgColor: "#1a0f24",
    emoji: "🎃",
    additionalEmojis: ["👻", "🦇", "🕷️"],
    intensity: 60,
    special: () => (
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 166, 0, 0.1), transparent)",
        }}
      />
    ),
  },
];

const ParticlesPage = () => {
  const [currentEmoji, setCurrentEmoji] = useState("⭐");
  const [intensity, setIntensity] = useState(50);
  const [showPicker, setShowPicker] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeTheme, setActiveTheme] = useState<Theme>(themes[0]);
  const [nextParticleId, setNextParticleId] = useState(0);

  const createParticle = useCallback(() => {
    const x = Math.random() * window.innerWidth;
    const particleEmoji =
      activeTheme.additionalEmojis && Math.random() > 0.7
        ? activeTheme.additionalEmojis[
            Math.floor(Math.random() * activeTheme.additionalEmojis.length)
          ]
        : currentEmoji;

    setParticles((prev) => [
      ...prev,
      {
        id: nextParticleId,
        x,
        emoji: particleEmoji,
      },
    ]);
    setNextParticleId((prev) => prev + 1);
  }, [currentEmoji, nextParticleId, activeTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < intensity / 100) {
        createParticle();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [createParticle, intensity]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(-50)); // Keep only last 50 particles
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <Container $bgColor={activeTheme.bgColor}>
      <Link href="./..">
        <BackButton>← Back to Gallery</BackButton>
      </Link>

      <Controls>
        <div style={{ marginBottom: "15px" }}>
          <EmojiPickerButton onClick={() => setShowPicker(!showPicker)}>
            {currentEmoji} Change Emoji
          </EmojiPickerButton>
          {showPicker && (
            <div style={{ position: "absolute", right: "0", marginTop: "5px" }}>
              <Picker
                data={data}
                onEmojiSelect={(emoji: EmojiPickerData) => {
                  setCurrentEmoji(emoji.native);
                  setShowPicker(false);
                }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <div>Intensity: {intensity}</div>
          <Slider
            value={intensity}
            onChange={(_, newValue) => setIntensity(newValue as number)}
            min={0}
            max={100}
          />
        </div>

        <div>
          <div style={{ marginBottom: "5px" }}>Presets:</div>
          {themes.map((theme) => (
            <PresetButton
              key={theme.name}
              $active={activeTheme.name === theme.name}
              onClick={() => {
                setActiveTheme(theme);
                setCurrentEmoji(theme.emoji);
                setIntensity(theme.intensity);
              }}
            >
              {theme.name}
            </PresetButton>
          ))}
        </div>
      </Controls>

      {activeTheme.special && activeTheme.special()}

      <AnimatePresence>
        {particles.map((particle) => (
          <ParticleElement
            key={particle.id}
            initial={{ y: -20, x: particle.x, opacity: 1 }}
            animate={{ y: window.innerHeight + 20 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 5,
              ease: "linear",
            }}
          >
            {particle.emoji}
          </ParticleElement>
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default ParticlesPage;
