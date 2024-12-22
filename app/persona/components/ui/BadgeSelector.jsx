"use client";
import { useState } from "react";

export default function BadgeSelector({ badges = [], onChange }) {
  const [newBadge, setNewBadge] = useState("");

  const presetBadges = {
    skills: ["JavaScript", "Python", "React", "Node.js", "Design", "UI/UX"],
    interests: ["Gaming", "Music", "Art", "Sports", "Travel", "Reading"],
    roles: [
      "Developer",
      "Designer",
      "Manager",
      "Student",
      "Teacher",
      "Creator",
    ],
  };

  const addBadge = (badge) => {
    if (!badges.includes(badge)) {
      onChange([...badges, badge]);
    }
  };

  const removeBadge = (badgeToRemove) => {
    onChange(badges.filter((badge) => badge !== badgeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBadge.trim() && !badges.includes(newBadge.trim())) {
      addBadge(newBadge.trim());
      setNewBadge("");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Add Custom Badge
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 bg-gray-50 text-gray-900"
            placeholder="Enter badge text"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {Object.entries(presetBadges).map(([category, categoryBadges]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-700 capitalize mb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categoryBadges.map((badge) => (
                <button
                  key={badge}
                  onClick={() => addBadge(badge)}
                  className={`px-3 py-1 rounded-md text-sm
                    ${
                      badges.includes(badge)
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    } transition-colors`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {badges.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-red-100 text-red-800"
              >
                {badge}
                <button
                  onClick={() => removeBadge(badge)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
