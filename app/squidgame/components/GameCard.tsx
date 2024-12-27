"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type GameDifficulty = "Easy" | "Medium" | "Hard";

interface GameCardProps {
  title: string;
  description: string;
  gameNumber: number;
  image: string;
  difficulty: GameDifficulty;
  eliminationRate: number;
}

export default function GameCard({
  title,
  description,
  gameNumber,
  image,
  difficulty,
  eliminationRate,
}: GameCardProps) {
  return (
    <motion.div
      className="game-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="game-card-number">#{gameNumber}</div>
      <div className="game-card-image">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-t-lg"
        />
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">{title}</h3>
        <p className="game-card-description">{description}</p>
        <div className="game-card-stats">
          <span className={`difficulty ${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
          <span className="elimination-rate">
            Elimination Rate: {eliminationRate}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
