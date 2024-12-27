"use client";

import { motion } from "framer-motion";

export const CircleShape = () => (
  <motion.svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.2, type: "spring" }}
  >
    <circle cx="30" cy="30" r="28" stroke="#FF0F7B" strokeWidth="4" />
  </motion.svg>
);

export const TriangleShape = () => (
  <motion.svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.4, type: "spring" }}
  >
    <path d="M30 4L56 52H4L30 4Z" stroke="#FF0F7B" strokeWidth="4" />
  </motion.svg>
);

export const SquareShape = () => (
  <motion.svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.6, type: "spring" }}
  >
    <rect x="8" y="8" width="44" height="44" stroke="#FF0F7B" strokeWidth="4" />
  </motion.svg>
);
