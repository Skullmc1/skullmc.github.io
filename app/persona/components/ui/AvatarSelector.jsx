"use client";
import { useState } from "react";

export default function AvatarSelector({ value, onChange }) {
  const emojiCategories = {
    "Faces & People": [
      "😊",
      "😎",
      "🤓",
      "😇",
      "🥳",
      "🤠",
      "👨",
      "👩",
      "🧑",
      "👶",
    ],
    Animals: ["🐱", "🐶", "🦁", "🐯", "🐼", "🐨", "🐮", "🐷", "🐸", "🦊"],
    Technology: ["💻", "📱", "🤖", "👾", "🎮", "🕹️", "💾", "⌨️", "🖥️", "🔌"],
    Nature: ["🌟", "🌙", "☀️", "🌸", "🌺", "🍀", "🌴", "🌈", "⭐", "🌊"],
    Activities: ["🎨", "🎭", "⚽", "🎸", "📚", "✈️", "🎬", "🎤", "🎯", "🎪"],
    Objects: ["💡", "🔮", "⚡", "💎", "🎵", "🎨", "📷", "🎪", "🎭", "🎪"],
  };

  const [selectedCategory, setSelectedCategory] = useState("Faces & People");

  const handleEmojiSelect = (emoji) => {
    onChange({ type: "emoji", content: emoji });
  };

  return (
    <div className="space-y-6">
      {value && (
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-red-500 text-4xl">
            {value.content}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emoji Category
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {emojiCategories[selectedCategory].map((emoji, index) => (
          <button
            key={index}
            className={`text-4xl p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              value?.content === emoji ? "bg-red-100" : ""
            }`}
            onClick={() => handleEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
