"use client";

import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">Smart Gate</span>
            </a>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
