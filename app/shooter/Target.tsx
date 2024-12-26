import Image from "next/image";

interface TargetProps {
  x: number;
  y: number;
  size: "normal" | "large";
  type: "standard" | "scoreMultiplier" | "ammoClip" | "fastReload" | "bomb";
}

export default function Target({ x, y, size, type }: TargetProps) {
  const sizeClass = size === "large" ? "w-32 h-32" : "w-24 h-24";
  const imageSize = size === "large" ? 128 : 96;

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${sizeClass}`}
      style={{ left: x, top: y }}
    >
      {type !== "standard" ? (
        <div className={`relative ${sizeClass}`}>
          {/* Background glow effect */}
          <div
            className={`absolute inset-0 rounded-full blur-sm ${
              type === "bomb" ? "bg-red-400/30" : "bg-cyan-400/30"
            }`}
          />

          <Image
            src={`/icons/${
              type === "scoreMultiplier"
                ? "money.svg"
                : type === "ammoClip"
                  ? "ammo.svg"
                  : type === "fastReload"
                    ? "fast-reload.svg"
                    : "bomb.svg"
            }`}
            alt={type}
            width={imageSize}
            height={imageSize}
            className={`relative z-10 ${type === "bomb" ? "animate-pulse" : "animate-bounce"}`}
          />

          {/* Outer ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 ${
              type === "bomb" ? "border-red-400" : "border-cyan-400"
            } animate-ping`}
          />
        </div>
      ) : (
        <div className="relative">
          <Image
            src="/icons/target.svg"
            alt="Target"
            width={imageSize}
            height={imageSize}
            className="filter-cyan"
          />
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}
