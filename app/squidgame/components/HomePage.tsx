"use client";

import { useState } from "react";
import ConsentForm from "./ConsentForm";
import PlayButton from "./PlayButton";
import GameCard from "./GameCard";
import CharacterCard from "./CharacterCard";
import CustomCursor from "./CustomCursor";
import CustomContextMenu from "./CustomContextMenu";

type GameDifficulty = "Easy" | "Medium" | "Hard";
type CharacterStatus = "Alive" | "Eliminated" | "Winner";

interface Game {
  id: number;
  title: string;
  description: string;
  gameNumber: number;
  image: string;
  difficulty: GameDifficulty;
  eliminationRate: number;
}

interface Character {
  id: number;
  name: string;
  playerNumber: string;
  status: CharacterStatus;
  image: string;
  description: string;
  debt: number;
}

const games: Game[] = [
  {
    id: 1,
    title: "Red Light, Green Light",
    description:
      "Players must move during 'green light' and freeze during 'red light'. Any movement detected during red light results in elimination.",
    gameNumber: 1,
    image: "/squidgame/images/red-light-green-light.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 62,
  },
  {
    id: 2,
    title: "Honeycomb/Dalgona",
    description:
      "Players must carefully cut out shapes from a honeycomb candy without breaking the shape.",
    gameNumber: 2,
    image: "/squidgame/images/honeycomb.jpg",
    difficulty: "Medium" as GameDifficulty,
    eliminationRate: 54,
  },
  {
    id: 3,
    title: "Tug of War",
    description:
      "Teams battle in a deadly tug of war match high above the ground.",
    gameNumber: 3,
    image: "/squidgame/images/tug-of-war.jpg",
    difficulty: "Medium" as GameDifficulty,
    eliminationRate: 50,
  },
  {
    id: 4,
    title: "Marbles",
    description:
      "Players pair up and must win their opponent's marbles through any means necessary.",
    gameNumber: 4,
    image: "/squidgame/images/marbles.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 50,
  },
  {
    id: 5,
    title: "Glass Bridge",
    description:
      "Cross a bridge made of glass panels, choosing between tempered and regular glass.",
    gameNumber: 5,
    image: "/squidgame/images/glass-bridge.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 85,
  },
  {
    id: 6,
    title: "Squid Game",
    description:
      "The final game played on a squid-shaped court, where players must reach the 'head' of the squid.",
    gameNumber: 6,
    image: "/squidgame/images/squid-game.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 50,
  },
];

export default function HomePage() {
  const [showConsentForm, setShowConsentForm] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <CustomCursor />
      <CustomContextMenu />
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-black/80" />
        <div className="z-10 text-center flex flex-col items-center">
          <h1 className="text-6xl font-bold mb-4">Squid Game</h1>
          <p className="text-xl mb-8">Do you dare to play?</p>
          <div className="flex justify-center">
            <PlayButton
              text="Enter the Game"
              onClick={() => setShowConsentForm(true)}
            />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 px-4 bg-black/90">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">The Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                gameNumber={game.gameNumber}
                image={game.image}
                difficulty={game.difficulty}
                eliminationRate={game.eliminationRate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black/90 to-pink-900/20">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">The Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                name={character.name}
                playerNumber={character.playerNumber}
                status={character.status}
                image={character.image}
                description={character.description}
                debt={character.debt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Consent Form Modal */}
      {showConsentForm && (
        <ConsentForm onClose={() => setShowConsentForm(false)} />
      )}
    </div>
  );
}

const characters: Character[] = [
  {
    id: 1,
    name: "Seong Gi-hun",
    playerNumber: "456",
    status: "Winner" as CharacterStatus, // Add type assertion
    image: "/squidgame/images/gi-hun.jpg",
    description:
      "A chauffeur and gambling addict who lives with his elderly mother.",
    debt: 45600000,
  },
  {
    id: 2,
    name: "Cho Sang-woo",
    playerNumber: "218",
    status: "Eliminated" as CharacterStatus, // Add type assertion
    image: "/squidgame/images/sang-woo.jpg",
    description: "A former business executive wanted for financial crimes.",
    debt: 60000000,
  },
  {
    id: 3,
    name: "Kang Sae-byeok",
    playerNumber: "067",
    status: "Eliminated" as CharacterStatus, // Add type assertion
    image: "/squidgame/images/sae-byeok.jpg",
    description: "A North Korean defector trying to reunite with her family.",
    debt: 32000000,
  },
  {
    id: 4,
    name: "Oh Il-nam",
    playerNumber: "001",
    status: "Eliminated" as CharacterStatus, // Add type assertion
    image: "/squidgame/images/il-nam.jpg",
    description:
      "An elderly man with a brain tumor who joins the game for excitement.",
    debt: 0,
  },
];
