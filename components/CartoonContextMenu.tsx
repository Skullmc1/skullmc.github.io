"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  label: string;
  icon: string;
  onClick: () => void;
}

const CartoonContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: "🏠",
      onClick: () => (window.location.href = "/"),
    },
    {
      label: "Projects",
      icon: "🚀",
      onClick: () => (window.location.href = "#projects"),
    },
    {
      label: "GitHub",
      icon: "👾",
      onClick: () => window.open("https://github.com/Skullmc1", "_blank"),
    },
    {
      label: "Discord",
      icon: "💬",
      onClick: () => window.open("https://discord.gg/sEfxamqWkg", "_blank"),
    },
  ];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50"
          style={{
            top: position.y,
            left: position.x,
            transformOrigin: "top left",
          }}
        >
          <div className="bg-white rounded-xl p-2 shadow-lg cartoon-border min-w-[200px]">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-3 transition-colors"
                onClick={item.onClick}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-gray-800">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-80"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-400 rounded-full opacity-80"
            animate={{
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartoonContextMenu;
