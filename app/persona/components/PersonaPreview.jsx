"use client";
import Image from "next/image";

export default function PersonaPreview({ config, onShare }) {
  const { avatar, backgroundColor, badges, name, tagline, colors } = config;

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          {avatar && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {avatar.type === "url" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={avatar.url}
                    alt={name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-4xl">{avatar.content}</div>
              )}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
              {name || "Your Name"}
            </h2>
            {tagline && <p className="text-gray-600">{tagline}</p>}
          </div>
        </div>

        {badges.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t px-6 py-4">
        <button
          onClick={onShare}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Share Persona
        </button>
      </div>
    </div>
  );
}
