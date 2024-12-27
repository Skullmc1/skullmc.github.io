"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { games } from "../data/games";
import Image from "next/image";
import CustomCursor from "../components/CustomCursor";
export default function GamesPage() {
  const [selectedSeason, setSelectedSeason] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <CustomCursor />
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-black/80" />
        <h1 className="text-6xl font-bold z-10">The Games</h1>
      </div>

      {/* Season Selection */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          className={`px-6 py-3 rounded-full ${
            selectedSeason === 1 ? "bg-pink-500" : "bg-gray-800"
          } transition-colors`}
          onClick={() => setSelectedSeason(1)}
        >
          Season 1
        </button>
        <button
          className={`px-6 py-3 rounded-full ${
            selectedSeason === 2 ? "bg-pink-500" : "bg-gray-800"
          } transition-colors`}
          onClick={() => setSelectedSeason(2)}
        >
          Season 2
        </button>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {games
            .filter((game) => game.season === selectedSeason)
            .map((game) => (
              <motion.div
                key={game.id}
                className="game-card bg-gray-900 rounded-lg overflow-hidden"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70">
                    {game.difficulty}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                  <p className="text-gray-400 mb-4">{game.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Rules:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-400">
                      {game.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm">
                    <span>Elimination Rate: {game.eliminationRate}%</span>
                    {game.playerCount && (
                      <span>Players: {game.playerCount}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
