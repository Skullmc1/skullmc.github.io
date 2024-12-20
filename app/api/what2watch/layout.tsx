import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What 2 Watch",
  description: "Find your next favorite movie or TV show",
  icons: {
    icon: "/w.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function What2WatchLayout({
  children,
}: LayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 relative">
      <a
        href="https://theflixertv.to/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors"
        title="Watch on TheFlixer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </a>
      {children}
    </div>
  );
}
