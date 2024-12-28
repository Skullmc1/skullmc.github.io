"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes, css } from "styled-components";
import { supabase } from "../utils/supabase";
import Game from "../components/game";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulseRed = keyframes`
  0% { background-color: #300; }
  50% { background-color: #500; }
  100% { background-color: #300; }
`;

const glitchText = keyframes`
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

const Container = styled.div<{ isDanger?: boolean }>`
  min-height: 100vh;
  background: ${(props) => (props.isDanger ? "#300" : "#000")};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: background-color 0.5s ease;
  position: relative;
  overflow: hidden;
  ${(props) =>
    props.isDanger &&
    css`
      animation: ${pulseRed} 2s ease infinite;
    `}
`;

const WarningText = styled.h1<{ isGlitch?: boolean }>`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;
  ${(props) =>
    props.isGlitch &&
    css`
      animation: ${glitchText} 0.15s infinite;
    `}
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #ff0000;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 1s;
`;

const GameContainer = styled.div`
  width: 800px;
  height: 600px;
  margin: 2rem 0;
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 2s;
  background: #000;
  overflow: hidden;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #ff0000;
  color: #ff0000;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 3s;

  &:hover {
    background: #ff0000;
    color: black;
  }
`;

const DeathScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in forwards;
`;

const DeathText = styled.h1`
  font-size: 3rem;
  color: #ff0000;
  margin-bottom: 2rem;
  animation: ${glitchText} 0.15s infinite;
`;

const RestartButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #ff0000;
  color: #ff0000;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff0000;
    color: black;
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
  z-index: 1;
`;

const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
  font-size: 0.8rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 4s;
`;

export default function Test3() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [warningPhase, setWarningPhase] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [ambientSound, setAmbientSound] = useState<HTMLAudioElement | null>(
    null,
  );

  const warnings = [
    "Welcome to the final test.",
    "This is not like the others.",
    "Failure has consequences.",
    "Are you prepared to continue?",
    "Your life may depend on it.",
    "Begin the test?",
  ];

  useEffect(() => {
    setMounted(true);
    return () => {
      if (ambientSound) {
        ambientSound.pause();
        ambientSound.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || gameStarted) return;

    const warningInterval = setInterval(() => {
      setWarningPhase((prev) => {
        if (prev < warnings.length - 1) return prev + 1;
        clearInterval(warningInterval);
        return prev;
      });
    }, 3000);

    // Initialize ambient sound
    const sound = new Audio("/ambient-4.mp3");
    sound.volume = 0.1;
    sound.loop = true;
    setAmbientSound(sound);

    if (mounted) {
      sound.play().catch((e) => console.log("Audio playback failed:", e));
    }

    return () => {
      clearInterval(warningInterval);
      sound.pause();
      sound.currentTime = 0;
    };
  }, [mounted, gameStarted]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 150);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
    if (ambientSound) {
      ambientSound.volume = 0.05; // Lower volume during game
    }
  };

  const handleGameOver = async () => {
    setIsDead(true);

    const sessionId = localStorage.getItem("sessionId");
    try {
      await supabase.from("test_responses").insert({
        session_id: sessionId,
        test_number: 3,
        question: "Final Test",
        answer: "Failed - Death",
      });
    } catch (error) {
      console.error("Error saving death:", error);
    }
  };

  const handleGameWin = async () => {
    const sessionId = localStorage.getItem("sessionId");
    try {
      await supabase.from("test_responses").insert({
        session_id: sessionId,
        test_number: 3,
        question: "Final Test",
        answer: "Completed Successfully",
      });
    } catch (error) {
      console.error("Error saving win:", error);
    }
    router.push("/horror/ending");
  };

  const handleRestart = () => {
    if (ambientSound) {
      ambientSound.volume = 0.1;
    }
    setIsDead(false);
    setGameStarted(false);
    setWarningPhase(0);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && gameStarted) {
        const shouldExit = window.confirm(
          "Are you sure you want to abandon the test?",
        );
        if (shouldExit) {
          router.push("/horror");
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [gameStarted, router]);

  if (!mounted) return null;

  if (isDead) {
    return (
      <DeathScreen>
        <Noise />
        <DeathText>YOU DIED</DeathText>
        <RestartButton onClick={handleRestart}>Try Again?</RestartButton>
      </DeathScreen>
    );
  }

  return (
    <Container isDanger={warningPhase === warnings.length - 1}>
      <Noise />

      {!gameStarted ? (
        <>
          <WarningText isGlitch={showGlitch}>
            {warnings[warningPhase]}
          </WarningText>
          {warningPhase === warnings.length - 1 && (
            <>
              <SubText>
                This is your final warning. Proceed at your own risk.
              </SubText>
              <StartButton onClick={handleStartGame}>Begin Test</StartButton>
              <Controls>
                Use WASD to move | Reach the green exit | Avoid the red enemy |
                Survive 5 minutes
              </Controls>
            </>
          )}
        </>
      ) : (
        <GameContainer>
          <Game onGameOver={handleGameOver} onGameWin={handleGameWin} />
        </GameContainer>
      )}
    </Container>
  );
}
