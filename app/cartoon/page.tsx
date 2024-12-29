"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./cartoon.css";
import CartoonCursor from "@/components/CartoonCursor";
import CartoonContextMenu from "@/components/CartoonContextMenu";

export default function CartoonLayout() {
  const newProjects = [
    {
      title: "[REDACTED]",
      description: "Creepy Website made for fun.",
      link: "/horror",
      tech: ["React", "Next.js"],
    },
    {
      title: "A Cube",
      description: "A cube that reacts to sound.",
      link: "/soundreactions",
      tech: ["React", "Next.js"],
    },
    {
      title: "Squid Game Fan Website",
      description: "Fan-site for Squid game show.",
      link: "/squidgame",
      tech: ["React", "Next.js"],
    },
    {
      title: "Shooter Game",
      description: "A simple shooter game.",
      link: "/shooter",
      tech: ["Typescript", "som'more"],
    },
    {
      title: "ColorBoard",
      description: "A Grid that colors when hovering",
      link: "/colorboard",
      tech: ["JavaScript"],
    },
  ];

  const allProjects = [
    {
      title: "Background effects Testing",
      description: "Testing ground for various backgrounds.",
      link: "/bgeffects",
      tech: ["Various"],
    },
    {
      title: "Message In a Bottle",
      description: "Send a message. Can be seen by anyone.",
      link: "/miab",
      tech: ["React", "Supabase"],
    },
    {
      title: "Game Library",
      description: "A library of games with a filter and search feature",
      link: "/games",
      tech: ["React", "TypeScript"],
    },
    {
      title: "SolarKingdom v3",
      description: "Website made for Solar company.",
      link: "/solarkingdom",
      tech: ["Typescript", "Javascript"],
    },
    {
      title: "Snake & TicTacToe",
      description: "Two classic games in one",
      link: "/tinygames",
      tech: ["Nextjs", "TypeScript"],
    },
    {
      title: "Branching Realms",
      description: "An Auto Generating Text Adventure Game",
      link: "/projects/adventure/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Notepad",
      description: "im out of ideas so i made a notepad",
      link: "/projects/notepad/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Portofolio Website",
      description: "A portfolio website for me",
      link: "/projects/portofolio/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "PersonaForge",
      description: "A website that generates random personas",
      link: "/persona",
      tech: ["React", "TypeScript", "SupaBase"],
    },
    {
      title: "Backrooms Experience",
      description: "A website that simulates the backrooms experience",
      link: "/projects/backrooms/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "SCP Library",
      description: "Always Updating SCP Archive",
      link: "/projects/scp/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Nerton",
      description: "A living town's website. Nerton is always watching you.",
      link: "/projects/nerton/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Solar Kingdom v2",
      description:
        "Redesigned and enhanced version of the solar energy company website",
      link: "/projects/solarkingdomv2/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Solar Kingdom",
      description: "Modern website for a sustainable solar energy company",
      link: "/projects/solarkingdom/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Supermarket",
      description:
        "Eco-friendly supermarket platform promoting sustainable shopping",
      link: "/projects/supermarket/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Lethal Company",
      description: "Fan website for the popular horror survival game",
      link: "/projects/lc/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Futuristic School",
      description: "Website for a high-tech educational institution",
      link: "/projects/school/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Joke Generator",
      description: "Random joke generator with various categories",
      link: "/projects/joke/index.html",
      tech: ["HTML", "CSS", "JavaScript"],
    },
  ];

  const AnimatedText = () => {
    const words = ["Welcome to", "Innovation", "Terminal"];

    return (
      <div className="overflow-hidden">
        {words.map((word, index) => (
          <motion.div
            key={index}
            className={`${
              index === 1 ? "text-yellow-300" : "text-white"
            } overflow-hidden`}
          >
            <motion.h1
              className="text-7xl font-bold cartoon-shadow"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  whileHover={{
                    scale: 1.2,
                    rotate: Math.random() * 30 - 15,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    textShadow: "4px 4px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        ))}
      </div>
    );
  };

  const HeroSection = () => {
    return (
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-red-500 to-red-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating shapes */}
          <motion.div
            animate={{
              y: [-20, 20],
              rotate: [0, 10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-20 left-[10%] w-32 h-32 bg-yellow-400 rounded-2xl opacity-30 blur-sm"
          />
          <motion.div
            animate={{
              y: [20, -20],
              rotate: [10, -10],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-40 right-[15%] w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-sm"
          />
          <motion.div
            animate={{
              x: [-20, 20],
              y: [-10, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-32 left-[20%] w-24 h-24 bg-green-400 rounded-lg opacity-30 blur-sm"
          />
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col justify-center relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <AnimatedText />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl mb-8 text-white/90"
              >
                Explore a world of creative projects and interactive
                experiences!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cartoon-button px-8 py-4 rounded-xl text-black font-bold text-lg hover:bg-yellow-300 transition-colors"
                >
                  Explore Projects 🚀
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cartoon-button px-8 py-4 rounded-xl text-black font-bold text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  Learn More ✨
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right column - Animated illustration */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[500px]">
                {/* Abstract shapes composition */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
                >
                  <div className="absolute inset-0 border-8 border-white rounded-3xl transform rotate-45"></div>
                  <div className="absolute inset-4 border-8 border-yellow-300 rounded-3xl transform -rotate-45"></div>
                  <div className="absolute inset-8 border-8 border-blue-300 rounded-3xl transform rotate-12"></div>
                </motion.div>

                {/* Floating elements */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-20, 20],
                      x: [-10, 10],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                    className="absolute"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${20 + i * 15}%`,
                    }}
                  >
                    <div
                      className={`w-8 h-8 bg-white rounded-lg cartoon-shadow transform rotate-${i * 15}`}
                    ></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="text-white text-center">
              <p className="mb-2">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-white rounded-full mx-auto">
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>
    );
  };
  return (
    <div className="min-h-screen bg-white">
      <CartoonCursor />
      <HeroSection />
      <CartoonContextMenu />
      {/* Latest Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-black mb-12 text-center cartoon-shadow">
            Latest Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newProjects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link href={project.link}>
                  <div className="bg-white p-6 rounded-xl cartoon-border cartoon-shadow">
                    <h3 className="text-xl font-bold text-black mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-500 text-white rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Archive Section */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center cartoon-shadow">
            Project Archive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link href={project.link}>
                  <div className="bg-white p-6 rounded-xl cartoon-border cartoon-shadow">
                    <h3 className="text-xl font-bold text-black mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">Stay Connected!</h3>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/Skullmc1"
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="text-4xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                👾
              </motion.a>
              <motion.a
                href="https://discord.gg/sEfxamqWkg"
                whileHover={{ scale: 1.2, rotate: -15 }}
                className="text-4xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬
              </motion.a>
            </div>
          </div>
          <p>© 2024 Innovation Terminal. All rights reserved.</p>
        </div>
      </footer>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}
