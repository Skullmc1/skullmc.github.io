"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { supabase } from "../utils/supabase";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
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

const QuestionContainer = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;
`;

const Question = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  animation: ${typewriter} 2s steps(40, end);
`;

const AnswerInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #ffffff50;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: white;
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: #ffffff30;
  width: 100%;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background: white;
  width: ${(props) => props.width}%;
  transition: width 0.5s ease;
`;

const SubText = styled.div`
  font-size: 0.8rem;
  color: #ffffff50;
  margin-top: 1rem;
  font-style: italic;
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

interface Question {
  text: string;
  subtext?: string;
  validation?: (answer: string) => boolean;
  response?: string;
}

const questions: Question[] = [
  {
    text: "What is your deepest fear?",
    subtext: "Be honest with yourself...",
    validation: (answer) => answer.length > 5,
  },
  {
    text: "When was the last time you felt truly alone?",
    subtext: "We all wear masks...",
    validation: (answer) => answer.length > 10,
  },
  {
    text: "What do you see in the darkness when you close your eyes?",
    subtext: "Look closer...",
    validation: (answer) => answer.length > 8,
  },
  {
    text: "Do you remember your dreams?",
    response: "But do your dreams remember you?",
    validation: (answer) =>
      answer.toLowerCase().includes("yes") ||
      answer.toLowerCase().includes("no"),
  },
  {
    text: "Are you sure you're alone right now?",
    subtext: "Think carefully before answering...",
    validation: (answer) => answer.length > 0,
  },
];

export default function Test1() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const progress = (currentQuestion / questions.length) * 100;

  useEffect(() => {
    setMounted(true);

    // Add ambient background sound
    const ambientSound = new Audio("/ambient-2.mp3");
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

  const handleAnswer = () => {
    const question = questions[currentQuestion];

    if (question.validation && !question.validation(answer)) {
      setError("Please provide a more detailed answer...");
      triggerGlitchEffect();
      return;
    }

    setResponses([...responses, answer]);

    if (question.response) {
      setShowResponse(true);
      triggerGlitchEffect();
      setTimeout(() => {
        setShowResponse(false);
        proceedToNext();
      }, 3000);
    } else {
      proceedToNext();
    }
  };

  const proceedToNext = async () => {
    if (currentQuestion < questions.length - 1) {
      // Save current question response
      const sessionId =
        localStorage.getItem("sessionId") || crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);

      try {
        await supabase.from("test_responses").insert({
          session_id: sessionId,
          test_number: 1,
          question: questions[currentQuestion].text,
          answer: answer,
        });
      } catch (error) {
        console.error("Error saving response:", error);
      }

      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setError("");
    } else {
      // Save final response and proceed
      const sessionId = localStorage.getItem("sessionId");
      try {
        await supabase.from("test_responses").insert({
          session_id: sessionId,
          test_number: 1,
          question: questions[currentQuestion].text,
          answer: answer,
        });
      } catch (error) {
        console.error("Error saving response:", error);
      }
      router.push("/horror/test-2");
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const shouldExit = window.confirm(
          "Are you sure you want to abandon the test?",
        );
        if (shouldExit) {
          router.push("/horror");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  if (!mounted) {
    return null;
  }

  return (
    <Container className={glitchEffect ? "glitch" : ""}>
      <Noise />
      <ProgressBar>
        <ProgressFill width={progress} />
      </ProgressBar>

      <QuestionContainer>
        <Question>
          {showResponse
            ? questions[currentQuestion].response
            : questions[currentQuestion].text}
        </Question>

        {!showResponse && (
          <>
            <AnswerInput
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnswer();
                }
              }}
              placeholder="Type your answer and press Enter..."
              autoFocus
            />
            {questions[currentQuestion].subtext && (
              <SubText>{questions[currentQuestion].subtext}</SubText>
            )}
            {error && <SubText style={{ color: "#ff0000" }}>{error}</SubText>}
          </>
        )}
      </QuestionContainer>
    </Container>
  );
}
