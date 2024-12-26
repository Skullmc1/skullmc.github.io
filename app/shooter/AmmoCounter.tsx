interface AmmoCounterProps {
  ammo: number;
  isReloading: boolean;
  maxAmmo: number;
}

export default function AmmoCounter({ ammo, isReloading }: AmmoCounterProps) {
  return (
    <div className="fixed bottom-8 left-8 flex items-center gap-4">
      {/* Ammo Display Container */}
      <div className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 min-w-[180px]">
        <div className="flex flex-col">
          {/* Label */}
          <span className="text-cyan-400/80 text-sm mb-1 uppercase tracking-wider font-medium">
            Ammunition Status
          </span>

          {/* Ammo Count or Reloading Status */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-sm transition-all duration-200 ${
                    i < ammo
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-2xl font-bold ml-2 ${
                isReloading ? "text-yellow-400" : "text-cyan-400"
              }`}
            >
              {isReloading ? "⟳" : ammo}
            </span>
          </div>

          {/* Status Text */}
          <span
            className={`text-sm mt-1 ${
              isReloading
                ? "text-yellow-400 animate-pulse"
                : ammo === 0
                  ? "text-red-400"
                  : "text-cyan-400/80"
            }`}
          >
            {isReloading
              ? "RELOADING..."
              : ammo === 0
                ? "EMPTY - AUTO RELOAD"
                : "READY"}
          </span>
        </div>
      </div>
    </div>
  );
}
