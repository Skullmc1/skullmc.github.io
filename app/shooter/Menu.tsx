interface MenuProps {
  isOpen: boolean;
  score: number;
  onStart: () => void;
  onResume: () => void;
  onShowTutorial: () => void;
}

export default function Menu({
  isOpen,
  score,
  onStart,
  onResume,
  onShowTutorial,
}: MenuProps) {
  const handleShare = () => {
    navigator.clipboard.writeText("www.loschicos.online");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900/90 border border-cyan-500/30 rounded-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
          Shooter Game
        </h1>

        {score > 0 ? (
          <div className="text-center mb-8">
            <p className="text-cyan-400/80 text-lg">Current Score</p>
            <p className="text-cyan-400 text-3xl font-mono">
              {score.toString().padStart(6, "0")}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <button
            onClick={score > 0 ? onResume : onStart}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 px-6 rounded-lg border border-cyan-500/30 transition-colors"
          >
            {score > 0 ? "Resume Game" : "Start Game"}
          </button>

          <button
            onClick={onShowTutorial}
            className="bg-gray-800/50 hover:bg-gray-800/70 text-cyan-400/80 py-3 px-6 rounded-lg border border-cyan-500/20 transition-colors"
          >
            How to Play
          </button>

          <button
            onClick={handleShare}
            className="bg-gray-800/50 hover:bg-gray-800/70 text-cyan-400/80 py-3 px-6 rounded-lg border border-cyan-500/20 transition-colors"
          >
            Share Game
          </button>
        </div>
      </div>
    </div>
  );
}
