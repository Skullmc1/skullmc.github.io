"use client";
import { useEffect, useState } from "react";
import Snake from "./games/Snake";
import TicTacToe from "./games/TicTacToe";

interface GameRoomProps {
  gameId: string;
  roomId: string;
  onBack: () => void;
}

const GameRoom = ({ gameId, roomId, onBack }: GameRoomProps) => {
  const [players, setPlayers] = useState<string[]>([]);

  // Add this function to handle socket connections
  useEffect(() => {
    // Initialize socket connection here
    // You'll need to set up a WebSocket server
  }, [roomId]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded-lg">
          Back to Lobby
        </button>
        <div>Room ID: {roomId}</div>
      </div>

      <div className="game-container">
        {gameId === "snake" && <Snake roomId={roomId} />}
        {gameId === "tictactoe" && <TicTacToe roomId={roomId} />}
      </div>
    </div>
  );
};
export default GameRoom;
