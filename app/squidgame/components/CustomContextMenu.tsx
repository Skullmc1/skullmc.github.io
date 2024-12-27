"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  angle: number;
  onClick: () => void;
  isOpen: boolean;
}

const GameIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L22 20H2L12 2Z" fill="currentColor" />
  </svg>
);

const CharactersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
);

const JoinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" fill="currentColor" />
  </svg>
);

const MenuItem = ({ icon, label, angle, onClick, isOpen }: MenuItemProps) => {
  const radius = 80; // Distance from cursor
  const x = Math.cos(angle * (Math.PI / 180)) * radius;
  const y = Math.sin(angle * (Math.PI / 180)) * radius;

  return (
    <motion.div
      className="menu-item"
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={{
        x: isOpen ? x : 0,
        y: isOpen ? y : 0,
        scale: isOpen ? 1 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <div className="menu-item-content">
        {icon}
        <span className="menu-item-label">{label}</span>
      </div>
    </motion.div>
  );
};

export default function CustomContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => setIsOpen(false);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const menuItems = [
    {
      icon: <GameIcon />,
      label: "Games",
      angle: 0,
      onClick: () => console.log("Games clicked"),
    },
    {
      icon: <CharactersIcon />,
      label: "Characters",
      angle: 120,
      onClick: () => console.log("Characters clicked"),
    },
    {
      icon: <JoinIcon />,
      label: "Join",
      angle: 240,
      onClick: () => {
        // Add your consent form toggle logic here
        console.log("Join clicked");
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="context-menu"
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              angle={item.angle}
              onClick={item.onClick}
              isOpen={isOpen}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
