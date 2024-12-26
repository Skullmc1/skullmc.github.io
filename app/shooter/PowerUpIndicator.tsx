import Image from "next/image";

interface PowerUpIndicatorProps {
  type: "scoreMultiplier" | "fastReload";
  timeLeft: number;
}

export default function PowerUpIndicator({
  type,
  timeLeft,
}: PowerUpIndicatorProps) {
  const icon = type === "scoreMultiplier" ? "money.svg" : "fast-reload.svg";
  const label = type === "scoreMultiplier" ? "2x Score" : "Fast Reload";

  return (
    <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2">
      <Image src={`/icons/${icon}`} alt={type} width={24} height={24} />
      <div className="flex flex-col">
        <span className="text-cyan-400 text-sm">{label}</span>
        <span className="text-cyan-400/60 text-xs">
          {Math.ceil(timeLeft / 1000)}s
        </span>
      </div>
    </div>
  );
}
