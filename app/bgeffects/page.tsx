"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const BackgroundsHub = () => {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  const backgrounds = [
    {
      id: 1,
      title: "Glitch Effect",
      description: "A cyberpunk-inspired glitch animation background",
      path: "./bgeffects/backgrounds/glitch",
      color: "bg-purple-600",
    },
    {
      id: 2,
      title: "Particles",
      description: "Interactive floating particles background",
      path: "./bgeffects/backgrounds/particles",
      color: "bg-blue-600",
    },
    {
      id: 3,
      title: "Interactive",
      description: "Mouse-reactive dynamic background",
      path: "./bgeffects/backgrounds/interactive",
      color: "bg-green-600",
    },
    {
      id: 4,
      title: "Plasma Wave",
      description: "Colorful flowing plasma-like wave patterns",
      path: "./bgeffects/backgrounds/plasma",
      color: "bg-pink-600",
    },
    {
      id: 5,
      title: "Neon Grid",
      description: "Retro-style neon grid with perspective effect",
      path: "./bgeffects/backgrounds/grid",
      color: "bg-indigo-600",
    },
    {
      id: 6,
      title: "Fireflies",
      description: "Magical floating light particles with trails",
      path: "./bgeffects/backgrounds/fireflies",
      color: "bg-amber-600",
    },
    {
      id: 7,
      title: "VHS",
      description: "Old VHS tape effect.",
      path: "./bgeffects/backgrounds/vhs",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <div className="fixed top-4 left-4 z-10">
        <Link href="../../">
          <motion.button
            className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 Home
          </motion.button>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Background Effects Gallery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {backgrounds.map((bg) => (
            <motion.div
              key={bg.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredTile(bg.id)}
              onHoverEnd={() => setHoveredTile(null)}
            >
              <Link href={bg.path}>
                <div
                  className={`${
                    bg.color
                  } rounded-lg p-6 h-64 transition-all duration-300 ${
                    hoveredTile === bg.id
                      ? "shadow-lg shadow-white/20"
                      : "shadow-md"
                  }`}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {bg.title}
                      </h2>
                      <p className="text-gray-200">{bg.description}</p>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-sm opacity-75">
                        Click to view →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundsHub;
