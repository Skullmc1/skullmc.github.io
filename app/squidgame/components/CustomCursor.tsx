"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", updatePosition);
    document.addEventListener("mouseup", updatePosition);

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", updatePosition);
      document.removeEventListener("mouseup", updatePosition);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 0L20 20H0L10 0Z" fill="#FF0F7B" />
      </svg>
    </div>
  );
}
