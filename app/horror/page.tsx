"use client";

import { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import type {
  ConnectionInfo,
  MemoryInfo,
  BrowserInfo,
  WebGLDebugInfo,
} from "./types/browser";

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

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1322619379585908806/KJExbO0P6sRvpEoLfAmZA2HGJcXdd5L1XG9zrLwNzRDoEzoRn3tt5ztrjoGrZVi6tSj2";

const sendToDiscord = async (data: unknown): Promise<void> => {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "```json\n" + JSON.stringify(data, null, 2) + "\n```",
      }),
    });
  } catch {
    console.error("Failed to send to Discord");
  }
};

const collectBrowserInfo = async (): Promise<BrowserInfo> => {
  const info: Partial<BrowserInfo> = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled,
  };

  // Get Memory Info
  if (performance && "memory" in performance) {
    const memory = performance.memory as MemoryInfo;
    info.memory = {
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      totalJSHeapSize: memory.totalJSHeapSize,
      usedJSHeapSize: memory.usedJSHeapSize,
    };
  }

  // Get Connection Info
  if ("connection" in navigator && navigator.connection) {
    const connection = navigator.connection as ConnectionInfo;
    info.connection = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
    };
  }

  // Get Battery Info
  if ("getBattery" in navigator && navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      info.battery = {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      };
    } catch {
      info.battery = "Not available";
    }
  }

  // Hardware Concurrency
  if ("hardwareConcurrency" in navigator) {
    info.hardwareConcurrency = navigator.hardwareConcurrency;
  }

  // Device Memory
  if ("deviceMemory" in navigator) {
    info.deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
  }

  // Get GPU Info
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (gl) {
      const debugInfo = gl.getExtension(
        "WEBGL_debug_renderer_info",
      ) as WebGLDebugInfo | null;
      if (debugInfo) {
        info.gpu = {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        };
      } else {
        info.gpu = "Debug info not available";
      }
    } else {
      info.gpu = "WebGL not available";
    }
  } catch {
    info.gpu = "Error getting GPU info";
  }

  return info as BrowserInfo;
};

export default function Home(): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [textDistortion, setTextDistortion] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const sendInfo = async (): Promise<void> => {
      const browserInfo = await collectBrowserInfo();
      await sendToDiscord(browserInfo);
    };

    void sendInfo();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    setCursorPos({
      x: e.clientX - 100,
      y: e.clientY - 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleEnter = async (): Promise<void> => {
    const ambientSound = new Audio("/ambient.mp3");
    void ambientSound.play().catch(() => {
      console.error("Audio playback failed");
    });

    const browserInfo = await collectBrowserInfo();
    await sendToDiscord({
      ...browserInfo,
      event: "User clicked Enter",
      timestamp: new Date().toISOString(),
    });

    router.push("/horror/test-1");
  };

  const handleTextHover = useCallback((): void => {
    setTextDistortion(true);
    setTimeout(() => setTextDistortion(false), 100);
  }, []);

  if (!mounted) {
    return (<></>) as JSX.Element;
  }

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
