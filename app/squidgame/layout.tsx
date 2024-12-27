"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CircleShape,
  TriangleShape,
  SquareShape,
} from "./components/GameShapes";
import "./styles/styles.css";

export default function SquidGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-pink-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Shapes */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CircleShape />
                <TriangleShape />
                <SquareShape />
              </div>
              <motion.span
                className="text-white font-bold text-2xl tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                SQUID GAME
              </motion.span>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8">
              <NavLink href="/squidgame">Home</NavLink>
              <NavLink href="/squidgame/games">Games</NavLink>
              <NavLink href="/squidgame/characters">Characters</NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">{children}</main>

      <footer className="bg-black border-t border-pink-500/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <div className="flex justify-center gap-4 mb-4">
              <CircleShape />
              <TriangleShape />
              <SquareShape />
            </div>
            <p>© 2024 Squid Game Fan Site. This is a fan-made website.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom NavLink component with hover effects
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <motion.span
        className="text-white hover:text-pink-500 transition-colors relative py-2"
        whileHover={{
          scale: 1.05,
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
