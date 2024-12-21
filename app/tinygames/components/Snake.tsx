"use client";
import React, { useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<string>("right");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gridSize = 20;
  const cellSize = 25; // Increased cell size for better visibility

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent page scrolling with arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "down") setDirection("up");
          break;
        case "ArrowDown":
          if (direction !== "up") setDirection("down");
          break;
        case "ArrowLeft":
          if (direction !== "right") setDirection("left");
          break;
        case "ArrowRight":
          if (direction !== "left") setDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        switch (direction) {
          case "up":
            head.y -= 1;
            break;
          case "down":
            head.y += 1;
            break;
          case "left":
            head.x -= 1;
            break;
          case "right":
            head.x += 1;
            break;
        }

        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y,
          )
        ) {
          setGameOver(true);
          return prev;
        }

        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 1);
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }

        newSnake.unshift(head);
        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);

    // Draw grid lines
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    snake.forEach(({ x, y }, index) => {
      // Calculate size reduction factor based on position in snake
      const sizeFactor = 1 - index * 0.03; // Decrease by 3% for each segment
      const adjustedSize = Math.max(cellSize * sizeFactor, cellSize * 0.5); // Don't go smaller than 50% of cellSize
      const offset = (cellSize - adjustedSize) / 2;

      // Snake body gradient
      const gradient = ctx.createRadialGradient(
        x * cellSize + cellSize / 2,
        y * cellSize + cellSize / 2,
        0,
        x * cellSize + cellSize / 2,
        y * cellSize + cellSize / 2,
        adjustedSize / 2,
      );

      if (index === 0) {
        // Snake head
        gradient.addColorStop(0, "#4ade80");
        gradient.addColorStop(1, "#22c55e");
        ctx.fillStyle = gradient;

        // Draw snake head as a rounded rectangle
        ctx.beginPath();
        ctx.roundRect(
          x * cellSize + 1,
          y * cellSize + 1,
          cellSize - 2,
          cellSize - 2,
          8,
        );
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = "#000";
        const eyeSize = 3;
        if (direction === "right" || direction === "left") {
          ctx.fillRect(
            x * cellSize + (direction === "right" ? cellSize - 10 : 5),
            y * cellSize + 8,
            eyeSize,
            eyeSize,
          );
          ctx.fillRect(
            x * cellSize + (direction === "right" ? cellSize - 10 : 5),
            y * cellSize + cellSize - 12,
            eyeSize,
            eyeSize,
          );
        } else {
          ctx.fillRect(
            x * cellSize + 8,
            y * cellSize + (direction === "down" ? cellSize - 10 : 5),
            eyeSize,
            eyeSize,
          );
          ctx.fillRect(
            x * cellSize + cellSize - 12,
            y * cellSize + (direction === "down" ? cellSize - 10 : 5),
            eyeSize,
            eyeSize,
          );
        }
      } else {
        // Snake body
        gradient.addColorStop(0, "#22c55e");
        gradient.addColorStop(1, "#16a34a");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.roundRect(
          x * cellSize + offset,
          y * cellSize + offset,
          adjustedSize,
          adjustedSize,
          4,
        );
        ctx.fill();
      }
    });

    // Draw food (white rabbit)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    // Body
    ctx.ellipse(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2 + 2,
      cellSize / 2 - 2,
      cellSize / 3,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.ellipse(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 3,
      cellSize / 3,
      cellSize / 4,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.ellipse(
      food.x * cellSize + cellSize / 3,
      food.y * cellSize + cellSize / 4,
      2,
      cellSize / 4,
      -0.3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(
      food.x * cellSize + (cellSize * 2) / 3,
      food.y * cellSize + cellSize / 4,
      2,
      cellSize / 4,
      0.3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }, [snake, food, direction]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("right");
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-4 text-white">Snake Game</h2>

      <div className="mb-4 px-6 py-2 bg-gray-700 rounded-lg">
        <span className="text-2xl font-bold text-green-400">
          Score: {score}
        </span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="rounded-lg shadow-lg"
        />

        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-white mb-4">Game Over!</p>
            <p className="text-xl text-green-400 mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-gray-300 text-center">
        <p className="text-sm">Use arrow keys to control the snake</p>
        <p className="text-sm mt-1">Catch the rabbits to grow longer!</p>
      </div>
    </div>
  );
}
