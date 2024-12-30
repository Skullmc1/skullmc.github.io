"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import styles from "./ColorBoard.module.css";
import ModernCursor from "@/components/ModernCursor";
// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface LeaderboardEntry {
  id: number;
  player_name: string;
  time: number;
  created_at: string;
}
const truncateText = (text: string, maxLength: number = 30) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function ColorBoard() {
  const gridSize = 10;
  const [squares, setSquares] = useState<
    Array<{ color: string; visible: boolean }>
  >(Array(gridSize * gridSize).fill({ color: "white", visible: true }));
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isGameComplete) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [startTime, isGameComplete]);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("time", { ascending: true })
      .limit(10);

    if (data) setLeaderboard(data);
  };

  const playDing = () => {
    const ding = new Audio("/ding.mp3");
    ding.volume = 0.3;
    ding.play();
  };

  const handleHover = (index: number) => {
    if (!squares[index].visible) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    playDing();

    setSquares((prev) => {
      const newSquares = [...prev];
      newSquares[index] = { color: getRandomColor(), visible: false };
      return newSquares;
    });

    // Check if all squares are cleared
    const remainingSquares = squares.filter((square) => square.visible).length;
    if (remainingSquares === 1) {
      // Including the current square
      setIsGameComplete(true);
      setShowNameInput(true);
    }
  };

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 30) + 35;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;

    const finalTime = elapsedTime;
    const { error } = await supabase.from("leaderboard").insert([
      {
        player_name: playerName,
        time: finalTime,
      },
    ]);

    if (!error) {
      await fetchLeaderboard();
      setShowNameInput(false);
      setPlayerName("");
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}s`;
  };

  return (
    <div className={styles.pageContainer}>
      <ModernCursor />
      <Link href="/" className={styles.homeButton}>
        ← Back to Home
      </Link>

      <div className={styles.container}>
        <div className={styles.gameArea}>
          <div className={styles.timer}>Time: {formatTime(elapsedTime)}</div>

          <div className={styles.grid}>
            {squares.map((square, index) => (
              <div
                key={index}
                className={`${styles.square} ${!square.visible ? styles.hidden : ""}`}
                style={{ backgroundColor: square.color }}
                onMouseEnter={() => handleHover(index)}
              />
            ))}
          </div>

          {showNameInput && (
            <div className={styles.nameInputContainer}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className={styles.nameInput}
              />
              <button
                onClick={handleSubmitScore}
                className={styles.submitButton}
              >
                Submit Score
              </button>
            </div>
          )}
        </div>

        <div className={styles.leaderboard}>
          <h2>Leaderboard</h2>
          <div className={styles.leaderboardEntries}>
            {leaderboard.map((entry, index) => (
              <div key={entry.id} className={styles.leaderboardEntry}>
                <span>{index + 1}.</span>
                <span title={entry.player_name}>
                  {truncateText(entry.player_name)}
                </span>
                <span>{formatTime(entry.time)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
