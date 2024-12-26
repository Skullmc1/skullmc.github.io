"use client";
import { useState, useEffect, useCallback } from "react";
import Crosshair from "./Crosshair";
import Target from "./Target";
import Scoreboard from "./Scoreboard";
import AmmoCounter from "./AmmoCounter";
import PowerUpIndicator from "./PowerUpIndicator";
import Menu from "./Menu";
import Tutorial from "./Tutorial";

interface TargetType {
  id: number;
  x: number;
  y: number;
  size: "normal" | "large";
  type: "standard" | "scoreMultiplier" | "ammoClip" | "fastReload" | "bomb";
  createdAt: number;
}

interface PowerUp {
  type: "scoreMultiplier" | "fastReload";
  expiresAt: number;
}

const MAX_AMMO = 10;
const RELOAD_TIME = 3000; // 3 seconds
const POWER_UP_DURATION = 60000; // 1 minute

export default function ShooterGame() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState<TargetType[]>([]);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [ammo, setAmmo] = useState(MAX_AMMO);
  const [isReloading, setIsReloading] = useState(false);
  const [activeEffects, setActiveEffects] = useState<PowerUp[]>([]);
  const [maxAmmoCount, setMaxAmmoCount] = useState(MAX_AMMO);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handlePowerUp = (type: TargetType["type"]) => {
    switch (type) {
      case "scoreMultiplier":
        setActiveEffects((prev) => [
          ...prev,
          {
            type: "scoreMultiplier",
            expiresAt: Date.now() + POWER_UP_DURATION,
          },
        ]);
        break;
      case "ammoClip":
        setMaxAmmoCount(25);
        setAmmo(25);
        break;
      case "fastReload":
        setActiveEffects((prev) => [
          ...prev,
          {
            type: "fastReload",
            expiresAt: Date.now() + POWER_UP_DURATION,
          },
        ]);
        break;
      case "bomb":
        setScore((prev) => Math.max(0, prev - 1000));
        break;
    }
  };

  const handleShoot = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isGameActive || isMenuOpen) return;
      if (isReloading || ammo <= 0) return;

      setAmmo((prev) => prev - 1);

      const hitTarget = targets.find((target) => {
        const dx = target.x - mousePosition.x;
        const dy = target.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hitRadius = target.size === "large" ? 40 : 25;
        return distance < hitRadius;
      });

      if (hitTarget) {
        if (hitTarget.type !== "standard") {
          handlePowerUp(hitTarget.type);
        } else {
          const scoreMultiplier = activeEffects.some(
            (effect) =>
              effect.type === "scoreMultiplier" &&
              effect.expiresAt > Date.now(),
          )
            ? 2
            : 1;
          setScore((prev) => prev + 100 * scoreMultiplier);
        }
        // Increment hits counter for any target hit
        setHits((prev) => prev + 1);
        setTargets((prev) => prev.filter((t) => t.id !== hitTarget.id));
      }
    },
    [
      mousePosition,
      targets,
      isReloading,
      ammo,
      activeEffects,
      isGameActive,
      isMenuOpen,
    ],
  );

  const reload = useCallback(() => {
    if (ammo === 0) {
      setIsReloading(true);
      const reloadTime = activeEffects.some(
        (effect) =>
          effect.type === "fastReload" && effect.expiresAt > Date.now(),
      )
        ? RELOAD_TIME / 2
        : RELOAD_TIME;

      setTimeout(() => {
        setAmmo(maxAmmoCount);
        setIsReloading(false);
      }, reloadTime);
    }
  }, [ammo, activeEffects, maxAmmoCount]);

  useEffect(() => {
    if (ammo === 0) {
      reload();
    }
  }, [ammo, reload]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setActiveEffects((prev) =>
        prev.filter((effect) => effect.expiresAt > now),
      );
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTargets((prev) =>
        prev.filter((target) => {
          const age = now - target.createdAt;
          return target.size === "large" ? age < 2000 : age < 4000;
        }),
      );
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, []);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isTutorialOpen) {
          setIsTutorialOpen(false);
        } else {
          setIsMenuOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isTutorialOpen]);

  // Add handlers for menu actions
  const handleStart = () => {
    setIsMenuOpen(false);
    setIsGameActive(true);
  };

  const handleResume = () => {
    setIsMenuOpen(false);
  };

  const handleShowTutorial = () => {
    setIsTutorialOpen(true);
  };
  useEffect(() => {
    if (!isGameActive || isMenuOpen) return;
    const spawnTarget = () => {
      const isLarge = Math.random() < 0.3;
      const padding = isLarge ? 64 : 48;
      const x = padding + Math.random() * (window.innerWidth - padding * 2);
      const y = padding + Math.random() * (window.innerHeight - padding * 2);

      const rand = Math.random();
      let type: TargetType["type"] = "standard";
      // Reduced power-up spawn rates (total 15% instead of 40%)
      if (rand < 0.04)
        type = "scoreMultiplier"; // 4% chance
      else if (rand < 0.08)
        type = "ammoClip"; // 4% chance
      else if (rand < 0.12)
        type = "fastReload"; // 4% chance
      else if (rand < 0.15) type = "bomb"; // 3% chance
      // 85% chance for standard targets

      setTargets((prev) => [
        ...prev,
        {
          id: Date.now(),
          x,
          y,
          size: isLarge ? "large" : "normal",
          type,
          createdAt: Date.now(),
        },
      ]);
    };

    // Increased spawn rate (1.5 seconds instead of 2 seconds)
    const intervalId = setInterval(spawnTarget, 1500);
    return () => clearInterval(intervalId);
  }, [isGameActive, isMenuOpen]);

  return (
    <div
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      onClick={handleShoot}
    >
      <Menu
        isOpen={isMenuOpen}
        score={score}
        onStart={handleStart}
        onResume={handleResume}
        onShowTutorial={handleShowTutorial}
      />
      <Tutorial
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
      <Scoreboard score={score} hits={hits} />

      {/* Ammo Counter */}
      <div className="fixed bottom-8 left-8">
        <AmmoCounter
          ammo={ammo}
          isReloading={isReloading}
          maxAmmo={maxAmmoCount}
        />
      </div>

      {/* Power-up indicators */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2">
        {activeEffects.map((effect) => {
          const timeLeft = effect.expiresAt - Date.now();
          if (timeLeft <= 0) return null;

          return (
            <PowerUpIndicator
              key={`${effect.type}-${effect.expiresAt}`}
              type={effect.type}
              timeLeft={timeLeft}
            />
          );
        })}
      </div>

      <Crosshair x={mousePosition.x} y={mousePosition.y} />
      {targets.map((target) => (
        <Target
          key={target.id}
          x={target.x}
          y={target.y}
          size={target.size}
          type={target.type}
        />
      ))}
    </div>
  );
}
