"use client";
import React, { useState } from "react";
import Snake from "./components/Snake";
import TicTacToe from "./components/TicTacToe";
import Link from "next/link";

export default function Page() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: "snake",
      title: "Snake",
      description: "Classic snake game - Use arrow keys to control",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.5 2C6.81 2 2 6.81 2 12.5S6.81 23 12.5 23 23 18.19 23 12.5 18.19 2 12.5 2zm0 19C7.81 21 3 16.19 3 11.5S7.81 2 12.5 2 22 6.81 22 11.5 17.19 21 12.5 21z" />
          <path d="M12.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      bgColor: "from-green-600/20 to-green-700/20",
      borderColor: "border-green-600/30",
    },
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      description: "Classic X and O game",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4h16M4 12h16M4 20h16M8 4v16M16 4v16"
          />
        </svg>
      ),
      bgColor: "from-blue-600/20 to-blue-700/20",
      borderColor: "border-blue-600/30",
    },
    {
      id: "pong",
      title: "Pong",
      description: "Classic Pong game - Play against the computer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-purple-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.5 18.5c-.83 0-1.5-.67-1.5-1.5V7c0-.83.67-1.5 1.5-1.5S23 6.17 23 7v10c0 .83-.67 1.5-1.5 1.5zM2.5 18.5C1.67 18.5 1 17.83 1 17V7c0-.83.67-1.5 1.5-1.5S4 6.17 4 7v10c0 .83-.67 1.5-1.5 1.5zM12 16.5c-.83 0-1.5-.67-1.5-1.5V9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      bgColor: "from-purple-600/20 to-purple-700/20",
      borderColor: "border-purple-600/30",
    },
  ];

  const renderGame = () => {
    switch (selectedGame) {
      case "snake":
        return <Snake />;
      case "tictactoe":
        return <TicTacToe />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="container mx-auto relative">
        {/* Home Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-red-500/20 border border-red-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </Link>

        <div className="pt-20 pb-10">
          <h1 className="text-5xl font-bold mb-2 text-white text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tiny Games
          </h1>
          <p className="text-gray-400 text-center mb-10">
            Choose a game and start playing!
          </p>
        </div>

        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {games.map((game) => (
              <div
                key={game.id}
                className={`border ${game.borderColor} rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-200 bg-gradient-to-br ${game.bgColor} backdrop-blur-sm`}
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {game.icon}
                  <h2 className="text-2xl font-bold text-white">
                    {game.title}
                  </h2>
                </div>
                <p className="text-gray-300">{game.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-blue-500/20 border border-blue-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to Games</span>
            </button>
            {renderGame()}
          </div>
        )}
      </div>
    </div>
  );
}
