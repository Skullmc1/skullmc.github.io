"use client";

import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const GRID_SIZE = 20;
const GRID_COLS = 40;
const GRID_ROWS = 30;

const GameWrapper = styled.div<{ isShuffling?: boolean; isWinning?: boolean }>`
  width: ${GRID_COLS * GRID_SIZE}px;
  height: ${GRID_ROWS * GRID_SIZE}px;
  background: #000;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;

  ${(props) =>
    props.isShuffling &&
    css`
      animation: shake 0.5s ease-in-out;
    `}

  ${(props) =>
    props.isWinning &&
    css`
      animation: success 1s ease-in-out;
    `}
`;

const Cell = styled.div<{
  type: "empty" | "wall" | "player" | "enemy" | "exit";
  isShuffling?: boolean;
}>`
  position: absolute;
  width: ${GRID_SIZE}px;
  height: ${GRID_SIZE}px;
  transition: all 0.3s ease;

  ${({ type, isShuffling }) => {
    let styles = "";

    switch (type) {
      case "wall":
        styles = "background: #333;";
        if (isShuffling) {
          styles += "animation: flash 0.5s ease-in-out;";
        }
        break;
      case "player":
        styles = "background: #fff; border-radius: 50%;";
        break;
      case "enemy":
        styles =
          "background: #ff0000; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);";
        break;
      case "exit":
        styles = "background: #00ff00; animation: pulse 2s infinite;";
        break;
    }

    return styles;
  }}

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const Timer = styled.div<{ time: number }>`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${(props) => (props.time <= 60 ? "#ff0000" : "#fff")};
  font-size: 24px;
  z-index: 3;
`;

interface Position {
  x: number;
  y: number;
}

interface GameProps {
  onGameOver: () => void;
  onGameWin: () => void;
}

const TOTAL_TIME = 300;
const MAZE_CHANGE_INTERVAL = 10000;

export default function Game({ onGameOver, onGameWin }: GameProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
  const [enemyPos, setEnemyPos] = useState<Position>({ x: 20, y: 15 });
  const [walls, setWalls] = useState<Position[]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [isShuffling, setIsShuffling] = useState(false);
  const [isWinning, setIsWinning] = useState(false);

  const generateMaze = () => {
    setIsShuffling(true);
    const shuffleSound = new Audio("/shuffle.mp3");
    shuffleSound.volume = 0.3;
    shuffleSound.play().catch(console.error);

    const newWalls: Position[] = [];
    const numWalls = GRID_COLS * GRID_ROWS * 0.2;

    while (newWalls.length < numWalls) {
      const wall = {
        x: Math.floor(Math.random() * (GRID_COLS - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_ROWS - 2)) + 1,
      };

      const isNearPlayer =
        Math.abs(wall.x - playerPos.x) <= 2 &&
        Math.abs(wall.y - playerPos.y) <= 2;
      const isNearEnemy =
        Math.abs(wall.x - enemyPos.x) <= 2 &&
        Math.abs(wall.y - enemyPos.y) <= 2;
      const isNearExit =
        Math.abs(wall.x - (GRID_COLS - 2)) <= 2 &&
        Math.abs(wall.y - (GRID_ROWS - 2)) <= 2;

      if (!isNearPlayer && !isNearEnemy && !isNearExit) {
        newWalls.push(wall);
      }
    }

    setWalls(newWalls);
    setTimeout(() => setIsShuffling(false), 500);
  };

  const isValidMove = (pos: Position): boolean => {
    if (pos.x < 0 || pos.x >= GRID_COLS || pos.y < 0 || pos.y >= GRID_ROWS) {
      return false;
    }

    return !walls.some((wall) => wall.x === pos.x && wall.y === pos.y);
  };

  const moveEnemy = () => {
    const dx = playerPos.x - enemyPos.x;
    const dy = playerPos.y - enemyPos.y;

    let newX = enemyPos.x;
    let newY = enemyPos.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      newX += Math.sign(dx);
    } else {
      newY += Math.sign(dy);
    }

    const newPos = { x: newX, y: newY };
    if (isValidMove(newPos)) {
      setEnemyPos(newPos);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 100) return;

      const newPos = { ...playerPos };

      switch (e.key.toLowerCase()) {
        case "w":
          newPos.y--;
          break;
        case "s":
          newPos.y++;
          break;
        case "a":
          newPos.x--;
          break;
        case "d":
          newPos.x++;
          break;
        default:
          return;
      }

      if (isValidMove(newPos)) {
        setPlayerPos(newPos);
        setLastMoveTime(now);
        moveEnemy();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, walls, lastMoveTime]);

  useEffect(() => {
    generateMaze();

    const mazeInterval = setInterval(generateMaze, MAZE_CHANGE_INTERVAL);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(mazeInterval);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (playerPos.x === enemyPos.x && playerPos.y === enemyPos.y) {
      onGameOver();
    }

    if (playerPos.x === GRID_COLS - 2 && playerPos.y === GRID_ROWS - 2) {
      setIsWinning(true);
      const winSound = new Audio("/win.mp3");
      winSound.volume = 0.5;
      winSound.play().catch(console.error);

      setTimeout(() => {
        onGameWin();
      }, 1000);
    }
  }, [playerPos, enemyPos]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <GameWrapper isShuffling={isShuffling} isWinning={isWinning}>
      <Timer time={timeLeft}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Timer>

      {walls.map((wall, index) => (
        <Cell
          key={`wall-${index}`}
          type="wall"
          isShuffling={isShuffling}
          style={{
            left: wall.x * GRID_SIZE,
            top: wall.y * GRID_SIZE,
          }}
        />
      ))}

      <Cell
        type="player"
        style={{
          left: playerPos.x * GRID_SIZE,
          top: playerPos.y * GRID_SIZE,
        }}
      />

      <Cell
        type="enemy"
        style={{
          left: enemyPos.x * GRID_SIZE,
          top: enemyPos.y * GRID_SIZE,
        }}
      />

      <Cell
        type="exit"
        style={{
          left: (GRID_COLS - 2) * GRID_SIZE,
          top: (GRID_ROWS - 2) * GRID_SIZE,
        }}
      />
    </GameWrapper>
  );
}
