"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Inventory, { InventoryItem } from "./Inventory";
import Menu from "./Menu";
import Map from "./Map";
import { chapter1Scenes, GameState, items } from "../data/storyData";
import type { Location } from "./Map";

interface StatusMessage {
  text: string;
  type: "success" | "error" | "info";
}

// Extended interfaces for game state tracking
interface GameProgress {
  chapter: number;
  achievements: string[];
  unlockedLocations: string[];
  completedQuests: string[];
  activeQuests: string[];
  relationships: Record<string, number>;
  flags: Record<string, boolean>;
}

interface GameSettings {
  musicVolume: number;
  soundVolume: number;
  textSpeed: number;
  fullscreen: boolean;
}

const initialGameState: GameState = {
  currentScene: "awakening",
  stats: {
    trust: 0,
    resources: 0,
    knowledge: 0,
  },
  inventory: [],
  visitedLocations: [],
  relationships: {},
  chapter: 1,
};

const initialProgress: GameProgress = {
  chapter: 1,
  achievements: [],
  unlockedLocations: ["haven_isle"],
  completedQuests: [],
  activeQuests: [],
  relationships: {},
  flags: {
    hasMetTaren: false,
    discoveredSymbols: false,
    inspectedWreckage: false,
  },
};

const initialSettings: GameSettings = {
  musicVolume: 80,
  soundVolume: 100,
  textSpeed: 50,
  fullscreen: false,
};

