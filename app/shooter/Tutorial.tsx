interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Tutorial({ isOpen, onClose }: TutorialProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900/90 border border-cyan-500/30 rounded-lg p-8 max-w-xl w-full mx-4">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">How to Play</h2>

        <div className="space-y-4 text-cyan-400/80">
          <p>• Click to shoot targets</p>
          <p>• Standard targets give 100 points</p>
          <p>• Collect power-ups for advantages:</p>
          <ul className="ml-6 space-y-2">
            <li>💰 Score Multiplier - Double points for 60 seconds</li>
            <li>🎯 Ammo Clip - Increases max ammo to 25</li>
            <li>⚡ Fast Reload - Halves reload time for 60 seconds</li>
            <li>💣 Bomb - Avoid! Deducts 1000 points when shot</li>
          </ul>
          <p>• Press ESC to pause the game</p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 px-6 rounded-lg border border-cyan-500/30 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
