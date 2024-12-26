interface ScoreboardProps {
  score: number;
  hits: number;
}

export default function Scoreboard({ score, hits }: ScoreboardProps) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="w-64 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 min-w-[240px]">
        <div className="flex flex-col items-center">
          <span className="text-cyan-400/80 text-sm uppercase tracking-widest font-medium">
            Combat Score
          </span>

          <div className="relative mt-1">
            <span className="text-4xl font-bold text-cyan-400 font-mono tracking-wider">
              {score.toString().padStart(6, "0")}
            </span>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400/50 rounded-full" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400/50 rounded-full" />
          </div>

          <div className="flex gap-2 mt-2 text-xs text-cyan-400/60">
            <span>HITS</span>
            <span>•</span>
            <span>{hits}</span>
          </div>
        </div>
      </div>

      <div className="w-64 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </div>
  );
}
