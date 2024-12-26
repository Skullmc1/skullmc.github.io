"use client";
import { useEffect } from "react";
import ShooterGame from "./ShooterGame";

export default function ShooterPage() {
  useEffect(() => {
    // Disable default cursor
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden">
      <ShooterGame />
    </div>
  );
}
