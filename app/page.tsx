"use client";
import Link from "next/link";
import { Client } from "appwrite";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CursorEffect from "./components/CursorEffect";
import { motion } from "framer-motion"; // Add this import
import "./background.css";
import "./snow.css";
import "./page.module.css";
import ContextMenu from "./components/ContextMenu";
import { sendToDiscordWebhook } from "./components/SendToWebhook";
import OldMainPages from "@/components/OldMainPages";
import EmojiCursor from "@/components/EmojiCursor";
const handleClick = async () => {
  const success = await sendToDiscordWebhook();
  if (success) {
    console.log("Successfully sent to Discord");
  } else {
    console.error("Failed to send to Discord");
  }
};

const client = new Client();
client.setProject("w2w");
export default function Home() {
  const newProjects = [
    {
      title: "[REDACTED]",
      description: "",
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

  const projects = [
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
  {
    /*
  function createSnowflakes() {
    const snowflakeChars = ["❅", "❆", "❄", "✻", "✺", "❋", "❊", "✧"];

    return Array.from({ length: 50 }).map((_, index) => {
      const animationDuration = 5 + Math.random() * 10;
      const startDelay = Math.random() * 5;
      const startPositionX = Math.random() * 100;
      const snowflake =
        snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
      const scale = 0.5 + Math.random() * 1; // Random size between 0.5 and 1.5

      return (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${startPositionX}vw`,
            animation: `snowfall ${animationDuration}s linear ${startDelay}s infinite`,
            transform: `scale(${scale})`,
          }}
        >
          {snowflake}
        </div>
      );
    });
  }
  */
  }
  return (
    <div
      onClick={handleClick}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      <EmojiCursor />
      <CursorEffect />
      <ContextMenu />

      {/* Hero Section - Fixed initially */}
      <section className="h-screen flex items-center justify-center sticky top-0 relative overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Decorative lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform -rotate-45"></div>
          <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform rotate-45"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 px-4"
        >
          {/* Decorative corner elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-cyan-500 to-transparent"></div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-cyan-500 to-transparent"></div>
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-cyan-500 to-transparent"></div>
          </div>

          <h1 className="text-7xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 cyber-text-glow">
              Innovation Terminal
            </span>
            {/* Glitch effect overlay */}
            <span className="absolute top-0 left-0 w-full bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-glitch-1">
              Innovation Terminal
            </span>
            <span className="absolute top-0 left-0 w-full bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 animate-glitch-2">
              Innovation Terminal
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 relative">
            Scroll to explore my projects
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></span>
          </p>

          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-cyan-400 text-4xl"
          >
            ⌄
          </motion.div>
        </motion.div>

        {/* Scanner line effect */}
        <motion.div
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        />
      </section>

      {/* New Projects Section */}
      <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Cyberpunk background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-blue-900/20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Latest Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {newProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={project.link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 h-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20 backdrop-blur-sm relative group"
                  >
                    {/* Decorative corner element */}
                    <div className="absolute top-0 right-0 w-20 h-20">
                      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-500"></div>
                      <div className="absolute top-4 right-8 w-12 h-[1px] bg-cyan-500/50"></div>
                      <div className="absolute top-4 right-4 w-[1px] h-12 bg-cyan-500/50"></div>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        {project.title}
                      </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm shadow-lg shadow-cyan-500/50 animate-pulse">
                        New
                      </span>
                    </div>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full text-sm border border-cyan-500/50 text-cyan-400 shadow-sm shadow-cyan-500/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section with Stagger Effect */}
      <section className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Project Archive
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.2,
                }}
                viewport={{ once: true }}
              >
                <Link href={project.link}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-cyan-600/20 shadow-lg shadow-cyan-500/10 relative overflow-hidden group"
                  >
                    {/* Cyberpunk decorative elements */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl transform rotate-45"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500/50"></div>

                    <h3 className="text-xl font-semibold mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-900/50 rounded-full text-xs border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <OldMainPages />
      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-16 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
      >
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo & Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Innovation Terminal
              </h3>
              <p className="text-gray-400 max-w-xs">
                Exploring the digital frontier through innovative web
                development and creative coding.
              </p>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-cyan-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-cyan-400">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Skullmc1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-cyan-500/30 hover:border-cyan-400 transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/sEfxamqWkg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-cyan-500/30 hover:border-cyan-400 transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.127a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.216.642-1.873.892a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2024 Innovation Terminal. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <span className="text-gray-500 text-sm">
                  Made with
                  <span className="mx-1 text-cyan-400">♦</span>
                  by Skullmc1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30"></div>
      </motion.footer>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}
