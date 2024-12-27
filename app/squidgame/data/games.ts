import { GameDifficulty } from "../components/GameCard";

export interface Game {
  id: number;
  season: 1 | 2;
  title: string;
  description: string;
  rules: string[];
  image: string;
  difficulty: GameDifficulty;
  eliminationRate: number;
  playerCount?: number;
}
export const games: Game[] = [
  // Season 1
  {
    id: 1,
    season: 1,
    title: "Red Light, Green Light",
    description:
      "Players must move during 'green light' and freeze during 'red light'. Any movement detected during red light results in elimination.",
    rules: [
      "Move only during 'green light'",
      "Freeze completely during 'red light'",
      "Reach the finish line within time limit",
      "Any movement during red light results in elimination",
    ],
    image: "/squidgame/images/red-light-green-light.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 62,
    playerCount: 456,
  },
  {
    id: 2,
    season: 1,
    title: "Honeycomb/Dalgona",
    description:
      "Players must carefully cut out shapes from a honeycomb candy without breaking the shape.",
    rules: [
      "Select one of four shapes: circle, triangle, star, or umbrella",
      "Remove the shape intact within 10 minutes",
      "Breaking the shape results in elimination",
      "Only the provided needle can be used",
    ],
    image: "/squidgame/images/honeycomb.jpg",
    difficulty: "Medium" as GameDifficulty,
    eliminationRate: 54,
  },
  {
    id: 3,
    season: 1,
    title: "Tug of War",
    description:
      "Teams battle in a deadly tug of war match high above the ground.",
    rules: [
      "Form teams of 10 players",
      "Pull the rope to make the opposing team fall",
      "Last team standing advances",
      "No time limit",
    ],
    image: "/squidgame/images/tug-of-war.jpg",
    difficulty: "Medium" as GameDifficulty,
    eliminationRate: 50,
  },
  {
    id: 4,
    season: 1,
    title: "Marbles",
    description:
      "Players pair up and must win their opponent's marbles through any means necessary.",
    rules: [
      "Form pairs with another player",
      "Win all 10 of your opponent's marbles",
      "Any game type is allowed if both players agree",
      "Complete within 30 minutes",
    ],
    image: "/squidgame/images/marbles.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 50,
  },
  {
    id: 5,
    season: 1,
    title: "Glass Bridge",
    description:
      "Cross a bridge made of glass panels, choosing between tempered and regular glass.",
    rules: [
      "Choose between two glass panels at each step",
      "One panel is tempered, one is regular glass",
      "Cross the bridge within time limit",
      "Falling results in elimination",
    ],
    image: "/squidgame/images/glass-bridge.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 85,
  },
  {
    id: 6,
    season: 1,
    title: "Squid Game",
    description:
      "The final game played on a squid-shaped court, where players must reach the 'head' of the squid.",
    rules: [
      "Attackers must reach the squid's head",
      "Defenders must stop the attackers",
      "Pushing outside boundaries is allowed",
      "Last player standing wins",
    ],
    image: "/squidgame/images/squid-game.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 50,
  },
  // Season 2
  {
    id: 7,
    season: 2,
    title: "Circle, Triangle, Star",
    description:
      "Players must perform tasks based on different shapes within a time limit.",
    rules: [
      "Complete tasks associated with each shape",
      "Follow exact instructions for each shape",
      "Complete all tasks within time limit",
      "Failure to complete results in elimination",
    ],
    image: "/squidgame/images/shapes-game.jpg",
    difficulty: "Medium" as GameDifficulty,
    eliminationRate: 45,
  },
  {
    id: 8,
    season: 2,
    title: "The Hunt",
    description:
      "Players must survive while being hunted through a maze-like structure.",
    rules: [
      "Avoid being caught by hunters",
      "Find safe zones to survive",
      "Limited time to reach extraction point",
      "Being caught results in elimination",
    ],
    image: "/squidgame/images/hunt-game.jpg",
    difficulty: "Hard" as GameDifficulty,
    eliminationRate: 70,
  },
];
