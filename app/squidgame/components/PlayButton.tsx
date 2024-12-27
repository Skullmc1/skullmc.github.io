"use client";

import { motion } from "framer-motion";

interface PlayButtonProps {
  onClick?: () => void;
  text?: string;
}

export default function PlayButton({
  onClick,
  text = "Join Game",
}: PlayButtonProps) {
  return (
    <motion.button
      className="play-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <svg
        className="play-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
      <span>{text}</span>
    </motion.button>
  );
}
