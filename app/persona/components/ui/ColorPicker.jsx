"use client";
import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ label, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef();

  const handleClickOutside = (event) => {
    if (popover.current && !popover.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            className="w-10 h-10 rounded border border-gray-300"
            style={{ backgroundColor: value }}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div
              ref={popover}
              className="absolute left-0 top-12 z-10 bg-gray-800 rounded-lg p-3 shadow-xl"
            >
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
        />
      </div>
    </div>
  );
}
