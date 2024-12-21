import Image from "next/image";

export default function FloatingImages() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 opacity-95" />

      {/* Elden Ring */}
      <div
        className="absolute animate-float-slow opacity-20 blur-md"
        style={{
          top: "10%",
          left: "5%",
          animation: "float 20s ease-in-out infinite",
          animationDelay: "0s",
        }}
      >
        <Image
          src="/images/elden-ring.jpg"
          alt=""
          width={256}
          height={256}
          className="rounded-lg object-cover"
        />
      </div>

      {/* God of War */}
      <div
        className="absolute animate-float-slow opacity-20 blur-md"
        style={{
          top: "40%",
          right: "10%",
          animation: "float 25s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      >
        <Image
          src="/images/god-of-war.jpg"
          alt=""
          width={256}
          height={256}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Cyberpunk 2077 */}
      <div
        className="absolute animate-float-slow opacity-20 blur-md"
        style={{
          bottom: "15%",
          left: "15%",
          animation: "float 22s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      >
        <Image
          src="/images/cyberpunk.jpg"
          alt=""
          width={256}
          height={256}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
