"use client";
import { motion } from "framer-motion";

interface LandingScreenProps {
  onStartGame: () => void;
}

export default function LandingScreen({ onStartGame }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#0C0C0C] px-4"
    >
      <div className="text-center space-y-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold text-[#F2613F] mb-8 font-pixel"
        >
          Tides of Fate
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#9B3922] text-xl mb-12 max-w-md mx-auto"
        >
          Navigate the treacherous waters of destiny, where every choice shapes
          the future of the archipelago.
        </motion.p>

        <motion.button
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={onStartGame}
          className="px-8 py-4 bg-[#9B3922] text-white border-2 border-[#F2613F]
          hover:bg-[#F2613F] transition-colors duration-200 font-pixel
          uppercase tracking-wider"
        >
          Begin Your Journey
        </motion.button>

        {/* Optional: Adding some decorative elements */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-[#481E14] text-sm"
        >
          Press any key to continue
        </motion.div>
      </div>
    </motion.div>
  );
}
