"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes, css } from "styled-components";
import { supabase } from "../utils/supabase";
import { BatteryInfo, ConnectionInfo, MemoryInfo } from "../types/browser";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const glitchText = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const textDistortion = keyframes`
  0% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(20% 0 0 0); }
  40% { clip-path: inset(40% 0 60% 0); }
  60% { clip-path: inset(60% 0 20% 0); }
  80% { clip-path: inset(80% 0 40% 0); }
  100% { clip-path: inset(0 0 0 0); }
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
  position: relative;
  overflow: hidden;
`;

const TextContainer = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
`;

const MainText = styled.h1<{ $isGlitch?: boolean }>`
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

const SubText = styled.p<{ $delay: number; $isDistorted?: boolean }>`
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

const FinalButton = styled.button`
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

const StaticOverlay = styled.div<{ $opacity: number }>`
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

interface TestResponse {
  question: string;
  answer: string;
}

interface SystemInfo {
  screenInfo: {
    width: number;
    height: number;
    colorDepth: number;
    pixelRatio: number;
  };
  browserInfo: {
    userAgent: string;
    language: string;
    platform: string;
    vendor: string;
    cookiesEnabled: boolean;
  };
  performanceInfo: {
    memory: MemoryInfo | "Not available";
    connection: ConnectionInfo | "Not available";
  };
}

export default function Ending() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [staticOpacity, setStaticOpacity] = useState(0);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchResponses = async () => {
      const sessionId = localStorage.getItem("sessionId");
      const { data } = await supabase
        .from("test_responses")
        .select("question, answer")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (data) {
        setResponses(data);
      }
    };

    fetchResponses();

    const ambientSound = new Audio("/ambient-ending.mp3");
    ambientSound.volume = 0.1;
    ambientSound.loop = true;
    ambientSound.play().catch(console.error);

    const staticSound = new Audio("/static-noise.mp3");
    staticSound.volume = 0;
    staticSound.loop = true;
    staticSound.play().catch(console.error);

    const staticInterval = setInterval(() => {
      setStaticOpacity((prev) => {
        const newOpacity = prev + 0.01;
        staticSound.volume = Math.min(newOpacity * 0.3, 0.3);
        return newOpacity > 0.3 ? 0.3 : newOpacity;
      });
    }, 1000);

    const phaseInterval = setInterval(() => {
      setPhase((prev) => prev + 1);
    }, 4000);

    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 150);
    }, 5000);

    return () => {
      clearInterval(staticInterval);
      clearInterval(phaseInterval);
      clearInterval(glitchInterval);
      ambientSound.pause();
      staticSound.pause();
    };
  }, [mounted]);

  const getSystemInfo = (): SystemInfo => {
    if (typeof window === "undefined") {
      throw new Error("Cannot get system info on server side");
    }

    return {
      screenInfo: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
      },
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor,
        cookiesEnabled: navigator.cookieEnabled,
      },
      performanceInfo: {
        memory: performance.memory || "Not available",
        connection: navigator.connection || "Not available",
      },
    };
  };

  const handleFinal = async () => {
    if (!mounted) return;

    const staticSound = new Audio("/static-burst.wav");
    staticSound.volume = 0.5;
    await staticSound.play();

    try {
      const [ipResponse, geoResponse] = await Promise.all([
        fetch("https://api.ipify.org?format=json"),
        fetch("https://ipapi.co/json/"),
      ]);

      const ipData = await ipResponse.json();
      const geoData = await geoResponse.json();
      const systemInfo = getSystemInfo();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTime = new Date().toLocaleString();
      const sessionId = localStorage.getItem("sessionId");

      let batteryInfo: BatteryInfo | "Not available" = "Not available";
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        batteryInfo = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      }

      const responsesText = responses
        ?.map((r) => `${r.question}: ${r.answer}`)
        .join("\n")
        .substring(0, 1000);

      const webhookBody = {
        embeds: [
          {
            title: "New Subject Completed Testing",
            description: "A new subject has completed all tests.",
            color: 0xff0000,
            fields: [
              {
                name: "Location Data",
                value: `IP: ${ipData.ip}\nCity: ${geoData.city}\nRegion: ${geoData.region}\nCountry: ${geoData.country_name}\nISP: ${geoData.org}`,
                inline: false,
              },
              {
                name: "System Information",
                value: `Browser: ${systemInfo.browserInfo.userAgent.substring(0, 500)}\nPlatform: ${systemInfo.browserInfo.platform}\nLanguage: ${systemInfo.browserInfo.language}`,
                inline: false,
              },
              {
                name: "Screen Information",
                value: `Resolution: ${systemInfo.screenInfo.width}x${systemInfo.screenInfo.height}\nPixel Ratio: ${systemInfo.screenInfo.pixelRatio}`,
                inline: false,
              },
              {
                name: "Time Information",
                value: `Timezone: ${timeZone}\nLocal Time: ${currentTime}`,
                inline: false,
              },
              {
                name: "Session ID",
                value: sessionId || "Unknown",
                inline: false,
              },
              {
                name: "Test Responses",
                value: responsesText || "No responses found",
                inline: false,
              },
              {
                name: "Battery Status",
                value: JSON.stringify(batteryInfo, null, 2),
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await fetch(
        "https://discord.com/api/webhooks/1322589539533062205/KrFQoikqH6QViBDbc1Cr5q_g4J2gcBevmKjjUP0HT8xuM2WH-PhrvsqxtER_BfCPWfrE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookBody),
        },
      );
    } catch (error) {
      console.error("Error sending webhook:", error);
    }

    setStaticOpacity(1);
    setTimeout(() => {
      router.push("/horror");
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <Container>
      <Noise />
      <StaticOverlay $opacity={staticOpacity} />

      <TextContainer>
        <MainText $isGlitch={showGlitch}>Test Sequence Complete</MainText>

        {phase >= 1 && (
          <SubText $delay={4}>
            Your responses have been... illuminating.
          </SubText>
        )}

        {phase >= 2 && (
          <SubText $delay={8} $isDistorted>
            We know who you are now.
          </SubText>
        )}

        {phase >= 3 && (
          <SubText $delay={12} $isDistorted>
            We know where to find you.
          </SubText>
        )}

        {phase >= 3 && responses.length > 0 && (
          <SubText $delay={16} $isDistorted>
            {"Especially after you told us about " +
              responses[0]?.answer.substring(0, 20) +
              "..."}
          </SubText>
        )}

        {phase >= 4 && <FinalButton onClick={handleFinal}>Exit</FinalButton>}
      </TextContainer>
    </Container>
  );
}
