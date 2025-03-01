"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useTranslation } from "@/app/i18n/hooks/useTranslation";
import {
  ShieldCheckIcon,
  DoorOpenIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  LanguagesIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const { t, language, changeLanguage } = useTranslation();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center [direction:ltr]">
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-9 h-9 transition-transform hover:scale-110">
                <DoorOpenIcon
                  className="w-9 h-9 text-blue-400"
                  strokeWidth={1.5}
                />
                <ShieldCheckIcon
                  className="absolute -top-1 -right-1 w-5 h-5 text-blue-300"
                  strokeWidth={2}
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 relative group"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5 transition-all duration-300">
                    <span
                      className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? "rotate-45 translate-y-2" : ""
                      }`}
                    />
                    <span
                      className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? "opacity-0" : ""
                      }`}
                    />
                    <span
                      className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? "-rotate-45 -translate-y-2" : ""
                      }`}
                    />
                  </div>
                  <span className="sr-only">Open settings menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() =>
                    changeLanguage(language === "en" ? "he" : "en")
                  }
                >
                  <LanguagesIcon className="mr-2 h-4 w-4" />
                  <span>{t("actions.changeLanguage")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <SunIcon className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MonitorIcon className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
