"use client";

import { useState, useEffect } from "react";
import { initialGames } from "../data/games";
import { Game } from "../types";
import FloatingImages from "../components/FloatingImages";

export default function GameLibrary() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTag, setFilterTag] = useState<"all" | "played" | "want-to-play">(
    "all",
  );

  // Load games from localStorage on initial render
  useEffect(() => {
    const savedGames = localStorage.getItem("gameLibrary");
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      setGames(initialGames);
      localStorage.setItem("gameLibrary", JSON.stringify(initialGames));
    }
  }, []);

  // Update localStorage whenever games change
  const handleTagChange = (gameId: number, tag: Game["tag"]) => {
    const updatedGames = games.map((game) =>
      game.id === gameId ? { ...game, tag } : game,
    );
    setGames(updatedGames);
    localStorage.setItem("gameLibrary", JSON.stringify(updatedGames));
  };

  // Add function to reset tags
  const handleResetTags = () => {
    const resetGames = games.map((game) => ({ ...game, tag: null }));
    setGames(resetGames);
    localStorage.setItem("gameLibrary", JSON.stringify(resetGames));
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "all" || game.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  // Calculate statistics
  const stats = {
    played: games.filter((game) => game.tag === "played").length,
    wantToPlay: games.filter((game) => game.tag === "want-to-play").length,
    total: games.length,
  };

  return (
    <>
      <FloatingImages />
      <div className="min-h-screen p-8 relative">
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-white text-center tracking-wide">
              Game Library
            </h1>

            {/* Statistics Panel */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">Played</p>
                <p className="text-2xl font-bold text-green-500">
                  {stats.played}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">Want to Play</p>
                <p className="text-2xl font-bold text-blue-500">
                  {stats.wantToPlay}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">Total Games</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search games..."
                className="flex-1 p-3 border border-gray-700 rounded-lg bg-gray-800 text-white
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                     transition-all duration-300"
                value={filterTag}
                onChange={(e) =>
                  setFilterTag(
                    e.target.value as "all" | "played" | "want-to-play",
                  )
                }
              >
                <option value="all">All Games</option>
                <option value="played">Played</option>
                <option value="want-to-play">Want to Play</option>
              </select>

              <button
                onClick={handleResetTags}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                     transition-all duration-300 focus:outline-none focus:ring-2
                     focus:ring-red-500"
              >
                Reset All Tags
              </button>
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Games List */}
              <div className="space-y-4">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between
                       bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700
                       hover:border-gray-600 transition-all duration-300"
                  >
                    <span className="font-medium text-white text-lg mb-4 sm:mb-0">
                      {game.title}
                    </span>

                    <div className="flex gap-3">
                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${
                      game.tag === "played"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                        onClick={() => handleTagChange(game.id, "played")}
                      >
                        Played
                      </button>

                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${
                      game.tag === "want-to-play"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        onClick={() => handleTagChange(game.id, "want-to-play")}
                      >
                        Want to Play
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredGames.length === 0 && (
                <div className="text-center text-gray-400 mt-8 p-8 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-xl">
                    No games found matching your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
