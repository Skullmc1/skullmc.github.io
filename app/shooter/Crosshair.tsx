interface CrosshairProps {
  x: number;
  y: number;
}

export default function Crosshair({ x, y }: CrosshairProps) {
  return (
    <>
      {/* Animated pulse ring */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-24 h-24 border border-cyan-400/20 rounded-full animate-ping" />
      </div>

      {/* Inner rotating circle */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-8 h-8 border border-cyan-400/60 rounded-full animate-[spin_4s_linear_infinite]" />
      </div>

      {/* Center dot with glow */}
      <div
        className="fixed w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Outer segments */}
      <div
        className="fixed w-16 h-16 pointer-events-none"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-transparent" />
        {/* Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-cyan-400 to-transparent" />
        {/* Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
        {/* Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent" />
      </div>

      {/* Corner brackets */}
      <div
        className="fixed w-20 h-20 pointer-events-none"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/80" />
        {/* Top Right */}
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/80" />
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/80" />
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/80" />
      </div>
    </>
  );
}
