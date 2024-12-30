import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { ReactNode } from "react";

interface Link {
  name: string;
  href: string;
}

interface SocialIcons {
  [key: string]: ReactNode;
}

export default function Footer() {
  const links: Link[] = [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const socialIcons: SocialIcons = {
    Discord: <FaDiscord />,
    Twitter: <FaTwitter />,
    GitHub: <FaGithub />,
  };

  const platforms = ["Discord", "Twitter", "GitHub"] as const;

  return (
    <footer className="bg-[#481E14] border-t-2 border-[#F2613F]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-pixel text-lg text-[#F2613F]">Tides of Fate</h3>
            <p className="text-sm text-[#9B3922] mt-2">
              © 2024 All rights reserved
            </p>
          </div>

          <nav className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#9B3922] hover:text-[#F2613F]
                transition-colors duration-200 font-medium
                hover:underline underline-offset-4"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Media Links */}
          <div className="flex gap-4">
            {platforms.map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-8 h-8 flex items-center justify-center
                bg-[#9B3922] text-white rounded-sm border border-[#F2613F]
                hover:bg-[#F2613F] transition-colors duration-200"
                aria-label={platform}
              >
                {socialIcons[platform]}
              </a>
            ))}
          </div>
        </div>

        {/* Additional Footer Content */}
        <div className="mt-6 pt-6 border-t border-[#9B3922] text-center text-sm text-[#9B3922]">
          <p>Made with Luv</p>
        </div>
      </div>
    </footer>
  );
}
