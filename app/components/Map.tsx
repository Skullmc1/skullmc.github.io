"use client";
import { motion, AnimatePresence } from "framer-motion";

export interface Location {
  id: string;
  name: string;
  isVisited: boolean;
  x?: number;
  y?: number;
  type?: "village" | "cave" | "beach" | "forest" | "shrine";
  status?: "available" | "locked" | "completed";
}

interface MapProps {
  isOpen: boolean;
  onClose: () => void;
  locations: Location[];
  currentLocation: string;
  onLocationSelect: (locationId: string) => void;
}

export default function Map({
  isOpen,
  onClose,
  locations,
  currentLocation,
  onLocationSelect,
}: MapProps) {
  const getLocationIcon = (type: Location["type"] = "village") => {
    switch (type) {
      case "village":
        return "🏘️";
      case "cave":
        return "🗿";
      case "beach":
        return "🏖️";
      case "forest":
        return "🌳";
      case "shrine":
        return "⛩️";
      default:
        return "📍";
    }
  };

  const getLocationStatusStyle = (location: Location) => {
    const baseStyle =
      "w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ";

    if (!location.isVisited) {
      return (
        baseStyle +
        "bg-[#481E14]/50 border-[#9B3922]/50 text-white/50 cursor-not-allowed"
      );
    }

    if (location.id === currentLocation) {
      return (
        baseStyle + "bg-[#F2613F] border-white text-white scale-110 shadow-lg"
      );
    }

    switch (location.status) {
      case "completed":
        return (
          baseStyle +
          "bg-[#9B3922] border-[#F2613F] text-white hover:bg-[#F2613F] cursor-pointer"
        );
      case "available":
        return (
          baseStyle +
          "bg-[#481E14] border-[#F2613F] text-white hover:bg-[#9B3922] cursor-pointer"
        );
      case "locked":
        return (
          baseStyle +
          "bg-[#481E14]/50 border-[#9B3922]/50 text-white/50 cursor-not-allowed"
        );
      default:
        return (
          baseStyle +
          "bg-[#481E14] border-[#F2613F] text-white hover:bg-[#9B3922] cursor-pointer"
        );
    }
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
            className="bg-[#481E14] p-8 rounded-lg border-2 border-[#F2613F] w-[800px] h-[600px] relative"
          >
            {/* Map Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#F2613F] font-pixel">
                World Map
              </h2>
              <button
                onClick={onClose}
                className="text-[#F2613F] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[480px] bg-[#0C0C0C] border-2 border-[#F2613F] rounded-lg overflow-hidden">
              {/* Map Grid or Background Image could go here */}
              <div className="absolute inset-0 p-4">
                {/* Grid Lines */}
                <div className="grid grid-cols-12 grid-rows-8 gap-4 h-full opacity-20">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border border-[#F2613F]/20" />
                  ))}
                </div>

                {/* Locations */}
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${location.x ?? 50}%`,
                      top: `${location.y ?? 50}%`,
                    }}
                  >
                    <button
                      onClick={() =>
                        location.isVisited && onLocationSelect(location.id)
                      }
                      className={getLocationStatusStyle(location)}
                      disabled={
                        !location.isVisited || location.status === "locked"
                      }
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg">
                          {getLocationIcon(location.type)}
                        </span>
                      </div>
                    </button>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                      <span
                        className={`text-sm ${
                          location.id === currentLocation
                            ? "text-[#F2613F]"
                            : "text-[#9B3922]"
                        }`}
                      >
                        {location.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-[#0C0C0C] border border-[#F2613F] p-2 rounded">
                <div className="text-xs text-[#9B3922]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-[#F2613F] rounded"></span>
                    <span>Current Location</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-[#9B3922] rounded"></span>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#481E14] rounded"></span>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="absolute bottom-4 left-8 text-[#9B3922] text-sm">
              Current Location:{" "}
              <span className="text-[#F2613F]">{currentLocation}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
