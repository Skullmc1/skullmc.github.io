"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { GameSettings } from "../data/storyData";

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onLoad: () => void;
  onSettings: (settings: Partial<GameSettings>) => void;
  onQuit: () => void;
}

export default function Menu({
  isOpen,
  onClose,
  onSave,
  onLoad,
  onSettings,
  onQuit,
}: MenuProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<GameSettings>({
    musicVolume: 80,
    soundVolume: 100,
    textSpeed: 50,
    fullscreen: false,
  });

  const menuItems = [
    { label: "Resume", action: onClose },
    { label: "Save Game", action: onSave },
    { label: "Load Game", action: onLoad },
    { label: "Settings", action: () => setShowSettings(true) },
    { label: "Quit", action: onQuit },
  ];

  const handleVolumeChange = (type: "music" | "sound", value: number) => {
    setSettings((prev) => ({
      ...prev,
      [`${type}Volume`]: value,
    }));
  };

  const handleTextSpeedChange = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      textSpeed: value,
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setSettings((prev) => ({ ...prev, fullscreen: true }));
    } else {
      document.exitFullscreen();
      setSettings((prev) => ({ ...prev, fullscreen: false }));
    }
  };

  const handleApplySettings = () => {
    onSettings(settings); // Pass the current settings when applying
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0C0C0C]/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#481E14] p-8 rounded-lg border-2 border-[#F2613F] w-[400px]"
          >
            {!showSettings ? (
              // Main Menu
              <>
                <h2 className="text-2xl font-pixel text-[#F2613F] mb-6 text-center">
                  Menu
                </h2>
                <div className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="px-6 py-3 bg-[#9B3922] text-white border-2 border-[#F2613F]
                      hover:bg-[#F2613F] transition-all duration-200 font-pixel text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#F2613F] focus:ring-opacity-50
                      transform hover:scale-105"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2613F]/30 text-center">
                  <p className="text-[#9B3922] text-xs">
                    Press ESC to close menu
                  </p>
                </div>
              </>
            ) : (
              // Settings Menu
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-pixel text-[#F2613F]">
                    Settings
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-[#F2613F] hover:text-white transition-colors"
                  >
                    ←
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Music Volume */}
                  <div className="space-y-2">
                    <label className="text-[#F2613F] text-sm font-pixel">
                      Music Volume: {settings.musicVolume}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.musicVolume}
                      onChange={(e) =>
                        handleVolumeChange("music", Number(e.target.value))
                      }
                      className="w-full appearance-none h-2 bg-[#9B3922] rounded-full
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#F2613F]
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>

                  {/* Sound Effects Volume */}
                  <div className="space-y-2">
                    <label className="text-[#F2613F] text-sm font-pixel">
                      Sound Effects: {settings.soundVolume}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.soundVolume}
                      onChange={(e) =>
                        handleVolumeChange("sound", Number(e.target.value))
                      }
                      className="w-full appearance-none h-2 bg-[#9B3922] rounded-full
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#F2613F]
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>

                  {/* Text Speed */}
                  <div className="space-y-2">
                    <label className="text-[#F2613F] text-sm font-pixel">
                      Text Speed: {settings.textSpeed}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.textSpeed}
                      onChange={(e) =>
                        handleTextSpeedChange(Number(e.target.value))
                      }
                      className="w-full appearance-none h-2 bg-[#9B3922] rounded-full
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#F2613F]
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>

                  {/* Fullscreen Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#F2613F] text-sm font-pixel">
                      Fullscreen
                    </span>
                    <button
                      onClick={toggleFullscreen}
                      className={`px-4 py-2 border-2 transition-colors ${
                        settings.fullscreen
                          ? "bg-[#F2613F] border-[#F2613F] text-white"
                          : "bg-[#9B3922] border-[#F2613F] text-white hover:bg-[#F2613F]"
                      }`}
                    >
                      {settings.fullscreen ? "Exit" : "Enter"}
                    </button>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={handleApplySettings}
                    className="w-full px-6 py-3 bg-[#9B3922] text-white border-2 border-[#F2613F]
                    hover:bg-[#F2613F] transition-all duration-200 font-pixel text-sm mt-4"
                  >
                    Apply Settings
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
