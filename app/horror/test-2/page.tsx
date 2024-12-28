"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { supabase } from "../utils/supabase";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  max-width: 600px;
  width: 100%;
  height: 400px;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Question = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 600px;
  width: 100%;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards 1s;
`;

const Option = styled.button`
  padding: 1rem;
  background: transparent;
  border: 1px solid #ffffff50;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff10;
    border-color: white;
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
  z-index: 0;
`;

interface TestQuestion {
  image: string;
  text: string;
  options: string[];
  response?: string;
}

const questions: TestQuestion[] = [
  {
    image: "/test2/image1.jpg",
    text: "What emotion does this image evoke in you?",
    options: ["Fear", "Nostalgia", "Anxiety", "Peace"],
    response: "Are you sure that's what you really feel?",
  },
  {
    image: "/test2/image2.jpg",
    text: "Where have you seen this before?",
    options: ["In a dream", "Never", "In childhood", "Yesterday"],
    response: "Memory can be deceiving...",
  },
  {
    image: "/test2/image3.jpg",
    text: "Does this feel familiar?",
    options: ["Yes", "No", "Maybe", "I don't want to answer"],
    response: "It remembers you...",
  },
  // Add more questions as needed
];

export default function Test2() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    setMounted(true);

    const ambientSound = new Audio("/ambient-3.mp3");
    ambientSound.volume = 0.1;
    ambientSound.loop = true;

    if (mounted) {
      ambientSound
        .play()
        .catch((e) => console.log("Audio playback failed:", e));
    }

    return () => {
      ambientSound.pause();
      ambientSound.currentTime = 0;
    };
  }, [mounted]);

  const triggerGlitchEffect = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 150);
  };

  const handleAnswer = async (answer: string) => {
    triggerGlitchEffect();

    const sessionId = localStorage.getItem("sessionId");
    try {
      await supabase.from("test_responses").insert({
        session_id: sessionId,
        test_number: 2,
        question: questions[currentQuestion].text,
        answer: answer,
      });
    } catch (error) {
      console.error("Error saving response:", error);
    }

    if (questions[currentQuestion].response) {
      setShowResponse(true);
      setTimeout(() => {
        setShowResponse(false);
        proceedToNext();
      }, 3000);
    } else {
      proceedToNext();
    }
  };

  const proceedToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      router.push("/horror/test-3"); // or final results page
    }
  };

  if (!mounted) return null;

  return (
    <Container className={glitchEffect ? "glitch" : ""}>
      <Noise />

      <ImageContainer>
        <Image
          src={questions[currentQuestion].image}
          alt="Test image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/fallback-image.jpg";
          }}
        />
      </ImageContainer>

      <Question>
        {showResponse
          ? questions[currentQuestion].response
          : questions[currentQuestion].text}
      </Question>

      {!showResponse && (
        <OptionsContainer>
          {questions[currentQuestion].options.map((option, index) => (
            <Option key={index} onClick={() => handleAnswer(option)}>
              {option}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </Container>
  );
}
