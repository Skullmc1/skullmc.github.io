"use client";
import React, { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}!`
    : board.every((square) => square)
      ? "It's a draw!"
      : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-white">Tic Tac Toe</h2>

      <div className="mb-6 text-xl px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold">
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-lg
              ${!square ? "hover:bg-gray-600 bg-gray-700" : "bg-gray-600"}
              ${square === "X" ? "text-blue-400" : "text-red-400"}
              transition-colors duration-200 shadow-md`}
            onClick={() => handleClick(i)}
            disabled={!!square || !!winner}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200
          ${
            winner || board.every((square) => square)
              ? "bg-green-600 hover:bg-green-700 text-white scale-100 opacity-100"
              : "scale-95 opacity-0"
          }`}
      >
        Play Again
      </button>

      <div className="mt-6 text-gray-300 text-center">
        <p className="text-sm">X goes first • Click a square to play</p>
      </div>
    </div>
  );
}
