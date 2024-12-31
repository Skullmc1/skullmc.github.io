"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Client } from "appwrite";
import { newProjects, archiveProjects } from "../data/projectsData";
import "../styles/game-ui.css";

const client = new Client();
client.setProject("w2w");

export default function Home() {
  const [currentSection, setCurrentSection] = useState<
    "title" | "projects" | "archive" | "layouts"
  >("title");
  const [isLoading, setIsLoading] = useState(true);

  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const layoutsRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    title: titleRef,
    projects: projectsRef,
    archive: archiveRef,
    layouts: layoutsRef,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const ref = sectionRefs[currentSection];
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSection]);
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <main className="relative">
            <div ref={titleRef}>
              <TitleSection
                onComplete={() => setCurrentSection("projects")}
                isVisible={currentSection === "title"}
              />
            </div>

            <div ref={projectsRef}>
              <ProjectsSection
                isVisible={currentSection === "projects"}
                onNext={() => setCurrentSection("archive")}
              />
            </div>

            <div ref={archiveRef}>
              <ArchiveSection
                isVisible={currentSection === "archive"}
                onNext={() => setCurrentSection("layouts")}
              />
            </div>

            <div ref={layoutsRef}>
              <LayoutsSection isVisible={currentSection === "layouts"} />
            </div>
          </main>
        )}
      </AnimatePresence>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex flex-col items-center justify-center bg-[#0C0C0C]"
  >
    <div className="font-pixel text-[#F2613F] text-2xl mb-8">Loading...</div>
    <motion.div
      className="w-64 h-2 bg-[#481E14] relative overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <motion.div
        className="h-full bg-[#F2613F]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);

const TitleSection = ({
  onComplete,
  isVisible,
}: {
  onComplete: () => void;
  isVisible: boolean;
}) => {
  useEffect(() => {
    const handleKeyPress = () => {
      if (isVisible) {
        onComplete();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isVisible, onComplete]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scanline" />

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12">
        <motion.h1
          className="text-8xl font-pixel text-[#F2613F]"
          animate={{
            textShadow: [
              "0 0 10px #F2613F",
              "0 0 20px #F2613F",
              "0 0 10px #F2613F",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Innovation Terminal
        </motion.h1>

        <motion.div
          className="font-pixel text-[#9B3922] text-2xl"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Press ENTER to Start
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-[#F2613F]" />
      <div className="absolute top-8 right-8 w-32 h-32 border-t-4 border-r-4 border-[#F2613F]" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b-4 border-l-4 border-[#F2613F]" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-[#F2613F]" />
    </motion.section>
  );
};

const ProjectsSection = ({
  isVisible,
  onNext,
}: {
  isVisible: boolean;
  onNext: () => void;
}) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isVisible) return;

      if (showDetails) {
        if (e.key === "Escape") setShowDetails(false);
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          setSelectedProject((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          setSelectedProject((prev) =>
            Math.min(newProjects.length - 1, prev + 1),
          );
          break;
        case "Enter":
          setShowDetails(true);
          break;
        case "ArrowDown":
          onNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, showDetails, onNext]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
      exit={{ opacity: 0, y: -100 }}
      className="min-h-screen flex flex-col py-16 px-8 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 scanline" />

      {/* Header */}
      <div className="mb-16">
        <div className="pixel-panel p-6 max-w-4xl mx-auto">
          <h2 className="font-pixel text-[#F2613F] text-4xl text-center">
            === LATEST PROJECTS ===
          </h2>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-8 max-w-7xl mx-auto w-full">
          {/* Left Arrow */}
          <motion.button
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#F2613F] font-pixel text-4xl disabled:opacity-30"
            onClick={() => setSelectedProject((prev) => Math.max(0, prev - 1))}
            disabled={selectedProject === 0}
          >
            ◄
          </motion.button>

          {/* Projects Display */}
          <div className="flex-1 relative h-[600px] pixel-panel p-8">
            <div className="relative flex justify-center items-center h-full">
              {newProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="absolute w-full max-w-xl"
                  initial={false}
                  animate={{
                    scale: selectedProject === index ? 1 : 0.8,
                    opacity: selectedProject === index ? 1 : 0,
                    x: `${(index - selectedProject) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="pixel-panel p-8 h-full">
                    {/* Project Icon */}
                    <div className="w-full h-48 bg-[#481E14] mb-8 flex items-center justify-center">
                      <span className="text-[#F2613F] font-pixel text-6xl">
                        {project.title[0]}
                      </span>
                    </div>

                    {/* Project Info */}
                    <h3 className="font-pixel text-[#F2613F] text-2xl mb-4">
                      {project.title}
                    </h3>
                    <p className="text-[#9B3922] mb-6 font-pixel text-lg">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-[#481E14] text-[#F2613F] font-pixel text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDetails(true)}
                      className="game-menu-option w-full mt-8 text-center"
                    >
                      View Project
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#F2613F] font-pixel text-4xl disabled:opacity-30"
            onClick={() =>
              setSelectedProject((prev) =>
                Math.min(newProjects.length - 1, prev + 1),
              )
            }
            disabled={selectedProject === newProjects.length - 1}
          >
            ►
          </motion.button>
        </div>
      </div>

      {/* Navigation Help */}
      <div className="mt-16">
        <div className="pixel-panel p-4 max-w-4xl mx-auto">
          <div className="flex justify-between items-center font-pixel text-sm">
            <span className="text-[#9B3922]">
              Project {selectedProject + 1} of {newProjects.length}
            </span>
            <div className="flex gap-8">
              <span className="text-[#F2613F]">[←/→] Navigate</span>
              <span className="text-[#F2613F]">[Enter] Select</span>
              <span className="text-[#F2613F]">[↓] Next Section</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="pixel-panel p-12 max-w-4xl w-full m-8"
            >
              <div className="space-y-8">
                <h2 className="font-pixel text-[#F2613F] text-3xl">
                  {newProjects[selectedProject].title}
                </h2>

                <p className="text-[#9B3922] font-pixel text-lg leading-relaxed">
                  {newProjects[selectedProject].description}
                </p>

                <div className="flex gap-4">
                  <Link
                    href={newProjects[selectedProject].link}
                    className="game-menu-option flex-1 text-center"
                  >
                    Launch Project
                  </Link>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="game-menu-option flex-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const ArchiveSection = ({
  isVisible,
  onNext,
}: {
  isVisible: boolean;
  onNext: () => void;
}) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const projectsPerRow = 3;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isVisible) return;

      if (showDetails) {
        if (e.key === "Escape") setShowDetails(false);
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          setSelectedProject((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowRight":
          setSelectedProject((prev) =>
            prev < archiveProjects.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          setSelectedProject((prev) =>
            prev >= projectsPerRow ? prev - projectsPerRow : prev,
          );
          break;
        case "ArrowDown":
          if (selectedProject + projectsPerRow >= archiveProjects.length) {
            onNext();
          } else {
            setSelectedProject((prev) =>
              prev + projectsPerRow < archiveProjects.length
                ? prev + projectsPerRow
                : prev,
            );
          }
          break;
        case "Enter":
          setShowDetails(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, showDetails, onNext]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
      exit={{ opacity: 0, y: -100 }}
      className="min-h-screen flex flex-col py-16 px-8 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 scanline" />

      {/* Header */}
      <div className="mb-16">
        <div className="pixel-panel p-6 max-w-4xl mx-auto">
          <h2 className="font-pixel text-[#F2613F] text-4xl text-center">
            === PROJECT ARCHIVE ===
          </h2>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 pixel-panel p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-3 gap-8 h-full">
          {archiveProjects.map((project, index) => (
            <motion.div
              key={project.title}
              animate={{
                scale: selectedProject === index ? 1.05 : 1,
                borderColor: selectedProject === index ? "#F2613F" : "#481E14",
              }}
              className="relative"
              onClick={() => {
                setSelectedProject(index);
                setShowDetails(true);
              }}
            >
              {/* Game Cartridge Style Card */}
              <div
                className={`
                h-full p-6 cursor-pointer transition-all duration-200
                ${selectedProject === index ? "bg-[#481E14]" : "bg-[#0C0C0C]"}
                border-2 hover:border-[#F2613F]
              `}
              >
                {/* Project "Cartridge" Top */}
                <div className="h-48 bg-[#481E14] mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-pixel text-[#F2613F]">
                      {project.title[0]}
                    </span>
                  </div>
                  {/* Cartridge Ridges */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#9B3922]" />
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-[#9B3922]" />
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="font-pixel text-[#F2613F] text-xl truncate">
                    {project.title}
                  </h3>

                  <p className="text-[#9B3922] font-pixel text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#481E14] text-[#9B3922]
                        font-pixel text-xs border border-[#F2613F]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedProject === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-[#F2613F]"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Help */}
      <div className="mt-16">
        <div className="pixel-panel p-4 max-w-4xl mx-auto">
          <div className="flex justify-between items-center font-pixel text-sm">
            <span className="text-[#9B3922]">
              Selected: {archiveProjects[selectedProject].title}
            </span>
            <div className="flex gap-8">
              <span className="text-[#F2613F]">[↑/↓/←/→] Navigate</span>
              <span className="text-[#F2613F]">[Enter] Select</span>
              <span className="text-[#F2613F]">[↓] Next Section</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="pixel-panel p-12 max-w-4xl w-full m-8"
            >
              <div className="flex gap-8">
                {/* Project Preview */}
                <div className="w-1/3">
                  <div className="aspect-square bg-[#481E14] flex items-center justify-center">
                    <span className="text-8xl font-pixel text-[#F2613F]">
                      {archiveProjects[selectedProject].title[0]}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="w-2/3 space-y-6">
                  <h2 className="font-pixel text-[#F2613F] text-3xl">
                    {archiveProjects[selectedProject].title}
                  </h2>

                  <p className="text-[#9B3922] font-pixel text-lg leading-relaxed">
                    {archiveProjects[selectedProject].description}
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href={archiveProjects[selectedProject].link}
                      className="game-menu-option flex-1 text-center"
                    >
                      Launch Project
                    </Link>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="game-menu-option flex-1"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const LayoutsSection = ({ isVisible }: { isVisible: boolean }) => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const layouts = [
    {
      title: "First Layout",
      description: "The original design with a minimalist approach.",
      details: [
        "Dark theme with neon accents",
        "Responsive grid system",
        "Interactive elements",
        "Original release version",
      ],
      link: "/first",
      status: "Released: 2023",
    },
    {
      title: "Cartoon Style",
      description: "A playful design with cartoon elements.",
      details: [
        "Bright and colorful palette",
        "Animated components",
        "Playful interactions",
        "Family-friendly design",
      ],
      link: "/cartoon",
      status: "Released: 2024",
    },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isVisible) return;

      if (showPreview) {
        if (e.key === "Escape") setShowPreview(false);
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          setSelectedLayout((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowDown":
          setSelectedLayout((prev) =>
            prev < layouts.length - 1 ? prev + 1 : prev,
          );
          break;
        case "Enter":
          setShowPreview(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, showPreview]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
      exit={{ opacity: 0, y: -100 }}
      className="min-h-screen flex flex-col py-16 px-8 relative"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#F2613F]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="mb-16">
        <div className="pixel-panel p-6 max-w-4xl mx-auto">
          <h2 className="font-pixel text-[#F2613F] text-4xl text-center">
            === PREVIOUS LAYOUTS ===
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-12 max-w-7xl mx-auto w-full">
        {/* Left Menu */}
        <div className="w-1/3">
          <div className="pixel-panel p-8 h-full">
            <div className="space-y-6">
              {layouts.map((layout, index) => (
                <motion.div
                  key={layout.title}
                  className={`
                    game-menu-option relative
                    ${selectedLayout === index ? "selected" : ""}
                  `}
                  animate={
                    selectedLayout === index
                      ? {
                          x: 20,
                          backgroundColor: "#481E14",
                          borderColor: "#F2613F",
                        }
                      : {
                          x: 0,
                          backgroundColor: "#0C0C0C",
                          borderColor: "#481E14",
                        }
                  }
                  onClick={() => setSelectedLayout(index)}
                >
                  {/* Selection Arrow */}
                  <motion.span
                    className="absolute left-2 text-[#F2613F]"
                    animate={{ opacity: selectedLayout === index ? 1 : 0 }}
                  >
                    ►
                  </motion.span>

                  <span className="ml-8 font-pixel">{layout.title}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-[#481E14]">
              <p className="text-[#9B3922] font-pixel text-sm text-center">
                Select a layout to view details
              </p>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="w-2/3">
          <div className="pixel-panel p-8 h-full">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h3 className="font-pixel text-[#F2613F] text-2xl">
                  {layouts[selectedLayout].title}
                </h3>
                <span className="text-[#9B3922] font-pixel text-sm">
                  {layouts[selectedLayout].status}
                </span>
              </div>

              {/* Preview Window */}
              <div className="aspect-video bg-[#481E14] flex items-center justify-center border-2 border-[#F2613F]/30">
                <span className="text-[#F2613F] font-pixel">
                  Layout Preview
                </span>
              </div>

              {/* Description */}
              <p className="text-[#9B3922] font-pixel leading-relaxed">
                {layouts[selectedLayout].description}
              </p>

              {/* Features List */}
              <div className="space-y-4">
                <h4 className="font-pixel text-[#F2613F]">Features:</h4>
                <ul className="space-y-2">
                  {layouts[selectedLayout].details.map((detail, index) => (
                    <li
                      key={index}
                      className="text-[#9B3922] font-pixel text-sm flex items-center gap-2"
                    >
                      <span className="text-[#F2613F]">►</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href={layouts[selectedLayout].link}
                  className="game-menu-option flex-1 text-center"
                >
                  Visit Layout
                </Link>
                <button
                  onClick={() => setShowPreview(true)}
                  className="game-menu-option flex-1"
                >
                  Full Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Help */}
      <div className="mt-16">
        <div className="pixel-panel p-4 max-w-4xl mx-auto">
          <div className="flex justify-between items-center font-pixel text-sm">
            <span className="text-[#9B3922]">
              Layout {selectedLayout + 1} of {layouts.length}
            </span>
            <div className="flex gap-8">
              <span className="text-[#F2613F]">[↑/↓] Navigate</span>
              <span className="text-[#F2613F]">[Enter] Preview</span>
              <span className="text-[#F2613F]">[ESC] Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="pixel-panel p-12 max-w-7xl w-full m-8"
            >
              <div className="space-y-8">
                <h2 className="font-pixel text-[#F2613F] text-3xl">
                  {layouts[selectedLayout].title}
                </h2>

                {/* Large Preview Area */}
                <div className="aspect-video bg-[#481E14] flex items-center justify-center">
                  <span className="text-[#F2613F] font-pixel text-2xl">
                    Full Layout Preview
                  </span>
                </div>

                <div className="flex justify-end gap-4">
                  <Link
                    href={layouts[selectedLayout].link}
                    className="game-menu-option"
                  >
                    Visit Layout
                  </Link>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="game-menu-option"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