export default function GameContainer() {
  // Core state
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameProgress, setGameProgress] =
    useState<GameProgress>(initialProgress);
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  // UI state
  const [showInventory, setShowInventory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showChoiceEffect, setShowChoiceEffect] = useState<string | null>(null);

  const currentScene = chapter1Scenes[gameState.currentScene];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "i") {
        setShowInventory((prev) => !prev);
      }
      if (e.key.toLowerCase() === "m") {
        setShowMap((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowMenu((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Status message timeout
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Handle choice effects animation
  useEffect(() => {
    if (showChoiceEffect) {
      const timer = setTimeout(() => {
        setShowChoiceEffect(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showChoiceEffect]);

  // Audio context setup
  useEffect(() => {
    const setupAudio = async () => {
      try {
        type AudioContextType = typeof AudioContext;
        const AudioContextClass: AudioContextType =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: AudioContextType })
            .webkitAudioContext;

        const context = new AudioContextClass();
        await context.resume();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Audio setup failed:", error.message);
        } else {
          console.error("Audio setup failed with unknown error");
        }
      }
    };

    setupAudio();
  }, []);

  // Main game logic functions
  const handleChoice = (choiceId: string) => {
    const choice = currentScene.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    setIsLoading(true);
    setShowChoiceEffect(choiceId);

    // Check required items
    if (choice.requireItems) {
      const hasRequiredItems = choice.requireItems.every((itemId) =>
        gameState.inventory.some((item) => item.id === itemId),
      );
      if (!hasRequiredItems) {
        setStatusMessage({
          text: "You don't have the required items for this choice",
          type: "error",
        });
        setIsLoading(false);
        return;
      }
    }

    // Add new items if any
    const newItems: InventoryItem[] = choice.addItems
      ? choice.addItems
          .map((itemId) => items[itemId])
          .filter((item): item is InventoryItem => item !== undefined)
      : [];

    if (newItems.length > 0) {
      setStatusMessage({
        text: `Obtained: ${newItems.map((item) => item.name).join(", ")}`,
        type: "success",
      });
    }

    // Update game state and progress
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        currentScene: choice.nextSceneId,
        stats: {
          trust: prev.stats.trust + choice.effect.trust,
          resources: prev.stats.resources + choice.effect.resources,
          knowledge: prev.stats.knowledge + choice.effect.knowledge,
        },
        inventory: [...prev.inventory, ...newItems],
        visitedLocations: [...prev.visitedLocations, currentScene.location],
      }));

      // Update progress flags based on choice
      setGameProgress((prev) => ({
        ...prev,
        flags: {
          ...prev.flags,
          ...(choice.flags || {}), // Handle optional flags
        },
        relationships: {
          ...prev.relationships,
          ...(choice.relationships || {}), // Handle optional relationships
        },
      }));

      setIsLoading(false);
    }, 1000); // Simulate loading time for effect
  };
  // Item management functions
  const handleUseItem = (itemId: string) => {
    const item = gameState.inventory.find((i) => i.id === itemId);
    if (!item) return;

    switch (item.type) {
      case "consumable":
        setGameState((prev) => ({
          ...prev,
          inventory: prev.inventory
            .map((i) =>
              i.id === itemId && i.quantity > 1
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            )
            .filter((i) => i.id !== itemId || i.quantity > 0),
        }));
        setStatusMessage({
          text: `Used ${item.name}`,
          type: "info",
        });
        // Handle consumable effects
        handleItemEffects(item);
        break;

      case "artifact":
        setStatusMessage({
          text: `Examining ${item.name}...`,
          type: "info",
        });
        // Reveal lore or trigger special events
        handleArtifactExamination(item);
        break;

      case "key":
        setStatusMessage({
          text: `This ${item.name} might unlock something important...`,
          type: "info",
        });
        break;

      case "quest":
        setStatusMessage({
          text: `Quest item: ${item.name}`,
          type: "info",
        });
        break;
    }
  };

  const handleItemEffects = (item: InventoryItem) => {
    // Handle different item effects
    switch (item.id) {
      case "healingHerbs":
        setGameState((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            resources: prev.stats.resources + 1,
          },
        }));
        break;
      // Add more item effects
    }
  };

  const handleArtifactExamination = (item: InventoryItem) => {
    // Handle artifact examination logic
    switch (item.id) {
      case "mysteriousSymbol":
        setGameProgress((prev) => ({
          ...prev,
          flags: {
            ...prev.flags,
            hasExaminedSymbol: true,
          },
        }));
        break;
      // Add more artifact examinations
    }
  };

  // Save/Load functions
  const handleSaveGame = () => {
    try {
      const saveData = {
        gameState,
        gameProgress,
        settings,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("tidesOfFateSave", JSON.stringify(saveData));
      setStatusMessage({
        text: "Game saved successfully",
        type: "success",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Save game error:", error.message);
      }
      setStatusMessage({
        text: "Failed to save game",
        type: "error",
      });
    }
  };

  const handleLoadGame = () => {
    try {
      const savedData = localStorage.getItem("tidesOfFateSave");
      if (savedData) {
        const {
          gameState: savedGameState,
          gameProgress: savedProgress,
          settings: savedSettings,
        } = JSON.parse(savedData);
        setGameState(savedGameState);
        setGameProgress(savedProgress);
        setSettings(savedSettings);
        setStatusMessage({
          text: "Game loaded successfully",
          type: "success",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Load game error:", error.message);
      }
      setStatusMessage({
        text: "Failed to Load game",
        type: "error",
      });
    }
  };

  // Settings management
  const handleSettingsUpdate = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  // Map location handling
  const handleLocationSelect = (locationId: string) => {
    if (!gameProgress.unlockedLocations.includes(locationId)) {
      setStatusMessage({
        text: "This location is not yet accessible",
        type: "error",
      });
      return;
    }

    // Handle location transition
    setIsLoading(true);
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        currentScene: `${locationId}_entrance`,
      }));
      setIsLoading(false);
      setShowMap(false);
    }, 1000);
  };

  // Convert visited locations to map locations
  const mapLocations: Location[] = gameState.visitedLocations.map(
    (locationName) => ({
      id: locationName,
      name: locationName,
      isVisited: true,
      type: getLocationType(locationName),
      status: getLocationStatus(locationName),
    }),
  );

  function getLocationType(locationName: string): Location["type"] {
    // Determine location type based on name or game progress
    if (locationName.includes("village")) return "village";
    if (locationName.includes("cave")) return "cave";
    if (locationName.includes("beach")) return "beach";
    if (locationName.includes("forest")) return "forest";
    if (locationName.includes("shrine")) return "shrine";
    return "village";
  }

  function getLocationStatus(locationName: string): Location["status"] {
    if (gameProgress.completedQuests.includes(`${locationName}_quest`))
      return "completed";
    if (gameProgress.unlockedLocations.includes(locationName))
      return "available";
    return "locked";
  }

  // JSX
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 relative"
      >
        {isLoading && (
          <div className="fixed inset-0 bg-[#0C0C0C]/80 flex items-center justify-center z-50">
            <div className="text-[#F2613F] font-pixel">Loading...</div>
          </div>
        )}

        <div className="bg-[#481E14] rounded-lg border-2 border-[#F2613F] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#F2613F] font-pixel">
                {currentScene.title}
              </h2>
              <p className="text-[#9B3922]">{currentScene.location}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowInventory(true)}
                className="px-4 py-2 bg-[#9B3922] text-white border-2 border-[#F2613F]
                hover:bg-[#F2613F] transition-colors font-pixel text-sm"
              >
                Inventory (I)
              </button>
              <button
                onClick={() => setShowMap(true)}
                className="px-4 py-2 bg-[#9B3922] text-white border-2 border-[#F2613F]
                hover:bg-[#F2613F] transition-colors font-pixel text-sm"
              >
                Map (M)
              </button>
              <button
                onClick={() => setShowMenu(true)}
                className="px-4 py-2 bg-[#9B3922] text-white border-2 border-[#F2613F]
                hover:bg-[#F2613F] transition-colors font-pixel text-sm"
              >
                Menu (ESC)
              </button>
            </div>
          </div>

          {/* Story Content */}
          <div className="mb-8 bg-[#0C0C0C] p-4 border-2 border-[#F2613F]">
            {currentScene.character && (
              <div className="mb-4 text-[#F2613F] font-pixel text-sm">
                {currentScene.character}:
              </div>
            )}
            <p className="text-white">{currentScene.description}</p>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-4">
            {currentScene.choices.map((choice) => (
              <motion.button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                disabled={choice.requireItems?.some(
                  (itemId) =>
                    !gameState.inventory.some((item) => item.id === itemId),
                )}
                className={`px-6 py-4 text-white border-2 border-[#F2613F]
                transition-colors duration-200 text-left relative ${
                  choice.requireItems?.some(
                    (itemId) =>
                      !gameState.inventory.some((item) => item.id === itemId),
                  )
                    ? "bg-[#481E14] opacity-50 cursor-not-allowed"
                    : "bg-[#9B3922] hover:bg-[#F2613F]"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                animate={
                  showChoiceEffect === choice.id
                    ? {
                        backgroundColor: ["#9B3922", "#F2613F", "#9B3922"],
                      }
                    : {}
                }
              >
                {choice.text}
                {choice.requireItems && (
                  <span className="text-xs text-[#F2613F] ml-2">
                    (Requires:{" "}
                    {choice.requireItems.map((id) => items[id].name).join(", ")}
                    )
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Status Bar */}
          <div className="mt-8 pt-4 border-t-2 border-[#F2613F]">
            <div className="flex justify-between text-sm text-[#F2613F] font-pixel">
              <span>Trust: {gameState.stats.trust}</span>
              <span>Resources: {gameState.stats.resources}</span>
              <span>Knowledge: {gameState.stats.knowledge}</span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed bottom-4 right-4 px-6 py-3 rounded border-2 ${
                statusMessage.type === "error"
                  ? "bg-red-900 border-red-500"
                  : statusMessage.type === "success"
                    ? "bg-green-900 border-green-500"
                    : "bg-[#481E14] border-[#F2613F]"
              }`}
            >
              {statusMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modals */}
      <Inventory
        isOpen={showInventory}
        onClose={() => setShowInventory(false)}
        items={gameState.inventory}
        onUseItem={handleUseItem}
      />

      <Menu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onSave={handleSaveGame}
        onLoad={handleLoadGame}
        onSettings={handleSettingsUpdate}
        onQuit={() => window.location.reload()}
      />

      <Map
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        locations={mapLocations}
        currentLocation={currentScene.location}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
}
