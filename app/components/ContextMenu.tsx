"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const ContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const menuItems: MenuItem[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z" />
        </svg>
      ),
      label: "Home",
      onClick: () => (window.location.href = "/"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4zM7 8h3v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z" />
        </svg>
      ),
      label: "Projects",
      onClick: () => (window.location.href = "#projects"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3zM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18z" />
        </svg>
      ),
      label: "Contact",
      onClick: () => (window.location.href = "#contact"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      ),
      label: "Theme",
      onClick: () => console.log("Toggle theme"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M20.1 14.56a2.07 2.07 0 0 0-.47-.18V9.62a1.64 1.64 0 0 0 .48-.18 1.78 1.78 0 0 0-1.78-3.09 1.62 1.62 0 0 0-.41.32l-4.11-2.38a1.7 1.7 0 0 0 .07-.51 1.78 1.78 0 0 0-3.56 0 1.7 1.7 0 0 0 .07.51L6.28 6.66a1.58 1.58 0 0 0-.41-.31 1.78 1.78 0 0 0-1.78 3.09 1.64 1.64 0 0 0 .48.18v4.76a2.07 2.07 0 0 0-.47.18 1.78 1.78 0 1 0 1.78 3.09 1.72 1.72 0 0 0 .4-.31l4.11 2.37a1.7 1.7 0 0 0-.07.51 1.78 1.78 0 0 0 3.56 0 1.69 1.69 0 0 0-.09-.56l4.09-2.36a1.7 1.7 0 0 0 .44.35 1.78 1.78 0 1 0 1.78-3.09z" />
        </svg>
      ),
      label: "Quick Access",
      onClick: () => console.log("Quick Access"),
    },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setIsOpen(false);
    };

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
        <div
          className="fixed z-50"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {menuItems.map((item, index) => {
            const angle = (index * 360) / menuItems.length;
            const radius = 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={index}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: 1,
                  x: x,
                  y: y,
                }}
                exit={{
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05,
                }}
                onClick={item.onClick}
                className="absolute"
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full flex items-center justify-center text-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-400 transition-all duration-300">
                    <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  {/* Cyberpunk Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-cyan-500/30 text-cyan-400 backdrop-blur-sm">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 border-l border-t border-cyan-500/30 rotate-45"></div>
                    {item.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
          {/* Center dot */}
          <div className="absolute w-3 h-3 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
