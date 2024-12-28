"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const moveGrid = keyframes`
  0% {
    transform: perspective(500px) rotateX(45deg) translateY(0);
  }
  100% {
    transform: perspective(500px) rotateX(45deg) translateY(50px);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  position: relative;
`;

const BackgroundContainer = styled.div<{ $intensity: number }>`
  position: absolute;
  top: -100%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to bottom, #000000, #1a1a2e);
  opacity: 1;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(103, 0, 255, ${(props) => 0.1 + props.$intensity * 0.2}),
      transparent 70%
    );
    z-index: 1;
    will-change: opacity;
  }
`;

const Grid = styled.div<{ $intensity: number }>`
  position: absolute;
  top: 50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: linear-gradient(
      90deg,
      rgba(65, 184, 255, ${(props) => 0.1 + props.$intensity * 0.3}) 1px,
      transparent 1px
    ),
    linear-gradient(
      rgba(65, 184, 255, ${(props) => 0.1 + props.$intensity * 0.3}) 1px,
      transparent 1px
    );
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(45deg);
  transform-origin: 50% 0;
  animation: ${moveGrid} 3s linear infinite;
  z-index: 1;
  will-change: transform;
`;

const BallContainer = styled.div<{ $rotation: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${(props) => props.$rotation}deg);
  transition: transform 0.1s ease;
  z-index: 2;
  will-change: transform;
`;

const Ball = styled.div<{ $scale: number; $distortion: number }>`
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #845ec2);
  transform: scale(${(props) => props.$scale});
  border-radius: ${(props) => {
    const distortion = props.$distortion * 80;
    return `
      ${50 + distortion}% ${50 - distortion}%
      ${50 + distortion}% ${50 - distortion}% /
      ${50 - distortion}% ${50 + distortion}%
      ${50 - distortion}% ${50 + distortion}%
    `;
  }};
  transition: all 0.05s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
  will-change: transform, border-radius;
`;

const PulseRing = styled.div<{ $intensity: number; $trigger: boolean }>`
  position: absolute;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 107, 107, 0.5);
  transform: scale(1);
  opacity: 0;
  animation: ${(props) =>
    props.$trigger ? "pulseOut 1s ease-out forwards" : "none"};
  will-change: transform, opacity;

  @keyframes pulseOut {
    0% {
      transform: scale(1);
      opacity: ${(props) => props.$intensity};
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
`;

const GlowEffect = styled.div<{ $intensity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 107, 107, ${(props) => props.$intensity * 0.3}),
    transparent 70%
  );
  filter: blur(20px);
  z-index: 1;
  will-change: background;
`;

export default function SoundReactions() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [visualState, setVisualState] = useState({
    scale: 1,
    distortion: 0,
    intensity: 0,
    rotation: 0,
  });
  const [rings, setRings] = useState<{ id: number; trigger: boolean }[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const lastPulseRef = useRef(0);
  const ringIdRef = useRef(0);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 512;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });

        const source = context.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;
        setAudioContext(context);

        analyzeSoundData();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const addRing = () => {
    const newRing = { id: ringIdRef.current++, trigger: true };
    setRings((prev) => {
      // Limit the number of rings
      const filteredRings = prev.slice(-4);
      return [...filteredRings, newRing];
    });

    setTimeout(() => {
      setRings((prev) => prev.filter((ring) => ring.id !== newRing.id));
    }, 1000);
  };

  const analyzeSoundData = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Throttle calculations
    const now = Date.now();
    if (now - lastPulseRef.current > 50) {
      // Limit updates to every 50ms
      const average =
        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      const bassFrequencies = dataArray.slice(0, 20);
      const bassAverage =
        bassFrequencies.reduce((acc, val) => acc + val, 0) /
        bassFrequencies.length;

      const normalizedScale = 1 + (average / 255) * 1.2;
      const normalizedDistortion = (bassAverage / 255) * 1.5;
      const normalizedIntensity = average / 255;

      setVisualState((prev) => ({
        scale: normalizedScale,
        distortion: normalizedDistortion,
        intensity: normalizedIntensity,
        rotation: (prev.rotation + normalizedIntensity * 2) % 360,
      }));

      if (bassAverage > 150 && now - lastPulseRef.current > 100) {
        addRing();
        lastPulseRef.current = now;
      }
    }

    animationFrameRef.current = requestAnimationFrame(analyzeSoundData);
  };

  return (
    <Container>
      <BackgroundContainer $intensity={visualState.intensity}>
        <Grid $intensity={visualState.intensity} />
      </BackgroundContainer>
      <BallContainer $rotation={visualState.rotation}>
        <GlowEffect $intensity={visualState.intensity} />
        {rings.map((ring) => (
          <PulseRing
            key={ring.id}
            $intensity={visualState.intensity}
            $trigger={ring.trigger}
          />
        ))}
        <Ball $scale={visualState.scale} $distortion={visualState.distortion} />
      </BallContainer>
    </Container>
  );
}
