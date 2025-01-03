import Image from "next/image";
import Link from "next/link";
import { Client } from "appwrite";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CursorEffect from "../components/CursorEffect";
import "../background.css";
import "./first.css";

const client = new Client();
client.setProject("w2w");
export default function Home() {
  const newProjects = [
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
  ];

  const projects = [
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
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
      <CursorEffect />
      {/* <div className="snow-container">{createSnowflakes()}</div> */}
      {/* Background Logo with Blur */}

      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30">
        <div className="relative w-full h-full">
          <Image
            src="/logo.gif"
            alt="Background Logo"
            fill
            className="object-cover rounded-full animate-pulse"
            style={{ filter: "blur(20px)" }}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="glitch text-4xl font-bold mb-4">
            Innovation Terminal
            <span>Innovation Terminal</span>
            <span>Innovation Terminal</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Exploring the intersection of code and creativity
          </p>
        </div>

        {/* New Projects Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">New Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newProjects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow relative"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {project.title}
                  <span className="ml-2 inline-block px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                    New
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <SpeedInsights />
        <Analytics />
        {/* Existing Projects Section */}
        <h2 className="text-2xl font-bold mb-6 text-center">All Projects</h2>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.title === "AI Chatbot" ? "#chat" : project.link}
              className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow relative ${
                project.title === "AI Chatbot" ? "overflow-hidden" : ""
              }`}
            >
              {project.title === "AI Chatbot" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 backdrop-blur-[2px]">
                  <div className="transform rotate-12">
                    <div className="px-4 py-2 bg-blue-500/80 text-white font-bold text-lg">
                      SCROLL DOWN
                    </div>
                  </div>
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Updated Social Links with your actual URLs */}
        <footer className="mt-16 flex justify-center gap-6">
          <a
            href="https://github.com/Skullmc1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/sEfxamqWkg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Discord
          </a>
        </footer>
      </main>
    </div>
  );
}
