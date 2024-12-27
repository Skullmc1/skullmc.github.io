"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type CharacterStatus = "Alive" | "Eliminated" | "Winner";

interface CharacterCardProps {
  name: string;
  playerNumber: string;
  status: CharacterStatus; // Use the defined type
  image: string;
  description: string;
  debt: number;
}

export default function CharacterCard({
  name,
  playerNumber,
  status,
  image,
  description,
  debt,
}: CharacterCardProps) {
  return (
    <motion.div
      className="character-card"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="character-image-container">
        <Image
          src={image}
          alt={name}
          width={250}
          height={350}
          className="character-image"
        />
        <div className="player-number">{playerNumber}</div>
      </div>
      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
        <p className="character-description">{description}</p>
        {debt && (
          <div className="debt-info">
            <span>Debt:</span>
            <span className="debt-amount">₩{debt.toLocaleString()}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
