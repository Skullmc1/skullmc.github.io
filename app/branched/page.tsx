"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LandingScreen, GameContainer, Footer } from "../components";
import "./tidesoffate.css";

export default function BranchedPage() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col">
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <LandingScreen onStartGame={() => setGameStarted(true)} />
          ) : (
            <GameContainer />
          )}
        </AnimatePresence>

        {/* Optional: Add ambient background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#481E14]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#481E14]/20 to-transparent" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
