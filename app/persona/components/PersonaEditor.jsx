"use client";
import { Tab } from "@headlessui/react";
import ColorPicker from "./ui/ColorPicker";
import AvatarSelector from "./ui/AvatarSelector";
import BadgeSelector from "./ui/BadgeSelector";

export default function PersonaEditor({ config, onChange }) {
  const handleBadgeStyleChange = (style) => {
    onChange({ ...config, badgeStyle: style });
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm p-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          {["Style", "Avatar", "Badges", "Details"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                 ${
                   selected
                     ? "bg-white text-red-600 shadow"
                     : "text-gray-700 hover:text-red-600 hover:bg-gray-100"
                 }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <StylePanel config={config} onChange={onChange} />
          </Tab.Panel>
          <Tab.Panel>
            <AvatarPanel config={config} onChange={onChange} />
          </Tab.Panel>
          <Tab.Panel>
            <BadgesPanel
              config={config}
              onChange={onChange}
              onStyleChange={handleBadgeStyleChange}
            />
          </Tab.Panel>
          <Tab.Panel>
            <DetailsPanel config={config} onChange={onChange} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function StylePanel({ config, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme
        </label>
        <select
          value={config.theme}
          onChange={(e) => onChange({ ...config, theme: e.target.value })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <ColorPicker
        label="Background Color"
        value={config.backgroundColor}
        onChange={(color) => onChange({ ...config, backgroundColor: color })}
      />

      <ColorPicker
        label="Primary Color"
        value={config.colors.primary}
        onChange={(color) =>
          onChange({
            ...config,
            colors: { ...config.colors, primary: color },
          })
        }
      />

      <ColorPicker
        label="Secondary Color"
        value={config.colors.secondary}
        onChange={(color) =>
          onChange({
            ...config,
            colors: { ...config.colors, secondary: color },
          })
        }
      />
    </div>
  );
}

function AvatarPanel({ config, onChange }) {
  return (
    <div className="space-y-6">
      <AvatarSelector
        value={config.avatar}
        onChange={(avatar) => onChange({ ...config, avatar })}
      />
    </div>
  );
}

function BadgesPanel({ config, onChange, onStyleChange }) {
  return (
    <div className="space-y-6">
      <BadgeSelector
        badges={config.badges}
        style={config.badgeStyle}
        onChange={(badges) => onChange({ ...config, badges })}
        onStyleChange={onStyleChange}
      />
    </div>
  );
}

function DetailsPanel({ config, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={config.name}
          onChange={(e) => onChange({ ...config, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tagline
        </label>
        <input
          type="text"
          value={config.tagline}
          onChange={(e) => onChange({ ...config, tagline: e.target.value })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
          placeholder="Enter your tagline"
        />
      </div>
    </div>
  );
}
